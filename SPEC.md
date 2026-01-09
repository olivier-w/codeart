# CodeArt - Specification

A web app for creating code-generated isometric art.

---

## Overview

**CodeArt** is a generative art tool focused on isometric 3D geometric patterns. It offers both a visual editor for beginners and a code editor for advanced users, with real-time preview and multiple export options.

---

## Tech Stack

| Component | Technology | Status |
|-----------|------------|--------|
| Framework | React + TypeScript | ✅ Done |
| Rendering | WebGL / Three.js | ✅ Done |
| Storage | LocalStorage | ✅ Done |
| Deployment | Static hosting | ✅ Ready |

---

## Features Checklist

### 1. Dual Editor Modes

| Feature | Status |
|---------|--------|
| Visual Editor with controls | ✅ Done |
| Code Editor (Monaco) | ✅ Done |
| Mode toggle in header | ✅ Done |

### 2. Visual Editor Controls

| Feature | Status |
|---------|--------|
| Grid sliders (rows, cols, spacing) | ✅ Done |
| Block sliders (height, width, depth) | ✅ Done |
| Height algorithm selector | ✅ Done |
| Color pickers (bg, primary, secondary) | ✅ Done |
| Gradient toggle | ✅ Done |
| Seed input + randomize | ✅ Done |

### 3. Randomization System

| Feature | Status |
|---------|--------|
| Seed-based generation | ✅ Done |
| Randomize button | ✅ Done |
| Lock specific parameters | ❌ Not started |

### 4. Presets

| Feature | Status |
|---------|--------|
| Built-in preset library (6 presets) | ✅ Done |
| Save user presets | ✅ Done |
| Load presets | ✅ Done |
| Delete user presets | ✅ Done |
| Preset browser UI | ✅ Done |

### 5. Export Options

| Feature | Status |
|---------|--------|
| PNG export | ✅ Done |
| Code export (.js) | ✅ Done |
| SVG export | ❌ Not started |

### 6. Height Algorithms

| Algorithm | Status |
|-----------|--------|
| Random | ✅ Done |
| Perlin Noise | ✅ Done |
| Sine Wave | ✅ Done |
| Radial Wave | ✅ Done |

### 7. Scene Elements

| Element | Status |
|---------|--------|
| Blocks (varying sizes) | ✅ Done |
| Thin bars | ✅ Done |
| Small cubes | ✅ Done |
| Grid lines | ✅ Done |
| Dots | ✅ Done |
| Edge highlighting | ✅ Done |

---

## Built-in Presets

1. **Cityscape** - Perlin noise heights, dense grid
2. **Circuit Board** - Random short blocks, green theme
3. **Sound Waves** - Sine wave pattern, orange theme
4. **Ripple** - Radial wave from center, blue theme
5. **Sparse Grid** - Wide spacing, tall blocks
6. **Dense City** - Tight grid, yellow theme

---

## Summary

**Completed (~90%):**
- Project setup with Vite + React + TypeScript + Tailwind
- Three.js canvas with orthographic isometric view
- Full visual editor with all sliders and color pickers
- 4 height algorithms (random, perlin, sine, radial wave)
- Complex scene generation (blocks, bars, cubes, grid lines, dots)
- Seed-based randomization
- PNG and code export
- Dark minimal UI
- Mode toggle (Visual/Code)
- Monaco code editor integration
- Presets system with 6 built-in + user saves

**Remaining (~10%):**
- SVG export
- Parameter locking
- Custom code execution (code editor is view-only currently)
