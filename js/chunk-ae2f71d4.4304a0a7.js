(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ae2f71d4"],{"04d1":function(t,e,i){var n=i("342f"),r=n.match(/firefox\/(\d+)/i);t.exports=!!r&&+r[1]},"1cc7":function(t,e,i){"use strict";i("5aab")},"4de4":function(t,e,i){"use strict";var n=i("23e7"),r=i("b727").filter,a=i("1dde"),l=a("filter");n({target:"Array",proto:!0,forced:!l},{filter:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},"4e82":function(t,e,i){"use strict";var n=i("23e7"),r=i("1c0b"),a=i("7b0b"),l=i("50c4"),s=i("577e"),c=i("d039"),o=i("addb"),u=i("a640"),h=i("04d1"),f=i("d998"),d=i("2d00"),p=i("512ce"),g=[],b=g.sort,v=c((function(){g.sort(void 0)})),k=c((function(){g.sort(null)})),m=u("sort"),A=!c((function(){if(d)return d<70;if(!(h&&h>3)){if(f)return!0;if(p)return p<603;var t,e,i,n,r="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:i=3;break;case 68:case 71:i=4;break;default:i=2}for(n=0;n<47;n++)g.push({k:e+n,v:i})}for(g.sort((function(t,e){return e.v-t.v})),n=0;n<g.length;n++)e=g[n].k.charAt(0),r.charAt(r.length-1)!==e&&(r+=e);return"DGBEFHACIJK"!==r}})),y=v||!k||!m||!A,_=function(t){return function(e,i){return void 0===i?-1:void 0===e?1:void 0!==t?+t(e,i)||0:s(e)>s(i)?1:-1}};n({target:"Array",proto:!0,forced:y},{sort:function(t){void 0!==t&&r(t);var e=a(this);if(A)return void 0===t?b.call(e):b.call(e,t);var i,n,s=[],c=l(e.length);for(n=0;n<c;n++)n in e&&s.push(e[n]);s=o(s,_(t)),i=s.length,n=0;while(n<i)e[n]=s[n++];while(n<c)delete e[n++];return e}})},"512ce":function(t,e,i){var n=i("342f"),r=n.match(/AppleWebKit\/(\d+)\./);t.exports=!!r&&+r[1]},5530:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));i("b64b"),i("a4d3"),i("4de4"),i("e439"),i("159b"),i("dbb4");function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function a(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}},"5aab":function(t,e,i){},a13e:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-equip-list"},[i("el-tabs",{attrs:{size:"small",type:"card"},on:{"tab-click":t.changeUser},model:{value:t.currentUser,callback:function(e){t.currentUser=e},expression:"currentUser"}},t._l(t.userList,(function(t,e){return i("el-tab-pane",{key:e,attrs:{label:t.data.player.name}})})),1),i("div",{staticClass:"flex between",staticStyle:{"margin-bottom":"8px"}},[i("div",{staticClass:"flex"},[i("div",[t._v("主属性：")]),i("el-checkbox",{attrs:{label:"all",indeterminate:t.isIndeterminateAllAttr},on:{change:t.handleCheckAllAttrChange},model:{value:t.checkAllAttr,callback:function(e){t.checkAllAttr=e},expression:"checkAllAttr"}},[t._v("全部  ")]),t._v("  "),i("el-checkbox-group",{on:{change:t.handleCheckedAttrChange},model:{value:t.checkAttrList,callback:function(e){t.checkAttrList=e},expression:"checkAttrList"}},t._l(t.allAttrList,(function(e){return i("el-checkbox",{key:e.key,attrs:{label:e.key}},[t._v(t._s(e.name))])})),1)],1),i("el-tooltip",{attrs:{content:"本页面只显示6星御魂，非6星不予考虑",placement:"left-start"}},[i("i",{staticClass:"el-icon-warning-outline"})])],1),i("div",{staticClass:"flex",staticStyle:{"margin-bottom":"8px"}},[i("div",{staticClass:"flex"},[i("div",[t._v("等级：")]),i("el-checkbox",{attrs:{label:"all",indeterminate:t.isIndeterminateAllLevel},on:{change:t.handleCheckAllLevelChange},model:{value:t.checkAllLevel,callback:function(e){t.checkAllLevel=e},expression:"checkAllLevel"}},[t._v("全部  ")]),t._v("  "),i("el-checkbox-group",{on:{change:t.handleCheckedLevelChange},model:{value:t.checkLevelList,callback:function(e){t.checkLevelList=e},expression:"checkLevelList"}},t._l(16,(function(e){return i("el-checkbox",{key:e-1,attrs:{label:e-1}},[t._v(t._s(e-1)+"级")])})),1)],1)]),i("div",{staticClass:"flex",staticStyle:{"margin-bottom":"8px"}},[i("div",{staticClass:"flex"},[i("div",[t._v("位置：")]),i("el-checkbox",{attrs:{label:"all",indeterminate:t.isIndeterminateAllPosition},on:{change:t.handleCheckAllPositionChange},model:{value:t.checkAllPosition,callback:function(e){t.checkAllPosition=e},expression:"checkAllPosition"}},[t._v("全部  ")]),t._v("  "),i("el-checkbox-group",{on:{change:t.handleCheckedPositionChange},model:{value:t.checkPositionList,callback:function(e){t.checkPositionList=e},expression:"checkPositionList"}},t._l(6,(function(e){return i("el-checkbox",{key:e,attrs:{label:e-1}},[t._v(t._s(t.transNumberToChinese(e))+"号位")])})),1)],1),i("div",{staticClass:"flex",staticStyle:{"margin-left":"60px"}},[i("div",[t._v("种类：")]),t.equipList.length>1?i("el-select",{attrs:{clearable:"",size:"mini",placeholder:"可选择过滤种类","no-data-text":"全部"},on:{change:t.initData},model:{value:t.checkEquipType,callback:function(e){t.checkEquipType=e},expression:"checkEquipType"}},t._l(t.equipList,(function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1):t._e()],1)]),i("div",{},[i("el-table",{ref:"equipTable",staticStyle:{width:"100%"},attrs:{data:t.computedList,"highlight-current-row":"",stripe:"",border:""},on:{"sort-change":t.onTableSortChange}},[i("el-table-column",{attrs:{type:"index",fixed:"left",width:"50"}}),i("el-table-column",{attrs:{prop:"pos",label:"位置",width:"50",fixed:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.transNumberToChinese(e.row.pos+1))+" ")]}}])}),i("el-table-column",{attrs:{width:"50",prop:"level",label:"等级",fixed:"left"}}),i("el-table-column",{attrs:{label:"御魂类型",width:"80",fixed:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.equipMap[""+e.row.suit_id])+" ")]}}])}),i("el-table-column",{attrs:{label:"主属性",width:"130",fixed:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"flex attr-name"},[i("div",{staticClass:"main"},[t._v(t._s(t.transAttrToName(e.row.mainAttr.type)))]),e.row.single_attrs.length>0?i("div",{staticClass:"fixed-name"},[t._v(" | "+t._s(t.transAttrToName(e.row.single_attrs[0].type)))]):t._e()])]}}])}),t._l(t.effectiveAttrList,(function(e){return i("el-table-column",{key:e.key,attrs:{label:e.name,"min-width":"125",align:"left",sortable:"custom",prop:e.key},scopedSlots:t._u([{key:"default",fn:function(n){return[i("div",{staticClass:"flex"},[n.row.mainAttr.type===e.key?i("div",{staticClass:"attr-value main"},[t._v(" "+t._s(n.row.mainAttr.value)+" ")]):t._e(),n.row[""+e.key]?i("div",{staticClass:"attr-value random"},[t._v(" "+t._s(n.row.mainAttr.type===e.key?" +":"")+t._s(n.row[""+e.key].toFixed(2))+" ")]):t._e(),n.row.single_attrs.length>0&&n.row.single_attrs[0].type===e.key?i("div",{staticClass:"attr-value fixed-value"},[t._v("  +"+t._s(n.row.single_attrs[0].value)+" ")]):t._e()])]}}],null,!0)})})),i("el-table-column",{attrs:{label:"腿",width:"50",fixed:"right",prop:"randomAttrsLength"}}),i("el-table-column",{attrs:{label:"获得时间",width:"150",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"born-time"},[t._v(t._s(t._f("formatTime")(new Date(1e3*(e.row.born-60*(new Date).getTimezoneOffset())),"yyyy-MM-dd hh:mm")))])]}}])})],2)],1),i("div",{staticClass:"flex center pagination-wrap"},[i("el-pagination",{attrs:{layout:"prev, pager, next, jumper, sizes, total","current-page":t.currentPage,"page-size":t.pageSize,"page-sizes":[5,10,15,20,40,100],total:t.list.length},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e}}})],1)],1)},r=[],a=i("5530"),l=(i("fb6a"),i("d81d"),i("4e82"),i("4de4"),i("2f62")),s=i("ed08"),c=i("0712"),o={name:"equipList",mixins:[c["a"]],components:{},props:{},data:function(){return{currentUser:0,checkAllAttr:!0,isIndeterminateAllAttr:!1,checkAttrList:[],checkAllLevel:!0,isIndeterminateAllLevel:!1,checkLevelList:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],checkAllPosition:!0,isIndeterminateAllPosition:!1,checkPositionList:[0,1,2,3,4,5],checkEquipType:void 0,list:[],currentPage:1,pageSize:10}},computed:Object(a["a"])(Object(a["a"])(Object(a["a"])(Object(a["a"])({},Object(l["c"])(["equipList","notPercentAttr"])),Object(l["b"])(["equipMap","allAttrMap","allAttrList","effectiveAttrList"])),Object(l["b"])("user",["userList"])),{},{computedList:function(){return this.list.length<this.pageSize?this.list:this.list.slice((this.currentPage-1)*this.pageSize,this.list.length>this.currentPage*this.pageSize?this.currentPage*this.pageSize:this.list.length)}}),watch:{pageSize:function(){this.currentPage=1,localStorage.setItem("equipListPageSize",this.pageSize)}},created:function(){var t=localStorage.getItem("equipListPageSize");t?this.pageSize=parseInt(t):localStorage.setItem("equipListPageSize",this.pageSize),this.checkAttrList=this.allAttrList.map((function(t){return t.key})),this.initData()},updated:function(){},beforeDestroy:function(){},methods:{transNumberToChinese:function(t){return s["a"].transNumberToChinese(t)},changeUser:function(){var t=this;this.$nextTick((function(){t.initData()}))},handleCheckAllAttrChange:function(t){this.checkAttrList=t?this.allAttrList.map((function(t){return t.key})):[],this.isIndeterminateAllAttr=!1,this.currentPage=1,this.initData()},handleCheckedAttrChange:function(t){this.checkAllAttr=this.allAttrList.length===t.length,this.isIndeterminateAllAttr=t.length>0&&t.length<this.allAttrList.length,this.currentPage=1,this.initData()},handleCheckAllLevelChange:function(t){this.checkLevelList=t?[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]:[],this.isIndeterminateAllLevel=!1,this.currentPage=1,this.initData()},handleCheckedLevelChange:function(t){this.checkAllLevel=16===t.length,this.isIndeterminateAllLevel=t.length>0&&t.length<16,this.currentPage=1,this.initData()},handleCheckAllPositionChange:function(t){this.checkPositionList=t?[0,1,2,3,4,5]:[],this.isIndeterminateAllPosition=!1,this.currentPage=1,this.initData()},handleCheckedPositionChange:function(t){this.checkAllPosition=6===t.length,this.isIndeterminateAllPosition=t.length>0&&t.length<6,this.currentPage=1,this.initData()},initData:function(){var t=this,e=this.userList[parseInt(this.currentUser)].data;this.list=e.hero_equips.filter((function(e){return-1!==t.checkAttrList.indexOf(e.mainAttr.type)&&6===e.quality&&-1!==t.checkLevelList.indexOf(e.level)&&-1!==t.checkPositionList.indexOf(e.pos)&&(!(t.checkEquipType&&t.checkEquipType>0)||t.checkEquipType===e.suit_id)})).sort((function(t,e){return e.born-t.born})),this.$refs.equipTable&&"function"===typeof this.$refs.equipTable.clearSort&&this.$refs.equipTable.clearSort()},onTableSortChange:function(t){var e=t.prop,i=t.order,n=function(t,e){return e.born-t.born};"descending"===i?n=function(t,i){return s["a"].getAttrSum(i,e)-s["a"].getAttrSum(t,e)}:"ascending"===i&&(n=function(t,i){return s["a"].getAttrSum(t,e)-s["a"].getAttrSum(i,e)}),this.list=this.list.sort(n).map((function(t){return t}))},transAttrToName:function(t){return this.allAttrMap[t]},multiply:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;return s["a"].multiply(t,e)}}},u=o,h=(i("1cc7"),i("2877")),f=Object(h["a"])(u,n,r,!1,null,"54a7c71a",null);e["default"]=f.exports},addb:function(t,e){var i=Math.floor,n=function(t,e){var l=t.length,s=i(l/2);return l<8?r(t,e):a(n(t.slice(0,s),e),n(t.slice(s),e),e)},r=function(t,e){var i,n,r=t.length,a=1;while(a<r){n=a,i=t[a];while(n&&e(t[n-1],i)>0)t[n]=t[--n];n!==a++&&(t[n]=i)}return t},a=function(t,e,i){var n=t.length,r=e.length,a=0,l=0,s=[];while(a<n||l<r)a<n&&l<r?s.push(i(t[a],e[l])<=0?t[a++]:e[l++]):s.push(a<n?t[a++]:e[l++]);return s};t.exports=n},b64b:function(t,e,i){var n=i("23e7"),r=i("7b0b"),a=i("df75"),l=i("d039"),s=l((function(){a(1)}));n({target:"Object",stat:!0,forced:s},{keys:function(t){return a(r(t))}})},d998:function(t,e,i){var n=i("342f");t.exports=/MSIE|Trident/.test(n)},dbb4:function(t,e,i){var n=i("23e7"),r=i("83ab"),a=i("56ef"),l=i("fc6a"),s=i("06cf"),c=i("8418");n({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(t){var e,i,n=l(t),r=s.f,o=a(n),u={},h=0;while(o.length>h)i=r(n,e=o[h++]),void 0!==i&&c(u,e,i);return u}})},e439:function(t,e,i){var n=i("23e7"),r=i("d039"),a=i("fc6a"),l=i("06cf").f,s=i("83ab"),c=r((function(){l(1)})),o=!s||c;n({target:"Object",stat:!0,forced:o,sham:!s},{getOwnPropertyDescriptor:function(t,e){return l(a(t),e)}})}}]);
//# sourceMappingURL=chunk-ae2f71d4.4304a0a7.js.map