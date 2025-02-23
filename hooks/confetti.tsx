import React, { useRef } from 'react';

import { cn } from '@/utils/react';


export type ConfettiAnchorProps = {
  className?: string;
}

interface ConfettiPrototype {
  explode(): void;
}

export type Confetti = [
  Anchor: React.FC<ConfettiAnchorProps>,
  confetti: ConfettiPrototype,
];


export function useConfetti(): Confetti {
  const confettiContainerRef = useRef<HTMLDivElement>(null);

  function explode() {
    if(!confettiContainerRef.current) return;
    confettiContainerRef.current.classList.add('explosion');

    confettiContainerRef.current.addEventListener('animationend', () => {
      if(!confettiContainerRef.current) return;
      confettiContainerRef.current.classList.remove('explosion');
    }, { once: true });
  }

  const Anchor = (props: ConfettiAnchorProps) => {
    return (
      <section className={cn('ConfettiContainer', props.className)}>
        <div className="anchor" />
        <div className="confetti jsxd03e61bc" ref={confettiContainerRef}>
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </section>
    );
  };


  return [
    Anchor,
    { explode },
  ];
}
