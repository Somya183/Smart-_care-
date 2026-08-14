import React, { useState } from 'react';
import { SmartCareSidebar } from '../common/SmartCareSidebar';
import { Calendar, Clock, UserCheck, Stethoscope, Building, Plus, Search, Filter, CheckCircle2 } from 'lucide-react';

export const StaffScheduleView = ({ activeTab = 'schedule', setActiveTab, user, onLogout }) => {
  const [selectedShiftFilter, setSelectedShiftFilter] = useState('All Shifts');

  // Staff Schedule & Roster Data
  const [scheduleData, setScheduleData] = useState([
    {
      id: 'STF-101',
      name: 'Dr. Henderson',
      role: 'ER Senior Lead Consultant',
      dept: 'Trauma & Emergency',
      location: 'Trauma Bay 1',
      shift: 'Morning (08:00 - 16:00)',
      shiftType: 'Morning',
      status: 'Active On Duty',
      assignedPatients: 8
    },
    {
      id: 'STF-102',
      name: 'Dr. Sarah Jenkins',
      role: 'Cardiology Specialist',
      dept: 'Cardiology Unit',
      location: 'CCU Room 3',
      shift: 'Morning (08:00 - 16:00)',
      shiftType: 'Morning',
      status: 'In Emergency Surgery',
      assignedPatients: 5
    },
    {
      id: 'STF-103',
      name: 'Nurse Lead P. Sharma',
      role: 'Senior Triage Nurse',
      dept: 'Triage & Intake Desk',
      location: 'Triage Desk A',
      shift: 'Morning (08:00 - 16:00)',
      shiftType: 'Morning',
      status: 'Active On Duty',
      assignedPatients: 14
    },
    {
      id: 'STF-104',
      name: 'Dr. Robert Chen',
      role: 'Orthopedic Surgeon',
      dept: 'Orthopedics',
      location: 'OT Room 2',
      shift: 'Evening (16:00 - 00:00)',
      shiftType: 'Evening',
      status: 'Scheduled Next Shift',
      assignedPatients: 0
    },
    {
      id: 'STF-105',
      name: 'Dr. Vikram Patel',
      role: 'General Physician',
      dept: 'General Medicine',
      location: 'Clinic Room 4',
      shift: 'Evening (16:00 - 00:00)',
      shiftType: 'Evening',
      status: 'On Call / Standby',
      assignedPatients: 0
    },
    {
      id: 'STF-106',
      name: 'Nurse Mark Vance',
      role: 'ICU Critical Care Specialist',
      dept: 'ICU Ward',
      location: 'ICU Bay 2',
      shift: 'Night (00:00 - 08:00)',
      shiftType: 'Night',
      status: 'Scheduled Next Shift',
      assignedPatients: 0
    }
  ]);

  const filteredSchedule = scheduleData.filter(staff => {
    if (selectedShiftFilter === 'All Shifts') return true;
    return staff.shiftType === selectedShiftFilter;
  });

  return (
    <div className="flex bg-slate-100 min-h-[680px] rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
      {/* Left Sidebar */}
      <SmartCareSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-6xl">
        
        {/* Header Banner */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Calendar size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Staff Duty Schedule</h2>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Roster management, active shift allocations, and clinician duty assignments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 font-bold text-xs flex items-center gap-1.5">
              <Clock size={15} className="text-blue-600" />
              Active Shift: Morning (08:00 - 16:00)
            </span>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Clinicians On Duty</span>
            <p className="text-2xl font-black text-slate-900 flex items-center gap-1.5">
              <Stethoscope size={20} className="text-blue-600" />
              14 Staff
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Active Morning Shift</span>
            <p className="text-2xl font-black text-emerald-600 flex items-center gap-1.5">
              <UserCheck size={20} className="text-emerald-600" />
              3 On Shift
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Upcoming Evening Shift</span>
            <p className="text-2xl font-black text-amber-600 flex items-center gap-1.5">
              <Clock size={20} className="text-amber-500" />
              2 Scheduled
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Night Coverage</span>
            <p className="text-2xl font-black text-purple-600 flex items-center gap-1.5">
              <Building size={20} className="text-purple-600" />
              1 Assigned
            </p>
          </div>
        </div>

        {/* STAFF DUTY SCHEDULE TABLE CARD */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Hospital Duty Roster & Shifts</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Filter staff by assigned shift timings and active status.</p>
            </div>

            {/* Shift Filter Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              {['All Shifts', 'Morning', 'Evening', 'Night'].map(shiftBtn => (
                <button
                  key={shiftBtn}
                  onClick={() => setSelectedShiftFilter(shiftBtn)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    selectedShiftFilter === shiftBtn
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {shiftBtn}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">STAFF MEMBER</th>
                  <th className="py-3 px-3">DEPARTMENT & ROLE</th>
                  <th className="py-3 px-3">DUTY LOCATION</th>
                  <th className="py-3 px-3">SHIFT TIMING</th>
                  <th className="py-3 px-3 text-right">STATUS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredSchedule.map((member) => {
                  let statusBadge = (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 whitespace-nowrap inline-block">
                      Active On Duty
                    </span>
                  );

                  if (member.status.includes('Surgery')) {
                    statusBadge = (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 whitespace-nowrap inline-block">
                        In Emergency Surgery
                      </span>
                    );
                  } else if (member.status.includes('Next Shift')) {
                    statusBadge = (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300 whitespace-nowrap inline-block">
                        Scheduled Next Shift
                      </span>
                    );
                  } else if (member.status.includes('Standby')) {
                    statusBadge = (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300 whitespace-nowrap inline-block">
                        On Call / Standby
                      </span>
                    );
                  }

                  return (
                    <tr key={member.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-3 font-bold text-slate-900 text-sm">
                        {member.name}
                        <span className="block text-[10px] text-slate-400 font-mono font-normal">{member.id}</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-slate-900 block">{member.dept}</span>
                        <span className="text-slate-500 text-[11px]">{member.role}</span>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-slate-800">
                        {member.location}
                      </td>

                      <td className="py-3.5 px-3 font-bold text-blue-700">
                        {member.shift}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        {statusBadge}
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
