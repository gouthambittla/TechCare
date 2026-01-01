# 🛠️ Tech Care – Hyperlocal Electronics Repair Platform

Tech Care is a **hyperlocal, managed marketplace** that connects customers facing electronic device issues with **verified, nearby technicians**.
The platform focuses on **trust, speed, and transparency** to modernize the fragmented electronics repair ecosystem in India.

---

## 🚀 Core Value Proposition

* **Trust**

  * Standardized pricing
  * Digital *Before & After* photo verification
  * Secure device handover using OTP

* **Speed**

  * GPS-based technician matching
  * Average response time target: **< 2 hours**

* **Transparency**

  * Live technician tracking
  * Digital job cards
  * Clear service status updates

---

## 👥 User Personas

### 1. Customer

**Rohan – Busy Professional**

* Wants quick repairs without visiting shops
* Concerned about overpricing and part theft

### 2. Technician

**Suresh – Skilled Technician**

* Wants consistent job flow and predictable income
* Limited to neighborhood reach today

### 3. Admin

**Operations Lead**

* Needs real-time visibility into jobs
* Handles disputes, verification, and commissions

---

## 📱 Applications Overview

### Customer App

* Mobile Number + OTP login
* Smart diagnostics wizard
* Fixed-price & diagnosis-based bookings
* Real-time technician tracking
* SOS & masked calling for safety

### Technician App (Office App)

* Digital KYC & skill onboarding
* Geo-fenced job alerts
* Digital Job Card with:

  * GPS-based check-in
  * OTP-based device custody
  * Mandatory in-app photo capture (Before/After)
* Wallet & payout management

### Admin Dashboard

* Live operations map (God View)
* Technician KYC verification
* Dispute resolution (Before vs After)
* Commission configuration engine

---

## 🧠 System Architecture

```
React Native (Expo)
        |
        |  REST + Socket.io
        |
Node.js (Express)
        |
PostgreSQL
        |
Cloudinary / AWS S3
```

---

## 🧑‍💻 Tech Stack

### Mobile Apps

* **React Native (Expo)**
* TypeScript
* Expo Camera
* Socket.io Client

### Backend

* Node.js
* Express.js
* Socket.io
* JWT Authentication

### Database

* PostgreSQL (Local / Supabase)

### Storage

* Cloudinary (Phase 1)
* AWS S3 (Phase 2)

### Maps

* Google Maps API (Phase 1)
* MapmyIndia (Phase 2 – cost optimization)

---

## 🔁 Core Service Flow

1. Customer raises a repair request
2. Job is broadcast to nearby technicians
3. Technician accepts the job
4. GPS-based arrival verification
5. OTP-based device handover
6. Before repair photo capture
7. Repair completion
8. After repair photo capture
9. Job completion & payment

---

## 🏃 Agile Sprint Roadmap

### Phase 1 – Backbone (Weeks 1–2)

* Project setup (Expo + Node.js)
* PostgreSQL schema
* Mock OTP authentication
* JWT-based session handling

### Phase 2 – Supply Side (Weeks 3–4)

* Technician dashboard
* Job listing & acceptance
* Trust Engine (Camera + image upload)
* Job completion rules

### Phase 3 – Demand & Matching (Weeks 5–6)

* Customer booking flow
* Diagnostics wizard
* Socket-based real-time updates
* Mock payments & notifications

---

## 📂 Repository Structure (Planned)

```
techcare/
├── apps/
│   ├── customer-app/
│   └── technician-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── models/
│   └── index.ts
├── database/
│   └── migrations/
├── docs/
└── README.md
```

---

## ⚙️ Local Development Setup

### 1. Frontend (Expo)

```bash
npm install
npx expo start
```

### 2. Backend

```bash
npm install
npm run dev
```

### 3. Database

* PostgreSQL (Local) **or**
* Supabase (Free Tier)

---

## 🔐 Authentication (Mocked for MVP)

* OTP is hardcoded as `1234`
* JWT tokens are real
* Phone number-based identity simulation

---

## 🎯 Project Goals

* Demonstrate **real-world system design**
* Showcase **trust-first product thinking**
* Build a **portfolio-grade, scalable app**
* Follow **Agile & Sprint-based execution**

---

## 📌 Status

🚧 **Actively under development (MVP Phase)**

---

## 👨‍💻 Author

**Goutham Bittla**
Frontend & Full-Stack Engineer
React Native | Node.js | Real-time Systems

---

If you want, next I can:

* Split this into **FE + BE README**
* Create a **System Design diagram**
* Generate **DB schema (Postgres)**
* Create **Socket.io event contracts**
* Prepare a **resume-ready project explanation**

Just tell me 👍
