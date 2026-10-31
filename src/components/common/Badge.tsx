import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'violet' | 'emerald' | 'amber' | 'cyan' | 'slate';
  status?: 'completed' | 'in-progress' | 'planned' | 'submitted' | 'participated' | 'participant';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  status,
  size = 'md',
  className,
  dot = false,
}) => {
  // Determine variant automatically from status if provided
  let effectiveVariant = variant || 'default';
  let dotColor = 'bg-slate-muted';

  if (status) {
    switch (status) {
      case 'completed':
        effectiveVariant = 'emerald';
        dotColor = 'bg-emerald-400';
        break;
      case 'in-progress':
        effectiveVariant = 'cyan';
        dotColor = 'bg-cyan-400 animate-pulse';
        break;
      case 'planned':
        effectiveVariant = 'amber';
        dotColor = 'bg-amber-400';
        break;
      case 'submitted':
        effectiveVariant = 'blue';
        dotColor = 'bg-blue-400';
        break;
      case 'participated':
      case 'participant':
        effectiveVariant = 'violet';
        dotColor = 'bg-purple-400';
        break;
    }
  }

  const variantStyles = {
    default: 'bg-white/5 text-slate-muted border-white/10',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    violet: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    slate: 'bg-slate-800/60 text-slate-300 border-slate-700/50',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border tracking-wide uppercase font-mono',
        variantStyles[effectiveVariant],
        sizeStyles[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColor)} />}
      {children}
    </span>
  );
};

