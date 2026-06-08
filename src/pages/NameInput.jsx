import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageCard from '../components/PageCard';
import SecondaryButton from '../components/SecondaryButton';
import { startMusic } from '../components/AudioSystem';
import { useName } from '../context/NameContext';

export default function NameInput() {
  const navigate = useNavigate();
  const { setName } = useName();
  const [value, setValue] = useState('');

  function handleChange(event) {
    const nextValue = event.target.value;

    setValue(nextValue);

    if (nextValue.trim().length > 0) {
      startMusic();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setName(value.trim());
    navigate('/start');
  }

  return (
    <PageCard
      eyebrow="Step 1"
      title="What should we call you?"
      description="Enter your name and continue back to the Landing page with it saved globally."
    >
      <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-3">
        <motion.input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter your name..."
          className="w-full rounded-full border border-[#dccfed] bg-white/80 px-5 py-3 text-center text-sm text-[#2a203e] outline-none transition placeholder:text-[#9b90b2] focus:border-[#a57fd0] focus:ring-4 focus:ring-[#cba7ef]/30"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(199, 150, 240, 0.0)',
              '0 0 0 10px rgba(199, 150, 240, 0.08)',
              '0 0 0 0 rgba(199, 150, 240, 0.0)',
            ],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[#28173f] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#352055]"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(199, 150, 240, 0.0)',
              '0 0 24px 3px rgba(199, 150, 240, 0.28)',
              '0 0 0 0 rgba(199, 150, 240, 0.0)',
            ],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Continue
        </motion.button>

        <div className="flex justify-center">
          <SecondaryButton to="/start">Back</SecondaryButton>
        </div>
      </form>
    </PageCard>
  );
}
