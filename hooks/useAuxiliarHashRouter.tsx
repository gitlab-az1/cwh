import type { Dict } from 'typesdk/types';
import { useEffect, useState } from 'react';


export interface AuxiliarHashRouter {
  readonly route: string;
  readonly params: Dict<string>;

  setRoute(route: string): void;
  setParam(key: string, value?: string): void;
}


export type UseAuxiliarHashRouterOptions = {
  hashParamsSeparator?: string;
}

export function useAuxiliarHashRouter(options?: UseAuxiliarHashRouterOptions): AuxiliarHashRouter {
  const separator = options?.hashParamsSeparator ?? ',';

  const [currentRoute, setCurrentRoute] = useState<string>('');
  const [hashParams, setHashParams] = useState<Dict<string>>({});

  useEffect(() => {
    const fn = () => {
      if(!window.location.hash.startsWith('#!')) return;

      const route = window.location.hash.split('?')[0].replaceAll('#!', '');
      setCurrentRoute(route);

      if(!window.location.hash.includes('?')) return;

      const searchParams = new URLSearchParams(window.location.hash.split('?')[1].replaceAll(separator, '&'));
      const params = {} as Dict<string>;

      for(const [key, value] of searchParams.entries()) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }

      setHashParams(params);
    };

    
    window.addEventListener('hashchange', fn);

    return () => {
      window.removeEventListener('hashchange', fn);
    };
  }, []);


  const setParam = (key: string, value?: string) => {
    if(!window.location.hash.includes('?')) return void (window.location.hash = `#!${currentRoute}?${encodeURIComponent(key)}=${encodeURIComponent(value ?? '1')}`);
    const searchParams = new URLSearchParams(window.location.hash.split('?')[1]);
    
    if(!value) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }

    let np = searchParams.toString().replaceAll('&', separator);

    if(np.length > 0 && np.charAt(0) !== '?') {
      np = `?${np}`;
    }

    window.location.hash = `#!${currentRoute}${np}`;

    if(!searchParams.has(key)) {
      const newParams = { ...hashParams };
      delete newParams[key];

      setHashParams(newParams);
    } else {
      setHashParams({
        ...hashParams,
        [key]: value ?? '1',
      });
    }
  };

  const setRoute = (route: string) => {
    route = route.replaceAll('#!', '');

    if(route.charAt(0) !== '/') {
      route = `/${route}`;
    }

    if(!window.location.hash.includes('?')) return void (window.location.hash = `#!${route}`);

    const searchParams = window.location.hash.split('?')[1];
    window.location.hash = `#!${route}?${searchParams}`;
  };


  return {
    route: currentRoute,
    params: hashParams,
    setRoute,
    setParam,
  } as const;
}

export default useAuxiliarHashRouter;
