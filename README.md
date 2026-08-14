# 🏥 SMARTCARE - AI Smart Hospital Emergency Management System

An end-to-end Smart Emergency Management System featuring AI Triage (Levels 1–5), Dynamic Priority Queueing, WebSocket Real-Time Dashboards, PWA Patient Tracking, and Relational Database Schema.


# Key Features

# 1. AI-Powered Emergency Triage Engine
- Natural Language Symptom Analysis: Evaluates patient input using an NLP keyword & clinical risk model.
- Emergency Level Assessment (1–5):
  - Level 1 (Critical / Resuscitation): Immediate life threat (e.g., cardiac arrest, severe trauma, respiratory failure).
  - Level 2 (Emergent): High risk, acute chest pain, stroke symptoms, unstable vitals.
  - Level 3 (Urgent): Moderate distress, stable vitals, severe abdominal pain, fractures.
  - Level 4 (Less Urgent): Mild injuries, low fever, minor lacerations.
  - Level 5 (Non-Urgent): Routine checkup, prescription renewal, minor rash.
- Automated Department Assignment: Routes cases to Trauma/ER, Cardiology, Neurology, Pediatrics, Orthopedics, or General Medicine.

# 2. Dynamic Priority Queueing Engine
- Intelligent Re-ordering: Automatically moves critical cases ahead of less urgent ones.
- Starvation Prevention: Dynamically increases priority score based on elapsed wait time so non-critical patients are not delayed indefinitely.
- Formula: Priority Score = (Severity Weight × 1000) + (Wait Time Mins × 5) + (Vitals Risk Score × 50)

# 3. Real-Time WebSocket Synchronization
- Live bidirectional updates via WebSockets (Socket.IO).
- Doctors & staff see immediate notifications when new triage cases arrive, priorities change, or beds are assigned.
- Patients track their exact queue position and estimated wait time live on their phone without refreshing.

# 4. Progressive Web App (PWA)
- Patient-facing portal works as an installable PWA with offline caching, push notification prompts, and responsive mobile UX.

# 5. Staff & Admin Dashboards
- Staff Triage Board: Filter by department, view patient vitals history, accept/re-triage cases, update status.
- Admin Analytics: Monitor ER throughput, average response times per triage level, department congestion, and AI triage precision.

---

# Project Architecture Overview

```
Hospital Management System/
├── backend/
│   ├── config/             # DB & environment configs
│   ├── db/                 # PostgreSQL schema (schema.sql) & mock database seed (seed.js)
│   ├── src/
│   │   ├── controllers/    # Express controllers (auth, patient, triage, queue, doctor, admin)
│   │   ├── middlewares/    # Auth verification & error handling
│   │   ├── models/         # Schema definitions & DB queries
│   │   ├── routes/         # Express API routing endpoints
│   │   ├── services/       # AI Triage engine, Priority Queue scoring, WebSocket gateway
│   │   ├── socket/         # Real-time WebSocket event handlers
│   │   └── utils/          # Risk score algorithms & clinical NLP helpers
│   ├── .env.example
│   ├── package.json
│   └── server.js           # Server startup script
├── frontend/
│   ├── public/             # PWA Web Manifest (manifest.json) & Service Worker (sw.js)
│   ├── src/
│   │   ├── components/     # UI components (patient, staff, admin, common widgets)
│   │   ├── context/        # React context for Auth & Socket.IO real-time state
│   │   ├── pages/          # Patient Portal, Doctor Dashboard, Admin Analytics
│   │   ├── services/       # Axios API client & Socket.IO client
│   │   ├── utils/          # Emergency badges & queue helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css       # Styling system (dark theme, glassmorphism, animations)
│   ├── vite.config.js
│   └── package.json
├── docs/                   # Full documentation suite
│   ├── ARCHITECTURE.md     # Dynamic Priority algorithm & system design
│   ├── API_SPEC.md         # REST API & Socket event specifications
│   └── DATABASE_SCHEMA.md  # Relational ERD & database tables structure
├── docker-compose.yml      # Orchestration setup for PostgreSQL, Backend, Frontend
└── README.md
```

---

# Getting Started

# Prerequisites
- Node.js: v18+
- npm or yarn
- PostgreSQL: v14+ (or run via Docker)

# 1. Installation
```bash
# Clone the repository
git clone https://github.com/Somya183/Project.git
cd "Project"

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

#2. Environment Setup
Create a `.env` file in `backend/` (based on `.env.example`):
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hospital_management
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=super-secret-key-change-in-production
CLIENT_URL=http://localhost:5173
```

# 3. Database Initialization
```bash
cd backend
npm run db:setup
npm run db:seed
```

# 4. Running the Application
```bash
# Run backend (terminal 1)
cd backend
npm run dev

# Run frontend (terminal 2)
cd frontend
npm run dev
```

---

# Quick Docker Setup
To launch the full stack (PostgreSQL + Express Backend + React Frontend):
```bash
docker-compose up --build
```
