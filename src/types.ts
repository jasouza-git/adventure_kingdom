interface engine_type {
    dom:HTMLCanvasElement,
    ctx:CanvasRenderingContext2D,
    w:number,
    h:number,
    z:number,
    fps:number,
    camera:number[],
    loaded:{[index:string]:loadedfile_type},
    load:(...files:string[])=>void,
    start_loop:()=>void,
    stop_loop:()=>void,
    scene:(id:string, scene?:((dt0:number,dt1:number)=>void))=>void,
    on:(event:string, action:(...arg:any[])=>any)=>void,
    sprite:(img:string,x:number,y:number,cx:number,cy:number,cw:number,ch:number,fx?:boolean,fy?:boolean)=>void,
    sprites:(img:string, ...args:any[])=>void,
    draw:(type:string, data:undefined|{[prop:string]:any})=>void,
    render:(p?:HTMLElement)=>void,
    physics:(entity:{[index:string]:any}, d?:number)=>boolean
}
interface entities_type {
    [entity_id:string]:{
        default:{[prop:string]:any},
        update?:(data:{[prop:string]:any}, engine:engine_type, dt_init:number, dt_last:number)=>void,
        render?:(data:{[prop:string]:any}, engine:engine_type, dt_init:number, dt_last:number)=>void,
        create?:(engine:engine_type, args:{[prop:string]:any})=>{[prop:string]:any}
    }
}
type loadedfile_type = HTMLImageElement|String;
type action_type = (...args:any[])=>any;
type scene_type = (dt_from_start:number, dt_from_last:number) => void;
export {engine_type, entities_type, loadedfile_type, action_type, scene_type};