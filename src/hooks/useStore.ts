import { create } from 'zustand';
import type { ArtParams, EditorMode, Preset } from '../types';
import { builtInPresets } from '../presets/builtIn';

const defaultParams: ArtParams = {
  seed: Math.floor(Math.random() * 100000),
  grid: {
    rows: 20,
    cols: 20,
    spacing: 0.1,
    angle: 45,
  },
  blocks: {
    minHeight: 0.1,
    maxHeight: 2.0,
    width: 0.8,
    depth: 0.8,
    heightAlgorithm: 'random',
  },
  colors: {
    background: '#0a0a0a',
    primary: '#ffffff',
    secondary: '#888888',
    gradient: true,
    shadingStyle: 'standard',
  },
  scene: {
    density: 0.4,
    gridLines: 0.4,
    dots: 0.15,
    elevatedBars: 0.2,
  },
};

interface AppState {
  params: ArtParams;
  mode: EditorMode;
  presets: Preset[];
  code: string;

  setParams: (params: Partial<ArtParams>) => void;
  setGridParams: (grid: Partial<ArtParams['grid']>) => void;
  setBlockParams: (blocks: Partial<ArtParams['blocks']>) => void;
  setColorParams: (colors: Partial<ArtParams['colors']>) => void;
  setSceneParams: (scene: Partial<ArtParams['scene']>) => void;
  setSeed: (seed: number) => void;
  randomizeSeed: () => void;
  setMode: (mode: EditorMode) => void;
  setCode: (code: string) => void;
  loadPreset: (preset: Preset) => void;
  savePreset: (name: string) => void;
  deletePreset: (id: string) => void;
  loadPresetsFromStorage: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  params: defaultParams,
  mode: 'visual',
  presets: builtInPresets,
  code: '',

  setParams: (newParams) =>
    set((state) => ({ params: { ...state.params, ...newParams } })),

  setGridParams: (grid) =>
    set((state) => ({
      params: { ...state.params, grid: { ...state.params.grid, ...grid } },
    })),

  setBlockParams: (blocks) =>
    set((state) => ({
      params: { ...state.params, blocks: { ...state.params.blocks, ...blocks } },
    })),

  setColorParams: (colors) =>
    set((state) => ({
      params: { ...state.params, colors: { ...state.params.colors, ...colors } },
    })),

  setSceneParams: (scene) =>
    set((state) => ({
      params: { ...state.params, scene: { ...state.params.scene, ...scene } },
    })),

  setSeed: (seed) =>
    set((state) => ({ params: { ...state.params, seed } })),

  randomizeSeed: () =>
    set((state) => ({
      params: { ...state.params, seed: Math.floor(Math.random() * 100000) },
    })),

  setMode: (mode) => set({ mode }),

  setCode: (code) => set({ code }),

  loadPreset: (preset) =>
    set({ params: preset.params, code: preset.code || '' }),

  savePreset: (name) => {
    const state = get();
    const newPreset: Preset = {
      id: crypto.randomUUID(),
      name,
      params: state.params,
      code: state.code,
      createdAt: Date.now(),
      isBuiltIn: false,
    };
    const userPresets = [...state.presets.filter((p) => !p.isBuiltIn), newPreset];
    localStorage.setItem('codeart-presets', JSON.stringify(userPresets));
    set({ presets: [...builtInPresets, ...userPresets] });
  },

  deletePreset: (id) => {
    const state = get();
    const userPresets = state.presets.filter((p) => !p.isBuiltIn && p.id !== id);
    localStorage.setItem('codeart-presets', JSON.stringify(userPresets));
    set({ presets: [...builtInPresets, ...userPresets] });
  },

  loadPresetsFromStorage: () => {
    try {
      const stored = localStorage.getItem('codeart-presets');
      const userPresets: Preset[] = stored ? JSON.parse(stored) : [];
      set({ presets: [...builtInPresets, ...userPresets] });
    } catch {
      console.error('Failed to load presets from storage');
    }
  },
}));
