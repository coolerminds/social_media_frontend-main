import React, { useEffect, useRef } from 'react';

const PIXEL_SIZE = 11;
const FADE_STEP = 0.02;

interface TrailPoint {
  x: number;
  y: number;
  life: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const tickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setSize();
    window.addEventListener('resize', setSize);

    const handleMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      pointsRef.current.push({ x: event.clientX, y: event.clientY, life: 1 });
    };

    window.addEventListener('mousemove', handleMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      tickRef.current = (tickRef.current + 2) % 360;

      const points = pointsRef.current;
      for (let i = 0; i < points.length; i += 1) {
        const point = points[i];
        const size = PIXEL_SIZE * point.life + 2;
        const hue = (i * 25 + tickRef.current) % 360;
        ctx.globalAlpha = point.life;
        ctx.fillStyle = `hsl(${hue}, 90%, 60%)`;
        ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
        point.life -= FADE_STEP;
      }

      pointsRef.current = points.filter((point) => point.life > 0);
      ctx.globalAlpha = 1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="cursor-canvas" />
      <div ref={cursorRef} className="unicorn-cursor" />
    </div>
  );
}
