const JobCard = require('../models/JobCard');
const ServiceRequest = require('../models/ServiceRequest');
const pricingService = require('../services/pricingService');

class JobCardController {
  /**
   * Create a new job card (digital verification)
   */
  async createJobCard(req, res) {
    try {
      const {
        serviceRequestId,
        technicianId,
        customerId,
        beforeImages,
        workDescription
      } = req.body;

      const jobCard = new JobCard({
        serviceRequest: serviceRequestId,
        technician: technicianId,
        customer: customerId,
        beforeImages: beforeImages || [],
        workDescription,
        startTime: new Date(),
        isVerified: false
      });

      await jobCard.save();

      // Update service request status
      await ServiceRequest.findByIdAndUpdate(serviceRequestId, {
        status: 'in_progress'
      });

      res.status(201).json({
        success: true,
        message: 'Job card created successfully',
        data: jobCard
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating job card',
        error: error.message
      });
    }
  }

  /**
   * Update job card with after images and completion details
   */
  async completeJobCard(req, res) {
    try {
      const { jobCardId } = req.params;
      const {
        afterImages,
        partsUsed,
        laborCost,
        technicianNotes,
        customerSignature
      } = req.body;

      const jobCard = await JobCard.findById(jobCardId);

      if (!jobCard) {
        return res.status(404).json({
          success: false,
          message: 'Job card not found'
        });
      }

      // Calculate total cost
      const totalCost = pricingService.calculateTotalCost(partsUsed, laborCost);

      jobCard.afterImages = afterImages || [];
      jobCard.partsUsed = partsUsed || [];
      jobCard.laborCost = laborCost;
      jobCard.totalCost = totalCost;
      jobCard.technicianNotes = technicianNotes;
      jobCard.customerSignature = customerSignature;
      jobCard.endTime = new Date();
      jobCard.isVerified = true;
      jobCard.updatedAt = new Date();

      await jobCard.save();

      // Update service request with final price and status
      await ServiceRequest.findByIdAndUpdate(jobCard.serviceRequest, {
        finalPrice: totalCost,
        status: 'completed'
      });

      res.status(200).json({
        success: true,
        message: 'Job card completed successfully',
        data: jobCard
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error completing job card',
        error: error.message
      });
    }
  }

  /**
   * Get job card details (for transparency)
   */
  async getJobCard(req, res) {
    try {
      const { jobCardId } = req.params;

      const jobCard = await JobCard.findById(jobCardId)
        .populate('technician', 'name phone rating')
        .populate('customer', 'name phone')
        .populate('serviceRequest', 'deviceType deviceDetails');

      if (!jobCard) {
        return res.status(404).json({
          success: false,
          message: 'Job card not found'
        });
      }

      // Get price breakdown for transparency
      const priceBreakdown = await pricingService.getPriceBreakdown(jobCardId);

      res.status(200).json({
        success: true,
        data: {
          jobCard,
          priceBreakdown
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching job card',
        error: error.message
      });
    }
  }

  /**
   * Get all job cards for a service request
   */
  async getJobCardsByRequest(req, res) {
    try {
      const { serviceRequestId } = req.params;

      const jobCards = await JobCard.find({ serviceRequest: serviceRequestId })
        .populate('technician', 'name phone rating')
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: jobCards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching job cards',
        error: error.message
      });
    }
  }
}

module.exports = new JobCardController();
