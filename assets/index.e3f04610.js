var u=Object.defineProperty,m=Object.defineProperties;var y=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var d=(s,a,e)=>a in s?u(s,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[a]=e,l=(s,a)=>{for(var e in a||(a={}))f.call(a,e)&&d(s,e,a[e]);if(o)for(var e of o(a))h.call(a,e)&&d(s,e,a[e]);return s},n=(s,a)=>m(s,y(a));import{b as S,m as b,d as _,F as v,o as p,c,n as t,u as r,r as i,P as w,t as C,e as g,a as k,j as E,l as N,L as P}from"./index.85ee9ce5.js";const $=S({header:{type:String,default:""},bodyStyle:{type:b([String,Object,Array]),default:""},shadow:{type:String,default:"always"}}),B={name:"ElCard"},V=_(n(l({},B),{props:$,setup(s){const a=v("card");return(e,z)=>(p(),c("div",{class:t([r(a).b(),r(a).is(`${e.shadow}-shadow`)])},[e.$slots.header||e.header?(p(),c("div",{key:0,class:t(r(a).e("header"))},[i(e.$slots,"header",{},()=>[w(C(e.header),1)])],2)):g("v-if",!0),k("div",{class:t(r(a).e("body")),style:E(e.bodyStyle)},[i(e.$slots,"default")],6)],2))}}));var j=N(V,[["__file","/home/runner/work/element-plus/element-plus/packages/components/card/src/card.vue"]]);const D=P(j);export{D as E};