// ============================================================================
// ANIMATED BUTTON - Button with ripple effect and animations
// ============================================================================

import { motion } from 'motion/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '../ui/button';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  withRipple?: boolean;
  withGlow?: boolean;
}

export default function AnimatedButton({
  children,
  variant = 'default',
  size = 'default',
  withRipple = true,
  withGlow = false,
  className = '',
  ...props
}: AnimatedButtonProps) {
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Button
        variant={variant}
        size={size}
        className={`
          relative overflow-hidden
          ${withGlow ? 'glow-purple-md hover:glow-purple-lg transition-shadow duration-300' : ''}
          ${withRipple ? 'group' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
        
        {/* Ripple Effect */}
        {withRipple && (
          <span className="absolute inset-0 overflow-hidden">
            <span className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-active:scale-100 transition-transform duration-300 origin-center" />
          </span>
        )}
      </Button>
    </motion.div>
  );
}
