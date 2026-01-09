export interface GridParams {
  rows: number;
  cols: number;
  spacing: number;
  angle: number;
}

export interface BlockParams {
  minHeight: number;
  maxHeight: number;
  width: number;
  depth: number;
  heightAlgorithm: 'random' | 'perlin' | 'sine' | 'wave';
}

export interface ColorParams {
  background: string;
  primary: string;
  secondary: string;
  gradient: boolean;
  shadingStyle: 'standard' | 'isometric';
}

export interface SceneParams {
  density: number;      // 0-1, how many cells have blocks
  gridLines: number;    // 0-1, probability of grid lines
  dots: number;         // 0-1, probability of dots
  elevatedBars: number; // 0-1, probability of elevated bars
}

export interface ArtParams {
  seed: number;
  grid: GridParams;
  blocks: BlockParams;
  colors: ColorParams;
  scene: SceneParams;
}

export interface Preset {
  id: string;
  name: string;
  thumbnail?: string;
  params: ArtParams;
  code?: string;
  createdAt: number;
  isBuiltIn: boolean;
}

export type EditorMode = 'visual' | 'code';
