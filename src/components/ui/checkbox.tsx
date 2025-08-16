import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex items-center space-x-2">
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
            className
          )}
          {...props}
        />
        {label && (
          <label htmlFor={inputId} className="text-sm text-gray-700 select-none">
            {label}
          </label>
        )}
        {error && (
          <span className="ml-2 text-xs text-red-600">{error}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
