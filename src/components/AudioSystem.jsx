import { useEffect } from 'react';

const musicPath = '/assets/Music.mp3';
let musicAudio = null;
let musicStarted = false;

function ensureMusicAudio() {
  if (!musicAudio) {
    musicAudio = new Audio(musicPath);
    musicAudio.preload = 'auto';
    musicAudio.loop = true;
    musicAudio.volume = 0;
    musicAudio.load();
  }

  return musicAudio;
}

export function startMusic() {
  if (musicStarted) {
    return;
  }

  musicStarted = true;
  const audio = ensureMusicAudio();
  void audio.play();
}

export default function AudioSystem() {
  useEffect(() => {
    ensureMusicAudio();

    return () => {
      if (musicAudio) {
        musicAudio.pause();
      }
    };
  }, []);

  return null;
}
