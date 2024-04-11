let level = main => [
    [ // ----- Level 1 ----- //
        // Background
        main.entity('background'),
        // Platforms
        main.entity('plat', {x:-10*4, y:main.h-16, w:10, h:2}),
        main.entity('plat', {x:16*8, y:main.h-16*4, w:10, h:5}),
    ]
];
export {level};