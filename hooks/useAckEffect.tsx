import React, { useRef, useEffect } from 'react';
import { isThenable } from '@ts-overflow/node-framework';



export function useAckEffect(callback: () => boolean | Promise<boolean>, dependencies?: React.DependencyList): void {
  const shouldRenderAgain = useRef<boolean>(true);

  useEffect(() => {
    if(!shouldRenderAgain.current) return;
    const result = callback();

    if(isThenable(result)) {
      result.then(r => {
        shouldRenderAgain.current = typeof r === 'boolean' ? !r : false;
      });
    } else {
      shouldRenderAgain.current = typeof result === 'boolean' ? !result : false;
    }
  }, dependencies);
}

export default useAckEffect;
