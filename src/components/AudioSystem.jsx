import { useEffect, useState } from 'react';

const musicPath = '/assets/Music.mp3';
let musicAudio = null;
let musicStarted = false;
let musicMuted = false;
let fadeAnimationFrame = null;
const musicStateEventName = 'music-state-change';

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

function stopFadeAnimation() {
  if (fadeAnimationFrame) {
    window.cancelAnimationFrame(fadeAnimationFrame);
    fadeAnimationFrame = null;
  }
}

function emitMusicState() {
  window.dispatchEvent(
    new CustomEvent(musicStateEventName, {
      detail: {
        started: musicStarted,
        muted: musicMuted,
      },
    }),
  );
}

function fadeVolume(audio, fromVolume, toVolume, duration, onComplete) {
  stopFadeAnimation();

  const startTime = window.performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    audio.volume = fromVolume + (toVolume - fromVolume) * progress;

    if (progress < 1) {
      fadeAnimationFrame = window.requestAnimationFrame(step);
      return;
    }

    fadeAnimationFrame = null;

    if (onComplete) {
      onComplete();
    }
  }

  fadeAnimationFrame = window.requestAnimationFrame(step);
}

function fadeInMusic(audio) {
  const targetVolume = 0.6;
  audio.volume = 0;
  fadeVolume(audio, 0, targetVolume, 2400);
}

function fadeOutMusic(audio) {
  fadeVolume(audio, audio.volume, 0, 700, () => {
    audio.pause();
  });
}

export function startMusic() {
  if (musicStarted) {
    return;
  }

  musicStarted = true;
  const audio = ensureMusicAudio();

  void audio
    .play()
    .then(() => {
      if (!musicMuted) {
        fadeInMusic(audio);
      }

      emitMusicState();
    })
    .catch(() => {
      musicStarted = false;
      emitMusicState();
    });
}

export function toggleMusic() {
  const audio = ensureMusicAudio();

  if (!musicStarted) {
    return;
  }

  musicMuted = !musicMuted;

  if (musicMuted) {
    fadeOutMusic(audio);
    emitMusicState();
    return;
  }

  void audio.play().then(() => {
    fadeInMusic(audio);
    emitMusicState();
  });
}

export function isMusicMuted() {
  return musicMuted;
}

export function isMusicStarted() {
  return musicStarted;
}

export default function AudioSystem() {
  useEffect(() => {
    ensureMusicAudio();

    return () => {
      stopFadeAnimation();

      if (musicAudio) {
        musicAudio.pause();
      }
    };
  }, []);

  return null;
}

export function MusicToggleButton() {
  const [muted, setMuted] = useState(isMusicMuted());
  const [started, setStarted] = useState(isMusicStarted());

  useEffect(() => {
    function handleMusicStateChange(event) {
      setMuted(event.detail.muted);
      setStarted(event.detail.started);
    }

    window.addEventListener(musicStateEventName, handleMusicStateChange);

    return () => {
      window.removeEventListener(musicStateEventName, handleMusicStateChange);
    };
  }, []);

  function handleToggle() {
    if (!started) {
      return;
    }

    toggleMusic();
    setMuted(isMusicMuted());
    setStarted(isMusicStarted());
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/55 text-sm shadow-[0_12px_30px_rgba(106,74,160,0.1)] backdrop-blur-xl transition hover:bg-white/75"
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      title={muted ? 'Unmute music' : 'Mute music'}
    >
      {muted || !started ? '🔇' : '🔊'}
    </button>
  );
}
