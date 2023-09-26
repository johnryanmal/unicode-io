import{c as L,h as B,b as Ae,d as ye,e as be,a as Ee}from"./render.2ad48f7a.js";import{i as ue,e as Q,c,h as C,l as Le,a as Ve,g as R,r as D,B as ze,C as U,P as Te,D as E,n as qe,E as Ce,F as I,G as M,H as j,I as O,w as re,T as De,j as ke,K as Re,J as oe,L as Z,q as _e,_ as xe,t as F,M as ee,y as w,x,N as H,O as se,Q as ce,v as ie,R as te,S as Pe,s as Ie}from"./index.dc47a7c7.js";var Qe=L({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:t}){const{proxy:{$q:i}}=R(),l=ue(Le,Q);if(l===Q)return console.error("QPage needs to be a deep child of QLayout"),Q;if(ue(Ve,Q)===Q)return console.error("QPage needs to be child of QPageContainer"),Q;const a=c(()=>{const u=(l.header.space===!0?l.header.size:0)+(l.footer.space===!0?l.footer.size:0);if(typeof e.styleFn=="function"){const d=l.isContainer.value===!0?l.containerHeight.value:i.screen.height;return e.styleFn(u,d)}return{minHeight:l.isContainer.value===!0?l.containerHeight.value-u+"px":i.screen.height===0?u!==0?`calc(100vh - ${u}px)`:"100vh":i.screen.height-u+"px"}}),r=c(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>C("main",{class:r.value,style:a.value},B(t.default))}}),W=L({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:t}){const i=c(()=>parseInt(e.lines,10)),l=c(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(i.value===1?" ellipsis":"")),n=c(()=>e.lines!==void 0&&i.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":i.value}:null);return()=>C("div",{style:n.value,class:l.value},B(t.default))}}),de=L({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:t}){const i=c(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>C("div",{class:i.value},B(t.default))}});const N={dark:{type:Boolean,default:null}};function K(e,t){return c(()=>e.dark===null?t.dark.isActive:e.dark)}function Se(e,t){typeof t.type=="symbol"?Array.isArray(t.children)===!0&&t.children.forEach(i=>{Se(e,i)}):e.add(t)}function Fe(e){const t=new Set;return e.forEach(i=>{Se(t,i)}),Array.from(t)}function Me(e){return e.appContext.config.globalProperties.$router!==void 0}function ve(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}function fe(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Oe(e,t){for(const i in t){const l=t[i],n=e[i];if(typeof l=="string"){if(l!==n)return!1}else if(Array.isArray(n)===!1||n.length!==l.length||l.some((a,r)=>a!==n[r]))return!1}return!0}function me(e,t){return Array.isArray(t)===!0?e.length===t.length&&e.every((i,l)=>i===t[l]):e.length===1&&e[0]===t}function Ne(e,t){return Array.isArray(e)===!0?me(e,t):Array.isArray(t)===!0?me(t,e):e===t}function Ke(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const i in e)if(Ne(e[i],t[i])===!1)return!1;return!0}const Ue={to:[String,Object],replace:Boolean,exact:Boolean,activeClass:{type:String,default:"q-router-link--active"},exactActiveClass:{type:String,default:"q-router-link--exact-active"},href:String,target:String,disable:Boolean};function je({fallbackTag:e,useDisableForRouterLinkProps:t=!0}={}){const i=R(),{props:l,proxy:n,emit:a}=i,r=Me(i),u=c(()=>l.disable!==!0&&l.href!==void 0),d=t===!0?c(()=>r===!0&&l.disable!==!0&&u.value!==!0&&l.to!==void 0&&l.to!==null&&l.to!==""):c(()=>r===!0&&u.value!==!0&&l.to!==void 0&&l.to!==null&&l.to!==""),o=c(()=>d.value===!0?V(l.to):null),s=c(()=>o.value!==null),g=c(()=>u.value===!0||s.value===!0),m=c(()=>l.type==="a"||g.value===!0?"a":l.tag||e||"div"),p=c(()=>u.value===!0?{href:l.href,target:l.target}:s.value===!0?{href:o.value.href,target:l.target}:{}),y=c(()=>{if(s.value===!1)return-1;const{matched:v}=o.value,{length:b}=v,k=v[b-1];if(k===void 0)return-1;const A=n.$route.matched;if(A.length===0)return-1;const z=A.findIndex(fe.bind(null,k));if(z>-1)return z;const X=ve(v[b-2]);return b>1&&ve(k)===X&&A[A.length-1].path!==X?A.findIndex(fe.bind(null,v[b-2])):z}),_=c(()=>s.value===!0&&y.value!==-1&&Oe(n.$route.params,o.value.params)),P=c(()=>_.value===!0&&y.value===n.$route.matched.length-1&&Ke(n.$route.params,o.value.params)),S=c(()=>s.value===!0?P.value===!0?` ${l.exactActiveClass} ${l.activeClass}`:l.exact===!0?"":_.value===!0?` ${l.activeClass}`:"":"");function V(v){try{return n.$router.resolve(v)}catch{}return null}function h(v,{returnRouterError:b,to:k=l.to,replace:A=l.replace}={}){if(l.disable===!0)return v.preventDefault(),Promise.resolve(!1);if(v.metaKey||v.altKey||v.ctrlKey||v.shiftKey||v.button!==void 0&&v.button!==0||l.target==="_blank")return Promise.resolve(!1);v.preventDefault();const z=n.$router[A===!0?"replace":"push"](k);return b===!0?z:z.then(()=>{}).catch(()=>{})}function $(v){if(s.value===!0){const b=k=>h(v,k);a("click",v,b),v.defaultPrevented!==!0&&b()}else a("click",v)}return{hasRouterLink:s,hasHrefLink:u,hasLink:g,linkTag:m,resolvedLink:o,linkIsActive:_,linkIsExactActive:P,linkClass:S,linkAttrs:p,getLink:V,navigateToRouterLink:h,navigateOnClick:$}}var pe=L({name:"QItem",props:{...N,...Ue,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:t,emit:i}){const{proxy:{$q:l}}=R(),n=K(e,l),{hasLink:a,linkAttrs:r,linkClass:u,linkTag:d,navigateOnClick:o}=je(),s=D(null),g=D(null),m=c(()=>e.clickable===!0||a.value===!0||e.tag==="label"),p=c(()=>e.disable!==!0&&m.value===!0),y=c(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(n.value===!0?" q-item--dark":"")+(a.value===!0&&e.active===null?u.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(p.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),_=c(()=>{if(e.insetLevel===void 0)return null;const h=l.lang.rtl===!0?"Right":"Left";return{["padding"+h]:16+e.insetLevel*56+"px"}});function P(h){p.value===!0&&(g.value!==null&&(h.qKeyEvent!==!0&&document.activeElement===s.value?g.value.focus():document.activeElement===g.value&&s.value.focus()),o(h))}function S(h){if(p.value===!0&&ze(h,13)===!0){U(h),h.qKeyEvent=!0;const $=new MouseEvent("click",h);$.qKeyEvent=!0,s.value.dispatchEvent($)}i("keyup",h)}function V(){const h=Ae(t.default,[]);return p.value===!0&&h.unshift(C("div",{class:"q-focus-helper",tabindex:-1,ref:g})),h}return()=>{const h={ref:s,class:y.value,style:_.value,role:"listitem",onClick:P,onKeyup:S};return p.value===!0?(h.tabindex=e.tabindex||"0",Object.assign(h,r.value)):m.value===!0&&(h["aria-disabled"]="true"),C(d.value,h,V())}}});const Xe={true:"inset",item:"item-inset","item-thumbnail":"item-thumbnail-inset"},ne={xs:2,sm:4,md:8,lg:16,xl:24};var Ye=L({name:"QSeparator",props:{...N,spaced:[Boolean,String],inset:[Boolean,String],vertical:Boolean,color:String,size:String},setup(e){const t=R(),i=K(e,t.proxy.$q),l=c(()=>e.vertical===!0?"vertical":"horizontal"),n=c(()=>` q-separator--${l.value}`),a=c(()=>e.inset!==!1?`${n.value}-${Xe[e.inset]}`:""),r=c(()=>`q-separator${n.value}${a.value}`+(e.color!==void 0?` bg-${e.color}`:"")+(i.value===!0?" q-separator--dark":"")),u=c(()=>{const d={};if(e.size!==void 0&&(d[e.vertical===!0?"width":"height"]=e.size),e.spaced!==!1){const o=e.spaced===!0?`${ne.md}px`:e.spaced in ne?`${ne[e.spaced]}px`:e.spaced,s=e.vertical===!0?["Left","Right"]:["Top","Bottom"];d[`margin${s[0]}`]=d[`margin${s[1]}`]=o}return d});return()=>C("hr",{class:r.value,style:u.value,"aria-orientation":l.value})}}),He=L({name:"QList",props:{...N,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:t}){const i=R(),l=K(e,i.proxy.$q),n=c(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(l.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>C(e.tag,{class:n.value},B(t.default))}});const le={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},We=Object.keys(le);le.all=!0;function G(e){const t={};for(const i of We)e[i]===!0&&(t[i]=!0);return Object.keys(t).length===0?le:(t.horizontal===!0?t.left=t.right=!0:t.left===!0&&t.right===!0&&(t.horizontal=!0),t.vertical===!0?t.up=t.down=!0:t.up===!0&&t.down===!0&&(t.vertical=!0),t.horizontal===!0&&t.vertical===!0&&(t.all=!0),t)}const Ge=["INPUT","TEXTAREA"];function J(e,t){return t.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof t.handler=="function"&&Ge.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(t.uid)===-1)}function we(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),Te.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Je(e){const t=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((i,l)=>{const n=parseFloat(i);n&&(t[l]=n)}),t}var Ze=ye({name:"touch-swipe",beforeMount(e,{value:t,arg:i,modifiers:l}){if(l.mouse!==!0&&E.has.touch!==!0)return;const n=l.mouseCapture===!0?"Capture":"",a={handler:t,sensitivity:Je(i),direction:G(l),noop:qe,mouseStart(r){J(r,a)&&Ce(r)&&(I(a,"temp",[[document,"mousemove","move",`notPassive${n}`],[document,"mouseup","end","notPassiveCapture"]]),a.start(r,!0))},touchStart(r){if(J(r,a)){const u=r.target;I(a,"temp",[[u,"touchmove","move","notPassiveCapture"],[u,"touchcancel","end","notPassiveCapture"],[u,"touchend","end","notPassiveCapture"]]),a.start(r)}},start(r,u){E.is.firefox===!0&&M(e,!0);const d=j(r);a.event={x:d.left,y:d.top,time:Date.now(),mouse:u===!0,dir:!1}},move(r){if(a.event===void 0)return;if(a.event.dir!==!1){U(r);return}const u=Date.now()-a.event.time;if(u===0)return;const d=j(r),o=d.left-a.event.x,s=Math.abs(o),g=d.top-a.event.y,m=Math.abs(g);if(a.event.mouse!==!0){if(s<a.sensitivity[1]&&m<a.sensitivity[1]){a.end(r);return}}else if(window.getSelection().toString()!==""){a.end(r);return}else if(s<a.sensitivity[2]&&m<a.sensitivity[2])return;const p=s/u,y=m/u;a.direction.vertical===!0&&s<m&&s<100&&y>a.sensitivity[0]&&(a.event.dir=g<0?"up":"down"),a.direction.horizontal===!0&&s>m&&m<100&&p>a.sensitivity[0]&&(a.event.dir=o<0?"left":"right"),a.direction.up===!0&&s<m&&g<0&&s<100&&y>a.sensitivity[0]&&(a.event.dir="up"),a.direction.down===!0&&s<m&&g>0&&s<100&&y>a.sensitivity[0]&&(a.event.dir="down"),a.direction.left===!0&&s>m&&o<0&&m<100&&p>a.sensitivity[0]&&(a.event.dir="left"),a.direction.right===!0&&s>m&&o>0&&m<100&&p>a.sensitivity[0]&&(a.event.dir="right"),a.event.dir!==!1?(U(r),a.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),we(),a.styleCleanup=_=>{a.styleCleanup=void 0,document.body.classList.remove("non-selectable");const P=()=>{document.body.classList.remove("no-pointer-events--children")};_===!0?setTimeout(P,50):P()}),a.handler({evt:r,touch:a.event.mouse!==!0,mouse:a.event.mouse,direction:a.event.dir,duration:u,distance:{x:s,y:m}})):a.end(r)},end(r){a.event!==void 0&&(O(a,"temp"),E.is.firefox===!0&&M(e,!1),a.styleCleanup!==void 0&&a.styleCleanup(!0),r!==void 0&&a.event.dir!==!1&&U(r),a.event=void 0)}};if(e.__qtouchswipe=a,l.mouse===!0){const r=l.mouseCapture===!0||l.mousecapture===!0?"Capture":"";I(a,"main",[[e,"mousedown","mouseStart",`passive${r}`]])}E.has.touch===!0&&I(a,"main",[[e,"touchstart","touchStart",`passive${l.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,t){const i=e.__qtouchswipe;i!==void 0&&(t.oldValue!==t.value&&(typeof t.value!="function"&&i.end(),i.handler=t.value),i.direction=G(t.modifiers))},beforeUnmount(e){const t=e.__qtouchswipe;t!==void 0&&(O(t,"main"),O(t,"temp"),E.is.firefox===!0&&M(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(),delete e.__qtouchswipe)}});function et(){const e=new Map;return{getCache:function(t,i){return e[t]===void 0?e[t]=i:e[t]},getCacheWithFn:function(t,i){return e[t]===void 0?e[t]=i():e[t]}}}const tt={name:{required:!0},disable:Boolean},he={setup(e,{slots:t}){return()=>C("div",{class:"q-panel scroll",role:"tabpanel"},B(t.default))}},nt={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},at=["update:modelValue","beforeTransition","transition"];function rt(){const{props:e,emit:t,proxy:i}=R(),{getCacheWithFn:l}=et();let n,a;const r=D(null),u=D(null);function d(f){const q=e.vertical===!0?"up":"left";k((i.$q.lang.rtl===!0?-1:1)*(f.direction===q?1:-1))}const o=c(()=>[[Ze,d,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),s=c(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),g=c(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),m=c(()=>`--q-transition-duration: ${e.transitionDuration}ms`),p=c(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),y=c(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),_=c(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);re(()=>e.modelValue,(f,q)=>{const T=h(f)===!0?$(f):-1;a!==!0&&b(T===-1?0:T<$(q)?-1:1),r.value!==T&&(r.value=T,t("beforeTransition",f,q),ke(()=>{t("transition",f,q)}))});function P(){k(1)}function S(){k(-1)}function V(f){t("update:modelValue",f)}function h(f){return f!=null&&f!==""}function $(f){return n.findIndex(q=>q.props.name===f&&q.props.disable!==""&&q.props.disable!==!0)}function v(){return n.filter(f=>f.props.disable!==""&&f.props.disable!==!0)}function b(f){const q=f!==0&&e.animated===!0&&r.value!==-1?"q-transition--"+(f===-1?s.value:g.value):null;u.value!==q&&(u.value=q)}function k(f,q=r.value){let T=q+f;for(;T>-1&&T<n.length;){const Y=n[T];if(Y!==void 0&&Y.props.disable!==""&&Y.props.disable!==!0){b(f),a=!0,t("update:modelValue",Y.props.name),setTimeout(()=>{a=!1});return}T+=f}e.infinite===!0&&n.length!==0&&q!==-1&&q!==n.length&&k(f,f===-1?n.length:-1)}function A(){const f=$(e.modelValue);return r.value!==f&&(r.value=f),!0}function z(){const f=h(e.modelValue)===!0&&A()&&n[r.value];return e.keepAlive===!0?[C(Re,y.value,[C(_.value===!0?l(p.value,()=>({...he,name:p.value})):he,{key:p.value,style:m.value},()=>f)])]:[C("div",{class:"q-panel scroll",style:m.value,key:p.value,role:"tabpanel"},[f])]}function X(){if(n.length!==0)return e.animated===!0?[C(De,{name:u.value},z)]:z()}function $e(f){return n=Fe(B(f.default,[])).filter(q=>q.props!==null&&q.props.slot===void 0&&h(q.props.name)===!0),n.length}function Be(){return n}return Object.assign(i,{next:P,previous:S,goTo:V}),{panelIndex:r,panelDirectives:o,updatePanelsList:$e,updatePanelIndex:A,getPanelContent:X,getEnabledPanels:v,getPanels:Be,isValidPanelName:h,keepAliveProps:y,needsUniqueKeepAliveWrapper:_,goToPanelByOffset:k,goToPanel:V,nextPanel:P,previousPanel:S}}var it=L({name:"QTabPanel",props:tt,setup(e,{slots:t}){return()=>C("div",{class:"q-tab-panel",role:"tabpanel"},B(t.default))}}),lt=L({name:"QTabPanels",props:{...nt,...N},emits:at,setup(e,{slots:t}){const i=R(),l=K(e,i.proxy.$q),{updatePanelsList:n,getPanelContent:a,panelDirectives:r}=rt(),u=c(()=>"q-tab-panels q-panel-parent"+(l.value===!0?" q-tab-panels--dark q-dark":""));return()=>(n(t),be("div",{class:u.value},a(),"pan",e.swipeable,()=>r.value))}});function ae(e,t,i){const l=j(e);let n,a=l.left-t.event.x,r=l.top-t.event.y,u=Math.abs(a),d=Math.abs(r);const o=t.direction;o.horizontal===!0&&o.vertical!==!0?n=a<0?"left":"right":o.horizontal!==!0&&o.vertical===!0?n=r<0?"up":"down":o.up===!0&&r<0?(n="up",u>d&&(o.left===!0&&a<0?n="left":o.right===!0&&a>0&&(n="right"))):o.down===!0&&r>0?(n="down",u>d&&(o.left===!0&&a<0?n="left":o.right===!0&&a>0&&(n="right"))):o.left===!0&&a<0?(n="left",u<d&&(o.up===!0&&r<0?n="up":o.down===!0&&r>0&&(n="down"))):o.right===!0&&a>0&&(n="right",u<d&&(o.up===!0&&r<0?n="up":o.down===!0&&r>0&&(n="down")));let s=!1;if(n===void 0&&i===!1){if(t.event.isFirst===!0||t.event.lastDir===void 0)return{};n=t.event.lastDir,s=!0,n==="left"||n==="right"?(l.left-=a,u=0,a=0):(l.top-=r,d=0,r=0)}return{synthetic:s,payload:{evt:e,touch:t.event.mouse!==!0,mouse:t.event.mouse===!0,position:l,direction:n,isFirst:t.event.isFirst,isFinal:i===!0,duration:Date.now()-t.event.time,distance:{x:u,y:d},offset:{x:a,y:r},delta:{x:l.left-t.event.lastX,y:l.top-t.event.lastY}}}}let ut=0;var ot=ye({name:"touch-pan",beforeMount(e,{value:t,modifiers:i}){if(i.mouse!==!0&&E.has.touch!==!0)return;function l(a,r){i.mouse===!0&&r===!0?U(a):(i.stop===!0&&Z(a),i.prevent===!0&&oe(a))}const n={uid:"qvtp_"+ut++,handler:t,modifiers:i,direction:G(i),noop:qe,mouseStart(a){J(a,n)&&Ce(a)&&(I(n,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),n.start(a,!0))},touchStart(a){if(J(a,n)){const r=a.target;I(n,"temp",[[r,"touchmove","move","notPassiveCapture"],[r,"touchcancel","end","passiveCapture"],[r,"touchend","end","passiveCapture"]]),n.start(a)}},start(a,r){if(E.is.firefox===!0&&M(e,!0),n.lastEvt=a,r===!0||i.stop===!0){if(n.direction.all!==!0&&(r!==!0||n.modifiers.mouseAllDir!==!0&&n.modifiers.mousealldir!==!0)){const o=a.type.indexOf("mouse")>-1?new MouseEvent(a.type,a):new TouchEvent(a.type,a);a.defaultPrevented===!0&&oe(o),a.cancelBubble===!0&&Z(o),Object.assign(o,{qKeyEvent:a.qKeyEvent,qClickOutside:a.qClickOutside,qAnchorHandled:a.qAnchorHandled,qClonedBy:a.qClonedBy===void 0?[n.uid]:a.qClonedBy.concat(n.uid)}),n.initialEvent={target:a.target,event:o}}Z(a)}const{left:u,top:d}=j(a);n.event={x:u,y:d,time:Date.now(),mouse:r===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:u,lastY:d}},move(a){if(n.event===void 0)return;const r=j(a),u=r.left-n.event.x,d=r.top-n.event.y;if(u===0&&d===0)return;n.lastEvt=a;const o=n.event.mouse===!0,s=()=>{l(a,o);let p;i.preserveCursor!==!0&&i.preservecursor!==!0&&(p=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),o===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),we(),n.styleCleanup=y=>{if(n.styleCleanup=void 0,p!==void 0&&(document.documentElement.style.cursor=p),document.body.classList.remove("non-selectable"),o===!0){const _=()=>{document.body.classList.remove("no-pointer-events--children")};y!==void 0?setTimeout(()=>{_(),y()},50):_()}else y!==void 0&&y()}};if(n.event.detected===!0){n.event.isFirst!==!0&&l(a,n.event.mouse);const{payload:p,synthetic:y}=ae(a,n,!1);p!==void 0&&(n.handler(p)===!1?n.end(a):(n.styleCleanup===void 0&&n.event.isFirst===!0&&s(),n.event.lastX=p.position.left,n.event.lastY=p.position.top,n.event.lastDir=y===!0?void 0:p.direction,n.event.isFirst=!1));return}if(n.direction.all===!0||o===!0&&(n.modifiers.mouseAllDir===!0||n.modifiers.mousealldir===!0)){s(),n.event.detected=!0,n.move(a);return}const g=Math.abs(u),m=Math.abs(d);g!==m&&(n.direction.horizontal===!0&&g>m||n.direction.vertical===!0&&g<m||n.direction.up===!0&&g<m&&d<0||n.direction.down===!0&&g<m&&d>0||n.direction.left===!0&&g>m&&u<0||n.direction.right===!0&&g>m&&u>0?(n.event.detected=!0,n.move(a)):n.end(a,!0))},end(a,r){if(n.event!==void 0){if(O(n,"temp"),E.is.firefox===!0&&M(e,!1),r===!0)n.styleCleanup!==void 0&&n.styleCleanup(),n.event.detected!==!0&&n.initialEvent!==void 0&&n.initialEvent.target.dispatchEvent(n.initialEvent.event);else if(n.event.detected===!0){n.event.isFirst===!0&&n.handler(ae(a===void 0?n.lastEvt:a,n).payload);const{payload:u}=ae(a===void 0?n.lastEvt:a,n,!0),d=()=>{n.handler(u)};n.styleCleanup!==void 0?n.styleCleanup(d):d()}n.event=void 0,n.initialEvent=void 0,n.lastEvt=void 0}}};if(e.__qtouchpan=n,i.mouse===!0){const a=i.mouseCapture===!0||i.mousecapture===!0?"Capture":"";I(n,"main",[[e,"mousedown","mouseStart",`passive${a}`]])}E.has.touch===!0&&I(n,"main",[[e,"touchstart","touchStart",`passive${i.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,t){const i=e.__qtouchpan;i!==void 0&&(t.oldValue!==t.value&&(typeof value!="function"&&i.end(),i.handler=t.value),i.direction=G(t.modifiers))},beforeUnmount(e){const t=e.__qtouchpan;t!==void 0&&(t.event!==void 0&&t.end(),O(t,"main"),O(t,"temp"),E.is.firefox===!0&&M(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(),delete e.__qtouchpan)}}),st=L({name:"QSplitter",props:{...N,modelValue:{type:Number,required:!0},reverse:Boolean,unit:{type:String,default:"%",validator:e=>["%","px"].includes(e)},limits:{type:Array,validator:e=>e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"?!1:e[0]>=0&&e[0]<=e[1]},emitImmediately:Boolean,horizontal:Boolean,disable:Boolean,beforeClass:[Array,String,Object],afterClass:[Array,String,Object],separatorClass:[Array,String,Object],separatorStyle:[Array,String,Object]},emits:["update:modelValue"],setup(e,{slots:t,emit:i}){const{proxy:{$q:l}}=R(),n=K(e,l),a=D(null),r={before:D(null),after:D(null)},u=c(()=>`q-splitter no-wrap ${e.horizontal===!0?"q-splitter--horizontal column":"q-splitter--vertical row"} q-splitter--${e.disable===!0?"disabled":"workable"}`+(n.value===!0?" q-splitter--dark":"")),d=c(()=>e.horizontal===!0?"height":"width"),o=c(()=>e.reverse!==!0?"before":"after"),s=c(()=>e.limits!==void 0?e.limits:e.unit==="%"?[10,90]:[50,1/0]);function g(v){return(e.unit==="%"?v:Math.round(v))+e.unit}const m=c(()=>({[o.value]:{[d.value]:g(e.modelValue)}}));let p,y,_,P,S;function V(v){if(v.isFirst===!0){const k=a.value.getBoundingClientRect()[d.value];p=e.horizontal===!0?"up":"left",y=e.unit==="%"?100:k,_=Math.min(y,s.value[1],Math.max(s.value[0],e.modelValue)),P=(e.reverse!==!0?1:-1)*(e.horizontal===!0?1:l.lang.rtl===!0?-1:1)*(e.unit==="%"?k===0?0:100/k:1),a.value.classList.add("q-splitter--active");return}if(v.isFinal===!0){S!==e.modelValue&&i("update:modelValue",S),a.value.classList.remove("q-splitter--active");return}const b=_+P*(v.direction===p?-1:1)*v.distance[e.horizontal===!0?"y":"x"];S=Math.min(y,s.value[1],Math.max(s.value[0],b)),r[o.value].value.style[d.value]=g(S),e.emitImmediately===!0&&e.modelValue!==S&&i("update:modelValue",S)}const h=c(()=>[[ot,V,void 0,{[e.horizontal===!0?"vertical":"horizontal"]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]);function $(v,b){v<b[0]?i("update:modelValue",b[0]):v>b[1]&&i("update:modelValue",b[1])}return re(()=>e.modelValue,v=>{$(v,s.value)}),re(()=>e.limits,()=>{ke(()=>{$(e.modelValue,s.value)})}),()=>{const v=[C("div",{ref:r.before,class:["q-splitter__panel q-splitter__before"+(e.reverse===!0?" col":""),e.beforeClass],style:m.value.before},B(t.before)),C("div",{class:["q-splitter__separator",e.separatorClass],style:e.separatorStyle,"aria-disabled":e.disable===!0?"true":void 0},[be("div",{class:"q-splitter__separator-area absolute-full"},B(t.separator),"sep",e.disable!==!0,()=>h.value)]),C("div",{ref:r.after,class:["q-splitter__panel q-splitter__after"+(e.reverse===!0?"":" col"),e.afterClass],style:m.value.after},B(t.after))];return C("div",{class:u.value,ref:a},Ee(t.default,v))}}}),ct=L({name:"QCard",props:{...N,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(e,{slots:t}){const{proxy:{$q:i}}=R(),l=K(e,i),n=c(()=>"q-card"+(l.value===!0?" q-card--dark q-dark":"")+(e.bordered===!0?" q-card--bordered":"")+(e.square===!0?" q-card--square no-border-radius":"")+(e.flat===!0?" q-card--flat no-shadow":""));return()=>C(e.tag,{class:n.value},B(t.default))}});const ge=["Basic Latin","Latin-1 Supplement","Latin Extended-A","Latin Extended-B"],dt=["U+0000..U+007F","U+0080..U+00FF","U+0100..U+017F","U+0180..U+024F"],vt=_e({name:"Card",setup(){return{blocks:ge.map((e,t)=>[e,dt[t]]),split:D(50),tab:D(ge[0])}}}),ft={class:"q-pa-md row items-start q-gutter-md"},mt={class:"text-overline text-no-wrap"},pt=Pe("p",null,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.",-1);function ht(e,t,i,l,n,a){return F(),ee("div",ft,[w(ct,{flat:"",bordered:""},{default:x(()=>[w(pe,null,{default:x(()=>[w(de,null,{default:x(()=>[w(W,null,{default:x(()=>[H("Unicode Codepoints")]),_:1}),w(W,{caption:""},{default:x(()=>[H(" By Blocks ")]),_:1})]),_:1})]),_:1}),w(Ye,{horizontal:""}),w(st,{modelValue:e.split,"onUpdate:modelValue":t[1]||(t[1]=r=>e.split=r),style:{height:"300px"},limits:[0,100],"before-class":"overflow-scroll text-no-wrap","after-class":"overflow-hidden"},{before:x(()=>[w(He,null,{default:x(()=>[(F(!0),ee(se,null,ce(e.blocks,([r,u])=>(F(),ie(pe,{clickable:"",active:e.tab==r,onClick:d=>e.tab=r},{default:x(()=>[w(de,null,{default:x(()=>[w(W,null,{default:x(()=>[H(te(r),1)]),_:2},1024),w(W,{caption:""},{default:x(()=>[H(te(u),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["active","onClick"]))),256))]),_:1})]),after:x(()=>[w(lt,{modelValue:e.tab,"onUpdate:modelValue":t[0]||(t[0]=r=>e.tab=r),animated:"",swipeable:"",vertical:"","transition-prev":"slide-down","transition-next":"slide-up"},{default:x(()=>[(F(!0),ee(se,null,ce(e.blocks,([r,u])=>(F(),ie(it,{name:r,style:{height:"300px"}},{default:x(()=>[Pe("div",mt,te(r),1),pt]),_:2},1032,["name"]))),256))]),_:1},8,["modelValue"])]),_:1},8,["modelValue"])]),_:1})])}var gt=xe(vt,[["render",ht]]);const yt=_e({name:"IndexPage",components:{Card:gt}});function bt(e,t,i,l,n,a){const r=Ie("Card");return F(),ie(Qe,{class:"flex flex-center"},{default:x(()=>[w(r)]),_:1})}var kt=xe(yt,[["render",bt]]);export{kt as default};
