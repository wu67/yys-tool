import{a as B,l as t,e as f,G as ee,o as h,j as R,i as o,w as r,H as te,h as i,I as H,J as ae,m as N,u as le,K as $,g as S,L as T,p as ne,M as D,N as de,O as oe,P as M,F,k as P,t as C,Q as v,R as U}from"./vendor.8c6d1b24.js";import{_ as q,u as se}from"./index.67f93028.js";const re={class:"dialogSetNotIncluded"},ue={class:"flex center"},ie=N(" \u4FDD\u5B58 "),ce=B({name:"DialogSetNotIncluded"}),fe=Object.assign(ce,{props:{notIncluded:{type:Array,default(){return[]}},allHeroList:{type:Array,default(){return[]}},userName:{type:String,default:""},modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","change-not-included"],setup(A,{emit:L}){const I=A,g=t(I.allHeroList).map(u=>({key:u.id,label:u.name})),w=function(u){L("update:modelValue",!1),typeof u=="function"&&u()},y=f(I.notIncluded),_=f(!1);ee(()=>{_.value=I.modelValue});const m=()=>{L("change-not-included",t(y).map(u=>parseInt(u))),w(),_.value=!1};return(u,p)=>(h(),R("div",re,[o(t(ae),{modelValue:_.value,"onUpdate:modelValue":p[1]||(p[1]=b=>_.value=b),title:`\u8BBE\u7F6E\u672A\u6536\u5F55 - ${A.userName}`,width:"650px","before-close":w},{default:r(()=>[o(t(te),{modelValue:y.value,"onUpdate:modelValue":p[0]||(p[0]=b=>y.value=b),style:{margin:"0 auto"},data:t(g),titles:["\u5DF2\u6536\u5F55","\u672A\u6536\u5F55"],filterable:""},null,8,["modelValue","data"]),i("div",ue,[o(t(H),{type:"primary",onClick:m},{default:r(()=>[ie]),_:1})])]),_:1},8,["modelValue","title"])]))}});var ve=q(fe,[["__scopeId","data-v-f632dbf0"]]);const he={class:"page-shards-list"},_e={class:"flex between",style:{"margin-bottom":"8px"}},me=N(" \u5168\u90E8 "),pe=N(" \u6E05\u7A7A\u7A00\u6709\u5EA6 "),ge=N(" \u91CD\u7F6E\u6240\u6709\u8FC7\u6EE4\u9879 "),ye={style:{height:"calc(100vh - 172px)"}},be={class:"flex center"},ke=N(" \xA0 "),Ve=["onClick"],Ne=B({name:"HeroList"}),Se=Object.assign(Ne,{setup(A){const{updateUserNotIncluded:L,getNotIncluded:I}=se(),g=le(),w=$(()=>g.state.allHeroList),y=$(()=>g.state.notIncludedList),_=$(()=>g.state.user.list),m=f([{name:"SP",value:"SP"},{name:"SSR",value:"SSR"},{name:"SR",value:"SR"},{name:"R",value:"R"},{name:"N",value:"N"},{name:"\u7D20\u6750",value:"MATERIAL"},{name:"\u8054\u52A8",value:"INTERACTIVE"}]);let u=f([]),p=f([]);const b=function(){u.value=w.value.sort((a,e)=>e.id-a.id).map(a=>{let e={name:a.name,rarity:a.rarity,id:a.id,shards:[],included:[],have:[],required:0,holdings:0};a.interactive===!0&&(e.interactive=!0),_.value.forEach((n,s)=>{n.data.hero_book_shards.forEach(x=>{e.id===x.hero_id&&(e.bookMaxShards=x.book_max_shards,e.shards[s]=x.shards)}),p[s]=Array.from(new Set(n.data.heroes.map(x=>x.hero_id))),e.included[s]=t(y)[s].indexOf(parseInt(a.id))!==-1?0:1,e.have[s]=p[s].indexOf(parseInt(a.id))!==-1?1:0}),e.holdings=e.shards.reduce((n,s)=>(n+=s,n),0);const l=e.included.reduce((n,s)=>s===0?++n:n,0),d=e.bookMaxShards*l-e.holdings;return e.required=d>0?d:"-",e})},z=function(a){let e="";return m.value.forEach(l=>{l.value==a&&(e=l.name)}),e};let c=f(["SP","SSR"]);const G=$(()=>{let a=[];return c.value.indexOf("INTERACTIVE")!==-1?a=u.value.filter(e=>c.value.indexOf(e.rarity)!==-1||e.interactive):a=u.value.filter(e=>c.value.indexOf(e.rarity)!==-1&&typeof e.interactive=="undefined"),a});let O=f(!0);const J=function(a){c.value=a?m.value.map(e=>e.value):[],O.value=!1};let E=f(!1);const K=function(a){E.value=a.length===m.value.length,O.value=a.length>0&&a.length<m.value.length};let j=f(null);const Q=function(){j.value.clearFilter()},W=function(a,e,l){return a===e.included[l]},X=function(a,e,l){return a===e.have[l]};let k=f(-1),V=f(!1);const Y=function(a){k.value=a,V.value=!0},Z=function(a){g.commit("updateNotIncluded",{index:k.value,value:a}),L(k.value,{id:_.value[k.value].data.player.id,value:t(a)}).then(()=>{M.success("\u8BBE\u7F6E\u672A\u6536\u5F55\u6210\u529F"),b()}).catch(e=>{M.error(e.message||"\u8BBE\u7F6E\u672A\u6536\u5F55\u51FA\u9519")})};return I().then(()=>{b()}),(a,e)=>(h(),R("div",he,[t(V)?(h(),S(ve,{key:0,modelValue:t(V),"onUpdate:modelValue":e[0]||(e[0]=l=>T(V)?V.value=l:V=l),"user-name":t(_)[t(k)].data.player.name,"not-included":t(y)[t(k)],"all-hero-list":t(w),onChangeNotIncluded:Z},null,8,["modelValue","user-name","not-included","all-hero-list"])):ne("",!0),i("div",_e,[i("div",null,[o(t(D),{modelValue:t(E),"onUpdate:modelValue":e[1]||(e[1]=l=>T(E)?E.value=l:E=l),label:"all",indeterminate:t(O),onChange:J},{default:r(()=>[me]),_:1},8,["modelValue","indeterminate"]),o(t(de),{modelValue:t(c),"onUpdate:modelValue":e[2]||(e[2]=l=>T(c)?c.value=l:c=l),onChange:K},{default:r(()=>[(h(!0),R(F,null,P(m.value,l=>(h(),S(t(D),{key:l.value,label:l.value},{default:r(()=>[N(C(l.name),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),i("div",null,[o(t(H),{size:"mini",onClick:e[3]||(e[3]=l=>T(c)?c.value=[]:c=[])},{default:r(()=>[pe]),_:1}),o(t(H),{size:"mini",onClick:Q},{default:r(()=>[ge]),_:1})])]),i("div",ye,[o(t(oe),{ref_key:"shardTableRef",ref:j,data:t(G),"highlight-current-row":"",stripe:"",border:"",height:"100%",style:{width:"100%"}},{default:r(()=>[o(t(v),{type:"index",width:"50"}),o(t(v),{prop:"id",label:"ID",width:"80"}),o(t(v),{prop:"name",label:"\u540D\u79F0",width:"110"}),o(t(v),{label:"\u7A00\u6709\u5EA6",width:"80"},{default:r(l=>[i("div",{class:U(["rarity",`${l.row.rarity}`])},C(z(l.row.rarity)),3)]),_:1}),(h(!0),R(F,null,P(t(_),(l,d)=>(h(),S(t(v),{key:`userColumn${d}`,align:"center",label:`${l.data.player.name}`},{header:r(()=>[i("div",be,[i("div",null,C(l.data.player.name),1),ke,i("div",{class:"btnSetNotIncluded",onClick:n=>Y(d)}," \u8BBE\u7F6E\u672A\u6536\u5F55 ",8,Ve)])]),default:r(()=>[(h(),S(t(v),{key:`shard${d}`,label:"\u6301\u6709\u788E\u7247"},{default:r(n=>[i("div",null,C(n.row.shards[d]),1)]),_:2},1024)),(h(),S(t(v),{key:`included${d}`,filters:[{text:"\u5DF2\u6536\u5F55",value:1},{text:"\u672A\u6536\u5F55",value:0}],"filter-method":(n,s)=>W(n,s,d),label:"\u6536\u5F55\u72B6\u6001"},{default:r(n=>[i("div",{class:U({"not-included":n.row.included[d]===0})},C(n.row.included[d]===1?"":"\u672A\u6536\u5F55"),3)]),_:2},1032,["filter-method"])),(h(),S(t(v),{key:`have${d}`,filters:[{text:"\u4ED3\u5E93\u4E2D\u6709",value:1},{text:"\u4ED3\u5E93\u4E2D\u65E0",value:0}],"filter-method":(n,s)=>X(n,s,d),label:"\u4ED3\u68C0"},{default:r(n=>[i("div",{class:U({"have-not":n.row.have[d]===0})},C(n.row.have[d]===1?"":"\u4ED3\u5E93\u4E2D\u65E0"),3)]),_:2},1032,["filter-method"]))]),_:2},1032,["label"]))),128)),o(t(v),{prop:"name",label:"\u540D\u79F0",width:"110"}),o(t(v),{label:"\u5171\u6709\u788E\u7247",prop:"holdings",width:"80"}),o(t(v),{label:"\u4ECD\u7F3A",prop:"required",width:"80"})]),_:1},8,["data"])])]))}});var we=q(Se,[["__scopeId","data-v-41bbaf49"]]);export{we as default};
