import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({ children, className, padding = 'md', hover = false }: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-3xl shadow-lg',
        paddingStyles[padding],
        hover && 'transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

