# Aswang King — 2026 Updates Documentation

This directory contains detailed technical documentation of all the features and improvements introduced in the `2026-Regi-Updates` branch.

## List of Changes

We have implemented four primary gameplay and visual enhancements inside the custom pixel-art engine:

1. **[Main Menu Screen](main_menu.md)**: A fully navigable, retro-styled game starter menu with START GAME, CONTROLS, and CREDITS options, complete with smooth parallax scrolling cloud layers and a pixel-scaled title logo.
2. **[Aswang King Boss Health Bar](boss_health_bar.md)**: An arcade-inspired health HUD element for the final boss encounter that displays remaining lives and triggers a pulsing enraged state when health is low.
3. **[Weapon Selection & Durability HUD](weapon_hud.md)**: An active weapon display slot showing item icons, names, exact durabilities, and green/red toggle indicators for cross shield protection.
4. **[Pause Menu & Readable Controls Screen](pause_menu.md)**: An in-game pause screen (ESC/P keys) to halt actions, alongside a high-legibility text-based key bindings screen.
5. **[Mobile Touch Controls Overlay](mobile_controls.md)**: Translucent, gold-bordered virtual D-pad and action button cluster that binds to game input loops for mobile device play.

---

## Technical Architecture & Core Files

All modifications were done natively inside the existing game loop structures:
* [game.ts](../src/aswang_king/game.ts): Handled the scene states (`main_menu`, `into`, `level`), user input, and screen vignette coordinate mapping.
* [entities.ts](../src/aswang_king/entities.ts): Configured the rendering layouts of the weapon HUD, boss health overlay, and the asset loading queue.
