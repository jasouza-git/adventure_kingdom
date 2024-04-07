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
    },//cdr_it(s, z, (p, ht)
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
    gravity: (vector:number, delta_time:number):number => {
        vector[1] -= (9+vector[1])*delta_time/500;
        return vector[1]*delta_time/60;
    },
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

};
export {algo};