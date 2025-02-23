import React, { useEffect, useState } from 'react';


export function useScrollTrigger(node?: React.RefObject<HTMLElement>, threshold: number = 10): [boolean, number] {
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    const e = (node?.current ?? document.body) as HTMLElement;

    const fn = () => {
      setTrigger(e.scrollTop > threshold);
    };

    e.addEventListener('scroll', fn);

    return () => {
      e.removeEventListener('scroll', fn);
    };
  }, []);

  return [trigger, threshold];
}

export default useScrollTrigger;
