"use client";

import { Code2, Workflow, Zap, Palette } from 'lucide-react';

const TechCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div
      className="group relative h-45 w-50 overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] max-md:w-full"
      style={{
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
      }}
    >
      {/* Hover gradient effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.08), transparent 40%)',
        }}
      />

      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="text-white opacity-70 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'rgba(156, 163, 175, 0.8)' }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(59, 130, 246, 0.2)',
        }}
      />
    </div>
  );
};

export default function Page4() {
  const techStack = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Next.js 16',
      description: 'React framework with server components',
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: 'React Flow',
      description: 'Node-based graph library',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Animations',
      description: 'Smooth transitions with Framer Motion',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'TailwindCSS',
      description: 'Modern, responsive styling',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#161616] px-16 pt-36 flex gap-2 justify-between max-lg:flex-col max-lg:px-6 max-lg:pt-24 max-lg:gap-12 max-lg:overflow-hidden">
      {/* Badge */}
      <div className="max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center w-full lg:w-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 max-lg:mb-6"
            style={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
        >
            <span className="text-white text-sm font-medium">Tech Stack</span>
        </div>

        {/* Heading */}
        <h1 className="text-white text-6xl font-bold mb-4 max-w-xl -tracking-widest leading-tight max-lg:text-4xl max-lg:max-w-full">
            Built with Next.js 16 and TypeScript
        </h1>

        {/* Subheading */}
        <p
            className="text-lg mb-16 max-w-lg max-lg:mb-12 max-lg:max-w-full"
            style={{ color: 'rgba(156, 163, 175, 0.8)' }}
        >
            Using React Flow for the graph visualization, and Framer Motion for smooth animations.
        </p>
      </div>
      {/* Tech Cards Grid */}
      <div className="grid grid-cols-2 gap-x-6 max-w-3xl gap-y-3 pb-24 max-md:grid-cols-1 w-full lg:w-auto max-lg:gap-y-4 max-lg:pb-16 max-lg:mx-auto lg:mx-0">
        {techStack.map((tech, index) => (
          <TechCard
            key={index}
            icon={tech.icon}
            title={tech.title}
            description={tech.description}
          />
        ))}
      </div>
    </div>
  );
}