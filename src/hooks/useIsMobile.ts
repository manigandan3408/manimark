import { useEffect, useState } from 'react';

/**
 * Detects mobile/tablet-class devices so expensive visual effects
 * (WebGL scenes, backdrop-filter blur, large animated glows) can be
 * skipped or replaced with lightweight alternatives.
 *
 * Combines a viewport width check with a coarse-pointer / no-hover
 * media query, since some tablets are wide but still touch-only and
 * benefit from the lighter experience.
 */
export function useIsMobile(breakpointPx = 768): boolean {
  const getIsMobile = () => {
    if (typeof window === 'undefined') return false;
    const narrow = window.innerWidth < breakpointPx;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;
    return narrow || (coarsePointer && noHover);
  };

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const widthQuery = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const hoverQuery = window.matchMedia('(hover: none)');

    const update = () => setIsMobile(getIsMobile());

    update();

    widthQuery.addEventListener('change', update);
    pointerQuery.addEventListener('change', update);
    hoverQuery.addEventListener('change', update);

    return () => {
      widthQuery.removeEventListener('change', update);
      pointerQuery.removeEventListener('change', update);
      hoverQuery.removeEventListener('change', update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpointPx]);

  return isMobile;
}
