import { useEffect, useRef } from 'react';

const musicPath = '/assets/Music.mp3';

export default function AudioSystem() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(musicPath);

    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0;
    audio.load();
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
}
