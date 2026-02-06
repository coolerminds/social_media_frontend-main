import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';

interface ComposePanelProps {
  minHeight?: number;
  uppercase?: boolean;
}

const emojiSet = ['😀', '😎', '🤩', '🎉', '🔥', '🚀', '💡', '✨', '🌈', '💖', '🦄', '🍀'];
const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function ComposePanel({ minHeight = 160, uppercase = false }: ComposePanelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<
    {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      decay: number;
      color: string;
      size: number;
    }[]
  >([]);
  const rafRef = useRef<number | null>(null);
  const [activeTool, setActiveTool] = useState<'image' | 'emoji' | 'calendar' | 'location' | null>(null);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [location, setLocation] = useState('');

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
  const locationSuggestions = ['Downtown Studio', 'City Park', 'Design Hub', 'Remote'];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);

    const render = () => {
      const ctx = context;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.vy += 0.03;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const toggleTool = (tool: 'image' | 'emoji' | 'calendar' | 'location') => {
    setActiveTool((prev) => (prev === tool ? null : tool));
  };

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFiles(Array.from(event.target.files));
  };

  const addEmoji = (emoji: string) => {
    setContent((prev) => `${prev}${emoji}`);
  };

  const triggerFireworks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bursts = 10;
    for (let b = 0; b < bursts; b += 1) {
      const cx = canvas.width * (0.2 + Math.random() * 0.6);
      const cy = canvas.height * (0.2 + Math.random() * 0.5);
      const count = 18 + Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = 1.2 + Math.random() * 2.2;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.015 + Math.random() * 0.02,
          color: `hsl(${Math.random() * 360}, 90%, 60%)`,
          size: 7 + Math.random() * 2,
        });
      }
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />
      <div className="relative z-10 flex gap-4">
        <div className="w-14 h-14 bg-gray-300 border-2 border-black flex-shrink-0" />
        <div className="flex-1">
          <textarea
            placeholder="WHAT'S HAPPENING?"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className={`w-full text-base resize-none border-2 border-gray-400 outline-none placeholder-gray-500 p-4 font-medium ${
              uppercase ? 'uppercase' : ''
            }`}
            style={{ minHeight }}
          />

          {activeTool && (
            <div className="mt-4 border-2 border-gray-300 bg-gray-50 p-4">
              {activeTool === 'image' && (
                <div className="space-y-3">
                  <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 bg-white px-4 py-6 text-xs font-bold uppercase text-gray-500 cursor-pointer">
                    <span>Drop images here or click to upload</span>
                    <input type="file" multiple className="hidden" onChange={handleFiles} />
                  </label>
                  {files.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {files.map((file) => (
                        <div
                          key={file.name}
                          className="border-2 border-black bg-white p-2 text-xs font-bold uppercase text-gray-600"
                        >
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            {activeTool === 'emoji' && (
              <div className="grid grid-cols-6 gap-2">
                {emojiSet.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="border-2 border-black bg-white p-2 text-lg btn-dynamic"
                    aria-label={`Add ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {activeTool === 'calendar' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase text-gray-600">October 2026</span>
                  <span className="text-xs uppercase text-gray-400">Pick a date</span>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-2 text-xs font-bold uppercase text-gray-500">
                  {dayLabels.map((label) => (
                    <div key={label} className="text-center">
                      {label}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`border-2 text-xs font-bold uppercase px-2 py-2 btn-dynamic ${
                        selectedDate === day ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTool === 'location' && (
              <div className="space-y-3">
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Search location"
                  className="w-full border-2 border-gray-400 px-3 py-2 text-sm font-medium focus:outline-none focus:border-black"
                />
                <div className="grid gap-2">
                  {locationSuggestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setLocation(item)}
                      className="border-2 border-black bg-white px-3 py-2 text-xs font-bold uppercase text-black btn-dynamic text-left"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

          <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-gray-300">
            <div className="flex gap-2">
              <button
                type="button"
                className={`p-2 border-2 btn-dynamic ${
                  activeTool === 'image' ? 'bg-black text-white border-black' : 'bg-white text-black border-black'
                }`}
                aria-label="Add image"
                aria-pressed={activeTool === 'image'}
                onClick={() => toggleTool('image')}
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                type="button"
                className={`p-2 border-2 btn-dynamic ${
                  activeTool === 'emoji' ? 'bg-black text-white border-black' : 'bg-white text-black border-black'
                }`}
                aria-label="Add emoji"
                aria-pressed={activeTool === 'emoji'}
                onClick={() => toggleTool('emoji')}
              >
                <Smile className="w-5 h-5" />
              </button>
              <button
                type="button"
                className={`p-2 border-2 btn-dynamic ${
                  activeTool === 'calendar' ? 'bg-black text-white border-black' : 'bg-white text-black border-black'
                }`}
                aria-label="Schedule"
                aria-pressed={activeTool === 'calendar'}
                onClick={() => toggleTool('calendar')}
              >
                <Calendar className="w-5 h-5" />
              </button>
              <button
                type="button"
                className={`p-2 border-2 btn-dynamic ${
                  activeTool === 'location' ? 'bg-black text-white border-black' : 'bg-white text-black border-black'
                }`}
                aria-label="Add location"
                aria-pressed={activeTool === 'location'}
                onClick={() => toggleTool('location')}
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={triggerFireworks}
              className="bg-red-600 text-white px-8 py-3 border-4 border-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase text-sm tracking-tight btn-dynamic"
            >
              POST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
