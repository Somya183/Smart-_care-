import React, { useEffect, useState } from 'react';
import { fetchDepartmentQueue, updateQueueStatus } from '../../services/api';
import { PriorityBadge } from '../common/PriorityBadge';
import { useSocket } from '../../context/SocketContext';
import { Activity, UserCheck, Stethoscope, CheckCircle2, Clock } from 'lucide-react';

export const DoctorQueueBoard = () => {
  const [queue, setQueue] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [loading, setLoading] = useState(true);
  const { socket, joinDepartment } = useSocket();

  const loadQueue = async () => {
    try {
      setLoading(true);
      const data = await fetchDepartmentQueue(selectedDept === 'All' ? '' : selectedDept);
      setQueue(data.queue || []);
    } catch (err) {
      console.error('Failed to load queue:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueue();
    joinDepartment(selectedDept);

    function onQueueReordered(data) {
      console.log('[Socket] Queue reordered event:', data);
      if (data.queue) {
        setQueue(data.queue);
      }
    }

    if (socket) {
      socket.on('queue:reordered', onQueueReordered);
    }

    return () => {
      if (socket) {
        socket.off('queue:reordered', onQueueReordered);
      }
    };
  }, [selectedDept, socket]);

  const handleStatusChange = async (queueId, newStatus) => {
    try {
      await updateQueueStatus(queueId, newStatus);
      await loadQueue();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Stethoscope className="text-cyan-400" /> ER Live Doctor Triage Board
          </h2>
          <p className="text-sm text-slate-400">
            Dynamic priority queue sorted in real-time by severity score and wait time.
          </p>
        </div>

        <div className="flex gap-2">
          {['All', 'Cardiology ER', 'General ER', 'Pediatric ER'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedDept === dept
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading live triage board...</div>
      ) : queue.length === 0 ? (
        <div className="glass-panel p-12 text-center text-slate-400">
          No patients currently waiting in this department queue.
        </div>
      ) : (
        <div className="grid gap-3">
          {queue.map((item) => (
            <div
              key={item.queueId || item.caseId}
              className="glass-panel p-4 flex items-center justify-between hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-xl text-cyan-400">
                  #{item.queuePosition}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-white">{item.patientName}</h3>
                    <PriorityBadge level={item.triageLevel} label={item.severityLabel} />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>Dept: <strong className="text-slate-200">{item.department}</strong></span>
                    <span>Dynamic Priority Score: <strong className="text-cyan-400">{item.priorityScore}</strong></span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {Math.floor((Date.now() - new Date(item.waitStartTime).getTime()) / 60000)} mins waiting
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(item.queueId, 'WITH_DOCTOR')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-600 hover:text-white transition flex items-center gap-1"
                >
                  <UserCheck size={14} /> Call Patient
                </button>

                <button
                  onClick={() => handleStatusChange(item.queueId, 'DISCHARGED')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-600 hover:text-white transition flex items-center gap-1"
                >
                  <CheckCircle2 size={14} /> Discharge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
