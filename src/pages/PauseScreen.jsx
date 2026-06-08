import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function PauseScreen() {
  const navigate = useNavigate();

  return (
    <PageCard
      eyebrow="Step 4"
      title="Pause for a second"
      description="Just enough time to breathe before the letter begins."
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mx-auto max-w-md rounded-[1.75rem] bg-gradient-to-r from-[#2d1946] via-[#5b3a7c] to-[#d77fb6] px-6 py-8 text-white shadow-[0_24px_60px_rgba(78,42,110,0.22)]"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/80">Pause</p>
        <p className="mt-4 text-2xl font-semibold">Take your time. I’m still here.</p>
        <p className="mt-3 text-sm leading-6 text-white/85">
          When you’re ready, the letter will be waiting in the next screen.
        </p>
      </motion.div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton onClick={() => navigate('/letter')}>Continue</PrimaryButton>
        <SecondaryButton to="/questions">Back</SecondaryButton>
      </div>
    </PageCard>
  );
}
