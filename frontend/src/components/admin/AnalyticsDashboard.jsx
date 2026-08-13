import React from 'react';
import { Activity, Users, Clock, ShieldAlert, Award, TrendingUp } from 'lucide-react';

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Activity className="text-cyan-400" /> Hospital Management & AI Analytics
        </h2>
        <p className="text-sm text-slate-400">
          Real-time metrics on ER throughput, triage accuracy, and department workload.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-panel p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Intake Today</span>
            <Users className="text-cyan-400" size={18} />
          </div>
          <span className="text-3xl font-extrabold text-white">124</span>
          <span className="text-xs text-emerald-400 block mt-1">↑ 14% vs yesterday</span>
        </div>

        <div className="glass-panel p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Avg ER Door-to-Doc Time</span>
            <Clock className="text-blue-400" size={18} />
          </div>
          <span className="text-3xl font-extrabold text-white">14.2 <span className="text-sm font-normal">mins</span></span>
          <span className="text-xs text-emerald-400 block mt-1">↓ 4.5 mins faster via AI triage</span>
        </div>

        <div className="glass-panel p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Critical Cases (L1 & L2)</span>
            <ShieldAlert className="text-red-400" size={18} />
          </div>
          <span className="text-3xl font-extrabold text-red-400">18</span>
          <span className="text-xs text-slate-400 block mt-1">Immediate priority rerouted</span>
        </div>

        <div className="glass-panel p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">AI Triage Precision</span>
            <Award className="text-amber-400" size={18} />
          </div>
          <span className="text-3xl font-extrabold text-cyan-400">96.4%</span>
          <span className="text-xs text-emerald-400 block mt-1">Validated against physician audit</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-cyan-400" /> Triage Level Distribution
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-400 font-bold">Level 1 - Critical (12%)</span>
                <span className="text-slate-400">15 Cases</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-orange-400 font-bold">Level 2 - Emergent (22%)</span>
                <span className="text-slate-400">27 Cases</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '22%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-yellow-400 font-bold">Level 3 - Urgent (38%)</span>
                <span className="text-slate-400">47 Cases</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-bold">Level 4 - Less Urgent (20%)</span>
                <span className="text-slate-400">25 Cases</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="font-bold text-lg text-white mb-4">Department Capacity Load</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-sm font-semibold text-white">Cardiology ER</span>
              <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                85% Capacity (High Load)
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-sm font-semibold text-white">Trauma & Emergency Surgery</span>
              <span className="text-xs px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                92% Capacity (Critical)
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-sm font-semibold text-white">Pediatric ER</span>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                45% Capacity (Normal)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
