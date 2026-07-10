# Feature: Aswang King Boss Health Bar

A stylized, screen-space retro boss health bar was added to increase the intensity of the final fight.

## Details

1. **Activation**:
   - Only appears when the player is within `300px` of the Aswang King boss (same distance check that triggers the enraged music).

2. **Styling**:
   - Drawn as a gold-bordered (`#8B6914`) dark frame with centered white `"ASWANG KING"` text at the top center.
   - Smoothly displays current remaining lives vs maximum lives (`d.lives[1] / d.lives[0]`).

3. **Enraged State indicator**:
   - When boss health drops to or below **25%**, the fill color switches from solid red (`#CC0000`) to a pulsing red-orange glow to visually signify the boss is entering his enraged state.

4. **Dying Fade Out**:
   - The entire bar smoothly fades out corresponding to `d.cur_dying_t` when the boss is defeated.
