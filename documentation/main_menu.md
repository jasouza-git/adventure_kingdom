# Feature: Main Menu Screen

We have created an interactive Main Menu scene that displays before the intro video starts.

## Improvements

1. **Navigable Menu Items**:
   - Offers `START GAME`, `CONTROLS`, and `CREDITS` options.
   - Handled with `W`/`S` or `ArrowUp`/`ArrowDown` for moving, and `Enter` to select.
   - Shows a blinking cursor (`>`) next to the currently selected option.

2. **Parallax Clouds Background**:
   - Drawn using three scrolling layers from `Cloudsv1 (1).png`.
   - Programmed with smooth loop wraparounds and speed offsets to create an arcade sense of depth (parallax effect).

3. **Scaled Title Logo**:
   - Rescaled from its raw `256x144` scale down to `154x86` (`0.6x` ratio).
   - Prevents oversized, chunky pixel scaling on the canvas, aligning perfectly with the game's native pixel density.

4. **Credits Sub-Screen**:
   - Renders the `credits.png` asset with proper key checks to return.
