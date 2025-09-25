'use client';

import { createContext, useContext, useState } from 'react';

type AuthContextProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  forgotPasswordStep: number;
  setForgotPasswordStep: React.Dispatch<React.SetStateAction<number>>;
};

const initialValues: AuthContextProps = {
  currentStep: 0,
  setCurrentStep: () => undefined,
  forgotPasswordStep: 0,
  setForgotPasswordStep: () => undefined,
};

const AuthContext = createContext<AuthContextProps>(initialValues);

const { Provider } = AuthContext;

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<number>(1);

  const values = {
    currentStep,
    setCurrentStep,
    forgotPasswordStep,
    setForgotPasswordStep,
  };

  return <Provider value={values}>{children}</Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }

  return context;
}
