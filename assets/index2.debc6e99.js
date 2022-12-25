import{d as L,_ as ye,o as F,c as X,a as q,b as U,aN as _e,J as j,x as H,r as W,n as E,u as v,h as J,w as Y,g as d,bh as ee,E as A,f as te,k as ae,T as Te,m as se,P as ue,p as K,aQ as de,e as ne,a9 as oe,v as w,B,D as Ne,ae as be,bi as R,G as le,aI as ce,bj as ke,bk as Ce,F as fe,af as Pe,X as we,aH as Q,Q as ve,K as $e,aC as Se,y as Ee,aK as Be,bl as re,av as xe,L as Oe,N as ze,al as Re}from"./index.f5381eae.js";import{u as Fe,U as pe}from"./index2.8cdfc5dc.js";import{a as Me}from"./arrow-left.1eca6407.js";const Ae=L({name:"Plus"}),Le={viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},Ve=q("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"},null,-1),De=[Ve];function Ie(e,c,$,g,t,p){return F(),X("svg",Le,De)}var Ke=ye(Ae,[["render",Ie]]);const G=Symbol("tabsRootContextKey"),He=U({closable:Boolean,type:{type:String,values:["success","info","warning","danger",""],default:""},hit:Boolean,disableTransitions:Boolean,color:{type:String,default:""},size:{type:String,values:_e,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),Ue={close:e=>e instanceof MouseEvent,click:e=>e instanceof MouseEvent},je={name:"ElTag"},qe=L({...je,props:He,emits:Ue,setup(e,{emit:c}){const $=e,g=Fe(),t=j("tag"),p=H(()=>{const{type:n,hit:f,effect:b,closable:r,round:y}=$;return[t.b(),t.is("closable",r),t.m(n),t.m(g.value),t.m(b),t.is("hit",f),t.is("round",y)]}),k=n=>{n.stopPropagation(),c("close",n)},s=n=>{c("click",n)};return(n,f)=>n.disableTransitions?(F(),J(Te,{key:1,name:`${v(t).namespace.value}-zoom-in-center`},{default:Y(()=>[q("span",{class:E(v(p)),style:ae({backgroundColor:n.color}),onClick:s},[q("span",{class:E(v(t).e("content"))},[W(n.$slots,"default")],2),n.closable?(F(),J(v(A),{key:0,class:E(v(t).e("close")),onClick:k},{default:Y(()=>[d(v(ee))]),_:1},8,["class"])):te("v-if",!0)],6)]),_:3},8,["name"])):(F(),X("span",{key:0,class:E(v(p)),style:ae({backgroundColor:n.color}),onClick:s},[q("span",{class:E(v(t).e("content"))},[W(n.$slots,"default")],2),n.closable?(F(),J(v(A),{key:0,class:E(v(t).e("close")),onClick:k},{default:Y(()=>[d(v(ee))]),_:1},8,["class"])):te("v-if",!0)],6))}});var Qe=se(qe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const ut=ue(Qe),We=U({tabs:{type:K(Array),default:()=>de([])}}),Xe={name:"ElTabBar"},Ge=L({...Xe,props:We,setup(e,{expose:c}){const $=e,g="ElTabBar",t=le(),p=ne(G);p||oe(g,"<el-tabs><el-tab-bar /></el-tabs>");const k=j("tabs"),s=w(),n=w(),f=()=>{let r=0,y=0;const a=["top","bottom"].includes(p.props.tabPosition)?"width":"height",i=a==="width"?"x":"y";return $.tabs.every(m=>{var S,M,V,D;const x=(M=(S=t.parent)==null?void 0:S.refs)==null?void 0:M[`tab-${m.paneName}`];if(!x)return!1;if(!m.active)return!0;y=x[`client${R(a)}`];const I=i==="x"?"left":"top";r=x.getBoundingClientRect()[I]-((D=(V=x.parentElement)==null?void 0:V.getBoundingClientRect()[I])!=null?D:0);const O=window.getComputedStyle(x);return a==="width"&&($.tabs.length>1&&(y-=Number.parseFloat(O.paddingLeft)+Number.parseFloat(O.paddingRight)),r+=Number.parseFloat(O.paddingLeft)),!1}),{[a]:`${y}px`,transform:`translate${R(i)}(${r}px)`}},b=()=>n.value=f();return B(()=>$.tabs,async()=>{await Ne(),b()},{immediate:!0}),be(s,()=>b()),c({ref:s,update:b}),(r,y)=>(F(),X("div",{ref_key:"barRef",ref:s,class:E([v(k).e("active-bar"),v(k).is(v(p).props.tabPosition)]),style:ae(n.value)},null,6))}});var Je=se(Ge,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);const Ye=U({panes:{type:K(Array),default:()=>de([])},currentName:{type:[String,Number],default:""},editable:Boolean,onTabClick:{type:K(Function),default:ce},onTabRemove:{type:K(Function),default:ce},type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),ie="ElTabNav",Ze=L({name:ie,props:Ye,setup(e,{expose:c}){const $=le(),g=ne(G);g||oe(ie,"<el-tabs><tab-nav /></el-tabs>");const t=j("tabs"),p=ke(),k=Ce(),s=w(),n=w(),f=w(),b=w(!1),r=w(0),y=w(!1),a=w(!0),i=H(()=>["top","bottom"].includes(g.props.tabPosition)?"width":"height"),m=H(()=>({transform:`translate${i.value==="width"?"X":"Y"}(-${r.value}px)`})),S=()=>{if(!s.value)return;const o=s.value[`offset${R(i.value)}`],u=r.value;if(!u)return;const l=u>o?u-o:0;r.value=l},M=()=>{if(!s.value||!n.value)return;const o=n.value[`offset${R(i.value)}`],u=s.value[`offset${R(i.value)}`],l=r.value;if(o-l<=u)return;const C=o-l>u*2?l+u:o-u;r.value=C},V=()=>{const o=n.value;if(!b.value||!f.value||!s.value||!o)return;const u=f.value.querySelector(".is-active");if(!u)return;const l=s.value,C=["top","bottom"].includes(g.props.tabPosition),T=u.getBoundingClientRect(),_=l.getBoundingClientRect(),P=C?o.offsetWidth-_.width:o.offsetHeight-_.height,N=r.value;let h=N;C?(T.left<_.left&&(h=N-(_.left-T.left)),T.right>_.right&&(h=N+T.right-_.right)):(T.top<_.top&&(h=N-(_.top-T.top)),T.bottom>_.bottom&&(h=N+(T.bottom-_.bottom))),h=Math.max(h,0),r.value=Math.min(h,P)},D=()=>{if(!n.value||!s.value)return;const o=n.value[`offset${R(i.value)}`],u=s.value[`offset${R(i.value)}`],l=r.value;if(u<o){const C=r.value;b.value=b.value||{},b.value.prev=C,b.value.next=C+u<o,o-C<u&&(r.value=o-u)}else b.value=!1,l>0&&(r.value=0)},x=o=>{const u=o.code,{up:l,down:C,left:T,right:_}=Q;if(![l,C,T,_].includes(u))return;const P=Array.from(o.currentTarget.querySelectorAll("[role=tab]")),N=P.indexOf(o.target);let h;u===T||u===l?N===0?h=P.length-1:h=N-1:N<P.length-1?h=N+1:h=0,P[h].focus(),P[h].click(),I()},I=()=>{a.value&&(y.value=!0)},O=()=>y.value=!1;return B(p,o=>{o==="hidden"?a.value=!1:o==="visible"&&setTimeout(()=>a.value=!0,50)}),B(k,o=>{o?setTimeout(()=>a.value=!0,50):a.value=!1}),be(f,D),fe(()=>setTimeout(()=>V(),0)),Pe(()=>D()),c({scrollToActiveTab:V,removeFocus:O}),B(()=>e.panes,()=>$.update(),{flush:"post"}),()=>{const o=b.value?[d("span",{class:[t.e("nav-prev"),t.is("disabled",!b.value.prev)],onClick:S},[d(A,null,{default:()=>[d(Me,null,null)]})]),d("span",{class:[t.e("nav-next"),t.is("disabled",!b.value.next)],onClick:M},[d(A,null,{default:()=>[d(we,null,null)]})])]:null,u=e.panes.map((l,C)=>{var T,_;const P=l.props.name||l.index||`${C}`,N=l.isClosable||e.editable;l.index=`${C}`;const h=N?d(A,{class:"is-icon-close",onClick:z=>e.onTabRemove(l,z)},{default:()=>[d(ee,null,null)]}):null,ge=((_=(T=l.slots).label)==null?void 0:_.call(T))||l.props.label,he=l.active?0:-1;return d("div",{ref:`tab-${P}`,class:[t.e("item"),t.is(g.props.tabPosition),t.is("active",l.active),t.is("disabled",l.props.disabled),t.is("closable",N),t.is("focus",y.value)],id:`tab-${P}`,key:`tab-${P}`,"aria-controls":`pane-${P}`,role:"tab","aria-selected":l.active,tabindex:he,onFocus:()=>I(),onBlur:()=>O(),onClick:z=>{O(),e.onTabClick(l,P,z)},onKeydown:z=>{N&&(z.code===Q.delete||z.code===Q.backspace)&&e.onTabRemove(l,z)}},[ge,h])});return d("div",{ref:f,class:[t.e("nav-wrap"),t.is("scrollable",!!b.value),t.is(g.props.tabPosition)]},[o,d("div",{class:t.e("nav-scroll"),ref:s},[d("div",{class:[t.e("nav"),t.is(g.props.tabPosition),t.is("stretch",e.stretch&&["top","bottom"].includes(g.props.tabPosition))],ref:n,style:m.value,role:"tablist",onKeydown:x},[e.type?null:d(Je,{tabs:[...e.panes]},null),u])])])}}}),et=U({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number],default:""},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number],default:""},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:K(Function),default:()=>!0},stretch:Boolean}),Z=e=>Se(e)||Ee(e),tt={[pe]:e=>Z(e),"tab-click":(e,c)=>c instanceof Event,"tab-change":e=>Z(e),edit:(e,c)=>["remove","add"].includes(c),"tab-remove":e=>Z(e),"tab-add":()=>!0};var at=L({name:"ElTabs",props:et,emits:tt,setup(e,{emit:c,slots:$,expose:g}){const t=j("tabs"),p=w(),k=ve({}),s=w(e.modelValue||e.activeName||"0"),n=a=>{s.value=a,c(pe,a),c("tab-change",a)},f=async a=>{var i,m,S;if(s.value!==a)try{await((i=e.beforeLeave)==null?void 0:i.call(e,a,s.value))!==!1&&(n(a),(S=(m=p.value)==null?void 0:m.removeFocus)==null||S.call(m))}catch{}},b=(a,i,m)=>{a.props.disabled||(f(i),c("tab-click",a,m))},r=(a,i)=>{a.props.disabled||(i.stopPropagation(),c("edit",a.props.name,"remove"),c("tab-remove",a.props.name))},y=()=>{c("edit",void 0,"add"),c("tab-add")};return B(()=>e.activeName,a=>f(a)),B(()=>e.modelValue,a=>f(a)),B(s,async()=>{var a;(a=p.value)==null||a.scrollToActiveTab()}),$e(G,{props:e,currentName:s,registerPane:m=>k[m.uid]=m,unregisterPane:m=>delete k[m]}),g({currentName:s}),()=>{const a=e.editable||e.addable?d("span",{class:t.e("new-tab"),tabindex:"0",onClick:y,onKeydown:S=>{S.code===Q.enter&&y()}},[d(A,{class:t.is("icon-plus")},{default:()=>[d(Ke,null,null)]})]):null,i=d("div",{class:[t.e("header"),t.is(e.tabPosition)]},[a,d(Ze,{ref:p,currentName:s.value,editable:e.editable,type:e.type,panes:Object.values(k),stretch:e.stretch,onTabClick:b,onTabRemove:r},null)]),m=d("div",{class:t.e("content")},[W($,"default")]);return d("div",{class:[t.b(),t.m(e.tabPosition),{[t.m("card")]:e.type==="card",[t.m("border-card")]:e.type==="border-card"}]},[...e.tabPosition!=="bottom"?[i,m]:[m,i]])}}});const st=U({label:{type:String,default:""},name:{type:[String,Number],default:""},closable:Boolean,disabled:Boolean,lazy:Boolean}),nt=["id","aria-hidden","aria-labelledby"],ot={name:"ElTabPane"},lt=L({...ot,props:st,setup(e){const c=e,$="ElTabPane",g=le(),t=Be(),p=ne(G);p||oe($,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const k=j("tab-pane"),s=w(),n=H(()=>c.closable||p.props.closable),f=re(()=>p.currentName.value===(c.name||s.value)),b=w(f.value),r=H(()=>c.name||s.value),y=re(()=>!c.lazy||b.value||f.value);B(f,i=>{i&&(b.value=!0)});const a=ve({uid:g.uid,slots:t,props:c,paneName:r,active:f,index:s,isClosable:n});return fe(()=>{p.registerPane(a)}),xe(()=>{p.unregisterPane(a.uid)}),(i,m)=>v(y)?Oe((F(),X("div",{key:0,id:`pane-${v(r)}`,class:E(v(k).b()),role:"tabpanel","aria-hidden":!v(f),"aria-labelledby":`tab-${v(r)}`},[W(i.$slots,"default")],10,nt)),[[ze,v(f)]]):te("v-if",!0)}});var me=se(lt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);const dt=ue(at,{TabPane:me}),bt=Re(me);export{ut as E,dt as a,bt as b,He as t};