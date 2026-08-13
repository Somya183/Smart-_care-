import React from 'react';
import { AlertCircle, AlertTriangle, Clock, Activity, CheckCircle2 } from 'lucide-react';

export const PriorityBadge = ({ level, label }) => {
  const getBadgeConfig = (lvl) => {
    switch (lvl) {
      case 1:
        return { className: 'badge-level-1', icon: <AlertCircle size={14} />, text: label || 'Level 1 - Critical' };
      case 2:
        return { className: 'badge-level-2', icon: <AlertTriangle size={14} />, text: label || 'Level 2 - Emergent' };
      case 3:
        return { className: 'badge-level-3', icon: <Activity size={14} />, text: label || 'Level 3 - Urgent' };
      case 4:
        return { className: 'badge-level-4', icon: <Clock size={14} />, text: label || 'Level 4 - Less Urgent' };
      default:
        return { className: 'badge-level-5', icon: <CheckCircle2 size={14} />, text: label || 'Level 5 - Non-Urgent' };
    }
  };

  const config = getBadgeConfig(level);

  return (
    <span className={`badge-level ${config.className}`}>
      {config.icon}
      <span>{config.text}</span>
    </span>
  );
};
