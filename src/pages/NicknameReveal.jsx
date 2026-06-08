import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const nicknames = [
  'Sunbeam',
  'Moonbeam',
  'Favorite Person',
  'Soft Chaos',
  'Tiny Wonder',
  'Heart Thief',
  'Warm Spark',
  'Moonlight',
  'Honey Bee',
  'Starlight',
];

const confettiColors = ['#f9a8d4', '#c4b5fd', '#fbcfe8', '#ddd6fe', '#fde68a', '#ffffff'];

function getRandomNickname() {
  return nicknames[Math.floor(Math.random() * nicknames.length)];
}

function buildConfettiPieces() {
  return Array.from({ length: 22 }, (_, index) => ({
    id: `${Date.now()}-${index}`,
    left: `${Math.random() * 100}%`,
    top: `${30 + Math.random() * 20}%`,
    rotate: Math.random() * 360,
    duration: 1.8 + Math.random() * 1.2,
    delay: Math.random() * 0.12,
    size: 7 + Math.random() * 7,
    color: confettiColors[index % confettiColors.length],
  }));
}

export default function NicknameReveal() {
  const captureRef = useRef(null);
  const [nickname, setNickname] = useState('');
  const [hasRevealed, setHasRevealed] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const canShareScreenshot =
    typeof navigator !== 'undefined' && 'share' in navigator && 'canShare' in navigator;

  const message = useMemo(() => {
    if (!nickname) {
      return 'Press the button when you’re ready.';
    }

    return `You are my ${nickname}`;
  }, [nickname]);

  function triggerConfetti() {
    const pieces = buildConfettiPieces();
    setConfetti(pieces);

    window.setTimeout(() => {
      setConfetti([]);
    }, 2200);
  }

  function revealNickname() {
    setNickname(getRandomNickname());
    setHasRevealed(true);
    triggerConfetti();
  }

  function generateAgain() {
    setNickname(getRandomNickname());
    setHasRevealed(true);
    triggerConfetti();
  }

  async function captureScreenshot() {
    if (!captureRef.current || isCapturing) {
      return;
    }

    setIsCapturing(true);

    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: null,
        scale: Math.min(window.devicePixelRatio || 1, 2),
        useCORS: true,
      });

      const imageUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = `nickname-reveal-${nickname || 'screenshot'}.png`;
      downloadLink.click();
    } finally {
      setIsCapturing(false);
    }
  }

  async function shareScreenshot() {
    if (!captureRef.current || !canShareScreenshot || isCapturing) {
      return;
    }

    setIsCapturing(true);

    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: null,
        scale: Math.min(window.devicePixelRatio || 1, 2),
        useCORS: true,
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

      if (!blob) {
        return;
      }

      const file = new File(
        [blob],
        `nickname-reveal-${nickname || 'screenshot'}.png`,
        { type: 'image/png' },
      );

      if (!navigator.canShare({ files: [file] })) {
        const imageUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.download = `nickname-reveal-${nickname || 'screenshot'}.png`;
        downloadLink.click();
        return;
      }

      await navigator.share({
        title: 'Nickname reveal',
        text: 'Send me a screenshot of this 👀',
        files: [file],
      });
    } finally {
      setIsCapturing(false);
    }
  }

  return (
    <section
      ref={captureRef}
      className="relative flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/60 bg-white/22 px-5 py-12 shadow-[0_24px_80px_rgba(86,58,126,0.18)] backdrop-blur-2xl sm:px-8 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(225,194,255,0.34),transparent_30%)]" />

      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.span
            key={piece.id}
            className="pointer-events-none absolute z-20 rounded-sm"
            style={{
              left: piece.left,
              top: piece.top,
              width: piece.size,
              height: piece.size * 1.25,
              backgroundColor: piece.color,
              rotate: piece.rotate,
            }}
            initial={{ opacity: 0, y: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -120, 120],
              x: [0, Math.random() * 60 - 30, Math.random() * 120 - 60],
              scale: [0.4, 1, 0.85],
              rotate: [piece.rotate, piece.rotate + 160, piece.rotate + 320],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f6ead]">
          Final step
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#231635] sm:text-4xl">
          Nickname reveal
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#5f5870] sm:text-base">
          Tap to reveal a playful nickname, then let the confetti do the dramatic part.
        </p>

        <div className="relative mx-auto mt-10 overflow-hidden rounded-[2rem] border border-white/75 bg-[#fffafc]/75 p-6 shadow-[0_18px_60px_rgba(86,58,126,0.14)] backdrop-blur-2xl sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.42),transparent_35%,rgba(255,255,255,0.16)_60%,transparent)] opacity-70" />

          <div className="relative z-10 min-h-[10rem]">
            <AnimatePresence mode="wait">
              {hasRevealed ? (
                <motion.div
                  key={nickname}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex h-full flex-col items-center justify-center"
                >
                  <p className="text-xs uppercase tracking-[0.38em] text-[#a286c0]">
                    You are my
                  </p>
                  <p className="mt-4 text-4xl font-semibold tracking-tight text-[#29183f] sm:text-5xl">
                    {nickname}
                  </p>
                  <p className="mt-5 text-sm leading-6 text-[#5f5870]">
                    Send me a screenshot of this 👀
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="reveal-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex h-full min-h-[10rem] flex-col items-center justify-center"
                >
                  <p className="text-sm leading-6 text-[#5f5870]">{message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {!hasRevealed ? (
            <motion.button
              type="button"
              onClick={revealNickname}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-[#28173f] px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(39,23,63,0.28)] transition hover:bg-[#352055]"
            >
              Reveal your nickname
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={generateAgain}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-[#28173f] px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(39,23,63,0.28)] transition hover:bg-[#352055]"
            >
              Generate again
            </motion.button>
          )}

          <SecondaryButton to="/letter">Back</SecondaryButton>
          <PrimaryButton to="/">Restart</PrimaryButton>
        </div>

        {hasRevealed ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={captureScreenshot}
              disabled={isCapturing}
              className="inline-flex items-center justify-center rounded-full border border-[#dbcbed] bg-white/75 px-6 py-3 text-sm font-medium text-[#3a3250] transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-wait disabled:opacity-60"
            >
              {isCapturing ? 'Capturing...' : 'Download screenshot'}
            </button>
            {canShareScreenshot ? (
              <button
                type="button"
                onClick={shareScreenshot}
                disabled={isCapturing}
                className="inline-flex items-center justify-center rounded-full border border-[#dbcbed] bg-white/75 px-6 py-3 text-sm font-medium text-[#3a3250] transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-wait disabled:opacity-60"
              >
                Share screenshot
              </button>
            ) : null}
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
