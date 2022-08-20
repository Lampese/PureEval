import { curry,curry_any } from './curry.js'
function __deepClone(obj){
    let _obj=JSON.stringify(obj),
    objClone=JSON.parse(_obj);
    return objClone;
}
function __iterate(fun,args){
    let u=__deepClone(args);
    if(u.length==1){
        if(Array.isArray(u[0]))u[0].forEach(v=>fun(v));
        else fun(u[0]);
        return;
    }
    if(Array.isArray(u[0]))u.shift().forEach(v=>__iterate(fun(v),u));
    else __iterate(fun(u.shift()),u);
}
function iterate(fun,...args){
    let curryed=curry(fun,0);
    __iterate(curryed,args);
}
const map=curry_any((arr,rule)=>{
    return arr.map(v=>rule(v));
});
const foreach=curry_any((arr,rule)=>{
    arr.forEach(rule);
});
const reduce=curry_any((arr,fun,init)=>{
    return init!=undefined?arr.reduce(fun,init):arr.reduce(fun);
});
export { iterate,map,foreach,reduce };