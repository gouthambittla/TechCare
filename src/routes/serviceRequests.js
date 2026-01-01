const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');

// Create new service request
router.post('/', serviceRequestController.createRequest);

// Track service request (live tracking)
router.get('/:requestId/track', serviceRequestController.trackRequest);

// Update service request status
router.patch('/:requestId/status', serviceRequestController.updateStatus);

// Get customer's service requests
router.get('/customer/:customerId', serviceRequestController.getCustomerRequests);

// Get technician's assigned requests
router.get('/technician/:technicianId', serviceRequestController.getTechnicianRequests);

module.exports = router;
