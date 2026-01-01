require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const serviceRequestRoutes = require('./routes/serviceRequests');
const jobCardRoutes = require('./routes/jobCards');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({
    name: 'TechCare API',
    description: 'Hyperlocal Electronics Repair Marketplace',
    version: '1.0.0',
    features: [
      'GPS-based technician matching',
      'Live tracking',
      'Digital job cards with before/after verification',
      'Standardized pricing',
      'Response time < 2 hours'
    ]
  });
});

app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/job-cards', jobCardRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`TechCare server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
