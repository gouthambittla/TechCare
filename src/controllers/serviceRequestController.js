const ServiceRequest = require('../models/ServiceRequest');
const matchingService = require('../services/matchingService');
const pricingService = require('../services/pricingService');

class ServiceRequestController {
  /**
   * Create a new service request
   */
  async createRequest(req, res) {
    try {
      const {
        customerId,
        deviceType,
        deviceDetails,
        location,
        address,
        priority
      } = req.body;

      // Calculate estimated price
      const estimatedPrice = pricingService.calculateEstimate(
        deviceType,
        deviceDetails.issueDescription,
        priority === 'urgent'
      );

      // Create service request
      const serviceRequest = new ServiceRequest({
        customer: customerId,
        deviceType,
        deviceDetails,
        location,
        address,
        priority,
        estimatedPrice,
        status: 'pending'
      });

      await serviceRequest.save();

      // Find nearest technician (GPS-based matching)
      try {
        const match = await matchingService.findNearestTechnician(
          location,
          deviceType
        );

        serviceRequest.technician = match.technician._id;
        serviceRequest.status = 'assigned';
        serviceRequest.responseTime = new Date(
          Date.now() + match.estimatedResponseTime * 60000
        );
        await serviceRequest.save();

        res.status(201).json({
          success: true,
          message: 'Service request created and technician assigned',
          data: {
            serviceRequest,
            technician: match.technician,
            estimatedResponseTime: match.estimatedResponseTime,
            distance: match.distance
          }
        });
      } catch (matchError) {
        // No technician available immediately, keep as pending
        res.status(201).json({
          success: true,
          message: 'Service request created, searching for technician',
          data: {
            serviceRequest,
            status: 'Searching for available technician...'
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating service request',
        error: error.message
      });
    }
  }

  /**
   * Track service request status (live tracking)
   */
  async trackRequest(req, res) {
    try {
      const { requestId } = req.params;

      const serviceRequest = await ServiceRequest.findById(requestId)
        .populate('customer', 'name phone')
        .populate('technician', 'name phone location rating');

      if (!serviceRequest) {
        return res.status(404).json({
          success: false,
          message: 'Service request not found'
        });
      }

      let trackingInfo = null;
      if (serviceRequest.technician && serviceRequest.status === 'assigned') {
        trackingInfo = await matchingService.trackTechnician(
          serviceRequest.technician._id,
          serviceRequest.technician.location,
          serviceRequest.location
        );
      }

      res.status(200).json({
        success: true,
        data: {
          serviceRequest,
          trackingInfo
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error tracking request',
        error: error.message
      });
    }
  }

  /**
   * Update service request status
   */
  async updateStatus(req, res) {
    try {
      const { requestId } = req.params;
      const { status } = req.body;

      const serviceRequest = await ServiceRequest.findById(requestId);

      if (!serviceRequest) {
        return res.status(404).json({
          success: false,
          message: 'Service request not found'
        });
      }

      serviceRequest.status = status;
      serviceRequest.updatedAt = new Date();

      if (status === 'completed') {
        serviceRequest.completionTime = new Date();
      }

      await serviceRequest.save();

      res.status(200).json({
        success: true,
        message: 'Status updated successfully',
        data: serviceRequest
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating status',
        error: error.message
      });
    }
  }

  /**
   * Get customer's service requests
   */
  async getCustomerRequests(req, res) {
    try {
      const { customerId } = req.params;

      const requests = await ServiceRequest.find({ customer: customerId })
        .populate('technician', 'name phone rating')
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: requests
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching requests',
        error: error.message
      });
    }
  }

  /**
   * Get technician's assigned requests
   */
  async getTechnicianRequests(req, res) {
    try {
      const { technicianId } = req.params;

      const requests = await ServiceRequest.find({ 
        technician: technicianId,
        status: { $in: ['assigned', 'in_progress'] }
      })
        .populate('customer', 'name phone address')
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: requests
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching requests',
        error: error.message
      });
    }
  }
}

module.exports = new ServiceRequestController();
