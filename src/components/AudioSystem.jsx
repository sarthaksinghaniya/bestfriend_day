import { useEffect } from 'react';

const musicPath = '/assets/Music.mp3';
let musicAudio = null;
let musicStarted = false;
let fadeAnimationFrame = null;

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

function fadeInMusic(audio) {
  if (fadeAnimationFrame) {
    window.cancelAnimationFrame(fadeAnimationFrame);
    fadeAnimationFrame = null;
  }

  const targetVolume = 0.6;
  const fadeDuration = 2400;
  const startTime = window.performance.now();

  audio.volume = 0;

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / fadeDuration, 1);
    audio.volume = targetVolume * progress;

    if (progress < 1) {
      fadeAnimationFrame = window.requestAnimationFrame(step);
      return;
    }

    fadeAnimationFrame = null;
  }

  fadeAnimationFrame = window.requestAnimationFrame(step);
}

export function startMusic() {
  if (musicStarted) {
    return;
  }

  musicStarted = true;
  const audio = ensureMusicAudio();
  void audio.play()
    .then(() => {
      fadeInMusic(audio);
    })
    .catch(() => {
      musicStarted = false;
    });
}

export default function AudioSystem() {
  useEffect(() => {
    ensureMusicAudio();

    return () => {
      if (fadeAnimationFrame) {
        window.cancelAnimationFrame(fadeAnimationFrame);
        fadeAnimationFrame = null;
      }

      if (musicAudio) {
        musicAudio.pause();
      }
    };
  }, []);

  return null;
}
