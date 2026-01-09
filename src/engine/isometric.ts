import type { ArtParams } from '../types';
import { createRandom, createNoise } from '../utils/random';

export interface Block {
  x: number;
  y: number;
  z: number;
  height: number;
  width: number;
  depth: number;
  color: string;
  type: 'block' | 'bar' | 'cube';
}

export interface GridLine {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

export interface GridDot {
  position: [number, number, number];
  color: string;
  size: number;
}

export interface SceneElements {
  blocks: Block[];
  gridLines: GridLine[];
  dots: GridDot[];
}

function interpolateColor(color1: string, color2: string, factor: number): string {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function generateScene(params: ArtParams): SceneElements {
  const { seed, grid, blocks: blockParams, colors, scene: sceneParams } = params;
  const { rows, cols, spacing } = grid;
  const { minHeight, maxHeight, width, depth, heightAlgorithm } = blockParams;
  const { density, gridLines: gridLineProb, dots: dotProb, elevatedBars } = sceneParams ?? {
    density: 0.4,
    gridLines: 0.4,
    dots: 0.15,
    elevatedBars: 0.2,
  };

  const random = createRandom(seed);
  const noise = createNoise(seed);

  const blocks: Block[] = [];
  const gridLines: GridLine[] = [];
  const dots: GridDot[] = [];

  const heightRange = maxHeight - minHeight;
  const cellSize = width + spacing;
  const totalWidth = cols * cellSize;
  const totalDepth = rows * cellSize;

  // Track which cells have blocks for grid line connections
  const cellHasBlock: boolean[][] = [];
  const cellHeights: number[][] = [];

  for (let row = 0; row < rows; row++) {
    cellHasBlock[row] = [];
    cellHeights[row] = [];
    for (let col = 0; col < cols; col++) {
      cellHasBlock[row][col] = false;
      cellHeights[row][col] = 0;
    }
  }

  // Generate blocks with varying density and shapes
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Sparse distribution - skip cells based on density
      const sparsity = random();
      if (sparsity > density) continue;

      let heightFactor: number;

      switch (heightAlgorithm) {
        case 'perlin':
          heightFactor = (noise(col * 0.15, row * 0.15) + 1) / 2;
          break;
        case 'sine':
          heightFactor = (Math.sin(col * 0.4) + Math.sin(row * 0.4) + 2) / 4;
          break;
        case 'wave':
          const dist = Math.sqrt(
            Math.pow(col - cols / 2, 2) + Math.pow(row - rows / 2, 2)
          );
          heightFactor = (Math.sin(dist * 0.4) + 1) / 2;
          break;
        case 'random':
        default:
          heightFactor = random();
          break;
      }

      const height = minHeight + heightFactor * heightRange;

      const x = col * cellSize - totalWidth / 2;
      const z = row * cellSize - totalDepth / 2;

      const colorFactor = colors.gradient ? heightFactor : 1;
      const color = colors.gradient
        ? interpolateColor(colors.secondary, colors.primary, colorFactor)
        : colors.primary;

      // Determine block type based on randomness
      const typeRoll = random();
      let blockType: 'block' | 'bar' | 'cube';
      let blockWidth = width;
      let blockDepth = depth;
      let blockHeight = height;

      if (typeRoll < 0.3) {
        // Tall thin bar
        blockType = 'bar';
        blockWidth = width * 0.3;
        blockDepth = depth * 0.3;
        blockHeight = height * (1.5 + random());
      } else if (typeRoll < 0.5) {
        // Small cube
        blockType = 'cube';
        const cubeSize = width * (0.3 + random() * 0.4);
        blockWidth = cubeSize;
        blockDepth = cubeSize;
        blockHeight = cubeSize;
      } else {
        // Regular block with variation
        blockType = 'block';
        blockWidth = width * (0.5 + random() * 0.5);
        blockDepth = depth * (0.5 + random() * 0.5);
      }

      cellHasBlock[row][col] = true;
      cellHeights[row][col] = blockHeight;

      blocks.push({
        x,
        y: blockHeight / 2,
        z,
        height: blockHeight,
        width: blockWidth,
        depth: blockDepth,
        color,
        type: blockType,
      });
    }
  }

  // Generate grid lines connecting blocks
  const lineColor = interpolateColor(colors.secondary, colors.primary, 0.3);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellSize - totalWidth / 2;
      const z = row * cellSize - totalDepth / 2;

      // Add dots at some intersections
      if (random() < dotProb) {
        dots.push({
          position: [x, 0.05, z],
          color: colors.primary,
          size: 0.08,
        });
      }

      // Horizontal lines (along X axis)
      if (col < cols - 1) {
        const hasConnection = (cellHasBlock[row][col] || cellHasBlock[row][col + 1]) && random() < gridLineProb;
        if (hasConnection) {
          const nextX = (col + 1) * cellSize - totalWidth / 2;
          const lineHeight = 0.02;
          gridLines.push({
            start: [x + width / 2, lineHeight, z],
            end: [nextX - width / 2, lineHeight, z],
            color: lineColor,
          });
        }
      }

      // Vertical lines (along Z axis)
      if (row < rows - 1) {
        const hasConnection = (cellHasBlock[row][col] || cellHasBlock[row + 1][col]) && random() < gridLineProb;
        if (hasConnection) {
          const nextZ = (row + 1) * cellSize - totalDepth / 2;
          const lineHeight = 0.02;
          gridLines.push({
            start: [x, lineHeight, z + depth / 2],
            end: [x, lineHeight, nextZ - depth / 2],
            color: lineColor,
          });
        }
      }

      // Add some elevated horizontal bars at block tops
      if (cellHasBlock[row][col] && random() < elevatedBars) {
        const barLength = cellSize * (1 + Math.floor(random() * 2));
        const barHeight = cellHeights[row][col];

        if (random() < 0.5 && col + 1 < cols) {
          // Horizontal bar extending right
          gridLines.push({
            start: [x, barHeight, z],
            end: [x + barLength, barHeight, z],
            color: lineColor,
          });
        } else if (row + 1 < rows) {
          // Vertical bar extending forward
          gridLines.push({
            start: [x, barHeight, z],
            end: [x, barHeight, z + barLength],
            color: lineColor,
          });
        }
      }
    }
  }

  // Add scattered dots in empty areas
  const scatteredDotCount = Math.floor(rows * cols * dotProb * 0.5);
  for (let i = 0; i < scatteredDotCount; i++) {
    const x = (random() * cols - cols / 2) * cellSize;
    const z = (random() * rows - rows / 2) * cellSize;

    dots.push({
      position: [x, 0.05, z],
      color: interpolateColor(colors.secondary, colors.primary, 0.5),
      size: 0.05 + random() * 0.05,
    });
  }

  return { blocks, gridLines, dots };
}

// Keep old function for compatibility
export function generateBlocks(params: ArtParams): Block[] {
  return generateScene(params).blocks;
}
