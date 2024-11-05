import React, { useState } from 'react';
import { PlusCircle, Trash2, Youtube, Link2 } from 'lucide-react';
import { Choice } from '../types';

interface ActivityFormProps {
  choices: Choice[];
  setChoices: React.Dispatch<React.SetStateAction<Choice[]>>;
}

function ActivityForm({ choices, setChoices }: ActivityFormProps) {
  const [newChoice, setNewChoice] = useState<Choice>({
    title: '',
    pobUrl: '',
    youtubeUrl: '',
  });

  const handleAdd = () => {
    if (!newChoice.title) return;
    setChoices([...choices, newChoice]);
    setNewChoice({ title: '', pobUrl: '', youtubeUrl: '' });
  };

  const handleRemove = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-[#00ff00] bg-black/50 rounded-xl p-6 shadow-[0_0_15px_rgba(0,255,0,0.15)]">
      <h2 className="text-2xl font-mono font-semibold mb-4">Initialize Activities</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Activity Title"
            value={newChoice.title}
            onChange={(e) => setNewChoice({ ...newChoice, title: e.target.value })}
            className="p-2 bg-black border border-[#00ff00] rounded-lg focus:ring-2 focus:ring-[#00ff00] text-[#00ff00] placeholder-[#008800]"
          />
          <input
            type="url"
            placeholder="POB URL"
            value={newChoice.pobUrl}
            onChange={(e) => setNewChoice({ ...newChoice, pobUrl: e.target.value })}
            className="p-2 bg-black border border-[#00ff00] rounded-lg focus:ring-2 focus:ring-[#00ff00] text-[#00ff00] placeholder-[#008800]"
          />
          <input
            type="url"
            placeholder="YouTube URL"
            value={newChoice.youtubeUrl}
            onChange={(e) => setNewChoice({ ...newChoice, youtubeUrl: e.target.value })}
            className="p-2 bg-black border border-[#00ff00] rounded-lg focus:ring-2 focus:ring-[#00ff00] text-[#00ff00] placeholder-[#008800]"
          />
        </div>
        
        <button
          onClick={handleAdd}
          className="w-full bg-[#003300] text-[#00ff00] p-2 rounded-lg hover:bg-[#004400] transition-colors flex items-center justify-center gap-2 border border-[#00ff00]"
        >
          <PlusCircle size={20} />
          Add Activity
        </button>
      </div>

      {choices.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-mono mb-3">Registered Activities</h3>
          <div className="space-y-3">
            {choices.map((choice, index) => (
              <div key={index} className="flex items-center justify-between border border-[#00ff00]/50 bg-black/30 p-3 rounded-lg">
                <div className="flex-1">
                  <p className="font-mono">{choice.title}</p>
                  <div className="flex gap-4 mt-1">
                    {choice.pobUrl && (
                      <a href={choice.pobUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff00] hover:text-[#00ff00]/80 flex items-center gap-1">
                        <Link2 size={16} />
                        POB
                      </a>
                    )}
                    {choice.youtubeUrl && (
                      <a href={choice.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff00] hover:text-[#00ff00]/80 flex items-center gap-1">
                        <Youtube size={16} />
                        Video
                      </a>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityForm;