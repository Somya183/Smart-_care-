-- MedPulse ER Smart Hospital Emergency Management System
-- Schema DDL Script

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Enum Types
CREATE TYPE user_role AS ENUM ('PATIENT', 'DOCTOR', 'NURSE', 'ADMIN');
CREATE TYPE case_status AS ENUM ('WAITING', 'IN_TRIAGE', 'WITH_DOCTOR', 'ADMITTED', 'DISCHARGED');

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'PATIENT',
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Patient Profiles Table
CREATE TABLE IF NOT EXISTS patient_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20),
    blood_group VARCHAR(5),
    medical_history TEXT[],
    allergies TEXT[],
    emergency_contact VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    capacity INT DEFAULT 50,
    current_occupancy INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Triage Cases Table
CREATE TABLE IF NOT EXISTS triage_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient_profiles(id) ON DELETE CASCADE,
    assigned_dept_id UUID REFERENCES departments(id),
    triage_level INT CHECK (triage_level BETWEEN 1 AND 5),
    severity_label VARCHAR(50),
    chief_complaint TEXT NOT NULL,
    pain_score INT CHECK (pain_score BETWEEN 1 AND 10),
    vitals_json JSONB,
    ai_confidence NUMERIC(4, 2),
    status case_status DEFAULT 'WAITING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Dynamic Queue Items Table
CREATE TABLE IF NOT EXISTS queue_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID UNIQUE REFERENCES triage_cases(id) ON DELETE CASCADE,
    dept_id UUID REFERENCES departments(id) ON DELETE CASCADE,
    priority_score NUMERIC(12, 2) NOT NULL,
    queue_position INT,
    status case_status DEFAULT 'WAITING',
    wait_start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES triage_cases(id) ON DELETE SET NULL,
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast queue sorting and search
CREATE INDEX IF NOT EXISTS idx_queue_dept_priority ON queue_items (dept_id, priority_score DESC, wait_start_time ASC);
CREATE INDEX IF NOT EXISTS idx_triage_level ON triage_cases (triage_level);
CREATE INDEX IF NOT EXISTS idx_cases_patient ON triage_cases (patient_id);
