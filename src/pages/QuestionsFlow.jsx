import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const prompts = [
  'What has been feeling a little heavier lately?',
  'What memory keeps replaying in the softest way?',
  'What do you wish someone noticed about you?',
];

export default function QuestionsFlow() {
  const navigate = useNavigate();

  return (
    <PageCard
      eyebrow="Step 3"
      title="Questions, gently"
      description="A short pause to sit with a few small thoughts before the next screen."
    >
      <div className="mx-auto grid max-w-lg gap-3 text-left">
        {prompts.map((prompt, index) => (
          <motion.div
            key={prompt}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="rounded-2xl border border-white/80 bg-white/75 px-4 py-4 text-sm leading-6 text-[#4a425f] shadow-sm"
          >
            <span className="mr-3 font-semibold text-[#9c77bd]">0{index + 1}</span>
            {prompt}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton onClick={() => navigate('/pause')}>Continue</PrimaryButton>
        <SecondaryButton to="/start">Back</SecondaryButton>
      </div>
    </PageCard>
  );
}
