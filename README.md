Tech Care – Frontend (React Native / Expo)
Overview

The Tech Care Frontend is a React Native (Expo) application that powers both:

Customer App – raise repair requests & track technicians

Technician App – accept jobs, upload proof, manage work

The app is designed for speed, trust, and real-time interaction.

Key Features
Customer App

Mobile Number + OTP authentication (mocked)

Smart diagnostics wizard

Fixed-price & diagnosis-based booking

Real-time technician tracking

SOS & masked calling

Technician App

Digital KYC onboarding (mock)

Geo-fenced job alerts

Digital Job Card

OTP-based device handover

Mandatory before/after photo capture

Wallet & payout view

Tech Stack

React Native (Expo)

TypeScript

Expo Camera

Socket.io Client

React Navigation

Axios

Folder Structure (Planned)
apps/techcare-fe/
├── src/
│   ├── components/
│   ├── screens/
│   │   ├── auth/
│   │   ├── customer/
│   │   └── technician/
│   ├── navigation/
│   ├── services/
│   │   ├── api.ts
│   │   └── socket.ts
│   ├── hooks/
│   ├── utils/
│   └── types/
├── assets/
├── app.json
└── README.md

Local Setup
Prerequisites

Node.js (>= 18)

Expo CLI

Expo Go app (Android / iOS)

Install & Run
npm install
npx expo start


Scan the QR code using Expo Go.

Authentication (MVP)

OTP is mocked as 1234

JWT token received from backend

Phone number acts as primary identifier

Camera & Proof Capture

Uses Expo Camera

Gallery uploads are blocked

Images uploaded to Cloudinary

URLs stored in backend

Real-Time Updates

Socket.io used for:

New job alerts

Job status updates

Technician live tracking

Goal of Frontend

Fast MVP delivery

Trust-first UX

Portfolio-ready React Native app

Scalable structure for production

Author

Goutham Bittla