import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const defaultMemories = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    caption: 'I think this was a really good day?',
    hiddenMessage:
      'The kind of day that felt ordinary while it was happening, but keeps turning gentler in hindsight.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1200&q=80',
    caption: 'Maybe this mattered more than I said out loud',
    hiddenMessage:
      'Some moments don’t announce themselves. They just stay, quiet and warm, in the background.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=1200&q=80',
    caption: 'I still think about this one sometimes',
    hiddenMessage:
      'Not because it was huge, just because it felt like a tiny proof that things could be soft.',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    caption: 'I might be overthinking it, but it felt special',
    hiddenMessage:
      'Even if it was a small thing, it still left a mark, and maybe that’s enough.',
  },
];

function MemoryCard({ memory, onOpen }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18, rotate: memory.rotation - 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: memory.rotation }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, rotate: memory.rotation + 1 }}
      onClick={() => onOpen(memory)}
      className="group relative w-full text-left"
    >
      <div className="rounded-[1.9rem] border border-white/80 bg-white/90 p-3 shadow-[0_18px_55px_rgba(86,58,126,0.14)] transition">
        <div className="overflow-hidden rounded-[1.4rem] bg-[#eee4f7] p-2 shadow-inner">
          <div className="overflow-hidden rounded-[1.05rem] bg-[#f5eefc]">
            <img
              src={memory.image}
              alt={memory.caption}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>

        <div className="px-2 pb-1 pt-4 text-center">
          <p className="text-sm leading-6 text-[#4a425f]">{memory.caption}</p>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.32em] text-[#a18abf]">
            polaroid memory
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default function MemorySection() {
  const fileInputRef = useRef(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [memories, setMemories] = useState(() =>
    defaultMemories.map((memory, index) => ({
      ...memory,
      rotation: [-4, 3, -2, 4][index % 4],
    })),
  );

  const nextId = useMemo(() => memories.length + 1, [memories.length]);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    files.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = () => {
        const image = String(reader.result);
        const rotationOptions = [-5, -3, 2, 4];

        setMemories((current) => [
          {
            id: nextId + index,
            image,
            caption: 'I think I saved this for a reason?',
            hiddenMessage:
              'A manual upload means this memory matters enough to sit beside the others.',
            rotation: rotationOptions[(current.length + index) % rotationOptions.length],
            source: 'local-upload',
          },
          ...current,
        ]);
      };

      reader.readAsDataURL(file);
    });

    event.target.value = '';
  }

  return (
    <>
      <PageCard
        eyebrow="Step 4"
        title="Memory gallery"
        description="Polaroid cards for the moments that feel a little blurry, but still important."
      >
        <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openFilePicker}
            className="rounded-full border border-[#dbcbed] bg-white/75 px-5 py-3 text-sm font-medium text-[#3a3250] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Add a photo
          </button>
          <SecondaryButton to="/meme-section">Back to memes</SecondaryButton>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} onOpen={setSelectedMemory} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton to="/letter">Next</PrimaryButton>
        </div>
      </PageCard>

      <AnimatePresence>
        {selectedMemory ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#20132ddd]/70 px-4 backdrop-blur-sm"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/70 bg-white p-4 shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-[1.5rem] bg-[#eee4f8] p-2 shadow-inner">
                  <div className="overflow-hidden rounded-[1.1rem] bg-[#f8f3fd]">
                    <img
                      src={selectedMemory.image}
                      alt={selectedMemory.caption}
                      className="h-full min-h-[18rem] w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center px-2 py-2 text-center md:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9a7db9]">
                    hidden memory
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-[#29183f]">
                    {selectedMemory.caption}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#5f5870]">
                    {selectedMemory.hiddenMessage}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedMemory(null)}
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-[#28173f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#352055]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
