import { engine_type } from "./types";

let algo = {
    // Catalan Number, Dyck Word, Random Generation
    cdr: (length:number) => {
        if (length < 2) return length;
        let o = 0, x = 0, y = 0;
        for (let i = 0; i < 2*length; i++) {
            if (x >= length) break;
            if (x == y || Math.random() < 0.5) {
                o += Math.pow(2, i);
                x++;
            } else y++;
        }
        return o;
    },
    cdr_it: (seed:number, length:number, loop:(type:number, height:number, position:number, corner:boolean)=>void) => {
        loop(3, 0, 0, true);
        let h:number = 1;
        for (let i = 1; i < length-1; i++) {
            let p = seed&3;
            seed = seed>>2;
            if (p == 0) h--;
            loop(p, h, i, false);
            if (p == 3) h++;
        }
        loop(0, 0, length-1, true);
    },
    // Physics - Responsable for Gravity, Momentum, Collision
    // (delta_time, entity.[m,hitbox], engine.[interacts]) => (entity.[x,y,m,ground])
    gravity: 9,
    physics: (delta_time:number, entity:{[index:string]:any}, engine:engine_type):number[][] => {
        // Chasing
        if (entity.chase) {
            if (entity.follow == undefined) {
                engine.interacts.forEach(c => {
                    if (c['__type__'] == entity.chase.type) {
                        entity.follow = c;
                        return;
                    }
                });
            }/* else {
                let d = [entity.follow.x - entity.x, entity.y-entity.follow.y];
                if (entity.chase.min) entity.m = [
                    Math.abs(d[0]) < entity.chase.min ? entity.chase.min*(d[0] > 0 ? 1 : -1) : d[0]/1000*entity.chase.speed,
                    Math.abs(d[1]) < entity.chase.min ? entity.chase.min*(d[1] > 0 ? 1 : -1) : d[1]/1000*entity.chase.speed
                ];
                else entity.m = [
                    (entity.follow.x - entity.x)/1000*entity.chase.speed,
                    -(entity.follow.y - entity.y)/1000*entity.chase.speed
                ]
            }*/
        }
        
        // Calculate Momentum and difference Position
        let m = [entity.m[0], entity.m[1]-(entity.nogravity == undefined ? (algo.gravity+entity.m[1])*delta_time/500 : 0)];
        let p = [m[0]*delta_time/50, -m[1]*delta_time/50];
        let c:number[][] = [];

        entity.ground = -1;
        //if (nocollide != true) (entity.parent != undefined ? entity.parent.collide : entity.collide).forEach((collider, id) => {
        engine.interacts.forEach((collider, id) => {
            if (entity.nocollide != undefined && (entity.nocollide.indexOf(id) != -1 || entity.nocollide.indexOf(collider['__type__']) != -1)) return;
            for (let a = 0; a < 4; a++) {
                // Would have been easier if hitbox was [N,W,S,E] instead
                // Optional (a+1)>>1&1 instead
                let A = a==1||a==2?collider:entity;
                let B = a==1||a==2?entity:collider;
                if (entity.hitbox[0]>>a&1 && collider.hitbox[0]>>((a+2)%4)&1 &&
                    A.hitbox[2-a%2] >= B.hitbox[2-a%2]+B.hitbox[4-a%2] &&
                    A.hitbox[2-a%2]+p[1-a%2]*(a==1||a==2?-1:1) < B.hitbox[2-a%2]+B.hitbox[4-a%2] &&
                    entity.hitbox[1+a%2] < collider.hitbox[1+a%2]+collider.hitbox[3+a%2] &&
                    entity.hitbox[1+a%2]+entity.hitbox[3+a%2] > collider.hitbox[1+a%2]
                ) {
                    p[1-a%2] = collider.hitbox[2-a%2]-entity.hitbox[2-a%2]+B.hitbox[4-a%2]*(a==1||a==2?-1:1);
                    m[1-a%2] = 0;
                    if (a==2) entity.ground = id;
                    c.push([id, a]); // There can only be 1 side of collision, no need binary set
                }
            }
        });

        entity.x += p[0];
        entity.y += p[1];
        entity.m = m;
        return c;
    },
    intersect: (A, Bs, fil?):number => {
        for(var n = 0; n < Bs.length; n++) {
            var B = Bs[n];
            if (( A.hitbox[1] < B.hitbox[1] && B.hitbox[1] < A.hitbox[1]+A.hitbox[3] &&
                  A.hitbox[2] < B.hitbox[2] && B.hitbox[2] < A.hitbox[2]+A.hitbox[4] ) ||
                ( B.hitbox[1] < A.hitbox[1] && A.hitbox[1] < B.hitbox[1]+B.hitbox[3] &&
                  B.hitbox[2] < A.hitbox[2] && A.hitbox[2] < B.hitbox[2]+B.hitbox[4] )) {
                if (fil == undefined || fil(B) == true) return n;
            }
        }
        return -1;
    },
    rectint: (A,B):boolean => {
        if (B.length < 5) return false;
        return A[1] < B[1] + B[3] &&
        A[1] + A[3] > B[1] &&
        A[2] < B[2] + B[4] &&
        A[2] +A[4] > B[2];
        /*return (A[1] < B[1] && B[1] < A[1]+A[3] &&
                A[2] < B[2] && B[2] < A[2]+A[4] ) ||
               (B[1] < A[1] && A[1] < B[1]+B[3] &&
                B[2] < A[2] && A[2] < B[2]+B[4] );*/
    },
    sprite: (n,w) => [n%w, Math.floor(n/w)],
    /*
    collision: (entity:{[index:string]:any}, area?:number):number[] => {
        let collide:number[] = [0, -1];
        let d = area == undefined ? 15 : area;
        entity.collide.forEach((collider,num) => {
            if (entity.hitbox[0]&4 && collider.hitbox[0]&1 && (d&4) == 4 &&
                entity.hitbox[2]+entity.hitbox[4] >= collider.hitbox[2] &&
                entity.hitbox[2]+entity.hitbox[4] < collider.hitbox[2]+collider.hitbox[4] &&
                entity.hitbox[1] < collider.hitbox[1]+collider.hitbox[3] &&
                entity.hitbox[1]+entity.hitbox[3] > collider.hitbox[1]
            ) collide = [4, num];
        });
        return collide;
    },
    collide: (entity:{[index:string]:any}, area?:number):boolean => {
        let collided = algo.collision(entity, area);
        if (collided[1] == -1) return false;
        if (collided[0] == 4) entity.hitbox[2] = entity.y = entity.collide[collided[1]].hitbox[2]-entity.hitbox[4];
        return true;
    },
    // Physics - Responsable for Momentum, Gravity, Collision
    /*physics: (entity:{m:number[], [index:string]:any}, dt:number, ...colliders:{[index:string]:any}[]) => {
        // Momentum
        
    }*/
    rand: (seed:number):number => {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    },
    prng: (seed:number, len:number, pos:number):number[] => {
        let chunk:number[] = [];
        for (let i = 0; i < len; i++) chunk.push(algo.rand(seed + pos*len + i));
        return chunk;
    },
    mod: (a:number, b:number) => {
        return ((a % b) + b) % b;
    }

};
export {algo};