import React, { useState } from 'react';
import { SmartCareSidebar } from '../common/SmartCareSidebar';
import { BedDouble, Edit3, Plus, Minus, Check, Save, AlertTriangle, Activity, Building2 } from 'lucide-react';

export const BedManagementView = ({ activeTab = 'beds', setActiveTab, user, onLogout }) => {
  // Department Bed State with Total, Filled, and Available counts
  const [departments, setDepartments] = useState([
    { id: 'trauma', name: 'Trauma Bays', totalBeds: 4, filledBeds: 4, isEditing: false },
    { id: 'or', name: 'Operating Rooms (OR)', totalBeds: 10, filledBeds: 8, isEditing: false },
    { id: 'icu', name: 'Intensive Care Unit (ICU)', totalBeds: 40, filledBeds: 26, isEditing: false },
    { id: 'wards', name: 'General Wards', totalBeds: 200, filledBeds: 84, isEditing: false },
    { id: 'pediatrics', name: 'Pediatrics Ward', totalBeds: 30, filledBeds: 12, isEditing: false },
    { id: 'cardio', name: 'Cardiology Bay', totalBeds: 25, filledBeds: 18, isEditing: false }
  ]);

  // Handle Bed Occupy / Free Actions
  const handleModifyFilled = (deptId, delta) => {
    setDepartments(prev =>
      prev.map(dept => {
        if (dept.id === deptId) {
          const newFilled = Math.max(0, Math.min(dept.totalBeds, dept.filledBeds + delta));
          return { ...dept, filledBeds: newFilled };
        }
        return dept;
      })
    );
  };

  // Toggle Edit Mode for a Department
  const toggleEdit = (deptId) => {
    setDepartments(prev =>
      prev.map(dept => (dept.id === deptId ? { ...dept, isEditing: !dept.isEditing } : dept))
    );
  };

  // Update Total Beds or Filled Beds via inputs
  const handleInputChange = (deptId, field, value) => {
    const num = Math.max(0, parseInt(value) || 0);
    setDepartments(prev =>
      prev.map(dept => {
        if (dept.id === deptId) {
          if (field === 'totalBeds') {
            return { ...dept, totalBeds: num, filledBeds: Math.min(dept.filledBeds, num) };
          }
          if (field === 'filledBeds') {
            return { ...dept, filledBeds: Math.min(num, dept.totalBeds) };
          }
        }
        return dept;
      })
    );
  };

  // Summary Metrics
  const totalBedsHospital = departments.reduce((acc, d) => acc + d.totalBeds, 0);
  const totalFilledHospital = departments.reduce((acc, d) => acc + d.filledBeds, 0);
  const totalAvailableHospital = totalBedsHospital - totalFilledHospital;
  const overallOccupancyPct = totalBedsHospital > 0 ? ((totalFilledHospital / totalBedsHospital) * 100).toFixed(1) : 0;

  return (
    <div className="flex bg-slate-100 min-h-[680px] rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
      {/* Left Sidebar */}
      <SmartCareSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-6xl">
        
        {/* Top Header Banner & Metrics */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <BedDouble size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Bed & Seat Capacity Manager</h2>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Live department bed tracking, filled status, and capacity editing control.
            </p>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-center">
              <span className="block text-[10px] text-slate-500 uppercase">Total Capacity</span>
              <span className="text-lg font-black text-slate-900">{totalBedsHospital} Beds</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 text-red-900 text-center">
              <span className="block text-[10px] text-red-600 uppercase">Filled / Occupied</span>
              <span className="text-lg font-black text-red-700">{totalFilledHospital}</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center">
              <span className="block text-[10px] text-emerald-600 uppercase">Available Beds</span>
              <span className="text-lg font-black text-emerald-700">{totalAvailableHospital}</span>
            </div>
          </div>
        </div>

        {/* Department Bed Management Table Card */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Department Capacity Breakdown</h3>
              <p className="text-xs text-slate-500 font-medium">
                Real-time bed counts. Click <span className="font-bold text-blue-700">Edit</span> to adjust capacity numbers.
              </p>
            </div>

            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Overall Occupancy: {overallOccupancyPct}%
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">DEPARTMENT NAME</th>
                  <th className="py-3 px-3 text-center">TOTAL BEDS</th>
                  <th className="py-3 px-3 text-center">FILLED BEDS</th>
                  <th className="py-3 px-3 text-center">AVAILABLE BEDS</th>
                  <th className="py-3 px-3">OCCUPANCY STATUS</th>
                  <th className="py-3 px-3 text-right">BED CONTROLS / EDIT</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium">
                {departments.map((dept) => {
                  const availableBeds = Math.max(0, dept.totalBeds - dept.filledBeds);
                  const occupancyPct = dept.totalBeds > 0 ? (dept.filledBeds / dept.totalBeds) * 100 : 0;

                  // Status badge styling
                  let statusBadge = (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Available ({availableBeds} free)
                    </span>
                  );
                  if (occupancyPct >= 100) {
                    statusBadge = (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-300">
                        Full (0 free)
                      </span>
                    );
                  } else if (occupancyPct >= 80) {
                    statusBadge = (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        High Capacity ({availableBeds} left)
                      </span>
                    );
                  }

                  return (
                    <tr key={dept.id} className="hover:bg-slate-50/80 transition">
                      
                      {/* Department Name */}
                      <td className="py-4 px-3 font-bold text-slate-900 text-sm">
                        {dept.name}
                      </td>

                      {/* Total Beds (Editable when in edit mode) */}
                      <td className="py-4 px-3 text-center font-bold text-slate-800">
                        {dept.isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={dept.totalBeds}
                            onChange={(e) => handleInputChange(dept.id, 'totalBeds', e.target.value)}
                            className="w-16 text-center py-1 px-1 font-bold text-xs border border-blue-500 rounded bg-white"
                          />
                        ) : (
                          <span className="text-sm">{dept.totalBeds}</span>
                        )}
                      </td>

                      {/* Filled Beds (Editable when in edit mode) */}
                      <td className="py-4 px-3 text-center font-extrabold text-red-700">
                        {dept.isEditing ? (
                          <input
                            type="number"
                            min="0"
                            max={dept.totalBeds}
                            value={dept.filledBeds}
                            onChange={(e) => handleInputChange(dept.id, 'filledBeds', e.target.value)}
                            className="w-16 text-center py-1 px-1 font-bold text-xs border border-blue-500 rounded bg-white text-red-700"
                          />
                        ) : (
                          <span className="text-sm bg-red-50 text-red-700 px-2.5 py-0.5 rounded border border-red-200">
                            {dept.filledBeds}
                          </span>
                        )}
                      </td>

                      {/* Available Beds */}
                      <td className="py-4 px-3 text-center font-black text-emerald-700 text-sm">
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200">
                          {availableBeds}
                        </span>
                      </td>

                      {/* Occupancy Status & Progress Bar */}
                      <td className="py-4 px-3">
                        <div className="space-y-1.5">
                          {statusBadge}
                          <div className="h-1.5 w-32 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                occupancyPct >= 100
                                  ? 'bg-red-600'
                                  : occupancyPct >= 80
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(100, occupancyPct)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Controls & Edit Buttons */}
                      <td className="py-4 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Quick Occupy / Free Buttons */}
                          <button
                            title="Occupy 1 Bed"
                            onClick={() => handleModifyFilled(dept.id, 1)}
                            disabled={dept.filledBeds >= dept.totalBeds}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 disabled:opacity-30 transition"
                          >
                            <Plus size={14} />
                          </button>

                          <button
                            title="Free 1 Bed"
                            onClick={() => handleModifyFilled(dept.id, -1)}
                            disabled={dept.filledBeds <= 0}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 disabled:opacity-30 transition"
                          >
                            <Minus size={14} />
                          </button>

                          {/* Edit / Save Capacity Toggle Button */}
                          <button
                            onClick={() => toggleEdit(dept.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                              dept.isEditing
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {dept.isEditing ? (
                              <>
                                <Save size={13} /> Save
                              </>
                            ) : (
                              <>
                                <Edit3 size={13} /> Edit Beds
                              </>
                            )}
                          </button>

                        </div>
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
