import React, { useState } from 'react';
import { PlusSquare, Search, AlertCircle, User, Settings, Home, Activity, Stethoscope, LogOut } from 'lucide-react';
import { EmergencyModal } from './EmergencyModal';

export const SmartCareNavbar = ({ activeFlow, setActiveFlow, isConnected, onLogout }) => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const isHomeView = activeFlow === 'home';
  const isPatientView = activeFlow === 'patient';
  const isStaffView = ['hospital', 'records', 'waiting', 'beds', 'admin'].includes(activeFlow);

  return (
    <>
      <header className="bg-slate-100 border-b border-slate-300 px-6 py-3 flex items-center justify-between shadow-xs">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group" 
          onClick={() => setActiveFlow('home')}
        >
          <div className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center text-white font-bold shadow-xs">
            <PlusSquare size={18} className="stroke-[2.5]" />
          </div>
          <h1 className="font-extrabold text-lg tracking-tight text-blue-900 flex items-center gap-1">
            SmartCare <span className="font-semibold text-blue-700">Medical Portal</span>
          </h1>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
          


          {/* PATIENT VIEW: Show Patient Intake Links */}
          {isPatientView && (
            <>
              <button
                onClick={() => setActiveFlow('home')}
                className="hover:text-blue-700 transition flex items-center gap-1 text-slate-600"
              >
                <Home size={15} />
                Home
              </button>

              <button
                onClick={() => setActiveFlow('patient')}
                className="text-blue-700 border-b-2 border-blue-700 pb-0.5 font-bold flex items-center gap-1"
              >
                <Activity size={15} />
                Patient Intake & AI Triage
              </button>
            </>
          )}

          {/* CLINICAL STAFF VIEW: Show Staff Management Tabs */}
          {isStaffView && (
            <>
              <button
                onClick={() => setActiveFlow('hospital')}
                className={`hover:text-blue-700 transition pb-0.5 ${
                  activeFlow === 'hospital' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-600'
                }`}
              >
                Staff Dashboard
              </button>

              <button
                onClick={() => setActiveFlow('records')}
                className={`hover:text-blue-700 transition pb-0.5 ${
                  activeFlow === 'records' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-600'
                }`}
              >
                Patient Records
              </button>

              <button
                onClick={() => setActiveFlow('waiting')}
                className={`hover:text-blue-700 transition pb-0.5 ${
                  activeFlow === 'waiting' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-600'
                }`}
              >
                Waiting Room
              </button>

              <button
                onClick={() => setActiveFlow('beds')}
                className={`hover:text-blue-700 transition pb-0.5 ${
                  activeFlow === 'beds' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-slate-600'
                }`}
              >
                Bed Management
              </button>
            </>
          )}
        </nav>

        {/* Right Section: Search, Emergency Alert & Log Out Button */}
        <div className="flex items-center gap-3">


          {/* Emergency Alert Button */}
          <button 
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition shadow-xs animate-pulse"
          >
            <AlertCircle size={15} />
            Emergency Alert
          </button>

          {/* Log Out Button */}
          {!isHomeView && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-200 hover:bg-red-50 hover:text-red-700 text-slate-700 font-bold text-xs transition border border-slate-300"
            >
              <LogOut size={14} />
              Log Out
            </button>
          )}

          {/* Action icons */}
          <div className="hidden sm:flex items-center gap-2 text-slate-600 ml-1">
            <button className="p-1 hover:text-slate-900 rounded"><User size={18} /></button>
            <button className="p-1 hover:text-slate-900 rounded"><Settings size={18} /></button>
          </div>
        </div>
      </header>

      {/* Emergency SOS & Call Ambulance Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onStartTriage={() => setActiveFlow('patient')}
      />
    </>
  );
};
