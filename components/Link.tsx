import React, { AnchorHTMLAttributes, memo } from 'react';

import { cn } from '@/utils';


export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly children?: React.ReactNode;
}

const Link = ({
  children,
  ...props
}: LinkProps) => {
  return (
    <a
      {...props}
      rel={props.rel || 'noopener noreferrer'}
      className={cn('drawer-ui-link-component', props.className)}
    >
      {children}
    </a>
  );
};

export default memo(Link);
