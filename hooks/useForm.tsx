import { toast } from 'react-toastify';
import { type FormEvent, InputHTMLAttributes, type RefObject, useRef, useState } from 'react';

import useRender from './useRender';
import type { LooseAutocomplete } from '@/@types';


export type OnSubmitCallback = (__event: FormEvent<HTMLFormElement>) => void;

export interface FormContext<T> {
  register(inputName: LooseAutocomplete<keyof T>): InputHTMLAttributes<HTMLInputElement>;
  handleSubmit(callback: (data: T) => Promise<void> | void): OnSubmitCallback;
  reset(): void;
  setValue(inputName: LooseAutocomplete<keyof T>, value: any): void;
  getValue(inputName: LooseAutocomplete<keyof T>): any;
  focusIn(inputName: LooseAutocomplete<keyof T>): boolean;
  setError(inputName: LooseAutocomplete<keyof T>, error?: string): void;
  validate(): boolean;
  readonly errors: Partial<Record<keyof T, string>>;
  readonly data: T;
  readonly formRef: RefObject<HTMLFormElement | null>;
}

export type FormInit<T> = {
  fields?: T;
  supressWarning?: boolean;
  defaultValues?: Partial<Record<keyof T, string>>;
  validations?: Partial<Record<keyof T, (value: any) => string | undefined>>;
}

export function useForm<T>(init: FormInit<T> = {}): FormContext<T> {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<Partial<Record<keyof T, HTMLInputElement>>>({});

  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [data, setData] = useState<T>( Object.fromEntries( Object.keys(init.fields || {}).map(item => [item, init.defaultValues?.[item as keyof T] || null]) ) as T);

  useRender(() => {
    if(init.defaultValues) {
      setData(prev => ({
        ...prev,
        ...init.defaultValues,
      }));
    }
  }, []);

  function reset(): void {
    formRef.current?.reset();

    setData(prev => {
      return Object.fromEntries( Object.keys(prev as object).map(item => [item, init.defaultValues?.[item as keyof T] || null]) ) as T;
    });

    setErrors({});
  }

  function setValue(inputName: LooseAutocomplete<keyof T>, value: any): void {
    setData(prev => ({ ...prev, [inputName as string]: value }));
  }

  function getValue(inputName: LooseAutocomplete<keyof T>): any {
    return data[inputName as keyof T];
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof T, string>> = {};

    if(init.validations) {
      for(const key in init.validations) {
        const validateFn = init.validations[key];
        const error = validateFn && validateFn(data[key]);

        if(error) {
          newErrors[key] = error;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function focusIn(inputName: LooseAutocomplete<keyof T>): boolean {
    const inputRef = inputRefs.current[inputName as keyof T];

    if(inputRef) {
      inputRef.focus();
      return true;
    }

    return false;
  }

  function register(inputName: LooseAutocomplete<keyof T>): InputHTMLAttributes<HTMLInputElement> {
    return {
      name: inputName as string,
      value: (data[inputName as keyof T] || '') as any,

      ref: (el: any) => {
        if(el) {
          inputRefs.current[inputName as keyof T] = el;
        }
      },

      onChange: (e: any) => {
        const { value } = e.target;

        setData(prev => ({
          ...prev,
          [inputName as keyof T]: value,
        }));

        if(init.validations && init.validations[inputName as keyof T]) {
          const error = init.validations[inputName as keyof T]?.(value);
          setErrors(prev => {
            const obj = { ...prev };
            
            if(!error) {
              delete obj[inputName as keyof T];
            } else {
              obj[inputName as keyof T] = error;
            }

            return obj;
          });
        }
      },
    } as any;
  }

  function setError(inputName: LooseAutocomplete<keyof T>, error?: string): void {
    setErrors(prev => {
      const obj = { ...prev };

      if(!error) {
        delete obj[inputName as keyof T];
      } else {
        obj[inputName as keyof T] = error;
      }

      return obj;
    });
  }

  function handleSubmit(callback: (data: T) => Promise<void> | void): OnSubmitCallback {
    return async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if(validate()) {
        await callback(data);
      } else if(init.supressWarning !== false) {
        toast.warn('Algum dado não está correto');
      }
    };
  }

  return Object.freeze({
    register,
    handleSubmit,
    reset,
    setValue,
    getValue,
    validate,
    focusIn,
    setError,
    data,
    errors,
    formRef,
  });
}

export default useForm;
