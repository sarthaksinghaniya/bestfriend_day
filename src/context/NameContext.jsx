import { createContext, useContext, useMemo, useState } from 'react';

const NameContext = createContext(null);

export function NameProvider({ children }) {
  const [name, setName] = useState('');

  const value = useMemo(
    () => ({
      name,
      setName,
    }),
    [name],
  );

  return <NameContext.Provider value={value}>{children}</NameContext.Provider>;
}

export function useName() {
  const context = useContext(NameContext);

  if (!context) {
    throw new Error('useName must be used within a NameProvider');
  }

  return context;
}
