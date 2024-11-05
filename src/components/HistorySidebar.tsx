import React from 'react';
import { History } from 'lucide-react';
import { Assignment, AssignmentHistory } from '../types';
import { getHistoryFromStorage } from '../utils/storage';

interface HistorySidebarProps {
  currentAssignments: Assignment[];
}

function HistorySidebar({ currentAssignments }: HistorySidebarProps) {
  const history = getHistoryFromStorage();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="w-80 border-r border-[#00ff00] p-4 hidden lg:block">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5" />
        <h2 className="text-xl font-mono">Assignment History</h2>
      </div>

      <div className="space-y-4">
        {history.map((entry: AssignmentHistory) => (
          <div key={entry.id} className="border border-[#00ff00]/30 rounded-lg p-3 bg-black/30">
            <p className="text-[#008800] text-sm font-mono mb-2">
              {formatDate(parseInt(entry.id))}
            </p>
            <div className="space-y-2">
              {entry.assignments.map((assignment, index) => (
                <div key={index} className="text-sm font-mono">
                  <span className="text-[#00ff00]">{assignment.participant}</span>
                  <span className="text-[#008800]"> → </span>
                  <span className="text-[#00aa00]">{assignment.choice.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistorySidebar;