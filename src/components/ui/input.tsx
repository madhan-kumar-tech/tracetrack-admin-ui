import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, icon, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-jost text-base font-semibold text-[#333333]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'h-14 w-full rounded-md border-none bg-[#F6F7F9] px-4 py-2 text-base text-[#686973] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A60D4F] focus:bg-white transition',
              icon ? 'pr-12' : '',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {icon && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center">
              {icon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
