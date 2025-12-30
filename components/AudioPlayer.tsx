
import React, { useState, useRef } from 'react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
      <button 
        type="button" 
        onClick={togglePlay} 
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow active:scale-95"
      >
        <span className="text-xl">{isPlaying ? '❚❚' : '▶'}</span>
      </button>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-black text-slate-800 uppercase">LISTEN</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Click to play audio</span>
      </div>
      <audio 
        ref={audioRef} 
        src={src} 
        onEnded={handleEnded} 
        className="hidden" 
      />
    </div>
  );
};

export default AudioPlayer;
