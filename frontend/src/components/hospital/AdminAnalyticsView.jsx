import React, { useState } from 'react';
import { SmartCareSidebar } from '../common/SmartCareSidebar';
import { BarChart3, Download, Users, ShieldAlert, Activity, Clock, TrendingUp, Layers, CheckCircle2, FileText, Printer } from 'lucide-react';

export const AdminAnalyticsView = ({ activeTab = 'admin', setActiveTab, user, onLogout }) => {
  // Mock Emergency Patient Dataset
  const [patientDataset] = useState([
    {
      id: 'PAT-8801',
      name: 'Jane Doe (Incoming Ambulance)',
      regTime: '08:14 AM',
      urgency: 'Level 1 - Critical (Resuscitation)',
      symptom: 'Cardiac Arrest, CPR in Progress',
      dept: 'Trauma Bay 1',
      doctor: 'Dr. Raut (On Duty)'
    },
    {
      id: 'PAT-8802',
      name: 'John Smith',
      regTime: '08:02 AM',
      urgency: 'Level 1 - Critical',
      symptom: 'Severe GSW to Abdomen',
      dept: 'Operating Room Prep',
      doctor: 'Dr. Sarah Jenkins'
    },
    {
      id: 'PAT-8803',
      name: 'Maria Garcia',
      regTime: '07:45 AM',
      urgency: 'Level 2 - Emergent',
      symptom: 'Acute Chest Pain, Radiating Left Arm',
      dept: 'Cardiology',
      doctor: 'Dr. Robert Chen'
    },
    {
      id: 'PAT-8804',
      name: 'Robert Chen',
      regTime: '06:30 AM',
      urgency: 'Level 3 - Urgent',
      symptom: 'Closed Fracture, Right Tibia',
      dept: 'Orthopedics',
      doctor: 'Dr. Raut'
    },
    {
      id: 'PAT-8805',
      name: 'Emily Johnson',
      regTime: '05:15 AM',
      urgency: 'Level 4 - Less Urgent',
      symptom: 'Laceration to Forearm (Stable)',
      dept: 'Minor Care Bay',
      doctor: 'Nurse Lead P. Sharma'
    },
    {
      id: 'PAT-8806',
      name: 'David Lee',
      regTime: '04:00 AM',
      urgency: 'Level 5 - Non-Urgent',
      symptom: 'Medication Refill Request',
      dept: 'Fast Track Clinic',
      doctor: 'Dr. Vikram Patel'
    }
  ]);

  // Download PDF Report Function
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    const reportHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SmartCare Hospital Emergency Patient Dataset Report</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 25px; color: #1e293b; }
            .header { border-bottom: 3px solid #1d4ed8; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { margin: 0; color: #1e3a8a; font-size: 24px; }
            .header p { margin: 5px 0 0 0; color: #64748b; font-size: 13px; }
            .meta-bar { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 18px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
            th { background-color: #1e3a8a; color: white; padding: 10px; text-align: left; font-size: 11px; text-transform: uppercase; }
            td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
            tr:nth-child(even) { background-color: #f8fafc; }
            .lvl-1 { background-color: #fee2e2; color: #991b1b; font-weight: bold; padding: 3px 8px; border-radius: 4px; }
            .lvl-2 { background-color: #fef3c7; color: #92400e; font-weight: bold; padding: 3px 8px; border-radius: 4px; }
            .lvl-3 { background-color: #dbeafe; color: #1e40af; font-weight: bold; padding: 3px 8px; border-radius: 4px; }
            .lvl-4 { background-color: #f1f5f9; color: #334155; font-weight: bold; padding: 3px 8px; border-radius: 4px; }
            .lvl-5 { background-color: #d1fae5; color: #065f46; font-weight: bold; padding: 3px 8px; border-radius: 4px; }
            .footer { margin-top: 30px; font-size: 11px; text-align: center; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🏥 SmartCare Medical Portal & Emergency System</h1>
            <p>Official Patient Emergency Dataset & AI Triage Summary Report</p>
          </div>

          <div class="meta-bar">
            <span><strong>Generated Date:</strong> ${new Date().toLocaleString()}</span>
            <span><strong>Hospital Location:</strong> Metro ER & Trauma Center</span>
            <span><strong>Total Active Patients:</strong> ${patientDataset.length} Records</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>REG ID</th>
                <th>PATIENT NAME</th>
                <th>TIME</th>
                <th>EMERGENCY URGENCY</th>
                <th>DIAGNOSED SYMPTOM / DISEASE</th>
                <th>ASSIGNED DEPT</th>
                <th>ATTENDING SPECIALIST</th>
              </tr>
            </thead>
            <tbody>
              ${patientDataset.map(pt => {
                let lvlClass = 'lvl-3';
                if (pt.urgency.includes('Level 1')) lvlClass = 'lvl-1';
                if (pt.urgency.includes('Level 2')) lvlClass = 'lvl-2';
                if (pt.urgency.includes('Level 4')) lvlClass = 'lvl-4';
                if (pt.urgency.includes('Level 5')) lvlClass = 'lvl-5';

                return `
                  <tr>
                    <td><strong>${pt.id}</strong></td>
                    <td><strong>${pt.name}</strong></td>
                    <td>${pt.regTime}</td>
                    <td><span class="${lvlClass}">${pt.urgency}</span></td>
                    <td>${pt.symptom}</td>
                    <td>${pt.dept}</td>
                    <td>${pt.doctor}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>SmartCare AI Emergency Management System &bull; Confidential Medical Record Document</p>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(reportHtml);
    printWindow.document.close();
  };

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
                <BarChart3 size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin & Hospital Analytics</h2>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Real-time emergency management performance & patient dataset reporting.
            </p>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition active:scale-[0.99]"
          >
            <Download size={16} />
            Download Patient Dataset Report (PDF)
          </button>
        </div>

        {/* Top 4 Analytics Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold">
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Registered Patients</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-slate-900">1,420</span>
              <Users size={20} className="text-blue-600" />
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp size={12} /> +12% this week
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total AI Triage Cases</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-slate-900">3,890</span>
              <Activity size={20} className="text-purple-600" />
            </div>
            <span className="text-[11px] text-purple-700 font-semibold">Level 1-5 Auto Classified</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg ER Wait Time</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-amber-600">18.4 min</span>
              <Clock size={20} className="text-amber-500" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Down 4.5 min with AI Queue</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">WebSocket Gateway</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-emerald-600">Active</span>
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">Real-time Push Ready</span>
          </div>

        </div>

        {/* PATIENT DATASET TABLE CARD WITH DIRECT PDF DOWNLOAD */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <FileText size={18} className="text-blue-600" />
                Emergency Patient Dataset Table
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Patient registration history, emergency urgency level (1-5), symptoms, and department assignments.
              </p>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1.5 border border-blue-200 transition"
            >
              <Printer size={15} />
              Export & Download PDF
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">PATIENT NAME</th>
                  <th className="py-3 px-3">REG TIME</th>
                  <th className="py-3 px-3">EMERGENCY URGENCY</th>
                  <th className="py-3 px-3">PRIMARY SYMPTOM</th>
                  <th className="py-3 px-3">DEPARTMENT</th>
                  <th className="py-3 px-3 text-right">SPECIALIST DOCTOR</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium">
                {patientDataset.map((pt) => {
                  let urgencyBadge = (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      {pt.urgency}
                    </span>
                  );
                  if (pt.urgency.includes('Level 1')) {
                    urgencyBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-300">
                        {pt.urgency}
                      </span>
                    );
                  } else if (pt.urgency.includes('Level 2')) {
                    urgencyBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        {pt.urgency}
                      </span>
                    );
                  }

                  return (
                    <tr key={pt.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-3 font-bold text-slate-900 text-sm">
                        {pt.name}
                        <span className="block text-[10px] text-slate-400 font-mono font-normal">{pt.id}</span>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-slate-600">
                        {pt.regTime}
                      </td>

                      <td className="py-3.5 px-3">
                        {urgencyBadge}
                      </td>

                      <td className="py-3.5 px-3 text-slate-700 font-medium">
                        {pt.symptom}
                      </td>

                      <td className="py-3.5 px-3 font-bold text-slate-900">
                        {pt.dept}
                      </td>

                      <td className="py-3.5 px-3 text-right font-extrabold text-blue-700">
                        {pt.doctor}
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
