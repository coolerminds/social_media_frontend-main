import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import ComposePanel from './ComposePanel';

interface PostModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PostModal({ open, onClose }: PostModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      if (backdropRef.current) {
        gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      }
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { y: 24, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
    });
    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div ref={backdropRef} className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div ref={panelRef} className="relative w-full max-w-2xl border-4 border-black bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black">
          <h2 className="text-lg font-bold uppercase tracking-tight text-black">Create Post</h2>
          <button
            type="button"
            onClick={onClose}
            className="border-2 border-black p-2 btn-dynamic"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <ComposePanel minHeight={160} />
        </div>
      </div>
    </div>
  );
}
