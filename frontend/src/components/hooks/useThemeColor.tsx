import { useEffect, useState } from 'react';

/**
 * Hook to get the current primary color from CSS variables
 * Updates when theme changes
 */
export function useThemeColor() {
  const [primaryColor, setPrimaryColor] = useState('#F97316');

  useEffect(() => {
    const updateColor = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      const color = computedStyle.getPropertyValue('--primary').trim();
      
      // Convert CSS var to hex if needed
      if (color.startsWith('#')) {
        setPrimaryColor(color);
      } else if (color.startsWith('rgb')) {
        // Convert rgb to hex
        const match = color.match(/\d+/g);
        if (match && match.length >= 3) {
          const hex = '#' + match.slice(0, 3).map(x => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          }).join('');
          setPrimaryColor(hex);
        }
      }
    };

    updateColor();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class')) {
          updateColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    });

    return () => observer.disconnect();
  }, []);

  return primaryColor;
}
