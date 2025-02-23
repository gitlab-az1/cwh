import React, { type InputHTMLAttributes, forwardRef, useId, memo } from 'react';

import { cn } from '@/utils/react';


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  //
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  id,
  ...props
}, ref) => {
  const elementId = id ?? useId();

  return (
    <input
      {...props}
      aria-label={elementId}
      className={cn('drawer-ui-input-element', className)}
      id={elementId}
      ref={ref}
    />
  );
});

export default memo(Input);
