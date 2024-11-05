import React, { useState, useEffect } from 'react';
import { X, Youtube, Link2, AlertCircle } from 'lucide-react';
import { Assignment } from '../types';

interface AssignmentModalProps {
  assignments: Assignment[];
  onClose: () => void;
}

function AssignmentModal({ assignments, onClose }: AssignmentModalProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const assignedTasks = assignments.filter(a => !a.unassigned);
  const unassignedTasks = assignments.filter(a => a.unassigned);

  useEffect(() => {
    if (visibleCount < assignments.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, assignments.length]);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-[#00ff00] rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-[0_0_30px_rgba(0,255,0,0.2)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#00ff00] hover:text-[#00ff00]/80 p-2"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-mono font-bold mb-6 text-center">
          Initializing Assignments
          <span className="inline-block ml-2 animate-pulse">_</span>
        </h2>

        <div className="space-y-6">
          {/* Assigned Tasks */}
          {assignedTasks.map((assignment, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 ${
                index < visibleCount
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="border border-[#00ff00] bg-black/50 p-6 rounded-lg">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-mono text-[#00ff00]">
                      {assignment.participant}
                    </h3>
                    <div className="flex gap-3">
                      {assignment.choice.pobUrl && (
                        <a
                          href={assignment.choice.pobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#002200] rounded-lg text-[#00ff00] hover:bg-[#003300] transition-colors border border-[#00ff00] text-sm"
                        >
                          <Link2 size={16} />
                          POB
                        </a>
                      )}
                      {assignment.choice.youtubeUrl && (
                        <a
                          href={assignment.choice.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#002200] rounded-lg text-[#00ff00] hover:bg-[#003300] transition-colors border border-[#00ff00] text-sm"
                        >
                          <Youtube size={16} />
                          Video
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="font-mono text-[#008800] text-lg">
                    {assignment.choice.title}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Unassigned Tasks */}
          {unassignedTasks.length > 0 && visibleCount > assignedTasks.length && (
            <div className="border-t border-[#333333] pt-6 mt-6">
              <div className="flex items-center gap-2 mb-4 text-[#666666]">
                <AlertCircle size={20} />
                <h3 className="text-lg font-mono">Unassigned Activities</h3>
              </div>
              {unassignedTasks.map((assignment, index) => (
                <div
                  key={`unassigned-${index}`}
                  className={`transform transition-all duration-500 ${
                    index + assignedTasks.length < visibleCount
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <div className="border border-[#333333] bg-black/20 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[#666666]">
                        {assignment.choice.title}
                      </div>
                      <div className="flex gap-3">
                        {assignment.choice.pobUrl && (
                          <a
                            href={assignment.choice.pobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] rounded-lg text-[#666666] hover:bg-[#222222] transition-colors border border-[#333333] text-sm"
                          >
                            <Link2 size={16} />
                            POB
                          </a>
                        )}
                        {assignment.choice.youtubeUrl && (
                          <a
                            href={assignment.choice.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] rounded-lg text-[#666666] hover:bg-[#222222] transition-colors border border-[#333333] text-sm"
                          >
                            <Youtube size={16} />
                            Video
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {visibleCount === assignments.length && (
          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-[#003300] text-[#00ff00] rounded-lg hover:bg-[#004400] transition-colors border border-[#00ff00] font-mono"
          >
            Continue to Assignment Matrix
          </button>
        )}
      </div>
    </div>
  );
}

export default AssignmentModal;