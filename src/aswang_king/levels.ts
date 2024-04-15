let level = main => [
    [ // ----- Level 1 ----- //
        // Background
        main.entity('background', {house:true}),
        // Platforms
        main.entity('plat', {x:0, y:main.h-16*6, w:16, h:7}),
        main.entity('plat', {x:-10*16, y:main.h-16, w:16, h:2, dropoff:false}),
        main.entity('plat', {x:16*8, y:main.h-16*4, w:10, h:5}),
        // Shooter
        main.entity('shooter', {x:16*8-8, y:main.h-16*4-64, f:1, speed:25}),
        // Enemy
        //main.entity('mananangal')
    ],
    [

    ]
];
export {level};