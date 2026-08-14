import React, { useState } from 'react';
import { SocketProvider, useSocket } from './context/SocketContext';
import { SmartCareNavbar } from './components/common/SmartCareNavbar';
import { HomePage } from './pages/HomePage';
import { PatientFlowWizard } from './components/patient/PatientFlowWizard';
import { HospitalFlowDashboard } from './components/hospital/HospitalFlowDashboard';
import { WaitingRoomView } from './components/patient/WaitingRoomView';
import { BedManagementView } from './components/hospital/BedManagementView';
import { AdminAnalyticsView } from './components/hospital/AdminAnalyticsView';
import { StaffScheduleView } from './components/hospital/StaffScheduleView';

function MainApp() {
  const [activeFlow, setActiveFlow] = useState('home');
  const [activeSidebarTab, setActiveSidebarTab] = useState('triage');
  const [currentUser, setCurrentUser] = useState(null);
  const { isConnected } = useSocket();

  const handleFlowChange = (flow) => {
    setActiveFlow(flow);
    if (flow === 'hospital') {
      setActiveSidebarTab('dashboard');
    } else if (flow === 'records') {
      setActiveSidebarTab('records');
    } else if (flow === 'waiting') {
      setActiveSidebarTab('waiting');
    } else if (flow === 'beds') {
      setActiveSidebarTab('beds');
    } else if (flow === 'admin') {
      setActiveSidebarTab('admin');
    } else if (flow === 'schedule') {
      setActiveSidebarTab('schedule');
    }
  };

  const handleSidebarTabChange = (tab) => {
    setActiveSidebarTab(tab);
    if (tab === 'waiting') {
      setActiveFlow('waiting');
    } else if (tab === 'beds') {
      setActiveFlow('beds');
    } else if (tab === 'admin') {
      setActiveFlow('admin');
    } else if (tab === 'schedule') {
      setActiveFlow('schedule');
    } else if (tab === 'records' || tab === 'triage') {
      setActiveFlow('records');
    } else {
      setActiveFlow('hospital');
    }
  };

  const handleUserLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveFlow('home');
  };

  return (
    <div className="min-h-screen bg-slate-200 text-slate-900 flex flex-col font-sans">
      <SmartCareNavbar
        activeFlow={activeFlow}
        setActiveFlow={handleFlowChange}
        isConnected={isConnected}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeFlow === 'home' && <HomePage onSelectFlow={(flow) => setActiveFlow(flow)} />}
        
        {activeFlow === 'patient' && (
          <PatientFlowWizard 
            user={currentUser} 
            onLoginSuccess={handleUserLogin} 
          />
        )}
        
        {(activeFlow === 'hospital' || activeFlow === 'records') && (
          <HospitalFlowDashboard 
            activeTab={activeSidebarTab} 
            setActiveTab={handleSidebarTabChange} 
            user={currentUser}
            onLoginSuccess={handleUserLogin}
            onLogout={handleLogout}
          />
        )}
        
        {activeFlow === 'waiting' && (
          <WaitingRoomView 
            activeTab="waiting" 
            setActiveTab={handleSidebarTabChange} 
            user={currentUser}
            onLogout={handleLogout}
          />
        )}
        
        {activeFlow === 'beds' && (
          <BedManagementView 
            activeTab="beds" 
            setActiveTab={handleSidebarTabChange} 
            user={currentUser}
            onLogout={handleLogout}
          />
        )}

        {activeFlow === 'admin' && (
          <AdminAnalyticsView 
            activeTab="admin" 
            setActiveTab={handleSidebarTabChange} 
            user={currentUser}
            onLogout={handleLogout}
          />
        )}

        {activeFlow === 'schedule' && (
          <StaffScheduleView 
            activeTab="schedule" 
            setActiveTab={handleSidebarTabChange} 
            user={currentUser}
            onLogout={handleLogout}
          />
        )}
      </main>
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
