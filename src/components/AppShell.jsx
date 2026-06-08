import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const steps = [
  { label: 'NameInput', path: '/' },
  { label: 'Landing', path: '/start' },
  { label: 'QuestionsFlow', path: '/questions' },
  { label: 'PauseScreen', path: '/pause' },
  { label: 'Letter', path: '/letter' },
  { label: 'NicknameReveal', path: '/final' },
];

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const showNav = location.pathname !== '/';

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
        <div className="absolute right-[-8%] top-[10%] h-80 w-80 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[20%] h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col gap-5">
        {showNav ? (
          <nav className="mx-auto flex w-full flex-wrap justify-center gap-2 rounded-full border border-white/60 bg-white/45 px-3 py-3 shadow-[0_18px_60px_rgba(106,74,160,0.12)] backdrop-blur-xl">
            {steps.map((step) => {
              const active = location.pathname === step.path;

              return (
                <button
                  key={step.path}
                  type="button"
                  onClick={() => navigate(step.path)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-[#29183f] text-white shadow-lg shadow-violet-950/20'
                      : 'text-[#4e4562] hover:bg-white/70'
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </nav>
        ) : null}

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex flex-1 items-center justify-center"
        >
          <Outlet />
        </motion.section>
      </div>
    </main>
  );
}
