import React from 'react';
import { Activity, Radio, Home, User, Building2 } from 'lucide-react';

export const SmartCareNavbar = ({ activeFlow, setActiveFlow, isConnected }) => {
  return (
    <header className="glass-nav sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveFlow('home')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Activity className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Smart<span className="text-cyan-400">Care</span>
          </h1>
          <p className="text-xs text-slate-400">AI Hospital Disease Prediction & Interaction</p>
        </div>
      </div>

      <nav className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveFlow('home')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeFlow === 'home'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home size={16} />
          Home
        </button>

        <button
          onClick={() => setActiveFlow('patient')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeFlow === 'patient'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User size={16} />
          Patient Flow
        </button>

        <button
          onClick={() => setActiveFlow('hospital')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeFlow === 'hospital'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 size={16} />
          Hospital Flow
        </button>
      </nav>

      <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
        <Radio size={14} className={isConnected ? 'text-emerald-400 animate-ping' : 'text-slate-500'} />
        <span className={isConnected ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
          {isConnected ? 'Real-Time Sync' : 'Connecting...'}
        </span>
      </div>
    </header>
  );
};
