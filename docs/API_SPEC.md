# 🔌 API Specification & WebSocket Protocol

## Base URL
`/api/v1`

---

## 1. Authentication Endpoints

### `POST /auth/register`
Register a new patient or staff member.
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "SecurePassword123",
    "role": "PATIENT",
    "phone": "+15550192834"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": { "id": "u_101", "name": "Jane Doe", "role": "PATIENT" }
  }
  ```

### `POST /auth/login`
Authenticate user and return JWT bearer token.

---

## 2. Patient Intake & Triage Endpoints

### `POST /triage/assess`
Submit symptom description and vitals for AI evaluation.
- **Request Body**:
  ```json
  {
    "patientId": "p_502",
    "symptomsText": "Crushing chest pain radiating to left jaw, sweating, nausea",
    "painLevel": 9,
    "vitals": {
      "heartRate": 115,
      "bloodPressure": "165/100",
      "oxygenSat": 93,
      "temperature": 37.2,
      "respiratoryRate": 24
    },
    "medicalHistory": ["Hypertension", "Type 2 Diabetes"]
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "caseId": "case_8801",
    "triageResult": {
      "level": 1,
      "severityLabel": "Critical / Resuscitation",
      "assignedDepartment": "Cardiology ER",
      "confidence": 0.96,
      "riskFactors": ["Possible Acute Coronary Syndrome", "Hypoxia"],
      "recommendedActions": ["Immediate EKG", "Oxygen Therapy", "Cath Lab Prep"]
    },
    "queuePosition": 1,
    "estimatedWaitMins": 0
  }
  ```

### `GET /patient/status/:caseId`
Get real-time tracking information for a patient.

---

## 3. Priority Queue & Staff Management Endpoints

### `GET /queue/department/:deptId`
Get active priority queue for a specific hospital department sorted by priority score.
- **Headers**: `Authorization: Bearer <token>`
- **Response** (`200 OK`):
  ```json
  {
    "department": "Cardiology ER",
    "totalPatientsWaiting": 4,
    "queue": [
      {
        "queueId": "q_101",
        "caseId": "case_8801",
        "patientName": "Jane Doe",
        "triageLevel": 1,
        "priorityScore": 50450,
        "waitTimeMins": 12,
        "status": "WAITING"
      }
    ]
  }
  ```

### `PATCH /queue/status`
Update case status (WAITING -> IN_PROGRESS -> DISCHARGED / ADMITTED).

---

## 4. WebSocket Real-Time Protocols

### Socket Server Namespace: `/socket.io`

| Event Name | Direction | Payload | Description |
|---|---|---|---|
| `subscribe:dept` | Client -> Server | `{ "deptId": "cardiology" }` | Subscribe staff to live queue changes |
| `subscribe:patient` | Client -> Server | `{ "caseId": "case_8801" }` | Subscribe patient tracker UI |
| `triage:new_case` | Server -> Client | `{ "caseId", "level", "dept", "priorityScore" }` | Broadcast new patient triage |
| `queue:reorder` | Server -> Client | `{ "deptId", "updatedQueue" }` | Broadcast dynamic queue update |
| `alert:escalation` | Server -> Client | `{ "caseId", "reason", "newLevel" }` | Emergency alert for escalating cases |
