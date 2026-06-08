import { motion } from 'framer-motion';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const timelineItems = [
  {
    caption: 'This was random... but I remember smiling here',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    rotation: -4,
  },
  {
    caption: 'I think this mattered more than I expected',
    image:
      'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1200&q=80',
    rotation: 3,
  },
  {
    caption: 'Maybe we were just in the right place at the right time',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    rotation: -2,
  },
  {
    caption: 'This still feels a little softer when I think about it',
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80',
    rotation: 4,
  },
];

function TimelineItem({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: item.rotation - 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: item.rotation }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#b08ed4]/0 via-[#9a73bf]/60 to-[#b08ed4]/0" />

      <div className="relative flex items-start gap-5">
        <div className="relative z-10 mt-6 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_8px_rgba(224,209,242,0.45)]">
          <div className="h-2.5 w-2.5 rounded-full bg-[#8d69b2]" />
        </div>

        <motion.div
          whileHover={{ rotate: item.rotation + 1, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          className="w-full rounded-[1.75rem] border border-white/75 bg-white/85 p-4 text-left shadow-[0_18px_50px_rgba(86,58,126,0.15)] backdrop-blur-xl"
          style={{ transformOrigin: 'center 18px' }}
        >
          <div className="overflow-hidden rounded-[1.35rem] border border-[#f1e7fb] bg-[#f7f2fb] p-2 shadow-inner">
            <div className="overflow-hidden rounded-[1rem] bg-[#eadff7]">
              <img
                src={item.image}
                alt={`Timeline memory ${index + 1}`}
                className="h-72 w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#4e4562]">{item.caption}</p>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function Timeline() {
  return (
    <section className="w-full max-w-4xl rounded-[2rem] border border-white/60 bg-white/30 px-5 py-10 shadow-[0_24px_80px_rgba(86,58,126,0.16)] backdrop-blur-2xl sm:px-8 sm:py-12">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8c6aa6]">
          Timeline
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#231635] sm:text-4xl">
          Little moments, remembered softly
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#5f5870] sm:text-base">
          Scroll through a vertical line of memories that feel a little unsure, a little emotional,
          and very much real.
        </p>
      </div>

      <div className="mt-12 space-y-10 sm:mt-16">
        {timelineItems.map((item, index) => (
          <TimelineItem key={item.caption} item={item} index={index} />
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton to="/meme-section">Next</PrimaryButton>
        <SecondaryButton to="/name-input">Back</SecondaryButton>
      </div>
    </section>
  );
}
