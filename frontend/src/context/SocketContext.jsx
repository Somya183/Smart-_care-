import React, { createContext, useContext, useEffect, useState } from 'react';
import { socket } from '../services/socket';

const SocketContext = createContext({
  isConnected: false,
  joinDepartment: () => {},
  joinPatientTracker: () => {},
  socket: null
});

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('[WebSocket] Connected to MedPulse Gateway');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('[WebSocket] Disconnected from MedPulse Gateway');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const joinDepartment = (deptId) => {
    socket.emit('join:department', deptId);
  };

  const joinPatientTracker = (caseId) => {
    socket.emit('join:patient_tracker', caseId);
  };

  return (
    <SocketContext.Provider value={{ isConnected, joinDepartment, joinPatientTracker, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
