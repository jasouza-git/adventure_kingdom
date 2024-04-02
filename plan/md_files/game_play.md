# Adventure Kingdom
- **Players**
    1. **Casus** - Latin of "Adventure"
    2. **Regnum** - Latin of "Kingdom"
- **Entities**
    1. **Player** - A knight controlled by the keyboard/mouse or joystick
    2. **Checkpoint** - A pole were a red/blue flag can be placed
- **Capabilities**
    1. **Carry** - Can carry specific entities but limits movement
- **Biomes**
    1. **Earth** - Has four flavors: Spring(default), Winter(snow), Summer(desert), Ocean(wet)
        - **Cloud** - if high
        - **Land/Ocean** - if medium
        - **Underground** - if low
    2. **Castle** - Is the final destination
        - **Roof** - if high
        - **Palace** - if medium
        - **Dungeon** - if low
- **Chunks** - Represents an area with 
    0. **Empty**
        - Contains nothing
        - Is not meant to be traversed
    1. **Spawn**
        - Contains a **Checkpoint**
        - Has no spawned enemies

