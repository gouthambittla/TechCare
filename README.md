# TechCare - Hyperlocal Electronics Repair Marketplace

TechCare is a hyperlocal, managed marketplace designed to organize the fragmented Indian electronics repair industry. We connect customers experiencing device failures (Mobile, Laptop, Appliances) with verified, hyperlocal technicians.

## 🎯 Core Value Proposition

### Trust
- **Standardized Pricing**: Transparent, fixed pricing for common repairs
- **Before/After Digital Verification**: Digital job cards with photo documentation
- **Verified Technicians**: All technicians are verified before joining the platform

### Speed
- **GPS-Based Matching**: Intelligent algorithm matches customers with nearest available technician
- **Rapid Response**: Target response time of less than 2 hours
- **Real-time Availability**: Only available technicians are matched

### Transparency
- **Live Tracking**: Track technician location in real-time
- **Digital Job Cards**: Complete transparency on work performed, parts used, and costs
- **Itemized Billing**: Clear breakdown of parts and labor costs

## 🚀 Features

### For Customers
- Create service requests for Mobile, Laptop, or Appliances
- Automatic matching with nearest verified technician
- Live tracking of technician location
- View digital job cards with before/after photos
- Transparent pricing with detailed breakdowns
- Service request history

### For Technicians
- Receive job assignments based on location and specialization
- Update job status in real-time
- Create digital job cards with photo documentation
- Track earnings and completed jobs
- Manage availability status

### Platform Features
- GPS-based intelligent matching algorithm
- Standardized pricing across device categories
- Digital verification system (before/after photos)
- Live tracking system
- Response time monitoring (target: < 2 hours)

## 📋 Device Types Supported

- **Mobile**: Screen replacement, battery replacement, charging port repair, water damage, software issues
- **Laptop**: Screen replacement, battery replacement, keyboard replacement, hard drive replacement, RAM upgrade, software installation
- **Appliances**: Washing machine repair, refrigerator repair, AC service, microwave repair

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with geospatial indexing
- **GPS/Location**: Geolib for distance calculations
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/gouthambittla/TechCare.git
cd TechCare
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/techcare
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

4. Start MongoDB:
```bash
# Make sure MongoDB is running on your system
mongod
```

5. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Service Requests

#### Create Service Request
```http
POST /api/service-requests
Content-Type: application/json

{
  "customerId": "customer_id",
  "deviceType": "Mobile",
  "deviceDetails": {
    "brand": "Samsung",
    "model": "Galaxy S21",
    "issueDescription": "Screen Replacement"
  },
  "location": {
    "type": "Point",
    "coordinates": [77.5946, 12.9716]
  },
  "address": {
    "street": "123 Main St",
    "city": "Bangalore",
    "state": "Karnataka",
    "pincode": "560001"
  },
  "priority": "medium"
}
```

#### Track Service Request
```http
GET /api/service-requests/:requestId/track
```

#### Update Service Request Status
```http
PATCH /api/service-requests/:requestId/status
Content-Type: application/json

{
  "status": "in_progress"
}
```

#### Get Customer's Service Requests
```http
GET /api/service-requests/customer/:customerId
```

#### Get Technician's Assigned Requests
```http
GET /api/service-requests/technician/:technicianId
```

### Job Cards

#### Create Job Card
```http
POST /api/job-cards
Content-Type: application/json

{
  "serviceRequestId": "request_id",
  "technicianId": "technician_id",
  "customerId": "customer_id",
  "beforeImages": [
    {
      "url": "https://example.com/before1.jpg"
    }
  ],
  "workDescription": "Screen replacement required"
}
```

#### Complete Job Card
```http
PATCH /api/job-cards/:jobCardId/complete
Content-Type: application/json

{
  "afterImages": [
    {
      "url": "https://example.com/after1.jpg"
    }
  ],
  "partsUsed": [
    {
      "name": "Samsung Galaxy S21 Screen",
      "quantity": 1,
      "price": 1200
    }
  ],
  "laborCost": 300,
  "technicianNotes": "Screen replaced successfully",
  "customerSignature": "base64_signature_string"
}
```

#### Get Job Card Details
```http
GET /api/job-cards/:jobCardId
```

#### Get Job Cards for Service Request
```http
GET /api/job-cards/request/:serviceRequestId
```

## 🗂️ Data Models

### Customer
- Name, email, phone, password
- Address and GPS location
- Service request history

### Technician
- Name, email, phone, password
- Specializations (Mobile, Laptop, Appliances)
- GPS location and availability status
- Rating and total jobs completed
- Verification status

### Service Request
- Customer and technician references
- Device type and details
- GPS location and address
- Status (pending, assigned, in_progress, completed, cancelled)
- Priority level
- Estimated and final pricing
- Response and completion times

### Job Card
- Service request reference
- Before and after images
- Work description
- Parts used with quantities and prices
- Labor cost and total cost
- Start and end times
- Customer signature
- Verification status

## 🎯 Key Algorithms

### GPS-Based Matching
The platform uses an intelligent matching algorithm that:
1. Filters technicians by specialization and availability
2. Calculates distance using GPS coordinates
3. Sorts by proximity (within 10km radius)
4. Prioritizes by distance, then rating
5. Estimates response time based on distance

### Pricing System
Standardized pricing ensures transparency:
- Base prices for common repairs by device type
- 20% markup on parts
- 50% surcharge for urgent repairs
- Automatic calculation of total costs

### Live Tracking
Real-time tracking features:
- Distance calculation between technician and customer
- ETA calculation based on average urban speed
- Last updated timestamp
- Current vs. destination location

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication (to be implemented)
- Input validation
- Error handling middleware
- Environment variable protection

## 🧪 Testing

```bash
npm test
```

## 📄 License

MIT License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@techcare.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] User authentication and authorization
- [ ] Payment gateway integration
- [ ] Real-time notifications (SMS/Push)
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Customer reviews and ratings
- [ ] Multi-language support
- [ ] Image upload functionality
- [ ] WebSocket for real-time tracking