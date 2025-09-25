'use client';

// import necessary dependencies
import { createContext, useContext, useState } from 'react';

// type definition
type AddPropertyContextType = {
  currentStepIndex: number;
  stepPercentage: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNextStep: () => void;
  onBackStep: () => void;
  onGoToStep: (index: number) => void;
};

// create a context
export const AddPropertyContext = createContext({} as AddPropertyContextType);

// create a provider
export function AddPropertyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const totalSteps = 8;

  // define state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(5);

  // calculated step percentage for progress bar 25%, 50%, 75%, 100%
  const stepPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  function nextStep() {
    setCurrentStepIndex((i) => {
      if (i >= totalSteps - 1) return i;
      return i + 1;
    });
  }

  function backStep() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goToStep(index: number) {
    setCurrentStepIndex(index);
  }

  // return the provider
  return (
    <AddPropertyContext.Provider
      value={{
        currentStepIndex,
        stepPercentage,
        totalSteps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === totalSteps - 1,
        onNextStep: nextStep,
        onBackStep: backStep,
        onGoToStep: goToStep,
      }}>
      {children}
    </AddPropertyContext.Provider>
  );
}

// create a custom hook
export function useAddPropertyContext() {
  const context = useContext(AddPropertyContext);

  if (!context) {
    throw new Error(
      'useAddPropertyContext must be used within AddPropertyContextProvider'
    );
  }

  return context;
}
