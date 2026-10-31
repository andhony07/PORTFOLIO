import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  subtitle,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-12 sm:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl',
        className
      )}
    >
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border border-cosmic-blue/30 bg-cosmic-blue/10 text-blue-300',
          align === 'center' && 'mx-auto'
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cosmic-blue animate-pulse" />
        {tag}
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-slate-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

