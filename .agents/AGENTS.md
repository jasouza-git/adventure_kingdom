# Aswang King Project Rules & Guidelines

Welcome, coding agent! Here are the rules and guidelines for this repository.

## Project Stack
- **Game Engine**: Custom game engine implemented in `src/engine.ts`.
- **Programming Language**: TypeScript compiled to ES5/ESNext modules.
- **Visuals**: Retro 2D pixel art canvas drawing.
- **Audio**: Audio playing using native `Audio` instances managed by the `engine` cache.

---

## Coding Rules

1. **Sprite Rendering**:
   - Always load assets by adding them to the `required_files` array in [entities.ts](../src/aswang_king/entities.ts) before using them.
   - Use the `engine.sprites` helper for multi-part sprites, and `engine.sprite` for single sprites.
   - For pixel-art consistency, draw items scaling them appropriately to match the default player/enemy resolution (approx. 0.5x to 0.7x ratios depending on source asset size).

2. **HUD & Screen-Space Overlays**:
   - When rendering HUD elements (e.g. text, score, lives, weapon icon boxes, or boss health bars), do NOT subtract `o.camera[0]` or `o.camera[1]` from the coordinates.
   - Screen-space coordinates are absolute on the canvas buffer (`main.btx`).

3. **Game Scenes**:
   - Register new scene loops using `main.scene('scene_name', callback)`.
   - Maintain the `main_menu` scene as the primary entry point. Defer heavy elements like the intro video element creation until the user interacts with the menu.
