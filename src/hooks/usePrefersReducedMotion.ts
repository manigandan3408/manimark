import { useEffect, useState } from 'react';

/** Tracks the user's OS-level prefers-reduced-motion setting. */
export function usePrefersReducedMotion(): boolean {
  const query = '(prefers-reduced-motion: reduce)';
  const getPreference = () =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false;

  const [prefersReduced, setPrefersReduced] = useState(getPreference);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setPrefersReduced(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return prefersReduced;
}
