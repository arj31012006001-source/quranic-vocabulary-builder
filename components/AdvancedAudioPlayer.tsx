import React, { useState, useEffect, useRef } from 'react';

interface AdvancedAudioPlayerProps {
  text: string;
}

const AdvancedAudioPlayer: React.FC<AdvancedAudioPlayerProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const rates = [0.75, 1, 1.25];
  
  // Use a ref to hold the utterance instance to prevent stale closures
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    const cleanup = () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
    
    // Add event listener to also clean up when navigating away
    window.addEventListener('beforeunload', cleanup);
    
    return () => {
      cleanup();
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);

  const handlePlayPause = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!('speechSynthesis' in window)) {
      alert("Sorry, your browser doesn't support text-to-speech.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // Cancel any previous utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = playbackRate;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleRateChange = (event: React.MouseEvent, rate: number) => {
    event.stopPropagation();
    setPlaybackRate(rate);

    // If it's already playing, restart with the new rate
    if (isPlaying) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = rate;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-full" onClick={e => e.stopPropagation()}>
      <button
        onClick={handlePlayPause}
        className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      <div className="flex items-center text-xs font-semibold">
        {rates.map(rate => (
          <button
            key={rate}
            onClick={(e) => handleRateChange(e, rate)}
            className={`px-2 py-1 rounded-full transition-colors ${playbackRate === rate ? 'bg-emerald-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
          >
            {rate}x
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdvancedAudioPlayer;
