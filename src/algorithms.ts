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
    // (delta_time, entity.[m,hitbox,collide,nocollide]) => (entity.[x,y,m,ground])
    gravity: 9,
    physics: (delta_time:number, entity:{[index:string]:any}, nocollide?:boolean):number[][] => {
        // Calculate Momentum and difference Position
        let m = [entity.m[0], entity.m[1]-(algo.gravity+entity.m[1])*delta_time/500];
        let p = [m[0]*delta_time/50, -m[1]*delta_time/50];
        let c:number[][] = [];

        entity.ground = -1;
        if (nocollide != true) entity.collide.forEach((collider, id) => {
            if (entity.nocollide.indexOf(id) != -1) return;
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
    rseed: (seed:number):number => {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    },
    prng: (seed:number, len:number, pos:number):number[] => {
        let chunk:number[] = [];
        for (let i = 0; i < len; i++) chunk.push(algo.rseed(seed + pos*len + i));
        return chunk;
    }

};
export {algo};