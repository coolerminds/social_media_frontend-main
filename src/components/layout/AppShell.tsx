import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NavigationSidebar } from '../home/NavigationSidebar';

interface AppShellProps {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}

export default function AppShell({ title, right, children }: AppShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-reveal', {
        y: 16,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.05,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-100 lg:flex">
      <NavigationSidebar />

      <main className="w-full lg:flex-1 lg:border-r-4 lg:border-black lg:max-w-3xl bg-gray-100">
        <div className="border-b-4 border-black p-6 sticky top-0 bg-white z-10">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-black">{title}</h1>
        </div>
        <div className="p-6 space-y-6">{children}</div>
      </main>

      {right}
    </div>
  );
}
