# CodeArt

A web app for creating code-generated isometric art.

![CodeArt](https://img.shields.io/badge/Status-90%25%20Complete-brightgreen)

## Overview

**CodeArt** is a generative art tool focused on isometric 3D geometric patterns. It offers both a visual editor for beginners and a code editor for advanced users, with real-time preview and multiple export options.

## Features

### Dual Editor Modes
- **Visual Editor** — Intuitive controls for tweaking parameters
- **Code Editor** — Monaco-powered editor for advanced customization

### Visual Editor Controls
- Grid settings (rows, columns, spacing)
- Block dimensions (height, width, depth)
- Height algorithm selection
- Color pickers (background, primary, secondary)
- Gradient toggle
- Seed input with randomize button

### Height Algorithms
| Algorithm | Description |
|-----------|-------------|
| Random | Randomized block heights |
| Perlin Noise | Smooth, organic terrain |
| Sine Wave | Rhythmic wave patterns |
| Radial Wave | Circular ripple effect |

### Scene Elements
- Blocks with varying sizes
- Thin bars
- Small cubes
- Grid lines
- Dots
- Edge highlighting

### Presets
Includes 6 built-in presets:
1. **Cityscape** — Perlin noise heights, dense grid
2. **Circuit Board** — Random short blocks, green theme
3. **Sound Waves** — Sine wave pattern, orange theme
4. **Ripple** — Radial wave from center, blue theme
5. **Sparse Grid** — Wide spacing, tall blocks
6. **Dense City** — Tight grid, yellow theme

Plus save/load your own custom presets!

### Export Options
- PNG image export
- JavaScript code export

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React + TypeScript |
| Build Tool | Vite |
| Rendering | WebGL / Three.js |
| Storage | LocalStorage |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/codeart.git
cd codeart

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for static hosting.

## Usage

1. **Choose a mode** — Toggle between Visual and Code editor in the header
2. **Adjust parameters** — Use sliders and color pickers to customize your art
3. **Try presets** — Browse built-in presets or save your own
4. **Randomize** — Click the randomize button to generate new variations
5. **Export** — Download as PNG or export the JavaScript code

## Roadmap

- [ ] SVG export
- [ ] Parameter locking during randomization
- [ ] Custom code execution in code editor

## License

MIT
