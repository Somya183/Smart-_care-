import React, { useState } from 'react';
import { SocketProvider, useSocket } from './context/SocketContext';
import { SmartCareNavbar } from './components/common/SmartCareNavbar';
import { HomePage } from './pages/HomePage';
import { PatientFlowWizard } from './components/patient/PatientFlowWizard';
import { HospitalFlowDashboard } from './components/hospital/HospitalFlowDashboard';

function MainApp() {
  const [activeFlow, setActiveFlow] = useState('home');
  const { isConnected } = useSocket();

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans">
      <SmartCareNavbar
        activeFlow={activeFlow}
        setActiveFlow={setActiveFlow}
        isConnected={isConnected}
      />

      <main className="app-container flex-1 py-8">
        {activeFlow === 'home' && <HomePage onSelectFlow={(flow) => setActiveFlow(flow)} />}
        {activeFlow === 'patient' && <PatientFlowWizard />}
        {activeFlow === 'hospital' && <HospitalFlowDashboard />}
      </main>

      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        SmartCare &copy; 2026 AI System for Hospital Disease Prediction & Patient-Hospital Interaction
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
