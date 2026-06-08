import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function Letter() {
  return (
    <PageCard
      eyebrow="Step 5"
      title="A short letter"
      description="A calm, centered space for the message you want to keep close."
    >
      <div className="mx-auto max-w-sm rounded-[1.75rem] bg-[#fff9ff] p-5 text-left text-sm leading-7 text-[#46395f] shadow-inner">
        Sometimes the smallest pages hold the biggest feelings.
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton to="/nickname-reveal">Reveal</PrimaryButton>
        <SecondaryButton to="/memory-section">Back</SecondaryButton>
      </div>
    </PageCard>
  );
}
