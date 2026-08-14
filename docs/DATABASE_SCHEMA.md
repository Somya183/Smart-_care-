#  Database Schema & Relational Structure

This project uses PostgreSQL for structured relational data management.

# ERD Overview & Tables

```
 +--------------------+       +---------------------+       +---------------------+
 |       users        |       |   patient_profiles  |       |     departments     |
 +--------------------+       +---------------------+       +---------------------+
 | id (PK)            |<----->| id (PK)             |       | id (PK)             |
 | email              |       | user_id (FK)        |       | name                |
 | password_hash      |       | date_of_birth       |       | code                |
 | role               |       | blood_group         |       | capacity            |
 | created_at         |       | emergency_contact   |       | active_doctors      |
 +--------------------+       +---------------------+       +---------------------+
                                         |                             |
                                         v                             v
                              +---------------------+       +---------------------+
                              |    triage_cases     |<----->|     queue_items     |
                              +---------------------+       +---------------------+
                              | id (PK)             |       | id (PK)             |
                              | patient_id (FK)     |       | case_id (FK)        |
                              | dept_id (FK)        |       | dept_id (FK)        |
                              | triage_level (1-5)  |       | priority_score      |
                              | symptoms_text       |       | position            |
                              | status              |       | status              |
                              | vitals (JSONB)      |       | wait_start_time     |
                              +---------------------+       +---------------------+
                                         |
                                         v
                              +---------------------+
                              |     audit_logs      |
                              +---------------------+
                              | id (PK)             |
                              | case_id (FK)        |
                              | action              |
                              | timestamp           |
                              +---------------------+
```

## Relational Tables Schema

# 1. `users`
- `id` (UUID, PK)
- `email` (VARCHAR 255, UNIQUE)
- `password_hash` (VARCHAR 255)
- `full_name` (VARCHAR 100)
- `role` (ENUM: 'PATIENT', 'DOCTOR', 'NURSE', 'ADMIN')
- `created_at` (TIMESTAMP)

# 2. `patient_profiles`
- `id` (UUID, PK)
- `user_id` (UUID, FK -> `users.id`)
- `date_of_birth` (DATE)
- `gender` (VARCHAR 20)
- `blood_group` (VARCHAR 5)
- `medical_history` (TEXT[])
- `allergies` (TEXT[])
- `emergency_contact_phone` (VARCHAR 20)

# 3. `departments`
- `id` (UUID, PK)
- `code` (VARCHAR 20, UNIQUE) - e.g. 'EMERGENCY_CARDIOLOGY'
- `name` (VARCHAR 100)
- `capacity` (INT)
- `current_occupancy` (INT)

# 4. `triage_cases`
- `id` (UUID, PK)
- `patient_id` (UUID, FK -> `patient_profiles.id`)
- `assigned_dept_id` (UUID, FK -> `departments.id`)
- `triage_level` (INT: 1 to 5)
- `chief_complaint` (TEXT)
- `pain_score` (INT: 1-10)
- `vitals_json` (JSONB) - `{ heart_rate, bp, spo2, temp, resp_rate }`
- `ai_confidence` (NUMERIC 3, 2)
- `status` (ENUM: 'QUEUED', 'IN_TRIAGE', 'WITH_DOCTOR', 'DISCHARGED', 'ADMITTED')
- `created_at` (TIMESTAMP)

# 5. `queue_items`
- `id` (UUID, PK)
- `case_id` (UUID, FK -> `triage_cases.id`, UNIQUE)
- `department_id` (UUID, FK -> `departments.id`)
- `priority_score` (NUMERIC 10, 2) - Calculated dynamically
- `queue_position` (INT)
- `wait_start_time` (TIMESTAMP)
- `last_calculated_at` (TIMESTAMP)

# 6. `audit_logs`
- `id` (UUID, PK)
- `case_id` (UUID, FK)
- `actor_id` (UUID, FK)
- `action` (VARCHAR 100) - e.g. 'TRIAGE_REASSESSMENT', 'PRIORITY_ESCALATION'
- `details` (JSONB)
- `created_at` (TIMESTAMP)
