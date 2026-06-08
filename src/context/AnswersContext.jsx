import { createContext, useContext, useMemo, useState } from 'react';

const AnswersContext = createContext(null);

export function AnswersProvider({ children }) {
  const [answers, setAnswers] = useState([]);

  const addAnswer = (question, answer) => {
    setAnswers((currentAnswers) => [...currentAnswers, { question, answer }]);
  };

  const value = useMemo(
    () => ({
      answers,
      addAnswer,
    }),
    [answers],
  );

  return <AnswersContext.Provider value={value}>{children}</AnswersContext.Provider>;
}

export function useAnswers() {
  const context = useContext(AnswersContext);

  if (!context) {
    throw new Error('useAnswers must be used within an AnswersProvider');
  }

  return context;
}
