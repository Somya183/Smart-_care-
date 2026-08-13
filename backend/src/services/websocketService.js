/**
 * MedPulse ER - WebSocket Service
 * Handles real-time events for live doctor dashboards, staff triage notifications,
 * and patient queue tracker PWA synchronization.
 */

class WebSocketService {
  init(io) {
    this.io = io;

    this.io.on('connection', (socket) => {
      console.log(`[Socket.IO] New connection established: ${socket.id}`);

      // Room subscriptions
      socket.on('join:department', (deptId) => {
        socket.join(`dept_${deptId}`);
        console.log(`[Socket.IO] Socket ${socket.id} joined department room: dept_${deptId}`);
      });

      socket.on('join:patient_tracker', (caseId) => {
        socket.join(`case_${caseId}`);
        console.log(`[Socket.IO] Socket ${socket.id} joined patient tracker room: case_${caseId}`);
      });

      socket.on('disconnect', () => {
        console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
      });
    });
  }

  /**
   * Broadcast new triage case to hospital department staff
   */
  notifyNewCase(deptId, triageCase) {
    if (!this.io) return;
    this.io.to(`dept_${deptId}`).emit('triage:new_case', triageCase);
    this.io.emit('global:emergency_alert', {
      type: 'NEW_CASE',
      level: triageCase.triageLevel,
      deptId
    });
  }

  /**
   * Broadcast dynamic queue updates (re-order, wait time change)
   */
  broadcastQueueUpdate(deptId, updatedQueue) {
    if (!this.io) return;
    this.io.to(`dept_${deptId}`).emit('queue:reordered', {
      deptId,
      queue: updatedQueue,
      timestamp: new Date()
    });

    // Also update individual patient tracker subscribers
    updatedQueue.forEach(item => {
      this.io.to(`case_${item.caseId}`).emit('patient:queue_status', {
        queuePosition: item.queuePosition,
        priorityScore: item.priorityScore,
        estimatedWaitMins: item.queuePosition * 15, // rough estimate
        status: item.status
      });
    });
  }

  /**
   * Notify patient when their status changes (e.g. In Triage -> With Doctor)
   */
  notifyPatientStatusChange(caseId, statusData) {
    if (!this.io) return;
    this.io.to(`case_${caseId}`).emit('patient:status_changed', statusData);
  }
}

module.exports = new WebSocketService();
