# Feature: Mobile Touch Controls Overlay

Adds on-screen virtual buttons dynamically for players on mobile or tablet devices.

## Details

1. **Auto-Detection**:
   - Detects touch support (`'ontouchstart' in window` or `navigator.maxTouchPoints > 0`).
   - If touch support is present, the virtual overlay renders immediately.
   - For hybrid screens, it binds to a one-time `touchstart` listener to slide in as soon as the screen is touched.

2. **D-pad Layout (Left Side)**:
   - **UP**: Map to `ArrowUp` (vine climb / navigate menu up).
   - **LEFT / RIGHT**: Map to `ArrowLeft` / `ArrowRight` (walk left/right).
   - **DOWN**: Map to `ArrowDown` (crouch / navigate menu down).

3. **Action Cluster (Right Side)**:
   - **JUMP**: Map to `' '` (Space key - jumps or exits vines).
   - **ATK**: Map to `j` (weapon attack).
   - **SWAP**: Map to `r` (cycle active weapon selection).
   - **SHLD**: Map to `e` (toggles cross shield protection).

4. **Utility Panel (Top)**:
   - **SELECT**: Map to `Enter` (select menu items / skip intro video).
   - **PAUSE**: Map to `Escape` (toggle pause menu overlay).

5. **Styling**:
   - Built to match the retro arcade aesthetic using dark gold borders (`#8B6914`), translucent button hulls, active scaling animations (`transform: scale(0.95)` on press), and font integrations.
