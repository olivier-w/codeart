import { useState } from 'react';
import { useStore } from '../../hooks/useStore';

export function PresetBrowser() {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState('');

  const presets = useStore((state) => state.presets);
  const loadPreset = useStore((state) => state.loadPreset);
  const savePreset = useStore((state) => state.savePreset);
  const deletePreset = useStore((state) => state.deletePreset);

  const builtInPresets = presets.filter((p) => p.isBuiltIn);
  const userPresets = presets.filter((p) => !p.isBuiltIn);

  const handleSave = () => {
    if (presetName.trim()) {
      savePreset(presetName.trim());
      setPresetName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Built-in presets grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {builtInPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => loadPreset(preset)}
            className="group px-3 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04]
              hover:border-white/[0.1] rounded-lg text-[12px] text-left transition-all"
            title={preset.name}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="text-zinc-400 group-hover:text-zinc-200 truncate transition-colors">
                {preset.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* User presets */}
      {userPresets.length > 0 && (
        <div className="pt-2 border-t border-white/[0.04]">
          <div className="text-[11px] text-zinc-600 uppercase tracking-wider mb-2">Saved</div>
          <div className="flex flex-col gap-1">
            {userPresets.map((preset) => (
              <div key={preset.id} className="flex items-center gap-1 group">
                <button
                  onClick={() => loadPreset(preset)}
                  className="flex-1 px-3 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04]
                    hover:border-white/[0.1] rounded-lg text-[12px] text-left transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                    <span className="text-zinc-400 group-hover:text-zinc-200 truncate transition-colors">
                      {preset.name}
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => deletePreset(preset.id)}
                  className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10
                    rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  title="Delete"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save dialog */}
      {showSaveDialog ? (
        <div className="flex gap-1.5 animate-fadeIn">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="Name your preset..."
            className="flex-1 min-w-0 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg
              text-[12px] placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-[12px] font-medium transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => { setShowSaveDialog(false); setPresetName(''); }}
            className="px-2 py-2 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg text-[12px] text-zinc-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.05]
            border border-dashed border-white/[0.08] hover:border-white/[0.15] rounded-lg
            text-[12px] text-zinc-500 hover:text-zinc-300 transition-all group"
        >
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Save Current
        </button>
      )}
    </div>
  );
}
