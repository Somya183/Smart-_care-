import React, { useState } from 'react';
import { DoctorAuthPage } from './DoctorAuthPage';
import { SmartCareSidebar } from '../common/SmartCareSidebar';
import { Filter, ArrowUpDown, Truck, Activity, AlertCircle, PlusCircle, UserCheck } from 'lucide-react';

export const HospitalFlowDashboard = ({ activeTab = 'triage', setActiveTab }) => {
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);
  const [doctorUser, setDoctorUser] = useState(null);

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
    setDoctorUser(staff);
    setIsStaffAuthenticated(true);
  };

  const handleDemoDoctorLogin = () => {
    setDoctorUser({
      name: 'Dr. Henderson',
      role: 'ER Senior Lead',
      department: 'Emergency & Trauma'
    });
    setIsStaffAuthenticated(true);
  };

  // Render Doctor / Staff Authentication Page if not logged in
  if (!isStaffAuthenticated) {
    return (
      <DoctorAuthPage
        onAuthSuccess={handleStaffAuthSuccess}
        onDemoDoctorLogin={handleDemoDoctorLogin}
      />
    );
  }

  return (
    <div className="flex bg-slate-100 min-h-[680px] rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
      {/* Left Sidebar */}
      <SmartCareSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Central Dynamic Priority Queue Table (8 cols on lg screen) */}
        <div className="lg:col-span-8 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-5">
          
          {/* Header & Filter Controls */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Dynamic Priority Queue</h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                  {doctorUser?.name || 'Dr. Henderson'} ({doctorUser?.role || 'ER Lead'})
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
                    {/* Level badge circle */}
                    <td className="py-3 px-3">
                      <span className={`lvl-badge lvl-badge-${row.lvl}`}>
                        {row.lvl}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="py-3 px-3 font-semibold text-slate-600">
                      {row.time}
                    </td>

                    {/* Patient Name */}
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {row.patient}
                    </td>

                    {/* Symptom */}
                    <td className="py-3 px-3 font-medium text-slate-600">
                      {row.symptom}
                    </td>

                    {/* Department badge */}
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

        {/* Right Side Column (4 cols on lg screen) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Incoming Ambulances Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Truck className="text-red-600" size={18} />
              <span>Incoming Ambulances</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Ambulance 1 */}
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs">
                <div className="flex justify-between font-bold text-red-700 mb-0.5">
                  <span>ETA: 2 MINS</span>
                </div>
                <p className="font-extrabold text-slate-900">
                  Unit 42 - Cardiac Arrest (Lvl 1)
                </p>
              </div>

              {/* Ambulance 2 */}
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
              {/* Trauma Bays */}
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

              {/* Operating Rooms */}
              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Operating Rooms</span>
                  <span className="text-amber-600 font-extrabold">80% (8/10)</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[80%]"></div>
                </div>
              </div>

              {/* ICU */}
              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Intensive Care Unit</span>
                  <span className="text-blue-700 font-extrabold">65% (26/40)</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-700 w-[65%]"></div>
                </div>
              </div>

              {/* General Wards */}
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
