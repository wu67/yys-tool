import{h as w,aK as L,aL as p,w as d,S as l,r as u,f,aM as E,d as F,_ as R,o as V,c as B,a as D,F as K,aN as W,ax as N,O as m,aO as M}from"./index.daa05baf.js";function x(e){var t;const o=l(e);return(t=o==null?void 0:o.$el)!=null?t:o}const v=w?window:void 0,T=w?window.document:void 0;function _(...e){let t,o,n,r;if(L(e[0])?([o,n,r]=e,t=v):[t,o,n,r]=e,!t)return p;let s=p;const i=d(()=>l(t),a=>{s(),a&&(a.addEventListener(o,n,r),s=()=>{a.removeEventListener(o,n,r),s=p})},{immediate:!0,flush:"post"}),c=()=>{i(),s()};return E(c),c}const b=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},y="__vueuse_ssr_handlers__";b[y]=b[y]||{};b[y];function se(e,t,{window:o=v}={}){const n=u(""),r=f(()=>{var s;return x(t)||((s=o==null?void 0:o.document)==null?void 0:s.documentElement)});return d([r,()=>l(e)],([s,i])=>{s&&o&&(n.value=o.getComputedStyle(s).getPropertyValue(i))},{immediate:!0}),d(n,s=>{var i;(i=r.value)!=null&&i.style&&r.value.style.setProperty(l(e),s)}),n}function re({document:e=T}={}){if(!e)return u("visible");const t=u(e.visibilityState);return _(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var O=Object.getOwnPropertySymbols,G=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,q=(e,t)=>{var o={};for(var n in e)G.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&O)for(var n of O(e))t.indexOf(n)<0&&k.call(e,n)&&(o[n]=e[n]);return o};function ie(e,t,o={}){const n=o,{window:r=v}=n,s=q(n,["window"]);let i;const c=r&&"ResizeObserver"in r,a=()=>{i&&(i.disconnect(),i=void 0)},j=d(()=>x(e),g=>{a(),c&&r&&g&&(i=new r.ResizeObserver(t),i.observe(g,s))},{immediate:!0,flush:"post"}),h=()=>{a(),j()};return E(h),{isSupported:c,stop:h}}var P,S;w&&(window==null?void 0:window.navigator)&&((P=window==null?void 0:window.navigator)==null?void 0:P.platform)&&/iP(ad|hone|od)/.test((S=window==null?void 0:window.navigator)==null?void 0:S.platform);var A=Object.defineProperty,$=Object.getOwnPropertySymbols,H=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable,z=(e,t,o)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,Q=(e,t)=>{for(var o in t||(t={}))H.call(t,o)&&z(e,o,t[o]);if($)for(var o of $(t))J.call(t,o)&&z(e,o,t[o]);return e};const U={top:0,left:0,bottom:0,right:0,height:0,width:0};Q({text:""},U);function ae({window:e=v}={}){if(!e)return u(!1);const t=u(e.document.hasFocus());return _(e,"blur",()=>{t.value=!1}),_(e,"focus",()=>{t.value=!0}),t}const X=F({name:"Close"}),Y={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},Z=D("path",{fill:"currentColor",d:"M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z"},null,-1),ee=[Z];function te(e,t,o,n,r,s){return V(),B("svg",Y,ee)}var le=R(X,[["render",te]]);const C=Symbol("elForm"),oe=Symbol("elFormItem"),I=e=>{const t=K();return f(()=>{var o,n;return(n=(o=t.proxy)==null?void 0:o.$props[e])!=null?n:void 0})},ue=W({type:String,values:["",...M],default:""}),ce=(e,t={})=>{const o=u(void 0),n=t.prop?o:I("size"),r=t.global?o:N("size"),s=t.form?{size:void 0}:m(C,void 0),i=t.formItem?{size:void 0}:m(oe,void 0);return f(()=>n.value||l(e)||(i==null?void 0:i.size)||(s==null?void 0:s.size)||r.value||"default")},de=e=>{const t=I("disabled"),o=m(C,void 0);return f(()=>t.value||l(e)||(o==null?void 0:o.disabled)||!1)};export{ie as a,C as b,ce as c,ue as d,oe as e,de as f,se as g,le as h,re as i,ae as j,_ as u};
