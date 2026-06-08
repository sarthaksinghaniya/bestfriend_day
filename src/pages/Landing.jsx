import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useName } from '../context/NameContext';

export default function Landing() {
  const navigate = useNavigate();
  const { name } = useName();
  const displayName = name || 'you';
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: `${(index * 13) % 100}%`,
        top: `${(index * 17 + 8) % 100}%`,
        delay: index * 0.25,
        size: 10 + (index % 3) * 4,
        drift: index % 2 === 0 ? 1 : -1,
        duration: 5 + (index % 4),
      })),
    [],
  );

  useEffect(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      return undefined;
    }

    const audioContext = new AudioContextClass();
    const master = audioContext.createGain();
    master.gain.value = 0.035;
    master.connect(audioContext.destination);

    const oscillatorA = audioContext.createOscillator();
    const oscillatorB = audioContext.createOscillator();
    const lowPass = audioContext.createBiquadFilter();
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();

    lowPass.type = 'lowpass';
    lowPass.frequency.value = 520;
    lowPass.Q.value = 0.5;

    oscillatorA.type = 'sine';
    oscillatorA.frequency.value = 220;
    oscillatorB.type = 'triangle';
    oscillatorB.frequency.value = 330;

    lfo.type = 'sine';
    lfo.frequency.value = 0.12;
    lfoGain.gain.value = 80;

    lfo.connect(lfoGain);
    lfoGain.connect(lowPass.frequency);

    oscillatorA.connect(lowPass);
    oscillatorB.connect(lowPass);
    lowPass.connect(master);

    oscillatorA.start();
    oscillatorB.start();
    lfo.start();

    const leadTimer = window.setInterval(() => {
      oscillatorA.frequency.setTargetAtTime(
        220 + (Math.random() > 0.5 ? 12 : -12),
        audioContext.currentTime,
        0.12,
      );
      oscillatorB.frequency.setTargetAtTime(
        330 + (Math.random() > 0.5 ? 8 : -8),
        audioContext.currentTime,
        0.12,
      );
    }, 2200);

    audioContext.resume().catch(() => undefined);

    return () => {
      window.clearInterval(leadTimer);
      lfo.stop();
      oscillatorA.stop();
      oscillatorB.stop();
      audioContext.close().catch(() => undefined);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/55 bg-white/18 px-6 py-14 text-center shadow-[0_28px_90px_rgba(73,42,108,0.18)] backdrop-blur-2xl sm:px-10 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="animated-gradient absolute inset-0 opacity-80"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent_35%,rgba(255,255,255,0.08)_60%,transparent)]" />
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            aria-hidden="true"
            className="absolute rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.55)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, particle.drift * 18, 0],
              x: [0, particle.drift * 8, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.18, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-xs font-semibold uppercase tracking-[0.42em] text-[#705788]"
        >
          Welcome back
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="mt-5 text-3xl font-semibold tracking-tight text-[#261739] sm:text-5xl"
        >
          Hey {displayName}… I made something for you
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#5a506b] sm:text-base"
        >
          A soft, floating little moment with memories, music, and a reveal waiting on the other side.
        </motion.p>

        <motion.button
          type="button"
          onClick={() => navigate('/questions')}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#28173f] px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(39,23,63,0.28)] transition hover:bg-[#352055]"
        >
          Click if you’re ready
        </motion.button>
      </div>
    </motion.section>
  );
}
