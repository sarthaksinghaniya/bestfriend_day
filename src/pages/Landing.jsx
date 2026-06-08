import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function Landing() {
  return (
    <PageCard
      eyebrow="Welcome"
      title="A soft little space for your story"
      description="A minimal React experience for collecting names, memories, and one final reveal."
    >
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton to="/name-input">Start</PrimaryButton>
        <SecondaryButton to="/timeline">Skip ahead</SecondaryButton>
      </div>
    </PageCard>
  );
}
