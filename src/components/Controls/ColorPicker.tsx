interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between group">
      <span className="text-[13px] text-zinc-400 group-hover:text-zinc-300 transition-colors">{label}</span>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="w-7 h-7 rounded-lg border border-white/[0.1] shadow-sm cursor-pointer
              hover:scale-105 transition-transform"
            style={{ backgroundColor: value }}
          />
        </div>
        <span className="text-[11px] font-mono text-zinc-500 uppercase w-[60px]">{value}</span>
      </div>
    </div>
  );
}
