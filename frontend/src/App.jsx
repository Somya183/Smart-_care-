import React, { useState } from 'react';
import { SocketProvider, useSocket } from './context/SocketContext';
import { Navbar } from './components/common/Navbar';
import { SymptomIntakeForm } from './components/patient/SymptomIntakeForm';
import { LiveQueueTracker } from './components/patient/LiveQueueTracker';
import { DoctorQueueBoard } from './components/staff/DoctorQueueBoard';
import { AnalyticsDashboard } from './components/admin/AnalyticsDashboard';

function MainApp() {
  const [activeTab, setActiveTab] = useState('patient');
  const [patientTriageData, setPatientTriageData] = useState(null);
  const { isConnected } = useSocket();

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSocketConnected={isConnected}
      />

      <main className="app-container flex-1 py-8">
        {activeTab === 'patient' && (
          <div>
            {!patientTriageData ? (
              <SymptomIntakeForm onIntakeSubmitted={(data) => setPatientTriageData(data)} />
            ) : (
              <LiveQueueTracker
                triageData={patientTriageData}
                onReset={() => setPatientTriageData(null)}
              />
            )}
          </div>
        )}

        {activeTab === 'staff' && <DoctorQueueBoard />}

        {activeTab === 'admin' && <AnalyticsDashboard />}
      </main>

      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        MedPulse ER System &copy; 2026 Smart Hospital Emergency Management. AI Triage Engine v1.0
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SocketProvider>
      <MainApp />
    </SocketProvider>
  );
}
