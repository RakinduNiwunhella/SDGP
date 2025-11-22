import React from 'react';
import useInView from '../hooks/useInView';

export default function Reveal({ children, className = '', threshold = 0.35, delay = 0 }) {
  const [ref, inView] = useInView({ threshold });

  // GPU-accelerated transform and restricted transition targets for smoothness.
  const base = 'will-change-transform transform-gpu';
  const hidden = 'opacity-0';
  const visible = 'opacity-100';

  const transitionStyle = {
    transitionProperty: 'opacity, transform',
    // Slightly slower duration and gentler easing for a smoother feel
    transitionTimingFunction: 'cubic-bezier(0.22, 0.8, 0.18, 1)',
    transitionDuration: '800ms',
    ...(delay ? { transitionDelay: `${delay}ms` } : {}),
    // Move a bit farther so the motion is more noticeable but still smooth
    transform: inView ? 'translate3d(0,0,0) scale3d(1,1,1)' : 'translate3d(0,24px,0) scale3d(0.995,0.995,1)',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d'
  };

  return (
    <div
      ref={ref}
      className={`${base} ${className} ${inView ? visible : hidden}`}
      style={transitionStyle}
      aria-hidden={!inView && undefined}
    >
      {children}
    </div>
  );
}