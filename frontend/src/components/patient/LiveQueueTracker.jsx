import React, { useEffect, useState } from 'react';
import { Clock, Building, ShieldAlert, CheckCircle, RefreshCw } from 'lucide-react';
import { PriorityBadge } from '../common/PriorityBadge';
import { useSocket } from '../../context/SocketContext';

export const LiveQueueTracker = ({ triageData, onReset }) => {
  const { socket, joinPatientTracker } = useSocket();
  const [liveStatus, setLiveStatus] = useState({
    queuePosition: triageData.queuePosition,
    estimatedWaitMins: triageData.estimatedWaitMins,
    status: 'WAITING'
  });

  useEffect(() => {
    if (!triageData?.caseId) return;

    joinPatientTracker(triageData.caseId);

    function onQueueStatus(data) {
      console.log('[Socket] Received live queue status:', data);
      setLiveStatus({
        queuePosition: data.queuePosition,
        estimatedWaitMins: data.estimatedWaitMins,
        status: data.status
      });
    }

    if (socket) {
      socket.on('patient:queue_status', onQueueStatus);
    }

    return () => {
      if (socket) {
        socket.off('patient:queue_status', onQueueStatus);
      }
    };
  }, [triageData?.caseId, socket]);

  const assessment = triageData.triageAssessment;

  return (
    <div className="glass-panel p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs text-slate-400 font-mono">CASE ID: {triageData.caseId}</span>
          <h2 className="text-2xl font-black text-white">Live Patient Emergency Tracker</h2>
        </div>
        <PriorityBadge level={assessment.triageLevel} label={assessment.severityLabel} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Current Queue Position
          </span>
          <span className="text-4xl font-extrabold text-cyan-400 animate-pulse">
            #{liveStatus.queuePosition}
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Estimated Wait Time
          </span>
          <span className="text-4xl font-extrabold text-blue-400 flex items-center justify-center gap-1">
            <Clock size={28} /> {liveStatus.estimatedWaitMins} <span className="text-base font-normal">mins</span>
          </span>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Building className="text-cyan-400" size={16} />
          <span>Assigned Department: <strong className="text-white">{assessment.assignedDepartment}</strong></span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <ShieldAlert className="text-amber-400" size={16} />
          <span>AI Triage Confidence: <strong className="text-white">{(assessment.aiConfidence * 100).toFixed(0)}%</strong></span>
        </div>

        {assessment.riskFactors?.length > 0 && (
          <div className="pt-2 border-t border-slate-800/60">
            <span className="text-xs text-slate-400 block mb-1 font-semibold">Identified Risk Factors:</span>
            <div className="flex flex-wrap gap-1.5">
              {assessment.riskFactors.map((rf, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-300">
                  {rf}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full py-2.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center gap-2 transition"
      >
        <RefreshCw size={14} /> Submit Another Patient Case
      </button>
    </div>
  );
};
