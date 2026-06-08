import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const lines = [
  'Hey…',
  '',
  'I didn’t want to start this in a heavy way.',
  '',
  'So first…',
  '  Happy Best Friend Day 🤍',
  '',
  'I know I don’t always say things properly…',
  '  and sometimes I overthink a lot…',
  '',
  'But having you around…',
  '  just makes things feel a little better.',
  '',
  'You’ve become someone really important to me…',
  '  in ways I don’t even fully understand yet.',
  '',
  'And today…',
  '  I just wanted you to smile.',
  '',
  'That’s it.',
  '',
  'Nothing complicated…',
  '  just this.',
];

const revealDelays = lines.map((line) => (line ? 650 + Math.min(line.length * 14, 350) : 280));

export default function BestFriendLetter() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(0);
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: `${(index * 19 + 11) % 100}%`,
        top: `${(index * 13 + 17) % 100}%`,
        size: 4 + (index % 3),
        delay: index * 0.4,
        duration: 12 + (index % 4) * 2,
        drift: index % 2 === 0 ? 1 : -1,
      })),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    let accumulatedDelay = 0;
    lines.forEach((line, index) => {
      accumulatedDelay += revealDelays[index];
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) {
            setVisibleCount((current) => Math.max(current, index + 1));
          }
        }, accumulatedDelay),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(237,230,248,0.28),transparent_32%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(249,245,255,0.98),rgba(244,239,249,0.96),rgba(252,247,250,0.98))] bg-[length:300%_300%] animate-[gradient-shift_20s_ease-in-out_infinite]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-white/55"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [0.1, 0.32, 0.1],
              y: [0, particle.drift * 10, 0],
              x: [0, particle.drift * 6, 0],
              scale: [1, 1.1, 1],
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

      <motion.section
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: [1, 1.02, 1] }}
        transition={{
          opacity: { duration: 0.7, ease: 'easeOut' },
          y: { duration: 0.7, ease: 'easeOut' },
          scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="w-full max-w-3xl rounded-[2rem] border border-white/75 bg-white/60 px-6 py-10 text-center shadow-[0_24px_80px_rgba(86,58,126,0.1)] backdrop-blur-2xl sm:px-10 sm:py-14"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8f6ead]">
          Wish
        </p>

        <div className="mx-auto mt-8 max-w-2xl text-balance text-[#2b203f]">
          <AnimatePresence initial={false}>
            {lines.slice(0, visibleCount).map((line, index) => (
                <motion.p
                  key={`${index}-${line}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className={`whitespace-pre-wrap text-lg leading-8 sm:text-xl ${
                    line ? 'mb-3' : 'mb-1'
                  } ${index === 5 ? 'font-medium text-[#29183f]' : 'font-light text-[#2b203f]'}`}
                >
                  {line}
                </motion.p>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          onClick={() => navigate('/questions')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#28173f] px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(39,23,63,0.18)] transition hover:bg-[#352055]"
        >
          Continue…
        </motion.button>
      </motion.section>
    </main>
  );
}
