import React from 'react';
import { Activity, Radio, UserCheck, ShieldAlert, LayoutDashboard } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, isSocketConnected }) => {
  return (
    <header className="glass-nav sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Activity className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            MedPulse <span className="text-cyan-400">ER</span>
          </h1>
          <p className="text-xs text-slate-400">Smart Hospital AI Triage & Queue</p>
        </div>
      </div>

      <nav className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab('patient')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'patient'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck size={16} />
          Patient Intake
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'staff'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert size={16} />
          Doctor Dashboard
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'admin'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard size={16} />
          Admin Analytics
        </button>
      </nav>

      <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
        <Radio size={14} className={isSocketConnected ? 'text-emerald-400 animate-ping' : 'text-slate-500'} />
        <span className={isSocketConnected ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
          {isSocketConnected ? 'Live Gateway Sync' : 'Connecting...'}
        </span>
      </div>
    </header>
  );
};
