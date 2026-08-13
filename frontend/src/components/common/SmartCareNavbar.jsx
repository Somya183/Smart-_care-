import React from 'react';
import { PlusSquare, Search, AlertCircle, User, Settings } from 'lucide-react';

export const SmartCareNavbar = ({ activeFlow, setActiveFlow, isConnected }) => {
  return (
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

      {/* Center Navigation Links (Matching Screenshot 2, 3 & 4) */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
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

        <button
          onClick={() => setActiveFlow('inventory')}
          className="text-slate-600 hover:text-blue-700 transition pb-0.5"
        >
          Inventory
        </button>
      </nav>

      {/* Right Section: Search & Emergency Alert Button */}
      <div className="flex items-center gap-3">
        {/* Search Box */}
        <div className="relative hidden sm:block w-44 lg:w-56">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white border border-slate-300 rounded-md pl-8 pr-3 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Emergency Alert Button */}
        <button 
          onClick={() => setActiveFlow('patient')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition shadow-xs"
        >
          <AlertCircle size={14} />
          Emergency Alert
        </button>

        {/* Action icons */}
        <div className="hidden sm:flex items-center gap-2 text-slate-600 ml-1">
          <button className="p-1 hover:text-slate-900 rounded"><User size={18} /></button>
          <button className="p-1 hover:text-slate-900 rounded"><Settings size={18} /></button>
        </div>
      </div>
    </header>
  );
};
