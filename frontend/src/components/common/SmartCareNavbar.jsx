import React from 'react';
import { Activity, Radio, Home, User, Building2, Search, AlertCircle, PlusSquare } from 'lucide-react';

export const SmartCareNavbar = ({ activeFlow, setActiveFlow, isConnected }) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between shadow-lg">
      {/* Brand Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => setActiveFlow('home')}
      >
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
          <PlusSquare size={22} className="stroke-[2.5]" />
        </div>
        <div>
          <h1 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
            Smart<span className="text-blue-400">Care</span>
            <span className="text-sm font-semibold text-slate-300 ml-1">Medical Portal</span>
          </h1>
        </div>
      </div>

      {/* Center Controls: Search & Navigation */}
      <div className="flex items-center gap-4 flex-1 max-w-xl mx-8">
        {/* Search input matching screenshot */}
        <div className="relative w-full max-w-xs hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-800/60 p-1 rounded-lg border border-slate-700/50">
          <button
            onClick={() => setActiveFlow('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeFlow === 'home'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home size={14} />
            Home
          </button>

          <button
            onClick={() => setActiveFlow('patient')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeFlow === 'patient'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User size={14} />
            Patient Flow
          </button>

          <button
            onClick={() => setActiveFlow('hospital')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeFlow === 'hospital'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 size={14} />
            Hospital Flow
          </button>
        </nav>
      </div>

      {/* Right Controls: Realtime Status & Emergency Alert Button */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300">
          <Radio size={12} className={isConnected ? 'text-emerald-400 animate-pulse' : 'text-slate-500'} />
          <span className="text-[11px] font-medium">
            {isConnected ? 'Real-Time Sync' : 'Connecting...'}
          </span>
        </div>

        <button 
          onClick={() => setActiveFlow('patient')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-md shadow-red-600/30"
        >
          <AlertCircle size={15} />
          Emergency Alert
        </button>
      </div>
    </header>
  );
};
