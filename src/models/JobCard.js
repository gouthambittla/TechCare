const mongoose = require('mongoose');

const jobCardSchema = new mongoose.Schema({
  serviceRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest',
    required: true
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  beforeImages: [{
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  afterImages: [{
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  workDescription: {
    type: String
  },
  partsUsed: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  laborCost: {
    type: Number,
    min: 0
  },
  totalCost: {
    type: Number,
    min: 0
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  customerSignature: {
    type: String
  },
  technicianNotes: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JobCard', jobCardSchema);
