'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
// import necessary modules
import { createContext, useContext, useState } from 'react';

// type definition for PlanSwitchProps
type PricingContextProps = {
  isEnabled: boolean;
  onEnabled: () => void;
  plans: Pricelist[];
  pricingStep: number;
  setPricingStep: React.Dispatch<React.SetStateAction<number>>;
  onSelectPlan: (id: string) => void;
  plan: Pricelist;
  onBackwardStep: () => void;
  onSuccessOrFailureCheckout: () => void;
};

// create a context
const PricingContext = createContext({} as PricingContextProps);

// create a provider
export function PricingProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: InitialPlan[];
}) {
  // Calculate the yearly price based on initial pricing plan
  const priceList = data.map((plan) => {
    return {
      ...plan,
      price: {
        monthly: plan.price,
        yearly: plan.price * 12,
      },
    };
  });

  // state management
  const [isEnabled, setIsEnabled] = useState(false);
  const [plans, setPlans] = useState(priceList);
  const [pricingStep, setPricingStep] = useState(1);
  const [plan, setPlan] = useLocalStorage('selectedPlan', priceList[0]);

  // handle the switch toggle
  function toggleSwitch() {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      setPlans((prev) =>
        prev.map((plan) => {
          return {
            ...plan,
            price: { monthly: plan.price.monthly, yearly: plan.price.yearly },
            duration: 'yearly',
          };
        })
      );
    } else {
      setPlans((prev) =>
        prev.map((plan) => {
          return {
            ...plan,
            price: { monthly: plan.price.monthly, yearly: plan.price.yearly },
            duration: 'monthly',
          };
        })
      );
    }
  }

  // handle the plan selection
  function handlePlanSelection(id: string) {
    const selected = plans.find((plan) => plan.id === id);
    if (selected) {
      setPlan(selected);
      setPricingStep(2);
    }
  }

  // handle backward step
  function handleBackwardStep() {
    setPricingStep(1);
    setPlan(plans[0]);
  }

  // set the initial plan after checkout clear the local storage
  function setInitialPlan() {
    setPlan(priceList[0]);
  }

  // return the provider
  return (
    <PricingContext.Provider
      value={{
        isEnabled,
        onEnabled: toggleSwitch,
        plans,
        pricingStep,
        setPricingStep,
        onSelectPlan: handlePlanSelection,
        plan,
        onBackwardStep: handleBackwardStep,
        onSuccessOrFailureCheckout: setInitialPlan,
      }}>
      {children}
    </PricingContext.Provider>
  );
}

// create a custom hook
export function usePricing() {
  const context = useContext(PricingContext);

  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }

  return context;
}
