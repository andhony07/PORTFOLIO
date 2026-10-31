import React from 'react';
import { cn } from '../../utils/cn';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverGlow?: boolean;
  className?: string;
  glowColor?: 'blue' | 'violet' | 'cyan' | 'none';
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  hoverGlow = false,
  className,
  glowColor = 'none',
  ...props
}) => {
  const glowClasses = {
    none: '',
    blue: 'hover:border-cosmic-blue/50 hover:shadow-glow-blue',
    violet: 'hover:border-cosmic-violet/50 hover:shadow-glow-violet',
    cyan: 'hover:border-cosmic-cyan/50 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.35)]',
  };

  return (
    <div
      className={cn(
        'glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden',
        hoverGlow && 'glass-panel-hover',
        hoverGlow && glowColor !== 'none' && glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

