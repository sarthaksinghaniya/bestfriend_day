import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const moments = ['First hello', 'Shared laugh', 'Late-night talk', 'New memory'];

export default function Timeline() {
  return (
    <PageCard
      eyebrow="Step 2"
      title="A tiny timeline"
      description="Use this area for key moments, milestones, or shared memories."
    >
      <div className="mx-auto grid max-w-sm gap-3">
        {moments.map((moment, index) => (
          <div
            key={moment}
            className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-sm text-[#3b3350] shadow-sm"
          >
            <span className="mr-3 font-semibold text-[#9c77bd]">0{index + 1}</span>
            {moment}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton to="/meme-section">Next</PrimaryButton>
        <SecondaryButton to="/name-input">Back</SecondaryButton>
      </div>
    </PageCard>
  );
}
