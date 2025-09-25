'use client';

import { useInView } from 'react-intersection-observer';

import { createContext, useContext } from 'react';

type ObserverContextType = {
  ref: (node?: Element | null | undefined) => void;
  inView: boolean;
  entry: IntersectionObserverEntry | undefined;
};

// create a context
const ObserverContext = createContext({} as ObserverContextType);

export function ObserverContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-100px',
    root: null,
    fallbackInView: false,
    triggerOnce: false,
    trackVisibility: false,
    delay: 100,
  });

  return (
    <ObserverContext.Provider
      value={{
        ref,
        inView,
        entry,
      }}>
      {children}
    </ObserverContext.Provider>
  );
}

// export the custom hook
export function useObserver() {
  const context = useContext(ObserverContext);

  if (!context) {
    throw new Error(
      'useObserver must be used within an ObserverContextProvider'
    );
  }

  return context;
}
