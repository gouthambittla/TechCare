const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  deviceType: {
    type: String,
    enum: ['Mobile', 'Laptop', 'Appliances'],
    required: true
  },
  deviceDetails: {
    brand: String,
    model: String,
    issueDescription: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician'
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  estimatedPrice: {
    type: Number,
    min: 0
  },
  finalPrice: {
    type: Number,
    min: 0
  },
  responseTime: {
    type: Date
  },
  completionTime: {
    type: Date
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

serviceRequestSchema.index({ location: '2dsphere' });
serviceRequestSchema.index({ status: 1 });
serviceRequestSchema.index({ customer: 1 });
serviceRequestSchema.index({ technician: 1 });

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
