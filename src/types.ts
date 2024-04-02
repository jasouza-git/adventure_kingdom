interface engine_type {
    dom:HTMLCanvasElement,
    ctx:CanvasRenderingContext2D,
    w:number,
    h:number,
    z:number,
    fps:number,
    load:(...files:string[])=>void,
    start_loop:()=>void,
    stop_loop:()=>void,
    scene:(id:string, scene?:((dt0:number,dt1:number)=>void))=>void,
    on:(event:string, action:(...arg:any[])=>any)=>void,
    sprite:(img:string,x:number,y:number,cx:number,cy:number,cw:number,ch:number,fx?:boolean,fy?:boolean)=>void,
    draw:(type:string, data:undefined|{[prop:string]:any})=>void,
    render:(p?:HTMLElement)=>void
}
interface entities_type {
    [entity_id:string]:{
        default:{[prop:string]:any},
        render?:(data:{[prop:string]:any}, engine:engine_type)=>void,
        run?:(data:{[prop:string]:any},dt:number)=>{[prop:string]:any}
    }
}
type loadedfile_type = HTMLImageElement|String;
type action_type = (...args:any[])=>any;
type scene_type = (dt_from_start:number, dt_from_last:number) => void;
export {engine_type, entities_type, loadedfile_type, action_type, scene_type};