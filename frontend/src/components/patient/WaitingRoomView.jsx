import React from 'react';
import { SmartCareSidebar } from '../common/SmartCareSidebar';
import { Users, Clock, Building, AlertTriangle, Info } from 'lucide-react';

export const WaitingRoomView = ({ activeTab = 'waiting', setActiveTab, user, onLogout }) => {
  return (
    <div className="flex bg-slate-100 min-h-[680px] rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
      {/* Left Sidebar */}
      <SmartCareSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-5xl">
        
        {/* Top Patient Info Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">John Doe</h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              DOB: 04/12/1985 &bull; MRN: 987654321
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
            <AlertTriangle size={15} className="text-amber-600" />
            Level 3 - Urgent
          </div>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Patients Ahead */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs text-center flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Users size={20} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">4 Patients Ahead</h3>
            <p className="text-xs text-slate-500 font-medium max-w-[200px]">
              In your designated priority group.
            </p>
          </div>

          {/* Estimated Wait */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs text-center flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Clock size={20} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">~ 45 Mins</h3>
            <p className="text-xs text-slate-500 font-medium max-w-[200px]">
              Estimated wait time. This may fluctuate.
            </p>
          </div>

          {/* Assigned Room */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs text-center flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Building size={20} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Treatment Room B</h3>
            <p className="text-xs text-slate-500 font-medium max-w-[200px]">
              Assigned Location.
            </p>
          </div>
        </div>

        {/* Current Status Progression Card */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
          <h3 className="font-bold text-base text-slate-900">Current Status Progression</h3>

          {/* Progress Bar Container */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600 px-1">
              <span className="text-slate-700">Triage Complete</span>
              <span className="text-blue-700 font-extrabold">Waiting</span>
              <span className="text-slate-400">Treatment</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden relative">
              <div className="h-full bg-amber-500 rounded-full w-[60%] transition-all duration-500"></div>
            </div>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <Info size={14} className="text-slate-400" />
            Status updates dynamically based on ER load.
          </p>
        </div>

        {/* What to Expect Next Card */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">What to Expect Next</h3>

          <ol className="space-y-4 text-xs font-semibold text-slate-700">
            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-700 mt-1 shrink-0"></span>
              <div>
                <span className="font-bold text-slate-900 text-sm block">1. Initial Assessment</span>
                <p className="text-slate-500 font-medium">A nurse has recorded your vitals and initial complaint (Completed).</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1 shrink-0"></span>
              <div>
                <span className="font-bold text-slate-900 text-sm block">2. Call to Treatment Room</span>
                <p className="text-slate-500 font-medium">You will be called to Treatment Room B when it becomes available.</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1 shrink-0"></span>
              <div>
                <span className="font-bold text-slate-900 text-sm block">3. Physician Consultation</span>
                <p className="text-slate-500 font-medium">A doctor will examine you and order any necessary tests or treatments.</p>
              </div>
            </li>
          </ol>
        </div>

      </main>
    </div>
  );
};
