'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {title && (
        <div className="px-3 mb-2">
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(156, 163, 175, 0.6)' }}
          >
            {title}
          </h3>
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}