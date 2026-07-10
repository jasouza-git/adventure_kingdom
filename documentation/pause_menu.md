# Feature: Pause Menu & Readable Controls Screen

Introduced game state suspension controls and refined controls description sheets.

## Pause Menu (ESC / P keys)

- Pressing **ESC** or **P** during levels pauses all updates.
- Draws a dark gray transparent overlay (`rgba(0,0,0,0.7)`) and displays a menu container with:
  - **RESUME**: Close menu and restore gameplay loop updates.
  - **CONTROLS**: Shows key bindings instructions.
  - **MAIN MENU**: Resets the current level and navigates back to the title screen.

---

## Readable Controls Screen

- Replaces the blurry `Controls.png` sprite image.
- Uses high-contrast canvas-drawn text via `arcade` font.
- Segmented clearly into **MOVEMENT**, **COMBAT**, **CAMERA**, and **PAUSE** sections.
- Action tags are rendered in soft gray (`#CCCCCC`) and key mappings in bright cyan (`#66CCFF`) for high legibility.
