let level = main => [
    [ // ----- Level 1 ----- //
        // Background
        main.entity('background', {house:true}),
        // Platforms
        main.entity('plat', {x:0, y:main.h-16*6, w:16, h:7}),
        main.entity('plat', {x:-10*16, y:main.h-16, w:16, h:2}),
        main.entity('plat', {x:16*8, y:main.h-16*4, w:10, h:5}),
        // Dog
        main.entity('pet', {x:15,y:209}),
        // Enemy
        main.entity('mananangal')
    ]
];
let level_collide = level => {
    var c = [
        level[0].slice(1,4)
    ];
    level[0][4].collide = c[0];
    return c;
};
export {level, level_collide};