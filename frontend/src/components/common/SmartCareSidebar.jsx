import React from 'react';
import { Asterisk, Users, Truck, Calendar, Bell, HelpCircle, LogOut, Activity } from 'lucide-react';

export const SmartCareSidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
  const userName = user?.name || 'Logged In Doctor';
  const userDept = user?.department || user?.role || 'Clinical Staff';

  return (
    <aside className="w-60 bg-slate-50 border-r border-slate-300 p-4 flex flex-col justify-between min-h-[640px]">
      <div className="space-y-5">
        {/* Doctor / User Profile Box (Matching Screenshot 2 & 3) */}
        <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80"
            alt={userName}
            className="w-10 h-10 rounded-lg object-cover border border-slate-300 shrink-0"
          />
          <div className="overflow-hidden">
            <h4 className="font-bold text-xs text-slate-900 leading-tight truncate">{userName}</h4>
            <p className="text-[11px] text-slate-500 font-medium truncate">{userDept}</p>
          </div>
        </div>



        {/* Navigation Items */}
        <nav className="space-y-1.5 pt-2">


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



          {/* Staff Schedule */}
          <button
            onClick={() => setActiveTab('schedule')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 transition"
          >
            <Calendar size={16} />
            Staff Schedule
          </button>

          {/* Admin & Analytics */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'admin'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Activity size={16} />
            Admin & Analytics
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
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-2 py-1.5 hover:text-red-700 text-slate-600 transition"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
};
