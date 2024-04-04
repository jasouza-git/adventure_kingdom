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
    }
};
export {algo};