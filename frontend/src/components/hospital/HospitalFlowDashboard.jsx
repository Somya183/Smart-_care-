import React, { useState, useEffect } from 'react';
import { DoctorAuthPage } from './DoctorAuthPage';
import { SmartCareSidebar } from '../common/SmartCareSidebar';
import { Filter, ArrowUpDown, Truck, Activity, AlertCircle, PlusCircle, Users, Stethoscope, Clock, CheckCircle2, Building2, UserPlus, Bell, ShieldAlert, ArrowUp } from 'lucide-react';

export const HospitalFlowDashboard = ({ activeTab = 'dashboard', setActiveTab, user, onLoginSuccess, onLogout }) => {
  const [localDoctor, setLocalDoctor] = useState(user || null);

  useEffect(() => {
    if (user) {
      setLocalDoctor(user);
    }
  }, [user]);

  // Duty Roster State for Staff Dashboard
  const [staffRoster, setStaffRoster] = useState([
    { id: 1, name: localDoctor?.name || 'Dr. Raut', dept: localDoctor?.department || 'Orthopedics', status: 'On Active Shift', location: 'Trauma Room 2', patients: 4, shift: '08:00 - 16:00' },
    { id: 2, name: 'Dr. Sarah Jenkins', dept: 'Emergency & Trauma', status: 'In Emergency Surgery', location: 'OR 3', patients: 2, shift: '07:00 - 15:00' },
    { id: 3, name: 'Dr. Robert Chen', dept: 'Cardiology', status: 'On Active Shift', location: 'Cardio CCU Bay', patients: 5, shift: '08:00 - 16:00' },
    { id: 4, name: 'Nurse Lead P. Sharma', dept: 'Emergency Triage', status: 'On Active Shift', location: 'Intake Desk A', patients: 8, shift: '06:00 - 14:00' },
    { id: 5, name: 'Dr. Vikram Patel', dept: 'Neurology', status: 'On Call', location: 'Consultation Room 4', patients: 1, shift: '12:00 - 20:00' }
  ]);

  // Incoming Emergency Requests State
  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 'REQ-101',
      patientName: 'Jane Doe (Ambulance Dispatch)',
      urgencyNum: 1,
      urgencyLabel: 'Level 1 - Resuscitation / Critical',
      symptom: 'Cardiac Arrest, CPR in progress',
      dept: 'Trauma Bay 1',
      status: 'Pending'
    },
    {
      id: 'REQ-102',
      patientName: 'Rahul Sharma (Stroke Alert)',
      urgencyNum: 1,
      urgencyLabel: 'Level 1 - Critical',
      symptom: 'Sudden Facial Droop, Slurred Speech',
      dept: 'Neurology CT Bay',
      status: 'Pending'
    },
    {
      id: 'REQ-103',
      patientName: 'Priya Patel',
      urgencyNum: 2,
      urgencyLabel: 'Level 2 - Emergent',
      symptom: 'Acute Appendicitis & High Fever',
      dept: 'General ER',
      status: 'Pending'
    }
  ]);

  // Dynamic Priority Queue State (Automatically Level Sorted)
  const [queue, setQueue] = useState([
    {
      id: 1,
      lvl: 1,
      time: '08:14 (-2m ETA)',
      patient: 'Incoming Jane Doe',
      symptom: 'Cardiac Arrest, CPR in progress',
      dept: 'Trauma Bay 1',
      isHighlight: 'bg-red-50/80 border-red-200 text-red-900 font-bold',
      badge: 'bg-red-100 text-red-800 border-red-300'
    },
    {
      id: 2,
      lvl: 1,
      time: '08:02 (10m wait)',
      patient: 'John Smith',
      symptom: 'Severe GSW to Abdomen',
      dept: 'OR Prep',
      isHighlight: 'bg-red-50/40 border-red-100 text-slate-900 font-bold',
      badge: 'bg-red-100 text-red-800 border-red-300'
    },
    {
      id: 3,
      lvl: 2,
      time: '07:45 (31m wait)',
      patient: 'Maria Garcia',
      symptom: 'Acute chest pain, radiating left arm',
      dept: 'Cardiology',
      isHighlight: 'bg-white text-slate-900',
      badge: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      id: 4,
      lvl: 3,
      time: '06:30 (1h 46m wait)',
      patient: 'Robert Chen',
      symptom: 'Closed fracture, right tibia',
      dept: 'Orthopedics',
      isHighlight: 'bg-white text-slate-900',
      badge: 'bg-slate-100 text-slate-700 border-slate-200'
    },
    {
      id: 5,
      lvl: 4,
      time: '05:15 (3h 1m wait)',
      patient: 'Emily Johnson',
      symptom: 'Laceration to left forearm, stable',
      dept: 'Minor Care',
      isHighlight: 'bg-white text-slate-900',
      badge: 'bg-slate-100 text-slate-700 border-slate-200'
    },
    {
      id: 6,
      lvl: 5,
      time: '04:00 (4h 16m wait)',
      patient: 'David Lee',
      symptom: 'Medication refill request',
      dept: 'Fast Track',
      isHighlight: 'bg-white text-slate-900',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    }
  ]);

  // Handle Accept & Admit Incoming Request -> Automatically Inserts & Re-sorts Queue Parallelly!
  const handleAcceptIncomingRequest = (req) => {
    // 1. Mark request accepted
    setIncomingRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'Admitted' } : r));

    // 2. Create new queue item
    const newItem = {
      id: Date.now(),
      lvl: req.urgencyNum,
      time: 'Just Now (0m wait)',
      patient: req.patientName,
      symptom: req.symptom,
      dept: req.dept,
      isHighlight: req.urgencyNum === 1 ? 'bg-red-50 border-red-200 text-red-900 font-bold animate-pulse' : 'bg-blue-50/70 border-blue-200 text-slate-900 font-bold',
      badge: req.urgencyNum === 1 ? 'bg-red-100 text-red-800 border-red-300' : req.urgencyNum === 2 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-100 text-slate-700 border-slate-200'
    };

    // 3. Insert and re-sort priority queue parallelly (Level 1 at top, Level 5 at bottom)
    setQueue(prevQueue => {
      const updated = [newItem, ...prevQueue];
      return updated.sort((a, b) => a.lvl - b.lvl);
    });
  };

  // Upgrade Urgency of Request
  const handleUpgradeRequestUrgency = (reqId) => {
    setIncomingRequests(prev => prev.map(r => {
      if (r.id === reqId) {
        return {
          ...r,
          urgencyNum: 1,
          urgencyLabel: 'Level 1 - Resuscitation / Critical (UPGRADED)'
        };
      }
      return r;
    }));
  };

  const handleLoginSuccess = (doc) => {
    setLocalDoctor(doc);
    if (onLoginSuccess) {
      onLoginSuccess(doc);
    }
  };

  if (!localDoctor) {
    return <DoctorAuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  const isStaffDashboard = activeTab === 'dashboard';

  return (
    <div className="flex bg-slate-100 min-h-[680px] rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
      {/* Left Sidebar */}
      <SmartCareSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={localDoctor} onLogout={onLogout} />

      {/* Main Dashboard / Queue Content Area */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-6xl">
        
        {/* VIEW 1: STAFF CLINICAL DASHBOARD */}
        {isStaffDashboard ? (
          <div className="space-y-6">
            
            {/* Header Banner */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Stethoscope size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Staff Clinical Dashboard</h2>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  Logged in as <span className="font-bold text-slate-900">{localDoctor.name}</span> &bull; Department: <span className="text-blue-700 font-bold">{localDoctor.department || localDoctor.role || 'ER Staff'}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  Shift Status: Active On Duty
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">On-Duty Clinicians</span>
                <p className="text-2xl font-black text-slate-900 flex items-center gap-1.5">
                  <Stethoscope size={20} className="text-blue-600" />
                  14 Staff
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">In-Care Patients</span>
                <p className="text-2xl font-black text-slate-900 flex items-center gap-1.5">
                  <Users size={20} className="text-emerald-600" />
                  {queue.length} Active
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Response Time</span>
                <p className="text-2xl font-black text-slate-900 flex items-center gap-1.5">
                  <Clock size={20} className="text-amber-500" />
                  4.2 Mins
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Critical Red Alerts</span>
                <p className="text-2xl font-black text-red-600 flex items-center gap-1.5">
                  <AlertCircle size={20} className="text-red-600" />
                  {queue.filter(q => q.lvl === 1).length} Lvl 1
                </p>
              </div>
            </div>

            {/* INCOMING EMERGENCY REQUESTS GATEWAY (ADMIT TO QUEUE PARALLELLY) */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <Bell size={18} className="text-red-600 animate-bounce" />
                    Incoming Emergency Requests & Case Urgency Gateway
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Accepting a request immediately inserts and re-orders the patient in the Dynamic Priority Queue below.
                  </p>
                </div>

                <span className="text-xs font-black text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldAlert size={14} />
                  {incomingRequests.filter(r => r.status === 'Pending').length} Pending Requests
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 px-3">PATIENT NAME</th>
                      <th className="py-2.5 px-3">URGENCY LEVEL</th>
                      <th className="py-2.5 px-3">DIAGNOSED SYMPTOM</th>
                      <th className="py-2.5 px-3">TARGET DEPT</th>
                      <th className="py-2.5 px-3 text-right">ACTION</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 font-medium">
                    {incomingRequests.map((req) => {
                      const isAdmitted = req.status === 'Admitted';
                      let urgencyBadge = (
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 whitespace-nowrap inline-block">
                          {req.urgencyLabel}
                        </span>
                      );
                      if (req.urgencyNum === 1) {
                        urgencyBadge = (
                          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800 border border-red-300 animate-pulse whitespace-nowrap inline-block">
                            {req.urgencyLabel}
                          </span>
                        );
                      } else if (req.urgencyNum === 2) {
                        urgencyBadge = (
                          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 whitespace-nowrap inline-block">
                            {req.urgencyLabel}
                          </span>
                        );
                      }

                      return (
                        <tr key={req.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-3 font-bold text-slate-900 text-sm">
                            {req.patientName}
                          </td>

                          <td className="py-3 px-3">
                            {urgencyBadge}
                          </td>

                          <td className="py-3 px-3 text-slate-700">
                            {req.symptom}
                          </td>

                          <td className="py-3 px-3 font-bold text-slate-900">
                            {req.dept}
                          </td>

                          <td className="py-3 px-3 text-right">
                            {isAdmitted ? (
                              <span className="text-emerald-700 font-bold text-xs bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center justify-end gap-1">
                                <CheckCircle2 size={14} /> Admitted to Queue
                              </span>
                            ) : (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleUpgradeRequestUrgency(req.id)}
                                  className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition flex items-center gap-1"
                                >
                                  <ArrowUp size={13} /> Level 1
                                </button>

                                <button
                                  onClick={() => handleAcceptIncomingRequest(req)}
                                  className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
                                >
                                  Accept & Admit →
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

            {/* DYNAMIC PRIORITY QUEUE (UPDATES PARALLELLY ON ACCEPT) */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Dynamic Priority Queue</h2>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                      {localDoctor.name} ({localDoctor.department || localDoctor.role || 'ER Staff'})
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Real-time triage queue. Level 1 Critical cases automatically sorted to top.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-md border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
                    <Filter size={13} />
                    Filter
                  </button>
                  <button className="px-3 py-1.5 rounded-md border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
                    <ArrowUpDown size={13} />
                    Sort: Level 1 Priority
                  </button>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-2 px-3">LVL</th>
                      <th className="py-2 px-3">TIME</th>
                      <th className="py-2 px-3">PATIENT</th>
                      <th className="py-2 px-3">PRIMARY SYMPTOM</th>
                      <th className="py-2 px-3 text-right">DEPT / STATUS</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {queue.map((row) => (
                      <tr key={row.id} className={`transition ${row.isHighlight}`}>
                        <td className="py-3 px-3">
                          <span className={`lvl-badge lvl-badge-${row.lvl}`}>
                            {row.lvl}
                          </span>
                        </td>

                        <td className="py-3 px-3 font-semibold text-slate-600">
                          {row.time}
                        </td>

                        <td className="py-3 px-3 font-bold text-slate-900">
                          {row.patient}
                        </td>

                        <td className="py-3 px-3 font-medium text-slate-600">
                          {row.symptom}
                        </td>

                        <td className="py-3 px-3 text-right">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border whitespace-nowrap inline-block ${row.badge}`}>
                            {row.dept}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ) : (
          /* VIEW 2: PATIENT RECORDS & QUEUE VIEW */
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Dynamic Priority Queue</h2>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                    {localDoctor.name} ({localDoctor.department || localDoctor.role || 'ER Staff'})
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Real-time triage tracking. Critical cases highlighted.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2 px-3">LVL</th>
                    <th className="py-2 px-3">TIME</th>
                    <th className="py-2 px-3">PATIENT</th>
                    <th className="py-2 px-3">PRIMARY SYMPTOM</th>
                    <th className="py-2 px-3 text-right">DEPT / STATUS</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {queue.map((row) => (
                    <tr key={row.id} className={`transition ${row.isHighlight}`}>
                      <td className="py-3 px-3">
                        <span className={`lvl-badge lvl-badge-${row.lvl}`}>
                          {row.lvl}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-semibold text-slate-600">
                        {row.time}
                      </td>

                      <td className="py-3 px-3 font-bold text-slate-900">
                        {row.patient}
                      </td>

                      <td className="py-3 px-3 font-medium text-slate-600">
                        {row.symptom}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border whitespace-nowrap inline-block ${row.badge}`}>
                          {row.dept}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
