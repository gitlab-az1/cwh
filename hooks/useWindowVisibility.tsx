import { useState, useEffect } from 'react';
import { ssrSafeDocument } from 'typesdk/ssr';


export function useWindowVisibility() {
  const [isVisible, setIsVisible] = useState(ssrSafeDocument?.hidden ?? false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

export default useWindowVisibility;
