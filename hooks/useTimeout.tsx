import type { GenericFunction } from 'typesdk/types';
import { useRef, useEffect, useCallback } from 'react';


export function useTimeout(callback: GenericFunction, delay: number): { reset: (() => void); clear: (() => void) } {
  const callbackRef = useRef<GenericFunction>(callback);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}

export default useTimeout;
