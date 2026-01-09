import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Slider } from './Slider';
import { ColorPicker } from './ColorPicker';
import { Select } from './Select';
import { PresetBrowser } from './PresetBrowser';

function Section({
  title,
  icon,
  children,
  defaultOpen = true
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/[0.04]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md bg-white/[0.04] flex items-center justify-center text-zinc-500">
            {icon}
          </div>
          <span className="text-[13px] font-medium text-zinc-300">{title}</span>
        </div>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 flex flex-col gap-4 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export function ControlPanel() {
  const params = useStore((state) => state.params);
  const setGridParams = useStore((state) => state.setGridParams);
  const setBlockParams = useStore((state) => state.setBlockParams);
  const setColorParams = useStore((state) => state.setColorParams);
  const setSceneParams = useStore((state) => state.setSceneParams);

  return (
    <div className="w-80 shrink-0 h-full bg-[#0c0c0e] border-l border-white/[0.04] overflow-y-auto">
      {/* Panel header */}
      <div className="sticky top-0 z-10 bg-[#0c0c0e]/90 backdrop-blur-sm border-b border-white/[0.04] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Parameters</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-zinc-500">Live</span>
          </div>
        </div>
      </div>

      {/* Presets */}
      <Section
        title="Presets"
        icon={<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
      >
        <PresetBrowser />
      </Section>

      {/* Grid */}
      <Section
        title="Grid"
        icon={<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
      >
        <Slider label="Rows" value={params.grid.rows} min={5} max={50} step={1} onChange={(v) => setGridParams({ rows: Math.round(v) })} />
        <Slider label="Columns" value={params.grid.cols} min={5} max={50} step={1} onChange={(v) => setGridParams({ cols: Math.round(v) })} />
        <Slider label="Spacing" value={params.grid.spacing} min={0} max={1} step={0.05} onChange={(v) => setGridParams({ spacing: v })} />
      </Section>

      {/* Blocks */}
      <Section
        title="Blocks"
        icon={<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
      >
        <Slider label="Min Height" value={params.blocks.minHeight} min={0.1} max={2} step={0.1} onChange={(v) => setBlockParams({ minHeight: v })} />
        <Slider label="Max Height" value={params.blocks.maxHeight} min={0.5} max={5} step={0.1} onChange={(v) => setBlockParams({ maxHeight: v })} />
        <Slider label="Width" value={params.blocks.width} min={0.2} max={2} step={0.1} onChange={(v) => setBlockParams({ width: v })} />
        <Slider label="Depth" value={params.blocks.depth} min={0.2} max={2} step={0.1} onChange={(v) => setBlockParams({ depth: v })} />
        <Select
          label="Pattern"
          value={params.blocks.heightAlgorithm}
          options={[
            { value: 'random', label: 'Random' },
            { value: 'perlin', label: 'Perlin Noise' },
            { value: 'sine', label: 'Sine Wave' },
            { value: 'wave', label: 'Radial Wave' },
          ]}
          onChange={(v) => setBlockParams({ heightAlgorithm: v })}
        />
      </Section>

      {/* Scene */}
      <Section
        title="Scene"
        icon={<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
      >
        <Slider label="Density" value={params.scene?.density ?? 0.4} min={0.1} max={1} step={0.05} onChange={(v) => setSceneParams({ density: v })} />
        <Slider label="Grid Lines" value={params.scene?.gridLines ?? 0.4} min={0} max={1} step={0.05} onChange={(v) => setSceneParams({ gridLines: v })} />
        <Slider label="Dots" value={params.scene?.dots ?? 0.15} min={0} max={0.5} step={0.05} onChange={(v) => setSceneParams({ dots: v })} />
        <Slider label="Elevated Bars" value={params.scene?.elevatedBars ?? 0.2} min={0} max={0.5} step={0.05} onChange={(v) => setSceneParams({ elevatedBars: v })} />
      </Section>

      {/* Colors */}
      <Section
        title="Colors"
        icon={<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
      >
        <Select
          label="Shading"
          value={params.colors.shadingStyle ?? 'standard'}
          options={[
            { value: 'standard', label: 'Standard' },
            { value: 'isometric', label: 'Isometric' },
          ]}
          onChange={(v) => setColorParams({ shadingStyle: v as 'standard' | 'isometric' })}
        />
        <ColorPicker label="Background" value={params.colors.background} onChange={(v) => setColorParams({ background: v })} />
        <ColorPicker label="Primary" value={params.colors.primary} onChange={(v) => setColorParams({ primary: v })} />
        <ColorPicker label="Secondary" value={params.colors.secondary} onChange={(v) => setColorParams({ secondary: v })} />
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-zinc-400">Gradient</span>
          <button
            onClick={() => setColorParams({ gradient: !params.colors.gradient })}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              params.colors.gradient ? 'bg-indigo-600' : 'bg-white/[0.08]'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                params.colors.gradient ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </Section>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/[0.04]">
        <div className="flex items-center justify-between text-[11px] text-zinc-600">
          <span>CodeArt v1.0</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-white/[0.04] rounded text-[10px] font-mono">R</kbd>
            <span>to randomize</span>
          </div>
        </div>
      </div>
    </div>
  );
}
