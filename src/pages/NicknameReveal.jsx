import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function NicknameReveal() {
  return (
    <PageCard
      eyebrow="Final step"
      title="Nickname reveal"
      description="End with a soft reveal that feels playful and personal."
    >
      <div className="mx-auto max-w-sm rounded-[2rem] bg-gradient-to-r from-[#2d1946] via-[#5b3a7c] to-[#d77fb6] px-6 py-8 text-white shadow-[0_24px_60px_rgba(78,42,110,0.22)]">
        <p className="text-xs uppercase tracking-[0.3em] text-white/80">Your nickname is</p>
        <p className="mt-4 text-3xl font-semibold">Best Friend</p>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryButton to="/">Restart</PrimaryButton>
        <SecondaryButton to="/letter">Back</SecondaryButton>
      </div>
    </PageCard>
  );
}
