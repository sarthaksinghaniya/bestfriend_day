import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const memes = ['Inside joke one', 'Inside joke two', 'Inside joke three'];

export default function MemeSection() {
  return (
    <PageCard
      eyebrow="Step 3"
      title="The meme corner"
      description="A clean place for the running jokes that make everything feel personal."
    >
      <div className="mx-auto grid max-w-sm gap-3">
        {memes.map((meme) => (
          <div key={meme} className="rounded-2xl bg-[#f6efff] px-4 py-4 text-sm text-[#4a3a61]">
            {meme}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton to="/memory-section">Next</PrimaryButton>
        <SecondaryButton to="/timeline">Back</SecondaryButton>
      </div>
    </PageCard>
  );
}
