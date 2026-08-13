import React from 'react';
import { Asterisk, Users, Truck, Calendar, Bell, HelpCircle, LogOut, Activity } from 'lucide-react';

export const SmartCareSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-60 bg-slate-50 border-r border-slate-300 p-4 flex flex-col justify-between min-h-[640px]">
      <div className="space-y-5">
        {/* Doctor / User Profile Box (Matching Screenshot 2 & 3) */}
        <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80"
            alt="Dr. Henderson"
            className="w-10 h-10 rounded-lg object-cover border border-slate-300"
          />
          <div>
            <h4 className="font-bold text-xs text-slate-900 leading-tight">Dr. Henderson</h4>
            <p className="text-[11px] text-slate-500 font-medium">ER Senior Lead</p>
          </div>
        </div>

        {/* Emergency Code Blue Button (Matching Screenshot 2 & 3) */}
        <button className="w-full py-2 px-3 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition">
          <Asterisk size={15} />
          Trigger Code Blue
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1.5 pt-2">
          {/* Real-time Triage */}
          <button
            onClick={() => setActiveTab('triage')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'triage'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Activity size={16} />
            Real-time Triage
          </button>

          {/* Waiting Room */}
          <button
            onClick={() => setActiveTab('waiting')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'waiting'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Users size={16} />
            Waiting Room
          </button>

          {/* Ambulance ETA */}
          <button
            onClick={() => setActiveTab('ambulance')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'ambulance'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Truck size={16} />
            Ambulance ETA
          </button>

          {/* Staff Schedule */}
          <button
            onClick={() => setActiveTab('schedule')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 transition"
          >
            <Calendar size={16} />
            Staff Schedule
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 transition"
          >
            <Bell size={16} />
            Notifications
          </button>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-slate-300 pt-4 space-y-1.5 text-xs font-semibold text-slate-600">
        <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:text-slate-900">
          <HelpCircle size={16} />
          Support
        </button>
        <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:text-slate-900">
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
};
