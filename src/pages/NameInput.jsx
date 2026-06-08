import PageCard from '../components/PageCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function NameInput() {
  return (
    <PageCard
      eyebrow="Step 1"
      title="What should we call you?"
      description="A simple starting point for the journey. You can wire this input to state later."
    >
      <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
        <input
          type="text"
          placeholder="Enter a name"
          className="w-full rounded-full border border-[#dccfed] bg-white/80 px-5 py-3 text-center text-sm text-[#2a203e] outline-none transition placeholder:text-[#9b90b2] focus:border-[#a57fd0] focus:ring-4 focus:ring-[#cba7ef]/30"
        />
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton to="/timeline">Continue</PrimaryButton>
          <SecondaryButton to="/">Back</SecondaryButton>
        </div>
      </div>
    </PageCard>
  );
}
