import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const lines = [
  { text: 'Maybe I’m just overthinking…', delay: 2000, size: 'text-3xl sm:text-5xl' },
  { text: 'But I feel things… a lot.', delay: 2000, size: 'text-3xl sm:text-5xl' },
  { text: 'And I don’t know if you do too.', delay: 2500, size: 'text-3xl sm:text-5xl' },
  { text: 'And that scares me a little.', delay: 2500, size: 'text-2xl sm:text-3xl' },
];

export default function PauseScreen() {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState([lines[0].text]);

  useEffect(() => {
    let cancelled = false;
    const timers = [];
    const sequence = [lines[1], lines[2], lines[3]];

    let accumulatedDelay = lines[0].delay;
    sequence.forEach((line, index) => {
      accumulatedDelay += line.delay;
      const timer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setVisibleLines((current) => [...current, line.text]);

        if (index === sequence.length - 1) {
          const finalTimer = window.setTimeout(() => {
            if (!cancelled) {
              navigate('/letter');
            }
          }, 2000);
          timers.push(finalTimer);
        }
      }, accumulatedDelay);

      timers.push(timer);
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="pause-gradient absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(162,114,209,0.18),transparent_32%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-35 blur-3xl"
        animate={{
          x: ['-4%', '4%', '-4%'],
          y: ['-3%', '2%', '-3%'],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute left-[10%] top-[20%] h-80 w-80 rounded-full bg-fuchsia-500/20" />
        <div className="absolute right-[12%] top-[18%] h-96 w-96 rounded-full bg-violet-400/15" />
        <div className="absolute bottom-[12%] left-[30%] h-72 w-72 rounded-full bg-pink-400/10" />
      </motion.div>

      <section className="w-full max-w-4xl text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
            Pause
          </p>

          <AnimatePresence mode="wait">
            {visibleLines.map((line, index) => {
              const isFinal = index === lines.length - 1;

              return (
                <motion.p
                  key={`${index}-${line}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`heartbeat-pulse max-w-3xl text-balance text-white ${
                    isFinal ? 'text-2xl font-light sm:text-3xl' : 'text-3xl font-medium sm:text-5xl'
                  }`}
                >
                  {line}
                </motion.p>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
