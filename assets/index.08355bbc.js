import{D as P,r as k,u as g,d as H,a as N,b as L,c as x,e as R,f as D,o as f,g as p,w as A,h as I,i as b,j as O,k as q,l as C,E as $,m as T,t as U,F as M,n as B,p as V,q as J,z as F,s as Y,v as j,x as z,y as W,A as K,B as G,C as Q}from"./vendor.f89eea35.js";const X=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))d(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}};X();function Z(){const e=new P("yyx-tool");return e.user&&e.not_included||e.version(1).stores({user:"user_id,content",not_included:"user_id,content"}),e}const ee=Z();function te(){let e=k({});e=ee;const t=g(),a=k([360,359,337,336,319,313,314,310,309,308,305,294,373]);return{db:e,commonNotIncluded:a,formatTime:(m,l="YYYY-MM-DD HH:mm:ss")=>{let c="";return m&&(c=H(m).format(l)),c},updateUserData:(m=-1,l)=>{m===-1?e.user.add({user_id:l.data.player.id,content:l}):e.user.update(l.data.player.id,{user_id:l.data.player.id,content:l})},getUserData:()=>{let m=[];return e.user.each(l=>{m.push(l.content)}).then(()=>(t.commit("user/updateUserDataByIndex",{index:-2,value:m}),m)).catch(()=>{console.log("getUserData error")})},deleteUserData:m=>{if(m==="all"){const l=[e.user.clear(),e.not_included.clear()];return Promise.all(l)}else{const l=[e.user.where({user_id:m}).delete(),e.not_included.where({user_id:m}).delete()];return Promise.all(l)}},updateUserNotIncluded:(m=-1,l)=>m===-1?e.not_included.add({user_id:l.id,content:P.deepClone(l.value)}):e.not_included.update(l.id,{user_id:l.id,content:P.deepClone(l.value)}),getNotIncluded:()=>{let m=[];return e.not_included.each(l=>{m.push(l.content)}).then(()=>(t.commit("updateNotIncluded",{index:-2,value:m}),m))}}}var ae=(e,t)=>{const a=e.__vccOpts||e;for(const[d,n]of t)a[d]=n;return a};const ie={class:"menu-wrap"},le=N({name:"App"}),ne=Object.assign(le,{setup(e){const{getUserData:t}=te(),a=g(),d=L(),n=x(),i=R(""),r=R([{name:"\u788E\u7247\u5217\u8868",path:"heroList"},{name:"\u5FA1\u9B42\u5217\u8868",path:"equipList"},{name:"\u5FA1\u9B42\u5206\u6790",path:"equipAnalysis"},{name:"\u7528\u6237\u6570\u636E",path:"userData"},{name:"\u5173\u4E8E",path:"aboutThis"}]);a.dispatch("getAllHeroData"),a.dispatch("getEquipData");const v=R(!0);t().then(l=>{if(l.length<1&&d.fullPath.indexOf("aboutThis")===-1){v.value=!1,s("userData"),i.value="userData";return}v.value=!1,setTimeout(()=>{r.value.forEach(c=>{d.fullPath.indexOf(c.path)!==-1&&(i.value=c.path)})},500)});const s=l=>{d.fullPath.indexOf(l)===-1&&n.replace(`/${l}`)},m=R(F);return(l,c)=>{const w=D("router-view");return f(),p(C(J),{locale:m.value},{default:A(()=>[I("div",ie,[b(C(B),{"default-active":i.value,"background-color":"#545c64","active-text-color":"#ffd04b","text-color":"#eee",mode:"horizontal",onSelect:s},{default:A(()=>[(f(!0),O(M,null,q(r.value,S=>(f(),p(C($),{key:S.path,index:S.path},{default:A(()=>[T(U(S.name),1)]),_:2},1032,["index"]))),128))]),_:1},8,["default-active"])]),v.value?V("",!0):(f(),p(w,{key:0}))]),_:1},8,["locale"])}}});var re=ae(ne,[["__scopeId","data-v-af9cd30e"]]);const de="modulepreload",h={},me="/yys-tool/",o=function(t,a){return!a||a.length===0?t():Promise.all(a.map(d=>{if(d=`${me}${d}`,d in h)return;h[d]=!0;const n=d.endsWith(".css"),i=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${i}`))return;const r=document.createElement("link");if(r.rel=n?"stylesheet":de,n||(r.as="script",r.crossOrigin=""),r.href=d,document.head.appendChild(r),n)return new Promise((v,s)=>{r.addEventListener("load",v),r.addEventListener("error",()=>s(new Error(`Unable to preload CSS for ${d}`)))})})).then(()=>t())},se=Y({history:j(),routes:[{path:"/",redirect:"/heroList"},{name:"heroList",path:"/heroList",component:()=>o(()=>import("./heroList.533143e9.js"),["assets/heroList.533143e9.js","assets/heroList.c9074836.css","assets/vendor.f89eea35.js"])},{name:"equipList",path:"/equipList",component:()=>o(()=>import("./equipList.e54d81d5.js"),["assets/equipList.e54d81d5.js","assets/equipList.c23fab01.css","assets/vendor.f89eea35.js"])},{name:"userData",path:"/userData",component:()=>o(()=>import("./userData.7ebe762b.js"),["assets/userData.7ebe762b.js","assets/userData.ad5ce49f.css","assets/vendor.f89eea35.js"])},{name:"equipAnalysis",path:"/equipAnalysis",component:()=>o(()=>import("./equipAnalysis.0c8dfa19.js"),["assets/equipAnalysis.0c8dfa19.js","assets/equipAnalysis.7d626e09.css","assets/vendor.f89eea35.js"])},{name:"aboutThis",path:"/aboutThis",component:()=>o(()=>import("./aboutThis.73e00fee.js"),["assets/aboutThis.73e00fee.js","assets/aboutThis.2da1f908.css","assets/vendor.f89eea35.js"])}],scrollBehavior(e,t,a){return a||{left:0,top:0}}});var _={transNumberToChinese(e){return z.encodeS(e)},multiply(e,t=100){return parseFloat((e*t).toPrecision(12))},getAttrSum(e,t){let a=0;return a+=e[`${t}`]||0,e.mainAttr.type===t&&(a=a+e.mainAttr.value),e.single_attrs.length>0&&e.single_attrs[0].type===t&&(a=a+e.single_attrs[0].value),a}},ve={namespaced:!0,state(){return{list:[]}},getters:{list(e,t,a){return e.list.map(d=>{let n=JSON.parse(JSON.stringify(W(d)));return n.data.hero_equips=d.data.hero_equips.map(i=>{const r={id:i.id,single_attrs:[],born:i.born,level:i.level,pos:i.pos,quality:i.quality,suit_id:i.suit_id,randomAttrsLength:i.random_attrs.length||0,mainAttr:{type:i.base_attr.type,value:0},effectAttrCount:0},v=a.equipList.filter(s=>s.id===i.suit_id)[0].effectiveAttr;for(const s of i.random_attrs)if(a.notPercentAttr.indexOf(s.type)===-1?r[`${s.type}`]=_.multiply(s.value):r[`${s.type}`]=s.value,v.indexOf(s.type)!==-1){const m=a.attrList.filter(l=>l.key===s.type)[0];r.effectAttrCount=r.effectAttrCount+Math.round(r[`${s.type}`]/m.avgStep)}return a.notPercentAttr.indexOf(i.base_attr.type)===-1?r.mainAttr.value=_.multiply(i.base_attr.value):r.mainAttr.value=i.base_attr.value,i.single_attrs.length>0&&(r.single_attrs.push({type:i.single_attrs[0].type,value:_.multiply(i.single_attrs[0].value)}),v.indexOf(i.single_attrs[0].type)!==-1&&(r.effectAttrCount=r.effectAttrCount+3)),r}),n})}},actions:{},mutations:{updateUserDataByIndex(e,t){t.index===-1?e.list.push(t.value):t.index===-2?e.list=t.value:e.list[t.index]=t.value}}},y=[{name:"\u8FE6\u697C\u7F57",level:"SR",id:378},{name:"\u68A6\u5BFB\u5C71\u5154",level:"SP",id:377},{name:"\u94C3\u5F66\u59EC",level:"SSR",id:376},{name:"\u591C\u5200\u795E",level:"SSR",interactive:!0,id:373},{name:"\u56E0\u5E61\u8F89\u591C\u59EC",level:"SP",id:372},{name:"\u5DDD\u733F",level:"SR",id:371},{name:"\u996D\u7B25",level:"SSR",id:370},{name:"\u98DF\u7075",level:"SSR",id:369},{name:"\u9974\u7EC6\u5DE5",level:"SR",id:368},{name:"\u7ED8\u4E16\u82B1\u9E1F\u5377",level:"SP",id:367},{name:"\u7A7A\u76F8\u9762\u7075\u6C14",level:"SP",id:366},{name:"\u5165\u5185\u96C0",level:"SR",id:365},{name:"\u5FA1\u9994\u6D25\u5471",level:"N",id:430},{name:"\u7389\u85FB\u524D\u5471",level:"N",id:429},{name:"\u96EA\u7AE5\u5B50\u5471",level:"N",id:428},{name:"\u963F\u4FEE\u7F57",level:"SSR",id:364},{name:"\u5E1D\u91CA\u5929",level:"SSR",id:363},{name:"\u8749\u51B0\u96EA\u5973",level:"SP",id:362},{name:"\u57A2\u5C1D",level:"R",id:361},{name:"\u7076\u95E8\u7962\u8C46\u5B50",level:"SSR",interactive:!0,id:360},{name:"\u7076\u95E8\u70AD\u6CBB\u90CE",level:"SSR",interactive:!0,id:359},{name:"\u591C\u6E9F\u5F7C\u5CB8\u82B1",level:"SP",id:358},{name:"\u521D\u7FCE\u5C71\u98CE",level:"SP",id:357},{name:"\u5343\u59EC",level:"SSR",id:356},{name:"\u9E93\u94ED\u5927\u5CB3\u4E38",level:"SP",id:355},{name:"\u5F85\u5BB5\u59D1\u83B7\u9E1F",level:"SP",id:354},{name:"\u7D27\u90A3\u7F57",level:"SSR",id:353},{name:"\u7F1A\u9AA8\u6E05\u59EC",level:"SP",id:352},{name:"\u94C3\u9E7F\u5FA1\u524D",level:"SSR",id:351},{name:"\u874E\u5973",level:"SR",id:350},{name:"\u98CE\u72F8",level:"SR",id:349},{name:"\u6D6E\u4E16\u9752\u884C\u706F",level:"SP",id:348},{name:"\u7F18\u7ED3\u795E",level:"SSR",id:347},{name:"\u8046\u6D77\u91D1\u9C7C\u59EC",level:"SP",id:346},{name:"\u9B3C\u7AE5\u4E38",level:"SSR",id:345},{name:"\u4E91\u5916\u955C",level:"SSR",id:344},{name:"\u5929\u5251\u97E7\u5FC3\u9B3C\u5207",level:"SP",id:343},{name:"\u661F\u718A\u7AE5\u5B50",level:"SR",id:342},{name:"\u9B3C\u738B\u9152\u541E\u7AE5\u5B50",level:"SP",id:341},{name:"\u7EB8\u821E",level:"SR",id:340},{name:"\u70EC\u5929\u7389\u85FB\u524D",level:"SP",id:339},{name:"\u6CF7\u591C\u53C9\u59EC",level:"SSR",id:338},{name:"\u9ED1\u5D0E\u4E00\u62A4",level:"SSR",interactive:!0,id:337},{name:"\u9732\u742A\u4E9A",level:"SR",interactive:!0,id:336},{name:"\u87F9\u59EC",level:"SR",id:335},{name:"\u9A81\u6D6A\u8352\u5DDD\u4E4B\u4E3B",level:"SP",id:334},{name:"\u5927\u5CB3\u4E38",level:"SSR",id:333},{name:"\u4E45\u6B21\u826F",level:"SR",id:332},{name:"\u5FA1\u6028\u822C\u82E5",level:"SP",id:331},{name:"\u6D77\u5FCD",level:"SR",id:329},{name:"\u4E0D\u77E5\u706B",level:"SSR",id:330},{name:"\u8D64\u5F71\u5996\u5200\u59EC",level:"SP",id:328},{name:"\u82CD\u98CE\u4E00\u76EE\u8FDE",level:"SP",id:327},{name:"\u7A3B\u8377\u795E\u5FA1\u9994\u6D25",level:"SP",id:326},{name:"\u5316\u9CB8",level:"SR",id:324},{name:"\u516B\u5C90\u5927\u86C7",level:"SSR",id:325},{name:"\u5929\u4E95\u4E0B",level:"R",id:323},{name:"\u70BC\u72F1\u8328\u6728\u7AE5\u5B50",level:"SP",id:322},{name:"\u5165\u6B93\u5E08",level:"SR",id:321},{name:"\u4E00\u53CD\u6728\u7EF5",level:"SR",id:320},{name:"\u65BC\u83CA\u866B",level:"SR",id:318},{name:"\u6854\u6897",level:"SSR",interactive:!0,id:319},{name:"\u4EBA\u9762\u6811",level:"SR",id:317},{name:"\u767D\u85CF\u4E3B",level:"SSR",id:316},{name:"\u5C11\u7FBD\u5927\u5929\u72D7",level:"SP",id:315},{name:"\u9B3C\u5207",level:"SSR",id:312},{name:"\u6740\u751F\u4E38",level:"SSR",interactive:!0,id:314},{name:"\u72AC\u591C\u53C9",level:"SSR",interactive:!0,id:313},{name:"\u5F7C\u5CB8\u82B1\u5471",level:"N",id:427},{name:"\u8352\u5471",level:"N",id:426},{name:"\u8F89\u591C\u59EC\u5471",level:"N",id:425},{name:"\u82B1\u9E1F\u5377\u5471",level:"N",id:424},{name:"\u4E00\u76EE\u8FDE\u5471",level:"N",id:423},{name:"\u5996\u5200\u59EC\u5471",level:"N",id:422},{name:"\u9752\u884C\u706F\u5471",level:"N",id:421},{name:"\u8328\u6728\u5471",level:"N",id:420},{name:"\u5C0F\u9E7F\u7537\u5471",level:"N",id:419},{name:"\u4E24\u9762\u4F5B\u5471",level:"N",id:418},{name:"\u960E\u9B54\u5471",level:"N",id:417},{name:"\u8352\u5DDD\u5471",level:"N",id:416},{name:"\u9152\u541E\u5471",level:"N",id:415},{name:"\u5927\u5929\u72D7\u5471",level:"N",id:414},{name:"\u9762\u7075\u6C14",level:"SSR",id:311},{name:"\u732B\u638C\u67DC",level:"SR",id:307},{name:"\u963F\u9999",level:"SR",interactive:!0,id:309},{name:"\u871C\u6843&\u82A5\u5B50",level:"R",interactive:!0,id:310},{name:"\u9B3C\u706F",level:"SSR",interactive:!0,id:308},{name:"\u5974\u826F\u9646\u751F",level:"SSR",interactive:!0,id:294},{name:"\u5356\u836F\u90CE",level:"SSR",interactive:!0,id:305},{name:"\u866B\u5E08",level:"R",id:306},{name:"\u85B0",level:"SR",id:298},{name:"\u5C71\u98CE",level:"SSR",id:296},{name:"\u5C0F\u8896\u4E4B\u624B",level:"R",id:302},{name:"\u5F08",level:"SR",id:303},{name:"\u5FA1\u9994\u6D25",level:"SSR",id:304},{name:"\u65E5\u548C\u574A",level:"SR",id:297},{name:"\u8FFD\u6708\u795E",level:"SR",id:295},{name:"\u6570\u73E0",level:"R",id:301},{name:"\u7389\u85FB\u524D",level:"SSR",id:300},{name:"\u767E\u76EE\u9B3C",level:"SR",id:293},{name:"\u96EA\u7AE5\u5B50",level:"SSR",id:292},{name:"\u4E66\u7FC1",level:"SR",id:291},{name:"\u5154\u4E38",level:"R",id:289},{name:"\u5C0F\u677E\u4E38",level:"SR",id:290},{name:"\u5F7C\u5CB8\u82B1",level:"SSR",id:288},{name:"\u5323\u4E2D\u5C11\u5973",level:"SR",id:287},{name:"\u9E29",level:"SR",id:285},{name:"\u4EE5\u6D25\u771F\u5929",level:"SR",id:286},{name:"\u4E07\u5E74\u7AF9",level:"SR",id:275},{name:"\u91D1\u9C7C\u59EC",level:"SR",id:282},{name:"\u8352",level:"SSR",id:283},{name:"\u9752\u574A\u4E3B",level:"SR",id:273},{name:"\u53E4\u7B3C\u706B",level:"R",id:274},{name:"\u591C\u53C9",level:"SR",id:276},{name:"\u9ED1\u7AE5\u5B50",level:"SR",id:277},{name:"\u767D\u7AE5\u5B50",level:"SR",id:278},{name:"\u82B1\u9E1F\u5377",level:"SSR",id:279},{name:"\u70DF\u70DF\u7F57",level:"SR",id:281},{name:"\u8F89\u591C\u59EC",level:"SSR",id:280},{name:"\u767D\u72FC",level:"SR",id:264},{name:"\u822C\u82E5",level:"SR",id:271},{name:"\u5175\u4FD1",level:"R",id:227},{name:"\u8D64\u820C",level:"N",id:246},{name:"\u4E11\u65F6\u4E4B\u5973",level:"R",id:228},{name:"\u8328\u6728\u7AE5\u5B50",level:"SSR",id:265},{name:"\u5927\u5929\u72D7",level:"SSR",id:217},{name:"\u76D7\u5893\u5C0F\u9B3C",level:"N",id:400},{name:"\u706F\u7B3C\u9B3C",level:"N",id:203},{name:"\u72EC\u773C\u5C0F\u50E7",level:"R",id:230},{name:"\u997F\u9B3C",level:"R",id:214},{name:"\u4E8C\u53E3\u5973",level:"SR",id:263},{name:"\u51E4\u51F0\u706B",level:"SR",id:252},{name:"\u59D1\u83B7\u9E1F",level:"SR",id:262},{name:"\u9AA8\u5973",level:"SR",id:223},{name:"\u7BA1\u72D0",level:"R",id:236},{name:"\u9B3C\u5973\u7EA2\u53F6",level:"SR",id:231},{name:"\u9B3C\u4F7F\u767D",level:"SR",id:210},{name:"\u9B3C\u4F7F\u9ED1",level:"SR",id:211},{name:"\u6D77\u574A\u4E3B",level:"SR",id:247},{name:"\u6CB3\u7AE5",level:"R",id:209},{name:"\u8774\u8776\u7CBE",level:"R",id:241},{name:"\u8352\u5DDD\u4E4B\u4E3B",level:"SSR",id:248},{name:"\u60E0\u6BD4\u5BFF",level:"SR",id:268},{name:"\u5BC4\u751F\u9B42",level:"N",id:401},{name:"\u6912\u56FE",level:"R",id:234},{name:"\u89C9",level:"R",id:249},{name:"\u4E5D\u547D\u732B",level:"R",id:207},{name:"\u9152\u541E\u7AE5\u5B50",level:"SSR",id:219},{name:"\u5080\u5121\u5E08",level:"SR",id:242},{name:"\u72F8\u732B",level:"R",id:208},{name:"\u9CA4\u9C7C\u7CBE",level:"R",id:206},{name:"\u9570\u9F2C",level:"SR",id:261},{name:"\u4E24\u9762\u4F5B",level:"SSR",id:258},{name:"\u7EDC\u65B0\u5987",level:"SR",id:270},{name:"\u5B5F\u5A46",level:"SR",id:215},{name:"\u5224\u5B98",level:"SR",id:251},{name:"\u9752\u884C\u706F",level:"SSR",id:266},{name:"\u9752\u86D9\u74F7\u5668",level:"R",id:250},{name:"\u6E05\u59EC",level:"SR",id:260},{name:"\u72AC\u795E",level:"SR",id:220},{name:"\u4E09\u5C3E\u72D0",level:"R",id:202},{name:"\u5C71\u7AE5",level:"R",id:243},{name:"\u5C71\u5154",level:"R",id:237},{name:"\u98DF\u53D1\u9B3C",level:"R",id:221},{name:"\u98DF\u68A6\u8C98",level:"SR",id:257},{name:"\u9996\u65E0",level:"R",id:244},{name:"\u5510\u7EB8\u4F1E\u5996",level:"N",id:403},{name:"\u6843\u82B1\u5996",level:"SR",id:200},{name:"\u63D0\u706F\u5C0F\u50E7",level:"N",id:245},{name:"\u5929\u90AA\u9B3C\u8D64",level:"N",id:405},{name:"\u5929\u90AA\u9B3C\u9EC4",level:"N",id:406},{name:"\u5929\u90AA\u9B3C\u7EFF",level:"N",id:404},{name:"\u5929\u90AA\u9B3C\u9752",level:"N",id:407},{name:"\u8DF3\u8DF3\u5F1F\u5F1F",level:"R",id:225},{name:"\u8DF3\u8DF3\u54E5\u54E5",level:"SR",id:233},{name:"\u8DF3\u8DF3\u59B9\u59B9",level:"R",id:226},{name:"\u8DF3\u8DF3\u72AC",level:"R",id:402},{name:"\u94C1\u9F20",level:"R",id:232},{name:"\u7AE5\u7537",level:"R",id:212},{name:"\u7AE5\u5973",level:"R",id:213},{name:"\u6D82\u58C1",level:"N",id:409},{name:"\u5DEB\u86CA\u5E08",level:"R",id:216},{name:"\u6B66\u58EB\u4E4B\u7075",level:"R",id:222},{name:"\u5438\u8840\u59EC",level:"SR",id:253},{name:"\u5C0F\u9E7F\u7537",level:"SSR",id:259},{name:"\u96EA\u5973",level:"SR",id:201},{name:"\u9E26\u5929\u72D7",level:"R",id:218},{name:"\u960E\u9B54",level:"SSR",id:255},{name:"\u5996\u5200\u59EC",level:"SSR",id:269},{name:"\u5996\u72D0",level:"SR",id:254},{name:"\u5996\u7434\u5E08",level:"SR",id:256},{name:"\u4E00\u76EE\u8FDE",level:"SSR",id:272},{name:"\u6A31\u82B1\u5996",level:"SR",id:267},{name:"\u8424\u8349",level:"R",id:238},{name:"\u96E8\u5973",level:"R",id:224},{name:"\u5E1A\u795E",level:"N",id:408},{name:"\u5EA7\u6577\u7AE5\u5B50",level:"R",id:205}],ce=[{id:410,rarity:"MATERIAL",name:"\u62DB\u798F\u8FBE\u6469"},{id:411,rarity:"MATERIAL",name:"\u5FA1\u884C\u8FBE\u6469"},{id:412,rarity:"MATERIAL",name:"\u5949\u4E3A\u8FBE\u6469"},{id:413,rarity:"MATERIAL",name:"\u5927\u5409\u8FBE\u6469"}],E=[{id:300002,effectiveAttr:["Speed","EffectHitRate","CritRate"],name:"\u96EA\u5E7D\u9B42"},{id:300003,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","HpRate"],name:"\u5730\u85CF\u50CF"},{id:300004,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u8760\u7FFC"},{id:300006,effectiveAttr:["Speed","CritRate","CritPower","HpRate"],name:"\u6D85\u69C3\u4E4B\u706B"},{id:300007,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u4E09\u5473"},{id:300008,effectiveAttr:["Speed","EffectHitRate","EffectResistRate","HpRate"],name:"\u9B4D\u9B49\u4E4B\u5323"},{id:300009,effectiveAttr:["Speed","CritRate","CritPower","HpRate"],name:"\u88AB\u670D"},{id:300010,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectHitRate","EffectResistRate","HpRate","DefenseRate"],name:"\u62DB\u8D22\u732B"},{id:300011,effectiveAttr:["Speed","EffectHitRate","CritRate"],name:"\u53CD\u6795"},{id:300012,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u8F6E\u5165\u9053"},{id:300013,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","HpRate"],name:"\u65E5\u5973\u5DF3\u65F6"},{id:300014,effectiveAttr:["Speed","CritRate","CritPower","HpRate"],name:"\u955C\u59EC"},{id:300015,effectiveAttr:["Speed","EffectHitRate","EffectResistRate","HpRate"],name:"\u949F\u7075"},{id:300018,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u72F0"},{id:300019,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectHitRate"],name:"\u706B\u7075"},{id:300020,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectHitRate"],name:"\u9E23\u5C4B"},{id:300021,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectHitRate","EffectResistRate","HpRate"],name:"\u8599\u9B42"},{id:300022,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u5FC3\u773C"},{id:300023,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectHitRate","EffectResistRate","HpRate"],name:"\u6728\u9B45"},{id:300024,effectiveAttr:["Speed","CritRate","CritPower","HpRate"],name:"\u6811\u5996"},{id:300026,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u7F51\u5207"},{id:300027,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u9634\u6469\u7F57"},{id:300029,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u4F24\u9B42\u9E1F"},{id:300030,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u7834\u52BF"},{id:300031,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u9547\u5893\u517D"},{id:300032,effectiveAttr:["Speed","CritRate","CritPower","HpRate"],name:"\u73CD\u73E0"},{id:300033,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectResistRate"],name:"\u9AB0\u5B50\u9B3C"},{id:300034,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectHitRate","HpRate"],name:"\u868C\u7CBE"},{id:300035,effectiveAttr:["Speed","EffectHitRate","HpRate","EffectResistRate"],name:"\u9B45\u5996"},{id:300036,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u9488\u5973"},{id:300039,effectiveAttr:["Speed","EffectHitRate","HpRate","EffectResistRate"],name:"\u8FD4\u9B42\u9999"},{id:300048,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u72C2\u9AA8"},{id:300049,effectiveAttr:["Speed","EffectResistRate","HpRate"],name:"\u5E7D\u8C37\u54CD"},{id:300050,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectHitRate"],name:"\u571F\u8718\u86DB"},{id:300051,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u80E7\u8F66"},{id:300052,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u8352\u9AB7\u9AC5"},{id:300053,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","HpRate"],name:"\u5730\u9707\u9CB6"},{id:300054,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","HpRate"],name:"\u8703\u6C14\u697C"},{id:300073,effectiveAttr:["Speed","EffectHitRate","EffectResistRate","HpRate"],name:"\u98DE\u7F18\u9B54"},{id:300074,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u5175\u4E3B\u90E8"},{id:300075,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u9752\u5973\u623F"},{id:300076,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectResistRate","HpRate"],name:"\u6D82\u4F5B"},{id:300077,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u9B3C\u7075\u6B4C\u4F0E"},{id:300079,effectiveAttr:["Speed","EffectHitRate","EffectResistRate","AttackRate","HpRate"],name:"\u9057\u5FF5\u706B"},{id:300080,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","EffectResistRate","HpRate"],name:"\u5171\u6F5C"},{id:300081,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u6076\u697C"},{id:300082,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u8D1D\u5439\u574A"},{id:300083,effectiveAttr:["Speed","CritRate","AttackRate","CritPower"],name:"\u6D77\u6708\u706B\u7389"},{id:300084,effectiveAttr:["Speed","CritRate","AttackRate","CritPower","HpRate"],name:"\u51FA\u4E16\u87BA"}],oe=K({state(){return{equipList:[],allHeroList:[],attrList:[{key:"Speed",name:"\u901F\u5EA6",nick:"\u901F",minStep:2.4,avgStep:2.7,maxStep:3},{key:"CritRate",name:"\u66B4\u51FB",nick:"\u66B4",minStep:2.4,avgStep:2.7,maxStep:3},{key:"AttackRate",name:"\u653B\u51FB\u52A0\u6210",nick:"\u653B",minStep:2.4,avgStep:2.7,maxStep:3},{key:"CritPower",name:"\u66B4\u51FB\u4F24\u5BB3",nick:"\u7206",minStep:3.2,avgStep:3.6,maxStep:4},{key:"EffectHitRate",name:"\u6548\u679C\u547D\u4E2D",nick:"\u547D",minStep:3.2,avgStep:3.6,maxStep:4},{key:"EffectResistRate",name:"\u6548\u679C\u62B5\u6297",nick:"\u6297",minStep:3.2,avgStep:3.6,maxStep:4},{key:"HpRate",name:"\u751F\u547D\u52A0\u6210",nick:"\u751F",minStep:2.4,avgStep:2.7,maxStep:3},{key:"DefenseRate",name:"\u9632\u5FA1\u52A0\u6210",nick:"\u9632",minStep:2.4,avgStep:2.7,maxStep:3},{key:"Attack",name:"\u653B\u51FB",nick:""},{key:"Defense",name:"\u9632\u5FA1",nick:""},{key:"Hp",name:"\u751F\u547D",nick:""}],notPercentAttr:["Speed","Attack","Defense","Hp"],notIncludedList:[]}},getters:{allAttrList(e){return e.attrList},allAttrMap(e){return e.attrList.reduce((t,a)=>(t[`${a.key}`]=a.name,t),{})},allAttrNickMap(e){return e.attrList.reduce((t,a)=>(t[`${a.key}`]=a.nick,t),{})},effectiveAttrList(e){return e.attrList.slice(0,8)},equipMap(e){let t={};return e.equipList.forEach(a=>{t[`${a.id}`]=a.name}),t}},actions:{getAllHeroData({commit:e}){if(y){const t=y.map(a=>{const d={name:a.name,rarity:a.level,id:a.id};return a.interactive&&(d.interactive=!0),d});e("updateAllHeroName",t.concat(ce))}},getEquipData({commit:e}){let t=[];E&&(t=E.map(a=>({id:a.id,effectiveAttr:a.effectiveAttr,name:a.name}))),e("updateEquipData",t)}},mutations:{updateEquipData(e,t){e.equipList=t},updateAllHeroName(e,t){e.allHeroList=t},updateNotIncluded(e,t){t.index===-1?e.notIncludedList.push(t.value):t.index===-2?e.notIncludedList=t.value:e.notIncludedList[t.index]=t.value}},modules:{user:ve}});const u=G(re);u.use(se);u.use(oe);u.use(Q);u.mount("#app");export{ae as _,_ as a,te as u};