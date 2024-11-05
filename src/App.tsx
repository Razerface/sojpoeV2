import React, { useState } from 'react';
import ActivityForm from './components/ActivityForm';
import ParticipantForm from './components/ParticipantForm';
import AssignmentList from './components/AssignmentList';
import AssignmentModal from './components/AssignmentModal';
import HistorySidebar from './components/HistorySidebar';
import { Choice, Assignment } from './types';
import { saveToLocalStorage } from './utils/storage';
import { Terminal, Trash2 } from 'lucide-react';

function App() {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingAssignments, setPendingAssignments] = useState<Assignment[]>([]);

  const handleAssign = () => {
    if (participants.length === 0 || choices.length === 0) return;
    
    setIsAssigning(true);
    
    setTimeout(() => {
      const shuffledChoices = [...choices]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      // Create assignments for participants
      const assignedChoices = shuffledChoices.slice(0, participants.length);
      const newAssignments = participants.map((participant, index) => ({
        participant,
        choice: assignedChoices[index],
        timestamp: Date.now(),
      }));

      // Add unassigned choices
      const unassignedChoices = shuffledChoices.slice(participants.length);
      const unassignedAssignments = unassignedChoices.map(choice => ({
        participant: '',
        choice,
        timestamp: Date.now(),
        unassigned: true,
      }));

      setPendingAssignments([...newAssignments, ...unassignedAssignments]);
      setShowModal(true);
      setIsAssigning(false);
    }, 1500);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setAssignments(pendingAssignments);
    saveToLocalStorage(pendingAssignments);
    setPendingAssignments([]);
  };

  const handleClearAll = () => {
    setChoices([]);
    setParticipants([]);
  };

  return (
    <div className="min-h-screen bg-black text-[#00ff00] flex">
      <HistorySidebar currentAssignments={assignments} />
      
      <div className="flex-1 p-8 overflow-auto">
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Terminal className="w-8 h-8" />
            <h1 className="text-4xl font-bold font-mono">SOJ POE 3.25 Mid Season Picker</h1>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-[#008800] font-mono">System Status: {isAssigning ? 'Computing Assignments...' : 'Ready'}</p>
            {(choices.length > 0 || participants.length > 0) && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-3 py-1 bg-[#330000] text-red-500 rounded-lg hover:bg-[#440000] transition-colors border border-red-500 text-sm"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            )}
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <ActivityForm choices={choices} setChoices={setChoices} />
          
          {choices.length > 0 && (
            <ParticipantForm 
              participants={participants}
              setParticipants={setParticipants}
              onAssign={handleAssign}
              choicesCount={choices.length}
              isAssigning={isAssigning}
            />
          )}

          {assignments.length > 0 && (
            <AssignmentList assignments={assignments} />
          )}
        </div>
      </div>

      {showModal && (
        <AssignmentModal
          assignments={pendingAssignments}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default App;