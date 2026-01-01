# TechCare API Examples

This document provides practical examples of how to use the TechCare API.

## Prerequisites

Make sure the server is running:
```bash
npm start
```

## Example Workflow

### 1. Create a Service Request (Customer)

**Scenario**: A customer in Bangalore has a broken Samsung phone screen.

```bash
curl -X POST http://localhost:3000/api/service-requests \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "customer123",
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
      "street": "123 MG Road",
      "city": "Bangalore",
      "state": "Karnataka",
      "pincode": "560001"
    },
    "priority": "medium"
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Service request created and technician assigned",
  "data": {
    "serviceRequest": {
      "_id": "request123",
      "status": "assigned",
      "estimatedPrice": 1500,
      "responseTime": "2026-01-01T19:00:00.000Z"
    },
    "technician": {
      "_id": "tech456",
      "name": "Rajesh Kumar",
      "phone": "+91-9876543210",
      "rating": 4.5
    },
    "estimatedResponseTime": 45,
    "distance": 3500
  }
}
```

### 2. Track Service Request (Live Tracking)

**Scenario**: Customer wants to track where the technician is.

```bash
curl http://localhost:3000/api/service-requests/request123/track
```

**Response**:
```json
{
  "success": true,
  "data": {
    "serviceRequest": {
      "_id": "request123",
      "status": "assigned",
      "customer": {
        "name": "Amit Sharma",
        "phone": "+91-9876543211"
      },
      "technician": {
        "name": "Rajesh Kumar",
        "phone": "+91-9876543210",
        "location": {
          "coordinates": [77.5900, 12.9700]
        },
        "rating": 4.5
      }
    },
    "trackingInfo": {
      "distanceRemaining": 2500,
      "eta": 35,
      "lastUpdated": "2026-01-01T18:30:00.000Z"
    }
  }
}
```

### 3. Create Job Card (Technician Arrives)

**Scenario**: Technician arrives and starts the job by creating a job card with before photos.

```bash
curl -X POST http://localhost:3000/api/job-cards \
  -H "Content-Type: application/json" \
  -d '{
    "serviceRequestId": "request123",
    "technicianId": "tech456",
    "customerId": "customer123",
    "beforeImages": [
      {
        "url": "https://example.com/before-screen-broken.jpg"
      }
    ],
    "workDescription": "Screen has multiple cracks. Replacement required."
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Job card created successfully",
  "data": {
    "_id": "jobcard789",
    "serviceRequest": "request123",
    "startTime": "2026-01-01T19:15:00.000Z",
    "isVerified": false,
    "beforeImages": [
      {
        "url": "https://example.com/before-screen-broken.jpg",
        "uploadedAt": "2026-01-01T19:15:00.000Z"
      }
    ]
  }
}
```

### 4. Complete Job Card (Work Finished)

**Scenario**: Technician completes the repair and uploads after photos with parts details.

```bash
curl -X PATCH http://localhost:3000/api/job-cards/jobcard789/complete \
  -H "Content-Type: application/json" \
  -d '{
    "afterImages": [
      {
        "url": "https://example.com/after-screen-fixed.jpg"
      }
    ],
    "partsUsed": [
      {
        "name": "Samsung Galaxy S21 AMOLED Screen",
        "quantity": 1,
        "price": 1200
      },
      {
        "name": "Screen Adhesive",
        "quantity": 1,
        "price": 50
      }
    ],
    "laborCost": 300,
    "technicianNotes": "Screen replaced successfully. Tested all functions. Display and touch working perfectly.",
    "customerSignature": "base64_encoded_signature"
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Job card completed successfully",
  "data": {
    "_id": "jobcard789",
    "serviceRequest": "request123",
    "startTime": "2026-01-01T19:15:00.000Z",
    "endTime": "2026-01-01T20:00:00.000Z",
    "totalCost": 1800,
    "isVerified": true,
    "beforeImages": [...],
    "afterImages": [...],
    "partsUsed": [...]
  }
}
```

### 5. Get Job Card Details (Transparency)

**Scenario**: Customer wants to see the detailed breakdown of charges.

```bash
curl http://localhost:3000/api/job-cards/jobcard789
```

**Response**:
```json
{
  "success": true,
  "data": {
    "jobCard": {
      "_id": "jobcard789",
      "beforeImages": [...],
      "afterImages": [...],
      "partsUsed": [...],
      "laborCost": 300,
      "totalCost": 1800,
      "workDescription": "Screen has multiple cracks. Replacement required.",
      "technicianNotes": "Screen replaced successfully..."
    },
    "priceBreakdown": {
      "laborCost": 300,
      "partsCost": 1250,
      "partsMarkup": 250,
      "totalCost": 1800,
      "breakdown": [
        {
          "name": "Samsung Galaxy S21 AMOLED Screen",
          "quantity": 1,
          "unitPrice": 1200,
          "totalPrice": 1200
        },
        {
          "name": "Screen Adhesive",
          "quantity": 1,
          "unitPrice": 50,
          "totalPrice": 50
        }
      ]
    }
  }
}
```

### 6. Update Service Request Status

**Scenario**: Update the status as the job progresses.

```bash
curl -X PATCH http://localhost:3000/api/service-requests/request123/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress"
  }'
```

### 7. Get Customer's Service History

**Scenario**: Customer wants to see all their past service requests.

```bash
curl http://localhost:3000/api/service-requests/customer/customer123
```

### 8. Get Technician's Assigned Jobs

**Scenario**: Technician wants to see all pending jobs.

```bash
curl http://localhost:3000/api/service-requests/technician/tech456
```

## Standard Pricing Examples

### Mobile Repairs
- Screen Replacement: ₹1,500
- Battery Replacement: ₹800
- Charging Port Repair: ₹500
- Water Damage: ₹2,000
- Software Issues: ₹300
- General Diagnosis: ₹200

### Laptop Repairs
- Screen Replacement: ₹3,500
- Battery Replacement: ₹2,500
- Keyboard Replacement: ₹1,500
- Hard Drive Replacement: ₹2,000
- RAM Upgrade: ₹1,000
- Software Installation: ₹500
- General Diagnosis: ₹300

### Appliances Repairs
- Washing Machine Repair: ₹1,500
- Refrigerator Repair: ₹2,000
- AC Service: ₹800
- Microwave Repair: ₹1,000
- General Diagnosis: ₹400

## Key Features Demonstrated

### 1. Trust
- ✓ Standardized pricing (₹1,500 for screen replacement)
- ✓ Before/after image verification
- ✓ Detailed price breakdown with parts and labor

### 2. Speed
- ✓ GPS-based matching (3.5 km distance)
- ✓ Response time: 45 minutes (< 2 hours target ✓)
- ✓ Real-time technician availability

### 3. Transparency
- ✓ Live tracking with ETA
- ✓ Digital job cards
- ✓ Itemized billing
- ✓ Customer signature verification

## Testing the API

You can test the API using:
- cURL (as shown above)
- Postman
- Any HTTP client

## Health Check

To verify the server is running:
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-01-01T18:30:00.000Z"
}
```

## API Root

To see API information:
```bash
curl http://localhost:3000/
```

Expected response:
```json
{
  "name": "TechCare API",
  "description": "Hyperlocal Electronics Repair Marketplace",
  "version": "1.0.0",
  "features": [
    "GPS-based technician matching",
    "Live tracking",
    "Digital job cards with before/after verification",
    "Standardized pricing",
    "Response time < 2 hours"
  ]
}
```
