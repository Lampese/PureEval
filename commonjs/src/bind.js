import { curry_any } from "./curry.js";
const _={_P:1};
function bind(func,...args){
    let arg=[],pos=[],nowarg=[];
    for(let i in args){
        if(args[i]==_){
            arg.push("a"+i);
            pos.push(i);
            nowarg.push(0);
            continue;
        }
        nowarg.push(args[i]);
    }
    return (curry_any(new Function(["Fu","Ar","_F"],arg,`let _a=Object.values(arguments).splice(3);for(let i in Ar)_F[Ar[i]]=_a.shift();return Fu.apply(this,_F);`)))(func,pos,nowarg);
}
export { _,bind };