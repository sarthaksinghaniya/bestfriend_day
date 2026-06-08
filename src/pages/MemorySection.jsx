import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const memories = ['A favorite place', 'A favorite day', 'A favorite photo'];

export default function MemorySection() {
  return (
    <PageCard
      eyebrow="Step 4"
      title="Memory gallery"
      description="Short memories keep the page light while still feeling meaningful."
    >
      <div className="mx-auto grid max-w-sm gap-3">
        {memories.map((memory) => (
          <div key={memory} className="rounded-2xl border border-dashed border-[#d7c9e8] bg-white/70 px-4 py-4 text-sm text-[#4a425f]">
            {memory}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton to="/letter">Next</PrimaryButton>
        <SecondaryButton to="/meme-section">Back</SecondaryButton>
      </div>
    </PageCard>
  );
}
