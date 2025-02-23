import React, { useState } from 'react';


export interface MultistepFormContext<T extends Record<string, string | number | (string | number)[]>> {
  readonly currentStepIndex: number;
  readonly step: React.ReactElement;
  readonly steps: readonly React.ReactElement[];
  readonly stepsCount: number;
  readonly isFirstStep: boolean;
  readonly isLastStep: boolean;
  readonly data: T;

  updateFields(fields: Partial<T>): void;
  goto(stepInedx: number): void;
  next(): void;
  prev(): void;
}


export type FormSteps<T> = readonly React.ReactElement[] | ((updateFields: (fields: Partial<T>) => void) => readonly React.ReactElement[]);

export function useMultistepForm<T extends Record<string, string | number>>(steps: FormSteps<T>): MultistepFormContext<T> {
  const [data, setData] = useState<T>({} as T);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  function updateFields(fields: Partial<T>): void {
    setData(prev => ({ ...prev, ...fields }));
  }

  if(typeof steps === 'function') {
    steps = steps(updateFields);
  }

  function goto(index: number): void {
    setCurrentStepIndex(index);
  }

  function next(): void {
    setCurrentStepIndex(index => {
      if(index > steps.length - 1) return index;
      return ++index;
    });
  }

  function prev(): void {
    setCurrentStepIndex(index => {
      if(index <= 0) return index;
      return --index;
    });
  }

  //# ----- returning -----
  const value = {
    currentStepIndex,
    step: steps[currentStepIndex],
    prev,
    next,
    goto,
    updateFields,
    data,
    stepsCount: steps.length,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    steps: Object.freeze([...steps]),
  } as const;

  return Object.freeze(value) as typeof value;
}

export default useMultistepForm;
