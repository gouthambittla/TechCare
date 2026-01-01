const express = require('express');
const router = express.Router();
const jobCardController = require('../controllers/jobCardController');

// Create new job card
router.post('/', jobCardController.createJobCard);

// Complete job card (add after images, parts, costs)
router.patch('/:jobCardId/complete', jobCardController.completeJobCard);

// Get job card details
router.get('/:jobCardId', jobCardController.getJobCard);

// Get job cards for a service request
router.get('/request/:serviceRequestId', jobCardController.getJobCardsByRequest);

module.exports = router;
