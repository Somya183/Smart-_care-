import React, { useState } from 'react';
import { SocketProvider, useSocket } from './context/SocketContext';
import { SmartCareNavbar } from './components/common/SmartCareNavbar';
import { HomePage } from './pages/HomePage';
import { PatientFlowWizard } from './components/patient/PatientFlowWizard';
import { HospitalFlowDashboard } from './components/hospital/HospitalFlowDashboard';
import { WaitingRoomView } from './components/patient/WaitingRoomView';

function MainApp() {
  const [activeFlow, setActiveFlow] = useState('home');
  const [activeSidebarTab, setActiveSidebarTab] = useState('triage');
  const { isConnected } = useSocket();

  const handleSidebarTabChange = (tab) => {
    setActiveSidebarTab(tab);
    if (tab === 'waiting') {
      setActiveFlow('waiting');
    } else {
      setActiveFlow('hospital');
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 text-slate-900 flex flex-col font-sans">
      <SmartCareNavbar
        activeFlow={activeFlow}
        setActiveFlow={setActiveFlow}
        isConnected={isConnected}
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeFlow === 'home' && <HomePage onSelectFlow={(flow) => setActiveFlow(flow)} />}
        {activeFlow === 'patient' && <PatientFlowWizard />}
        {(activeFlow === 'hospital' || activeFlow === 'records' || activeFlow === 'beds') && (
          <HospitalFlowDashboard 
            activeTab={activeSidebarTab} 
            setActiveTab={handleSidebarTabChange} 
          />
        )}
        {activeFlow === 'waiting' && (
          <WaitingRoomView 
            activeTab="waiting" 
            setActiveTab={handleSidebarTabChange} 
          />
        )}
      </main>

      <footer className="border-t border-slate-300 bg-slate-100 py-3 text-center text-xs font-semibold text-slate-500">
        SmartCare &copy; 2026 AI System for Hospital Disease Prediction & Real-Time Emergency Management
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
