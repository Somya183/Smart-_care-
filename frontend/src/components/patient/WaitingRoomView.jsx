import React, { useState } from 'react';
import { SmartCareSidebar } from '../common/SmartCareSidebar';
import { Users, Clock, Building, AlertTriangle, Info, Bell, CheckCircle2, ArrowUp, Stethoscope, Activity, ShieldAlert } from 'lucide-react';

export const WaitingRoomView = ({ activeTab = 'waiting', setActiveTab, user, onLogout }) => {
  // Live Incoming Emergency Requests State (Persists accepted status until page refresh)
  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 'REQ-9901',
      patientName: 'Jane Doe (108 Ambulance Dispatch)',
      urgency: 'Level 1 - Resuscitation / Critical',
      urgencyNum: 1,
      symptom: 'Cardiac Arrest & Severe Chest Pain',
      dept: 'Trauma Bay 1 / Cardiology',
      status: 'Pending',
      timeAgo: '1 min ago'
    },
    {
      id: 'REQ-9902',
      patientName: 'Rahul Sharma',
      urgency: 'Level 1 - Critical (Stroke Alert)',
      urgencyNum: 1,
      symptom: 'Slurred Speech, Sudden Facial Droop',
      dept: 'Neurology CT Bay',
      status: 'Pending',
      timeAgo: '3 mins ago'
    },
    {
      id: 'REQ-9903',
      patientName: 'Priya Patel',
      urgency: 'Level 2 - Emergent',
      urgencyNum: 2,
      symptom: 'Acute Appendicitis & High Fever',
      dept: 'General Surgery / ER',
      status: 'Pending',
      timeAgo: '6 mins ago'
    },
    {
      id: 'REQ-9904',
      patientName: 'Vikas Gupta',
      urgency: 'Level 3 - Urgent',
      urgencyNum: 3,
      symptom: 'Suspected Forearm Fracture',
      dept: 'Orthopedics Care Room B',
      status: 'Pending',
      timeAgo: '12 mins ago'
    }
  ]);

  // Handle Accept Emergency Request -> Updates status to 'Accepted'
  const handleAcceptRequest = (id) => {
    setIncomingRequests(prev => prev.map(req => {
      if (req.id === id) {
        return { ...req, status: 'Accepted' };
      }
      return req;
    }));
  };

  // Handle Upgrade Urgency
  const handleUpgradeUrgency = (id) => {
    setIncomingRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          urgency: 'Level 1 - Resuscitation / Critical (UPGRADED)',
          urgencyNum: 1
        };
      }
      return req;
    }));
  };

  return (
    <div className="flex bg-slate-100 min-h-[680px] rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
      {/* Left Sidebar */}
      <SmartCareSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-5xl">
        
        {/* Top Patient Info Banner */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {user?.name || 'John Doe'}
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              DOB: 04/12/1985 &bull; MRN: 987654321 &bull; {user?.department || 'ER Patient View'}
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
            <AlertTriangle size={15} className="text-amber-600" />
            Level 3 - Urgent Priority
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

        {/* INCOMING EMERGENCY REQUESTS & CASE URGENCY GATEWAY */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Bell size={18} className="text-red-600 animate-bounce" />
                Incoming Emergency Requests & Case Urgency Gateway
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Real-time patient emergency intakes categorized by severity level (Level 1 Resuscitation to Level 5 Non-Urgent).
              </p>
            </div>

            <span className="text-xs font-black text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto">
              <ShieldAlert size={14} />
              {incomingRequests.filter(r => r.urgencyNum === 1).length} Critical Resuscitation Alerts
            </span>
          </div>

          {/* Incoming Requests Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">PATIENT NAME</th>
                  <th className="py-2.5 px-3">CASE URGENCY LEVEL</th>
                  <th className="py-2.5 px-3">DIAGNOSED SYMPTOM</th>
                  <th className="py-2.5 px-3">REQUESTED DEPT</th>
                  <th className="py-2.5 px-3 text-right">ACTION & ADMISSION</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium">
                {incomingRequests.map((req) => {
                  let urgencyBadge = (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 whitespace-nowrap inline-block">
                      {req.urgency}
                    </span>
                  );
                  if (req.urgencyNum === 1) {
                    urgencyBadge = (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-300 animate-pulse whitespace-nowrap inline-block">
                        {req.urgency}
                      </span>
                    );
                  } else if (req.urgencyNum === 2) {
                    urgencyBadge = (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 whitespace-nowrap inline-block">
                        {req.urgency}
                      </span>
                    );
                  }

                  const isAccepted = req.status === 'Accepted';

                  return (
                    <tr key={req.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-3 font-bold text-slate-900 text-sm">
                        {req.patientName}
                        <span className="block text-[10px] text-slate-400 font-normal font-mono">{req.id} &bull; {req.timeAgo}</span>
                      </td>

                      <td className="py-3.5 px-3">
                        {urgencyBadge}
                      </td>

                      <td className="py-3.5 px-3 text-slate-700 font-medium">
                        {req.symptom}
                      </td>

                      <td className="py-3.5 px-3 font-bold text-slate-900">
                        {req.dept}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        {isAccepted ? (
                          <span className="px-3.5 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-extrabold text-xs inline-flex items-center gap-1.5 shadow-2xs whitespace-nowrap">
                            <CheckCircle2 size={15} className="text-emerald-700" />
                            Accepted
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleUpgradeUrgency(req.id)}
                              className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition flex items-center gap-1"
                              title="Upgrade to Level 1 Critical"
                            >
                              <ArrowUp size={13} /> Level 1
                            </button>

                            <button
                              onClick={() => handleAcceptRequest(req.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
                            >
                              Accept & Admit
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};
