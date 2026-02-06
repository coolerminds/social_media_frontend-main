import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Image, Smile, Calendar, MapPin } from 'lucide-react';

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
          <div className="flex gap-4">
            <div className="w-14 h-14 bg-gray-300 border-2 border-black flex-shrink-0" />
            <textarea
              placeholder="WHAT'S HAPPENING?"
              className="w-full text-base resize-none border-2 border-gray-400 outline-none placeholder-gray-500 min-h-[160px] p-4 font-medium"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t-2 border-gray-300">
            <div className="flex gap-2">
              <button className="p-2 border-2 border-black bg-white text-black btn-dynamic" aria-label="Add image">
                <Image className="w-5 h-5" />
              </button>
              <button className="p-2 border-2 border-black bg-white text-black btn-dynamic" aria-label="Add emoji">
                <Smile className="w-5 h-5" />
              </button>
              <button className="p-2 border-2 border-black bg-white text-black btn-dynamic" aria-label="Schedule">
                <Calendar className="w-5 h-5" />
              </button>
              <button className="p-2 border-2 border-black bg-white text-black btn-dynamic" aria-label="Add location">
                <MapPin className="w-5 h-5" />
              </button>
            </div>

            <button className="bg-red-600 text-white px-8 py-3 border-4 border-red-600 font-bold uppercase text-sm tracking-tight btn-dynamic">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
