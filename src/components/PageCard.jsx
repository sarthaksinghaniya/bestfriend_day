export default function PageCard({ eyebrow, title, description, children }) {
  return (
    <section className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/60 p-6 text-center shadow-[0_18px_60px_rgba(86,58,126,0.14)] backdrop-blur-2xl sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8c6aa6]">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#231635] sm:text-4xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#5f5870] sm:text-base">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </section>
  );
}
