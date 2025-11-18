import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-lg font-semibold text-text mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-6 py-4 text-2xl text-center border-4 border-primary rounded-2xl',
            'focus:outline-none focus:ring-4 focus:ring-primary/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200',
            error && 'border-error focus:ring-error/50',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-error text-sm font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

