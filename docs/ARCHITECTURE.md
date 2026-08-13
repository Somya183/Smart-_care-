# 🏗️ Architecture & System Design Document

## 1. System Overview

The **MedPulse ER Smart Emergency Management System** is built with an event-driven, decoupled architecture. It bridges real-time patient symptom intake, clinical natural language triage scoring, dynamic waitlist priority scheduling, and WebSocket-driven live dashboards for doctors and hospital administrators.

```
+------------------+         +------------------+         +--------------------+
|  Patient PWA App |         |  Staff Dashboard |         |  Admin Analytics   |
| (React + SW)     |         | (React + Sockets)|         | (React + Charts)   |
+--------+---------+         +--------+---------+         +---------+----------+
         |                            |                             |
         +----------------------------+-----------------------------+
                                      | (REST + WebSockets)
                                      v
                        +----------------------------+
                        |  Express Node.js Server    |
                        | (Socket.IO + REST API)     |
                        +--------------+-------------+
                                       |
           +---------------------------+---------------------------+
           |                           |                           |
           v                           v                           v
+--------------------+   +--------------------+   +--------------------+
| AI Triage Engine   |   | Priority Queue     |   | PostgreSQL / DB    |
| (NLP + Rules)      |   | Dynamic Scheduler  |   | Storage Layer      |
+--------------------+   +--------------------+   +--------------------+
```

---

## 2. AI Triage Engine Design

The AI Triage Engine takes raw natural-language symptoms (e.g. *"Severe crushing chest pain radiating to left arm with diaphoresis"*), combined with patient demographics (age, pre-existing conditions) and vital signs.

### Triage Levels (Emergency Severity Index):
1. **Level 1 (Resuscitation / Red)**: Life-threatening emergencies requiring immediate attention.
2. **Level 2 (Emergent / Orange)**: High-risk presentation, altered mental status, severe pain, unstable vitals.
3. **Level 3 (Urgent / Yellow)**: Stable vitals but complex resource requirement (e.g., severe abdominal pain, high fever).
4. **Level 4 (Less Urgent / Green)**: Simple injuries, isolated rash, mild sprains, stable condition.
5. **Level 5 (Non-Urgent / Blue)**: Minor complaints, medication refills, suture removal.

### Department Automated Router:
- **Cardiology / Cath Lab**: Chest pain, arrhythmia, SOB with cardiac history.
- **Neurology / Stroke Unit**: Facial drooping, slurred speech, acute weakness, severe head trauma.
- **Pediatrics**: Patients under 16 years with pediatric acute indications.
- **Trauma & Emergency Surgery**: Penetrating injuries, major lacerations, high-impact accidents.
- **General Emergency Medicine**: All other standard acute complaints.

---

## 3. Dynamic Priority Queue Algorithm

Standard queues use simple First-In-First-Out (FIFO), which fails in emergency rooms where a critical patient arriving later must be seen immediately.

MedPulse ER uses a **Dynamic Priority Score Calculation**:

$$\text{Priority Score} = (\text{Severity Weight} \times 1000) + (\text{Elapsed Wait Time (Mins)} \times 5) + (\text{Vitals Risk Index} \times 50)$$

### Severity Weights:
- Level 1 (Critical): `50`
- Level 2 (Emergent): `40`
- Level 3 (Urgent): `30`
- Level 4 (Less Urgent): `20`
- Level 5 (Non-Urgent): `10`

### Starvation Protection:
Every minute spent in queue adds `+5` points to the priority score. This guarantees that non-critical patients continuously gain priority relative to newly arriving non-urgent cases, eliminating queue starvation.

---

## 4. WebSocket Real-Time Event Architecture

### Client to Server Events:
- `join:department` - Room subscription by staff members.
- `join:patient_tracker` - Room subscription by patient tracking ID.
- `case:reassign` - Doctor reassigns a patient to another department or doctor.
- `vitals:update` - Nurse inputs updated vitals, triggering re-triage score calculation.

### Server to Client Events:
- `triage:new_case` - Broadcasted to department staff when a patient finishes intake.
- `queue:reordered` - Emitted whenever a higher priority patient enters or wait times recalculate.
- `patient:status_changed` - Updates patient tracker (e.g. Triage -> In Treatment -> Discharged).
- `alert:critical_patient` - High-priority pop-up notification for Level 1 & 2 cases.
