import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Card Atom - Design System Component
 * 
 * Inspiración: GitHub repository cards
 * Uso: Contenedores de contenido agrupado
 * 
 * @example
 * <Card>Contenido</Card>
 * <Card hover>Contenido con hover</Card>
 */
export const Card = ({ children, className = '', hover = false }: CardProps) => {
  return (
    <div
      className={`
        bg-gray-800 border border-gray-700 rounded-lg shadow-md
        ${hover ? 'hover:border-accent-emphasis transition-colors duration-200 cursor-pointer' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
};
