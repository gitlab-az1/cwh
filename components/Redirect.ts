import React from 'react';
import { useRouter } from 'next/router';

import { useRender } from '@/hooks';


export type RedirectOptions = string | {
  href: string;
  next?: never;
  forceNavigate?: boolean;
}

export function Redirect(options: RedirectOptions): React.FC {
  return (function() {
    const { push: navigate } = useRouter();

    useRender(() => {
      if(typeof options !== 'string' && !options.href) {
        throw new Error('[Redirect] no location was provided');
      }

      if(typeof options === 'string') return navigate(options);
      if(options.forceNavigate !== true) return navigate(options.href);

      window.location.href = options.href;
    }, []);

    return null;
  });
}
