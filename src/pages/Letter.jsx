import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const letterLines = [
  'Hey,',
  'I do not know if I ever said this the right way,',
  'but you made a lot of ordinary moments feel softer.',
  'Some days I think I was quieter about it than I should have been.',
  'Still, I always noticed.',
  'And I think that mattered.',
];

const lineDelay = 850;
const charDelay = 26;

export default function Letter() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [activeLine, setActiveLine] = useState('');

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    async function revealLetter() {
      const nextLines = [];

      for (const line of letterLines) {
        let current = '';

        for (const character of line) {
          if (cancelled) {
            return;
          }

          current += character;
          setActiveLine(current);
          await new Promise((resolve) => {
            timers.push(window.setTimeout(resolve, charDelay));
          });
        }

        if (cancelled) {
          return;
        }

        nextLines.push(current);
        setVisibleLines([...nextLines]);
        setActiveLine('');

        await new Promise((resolve) => {
          timers.push(window.setTimeout(resolve, lineDelay));
        });
      }
    }

    revealLetter();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <section className="relative flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/60 bg-white/22 px-5 py-12 shadow-[0_24px_80px_rgba(86,58,126,0.18)] backdrop-blur-2xl sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(225,194,255,0.34),transparent_30%)]" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f6ead]">
          Step 5
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#231635] sm:text-4xl">
          A letter, slowly
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#5f5870] sm:text-base">
          The words reveal themselves one line at a time, with just enough pause to let them land.
        </p>

        <div className="relative mx-auto mt-10 overflow-hidden rounded-[2rem] border border-white/75 bg-[#fffafc]/75 p-6 text-left shadow-[0_18px_60px_rgba(86,58,126,0.14)] backdrop-blur-2xl sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.45),transparent_35%,rgba(255,255,255,0.16)_60%,transparent)] opacity-70" />
          <div className="relative z-10 min-h-[16rem] text-center text-[0.98rem] leading-8 text-[#46395f] sm:text-[1.02rem] sm:leading-9">
            <AnimatePresence mode="wait">
              {visibleLines.map((line, index) => (
                <motion.p
                  key={`${index}-${line}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="mb-2"
                >
                  {line}
                </motion.p>
              ))}
            </AnimatePresence>

            {activeLine ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="mb-2 inline-block min-h-[1.8rem]"
              >
                {activeLine}
                <span className="ml-1 inline-block animate-pulse">|</span>
              </motion.p>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton to="/nickname-reveal">Reveal</PrimaryButton>
          <SecondaryButton to="/name-input">Back</SecondaryButton>
        </div>
      </motion.div>
    </section>
  );
}
