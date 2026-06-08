import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const memes = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80',
    caption: 'This one felt way too accurate',
    message: 'A tiny joke, but somehow it turned into a whole mood.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Low effort. High emotional damage.',
    message: 'The kind of meme that lands because it knows too much.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    caption: 'This still makes me laugh for no reason',
    message: 'The best jokes are the ones that never fully leave your head.',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80',
    caption: 'A bit unhinged, but in a cute way',
    message: 'This is the sort of chaos that makes the whole thing feel alive.',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1200&q=80',
    caption: 'Okay, this was definitely you',
    message: 'The "literally you" energy is strong with this one.',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    caption: 'I regret nothing about this meme',
    message: 'It lives rent-free now, and honestly that feels fair.',
  },
];

export default function MemeSection() {
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  const highlightedMeme = useMemo(
    () => memes.find((meme) => meme.id === highlightedId),
    [highlightedId],
  );

  function highlightRandomMeme() {
    const randomIndex = Math.floor(Math.random() * memes.length);
    setHighlightedId(memes[randomIndex].id);
  }

  return (
    <>
      <PageCard
        eyebrow="Step 3"
        title="The meme corner"
        description="Tap any meme to open a larger view, then let the captions do the rest."
      >
        <div className="mb-6 flex justify-center">
          <button
            type="button"
            onClick={highlightRandomMeme}
            className="rounded-full border border-[#dbcbed] bg-white/75 px-5 py-3 text-sm font-medium text-[#3a3250] transition hover:-translate-y-0.5 hover:bg-white"
          >
            This one is literally you 😭
          </button>
        </div>

        {highlightedMeme ? (
          <div className="mb-6 rounded-2xl border border-[#d9caed] bg-[#f7f0ff] px-4 py-3 text-sm text-[#4c3d66]">
            Highlighted meme: <span className="font-semibold">{highlightedMeme.caption}</span>
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {memes.map((meme, index) => {
            const isHighlighted = highlightedId === meme.id;

            return (
              <motion.button
                key={meme.id}
                type="button"
                onClick={() => setSelectedMeme(meme)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className={`group overflow-hidden rounded-[1.75rem] border bg-white/85 p-3 text-left shadow-[0_16px_48px_rgba(86,58,126,0.12)] transition ${
                  isHighlighted ? 'border-[#9f78c5] ring-4 ring-[#d9c1f0]/60' : 'border-white/80'
                }`}
              >
                <div className="overflow-hidden rounded-[1.35rem] bg-[#efe4fb]">
                  <motion.img
                    src={meme.image}
                    alt={meme.caption}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="px-1 pb-1 pt-4">
                  <p className="text-sm leading-6 text-[#4a3a61]">{meme.caption}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton to="/memory-section">Next</PrimaryButton>
          <SecondaryButton to="/timeline">Back</SecondaryButton>
        </div>
      </PageCard>

      <AnimatePresence>
        {selectedMeme ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#20132ddd]/70 px-4 backdrop-blur-sm"
            onClick={() => setSelectedMeme(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/70 bg-white p-4 shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="overflow-hidden rounded-[1.5rem] bg-[#eee4f8]">
                <img
                  src={selectedMeme.image}
                  alt={selectedMeme.caption}
                  className="h-80 w-full object-cover"
                />
              </div>

              <div className="px-2 pb-2 pt-5 text-center">
                <p className="text-lg font-semibold text-[#29183f]">{selectedMeme.caption}</p>
                <p className="mt-3 text-sm leading-6 text-[#5f5870]">{selectedMeme.message}</p>

                <button
                  type="button"
                  onClick={() => setSelectedMeme(null)}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#28173f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#352055]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
