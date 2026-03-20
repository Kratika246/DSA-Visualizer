"use client"; // This is now a client component

import { useState } from "react";
import { Menu, X } from "lucide-react";// Adjust import path as needed
import { Sidebar, SidebarSection, SidebarItem, SidebarFolder } from '@/components/sidebar';
import {  
  ArrowUpDown, 
  GitBranch, 
  Grid3x3, 
  Layers,
  BarChart3,
  TrendingUp,
  Shuffle,
  Binary,
  GitMerge,
  Pyramid
} from 'lucide-react';
import { algos } from "@/components/input/sorting/AlgoSelector";

export function AppSidebar() {
  return (
    <Sidebar>
      {/* Sorting Section */}
      <SidebarFolder title="Sorting" defaultOpen>
        <SidebarItem href="/sorting/bubble" icon={<BarChart3 className="w-4 h-4" />}>
          Bubble Sort
        </SidebarItem>
        <SidebarItem href="/sorting/selection" icon={<TrendingUp className="w-4 h-4" />}>
          Selection Sort
        </SidebarItem>
        <SidebarItem href="/sorting/insertion" icon={<ArrowUpDown className="w-4 h-4" />}>
          Insertion Sort
        </SidebarItem>
        <SidebarItem href="/sorting/merge" icon={<GitMerge className="w-4 h-4" />}>
          Merge Sort
        </SidebarItem>
        <SidebarItem href="/sorting/quick-sort" icon={<Shuffle className="w-4 h-4" />}>
          Quick Sort
        </SidebarItem>
      </SidebarFolder>
      {/* Recursion Folder */}
      <SidebarFolder title="Recursion" icon={<GitBranch className="w-4 h-4" />} defaultOpen>
        <SidebarItem href="/recursion/fibonacci" nested>
          Fibonacci
        </SidebarItem>
        <SidebarItem href="/recursion/factorial" nested>
          Factorial
        </SidebarItem>
        <SidebarItem href="/recursion/tower-of-hanoi" nested>
          Tower of Hanoi
        </SidebarItem>
      </SidebarFolder>

      {/* Data Structures Folder */}
      <SidebarFolder title="Data Structures" icon={<Pyramid className="w-4 h-4"/> } defaultOpen>
        <SidebarItem href="/ds/binary-search-tree" nested>
          Binary Search Tree
        </SidebarItem>
        <SidebarItem href="/ds/linked-list" nested>
          Linked List
        </SidebarItem>
        <SidebarItem href="/ds/stack" nested>
          Stack
        </SidebarItem>
        <SidebarItem href="/ds/queue" nested>
          Queue
        </SidebarItem>
      </SidebarFolder>
      {/* Dynamic Programming Section */}
      <SidebarFolder title="Dynamic Programming" defaultOpen>
        <SidebarItem href="/dp/knapsack" icon={<Grid3x3 className="w-4 h-4" />}>
          Knapsack
        </SidebarItem>
        <SidebarItem href="/dp/lcs" icon={<Binary className="w-4 h-4" />}>
          Longest Common Subsequence
        </SidebarItem>
        <SidebarItem href="/dp/coin-change" icon={<Layers className="w-4 h-4" />}>
          Coin Change
        </SidebarItem>
      </SidebarFolder>
    </Sidebar>
  );
}


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-60 p-2  border border-white/10 rounded-md md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Responsive Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#0d0d0d] transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <AppSidebar />
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
        <div className=" max-w-7xl mx-auto ">
          {children}
        </div>
      </main>
    </div>
  );
}