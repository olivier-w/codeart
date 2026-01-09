import { useId, useRef, useEffect } from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, step = 0.1, onChange }: SliderProps) {
  const id = useId();
  const sliderRef = useRef<HTMLInputElement>(null);

  // Update the track gradient based on value
  useEffect(() => {
    if (sliderRef.current) {
      const percent = ((value - min) / (max - min)) * 100;
      sliderRef.current.style.background = `linear-gradient(to right, #6366f1 ${percent}%, rgba(255,255,255,0.08) ${percent}%)`;
    }
  }, [value, min, max]);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-[13px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
          {label}
        </label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(parseFloat(e.target.value) || min)}
            className="w-14 px-1.5 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded
              text-[12px] font-mono text-zinc-300 text-right focus:outline-none focus:border-indigo-500/50
              hover:border-white/[0.1] transition-colors"
          />
        </div>
      </div>
      <input
        ref={sliderRef}
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full cursor-pointer"
      />
    </div>
  );
}
