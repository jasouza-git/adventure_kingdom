# Feature: Weapon Selection & Durability HUD

Replaces the old, ambiguous durability dots with a comprehensive weapon slot display.

## Layout & Features

1. **Weapon Icon**:
   - Displays the current weapon's sprite (`Sword.png`, `Asin pouch.png`, or `CrossIcon.png`) framed inside the `Icon Box.png` layout.

2. **Dura Count**:
   - Renders active durability remaining.
   - Sword prints `"∞"` since it has infinite durability.
   - Asin/Cross print the exact number (e.g., `20`).

3. **Low Durability Alert**:
   - When active durability drops to or below `5`, the durability text flashes orange/red to alert the player.

4. **Shield Protection Indicator**:
   - When the cross shield is selected, a green `"ON"` or red `"OFF"` indicator displays next to the counter showing the active status of `d.protection`.
