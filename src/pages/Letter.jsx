import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const letterLines = [
  'I don’t expect all your time…',
  'I know life gets busy… and I understand that.',
  '',
  'But sometimes…',
  'it hurts a little…',
  'when I see you give that time to someone else…',
  'and not me.',
  '',
  'I don’t want to force anything between us.',
  'I don’t want something that isn’t real.',
  '',
  'I just… want you.',
  'Not because I asked…',
  'but because you chose me.',
  '',
  'I’ll stand by you… in everything.',
  'Even on the days you don’t have time for me.',
  '',
  'But somewhere… quietly…',
  'I just need your trust.',
  'And maybe… a little more of your love.',
  '',
  'And if I already mean something to you…',
  'then… be mine again.',
  '',
  'And if I don’t…',
  '',
  'Would you… be mine?',
];

const charDelay = 28;
const linePauseMin = 500;
const linePauseMax = 1000;
const typingStartDelay = 1000;

function getLinePause(line) {
  if (!line) {
    return 650;
  }

  const clampedLength = Math.max(1, Math.min(80, line.length));
  const ratio = clampedLength / 80;
  return linePauseMin + Math.round(ratio * (linePauseMax - linePauseMin));
}

function createAmbientAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  const audioContext = new AudioContextClass();
  const master = audioContext.createGain();
  master.gain.value = 0.16;
  master.connect(audioContext.destination);

  const padA = audioContext.createOscillator();
  const padB = audioContext.createOscillator();
  const filter = audioContext.createBiquadFilter();
  const lfo = audioContext.createOscillator();
  const lfoGain = audioContext.createGain();

  filter.type = 'lowpass';
  filter.frequency.value = 720;
  filter.Q.value = 0.55;

  padA.type = 'sine';
  padA.frequency.value = 174.61;
  padB.type = 'triangle';
  padB.frequency.value = 261.63;

  lfo.type = 'sine';
  lfo.frequency.value = 0.06;
  lfoGain.gain.value = 85;

  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  padA.connect(filter);
  padB.connect(filter);
  filter.connect(master);

  padA.start();
  padB.start();
  lfo.start();

  return {
    audioContext,
    stop() {
      lfo.stop();
      padA.stop();
      padB.stop();
      audioContext.close().catch(() => undefined);
    },
  };
}

export default function Letter() {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState([]);
  const [activeLine, setActiveLine] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: `${(index * 17 + 9) % 100}%`,
        top: `${(index * 11 + 13) % 100}%`,
        size: 4 + (index % 3),
        delay: index * 0.35,
        duration: 10 + (index % 5) * 2,
      })),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    const timers = [];
    const ambient = createAmbientAudio();

    if (ambient) {
      ambient.audioContext.resume().catch(() => undefined);
    }

    async function revealLetter() {
      const nextLines = [];

      for (const line of letterLines) {
        let current = '';

        if (!line) {
          setVisibleLines([...nextLines, '']);
          await new Promise((resolve) => {
            timers.push(window.setTimeout(resolve, 650));
          });
          continue;
        }

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
          timers.push(window.setTimeout(resolve, getLinePause(line)));
        });
      }

      if (!cancelled) {
        setIsComplete(true);
      }
    }

    timers.push(
      window.setTimeout(() => {
        if (!cancelled) {
          revealLetter();
        }
      }, typingStartDelay),
    );

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      ambient?.stop();
    };
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(233,214,255,0.35),transparent_30%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(9,8,16,0.94),rgba(38,23,56,0.88),rgba(96,62,136,0.7),rgba(231,217,255,0.2))] bg-[length:300%_300%] animate-[pause-shift_24s_ease-in-out_infinite]" />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-30 blur-3xl"
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-3%', '2%', '-3%'],
          scale: [1, 1.04, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute left-[8%] top-[18%] h-80 w-80 rounded-full bg-fuchsia-500/20" />
        <div className="absolute right-[10%] top-[16%] h-96 w-96 rounded-full bg-violet-400/20" />
        <div className="absolute bottom-[10%] left-[28%] h-72 w-72 rounded-full bg-pink-300/10" />
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-white/40"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [0.08, 0.28, 0.08],
              y: [0, -10, 0],
              x: [0, 6, 0],
              scale: [1, 1.16, 1],
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
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 18, ease: 'easeInOut' }}
        className="w-full max-w-4xl text-center"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 px-5 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/35">
            Letter
          </p>

          <div className="mx-auto mt-8 max-w-2xl text-center text-white">
            <AnimatePresence mode="wait">
              {visibleLines.map((line, index) => {
                const isFinalBlank = line === '';
                const lineKey = `${index}-${line}`;

                return (
                  <motion.p
                    key={lineKey}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    className={`mx-auto text-balance ${
                      isFinalBlank ? 'h-3' : 'mb-2'
                    } ${index >= 23 ? 'text-2xl sm:text-3xl' : 'text-2xl sm:text-4xl'} ${
                      index === 3 || index === 4 || index === 5 || index === 6
                        ? 'font-medium'
                        : 'font-light'
                    }`}
                  >
                    {line}
                  </motion.p>
                );
              })}
            </AnimatePresence>

            {activeLine ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="mx-auto inline-block min-h-[1.8rem] text-2xl font-light text-white sm:text-4xl"
              >
                {activeLine}
                <span className="ml-1 inline-block animate-pulse">|</span>
              </motion.p>
            ) : null}
          </div>

          <AnimatePresence>
            {isComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mt-10 flex justify-center"
              >
                <motion.button
                  type="button"
                  onClick={() => navigate('/final')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white/95 backdrop-blur-xl transition hover:bg-white/15"
                >
                  Continue…
                </motion.button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.section>
    </main>
  );
}
