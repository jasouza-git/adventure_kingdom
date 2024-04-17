let level = main => [
    [ // ----- Chunk 1 ----- //
        // Background
        main.entity('background', {house:true}),
        // Platforms
        main.entity('plat', {x:0, y:main.h-16*6, w:16, h:7, mode:1}),
        main.entity('plat', {x:-10*16, y:main.h-16, w:16, h:2, dropoff:false}),
        main.entity('plat', {x:16*8, y:main.h-16*4, w:10, h:3, mode:2, clip:[
            [9],
            [],
            [],
            []
        ]}),
        main.entity('plat', {x:16*8+16*9, y:main.h-16*5, w:1, h:1, mode:2, clip:[
            [],
            [],
            [],
            [0]
        ], col:15}),
        // Shooter
        // Enemy
        main.entity('mananangal', {p:[0, main.h-16*8, (16-2)*16, main.h-16*8]}),
        main.entity('pressure_plate', {x:15*4, y:main.h-16-2, w:10, bind: [
            main.entity('shooter', {x:16*8-4, y:main.h-16*3, a:Math.PI, s:25}),
        ]}),
        main.entity('text', {text:'Level 1 - Tutorial'}),



        main.entity('plat', {x:40*16, y:main.h-16, w:16, h:2, dropoff:false}),
        /*/main.entity('vine',{y:10,h:20}),
        main.entity('wire',{y:main.h-16*5,h:30, bind:[
            main.entity('shooter',{y:main.h-16*4,s:50,a:Math.PI*0.25})
        ]}),
        main.entity('pressure_plate',{x:50,y:main.h-16*6,h:30, bind:[
            main.entity('shooter',{y:main.h-16*4,s:50,a:Math.PI*0.25})
        ]}),*/
    ],
    [

    ]
];
export {level}