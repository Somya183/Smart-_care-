import React, { useState, useEffect } from 'react';
import { DoctorAuthPage } from './DoctorAuthPage';
import { SmartCareSidebar } from '../common/SmartCareSidebar';
import { Filter, ArrowUpDown, Truck, Activity, AlertCircle, PlusCircle, Users, Stethoscope, Clock, CheckCircle2, Building2, UserPlus } from 'lucide-react';

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

  // Triage Queue State for Patient Records / Triage
  const [queue, setQueue] = useState([
    {
      id: 1,
      lvl: 1,
      time: '08:14 (-2m ETA)',
      patient: 'Incoming Jane Doe',
      symptom: 'Cardiac Arrest, CPR in progress',
      dept: 'Trauma Bay 1',
      isHighlight: 'bg-red-50/80 border-red-200 text-red-900',
      badge: 'bg-red-100 text-red-800 border-red-300'
    },
    {
      id: 2,
      lvl: 1,
      time: '08:02 (10m wait)',
      patient: 'John Smith',
      symptom: 'Severe GSW to Abdomen',
      dept: 'OR Prep',
      isHighlight: 'bg-red-50/40 border-red-100 text-slate-900',
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
      badge: 'bg-slate-100 text-slate-700 border-slate-200'
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
      badge: 'bg-slate-100 text-slate-700 border-slate-200'
    }
  ]);

  const handleStaffAuthSuccess = (staff) => {
    setLocalDoctor(staff);
    if (onLoginSuccess) onLoginSuccess(staff);
  };

  const handleLocalLogout = () => {
    setLocalDoctor(null);
    if (onLogout) onLogout();
  };

  // Render Doctor / Staff Authentication Page if not logged in
  if (!localDoctor) {
    return (
      <DoctorAuthPage
        onAuthSuccess={handleStaffAuthSuccess}
      />
    );
  }

  const isStaffDashboardView = activeTab === 'dashboard' || activeTab === 'hospital';

  return (
    <div className="flex bg-slate-100 min-h-[680px] rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
      {/* Left Sidebar */}
      <SmartCareSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={localDoctor} onLogout={handleLocalLogout} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ===================================================================== */}
        {/* VIEW 1: STAFF DASHBOARD */}
        {/* ===================================================================== */}
        {isStaffDashboardView ? (
          <div className="lg:col-span-8 space-y-5">
            
            {/* Header Banner */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Staff Clinical Dashboard</h2>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
                    {localDoctor.name} &bull; {localDoctor.department || localDoctor.role || 'Orthopedics'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Active Duty Shift Management, Clinical Roster & ER Throughput Overview.
                </p>
              </div>

              <button className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition">
                <UserPlus size={15} />
                Clock In Shift
              </button>
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
                  28 Active
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
                  2 Lvl 1
                </p>
              </div>
            </div>

            {/* Active Duty Staff Roster Table */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-base text-slate-900">Hospital Duty Roster & Shifts</h3>
                <span className="text-xs text-slate-500 font-bold bg-slate-100 px-2.5 py-1 rounded-md">
                  Active Shift: Morning (08:00 - 16:00)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 px-3">STAFF MEMBER</th>
                      <th className="py-2.5 px-3">DEPARTMENT</th>
                      <th className="py-2.5 px-3">LOCATION</th>
                      <th className="py-2.5 px-3">SHIFT STATUS</th>
                      <th className="py-2.5 px-3 text-right">PATIENTS</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 font-medium">
                    {staffRoster.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3 font-bold text-slate-900 text-sm">
                          {member.name}
                        </td>

                        <td className="py-3 px-3 font-semibold text-slate-600">
                          {member.dept}
                        </td>

                        <td className="py-3 px-3 text-slate-800 font-semibold">
                          {member.location}
                        </td>

                        <td className="py-3 px-3">
                          {member.status === 'On Active Shift' && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 whitespace-nowrap inline-block">
                              Active On Duty
                            </span>
                          )}
                          {member.status === 'In Emergency Surgery' && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-300 whitespace-nowrap inline-block">
                              In Surgery
                            </span>
                          )}
                          {member.status === 'On Call' && (
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300 whitespace-nowrap inline-block">
                              On Call
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-right font-extrabold text-slate-900">
                          {member.patients} Assigned
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ) : (
          /* ===================================================================== */
          /* VIEW 2: PATIENT RECORDS & DYNAMIC PRIORITY QUEUE */
          /* ===================================================================== */
          <div className="lg:col-span-8 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-5">
            
            {/* Header & Filter Controls */}
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

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-md border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
                  <Filter size={13} />
                  Filter
                </button>
                <button className="px-3 py-1.5 rounded-md border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
                  <ArrowUpDown size={13} />
                  Sort: Priority
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
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${row.badge}`}>
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

        {/* Right Side Column (4 cols on lg screen) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Incoming Ambulances Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Truck className="text-red-600" size={18} />
              <span>Incoming Ambulances</span>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs">
                <div className="flex justify-between font-bold text-red-700 mb-0.5">
                  <span>ETA: 2 MINS</span>
                </div>
                <p className="font-extrabold text-slate-900">
                  Unit 42 - Cardiac Arrest (Lvl 1)
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <div className="flex justify-between font-bold text-slate-600 mb-0.5">
                  <span>ETA: 14 MINS</span>
                </div>
                <p className="font-extrabold text-slate-900">
                  Unit 17 - MVA Trauma (Lvl 2)
                </p>
              </div>
            </div>
          </div>

          {/* Department Capacity Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <PlusCircle className="text-blue-700" size={18} />
              <span>Department Capacity</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Trauma Bays</span>
                  <span className="text-red-600 font-extrabold">100% (4/4)</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-red-600 w-full"></div>
                </div>
                <p className="text-[11px] text-red-600 font-bold">
                  Capacity reached. Diverting non-criticals.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Operating Rooms</span>
                  <span className="text-amber-600 font-extrabold">80% (8/10)</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[80%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Intensive Care Unit</span>
                  <span className="text-blue-700 font-extrabold">65% (26/40)</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-700 w-[65%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>General Wards</span>
                  <span className="text-emerald-600 font-extrabold">42% (84/200)</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[42%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
