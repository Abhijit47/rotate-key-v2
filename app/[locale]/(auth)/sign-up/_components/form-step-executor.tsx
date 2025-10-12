'use client';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth-context';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';

export default function FormStepExecutor() {
  const { currentStep, setCurrentStep } = useAuthContext();

  function handlePrev() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleNext() {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }

  return (
    <div className={'absolute top-0 right-0 flex items-center gap-2 z-50'}>
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={handlePrev}
        disabled={currentStep === 0}>
        <ChevronLeftCircle className='h-4 w-4' />
      </Button>
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={handleNext}
        disabled={currentStep === 3}>
        <ChevronRightCircle className='h-4 w-4' />
      </Button>
    </div>
  );
}
