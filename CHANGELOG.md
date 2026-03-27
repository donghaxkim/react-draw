# Changelog

## 0.1.0 — Initial Release

### Features

- **Visual overlay** — select React components in-browser with a Figma-style canvas
- **Drag-to-reorder** — reorder sibling JSX elements by dragging; writes directly to source
- **Property inspector** — edit Tailwind classes (spacing, sizing, typography, colors, layout) with live preview and source writes
- **Inline text editing** — double-click text to edit; diffs applied to JSX source
- **Move tool** — drag elements to reposition; resolves to Tailwind spacing tokens
- **Color picker** — change colors with a picker that resolves to your Tailwind palette
- **Batch transform engine** — deterministic resolution chain with staleness detection for reliable AST mutations
- **Undo/redo** — file-level undo stack with conflict detection
- **Changelog panel** — tracks all changes with per-entry revert
- **Framework detection** — auto-detects Next.js, Vite, and CRA dev servers
- **Shadow DOM isolation** — all overlay UI lives in Shadow DOM, zero interference with user styles
- **Leveled logger** — `--verbose` flag or `LOG_LEVEL=debug` for diagnostic output

### Architecture

- CLI reverse proxy injects overlay IIFE bundle — no modifications to user's app
- WebSocket bridge between CLI (AST transforms) and overlay (visual state)
- jscodeshift-based transforms for all source mutations
- bippy for React Fiber traversal and component resolution
- Supports React 18 (`_debugSource`) and React 19 (`getOwnerStack`)
