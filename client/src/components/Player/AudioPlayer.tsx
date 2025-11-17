import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/stores/playerStore';

/**
 * Audio Player Component
 * Handles the actual HTML5 audio element and syncs with player store
 */
export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    currentTrack,
    volume,
    setAudioElement,
    setCurrentTime,
    setDuration,
    next,
    repeatMode,
  } = usePlayerStore();

  // Initialize audio element
  useEffect(() => {
    if (audioRef.current) {
      setAudioElement(audioRef.current);
      audioRef.current.volume = volume;
    }
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle time updates
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle duration change
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle track end
  const handleEnded = () => {
    if (repeatMode === 'one') {
      audioRef.current?.play();
    } else {
      next();
    }
  };

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
      preload="metadata"
    >
      {currentTrack && <source src={currentTrack.audioUrl} type="audio/mpeg" />}
    </audio>
  );
}
