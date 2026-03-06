'use client';

import { ReactNode, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { cn } from '@/lib/cn';

interface SidebarFolderProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function SidebarFolder({
  title,
  icon,
  children,
  defaultOpen = false,
  className,
}: SidebarFolderProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn('space-y-0.5', className)}>
      <CollapsibleTrigger
        className={cn(
          'group w-full flex items-center gap-2 px-3 py-2 rounded-lg',
          'text-sm font-medium transition-all duration-150',
          'hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        )}
        style={{ color: 'rgba(156, 163, 175, 0.9)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'rgb(226, 232, 240)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(156, 163, 175, 0.9)';
        }}
      >
        {/* Chevron icon */}
        <ChevronRight
          className={cn(
            'w-4 h-4 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-90'
          )}
          style={{ color: 'rgba(156, 163, 175, 0.6)' }}
        />

        {/* Optional folder icon */}
        {icon && (
          <span className="shrink-0 opacity-70 group-hover:opacity-90 transition-opacity">
            {icon}
          </span>
        )}

        {/* Folder title */}
        <span className="flex-1 text-left truncate">{title}</span>

        {/* Item count badge (optional) */}
        <span
          className="text-xs font-mono px-1.5 py-0.5 rounded"
          style={{
            color: 'rgba(156, 163, 175, 0.6)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          }}
        >
          {/* You can pass item count as prop if needed */}
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        <div className="pt-1 space-y-0.5">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}