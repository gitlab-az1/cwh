import { useEffect, useState } from 'react';


export function useCountdown(initialTime: number, onTimeEnd?: (() => void | Promise<void>), interval?: number): number {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    const i = setInterval(() => {
      setTime(prev => prev - (interval ?? 1000));
    }, (interval ?? 1000));

    if(time === 0) {
      onTimeEnd?.();
    }

    return () => {
      clearInterval(i);
    };
  }, [time]);

  return time;
}

export default useCountdown;
