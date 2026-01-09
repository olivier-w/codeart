import { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useStore } from '../../hooks/useStore';

const defaultCode = `// CodeArt - Custom Generator
// Modify this code to create your own patterns!
// The 'params' object contains your current settings.

function generate(params) {
  const { seed, grid, blocks, colors } = params;
  const { rows, cols, spacing } = grid;
  const { minHeight, maxHeight, width, depth } = blocks;

  const result = [];
  const random = mulberry32(seed);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (random() > 0.4) continue;

      const height = minHeight + random() * (maxHeight - minHeight);
      const x = col * (width + spacing) - (cols * (width + spacing)) / 2;
      const z = row * (depth + spacing) - (rows * (depth + spacing)) / 2;

      result.push({
        x,
        y: height / 2,
        z,
        height,
        width: width * (0.5 + random() * 0.5),
        depth: depth * (0.5 + random() * 0.5),
        color: colors.primary,
      });
    }
  }

  return { blocks: result, gridLines: [], dots: [] };
}

// Seeded random number generator
function mulberry32(seed) {
  return function() {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
`;

export function CodeEditor() {
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);

  useEffect(() => {
    if (!code) {
      setCode(defaultCode);
    }
  }, []);

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code || defaultCode}
        onChange={(value) => setCode(value || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16 },
        }}
      />
    </div>
  );
}
