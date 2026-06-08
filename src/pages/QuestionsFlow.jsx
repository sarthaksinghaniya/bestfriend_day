import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    text: 'Do you even care about me?',
    options: ['Of course I do', "I don't know"],
  },
  {
    text: 'Do you like talking to me?',
    options: ['Yes', 'Sometimes', 'Not really'],
  },
  {
    text: 'Am I important to you?',
    options: ['Yes', 'I think so'],
  },
  {
    text: 'Do you ever miss me?',
    options: ['Yes', 'No'],
  },
  {
    text: 'Do you feel something... even a little?',
    options: ['Yes', 'Maybe', "I don't know"],
  },
];

const transitionDelay = 420;
const finalDelay = 1000;

export default function QuestionsFlow() {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = (currentQuestionIndex + 1) / questions.length;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleAnswer(option) {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setSelectedAnswer(option);
    setAnswers((currentAnswers) => [...currentAnswers, option]);

    timeoutRef.current = window.setTimeout(() => {
      if (isLastQuestion) {
        timeoutRef.current = window.setTimeout(() => {
          navigate('/pause');
        }, finalDelay);
        return;
      }

      setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
      setSelectedAnswer('');
      setIsTransitioning(false);
    }, transitionDelay);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_40%),linear-gradient(135deg,#f7f1ff_0%,#efe9f8_50%,#f7eef6_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
        <div className="absolute right-[-10%] top-[15%] h-80 w-80 rounded-full bg-pink-200/45 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[25%] h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
      </div>

      <section className="w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white/40 px-5 py-8 shadow-[0_24px_90px_rgba(86,58,126,0.16)] backdrop-blur-2xl sm:px-8 sm:py-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#8c6aa6]">
            Question Flow
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#231635] sm:text-4xl">
            One question at a time
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#5f5870] sm:text-base">
            Answer softly, then let the screen drift into the next one.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <div
            className="mb-4 h-2 w-full overflow-hidden rounded-full bg-white/70"
            aria-label="Progress"
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#8d69b2] via-[#b88ada] to-[#d77fb6]"
              initial={false}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <p className="mb-6 text-right text-xs font-medium uppercase tracking-[0.3em] text-[#9a84b5]">
            {currentQuestionIndex + 1} / {questions.length}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/75 bg-white/85 p-6 text-center shadow-[0_18px_60px_rgba(86,58,126,0.12)] sm:p-8"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-[#8c6aa6]">Prompt</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#231635] sm:text-3xl">
                {question.text}
              </h2>

              <div className="mt-8 grid gap-3">
                {question.options.map((option) => {
                  const active = isTransitioning && selectedAnswer === option;

                  return (
                    <motion.button
                      key={option}
                      type="button"
                      disabled={isTransitioning}
                      whileHover={isTransitioning ? undefined : { scale: 1.02 }}
                      whileTap={isTransitioning ? undefined : { scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                      className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                        active
                          ? 'bg-[#28173f] text-white shadow-lg shadow-violet-950/20'
                          : 'border border-[#dbcbed] bg-white/80 text-[#3a3250] hover:bg-white'
                      } disabled:cursor-wait disabled:opacity-80`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="mt-6 text-center text-xs text-[#8c7fa3]">
            Saved answers: {answers.length}
          </p>
        </div>
      </section>
    </main>
  );
}
