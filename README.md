# RK FOUNDATION — Production NGO Web Platform & CMS

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-v4-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6%2B-brightgreen.svg)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)

A modern, trustworthy, production-ready NGO management platform built for **RK FOUNDATION** (Govt. Registered Public Charitable Trust). Benchmarked against [Rebirth Care Trust](https://rebirthcaretrust.org/) with original branding, comprehensive dynamic content management, real-time donation processing with instant Section 80G tax receipt generation, volunteer pipelines, and an executive administration dashboard.

---

## 1. Architecture & Technology Stack

The project adheres strictly to a clean, decoupled client-server architecture:

```text
RK_FOUNDATION/
├── client/                      # React.js SPA (Vite + React Router DOM + Tailwind CSS)
│   ├── public/                  # Favicons, logo SVG, assets
│   ├── src/
│   │   ├── assets/              # Branding assets
│   │   ├── components/          # Reusable UI components (Navbar, Footer, Modals)
│   │   ├── context/             # AuthContext, WebsiteContext
│   │   ├── layouts/             # PublicLayout, AdminLayout
│   │   ├── pages/               # Public pages (Home, About, Programs, Projects, Donate, etc.)
│   │   │   └── admin/           # Admin pages (Dashboard, CMS, Donations, Volunteers, Users)
│   │   ├── services/            # Axios API client with auth interceptors
│   │   ├── styles/              # Global CSS & Tailwind design system
│   │   ├── App.jsx              # Application router
│   │   └── main.jsx             # React entry point
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Node.js + Express.js REST API + MongoDB
│   ├── src/
│   │   ├── config/              # MongoDB connection & fallback handler
│   │   ├── controllers/         # Auth, CMS, Donation, Volunteer, Analytics controllers
│   │   ├── middleware/          # JWT auth, role validation, error handler, uploads
│   │   ├── models/              # Mongoose schemas (10 collections)
│   │   ├── routes/              # Express API routers
│   │   ├── scripts/             # Database seeder script
│   │   ├── app.js               # Express application configuration
│   │   └── server.js            # Server entry point
│   ├── uploads/                 # Uploaded media storage
│   ├── .env.example
│   └── package.json
│
├── README.md
└── .gitignore
```

### Technology Highlights
- **Frontend**: React 19, Vite 6, React Router DOM v7, Tailwind CSS v4, Lucide React icons, Axios.
- **Backend**: Node.js v24, Express.js 4, MongoDB & Mongoose 8, JWT Authentication, bcryptjs, Helmet, Express Rate Limit, Multer, Razorpay SDK.
- **Design System**: Deep Trust Navy (`#0A2540`), Compassion Emerald (`#10B981`), Amber (`#F59E0B`), and clean accessible typographic hierarchy.

---

## 2. Key Features & Reference Benchmark Alignment

### Public Portal (Donor & Visitor Journey)
1. **Dynamic Homepage**: Hero appeal slider, Quick Donation box, live impact counters, core programs preview, urgent causes with funding progress bars, on-ground field reports, photo gallery, testimonials, and statutory credentials.
2. **About Us & Governance**: Detailed background, trust deed details, NITI Aayog NGO Darpan UID (`DL/2021/0298412`), 80G and 12A tax certifications, and operational pillars.
3. **Mission, Vision & Values**: Strategic goals, community commitment, and non-discriminatory service charter.
4. **Charitable Programs**: Child Welfare & Slum Schools, Women Vocational Tailoring Hubs, Mobile Pediatric Health Camps, Nutritional Grocery Packs, and Elderly Care.
5. **Urgent Causes & Campaigns**: Live fundraising appeals with target vs raised amounts, percentage progress bars, and donor counts.
6. **Field Activities**: On-ground event documentation, dates, locations, and beneficiary metrics.
7. **Photo Archives & Lightbox**: Categorized media gallery with instant high-resolution modal preview.
8. **Press Releases & Stories**: Field updates and success stories with tag filtering.
9. **Donation System**:
   - Preset amounts (₹500, ₹1000, ₹2500, ₹5000, ₹10000, ₹25000) or custom inputs.
   - Purpose/Campaign allocation.
   - Section 80G tax deduction claim with PAN collection.
   - Online payment processing & Direct NEFT/RTGS/UPI transfer instructions.
   - **Instant Printable 80G Tax Exemption Receipt** with unique verification number (`RKF-YYYY-REC-XXXXXX`).
10. **Volunteer Registration**: Multi-step application with availability, skills, areas of interest, and immediate coordinator acknowledgment.
11. **Inquiry & Contact**: Office locations, direct emergency helplines, interactive message form, and FAQs.
12. **Receipt Verification Portal**: Public verification tool (`/receipt/verify`) allowing donors to validate any receipt and reprint certificates.
13. **Statutory Legal Pages**: Privacy Policy, Terms & Conditions, and 7-Day Refund Policy.

### Executive Administration Dashboard (`/admin`)
1. **Dashboard Analytics**: Real-time KPI statistics (Total Funds Raised, Volunteer Counts, Active Projects, Inquiries) and recent transaction tables.
2. **Website CMS**: Dynamic editor for Foundation branding, contact phone numbers, official emails, 80G/12A/PAN compliance numbers, bank transfer details, homepage hero text, announcement banner, and impact counter stats.
3. **Programs Manager**: Full CRUD for educational and welfare programs.
4. **Campaigns Manager**: Full CRUD for live causes, target goals, raised figures, and urgent badges.
5. **Field Activities Manager**: Record on-ground relief operations, dates, photos, and beneficiary counts.
6. **Media Gallery Manager**: Upload, categorize, and curate field photos.
7. **News & Stories Manager**: Publish articles, press releases, and success stories.
8. **Testimonials Manager**: Manage donor and beneficiary reviews.
9. **Donations Ledger**: Complete audit trail, status filters, search by donor or receipt number, duplicate receipt generation, and **CSV Export**.
10. **Volunteer Pipeline**: Review applicants, filter by status (Pending, Approved, Contacted, Rejected), and store coordinator notes.
11. **Inquiries Tracker**: Review contact messages, mark as Read/Replied/Archived, and filter spam.
12. **User & Access Control**: Super Admin management of admin accounts with bcrypt password protection.

---

## 3. Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (included with Node.js)

### Step 1: Clone or Navigate to the Project
```bash
cd d:\RK_FOUNDATION
```

### Step 2: Configure Environment Variables

**Server Configuration (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/rk_foundation
JWT_SECRET=rk_foundation_jwt_super_secure_secret_key_2026_xyz987
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=rzp_test_RKFoundationKey123
RAZORPAY_KEY_SECRET=RKFoundationSecretValue456
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=5
INITIAL_ADMIN_NAME="RK Foundation Super Admin"
INITIAL_ADMIN_EMAIL=admin@rkfoundation.org
INITIAL_ADMIN_PASSWORD=Admin@RK2026!

# ImageKit Cloud CDN Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

> **ImageKit Cloud Integration**: When `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, and `IMAGEKIT_URL_ENDPOINT` are provided in `server/.env`, image uploads across the Admin Dashboard (Gallery, Programs, Campaigns, News) are automatically processed, optimized, and served via ImageKit's global CDN! If left as placeholder values, the system seamlessly uses secure local storage in `server/uploads/` with zero configuration.

> **Note on MongoDB**: If a local or MongoDB Atlas instance is configured in `MONGODB_URI`, the server connects to it directly. If no local MongoDB service is running, the server automatically initializes an in-memory database in development mode for seamless zero-config startup!

**Client Configuration (`client/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME="RK FOUNDATION"
VITE_RAZORPAY_KEY_ID=rzp_test_RKFoundationKey123
```

---

### Step 3: Seed Database with Initial Content
Populate initial programs, campaigns, news, testimonials, and default Super Admin credentials:
```bash
cd server
npm run seed
```

**Default Admin Credentials:**
- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@rkfoundation.org`
- **Password**: `Admin@RK2026!`

---

### Step 4: Run the Application

Open two separate terminal windows:

**Terminal 1 — Backend API Server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 — Frontend Client:**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

Now open **`http://localhost:5173`** in your browser!

---

## 4. Production Deployment Guide

### Frontend Deployment (Vercel / Netlify)
1. Build the frontend: `cd client && npm run build`.
2. Connect your Git repository to Vercel or Netlify.
3. Set the Root Directory to `client`.
4. Configure Build Command: `npm run build` and Output Directory: `dist`.
5. Set Environment Variable: `VITE_API_BASE_URL=https://your-backend-domain.com/api`.

### Backend Deployment (Render / Railway / DigitalOcean)
1. Set the Root Directory to `server`.
2. Configure Build Command: `npm install` and Start Command: `npm start`.
3. Set Environment Variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `CLIENT_URL=https://your-frontend-domain.com`
   - `MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/rk_foundation`
   - `JWT_SECRET=<your-high-entropy-jwt-secret>`
   - `RAZORPAY_KEY_ID=<your-live-razorpay-key>`
   - `RAZORPAY_KEY_SECRET=<your-live-razorpay-secret>`

---

## 5. Security & Verification
- Cryptographic password hashing with `bcryptjs`.
- JWT authentication with Bearer tokens and role-based route guards.
- Razorpay webhook and cryptographic HMAC SHA256 payment signature verification (`crypto.createHmac`).
- Helmet HTTP security headers and CORS protection.
- Express rate limiting on API routes.
- Sanitized input queries protecting against NoSQL injection.

