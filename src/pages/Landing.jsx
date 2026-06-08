import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useName } from '../context/NameContext';

export default function Landing() {
  const { name } = useName();

  return (
    <PageCard
      eyebrow="Welcome"
      title={name ? `Welcome, ${name}` : 'A soft little space for your story'}
      description={
        name
          ? 'Your name is saved globally and ready for the rest of the journey.'
          : 'A minimal React experience for collecting names, memories, and one final reveal.'
      }
    >
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton to="/name-input">Start</PrimaryButton>
        <SecondaryButton to="/timeline">Skip ahead</SecondaryButton>
      </div>
    </PageCard>
  );
}
