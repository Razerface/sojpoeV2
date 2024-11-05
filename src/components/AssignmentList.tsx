import React from 'react';
import { Youtube, Link2, AlertCircle } from 'lucide-react';
import { Assignment } from '../types';

interface AssignmentListProps {
  assignments: Assignment[];
}

function AssignmentList({ assignments }: AssignmentListProps) {
  const assignedTasks = assignments.filter(a => !a.unassigned);
  const unassignedTasks = assignments.filter(a => a.unassigned);

  return (
    <div className="border border-[#00ff00] bg-black/50 rounded-xl p-6 shadow-[0_0_15px_rgba(0,255,0,0.15)]">
      <h2 className="text-2xl font-mono font-semibold mb-4">Assignment Matrix</h2>
      
      <div className="space-y-6">
        {/* Assigned Tasks */}
        {assignedTasks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-mono text-[#00ff00] flex items-center gap-2">
              Active Assignments
            </h3>
            {assignedTasks.map((assignment, index) => (
              <div 
                key={index} 
                className="border border-[#00ff00] bg-black/30 p-4 rounded-lg animate-[fadeIn_0.5s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-mono">
                      {assignment.participant}
                    </h3>
                    <p className="text-[#008800] font-mono">
                      {assignment.choice.title}
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    {assignment.choice.pobUrl && (
                      <a
                        href={assignment.choice.pobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#002200] rounded-lg text-[#00ff00] hover:bg-[#003300] transition-colors border border-[#00ff00]"
                      >
                        <Link2 size={18} />
                        POB
                      </a>
                    )}
                    {assignment.choice.youtubeUrl && (
                      <a
                        href={assignment.choice.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#002200] rounded-lg text-[#00ff00] hover:bg-[#003300] transition-colors border border-[#00ff00]"
                      >
                        <Youtube size={18} />
                        Video
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unassigned Tasks */}
        {unassignedTasks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-mono text-[#666666] flex items-center gap-2">
              <AlertCircle size={20} />
              Unassigned Activities
            </h3>
            {unassignedTasks.map((assignment, index) => (
              <div 
                key={`unassigned-${index}`} 
                className="border border-[#333333] bg-black/20 p-4 rounded-lg animate-[fadeIn_0.5s_ease-out]"
                style={{ animationDelay: `${(assignedTasks.length + index) * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-[#666666] font-mono">
                      {assignment.choice.title}
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    {assignment.choice.pobUrl && (
                      <a
                        href={assignment.choice.pobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-lg text-[#666666] hover:bg-[#222222] transition-colors border border-[#333333]"
                      >
                        <Link2 size={18} />
                        POB
                      </a>
                    )}
                    {assignment.choice.youtubeUrl && (
                      <a
                        href={assignment.choice.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-lg text-[#666666] hover:bg-[#222222] transition-colors border border-[#333333]"
                      >
                        <Youtube size={18} />
                        Video
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentList;