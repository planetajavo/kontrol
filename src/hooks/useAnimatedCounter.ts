// ============================================================================
// USE ANIMATED COUNTER - Animate number changes
// ============================================================================

import { useEffect, useState } from 'react';

interface UseAnimatedCounterOptions {
  duration?: number;
  decimals?: number;
  delay?: number;
}

export function useAnimatedCounter(
  target: number,
  options: UseAnimatedCounterOptions = {}
) {
  const { duration = 1000, decimals = 0, delay = 0 } = options;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const startValue = current;
      const difference = target - startValue;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const newValue = startValue + difference * easeOut;

        setCurrent(newValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrent(target);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return Number(current.toFixed(decimals));
}
