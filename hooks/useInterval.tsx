import { useRef } from 'react';
import type { GenericFunction } from 'typesdk/types';

import useRender from './useRender';


export interface Interval {

  /**
   * Reset the function calls
   */
  reset(): void;

  /**
   * Stop the function calls
   */
  stop(): void;

  /**
   * Get the current interval in milliseconds
   */
  readonly interval: number;
}

export function useInterval(callback: GenericFunction, interval: number, ...args: any[]): Interval {
  const nodeIdRef = useRef<NodeJS.Timer | NodeJS.Timeout>(null);

  function _stop() {
    if(nodeIdRef.current) {
      clearInterval(nodeIdRef.current as any);
    }
  }

  function _reset() {
    if(nodeIdRef.current) {
      _stop();
      (nodeIdRef as { current: unknown }).current = setInterval(callback, interval, args);
    }
  }

  useRender(() => {
    (nodeIdRef as { current: unknown }).current = setInterval(callback, interval, args);
  }, []);

  return {
    get stop() {
      return _stop;
    },

    get reset() {
      return _reset;
    },

    get interval() {
      return interval;
    },
  };
}

export default useInterval;
