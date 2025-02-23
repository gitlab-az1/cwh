import { useRouter } from 'next/router';
import type { Dict } from 'typesdk/types';
import { useState, useEffect } from 'react';


export function useSearchParams() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState<Dict<string>>({});

  useEffect(() => {
    // Update state with initial query parameters
    setQueryParams(Object.entries(router.query).reduce((accumulator, [key, value]) => {
      const v = (Array.isArray(value) ? value.join(',') : value) as string | undefined;
      if(!v) return accumulator;

      accumulator[key] = v;
      return accumulator;
    }, {} as Dict<string>));

    // Update state on route change
    const handleRouteChange = (url: string) => {
      const queryParams = new URL(url, process.env.NEXT_PUBLIC_APP_URL).searchParams;
      const paramsObject = {} as Dict<string>;

      queryParams.forEach((value, key) => {
        paramsObject[key] = value;
      });
      
      setQueryParams(paramsObject);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
  
  const updateQueryParams = (newParams: Dict<string>) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...newParams },
    });
  };

  return { queryParams, updateQueryParams } as const;
}

export default useSearchParams;
