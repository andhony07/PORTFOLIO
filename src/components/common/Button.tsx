import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    leftIcon, 
    rightIcon, 
    isLoading = false, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
      md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
      lg: 'px-6 py-3.5 text-base rounded-xl gap-2.5 font-medium'
    };

    const variantClasses = {
      primary: 'bg-cosmic-blue hover:bg-blue-600 text-white shadow-glow-blue border border-blue-400/30 hover:border-blue-400/60 active:scale-[0.98]',
      secondary: 'bg-space-surface hover:bg-space-surface/90 text-slate-light border border-white/10 hover:border-cosmic-blue/40 shadow-glass active:scale-[0.98]',
      outline: 'bg-transparent hover:bg-white/5 text-slate-light border border-white/20 hover:border-cosmic-violet/60 active:scale-[0.98]',
      ghost: 'bg-transparent hover:bg-white/5 text-slate-muted hover:text-white',
      danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 active:scale-[0.98]'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-blue/80 focus-visible:ring-offset-2 focus-visible:ring-offset-space-bg',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

