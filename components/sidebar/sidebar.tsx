'use client';

import { ReactNode } from 'react';
import { ScrollArea, ScrollViewport, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen w-70',
        'border-r',
        'flex flex-col',
        className
      )}
      style={{
        backgroundColor: 'rgb(0, 0, 0)',
        borderColor: 'rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-4 border-b"
        style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}
      >
        <div className="flex items-center gap-2">
          <Link href='/'>
            <div className="w-full flex items-center gap-2 mt-2">
              <Image
                src="/Visualize Every Algorithm (1).png" 
                alt=""
                width={30}    
                height={26}
              />
              <p className="font-arimo text-[18px]  text-white">DSA Visualizer</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <ScrollViewport
          className="px-3 py-4"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent, white 12px, white calc(100% - 12px), transparent)',
          }}
        >
          <nav className="space-y-6">{children}</nav>
        </ScrollViewport>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {/* Footer (optional) */}
      <div
        className="px-4 py-3 border-t"
        style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}
      >
        <p
          className="text-xs font-public-sans"
          style={{ color: 'rgba(156, 163, 175, 0.5)' }}
        >
          
        </p>
      </div>
    </aside>
  );
}