'use client';

import { ReactNode, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

interface SidebarItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  nested?: boolean;
}

export function SidebarItem({ href, children, icon, className, nested = false }: SidebarItemProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);
 const isActive = pathname === href;
  // Auto-scroll to active item on mount
  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isActive]);

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        'group relative flex items-center gap-2 px-3 py-2 rounded-lg',
        'text-sm transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        nested && 'pl-9',
        isActive
          ? 'font-semibold shadow-sm'
          : 'font-normal',
        className
      )}
      style={{
        color: isActive ? 'rgb(147, 197, 253)' : 'rgba(156, 163, 175, 0.8)',
        backgroundColor: isActive ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
          e.currentTarget.style.color = 'rgb(226, 232, 240)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'rgba(156, 163, 175, 0.8)';
        }
      }}
    >
      {/* Active indicator */}
      {isActive && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
          style={{ backgroundColor: 'rgb(59, 130, 246)' }}
        />
      )}

      {/* Icon */}
      {icon && (
        <span
          className={cn(
            'shrink-0 transition-colors',
            isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
          )}
        >
          {icon}
        </span>
      )}

      {/* Label */}
      <span className="flex-1 truncate font-public-sans">{children}</span>

      {/* Active glow effect */}
      {isActive && (
        <span
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(59, 130, 246, 0.2)',
          }}
        />
      )}
    </Link>
  );
}