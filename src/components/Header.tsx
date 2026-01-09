import { useState } from 'react';
import { useStore } from '../hooks/useStore';

export function Header() {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const randomizeSeed = useStore((state) => state.randomizeSeed);
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);
  const params = useStore((state) => state.params);

  const exportPNG = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `codeart-${params.seed}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setShowExportMenu(false);
  };

  const exportCode = () => {
    const code = `// CodeArt Export - Seed: ${params.seed}\nconst params = ${JSON.stringify(params, null, 2)};`;
    const blob = new Blob([code], { type: 'text/javascript' });
    const link = document.createElement('a');
    link.download = `codeart-${params.seed}.js`;
    link.href = URL.createObjectURL(blob);
    link.click();
    setShowExportMenu(false);
  };

  return (
    <header className="h-14 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-5 sticky top-0 z-50">
      <div className="flex items-center gap-5">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">CodeArt</span>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-white/10" />

        {/* Mode Toggle */}
        <div className="flex bg-white/[0.04] rounded-lg p-0.5 border border-white/[0.06]">
          <button
            onClick={() => setMode('visual')}
            className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-all ${
              mode === 'visual'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Visual
          </button>
          <button
            onClick={() => setMode('code')}
            className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-all ${
              mode === 'code'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Code
          </button>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Seed display */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] rounded-lg border border-white/[0.06]">
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Seed</span>
          <span className="text-[13px] font-mono text-zinc-300">{params.seed}</span>
        </div>

        {/* Randomize */}
        <button
          onClick={randomizeSeed}
          className="flex items-center gap-2 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08]
            border border-white/[0.06] hover:border-white/[0.1] rounded-lg text-[13px] font-medium
            text-zinc-300 hover:text-white transition-all group"
        >
          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Randomize</span>
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 bg-white/[0.06] rounded text-[10px] text-zinc-500 font-mono">R</kbd>
        </button>

        {/* Export */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-100
              rounded-lg text-[13px] font-semibold text-zinc-900 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>

          {showExportMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
              <div className="absolute right-0 top-full mt-2 bg-[#18181b] border border-white/[0.08]
                rounded-xl shadow-2xl py-1.5 min-w-[180px] z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[11px] text-zinc-500 uppercase tracking-wider">
                  Export as
                </div>
                <button
                  onClick={exportPNG}
                  className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.05]
                    transition-colors flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-orange-500/20
                    flex items-center justify-center">
                    <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">PNG Image</div>
                    <div className="text-[11px] text-zinc-500">High quality raster</div>
                  </div>
                </button>
                <button
                  onClick={exportCode}
                  className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.05]
                    transition-colors flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20
                    flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">JavaScript</div>
                    <div className="text-[11px] text-zinc-500">Params as code</div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
