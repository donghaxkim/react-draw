"use strict";var FrameUp=(()=>{var kc=Object.defineProperty;var S=(e,t)=>()=>(e&&(t=e(e=0)),t);var xa=(e,t)=>{for(var n in t)kc(e,n,{get:t[n],enumerable:!0})};function Pc(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function Rc(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(E=>{try{return Array.from(E.cssRules)}catch{return[]}}).filter(E=>E instanceof CSSStyleRule&&E.selectorText===":root").flatMap(E=>Array.from(E.style)).filter(E=>E.startsWith("--")),n={},o={},r={},i={},a={},s={},c={},d={},u={},p={},f={},m={},h={},y={},P={},M={},F={},_={},U=(E,$,fe,ge)=>{E[fe]=ge,$[ge]=fe};for(let E of t){let $=e.getPropertyValue(E).trim();if(!$)continue;let fe=E.match(/^--spacing-(.+)$/);if(fe){U(n,p,fe[1],$);continue}let ge=E.match(/^--color-(.+)$/);if(ge){let bo=ge[1];o[bo]=$,f[Pc($)]=bo;continue}let A=E.match(/^--font-size-(.+)$/);if(A){U(r,m,A[1],$);continue}let K=E.match(/^--font-weight-(.+)$/);if(K){U(i,h,K[1],$);continue}let b=E.match(/^--radius-(.+)$/);if(b){U(a,y,b[1],$);continue}let T=E.match(/^--border-(.+)$/);if(T){U(s,P,T[1],$);continue}let W=E.match(/^--opacity-(.+)$/);if(W){U(c,M,W[1],$);continue}let te=E.match(/^--tracking-(.+)$/);if(te){U(d,F,te[1],$);continue}let ne=E.match(/^--leading-(.+)$/);if(ne){U(u,_,ne[1],$);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:d,lineHeight:u,spacingReverse:p,colorsReverse:f,fontSizeReverse:m,fontWeightReverse:h,borderRadiusReverse:y,borderWidthReverse:P,opacityReverse:M,letterSpacingReverse:F,lineHeightReverse:_}}function $c(e,t){let n={};for(let o of Ac){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function xo(e,t){return t.get(e)??null}function Ca(e,t,n){let r=(n??vt())[e],i=[];for(let[s,c]of r.entries()){let d=parseFloat(c);isNaN(d)||i.push({numericValue:d,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}function Ta(e){Ea=e,hn=null}function vt(){if(hn!==null)return hn;let e=Rc();return hn=$c(e,Ea??{}),hn}var Ac,Ea,hn,Ft=S(()=>{"use strict";Ac=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];Ea=null,hn=null});function Sa(e){wa=e}function Co(){return wa}var wa,Eo=S(()=>{"use strict";wa=!1});var l,O,k,C,x,Na,X=S(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},O={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},k={xs:"4px",sm:"6px",md:"10px",lg:"14px"},C={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},x="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Na=`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/__frameup/inter-regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/__frameup/inter-semibold.woff2') format('woff2');
  }
`});var Sr,xn,Ma,Oc,yn,ka,wo,Pa,La,bn,To,it,Nr,vn,Mr,Vt,Lr,So,Cn=S(()=>{"use strict";Sr="0.5.32",xn=`bippy-${Sr}`,Ma=Object.defineProperty,Oc=Object.prototype.hasOwnProperty,yn=()=>{},ka=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},wo=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Pa=!1,bn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Pa?!0:(e&&typeof e.inject=="function"&&(La=e.inject.toString()),!!La?.includes("(injected)")),To=new Set,it=new Set,Nr=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:xn,checkDCE:ka,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),it.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,To.forEach(a=>a())),i},on:yn,onCommitFiberRoot:yn,onCommitFiberUnmount:yn,onPostCommitFiberRoot:yn,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Ma(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((c,d)=>{it.add(c),a.renderers.set(d,c)}),vn(e))}}});let r=window.hasOwnProperty,i=!1;Ma(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{vn(e)}return o},vn=e=>{e&&To.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=ka,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=xn,t._instrumentationIsActive=!1;let n=wo(t);if(n||(t.on=yn),t.renderers.size){t._instrumentationIsActive=!0,To.forEach(i=>i());return}let o=t.inject,r=bn(t);r&&!n&&(Pa=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return it.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,To.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||bn())&&e?.()}catch{}},Mr=()=>Oc.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),Vt=e=>Mr()?(vn(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Nr(e),Lr=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),So=()=>{try{Lr()&&Vt()}catch{}}});var Ra=S(()=>{"use strict";Cn();So()});function zr(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Wr(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Br(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var kr,Pr,Rr,Ar,$r,Or,Hr,Ir,Dr,_r,Fr,Vr,he,Br,Wr,jr,ie,Ur,Gr,J,Hc,Yr=S(()=>{"use strict";Cn();kr=0,Pr=1,Rr=5,Ar=11,$r=13,Or=15,Hr=16,Ir=19,Dr=26,_r=27,Fr=28,Vr=30,he=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};Br=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Br(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Wr=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Wr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},jr=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?jr(t.type||t.render):null},ie=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=jr(t);return o&&(o.displayName||o.name)||null},Ur=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||wo(e)||bn(e)},Gr=e=>{let t=Vt(e.onActive);t._instrumentationSource=e.name??xn;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{n!==i&&(n?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},J=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Hc=Error()});var at=S(()=>{"use strict";Cn();Ra();Yr();});function En(e,t){let n=0,o=0,r=0;do r=Ga[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function Ia(e,t){return e.pos>=t?!1:e.peek()!==Bc}function Ya(e){let{length:t}=e,n=new jc(e),o=[],r=0,i=0,a=0,s=0,c=0;do{let d=n.indexOf(";"),u=[],p=!0,f=0;for(r=0;n.pos<d;){let m;r=En(n,r),r<f&&(p=!1),f=r,Ia(n,d)?(i=En(n,i),a=En(n,a),s=En(n,s),Ia(n,d)?(c=En(n,c),m=[r,i,a,s,c]):m=[r,i,a,s]):m=[r],u.push(m),n.pos++}p||Uc(u),o.push(u),n.pos=d+1}while(n.pos<=t);return o}function Uc(e){e.sort(Gc)}function Gc(e,t){return e[0]-t[0]}var Aa,Ic,Dc,za,_c,Fc,Ba,Vc,Wa,zc,ja,Ua,qr,$a,Oa,Bc,Ha,Wc,Ga,jc,Ka,Yc,Kc,Xa,Tn,No,Xc,Da,qc,Zc,Jc,Qc,_a,ed,td,nd,od,rd,Fa,Ye,id,Kr,Xr,ad,sd,ld,cd,dd,ud,pd,md,Ae,Va,fd,gd,wn,Sn,xt=S(()=>{"use strict";Cn();Yr();Aa=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Ic=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Dc=["<anonymous>","eval",""],za=/\.(jsx|tsx|ts|js)$/,_c=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Fc=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Ba="(at Server)",Vc=/(^|@)\S+:\d+/,Wa=/^\s*at .*(\S+:\d+|\(native\))/m,zc=/^(eval@)?(\[native code\])?$/,ja=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=$a(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Vc)){let i=Oa(r,void 0)[0];i&&o.push(i)}return qr(o,t)}return e.match(Wa)?$a(e,t):Oa(e,t)},Ua=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},qr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,$a=(e,t)=>qr(e.split(`
`).filter(n=>!!n.match(Wa)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Ua(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),Oa=(e,t)=>qr(e.split(`
`).filter(n=>!n.match(zc)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=Ua(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}}),Bc=44,Ha="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Wc=new Uint8Array(64),Ga=new Uint8Array(128);for(let e=0;e<Ha.length;e++){let t=Ha.charCodeAt(e);Wc[e]=t,Ga[t]=e}jc=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};Ka=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Yc=/^data:application\/json[^,]+base64,/,Kc=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Xa=typeof WeakRef<"u",Tn=new Map,No=new Map,Xc=e=>Xa&&e instanceof WeakRef,Da=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let d=t[a];return d?{columnNumber:c,fileName:d,lineNumber:s+1}:null},qc=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return Da(o.map.mappings,o.map.sources,r,i)}return Da(e.mappings,e.sources,t-1,n)},Zc=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Kc);a&&(o=a[1]||a[2])}if(!o)return null;let r=Ka.test(o);if(!(Yc.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},Jc=e=>({file:e.file,mappings:Ya(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Qc=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Ya(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},_a=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Ka);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},ed=async(e,t=fetch)=>{if(!_a(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Zc(e,n);if(!o||!_a(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Qc(i):Jc(i)}catch{return null}},td=async(e,t=!0,n)=>{if(t&&Tn.has(e)){let i=Tn.get(e);if(i==null)return null;if(Xc(i)){let a=i.deref();if(a)return a;Tn.delete(e)}else return i}if(t&&No.has(e))return No.get(e);let o=ed(e,n);t&&No.set(e,o);let r=await o;return t&&No.delete(e),t&&(r===null?Tn.set(e,null):Tn.set(e,Xa?new WeakRef(r):r)),r},nd=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await td(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=qc(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),od=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",rd=()=>{let e=Vt();for(let t of[...Array.from(it),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},Fa=e=>{for(let t of it){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Ye=e=>`
    in ${e}`,id=(e,t)=>{let n=Ye(e);return t&&(n+=` (at ${t})`),n},Kr=!1,Xr=(e,t)=>{if(!e||Kr)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Kr=!0;let o=rd();Fa(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){u=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){u=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){u=f}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,d]=s.DetermineComponentFrameRoot();if(c&&d){let u=c.split(`
`),p=d.split(`
`),f=0,m=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(f===u.length||m===p.length)for(f=u.length-1,m=p.length-1;f>=1&&m>=0&&u[f]!==p[m];)m--;for(;f>=1&&m>=0;f--,m--)if(u[f]!==p[m]){if(f!==1||m!==1)do if(f--,m--,m<0||u[f]!==p[m]){let h=`
${u[f].replace(" at new "," at ")}`,y=ie(e);return y&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",y)),h}while(f>=1&&m>=0);break}}}finally{Kr=!1,Error.prepareStackTrace=n,Fa(o),console.error=r,console.warn=i}let a=e?ie(e):"";return a?Ye(a):""},ad=(e,t)=>{let n=e.tag,o="";switch(n){case Fr:o=Ye("Activity");break;case Pr:o=Xr(e.type,!0);break;case Ar:o=Xr(e.type.render,!1);break;case kr:case Or:o=Xr(e.type,!1);break;case Rr:case Dr:case _r:o=Ye(e.type);break;case Hr:o=Ye("Lazy");break;case $r:o=e.child!==t&&t!==null?Ye("Suspense Fallback"):Ye("Suspense");break;case Ir:o=Ye("SuspenseList");break;case Vr:o=Ye("ViewTransition");break;default:return""}return o},sd=e=>{try{let t="",n=e,o=null;do{t+=ad(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=id(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},ld=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},cd=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),dd=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,ud=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!cd(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>dd(a,o))||(i.push(o),t.set(r,i))}return t},pd=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Ba,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},md=e=>{let t=[];return zr(e,n=>{if(!od(n))return;let o=typeof n.type=="string"?n.type:ie(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:ja(ld(n._debugStack?.stack))})},!0),t},Ae=async(e,t=!0,n)=>{let o=md(e),r=ja(sd(e)),i=ud(o),a=new Map;return nd(r.map(s=>s.source?.includes(Ba)??!1?pd(s,i,a):s).filter((s,c,d)=>{if(c===0)return!0;let u=d[c-1];return s.functionName!==u.functionName}),t,n)},Va=e=>e.split("/").filter(Boolean).length,fd=e=>e.split("/").filter(Boolean)[0]??null,gd=e=>{let t=e.indexOf("/",1);if(t===-1||Va(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!za.test(n)||Va(n)<2)return e;let o=fd(n);return!o||o.startsWith("@")||o.length>4?e:n},wn=e=>{if(!e||Dc.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=gd(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of Ic)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(Aa.test(t)){let i=t.match(Aa);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Fc.test(i)&&(t=t.slice(0,r))}return t},Sn=e=>{let t=wn(e);return!(!t||!za.test(t)||_c.test(t))}});function bd(e){if(!e)return"";let t=e;for(let o of hd)if(t.startsWith(o)){t=t.slice(o.length);break}let n=t.match(/\/_next\/static\/chunks\/(?:app\/)?(.+)/);n&&(t=n[1]);for(let o of yd)t=t.replace(o,"");return t.startsWith("/")&&!t.startsWith("./")&&(t=t.slice(1)),t.startsWith("./")&&(t=t.slice(2)),t}function Ke(e){if(!e)return"";let t=wn(e);if(t&&Sn(t))return t;let n=bd(e);return n&&Sn(n)||n&&/\.(tsx?|jsx?|mjs)$/.test(n)&&!n.includes("node_modules")&&!n.startsWith("../")&&!n.includes("/dist/")&&!n.includes("/build/")?n:""}var hd,yd,Nn=S(()=>{"use strict";xt();hd=["webpack-internal:///(app-pages-browser)/./","webpack-internal:///(ssr)/./","webpack-internal:///(rsc)/./","webpack-internal:///./","webpack-internal:///","webpack:///(app-pages-browser)/./","webpack:///./","webpack:///","/@fs/","file:///","file://"],yd=[/\?[a-f0-9]+$/,/\?v=\d+$/,/\?t=\d+$/,/\?import$/]});function Xe(e){return!!(vd.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function zt(e){return e?e.includes("node_modules")||e.includes("/dist/")||e.includes("/build/")||e.startsWith("../")||e.includes("framer-motion")||e.includes("react-router")||e.includes("@radix-ui")||e.includes("@mui")||e.includes("@emotion")||e.includes("styled-components"):!1}function Zr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function Jr(){Mn=new WeakMap}function Td(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function wd(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Cd}function Sd(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<Mo||o.height/window.innerHeight<Mo)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>Ed}function Ct(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&Zr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=Mn.get(e);if(o&&n-o.timestamp<xd)return o.isValid;let r=window.getComputedStyle(e);return Td(e,r)?e.clientWidth/window.innerWidth>=Mo&&e.clientHeight/window.innerHeight>=Mo&&(wd(r)||Sd(e,r))?(Mn.set(e,{isValid:!1,timestamp:n}),!1):(Mn.set(e,{isValid:!0,timestamp:n}),!0):(Mn.set(e,{isValid:!1,timestamp:n}),!1)}var vd,xd,Mo,Cd,Ed,Mn,Et=S(()=>{"use strict";vd=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode","MotionDOMComponent","MotionComponent","AnimatePresence","RenderedRoute","RenderErrorBoundary","Outlet","StyledComponent","EmotionCssPropInternal","Primitive","Slot","Transition","TransitionGroup"]);xd=50,Mo=.9,Cd=2147483600,Ed=1e3,Mn=new WeakMap});function Bt(e,t,n){return Math.min(n,Math.max(t,e))}function Md(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,c=r+e.height/2,d=Bt(Math.ceil(e.width/qa),Lo,ko),u=Bt(Math.ceil(e.height/qa),Lo,ko);if(d*u>Za){let h=Math.sqrt(Za/(d*u));d=Bt(Math.floor(d*h),Lo,ko),u=Bt(Math.floor(u*h),Lo,ko)}let p=new Set,f=[],m=(h,y)=>{let P=Bt(Math.round(h),0,t-1),M=Bt(Math.round(y),0,n-1),F=`${P}:${M}`;p.has(F)||(p.add(F),f.push({x:P,y:M}))};m(o+Se,r+Se),m(i-Se,r+Se),m(o+Se,a-Se),m(i-Se,a-Se),m(s,r+Se),m(s,a-Se),m(o+Se,c),m(i-Se,c),m(s,c);for(let h=0;h<d;h++){let y=o+(h+.5)/d*e.width;for(let P=0;P<u;P++)m(y,r+(P+.5)/u*e.height)}return f}function Ja(e,t=Ct,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Md(e);for(let c of i)for(let d of document.elementsFromPoint(c.x,c.y))r.add(d);let a=[];for(let c of r){if(!t(c))continue;let d=c.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;let u={left:d.left,top:d.top,right:d.left+d.width,bottom:d.top+d.height};if(n){let p=Math.max(o.left,u.left),f=Math.max(o.top,u.top),m=Math.min(o.right,u.right),h=Math.min(o.bottom,u.bottom),y=Math.max(0,m-p)*Math.max(0,h-f),P=d.width*d.height;P>0&&y/P>=Nd&&a.push(c)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(c)}let s=a.filter(c=>!a.some(d=>d!==c&&d.contains(c)));return s.sort((c,d)=>{let u=c.compareDocumentPosition(d);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}var Nd,qa,Lo,ko,Za,Se,Qa=S(()=>{"use strict";Et();Nd=.75,qa=32,Lo=3,ko=20,Za=100,Se=1});function Wt(e,t,n){return e+(t-e)*n}var es=S(()=>{"use strict"});function is(){let e=q();e&&(oe=document.createElement("canvas"),oe.setAttribute("data-frameup-overlay","true"),oe.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(oe),ri(),window.addEventListener("resize",ri))}function Ro(e,t=4){if(!e){ae&&(ae.targetOpacity=0,qe());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!ae||!ae.initialized?ae=si(n,t):(ae.target=n,ae.borderRadius=t,ae.targetOpacity=1),qe()}function Tt(e,t=4){if(!e){j&&(j.targetOpacity=0,qe());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!j||!j.initialized?j=si(n,t):(j.target=n,j.borderRadius=t,j.targetOpacity=1),qe()}function as(e){st=e,qe()}function ii(){st=null,qe()}function ss(e){for(j=null;G.length>e.length;)G.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<G.length?(G[t].target=o,G[t].borderRadius=n.borderRadius,G[t].targetOpacity=1):G.push(si(o,n.borderRadius))}qe()}function kn(){G=[],qe()}function ai(e,t){if(!oi)return null;let n=ds();if(!n)return null;let o=ms(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=os*os)return r.corner}return null}function ls(){return ds()}function cs(){Ut!==null&&cancelAnimationFrame(Ut),window.removeEventListener("resize",ri),oe?.remove(),oe=null,R=null,ae=null,j=null,G=[],st=null}function ds(){if(G.length>1)return us(G);if(j&&j.opacity>=.5){let{x:e,y:t,w:n,h:o}=j.current;return{x:e,y:t,w:n,h:o}}if(G.length===1){let{x:e,y:t,w:n,h:o}=G[0].current;return{x:e,y:t,w:n,h:o}}return null}function us(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:d}=i.current;a<t&&(t=a),s<n&&(n=s),a+c>o&&(o=a+c),s+d>r&&(r=s+d)}return{x:t,y:n,w:o-t,h:r-n}}function si(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function ri(){oe&&(Ln=Math.max(window.devicePixelRatio||1,kd),Qr=window.innerWidth,ei=window.innerHeight,oe.width=Qr*Ln,oe.height=ei*Ln,oe.style.width=`${Qr}px`,oe.style.height=`${ei}px`,R=oe.getContext("2d"),qe())}function qe(){Ut===null&&(Ut=requestAnimationFrame(ps))}function ps(){if(Ut=null,!R||!oe)return;let e=!1;ae?.initialized&&(ti(ae,Ld)&&(e=!0),ae.opacity<.01&&ae.targetOpacity===0&&(ae=null)),j?.initialized&&(ti(j,ts)&&(e=!0),j.opacity<.01&&j.targetOpacity===0&&(j=null));for(let t=G.length-1;t>=0;t--){let n=G[t];n.initialized&&ti(n,ts)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&G.splice(t,1)}if(R.setTransform(1,0,0,1,0,0),R.clearRect(0,0,oe.width,oe.height),R.setTransform(Ln,0,0,Ln,0,0),ae&&ni(R,ae,jt,Pd),j&&(ni(R,j,jt,ns),oi&&rs(R,j.current,j.opacity)),st){if(R.save(),R.globalAlpha=.6,R.strokeStyle=jt,R.lineWidth=1,R.setLineDash([4,4]),st.verticalLine){let{x:t}=st.verticalLine;R.beginPath(),R.moveTo(t,0),R.lineTo(t,oe.height),R.stroke()}if(st.horizontalLine){let{y:t}=st.horizontalLine;R.beginPath(),R.moveTo(0,t),R.lineTo(oe.width,t),R.stroke()}R.restore()}if(G.length>0){for(let t of G)ni(R,t,jt,ns);if(oi&&G.length>0){let t=us(G);t&&t.w>=24&&t.h>=24&&(G.length>1&&(R.globalAlpha=.6,R.beginPath(),R.rect(t.x,t.y,t.w,t.h),R.strokeStyle=jt,R.lineWidth=1,R.setLineDash([4,4]),R.stroke(),R.setLineDash([]),R.globalAlpha=1),rs(R,t,1))}}e&&(Ut=requestAnimationFrame(ps))}function ti(e,t){let n=e.current,o=e.target,r=Wt(n.x,o.x,t),i=Wt(n.y,o.y,t),a=Wt(n.w,o.w,t),s=Wt(n.h,o.h,t),c=Wt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<Po&&Math.abs(i-o.y)<Po&&Math.abs(a-o.w)<Po&&Math.abs(s-o.h)<Po&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=c,!0)}function ni(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function ms(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function rs(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=ms(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,Rd,0,Math.PI*2),e.fillStyle=Ad,e.fill(),e.strokeStyle=$d,e.lineWidth=Od,e.stroke();e.globalAlpha=1}var Ld,ts,Po,kd,oe,R,Qr,ei,Ln,Ut,ae,j,G,jt,Pd,ns,Rd,os,Ad,$d,Od,oi,st,Ao=S(()=>{"use strict";Ne();es();X();Ld=.35,ts=.3,Po=.5,kd=2,oe=null,R=null,Qr=0,ei=0,Ln=1,Ut=null,ae=null,j=null,G=[],jt=l.accent,Pd="rgba(162,89,255,0.08)",ns="rgba(162,89,255,0.15)",Rd=4,os=10,Ad="#ffffff",$d=jt,Od=1.5,oi=!0,st=null});var Hd,Id,Dd,_d,Fd,Ve,fs=S(()=>{"use strict";Hd=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Id=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Dd=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],_d=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Fd=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Ve=[...Hd,...Id,...Dd,..._d,...Fd]});function gs(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${x};`,a.appendChild(s),a.appendChild(c);let d=new Map(t);function u(){return d.get(r.key)??r.defaultValue}function p(f){let m=parseFloat(f);s.value=isNaN(m)?f:String(m);try{let y=Ca(i,f).find(P=>P.cssValue===f);y?.token?c.textContent=`${r.tailwindPrefix}-${y.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let f=s.value.trim(),m=parseFloat(f);if(isNaN(m))Vd.has(f)?(d.set(r.key,f),p(f),n(r.key,f),o()):p(u());else{let y=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${m}px`;d.set(r.key,y),p(y),n(r.key,y),o()}}),s.addEventListener("keydown",f=>{f.key==="Enter"?s.blur():f.key==="Escape"&&(p(u()),s.blur())}),p(u()),{element:a,setValue(f,m){f===r.key&&(d.set(f,m),p(m))},destroy(){}}}var Vd,hs=S(()=>{"use strict";Ft();X();Vd=new Set(["auto","none","normal","inherit","initial"])});function ys(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${k.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,c=[];function d(u){s=u;for(let{btn:p,value:f,opt:m}of c){let h=f===u;p.style.background=h?l.accent:"transparent",p.style.color=h?l.textOnAccent:l.textSecondary,p.title=h&&m.tailwindValue?`${m.label} (${m.tailwindValue})`:m.label}}for(let u of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${k.xs};
      font-family:${x};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=u.icon??u.label,p.title=u.label,p.addEventListener("click",()=>{d(u.value),n(r.key,u.value),o()}),c.push({btn:p,value:u.value,opt:u}),a.appendChild(p)}return d(s),{element:a,setValue(u,p){u===r.key&&d(p)},destroy(){}}}var bs=S(()=>{"use strict";X()});function Pn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let c=r===0?0:a/r*100,d=r*100;return{h:s,s:c,v:d}}function $o(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),c=o*(1-(1-i)*n),d,u,p;switch(r%6){case 0:d=o,u=c,p=a;break;case 1:d=s,u=o,p=a;break;case 2:d=a,u=o,p=c;break;case 3:d=a,u=s,p=o;break;case 4:d=c,u=a,p=o;break;case 5:d=o,u=a,p=s;break;default:d=0,u=0,p=0}let f=m=>Math.round(m*255).toString(16).padStart(2,"0");return`#${f(d)}${f(u)}${f(p)}`}var vs=S(()=>{"use strict"});function Oo(e){Gt();let t=q();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${O.lg};
    border-radius: ${k.md};
    font-family: ${x};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let b=n.getBoundingClientRect();b.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-b.height-8}px`),n.style.opacity="1"});let o=Pn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=zd(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${O.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),n.appendChild(c);function d(){let b=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${b}, 0%, 100%)`),T.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let W=a.createLinearGradient(0,0,0,120);W.addColorStop(0,"rgba(0,0,0,0)"),W.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=W,a.fillRect(0,0,176,120);let te=o.s/100*176,ne=(1-o.v/100)*120;s.style.left=`${te}px`,s.style.top=`${ne}px`}let u=!1;i.addEventListener("mousedown",b=>{u=!0,p(b)});function p(b){let T=i.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left)),te=Math.max(0,Math.min(120,b.clientY-T.top));o.s=W/176*100,o.v=(1-te/120)*100,d(),$()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let m=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${O.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(f),y.appendChild(h),n.appendChild(y);function P(){let b=m.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)b.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);m.fillStyle=b,m.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let M=!1;f.addEventListener("mousedown",b=>{M=!0,F(b)});function F(b){let T=f.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left));o.h=W/176*360,P(),d(),$()}let _=document.createElement("input");_.type="text",_.value=$o(o),_.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${k.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,_.addEventListener("keydown",b=>{b.key==="Enter"&&_.blur(),b.stopPropagation()}),_.addEventListener("blur",()=>{let b=_.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let T=b.startsWith("#")?b:`#${b}`;o=Pn(T),d(),P(),$()}else _.value=$o(o)}),n.appendChild(_);let U=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],E=document.createElement("div");E.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of U){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${C.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=O.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=Pn(b),d(),P(),_.value=b,$()}),E.appendChild(T)}if(n.appendChild(E),e.projectColors&&e.projectColors.length>0){let b=document.createElement("div");b.textContent="Project",b.style.cssText=`
      font-size: 10px;
      color: ${l.textSecondary};
      font-family: ${x};
      margin-top: 2px;
    `,n.appendChild(b);let T=document.createElement("div");T.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:W,hex:te}of e.projectColors){let ne=document.createElement("button");ne.title=W,ne.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${te};
        border: 1px solid ${l.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${C.fast};
      `,ne.addEventListener("mouseenter",()=>{ne.style.boxShadow=O.sm}),ne.addEventListener("mouseleave",()=>{ne.style.boxShadow="none"}),ne.addEventListener("click",()=>{o=Pn(te),d(),P(),_.value=te,$(),e.onPickedToken?.(W)}),T.appendChild(ne)}n.appendChild(T)}function $(){let b=$o(o);_.value=b,e.onColorChange(b),e.onPickedToken?.(void 0)}t.appendChild(n),lt=n,d(),P();let fe=b=>{u&&p(b),M&&F(b)},ge=()=>{u=!1,M=!1};document.addEventListener("mousemove",fe),document.addEventListener("mouseup",ge);let A=b=>{b.key==="Escape"&&Gt()};document.addEventListener("keydown",A,!0);let K=b=>{lt&&!b.composedPath().includes(lt)&&Gt()};setTimeout(()=>document.addEventListener("mousedown",K,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",fe),document.removeEventListener("mouseup",ge),document.removeEventListener("keydown",A,!0),document.removeEventListener("mousedown",K,!0)},n._onClose=e.onClose}function Gt(){lt&&(lt._cleanup?.(),lt._onClose?.(),lt.remove(),lt=null)}function zd(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?l.bgPrimary:"transparent"};
      box-shadow: ${i===t?O.sm:"none"};
      color: ${i===t?l.textPrimary:l.textSecondary};
      font-family: ${x}; font-size: 12px; cursor: pointer;
      transition: background ${C.fast}, color ${C.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?O.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var lt,li=S(()=>{"use strict";X();Ne();vs();lt=null});function Bd(){return ci||(ci=document.createElement("canvas").getContext("2d")),ci}function xs(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${k.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${x};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let d=t.get(r.key)??r.defaultValue,u=!1;function p(h){let y=h.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let P=Bd();P.fillStyle="#000000",P.fillStyle=y;let M=P.fillStyle;if(M.startsWith("#"))return M;let F=M.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(F){let _=parseInt(F[1],10),U=parseInt(F[2],10),E=parseInt(F[3],10);return`#${((1<<24)+(_<<16)+(U<<8)+E).toString(16).slice(1)}`}return"#000000"}function f(h){d=h,s.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let y=vt(),P=xo(h,y.colorsReverse);P?c.textContent=`${r.tailwindPrefix??"bg"}-${P}`:c.textContent=""}catch{c.textContent=""}}function m(){if(u)return;let h=s.value.trim();if(!h){f(d);return}let y=p(h);f(y),n(r.key,y),o()}return a.addEventListener("click",()=>{if(u){Gt(),u=!1;return}let h=a.getBoundingClientRect();u=!0,Oo({initialColor:p(d),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:y=>{f(y),n(r.key,y)},onClose:()=>{u=!1,o()}})}),s.addEventListener("keydown",h=>{h.key==="Enter"?(m(),s.blur()):h.key==="Escape"&&(f(d),s.blur())}),s.addEventListener("blur",()=>{m()}),s.addEventListener("input",()=>{let h=s.value.trim(),y=p(h);a.style.background=y}),f(d),{element:i,setValue(h,y){h===r.key&&f(y)},destroy(){u&&(Gt(),u=!1)}}}var ci,Cs=S(()=>{"use strict";X();li();Ft();ci=null});function Es(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Ts(e,t,n,o){let r=new Map(t),i=[];for(let N of e){let w=Es(N.key);w&&i.push({descriptor:N,...w})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${x};
    font-size:10px;
    color:${l.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("div");s.style.cssText="position:relative; padding:4px;";let c=document.createElement("div");c.style.cssText=`
    background:${l.marginBoxBg};
    border:1px dashed ${l.marginBoxBorder};
    border-radius:${k.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let d=document.createElement("div");d.style.cssText=`
    background:${l.paddingBoxBg};
    border:1px dashed ${l.paddingBoxBorder};
    border-radius:${k.sm};
    padding:8px;
    position:relative;
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let u=document.createElement("div");u.style.cssText=`
    grid-row:2;
    grid-column:2;
    text-align:center;
    color:${l.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${l.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let p=[];function f(N){let w=document.createElement("span"),Te=r.get(N.key)??N.defaultValue;return w.textContent=F(Te),w.title=N.label,w.style.cssText=`
      cursor:pointer;
      color:${l.textPrimary};
      font-size:10px;
      font-family:${x};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=l.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==m||m.dataset.key!==N.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{P(N,w)}),p.push({key:N.key,span:w,descriptor:N}),w}let m=document.createElement("input");m.type="text",m.className="prop-input",m.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(m);let h=null,y=null;function P(N,w){h&&h!==N&&M(),h=N,y=w,m.dataset.key=N.key;let Te=r.get(N.key)??N.defaultValue;m.value=F(Te);let re=0,bt=0,rt=w;for(;rt&&rt!==a;)re+=rt.offsetLeft,bt+=rt.offsetTop,rt=rt.offsetParent;m.style.display="block",m.style.left=`${re}px`,m.style.top=`${bt}px`;let va=w.getBoundingClientRect();m.style.width=`${Math.max(40,va.width+10)}px`,m.focus(),m.select()}function M(){if(!h||!y)return;let N=m.value.trim(),w=h,Te=y,re,bt=parseFloat(N),rt=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(bt)?rt.has(N)?re=N:re=r.get(w.key)??w.defaultValue:re=N.match(/(px|rem|em|%|vw|vh|ch)$/)?N:`${bt}px`,r.set(w.key,re),Te.textContent=F(re),Te.style.background="transparent",m.style.display="none",m.dataset.key="",h=null,y=null,n(w.key,re),o()}m.addEventListener("keydown",N=>{if(N.key==="Enter")M();else if(N.key==="Escape"){if(h&&y){let w=r.get(h.key)??h.defaultValue;y.textContent=F(w)}m.style.display="none",m.dataset.key="",h=null,y=null}}),m.addEventListener("blur",()=>{M()});function F(N){let w=parseFloat(N);return isNaN(w)?N:w===Math.round(w)?String(Math.round(w)):N}function _(N){let w=document.createElement("span");return w.textContent=N,w.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function U(N,w){return i.find(Te=>Te.layer===N&&Te.side===w)}function E(N,w){let Te=U(N,w);if(!Te){let re=document.createElement("span");return re.textContent="-",re.style.cssText=`text-align:center; color:${l.textTertiary};`,re}return f(Te.descriptor)}let $=E("padding","top");$.style.gridRow="1",$.style.gridColumn="2",$.style.textAlign="center";let fe=E("padding","left");fe.style.gridRow="2",fe.style.gridColumn="1";let ge=E("padding","right");ge.style.gridRow="2",ge.style.gridColumn="3";let A=E("padding","bottom");A.style.gridRow="3",A.style.gridColumn="2",A.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",d.appendChild($),d.appendChild(fe),d.appendChild(u),d.appendChild(ge),d.appendChild(A);let K=document.createElement("div");K.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=E("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let T=E("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let W=E("margin","right");W.style.gridRow="2",W.style.gridColumn="3";let te=E("margin","bottom");te.style.gridRow="3",te.style.gridColumn="2",te.style.textAlign="center";let ne=document.createElement("div");ne.style.cssText="grid-row:2; grid-column:2;",ne.appendChild(d),K.appendChild(b),K.appendChild(T),K.appendChild(ne),K.appendChild(W),K.appendChild(te);let bo=_("margin"),Lc=_("padding"),vo=document.createElement("div");return vo.style.cssText="display:flex; gap:8px; padding:0 4px;",vo.appendChild(bo),vo.appendChild(Lc),c.appendChild(K),s.appendChild(c),a.appendChild(vo),a.appendChild(s),{element:a,setValue(N,w){if(!Es(N))return;r.set(N,w);let re=p.find(bt=>bt.key===N);re&&(re.span.textContent=F(w))},destroy(){}}}var ws=S(()=>{"use strict";X()});function Ss(e){return Ho.has(e)}function Ns(e){return Io.push(e),()=>{let t=Io.indexOf(e);t>=0&&Io.splice(t,1)}}function Gd(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Yd(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Kd(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}function qd(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function di(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=Ud,i.appendChild(a);let s=[],c=Yd(e);for(let[d,u]of c){let p=d==="layout"&&!qd(t)?u.filter(M=>!Xd.has(M.key)):u;if(p.length===0)continue;let f=document.createElement("div");f.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Wd[d]}</span>${Gd()}`;let h=document.createElement("div");h.className="prop-section-body";let y=Ho.has(d);if(y){let M=m.querySelector(".prop-section-chevron");M&&M.classList.add("collapsed"),h.classList.add("collapsed")}m.addEventListener("click",()=>{if(y=!y,y)Ho.add(d);else{Ho.delete(d);for(let F of Io)F(d)}let M=m.querySelector(".prop-section-chevron");M&&M.classList.toggle("collapsed",y),h.classList.toggle("collapsed",y)}),f.appendChild(m);let P=Kd(p);for(let M of P){let F=jd[M.controlType];if(!F)continue;let _=F(M.descriptors,t,n,o);if(M.descriptors.length>1||M.controlType==="box-model")h.appendChild(_.element);else{let U=document.createElement("div");U.className="prop-control-row";let E=document.createElement("span");E.className="prop-control-label",E.textContent=M.descriptors[0].label,E.title=M.descriptors[0].label;let $=document.createElement("div");$.className="prop-control-value",$.appendChild(_.element),U.appendChild(E),U.appendChild($),h.appendChild(U)}s.push(_)}f.appendChild(h),i.appendChild(f)}if(r){let d=document.createElement("div");d.className="prop-show-all",d.textContent="Show all properties",d.addEventListener("click",r),i.appendChild(d)}return{container:i,controls:s}}var Ho,Io,Wd,jd,Ud,Xd,Ms=S(()=>{"use strict";hs();bs();Cs();ws();X();Ho=new Set;Io=[];Wd={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},jd={"number-scrub":gs,segmented:ys,"color-swatch":xs,"box-model":Ts},Ud=`
  .prop-section {
    border-bottom: 1px solid ${l.border};
  }
  .prop-section:last-child {
    border-bottom: none;
  }
  .prop-section-header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: ${l.bgSecondary};
    cursor: pointer;
    user-select: none;
    font-family: ${x};
    font-size: 11px;
    font-weight: 600;
    color: ${l.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .prop-section-header:hover {
    background: ${l.bgTertiary};
  }
  .prop-section-chevron {
    width: 12px;
    height: 12px;
    transition: transform 150ms ease;
    color: ${l.textTertiary};
  }
  .prop-section-chevron.collapsed {
    transform: rotate(-90deg);
  }
  .prop-section-body {
    padding: 10px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .prop-section-body.collapsed {
    display: none;
  }
  .prop-input {
    background: ${l.bgTertiary};
    border: 1px solid ${l.border};
    border-radius: ${k.xs};
    padding: 4px 6px;
    font-family: ${x};
    font-size: 11px;
    color: ${l.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${C.fast}, box-shadow ${C.fast};
  }
  .prop-input:hover {
    border-color: ${l.borderStrong};
  }
  .prop-input:focus {
    border-color: ${l.accent};
    box-shadow: 0 0 0 2px ${l.focusRing};
  }
  .prop-control-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .prop-control-label {
    width: 48px;
    flex-shrink: 0;
    font-size: 10px;
    font-family: ${x};
    color: ${l.textTertiary};
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .prop-control-value {
    flex: 1;
    min-width: 0;
  }
  .prop-show-all {
    padding: 8px 14px;
    font-family: ${x};
    font-size: 11px;
    color: ${l.textTertiary};
    cursor: pointer;
    text-align: center;
    user-select: none;
  }
  .prop-show-all:hover {
    color: ${l.accent};
  }
`;Xd=new Set(["flexDirection","justifyContent","alignItems","gap"])});function eu(){try{let e=localStorage.getItem(Ps);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Ls&&t<=ks)return t}}catch{}return Math.min(Zd,Math.floor(window.innerWidth*.22))}function tu(e){try{localStorage.setItem(Ps,String(e))}catch{}}function Rs(e,t){let n=document.createElement("style");n.textContent=Qd,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${eu()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let d=document.createElement("div");d.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(d);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Collapse panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let m=!1,h=0,y=0;r.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),m=!0,h=A.clientX,y=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(A.pointerId)}),r.addEventListener("pointermove",A=>{if(!m)return;let K=h-A.clientX,b=Math.max(Ls,Math.min(ks,y+K));o.style.width=`${b}px`});let P=()=>{m&&(m=!1,r.classList.remove("active"),tu(o.offsetWidth))};r.addEventListener("pointerup",P),r.addEventListener("pointercancel",P),o.addEventListener("pointerdown",A=>A.stopPropagation()),o.addEventListener("mousedown",A=>A.stopPropagation()),o.addEventListener("click",A=>A.stopPropagation()),o.addEventListener("mouseup",A=>A.stopPropagation()),u.addEventListener("click",()=>{_(),t&&t()});let M=!1;function F(A,K,b,T){s.textContent=`<${A}>`,s.appendChild(c),d.textContent=`${K}:${b}`,d.title=`${K}:${b}`,f.innerHTML="",f.appendChild(T),M||(M=!0,o.offsetHeight,o.classList.add("visible"))}function _(){M&&(M=!1,o.classList.remove("visible"))}function U(A){f.innerHTML="",f.appendChild(A)}function E(A,K,b){p.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=A;let W=document.createElement("button");W.className="prop-sidebar-warning-btn",W.textContent=K,W.addEventListener("click",te=>{te.stopPropagation(),b()}),p.appendChild(T),p.appendChild(W),p.style.display="flex"}function $(){p.style.display="none",p.innerHTML=""}function fe(){c.classList.add("active")}function ge(){c.classList.remove("active")}return{show:F,hide:_,isVisible:()=>M,getElement:()=>o,replaceContent:U,showWarning:E,clearWarning:$,showSaving:fe,hideSaving:ge}}var Zd,Ls,ks,Ps,Jd,Qd,As=S(()=>{"use strict";X();Zd=300,Ls=260,ks=380,Ps="frameup-sidebar-width",Jd=4,Qd=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${O.lg};
    z-index: 2147483645;
    font-family: ${x};
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform ${C.settle};
    overflow: hidden;
  }
  .prop-sidebar.visible {
    transform: translateX(0);
  }
  .prop-sidebar-resize {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${Jd}px;
    cursor: col-resize;
    z-index: 1;
  }
  .prop-sidebar-resize:hover,
  .prop-sidebar-resize.active {
    background: ${l.accent};
    opacity: 0.3;
  }
  .prop-sidebar-header {
    padding: 12px 16px;
    border-bottom: 1px solid ${l.border};
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }
  .prop-sidebar-header-info {
    flex: 1;
    min-width: 0;
  }
  .prop-sidebar-close {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    color: ${l.textTertiary};
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${k.sm};
  }
  .prop-sidebar-close:hover {
    background: ${l.bgTertiary};
    color: ${l.textPrimary};
  }
  .prop-sidebar-component-name {
    font-size: 13px;
    font-weight: 600;
    color: ${l.textPrimary};
    margin: 0 0 4px;
    line-height: 1.3;
  }
  .prop-sidebar-file-path {
    font-size: 11px;
    color: ${l.textTertiary};
    margin: 0;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: rtl;
    text-align: left;
  }
  .prop-sidebar-saving-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${l.accent};
    margin-left: 6px;
    vertical-align: middle;
    opacity: 0;
    transition: opacity 150ms ease;
  }
  .prop-sidebar-saving-dot.active {
    opacity: 1;
    animation: prop-saving-pulse 0.8s ease-in-out infinite;
  }
  @keyframes prop-saving-pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  .prop-sidebar-warning {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: ${l.dangerSoft};
    border-bottom: 1px solid ${l.danger};
    font-family: ${x};
    font-size: 11px;
    color: ${l.danger};
    flex-shrink: 0;
  }
  .prop-sidebar-warning-text {
    flex: 1;
    font-weight: 500;
  }
  .prop-sidebar-warning-btn {
    border: 1px solid ${l.danger};
    background: none;
    color: ${l.danger};
    font-family: ${x};
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: ${k.xs};
    cursor: pointer;
    white-space: nowrap;
  }
  .prop-sidebar-warning-btn:hover {
    background: ${l.danger};
    color: #ffffff;
  }
  .prop-sidebar-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .prop-sidebar-content::-webkit-scrollbar {
    width: 6px;
  }
  .prop-sidebar-content::-webkit-scrollbar-track {
    background: transparent;
  }
  .prop-sidebar-content::-webkit-scrollbar-thumb {
    background: ${l.borderStrong};
    border-radius: 3px;
  }
`});function ct(e){let t=ui.get(e);if(t){if(Date.now()-t.timestamp>3e4){ui.delete(e);return}return t.filePath}}function dt(e,t){ui.set(e,{filePath:t,timestamp:Date.now()})}var ui,Rn=S(()=>{"use strict";ui=new Map});function $s(e){let t=e.parentElement,n=t?getComputedStyle(t):null,o=getComputedStyle(e);return{display:n?.display??"block",flexDirection:n?.flexDirection??"row",elementPosition:o.position}}function nu(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function ut(e){e.element.style.transform=nu(e.delta.dx,e.delta.dy,e.existingTransform)}function Os(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function An(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=O.lg,e.style.transition="none",e.style.zIndex="2147483644"}function Hs(e){ut(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function pi(e){let t=e.parentElement;if(!t)return 0;let n=e.tagName,o=0;for(let r of Array.from(t.children)){if(r===e)break;r.tagName===n&&o++}return o}function Yt(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=J(n);for(;o;){if(he(o)){let r=o._debugSource,i=ie(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Do(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=J(n);if(!o)continue;let r=await Ae(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=wn(i.fileName);if(Sn(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var $n=S(()=>{"use strict";at();xt();X()});var Go={};xa(Go,{addAnnotation:()=>xi,addMove:()=>bi,addTextEditAnnotation:()=>jo,buildBatchOperations:()=>Mi,canUndo:()=>Ni,canvasUndo:()=>Uo,getActiveTool:()=>Dn,getAnnotations:()=>ru,getCanvasTransform:()=>ze,getMoveContainingElement:()=>Si,getMoveForElement:()=>wi,getMoves:()=>yi,getOriginalsHidden:()=>iu,getToolOptions:()=>Kt,hasChanges:()=>Nt,hasMoveForElement:()=>Ti,hasTextAnnotations:()=>qt,onAnnotationRemoved:()=>Ei,onCanvasTransformChange:()=>Vn,onStateChange:()=>hi,onToolChange:()=>gi,pageToViewport:()=>lu,peekUndoStack:()=>su,pushUndoAction:()=>_n,removeAnnotation:()=>Vo,removeMove:()=>Wo,resetCanvas:()=>St,restoreMoveDelta:()=>ou,serializeTextAnnotationsOnly:()=>Li,setActiveTool:()=>zo,setCanvasTransform:()=>Fn,setOriginalsHidden:()=>au,setToolOption:()=>Bo,updateMoveDelta:()=>vi,viewportToPage:()=>Xt});function gi(e){return _o.push(e),()=>{_o=_o.filter(t=>t!==e)}}function hi(e){return Fo.push(e),()=>{Fo=Fo.filter(t=>t!==e)}}function pt(){Fo.forEach(e=>e())}function Dn(){return mi}function zo(e){let t=mi;t!==e&&(mi=e,_o.forEach(n=>n(e,t)))}function Kt(){return{...Ds}}function Bo(e,t){Ds[e]=t}function yi(){return ce}function bi(e){ce.set(e.id,e),_n({type:"moveCreate",moveId:e.id})}function vi(e,t,n){let o=ce.get(e);o&&(o.delta=t,ut(o),_n({type:"moveDelta",moveId:e,previousDelta:n}))}function ou(e,t){let n=ce.get(e);n&&(n.delta=t,ut(n),pt())}function Wo(e){let t=ce.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),ce.delete(e),pt())}function ru(){return Me}function xi(e){if(Me.push(e),e.type==="colorChange"){let t=e;$e.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else $e.push({type:"annotationAdd",annotationId:e.id});pt()}function jo(e,t,n,o){Me.push(e),o&&Ci.set(e.id,o),$e.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),pt()}function Ei(e){_s=e}function Vo(e){Me=Me.filter(t=>t.id!==e),_s?.(e),pt()}function iu(){return fi}function au(e){fi=e;for(let t of ce.values())e?ut(t):Os(t);pt()}function Ti(e){for(let t of ce.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return!0;return!1}function wi(e){for(let t of ce.values())if(t.element===e)return t}function Si(e){for(let t of ce.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return t}function Uo(){let e=$e.pop();if(!e)return null;switch(e.type){case"moveCreate":return Wo(e.moveId),"move removed";case"moveDelta":{let t=ce.get(e.moveId);return t&&(t.delta=e.previousDelta,ut(t)),"move reverted"}case"annotationAdd":return Vo(e.annotationId),"annotation removed";case"colorChange":{let t=Me.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Vo(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=Yt(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),Vo(e.annotationId),"text edit reverted"}}return null}function _n(e){$e.push(e),pt()}function su(){return $e.length>0?$e[$e.length-1]:null}function ze(){return{scale:wt,offsetX:Hn,offsetY:In}}function Fn(e,t,n){wt=e,Hn=t,In=n,On.forEach(o=>o())}function Vn(e){return On.push(e),()=>{On=On.filter(t=>t!==e)}}function Xt(e,t){return{x:(e-Hn)/wt,y:(t-In)/wt}}function lu(e,t){return{x:e*wt+Hn,y:t*wt+In}}function St(){for(let e of ce.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Me)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of $e)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}ce=new Map,Me=[],$e=[],pendingPropertyOps=[],Ci.clear(),fi=!0,wt=1,Hn=0,In=0,On.forEach(e=>e()),pt()}function Nt(){return ce.size>0||Me.length>0}function Ni(){return $e.length>0}function Is(e){let t=Math.abs(e),n=vt(),o=null,r=1/0;for(let[i,a]of n.spacing){let s;if(a.endsWith("rem"))s=parseFloat(a)*cu;else if(a.endsWith("px"))s=parseFloat(a);else continue;if(Number.isNaN(s))continue;let c=Math.abs(t-s);c<r&&(r=c,o=i)}return o!==null&&r<=Math.min(t*.15,8)?o:`[${Math.round(t)}px]`}function du(e){if(!e)return"block";let t=e.elementPosition;if(t==="absolute"||t==="fixed")return"positioned";let n=e.display;return n==="flex"||n==="inline-flex"?"flex":n==="grid"||n==="inline-grid"?"grid":"block"}function Mi(){let e=[];for(let t of Me){if(t.type==="colorChange"){let n=t,o=n.property==="backgroundColor"?"bg":"text";e.push({op:"updateClass",file:n.component.filePath,line:n.component.lineNumber,col:n.columnNumber??0,componentName:n.component.componentName,updates:[{tailwindPrefix:o,tailwindToken:n.pickedToken??null,value:n.toColor}]})}if(t.type==="textEdit"){let n=t;if(n.filePath){let o=Ci.get(n.id);e.push({op:"updateText",file:n.filePath,line:n.lineNumber,col:n.columnNumber,componentName:n.componentName,tagName:o?.tagName,className:o?.className,parentTagName:o?.parentTagName,parentClassName:o?.parentClassName,originalText:n.originalText,newText:n.newText})}}}for(let t of ce.values()){let n=t.identity.filePath||t.componentRef.filePath;if(!n)continue;let o=t.identity.lineNumber,r=t.identity.columnNumber,i=du(t.parentLayout),a=t.element.tagName.toLowerCase(),s=t.element.className||void 0,c=t.element.parentElement,d=c?.tagName.toLowerCase(),u=c?.className||void 0,p=t.element.id||void 0,f={componentName:t.componentRef.componentName,tagName:a,className:s,parentTagName:d,parentClassName:u,nthOfType:t.nthOfType,id:p,jsxKey:t.jsxKey,fileMtime:t.fileMtime,fileSize:t.fileSize};Math.abs(t.delta.dx)>=1&&e.push({op:"moveSpacing",file:n,line:o,col:r,...f,axis:"x",token:Is(t.delta.dx),direction:t.delta.dx>0?"positive":"negative",layoutContext:i}),Math.abs(t.delta.dy)>=1&&e.push({op:"moveSpacing",file:n,line:o,col:r,...f,axis:"y",token:Is(t.delta.dy),direction:t.delta.dy>0?"positive":"negative",layoutContext:i})}return e}function qt(){return Me.some(e=>e.type==="text")}function Li(){let e=[];for(let t of Me)t.type==="text"&&e.push({type:"text",content:t.content,position:t.position,targetComponent:t.targetComponent?.componentName,targetFile:t.targetComponent?.filePath,targetLine:t.targetComponent?.lineNumber});return{moves:[],annotations:e,colorChanges:[],textEdits:[]}}var ce,Me,$e,mi,fi,Ds,wt,Hn,In,On,_o,Fo,Ci,_s,cu,de=S(()=>{"use strict";$n();Ft();ce=new Map,Me=[],$e=[],mi="select",fi=!0,Ds={fontSize:16,textColor:"#ffffff"},wt=1,Hn=0,In=0,On=[],_o=[],Fo=[];Ci=new Map;_s=null;cu=16});function Vs(){if(localStorage.getItem(Fs))return;let e=q();if(!e)return;Oe=document.createElement("div"),Oe.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${l.bgSecondary};
    font-family: ${x};
    font-size: 12px;
    color: ${l.textSecondary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
    pointer-events: auto;
  `;let t=document.createElement("span");t.textContent="Click any element to edit its properties. Double-click text to edit it.";let n=document.createElement("span");n.textContent="\xD7",n.style.cssText=`
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 4px;
    color: ${l.textTertiary};
  `,n.addEventListener("click",()=>zn()),Oe.appendChild(t),Oe.appendChild(n),e.appendChild(Oe),requestAnimationFrame(()=>{Oe&&(Oe.style.opacity="1")})}function zn(){Oe&&(localStorage.setItem(Fs,"1"),Oe.style.opacity="0",setTimeout(()=>{Oe?.remove(),Oe=null},150))}var Fs,Oe,ki=S(()=>{"use strict";X();Ne();Fs="frameup-onboarding-dismissed",Oe=null});var zs=S(()=>{"use strict"});var Bs=S(()=>{"use strict"});function Ys(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||pu.has(r))&&t.add("typography"),t}function fu(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){Lt();return}let n=gu(e);if(n){Us(n,t).then(o=>{Jt(n,o)});return}hu(e).then(async o=>{if(o){let r=await Us(o,t);Jt(o,r)}else Lt()})}function gu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=J(n);for(;o;){if(he(o)){let r=o._debugSource,i=ie(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function hu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=J(n);if(!o)continue;let r=await Ae(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s=Ke(i.fileName);if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}async function Us(e,t){let n=J(e);if(!n)return t;try{let r=await Ae(n);if(r&&r.length>0)for(let i of r){if(!i.functionName)continue;let a=i.functionName;if(a[0]===a[0].toUpperCase()&&(a===t.componentName||!t.componentName)){let s=Ke(i.fileName);if(s){let c=e.getBoundingClientRect();return{...t,filePath:s,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:c.top,left:c.left,width:c.width,height:c.height}}}}}}catch{}let o=n;for(;o;){if(he(o)){let r=ie(o.type),i=o._debugSource||o._debugOwner?._debugSource;if(r===t.componentName&&i?.fileName){let a=e.getBoundingClientRect();return{...t,filePath:i.fileName,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:a.top,left:a.left,width:a.width,height:a.height}}}}o=o.return}return t}function yu(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Ve){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function bu(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of Ve){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of Mt)i.setValue(n.key,r)}}function Bn(){for(let e of Mt)e.destroy();Mt=[]}function Pi(){if(!g.selectedElement||!g.componentInfo)return;Bn();let e=g.showAllGroups?null:Ys(g.selectedElement),t=e?Ve.filter(a=>e.has(a.group)):Ve,o=e!==null&&t.length<Ve.length?()=>Zs(!0):void 0,{container:r,controls:i}=di(t,g.currentValues,Wn,qo,o);Mt=i,Y.replaceContent(r)}function qo(){we&&clearTimeout(we),we=setTimeout(()=>{we=null,Ai()},mu)}function Ri(){we&&(clearTimeout(we),we=null),Zt&&(Zt(),Zt=null),mt&&(clearTimeout(mt.timeoutId),mt=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1}}function Ks(e){Y=Rs(e,()=>{Zo(),Bn(),Ri()}),Qs((t,n,o)=>{if(Y&&Y.hideSaving(),mt)if(clearTimeout(mt.timeoutId),t)mt=null;else{let{batch:r,previousOriginals:i}=mt;mt=null;for(let[a]of r){let s=i.get(a);s!==void 0&&g.originalValues.set(a,s)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let s=g.originalValues.get(a);s!==void 0&&g.currentValues.set(a,s)}for(let a of Mt)for(let[s]of r){let c=g.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(Y){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";Y.showWarning(s,"Dismiss",()=>Y.clearWarning())}}else if(!t&&Y){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";Y.showWarning(i,"Dismiss",()=>Y.clearWarning())}}),Ko=se(t=>{if(t.type==="updatePropertyComplete"&&t.success&&t.undoId&&Yo){let{componentInfo:n,batch:o}=Yo,r={componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,tagName:n.tagName};for(let i of o)ue({type:"property",componentName:n.componentName,filePath:n.filePath,summary:`${i.cssProperty}: ${i.originalValue} \u2192 ${i.value}`,state:"active",propertyKey:i.cssProperty,elementIdentity:r,revertData:{type:"cliUndo",undoIds:[t.undoId]}});Yo=null}})}function Jt(e,t){if(g.pendingBatch.size>0&&Ai(),zn(),Bn(),g.showAllGroups=!1,g.readOnly=!1,g.selectedElement=e,g.componentInfo=t,!t.filePath&&t.componentName){let u=ct(t.componentName);u?g.componentInfo={...t,filePath:u}:ft(t.componentName).then(p=>{p&&(dt(t.componentName,p),g.componentInfo?.componentName===t.componentName&&(g.componentInfo={...g.componentInfo,filePath:p}))})}g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(uu);for(let u of Ws)Ss(u)||n.add(u);let o=yu(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,t.filePath||(g.readOnly=!0),Zt&&Zt(),Zt=Ns(u=>{Ws.has(u)&&bu(u)});let r=g.showAllGroups?null:Ys(e),i=r?Ve.filter(u=>r.has(u.group)):Ve,s=r!==null&&i.length<Ve.length?()=>Zs(!0):void 0,{container:c,controls:d}=di(i,g.currentValues,Wn,qo,s);Mt=d,Xo.disconnect(),Xo.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),Y.show(t.componentName,t.filePath,t.lineNumber,c),t.filePath?Y.clearWarning():Y.showWarning("Source file couldn't be resolved for this element","Dismiss",()=>Y.clearWarning())}function Wn(e,t){let n=Gs.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=vt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?xo(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(Pi(),t==="none"){let s=g.originalValues.get("display")||"block";Y.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=s),g.activeOverrides.delete("display"),g.currentValues.set("display",s),g.pendingBatch.delete("display"),Pi(),Y.clearWarning()})}else Y.clearWarning()}function Ai(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath||"",t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1,o=g.selectedElement,r=[...g.pendingBatch.values()].map(i=>{let a=Gs.get(i.property);return{tailwindPrefix:i.tailwindPrefix,tailwindToken:i.tailwindToken,value:i.value,relatedPrefixes:i.relatedPrefixes,classPattern:a?.classPattern,standalone:a?.standalone}});addPendingPropertyOp({op:"updateClass",file:e,line:t,col:n,tagName:o?.tagName.toLowerCase(),className:o?.className||void 0,parentTagName:o?.parentElement?.tagName.toLowerCase(),parentClassName:o?.parentElement?.className||void 0,nthOfType:(()=>{if(!o)return 0;let i=o.parentElement;if(!i)return 0;let a=o.tagName,s=0;for(let c of Array.from(i.children)){if(c===o)break;c.tagName===a&&s++}return s})(),id:o?.id||void 0,updates:r}),o&&g.elementIdentity&&_n({type:"propertyChange",elementIdentity:g.elementIdentity,element:o,overrides:[...g.pendingBatch.values()].map(i=>({cssProperty:i.cssProperty,previousValue:i.originalValue,newValue:i.value}))});for(let[i,a]of g.pendingBatch)g.originalValues.set(i,a.value);g.pendingBatch.clear()}function Zo(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of Mt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function Lt(){we&&(clearTimeout(we),we=null),Xo.disconnect(),Zo(),Bn(),Y&&Y.hide(),Ri()}function Xs(){we&&(clearTimeout(we),we=null),Xo.disconnect(),Ai(),Bn(),Y&&Y.hide(),Ri()}function qs(){return g.activeOverrides.size>0}function Zs(e){g.showAllGroups=e,Pi()}function Js(){Ko&&(Ko(),Ko=null),Yo=null,Lt()}var Gs,uu,Ws,pu,g,Mt,Y,js,we,mu,mt,Yo,Zt,Ko,Xo,$i=S(()=>{"use strict";fs();Ms();As();Ft();He();Rn();kt();de();ki();at();xt();Nn();Un();zs();Bs();Gs=new Map(Ve.map(e=>[e.key,e])),uu=new Set(["layout","spacing","size"]),Ws=new Set(["typography","background"]),pu=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1},Mt=[],we=null,mu=300,mt=null,Yo=null,Zt=null,Ko=null,Xo=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(js),js=setTimeout(()=>{fu()},80))})});function el(e,t){if(!Pt)return;let n=performance.now(),o=Math.abs(e-Pt.clientX),r=Math.abs(t-Pt.clientY),i=o<=2&&r<=2,a=n-Pt.timestamp<16;if(i||a)return Pt.element}function tl(e,t,n){Pt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Qt(){Pt=null}var Pt,Oi=S(()=>{"use strict";Pt=null});function wu(){Ii=document.body.style.background||document.body.style.backgroundColor||"",Di=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Q=document.createElement("div"),Q.setAttribute("data-frameup-canvas-wrapper","true"),Q.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),Ie=document.createElement("div"),Ie.setAttribute("data-frameup-dot-bg","true"),Ie.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(rl.push(r),Q.appendChild(r));Q.style.position="relative",Q.style.zIndex="1",document.body.insertBefore(Ie,document.body.firstChild),document.body.insertBefore(Q,Ie.nextSibling),Hi=Vn(ol),ol(),il.forEach(r=>r(Q))}function ol(){if(!Q||!Ie)return;let{scale:e,offsetX:t,offsetY:n}=ze();Q.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=Eu*e,r=t%o,i=n%o;Ie.style.backgroundImage=`radial-gradient(circle, ${Tu} ${nl}px, transparent ${nl}px)`,Ie.style.backgroundSize=`${o}px ${o}px`,Ie.style.backgroundPosition=`${r}px ${i}px`}function Su(e,t,n){let{scale:o,offsetX:r,offsetY:i}=ze(),a=Math.min(xu,Math.max(vu,o+n));if(a===o)return;let s=(e-r)/o,c=(t-i)/o,d=e-s*a,u=t-c*a;Fn(a,d,u)}function al(e){e.preventDefault();let t=-e.deltaY*Cu,{scale:n}=ze(),o=t*n;Su(e.clientX,e.clientY,o)}function sl(e,t){let{scale:n,offsetX:o,offsetY:r}=ze();Fn(n,o+e,r+t)}function ll(){Fn(1,0,0)}function cl(){return Q!==null}function dl(){Q?_i():wu()}function _i(){if(il.forEach(e=>e(null)),Hi?.(),Hi=null,Q){for(;Q.firstChild;)document.body.insertBefore(Q.firstChild,Q);Q.remove(),Q=null}Ie?.remove(),Ie=null,rl=[],document.body.style.background=Ii,document.documentElement.style.background=Di,Ii="",Di=""}var vu,xu,Cu,Eu,nl,Tu,Q,Ie,Hi,rl,il,Ii,Di,Jo=S(()=>{"use strict";de();X();vu=.1,xu=5,Cu=.002,Eu=24,nl=1,Tu="rgba(0,0,0,0.15)",Q=null,Ie=null,Hi=null,rl=[],il=[],Ii="",Di=""});function en(e,t){return e.length>t?e.slice(0,t)+"\u2026":e}function Ze(){return V!==null}function ul(){document.addEventListener("dblclick",ml,!0),document.addEventListener("mousedown",hl,!0),Vi=se(e=>{e.type==="updateTextComplete"&&Mu(e)})}function pl(){V&&bl(),document.removeEventListener("dblclick",ml,!0),document.removeEventListener("mousedown",hl,!0),Vi?.(),Vi=null}function Mu(e){if(e.success&&e.undoId&&Gn){let t=Gn,n={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};ue({type:"textEdit",componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,summary:`"${en(t.originalText,20)}" \u2192 "${en(t.newText,20)}"`,state:"active",elementIdentity:n,revertData:{type:"cliUndo",undoIds:[e.undoId]}})}else if(!e.success&&e.reason==="no-match"&&Gn){let t=Gn,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};jo(n,o,t.originalInnerHTML),ue({type:"textAnnotation",componentName:n.componentName,filePath:n.filePath||"",summary:`"${en(n.originalText,20)}" \u2192 "${en(n.newText,20)}"`,state:"pending",elementIdentity:o,revertData:{type:"annotationRemove",annotationId:n.id,originalInnerHTML:t.originalInnerHTML,elementIdentity:o}})}Gn=null}function Lu(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function ku(e){let t=J(e);if(!t)return null;try{let n=await Ae(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||Xe(r))continue;let i=Ke(o.fileName);if(!(!i||zt(i)||zt(o.fileName||"")))return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(he(n)){let o=ie(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!Xe(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function ml(e){V&&Rt();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=$t(e.clientX,e.clientY),t&&(Nu.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),Pu(t)))}function Pu(e){V=e,Yn=e.textContent||"",Qo=e.innerHTML,er=Yn;let t=nr();t&&t.filePath?z=t:(z=null,ku(e).then(o=>{V===e&&(z=o)})),Fi=e.style.outline,e.style.outline=`2px solid ${l.accent}`,e.contentEditable="true",vl(!1),e.focus();let n=window.getSelection();if(n){n.removeAllRanges();let o=document.createRange();o.selectNodeContents(e),o.collapse(!1),n.addRange(o)}e.addEventListener("blur",gl),e.addEventListener("keydown",yl),e.addEventListener("input",fl)}function fl(){V&&(er=V.textContent||"")}function gl(){Rt()}function hl(e){if(!V)return;let t=e.target;if(t instanceof Node&&(t===V||V.contains(t)))return;if((t instanceof HTMLElement?t:null)?.closest("#frameup-root")){Rt();return}let o=Ru(e);if(o&&Ct(o)){e.preventDefault(),e.stopPropagation(),Rt({nextSelection:o,reselectEditedElement:!1});return}e.preventDefault(),e.stopPropagation(),Rt({clearSelection:!0,reselectEditedElement:!1})}function yl(e){if(e.key==="Escape"){e.preventDefault(),Rt();return}if(e.key==="Enter"&&V&&!Lu(V)){e.preventDefault(),Rt();return}e.stopPropagation()}function Ru(e){let t=e.target;return t instanceof HTMLElement&&t!==document.documentElement&&t!==document.body&&!t.hasAttribute("data-frameup-interaction")&&!t.closest("#frameup-root")?t:$t(e.clientX,e.clientY)}function Rt(e){if(!V)return;let t=er,n=t!==Yn;if(console.log("[FrameUp:textEdit] commitAndExit changed:",n,"componentInfo:",z?.componentName,"filePath:",z?.filePath),n&&z){if(!z.filePath&&z.componentName){let r=ct(z.componentName);r?z={...z,filePath:r}:ft(z.componentName).then(i=>{i&&dt(z.componentName,i)})}{let r={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:z.componentName,filePath:z.filePath||"",lineNumber:z.lineNumber||0,columnNumber:z.columnNumber||0,originalText:Yn,newText:t},i={componentName:z.componentName,filePath:z.filePath||"",lineNumber:z.lineNumber||0,columnNumber:z.columnNumber||0,tagName:z.tagName};jo(r,i,Qo,{tagName:V?.tagName.toLowerCase()||z.tagName,className:V?.className||void 0,parentTagName:V?.parentElement?.tagName.toLowerCase(),parentClassName:V?.parentElement?.className||void 0}),ue({type:"textAnnotation",componentName:r.componentName,filePath:r.filePath||"",summary:`"${en(r.originalText,20)}" \u2192 "${en(r.newText,20)}"`,state:"pending",elementIdentity:i,revertData:{type:"annotationRemove",annotationId:r.id,originalInnerHTML:Qo,elementIdentity:i}})}}let o=V;if(bl(),e?.nextSelection&&document.contains(e.nextSelection)){At(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){De();return}e?.reselectEditedElement!==!1&&o&&document.contains(o)&&At(o,{skipSidebar:!1})}function bl(){V&&(V.removeEventListener("blur",gl),V.removeEventListener("keydown",yl),V.removeEventListener("input",fl),V.removeAttribute("contenteditable"),V.style.outline=Fi,tr(Dn()),V=null,Yn="",Qo="",er="",z=null,Fi="")}var Nu,V,Yn,Qo,er,z,Fi,Vi,Gn,Kn=S(()=>{"use strict";at();xt();Nn();He();Rn();X();Xn();de();de();Et();tn();kt();Nu=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),V=null,Yn="",Qo="",er="",z=null,Fi="",Vi=null,Gn=null});function Cl(e,t){zi.set(e,t)}function El(){H=document.createElement("div"),H.setAttribute("data-frameup-interaction","true"),H.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(H),document.addEventListener("scroll",Qt,!0),H.addEventListener("mousedown",e=>{if(Je){nn=e.clientX,qn=e.clientY,H&&(H.style.cursor="grabbing"),e.preventDefault();return}Zn?.onMouseDown?.(e)}),H.addEventListener("mousemove",e=>{if(Je&&nn!==0){sl(e.clientX-nn,e.clientY-qn),nn=e.clientX,qn=e.clientY;return}Zn?.onMouseMove?.(e)}),H.addEventListener("mouseup",e=>{if(Je){H&&(H.style.cursor="grab"),nn=0,qn=0;return}Zn?.onMouseUp?.(e)}),document.addEventListener("wheel",Tl,{passive:!1}),document.addEventListener("keydown",wl),document.addEventListener("keyup",Sl)}function Tl(e){!H||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||al(e)}function wl(e){if(e.key!==" "||Ze())return;let t=document.activeElement;t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable||(e.preventDefault(),!Je&&H&&(xl=H.style.cursor,H.style.cursor="grab",H.style.pointerEvents="auto",Je=!0))}function Sl(e){if(e.key===" "&&Je&&(e.preventDefault(),Je=!1,nn=0,qn=0,H)){H.style.cursor=xl;let t=Dn();H.style.pointerEvents=t==="select"?"none":"auto"}}function or(){return Je}function tr(e){Zn=zi.get(e)||null,H&&(H.style.pointerEvents=e==="select"?"none":"auto"),Au(e)}function Au(e){if(H)switch(e){case"select":H.style.cursor="default";break;case"text":H.style.cursor="text";break;default:H.style.cursor="default"}}function vl(e){H&&(H.style.pointerEvents=e?"auto":"none")}function $t(e,t){let n=el(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!Zr(i)){r=i;break}return tl(e,t,r),r}function Nl(){document.removeEventListener("scroll",Qt,!0),document.removeEventListener("wheel",Tl),document.removeEventListener("keydown",wl),document.removeEventListener("keyup",Sl),Je=!1,H?.remove(),H=null,Zn=null,zi.clear()}var H,Zn,zi,Je,nn,qn,xl,Xn=S(()=>{"use strict";Oi();Et();Jo();Kn();de();H=null,Zn=null,zi=new Map,Je=!1,nn=0,qn=0,xl=""});function Ml(e,t,n,o,r,i){let a=e.left+e.width/2,s=e.top+e.height/2,c=t.left+t.width/2,d=t.top+t.height/2,u=c-a,p=d-s,f=Math.abs(u)<=r,m=Math.abs(p)<=r;return{dx:f?n+u/i:n,dy:m?o+p/i:o,snappedX:f,snappedY:m,guides:{verticalLine:f?{x:c,top:t.top,bottom:t.bottom}:null,horizontalLine:m?{y:d,left:t.left,right:t.right}:null}}}var Ll=S(()=>{"use strict"});function Bi(e,t,n){let o=Xt(e,t),r=wi(n);if(r)return ye=r,rr={x:o.x,y:o.y},Qn={...r.delta},Jn=!1,An(r.element,r.delta.dx,r.delta.dy,r.existingTransform),!0;let i=nr(),a=Rl();if(!i||!a||n!==a)return!1;let s=a.getBoundingClientRect(),c=a.style.cssText,d=getComputedStyle(a).transform,u=J(a),p=u?.key!=null?String(u.key):void 0,f=pi(a),m={id:crypto.randomUUID(),componentRef:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber},element:a,placeholder:null,originalRect:s,delta:{dx:0,dy:0},originalCssText:c,existingTransform:d==="none"?"":d,identity:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber,tagName:a.tagName.toLowerCase()},parentLayout:$s(a),nthOfType:f,jsxKey:p};return Al(i.filePath).then(({mtime:h,size:y})=>{m.fileMtime=h,m.fileSize=y}),bi(m),ye=m,rr={x:o.x,y:o.y},Qn={dx:0,dy:0},Jn=!0,An(a,0,0,m.existingTransform),!0}function Wi(e,t){if(!ye)return;let n=Xt(e,t),o=Qn.dx+(n.x-rr.x),r=Qn.dy+(n.y-rr.y);An(ye.element,o,r,ye.existingTransform);let i=ye.element.parentElement;if(!i||i===document.body||i===document.documentElement){ye.delta={dx:o,dy:r},ii();return}let a=ye.element.getBoundingClientRect(),s=i.getBoundingClientRect(),{scale:c}=ze(),d=Ml(a,s,o,r,5,c);(d.snappedX||d.snappedY)&&An(ye.element,d.dx,d.dy,ye.existingTransform),ye.delta={dx:d.dx,dy:d.dy},as(d.guides)}function kl(){if(!ye)return null;let e=ye,t={...Qn},n={...e.delta};if(Jn||vi(e.id,n,t),Hs(e),ii(),ue({type:"move",componentName:e.componentRef.componentName,filePath:e.componentRef.filePath,summary:`moved (${Math.round(n.dx)}px, ${Math.round(n.dy)}px)`,state:"pending",elementIdentity:e.identity,revertData:Jn?{type:"moveRemove",moveId:e.id}:{type:"moveRestore",moveId:e.id,previousDelta:t}}),Co()&&e.componentRef.filePath){let r=e.element,i=r?.parentElement;jn({type:"move",componentName:e.componentRef.componentName,tag:r?.tagName.toLowerCase()||"div",filePath:e.componentRef.filePath,className:r?.className||"",nthOfType:r?pi(r):1,parentTag:i?.tagName.toLowerCase()||"",parentClassName:i?.className||"",lineHint:e.componentRef.lineNumber,delta:{dx:n.dx,dy:n.dy},resolvedDx:null,resolvedDy:null})}let o=e.element;return ye=null,Jn=!1,o}var ye,rr,Qn,Jn,Pl=S(()=>{"use strict";$n();kt();de();tn();Ll();Ao();Un();He();Eo();at();ye=null,rr={x:0,y:0},Qn={dx:0,dy:0},Jn=!1});async function $u(e){let t=J(e);if(!t)return null;try{let n=await Ae(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||Xe(i))continue;let a=Ke(r.fileName);o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0){let r=o.find(i=>i.filePath)||o[0];return{tagName:e.tagName.toLowerCase(),componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,stack:o}}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return $l(e,t)}function $l(e,t){let n=[],o=t;for(;o;){if(he(o)){let r=ie(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!Xe(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Ol(e){let t=J(e);return t?$l(e,t):null}function Ou(e){let t=e.tagName.toLowerCase(),n=e.getAttribute("data-component-name")?.trim(),o=e.getAttribute("aria-label")?.trim(),r=e.textContent?.trim(),i=n||o||(r?r.slice(0,24):"")||`<${t}>`;return{tagName:t,componentName:i,filePath:"",lineNumber:0,columnNumber:0,stack:[]}}function Hl(e,t){let n=$t(e,t);return n?Si(n)?.element??n:null}function Il(e){Hu=e.onStart,Iu=e.onMove,Du=e.onEnd}function Dl(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=_u,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),_e=document.createElement("div"),_e.className="marquee-box",e.appendChild(_e),et=!0,document.addEventListener("mousedown",ir,!0),document.addEventListener("mousemove",ar,!0),document.addEventListener("mouseup",sr,!0),document.addEventListener("keydown",cr,!0),document.addEventListener("click",lr,!0),document.addEventListener("scroll",Qe,!0),window.addEventListener("resize",Qe),on=!0}function ir(e){if(!et||Ze()||or()||e.metaKey||e.ctrlKey||e.composedPath().some(r=>r instanceof HTMLElement&&r.id==="frameup-root"))return;let n=Hl(e.clientX,e.clientY);if(Z||D.size>0){let r=ai(e.clientX,e.clientY);if(r){e.preventDefault(),e.stopPropagation();let i=ls();if(Le=r,dr=i?{...i}:null,D.size>0){gt=[];for(let[a]of D){let s=getComputedStyle(a);gt.push({element:a,width:parseFloat(s.width)||a.offsetWidth,height:parseFloat(s.height)||a.offsetHeight})}eo=0,to=0}else if(B){let a=getComputedStyle(B);eo=parseFloat(a.width)||B.offsetWidth,to=parseFloat(a.height)||B.offsetHeight,gt=[]}I={x:e.clientX,y:e.clientY},pe="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!n||!Ct(n)){(Z||D.size>0)&&(Xs(),Z=null,B=null,ur(),Tt(null),v&&(v.classList.remove("visible"),v.style.display="none"),We(null));return}if(I={x:e.clientX,y:e.clientY},Be=n,no=e.shiftKey,Ti(n)&&Bi(e.clientX,e.clientY,n)){pe="move-drag";return}if(!no&&B&&n===B){pe="pending-move";return}pe="pending"}function ar(e){if(et&&!Ze()&&!or()){if(pe==="resize-drag"&&Le&&I&&dr){e.preventDefault(),e.stopPropagation();let t=e.clientX-I.x,n=e.clientY-I.y;if(gt.length>0){for(let o of gt){let r=o.width,i=o.height;Le==="tr"||Le==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Le==="bl"||Le==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}oo()}else{let o=eo,r=to;Le==="tr"||Le==="br"?o=Math.max(10,eo+t):o=Math.max(10,eo-t),Le==="bl"||Le==="br"?r=Math.max(10,to+n):r=Math.max(10,to-n),o=Math.round(o),r=Math.round(r),Wn("width",`${o}px`),Wn("height",`${r}px`),Qe()}return}if(pe==="pending-move"&&I){let t=Math.abs(e.clientX-I.x),n=Math.abs(e.clientY-I.y);(t>4||n>4)&&(Be&&Bi(I.x,I.y,Be)?(pe="move-drag",Wi(e.clientX,e.clientY)):pe="marquee");return}if(pe==="move-drag"){Wi(e.clientX,e.clientY);return}if(pe==="pending"&&I){let t=Math.abs(e.clientX-I.x),n=Math.abs(e.clientY-I.y);(t>10||n>10)&&(pe="marquee")}if(pe==="marquee"&&I&&_e){let t=Math.min(e.clientX,I.x),n=Math.min(e.clientY,I.y),o=Math.abs(e.clientX-I.x),r=Math.abs(e.clientY-I.y);_e.style.display="block",_e.style.left=`${t}px`,_e.style.top=`${n}px`,_e.style.width=`${o}px`,_e.style.height=`${r}px`;return}if(pe==="idle"){if(Z&&B||D.size>0){let i=ai(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=Hl(e.clientX,e.clientY);if(!n||!Ct(n)){Ro(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Ro(o,r+2)}}}function sr(e){if(!et||Ze()||or())return;let t=pe;if(pe="idle",t==="resize-drag"){document.body.style.cursor="",Le=null,dr=null,I=null,gt.length>0?gt=[]:qo();return}if(t==="move-drag"){let n=kl();n&&Bu(n),I=null,Be=null;return}if(t==="pending-move"){I=null,Be=null;return}if(t==="marquee"&&I){_e&&(_e.style.display="none"),Fu(Math.min(e.clientX,I.x),Math.min(e.clientY,I.y),Math.max(e.clientX,I.x),Math.max(e.clientY,I.y)),I=null,Be=null,no=!1;return}Be&&(no?Vu(Be):(ur(),At(Be))),I=null,Be=null,no=!1}async function At(e,t){try{let n=e.getBoundingClientRect();B=e,ji(n,{}),zu();let o=await $u(e)??Ou(e);if(!o.filePath&&o.componentName){let r=ct(o.componentName);if(r===void 0){let i=await ft(o.componentName);if(dt(o.componentName,i),i&&(o.filePath=i,o.stack))for(let a of o.stack)a.componentName===o.componentName&&!a.filePath&&(a.filePath=i)}else if(r&&(o.filePath=r,o.stack))for(let i of o.stack)i.componentName===o.componentName&&!i.filePath&&(i.filePath=r)}if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o.componentName,o.filePath,"stack:",o.stack?.map(r=>r.componentName)),Z={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||Jt(e,Z),We({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function Fu(e,t,n,o){let r=Ja({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){Lt(),Z=null,B=null,Tt(null),v&&(v.classList.remove("visible"),v.style.display="none"),D.clear();for(let i of r.slice(0,50)){let a=Ol(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};D.set(i,{element:i,info:c})}if(D.size!==0){if(D.size===1){let[i,a]=[...D.entries()][0];D.clear(),B=i,Z=a.info;let s=i.getBoundingClientRect();if(ji(s,Z),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}Jt(i,Z),We({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}oo(),We(null),v&&(v.innerHTML=`<span class="comp-name">${D.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Vu(e){if(D.has(e)){if(D.delete(e),D.size===1){let[r,i]=[...D.entries()][0];D.clear(),kn(),B=r,Z=i.info;let a=r.getBoundingClientRect();if(ji(a,Z),Jt(r,Z),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}We({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else D.size===0?(kn(),De()):(oo(),v&&(v.innerHTML=`<span class="comp-name">${D.size} elements selected</span>`));return}let t=Ol(e);if(!t)return;Z&&B&&D.size===0&&(D.set(B,{element:B,info:Z}),Lt(),Z=null,B=null,Tt(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};D.set(e,{element:e,info:o}),oo(),We(null),v&&(v.innerHTML=`<span class="comp-name">${D.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function ur(){D.clear(),kn()}function oo(){if(D.size===0){kn();return}let e=[];for(let[t]of D){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}ss(e)}function lr(e){et&&(Ze()||e.metaKey||e.ctrlKey||e.preventDefault())}function cr(e){if(et&&e.key==="Escape"){if(D.size>0){ur(),v&&(v.classList.remove("visible"),v.style.display="none"),We(null),e.preventDefault();return}if(Z){if(qs()){Zo(),e.preventDefault();return}De(),e.preventDefault()}}}function ji(e,t){if(B){let n=parseFloat(getComputedStyle(B).borderRadius)||4;Tt(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function Qe(){if(D.size>0){oo();return}if(!B||!Z)return;let e=B.getBoundingClientRect(),t=parseFloat(getComputedStyle(B).borderRadius)||4;if(Tt(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function zu(){Ro(null)}function De(){Lt(),Z=null,B=null,Le=null,dr=null,gt=[],ur(),document.body.style.cursor="",Tt(null),v&&(v.classList.remove("visible"),v.style.display="none"),We(null)}function nr(){return Z}function _l(){et=!1,document.removeEventListener("mousedown",ir,!0),document.removeEventListener("mousemove",ar,!0),document.removeEventListener("mouseup",sr,!0),document.removeEventListener("keydown",cr,!0),document.removeEventListener("click",lr,!0),document.removeEventListener("scroll",Qe,!0),window.removeEventListener("resize",Qe),on=!1,v?.remove(),v=null}function Fl(e){e&&!on?(document.addEventListener("mousedown",ir,!0),document.addEventListener("mousemove",ar,!0),document.addEventListener("mouseup",sr,!0),document.addEventListener("keydown",cr,!0),document.addEventListener("click",lr,!0),document.addEventListener("scroll",Qe,!0),window.addEventListener("resize",Qe),on=!0,et=!0):!e&&on&&(document.removeEventListener("mousedown",ir,!0),document.removeEventListener("mousemove",ar,!0),document.removeEventListener("mouseup",sr,!0),document.removeEventListener("keydown",cr,!0),document.removeEventListener("click",lr,!0),document.removeEventListener("scroll",Qe,!0),window.removeEventListener("resize",Qe),on=!1,et=!1)}function Rl(){return B??null}async function Bu(e){await At(e,{skipSidebar:!0})}var Z,B,et,on,D,v,_e,pe,I,Be,Le,dr,eo,to,gt,no,Hu,Iu,Du,_u,tn=S(()=>{"use strict";at();xt();Nn();Ne();Et();Qa();X();Ao();$i();Xn();Pl();de();Rn();He();Kn();Ur()||Gr({onCommitFiberRoot(){}});Z=null,B=null,et=!1,on=!1,D=new Map,v=null,_e=null,pe="idle",I=null,Be=null,Le=null,dr=null,eo=0,to=0,gt=[],no=!1,Hu=null,Iu=null,Du=null,_u=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${O.sm};
    border-radius: ${k.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${x};
    white-space: nowrap;
    display: none;
    opacity: 0;
    transition: opacity ${C.medium};
  }
  .selection-label.visible {
    opacity: 1;
  }
  .selection-label .comp-name {
    color: ${l.textPrimary};
    font-size: 12px;
    font-weight: 600;
  }
  .selection-label .comp-path {
    color: ${l.textSecondary};
    font-size: 11px;
    margin-left: 8px;
  }
  .selection-label .loading-dots {
    color: ${l.textTertiary};
    font-size: 12px;
  }
  @keyframes dotPulse {
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
  }
  .selection-label .loading-dots span {
    animation: dotPulse 1.4s infinite;
  }
  .selection-label .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .selection-label .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
  .marquee-box {
    position: fixed;
    border: 1px solid ${l.accent};
    background: ${l.accentSoft};
    border-radius: 2px;
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`});function Ui(e){return ro.push(e),()=>{ro=ro.filter(t=>t!==e)}}function Ht(){ro.forEach(e=>e())}function ue(e){let t=crypto.randomUUID(),n={...e,id:t,timestamp:Date.now()};return Fe.set(t,n),Ht(),t}function Wu(e){let t=Fe.get(e);if(!(!t||t.state==="reverted")){switch(t.revertData.type){case"noop":return;case"cliUndo":case"generateUndo":fr.add(e),be({type:"revertChanges",undoIds:t.revertData.undoIds});break;case"moveRemove":{let{moveId:n}=t.revertData;Promise.resolve().then(()=>(de(),Go)).then(({removeMove:o})=>{o(n)}),mr(t);break}case"moveRestore":{let{moveId:n,previousDelta:o}=t.revertData;Promise.resolve().then(()=>(de(),Go)).then(({restoreMoveDelta:r})=>{r(n,o)}),mr(t);break}case"annotationRemove":{let{annotationId:n,originalInnerHTML:o}=t.revertData;Promise.resolve().then(()=>(de(),Go)).then(({removeAnnotation:r})=>{r(n)}),mr(t);break}}t.state="reverted",Ht()}}function Gi(){let e=0;for(let t of Fe.values())t.state!=="reverted"&&e++;return e}function so(){return rn}function lo(e){rn=e,Ht()}function ju(){Fe.clear(),Ht()}function zl(){let e=!1;for(let t of Fe.values())t.state==="pending"&&(t.state="active",e=!0);e&&Ht()}function Bl(){let e=!1;for(let[t,n]of Fe)n.state==="pending"&&(Fe.delete(t),e=!0);e&&Ht()}function Gu(e){let t=Math.floor((Date.now()-e)/1e3);if(t<10)return"just now";let n=Math.floor(t/60),o=t%60;return`${n}:${String(o).padStart(2,"0")} ago`}function Yu(e){return e.split("/").pop()??e}function ao(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Vl(e){return!!e.elementIdentity}function Ku(e){return e.state!=="reverted"&&e.revertData.type!=="noop"}function Xu(e){let t=ao(e.summary).replaceAll(" \u2192 ",'<span class="arrow"> \u2192 </span>');return`<span class="component-name">${ao(e.componentName)}</span><span class="entry-separator">\u2022</span>${t}`}function mr(e){ue({type:e.type,componentName:e.componentName,filePath:e.filePath,summary:`reverted ${e.summary}`,state:"active",propertyKey:e.propertyKey,elementIdentity:e.elementIdentity,revertData:{type:"noop"}})}async function qu(e){let t=Fe.get(e),n=t?.elementIdentity;if(!t||!n)return;let o=Yt(n);if(o||(o=await Do(n)),!o){L(`Couldn't find ${t.componentName}`);return}await At(o,{skipSidebar:!1})}function Zu(){if(!tt)return;let e=Array.from(Fe.values()).reverse();if(e.length===0){tt.innerHTML='<div class="changelog-empty">No logs yet. Changes will appear here.</div>';return}tt.innerHTML=e.map(o=>{let r=["changelog-entry",Vl(o)?"selectable":"",o.state==="reverted"?"reverted":"",o.state==="pending"?"pending":""].filter(Boolean).join(" "),i=o.filePath?Yu(o.filePath):"",a=Gu(o.timestamp);return`<div class="${r}" data-entry-id="${ao(o.id)}">
  <span class="entry-summary">${Xu(o)}</span>
  ${i?`<span class="entry-file" title="${ao(i)}">${ao(i)}</span>`:""}
  <span class="entry-time">${a}</span>
  ${Ku(o)?'<button class="entry-revert" title="Revert this change">\u21A9</button>':""}
</div>`}).join("");let t=Array.from(tt.querySelectorAll(".entry-revert"));for(let o of t){let i=o.closest(".changelog-entry")?.dataset.entryId;i&&o.addEventListener("click",a=>{a.stopPropagation(),Wu(i)})}let n=Array.from(tt.querySelectorAll(".changelog-entry"));for(let o of n){let r=o.dataset.entryId;if(!r)continue;let i=Fe.get(r);!i||!Vl(i)||o.addEventListener("click",()=>{qu(r)})}}function Ju(){if(!nt)return;let e=Gi();e===0?nt.classList.add("hidden"):(nt.classList.remove("hidden"),nt.textContent=String(e))}function Wl(e){io=document.createElement("style"),io.textContent=Uu,e.appendChild(io),me=document.createElement("div"),me.className="changelog-panel",me.style.display="none";let t=document.createElement("div");t.className="changelog-header";let n=document.createElement("div");n.className="changelog-header-main";let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("changelog-header-icon"),o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.7"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.innerHTML='<path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path>';let r=document.createElement("span");r.className="changelog-title",r.textContent="Logs",nt=document.createElement("span"),nt.className="changelog-badge hidden",nt.textContent="0";let i=document.createElement("span");i.className="changelog-header-copy",i.textContent="Latest changes",Ot=document.createElement("svg"),Ot.className="changelog-chevron",Ot.setAttribute("viewBox","0 0 16 16"),Ot.setAttribute("fill","currentColor"),Ot.innerHTML='<path d="M3.5 5.5L8 10l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',n.appendChild(o),n.appendChild(r),n.appendChild(nt),n.appendChild(i),t.appendChild(n),t.appendChild(Ot),t.addEventListener("click",()=>lo(!rn)),me.appendChild(t),tt=document.createElement("div"),tt.className="changelog-body",me.appendChild(tt),e.appendChild(me);let a=Ui(()=>{Zu(),Ju(),me&&(rn&&me.style.display==="none"?(me.style.display="",requestAnimationFrame(()=>{requestAnimationFrame(()=>{me?.classList.add("visible")})})):rn||(me.style.display="none",me.classList.remove("visible")),me.classList.toggle("collapsed",!rn))});pr=se(c=>{if(c.type==="revertComplete"){for(let[d,u]of Fe){if(!fr.has(d))continue;let p=u.revertData;if(p.type!=="cliUndo"&&p.type!=="generateUndo")continue;let f=c.results.filter(m=>p.undoIds.includes(m.undoId));f.length!==0&&(fr.delete(d),f.every(m=>m.success)?mr(u):(u.state="active",Ht()))}for(let d of c.results)!d.success&&d.error&&L(`Revert failed: ${d.error}`)}});let s=gr;gr=()=>{s(),a()}}function jl(){pr&&(pr(),pr=null),gr(),gr=()=>{},me?.remove(),me=null,io?.remove(),io=null,tt=null,nt=null,Ot=null,fr.clear(),ju(),ro=[]}var Fe,rn,fr,ro,me,tt,nt,Ot,pr,io,Uu,gr,kt=S(()=>{"use strict";He();X();Ne();tn();$n();Fe=new Map,rn=!1,fr=new Set,ro=[];me=null,tt=null,nt=null,Ot=null,pr=null,io=null,Uu=`
  .changelog-panel {
    position: fixed;
    top: 16px;
    right: 16px;
    bottom: 16px;
    width: 380px;
    max-width: min(380px, calc(100vw - 32px));
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${k.lg};
    box-shadow: ${O.lg};
    z-index: 2147483646;
    display: flex;
    flex-direction: column;
    font-family: ${x};
    font-size: 12px;
    user-select: none;
    opacity: 0;
    transform: translateX(16px);
    transition: opacity ${C.settle}, transform ${C.settle};
    overflow: hidden;
  }
  .changelog-panel.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .changelog-panel.collapsed {
    bottom: auto;
    width: 320px;
  }
  .changelog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    cursor: pointer;
    gap: 10px;
    border-bottom: 1px solid ${l.border};
    background: ${l.bgSecondary};
    transition: background ${C.fast};
    flex-shrink: 0;
  }
  .changelog-header:hover {
    background: ${l.bgTertiary};
  }
  .changelog-header-main {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }
  .changelog-header-icon {
    width: 18px;
    height: 18px;
    color: ${l.accent};
    flex-shrink: 0;
  }
  .changelog-title {
    font-size: 13px;
    font-weight: 600;
    color: ${l.textPrimary};
  }
  .changelog-badge {
    background: ${l.accent};
    color: #ffffff;
    font-size: 10px;
    font-weight: 600;
    font-family: ${x};
    padding: 1px 6px;
    border-radius: 9999px;
    line-height: 16px;
  }
  .changelog-badge.hidden {
    display: none;
  }
  .changelog-header-copy {
    color: ${l.textTertiary};
    font-size: 11px;
  }
  .changelog-chevron {
    width: 14px;
    height: 14px;
    color: ${l.textTertiary};
    transition: transform ${C.medium};
    flex-shrink: 0;
  }
  .changelog-panel:not(.collapsed) .changelog-chevron {
    transform: rotate(180deg);
  }
  .changelog-body {
    flex: 1;
    overflow-y: auto;
    background: ${l.bgPrimary};
  }
  .changelog-panel.collapsed .changelog-body {
    display: none;
  }
  .changelog-entry {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    min-height: 38px;
    border-bottom: 1px solid ${l.border};
    transition: background ${C.fast};
    cursor: default;
  }
  .changelog-entry:last-child {
    border-bottom: none;
  }
  .changelog-entry.selectable {
    cursor: pointer;
  }
  .changelog-entry:hover {
    background: ${l.bgTertiary};
  }
  .changelog-entry.reverted {
    opacity: 0.5;
  }
  .changelog-entry.reverted .entry-summary {
    text-decoration: line-through;
  }
  .changelog-entry.pending .entry-summary {
    font-style: italic;
  }
  .entry-summary {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${l.textSecondary};
    min-width: 0;
    line-height: 1.3;
  }
  .component-name {
    color: ${l.textPrimary};
    font-weight: 600;
  }
  .entry-separator {
    color: ${l.textTertiary};
    margin: 0 6px;
  }
  .arrow {
    color: ${l.textTertiary};
  }
  .entry-file {
    color: ${l.textTertiary};
    flex-shrink: 0;
    font-size: 11px;
    max-width: 96px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .entry-time {
    color: ${l.textTertiary};
    flex-shrink: 0;
    font-size: 11px;
    min-width: 48px;
    text-align: right;
  }
  .entry-revert {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: ${l.accent};
    font-size: 14px;
    border-radius: ${k.xs};
    opacity: 0;
    transition: opacity ${C.fast}, background ${C.fast};
  }
  .changelog-entry:hover .entry-revert {
    opacity: 1;
  }
  .entry-revert:hover {
    background: ${l.accentSoft};
  }
  .changelog-entry.reverted .entry-revert {
    display: none;
  }
  .changelog-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    padding: 16px;
    color: ${l.textTertiary};
    text-align: center;
  }
`;gr=()=>{}});function Qu(e){return`${e.componentName}:${e.filePath}:${e.lineHint}:${e.tag}`}function Ul(e){sn=e}function tp(e){switch(e.type){case"property":return e.updates.map(t=>`${t.oldClass||"none"} \u2192 ${t.newClass}`).join(", ");case"text":return`"${e.originalText.slice(0,20)}" \u2192 "${e.newText.slice(0,20)}"`;case"reorder":return`reorder children (${e.fromIndex+1} \u2192 ${e.toIndex+1})`;case"move":return`move (${Math.round(e.delta.dx)}px, ${Math.round(e.delta.dy)}px)`}}function jn(e){if(!e.filePath){L("Cannot track changes \u2014 source file not resolved","warning");return}let t=Qu(e),n=ot.get(t);if(n&&n.type==="property"&&e.type==="property")for(let o of e.updates){let r=n.updates.findIndex(i=>i.cssProperty===o.cssProperty);r>=0?n.updates[r]=o:n.updates.push(o)}else ot.set(t,e);sn?.(ot.size),ue({type:e.type==="reorder"?"property":e.type==="move"?"move":e.type==="text"?"textEdit":"property",componentName:e.componentName,filePath:e.filePath,summary:tp(e),state:"pending",revertData:{type:"noop"}})}function Ki(){return an}function np(){return[...ot.values()]}function Yi(){ot.clear(),sn?.(0)}function Gl(){Bl();for(let[,{element:e,overrides:t}]of yr)for(let[n,o]of t)e.style[n]=o;yr.clear(),Yi(),L("Discarded all pending changes","info")}function Yl(){if(ot.size===0||an)return;an=!0,sn?.(ot.size);let e=np();be({type:"applyAllChanges",changes:e}),hr=setTimeout(()=>{an&&(an=!1,sn?.(ot.size),L("Apply timed out \u2014 changes still pending, try again","error"))},ep)}var ep,ot,an,hr,sn,yr,Un=S(()=>{"use strict";He();Ne();kt();ep=3e4,ot=new Map,an=!1,hr=null,sn=null;yr=new Map;Kl(e=>{an=!1,hr&&(clearTimeout(hr),hr=null),e.success?(zl(),yr.clear(),Yi(),L(`Applied ${e.appliedCount} change${e.appliedCount===1?"":"s"}`,"success")):e.appliedCount>0?(yr.clear(),L(`Applied ${e.appliedCount}, failed ${e.failedCount}`,"warning"),Yi()):L(e.error||"Failed to apply changes","error"),sn?.(ot.size)})});var Zl={};xa(Zl,{destroyToolbar:()=>Qi,getShadowRoot:()=>q,hideGenerateButton:()=>ip,mountToolbar:()=>Ji,setOnCanvasUndo:()=>ta,setOnGenerate:()=>ea,showToast:()=>L,updateComponentDetail:()=>We,updateGenerateButton:()=>ht});function Ji(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),cn=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=rp;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${qi}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <div class="pending-actions" style="display:none">
      <button class="confirm-btn" title="Confirm Changes">Confirm Changes</button>
      <button class="discard-btn" title="Discard all pending changes">\u2715</button>
    </div>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${op}
    </button>
  `,cn.appendChild(n),cn.appendChild(o),ee=o.querySelector(".undo-btn"),dn=o.querySelector(".generate-btn");let r=o.querySelector(".close-btn");ln=o.querySelector(".component-detail"),It=document.createElement("div"),It.className="toast",cn.appendChild(It),ee.addEventListener("click",()=>{be({type:"undo"}),ee&&(ee.innerHTML='<div class="spinner"></div>',ee.disabled=!0)}),r.addEventListener("click",e),dn.addEventListener("click",()=>{Zi&&Zi()});let i=o.querySelector(".pending-actions"),a=o.querySelector(".confirm-btn"),s=o.querySelector(".discard-btn");Ul(c=>{c>0&&!Ki()?(i.style.display="flex",a.textContent=`Confirm Changes (${c})`,a.disabled=!1):Ki()?(i.style.display="flex",a.textContent="Applying...",a.disabled=!0,s.style.display="none"):(i.style.display="none",s.style.display="inline-block")}),a.addEventListener("click",()=>{Yl()}),s.addEventListener("click",()=>{Gl()}),document.addEventListener("keydown",c=>{c.key==="z"&&(c.ctrlKey||c.metaKey)&&!c.shiftKey&&!ap()&&ql?.()&&c.preventDefault()}),Jl(()=>{L("Disconnected. Click to reconnect."),tc()}),Ql(()=>{L("Disconnected: another tab took over")}),ec(()=>{co=0,ee&&(ee.disabled=!0)}),se(c=>{switch(c.type){case"reorderComplete":c.success?(co++,ee&&(ee.innerHTML=Xl,setTimeout(()=>{ee&&(ee.innerHTML=qi,ee.disabled=!1)},200))):c.error&&L(c.error);break;case"undoComplete":c.success?(co=Math.max(0,co-1),ee&&(ee.innerHTML=Xl,setTimeout(()=>{ee&&(ee.innerHTML=qi,ee.disabled=co===0)},200))):c.error&&L(c.error);break;case"devServerDisconnected":L("Dev server disconnected");break;case"devServerReconnected":L("Dev server reconnected");break}})}function Qi(){let e=document.getElementById("frameup-root");e&&e.remove(),cn=null,ee=null}function q(){return cn}function ea(e){Zi=e}function ta(e){ql=e}function ht(e){dn&&(dn.disabled=!e)}function ip(){dn&&(dn.style.display="none")}function We(e){if(!ln)return;if(!e){ln.className="component-detail empty",ln.textContent="No selection";return}ln.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";ln.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function L(e,t="info"){It&&(It.textContent=e,It.classList.add("visible"),Xi&&clearTimeout(Xi),Xi=setTimeout(()=>{It?.classList.remove("visible")},2e3))}function ap(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var cn,ee,co,It,Xi,ln,dn,Zi,ql,qi,op,Xl,rp,Ne=S(()=>{"use strict";He();X();Un();cn=null,ee=null,co=0,It=null,Xi=null,ln=null,dn=null,Zi=null,ql=null,qi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',op='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',Xl='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',rp=`
  :host {
    all: initial;
  }
  ${Na}
  .toolbar {
    position: fixed;
    bottom: 16px;
    left: 76px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${k.md};
    font-family: ${x};
    font-size: 12px;
    color: ${l.textPrimary};
    box-shadow: ${O.md};
    user-select: none;
    opacity: 0;
    animation: fadeIn ${C.settle} forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .divider {
    width: 1px;
    height: 16px;
    background: ${l.border};
    flex-shrink: 0;
  }
  .icon-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 50%;
    color: ${l.textSecondary};
    cursor: pointer;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast};
  }
  .icon-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .icon-btn:hover:not(:disabled) {
    background: ${l.bgSecondary};
    color: ${l.textPrimary};
  }
  .icon-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .icon-btn.active {
    color: ${l.accent};
  }
  .close-btn {
    color: ${l.textTertiary};
  }
  .close-btn:hover {
    background: ${l.dangerSoft};
    color: ${l.danger};
  }
  .generate-btn {
    background: ${l.accent};
    border: none;
    border-radius: ${k.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${x};
    cursor: pointer;
    transition: background ${C.fast};
  }
  .generate-btn:hover:not(:disabled) {
    background: ${l.accentHover};
  }
  .generate-btn:disabled {
    background: ${l.bgTertiary};
    color: ${l.textTertiary};
    cursor: default;
  }
  .component-detail {
    display: flex;
    align-items: center;
    gap: 6px;
    max-width: 280px;
    overflow: hidden;
  }
  .component-detail .tag {
    color: ${l.accent};
    font-size: 11px;
    font-weight: 600;
    font-family: monospace;
    flex-shrink: 0;
  }
  .component-detail .name {
    color: ${l.textPrimary};
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .component-detail .path {
    color: ${l.textTertiary};
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .component-detail.empty {
    color: ${l.textTertiary};
    font-size: 12px;
  }
  .toast {
    position: fixed;
    bottom: 68px;
    left: 76px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    color: ${l.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: ${x};
    box-shadow: ${O.md};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
  }
  .toast.visible {
    opacity: 1;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .spinner {
    width: 12px;
    height: 12px;
    border: 2px solid ${l.border};
    border-top-color: ${l.textSecondary};
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  .pending-actions {
    display: none;
    align-items: center;
    gap: 4px;
  }
  .confirm-btn {
    background: ${l.accent};
    border: none;
    border-radius: ${k.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${x};
    cursor: pointer;
    transition: background ${C.fast};
    white-space: nowrap;
  }
  .confirm-btn:hover { background: ${l.accentHover}; }
  .confirm-btn:disabled { background: ${l.bgTertiary}; color: ${l.textTertiary}; cursor: wait; }
  .discard-btn {
    padding: 4px 8px;
    background: transparent;
    color: #9ca3af;
    border: 1px solid #374151;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
  }
  .discard-btn:hover { color: #ef4444; border-color: #ef4444; }
`});function Qs(e){sa=e}function Kl(e){la=e}function br(e){ve&&ve.readyState===WebSocket.OPEN||(aa=e,ve=new WebSocket(`ws://localhost:${e}`),ve.onopen=()=>{let t=un>0;un=0,t&&ia&&ia()},ve.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Ta(n.tokens),n.type==="updatePropertyComplete"&&sa&&sa(n.success,n.errorCode,n.error),n.type==="config"&&(Sa(n.hasApiKey),n.hasApiKey&&Promise.resolve().then(()=>(Ne(),Zl)).then(o=>o.hideGenerateButton())),n.type==="applyAllComplete"&&la&&la(n),uo.forEach(o=>o(n))}catch{}},ve.onclose=t=>{if(ve=null,t.code===4001){ra&&ra();return}if(un<sp){let n=500*Math.pow(2,un);un++,na=setTimeout(()=>br(e),n)}else oa&&oa()},ve.onerror=()=>{})}function be(e){ve&&ve.readyState===WebSocket.OPEN&&ve.send(JSON.stringify(e))}function se(e){return uo.push(e),()=>{uo=uo.filter(t=>t!==e)}}function nc(){na&&clearTimeout(na),ve&&(ve.close(),ve=null),uo=[]}function ft(e){return new Promise(t=>{let n=se(o=>{o.type==="discoverFileResult"&&o.componentName===e&&(n(),t(o.filePath))});be({type:"discoverFile",componentName:e}),setTimeout(()=>{n(),t(null)},5e3)})}function Jl(e){oa=e}function Ql(e){ra=e}function ec(e){ia=e}function tc(){aa&&(un=0,br(aa))}function Al(e){return new Promise(t=>{let n=se(o=>{o.type==="fileStatResult"&&o.filePath===e&&(n(),t({mtime:o.mtime,size:o.size}))});be({type:"fileStat",filePath:e}),setTimeout(()=>{n(),t({mtime:0,size:0})},2e3)})}var ve,uo,un,sp,na,oa,ra,ia,aa,sa,la,He=S(()=>{"use strict";Ft();Eo();ve=null,uo=[],un=0,sp=5,na=null,oa=null,ra=null,ia=null,aa=null,sa=null;la=null});He();Ne();tn();Ao();at();He();tn();Ne();Un();Eo();var Ce=null,xe=null,ke=null,ca=null,po=!1,pn=null,vr=[],mo=new Map,xr=!1,lp=`
  .drag-preview {
    position: fixed;
    pointer-events: none;
    opacity: 0.6;
    z-index: 2147483647;
    border: 2px solid #1e88e5;
    border-radius: 4px;
    overflow: hidden;
    display: none;
  }
  .drop-indicator {
    position: fixed;
    height: 3px;
    background: #1e88e5;
    z-index: 2147483646;
    display: none;
    pointer-events: none;
    border-radius: 2px;
  }
  .drop-indicator::before,
  .drop-indicator::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #1e88e5;
    border-radius: 50%;
    top: -3px;
  }
  .drop-indicator::before { left: -4px; }
  .drop-indicator::after { right: -4px; }
`,yt=null;function oc(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=lp,e.appendChild(t),Il({onStart:cp,onMove:dp,onEnd:up}),se(n=>{n.type==="reorderComplete"&&(mn(),De())})}function cp(e,t,n){ke=n,ca=t,pn={x:e.clientX,y:e.clientY},po=!1,xr=!1,vr=[],mo=new Map,yt=null;let o=q();if(!o)return;Ce=document.createElement("div"),Ce.className="drag-preview";let r=t.getBoundingClientRect();Ce.style.width=`${r.width}px`,Ce.style.height=`${r.height}px`,Ce.innerHTML=t.outerHTML,o.appendChild(Ce),xe=document.createElement("div"),xe.className="drop-indicator",o.appendChild(xe);let i=n.stack[1];if(!i?.filePath){L("Can't reorder this element"),mn();return}be({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=se(s=>{if(s.type!=="siblingsList")return;a(),vr=s.siblings;let c=document.querySelectorAll("*");for(let d of c){if(d.closest("#frameup-root"))continue;let u=J(d);if(!u)continue;let p=u;for(;p;){if(he(p)){let f=p._debugSource||p._debugOwner?._debugSource;if(f){for(let m of s.siblings)f.lineNumber===m.lineNumber&&f.fileName===i.filePath&&mo.set(m.lineNumber,{el:d,rect:d.getBoundingClientRect()});break}}p=p.return}}xr=!0})}function dp(e){if(!pn)return;let t=Math.abs(e.clientX-pn.x),n=Math.abs(e.clientY-pn.y);if(t<5&&n<5||(po=!0,Ce&&(Ce.style.display="block",Ce.style.left=`${e.clientX+10}px`,Ce.style.top=`${e.clientY+10}px`),!xr||!ke))return;let o=null,r=1/0,i=0,a=0,s=0;for(let c of vr){if(c.lineNumber===ke.lineNumber)continue;let d=mo.get(c.lineNumber);if(!d)continue;let u=d.rect,p=u.top+u.height/2,f=Math.abs(e.clientY-p);f<r&&(r=f,o=c,e.clientY<p?i=u.top-2:i=u.bottom+2,a=u.left,s=u.width)}yt=o,o&&xe?(xe.style.display="block",xe.style.top=`${i}px`,xe.style.left=`${a}px`,xe.style.width=`${s}px`):xe&&(xe.style.display="none")}function up(e){if(!po||!yt||!ke){mn();return}if(!ke.filePath){L("Can't reorder this element"),mn();return}if(Co()){let t=ca,n=t?.parentElement,r=(n?Array.from(n.children):[]).map(s=>({tag:s.tagName.toLowerCase(),className:s.className||"",textContent:(s.textContent||"").slice(0,30)})),i=t&&n?Array.from(n.children).indexOf(t):0,a=i;if(yt&&n){let s=mo.get(yt.lineNumber)?.el;if(s){let c=Array.from(n.children).indexOf(s);c>=0&&(a=c)}}jn({type:"reorder",componentName:ke.componentName,tag:t?.tagName.toLowerCase()||"div",filePath:ke.filePath,parentClassName:n?.className||"",lineHint:ke.lineNumber,childrenContext:r,fromIndex:i,toIndex:a}),mn();return}be({type:"reorder",filePath:ke.filePath,fromLine:ke.lineNumber,toLine:yt.lineNumber,fromComponent:ke.componentName,toComponent:yt.componentName}),Ce&&(Ce.style.display="none"),xe&&(xe.style.display="none"),po=!1,pn=null}function mn(){Ce?.remove(),xe?.remove(),Ce=null,xe=null,ke=null,ca=null,po=!1,pn=null,xr=!1,vr=[],mo=new Map,yt=null}function rc(){mn()}Ne();X();de();var da="http://www.w3.org/2000/svg",fn=null,Pe=null,ua=null;function ic(){let e=q();e&&(fn=document.createElementNS(da,"svg"),fn.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Pe=document.createElementNS(da,"g"),Pe.setAttribute("class","annotation-root"),fn.appendChild(Pe),e.appendChild(fn),window.addEventListener("scroll",Cr,{passive:!0}),ua=Vn(Cr),Cr())}function Cr(){if(!Pe)return;let{scale:e,offsetX:t,offsetY:n}=ze();Pe.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function ac(e,t,n,o,r,i){if(!Pe)return null;let a=document.createElementNS(da,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${O.sm};
    padding: 4px 8px;
    border-radius: ${k.sm};
    font-size: ${r}px;
    font-family: ${x};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),Pe.appendChild(a),a}function sc(e){if(!Pe)return;let t=Pe.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function fo(){Pe&&(Pe.innerHTML="")}function lc(){window.removeEventListener("scroll",Cr),ua?.(),ua=null,fn?.remove(),fn=null,Pe=null}$n();de();Ne();X();li();Jo();Kn();kt();var gn={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',logs:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},cc=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",pa=navigator.platform.includes("Mac")?"Cmd":"Ctrl",ha=[{type:"select",icon:gn.pointer,label:"Select",shortcut:"S"},{type:"text",icon:gn.text,label:"Text",shortcut:"T"}],pp=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${k.lg};
    box-shadow: ${O.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${x};
    user-select: none;
    opacity: 0;
    animation: panelFadeIn ${C.settle} forwards;
  }
  @keyframes panelFadeIn {
    to { opacity: 1; }
  }
  .tool-divider {
    width: 16px;
    height: 1px;
    background: ${l.border};
    flex-shrink: 0;
  }
  .tool-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    color: ${l.textSecondary};
    cursor: pointer;
    border-radius: 50%;
    position: relative;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast};
  }
  .tool-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .tool-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .tool-btn:hover {
    background: ${l.bgSecondary};
    color: ${l.textPrimary};
  }
  .tool-btn.active {
    background: ${l.accentSoft};
    color: ${l.accent};
    border-left-color: ${l.accent};
    border-radius: 0 50% 50% 0;
  }
  .tool-btn .tooltip {
    display: none;
    position: absolute;
    left: 44px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${O.sm};
    color: ${l.textPrimary};
    padding: 4px 8px;
    border-radius: ${k.sm};
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${C.medium};
    z-index: 2147483647;
  }
  .tool-btn .tooltip .shortcut-badge {
    display: inline-block;
    background: ${l.bgSecondary};
    color: ${l.textTertiary};
    border-radius: 4px;
    padding: 1px 5px;
    font-size: 11px;
    margin-left: 6px;
  }
  .tool-btn:hover .tooltip {
    display: block;
  }
  .tool-btn.tooltip-visible .tooltip {
    opacity: 1;
  }
  .sub-options {
    width: 100%;
    padding: 4px 0;
    border-top: 1px solid ${l.border};
    border-bottom: 1px solid ${l.border};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transition: opacity ${C.medium};
  }
  .sub-options.visible {
    opacity: 1;
  }
  .sub-options.hidden {
    display: none;
  }
  .color-swatch {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    padding: 0;
    box-shadow: ${O.sm};
  }
  .segmented-control {
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  }
  .segment {
    flex: 1;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: ${l.textSecondary};
    font-size: 10px;
    font-family: ${x};
    cursor: pointer;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast}, box-shadow ${C.fast};
  }
  .segment.active {
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    box-shadow: ${O.sm};
  }
  .action-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${l.textSecondary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast}, opacity ${C.fast};
  }
  .action-btn svg {
    width: 18px;
    height: 18px;
  }
  .action-btn:hover {
    background: ${l.bgSecondary};
    color: ${l.textPrimary};
  }
  .action-btn.active {
    background: ${l.accentSoft};
    color: ${l.accent};
  }
  .action-btn:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
  }
  .action-btn.has-badge {
    position: relative;
  }
  .action-badge {
    position: absolute;
    top: 3px;
    right: 3px;
    min-width: 14px;
    height: 14px;
    padding: 0 4px;
    border-radius: 999px;
    background: ${l.accent};
    color: #ffffff;
    font-size: 9px;
    font-weight: 700;
    line-height: 14px;
    text-align: center;
    box-sizing: border-box;
    pointer-events: none;
  }
  .action-badge.hidden {
    display: none;
  }
  .action-btn.danger:hover {
    background: ${l.dangerSoft};
    color: ${l.danger};
  }
  .help-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${l.textTertiary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: ${x};
    transition: background ${C.fast}, color ${C.fast};
  }
  .help-btn:hover {
    background: ${l.bgSecondary};
    color: ${l.textPrimary};
  }
  .shortcuts-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.4);
    animation: fadeIn 150ms ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .shortcuts-card {
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${k.lg};
    box-shadow: ${O.lg};
    padding: 24px 28px;
    min-width: 320px;
    max-width: 420px;
    font-family: ${x};
    animation: cardSlide 200ms ease;
  }
  @keyframes cardSlide {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  .shortcuts-title {
    font-size: 14px;
    font-weight: 600;
    color: ${l.textPrimary};
    margin: 0 0 16px 0;
  }
  .shortcuts-section {
    margin-bottom: 14px;
  }
  .shortcuts-section-label {
    font-size: 10px;
    font-weight: 600;
    color: ${l.textTertiary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }
  .shortcut-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
  }
  .shortcut-action {
    font-size: 12px;
    color: ${l.textPrimary};
  }
  .shortcut-keys {
    display: flex;
    gap: 3px;
    align-items: center;
  }
  .shortcut-key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: 5px;
    font-size: 11px;
    font-family: ${x};
    color: ${l.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${l.textTertiary};
  }
`,Ee=null,Re=null,Tr=new Map,je=null,Ue=null,go=null,ma=null,fa=null,ga=null;function uc(e){ma=e}function pc(e){fa=e}function mc(e){je&&(je.disabled=!e)}function dc(){if(!Ue||!go)return;let e=Gi();Ue.classList.toggle("active",so()),go.classList.toggle("hidden",e===0),go.textContent=String(e)}function fc(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=pp,e.appendChild(t),Ee=document.createElement("div"),Ee.className="tools-panel";let n=[["select","text"]];for(let s=0;s<n.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",Ee.appendChild(c)}for(let c of n[s]){let d=ha.find(f=>f.type===c),u=document.createElement("button");u.className=`tool-btn${d.type==="select"?" active":""}`,u.innerHTML=`${d.icon}<span class="tooltip">${d.label}<span class="shortcut-badge">${cc}${d.shortcut}</span></span>`,u.addEventListener("click",()=>zo(d.type));let p=null;u.addEventListener("mouseenter",()=>{p=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{p&&clearTimeout(p),u.classList.remove("tooltip-visible")}),Ee.appendChild(u),Tr.set(d.type,u)}}Re=document.createElement("div"),Re.className="sub-options hidden",Ee.appendChild(Re);let o=document.createElement("div");o.className="tool-divider",Ee.appendChild(o),je=document.createElement("button"),je.className="action-btn",je.innerHTML=gn.undo,je.title="Undo (Ctrl+Z)",je.disabled=!0,je.addEventListener("click",()=>{fa&&fa()}),Ee.appendChild(je),Ue=document.createElement("button"),Ue.className="action-btn has-badge",Ue.innerHTML=`${gn.logs}<span class="action-badge hidden">0</span>`,Ue.title="Logs",Ue.addEventListener("click",()=>{lo(!so())}),go=Ue.querySelector(".action-badge"),Ee.appendChild(Ue);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=gn.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{ma&&ma()}),Ee.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=gn.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{dl(),i.style.color=cl()?l.accent:""}),Ee.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${cc}/)`,a.addEventListener("click",()=>hc()),Ee.appendChild(a),e.appendChild(Ee),document.addEventListener("keydown",gc,!0),ga=Ui(dc),dc()}function gc(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||Ze()||e.ctrlKey||e.metaKey||e.altKey)return;let n=e.key.toUpperCase();if(e.key==="?"){hc(),e.preventDefault();return}let o=ha.find(r=>r.shortcut===n);o&&(zo(o.type),e.preventDefault())}var Ge=null,ho=null;function hc(){Ge?Er():mp()}function mp(){let e=q();if(!e||Ge)return;Ge=document.createElement("div"),Ge.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:ha.map(r=>({action:r.label,keys:[r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[pa,"Z"]},{action:"Toggle Logs",keys:[pa,"Shift","L"]},{action:"Keyboard Shortcuts",keys:["?"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Space","Drag"]},{action:"Zoom",keys:[pa,"Scroll"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let d=document.createElement("span");d.className="shortcut-action",d.textContent=s.action,c.appendChild(d);let u=document.createElement("span");u.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let m=document.createElement("span");m.className="shortcut-plus",m.textContent="+",u.appendChild(m)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=s.keys[p],u.appendChild(f)}c.appendChild(u),i.appendChild(c)}t.appendChild(i)}Ge.appendChild(t),Ge.addEventListener("click",r=>{r.target===Ge&&Er()}),e.appendChild(Ge),ho=r=>{Er()},document.addEventListener("keydown",ho,!0)}function Er(){ho&&(document.removeEventListener("keydown",ho,!0),ho=null),Ge?.remove(),Ge=null}function yc(e){for(let[t,n]of Tr)n.classList.toggle("active",t===e);fp(e)}function fp(e){if(Re&&(Re.innerHTML="",Re.classList.add("hidden"),Re.classList.remove("visible"),e==="text")){Re.classList.remove("hidden"),requestAnimationFrame(()=>Re?.classList.add("visible"));let t=Kt(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();Oo({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Bo("textColor",i),n.style.background=i},onClose(){}})}),Re.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Bo("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}Re.appendChild(o)}}function bc(e){let t=Tr.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function vc(){document.removeEventListener("keydown",gc,!0),ga?.(),ga=null,Er(),Ee?.remove(),Ee=null,Re=null,je=null,Ue=null,go=null,Tr.clear()}Xn();Oi();Et();ki();de();$i();de();at();xt();Nn();Et();Xn();Rn();He();async function xc(e,t){let n=$t(e,t);if(!n)return null;let o=J(n);if(!o)return null;let r=null;try{let i=await Ae(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||Xe(s))continue;let c=Ke(a.fileName);if(!(!c||zt(c)||zt(a.fileName||""))){r={componentName:s,filePath:c,lineNumber:a.lineNumber??0,columnNumber:a.columnNumber??0};break}}}catch{}if(!r){let i=o;for(;i;){if(he(i)){let a=ie(i.type);if(a&&a[0]===a[0].toUpperCase()&&!Xe(a)){let s=i._debugSource||i._debugOwner?._debugSource;r={componentName:a,filePath:s?.fileName||"",lineNumber:s?.lineNumber||0,columnNumber:s?.columnNumber??0};break}}i=i.return}}if(r&&!r.filePath&&r.componentName){let i=ct(r.componentName);if(i===void 0){let a=await ft(r.componentName);dt(r.componentName,a),a&&(r.filePath=a)}else i&&(r.filePath=i)}return r}X();var le=null,Dt=null,wr=null,Ec={onMouseDown(e){if(le){Cc();return}let t=Xt(e.clientX,e.clientY);Dt={pageX:t.x,pageY:t.y},xc(e.clientX,e.clientY).then(n=>{wr=n}),le=document.createElement("input"),le.type="text",le.placeholder="Type annotation...",le.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${k.sm};
      padding: 4px 8px;
      font-size: ${Kt().fontSize}px;
      font-family: ${x};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,le.setAttribute("data-frameup-overlay","true"),le.addEventListener("keydown",n=>{n.key==="Enter"&&(Cc(),n.preventDefault()),n.key==="Escape"&&(Tc(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(le),le.focus()},onMouseMove(){},onMouseUp(){}};function Cc(){if(!le||!Dt)return;let e=le.value.trim();if(le.remove(),le=null,!e)return;let t=Kt(),n=crypto.randomUUID();ac(n,Dt.pageX,Dt.pageY,e,t.fontSize,t.textColor),xi({type:"text",id:n,position:Dt,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:wr}),Dt=null,wr=null}function Tc(){le&&(le.remove(),le=null),Dt=null,wr=null}function wc(){Tc()}Kn();Jo();X();kt();var _t=null,yo=null;function Sc(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function gp(e){let t=q();if(!t)return;_t&&_t.parentNode&&_t.parentNode.removeChild(_t),yo&&clearTimeout(yo);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${x}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${k.sm}`,`box-shadow: ${O.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${C.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${x}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${k.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),yo&&clearTimeout(yo),_t=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),_t=n,requestAnimationFrame(()=>{n.style.opacity="1"}),yo=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),_t=null},8e3)}function ya(e){console.error("[FrameUp]",e),gp("FrameUp encountered an error. Your app is unaffected.")}function hp(){window.addEventListener("error",e=>{Sc(e.error??e.message)&&(ya(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{Sc(e.reason)&&(ya(e.reason),e.preventDefault())})}var ba=null;function Nc(e,t,n){t.originalCssText=n.style.cssText,t.element=n,ut(t)}function yp(){if(window!==window.top)return;let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;br(e),Ji(bp);let t=q();t&&(Ks(t),Wl(t)),Dl(),is(),oc(),ic(),Ei(r=>sc(r)),ba=new MutationObserver(()=>{for(let[r,i]of yi())document.contains(i.element)||setTimeout(()=>{let a=Yt(i.identity);if(a){Nc(r,i,a);return}Do(i.identity).then(s=>{s?Nc(r,i,s):(Wo(r),L(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),ba.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("keydown",r=>{(r.metaKey||r.ctrlKey)&&r.shiftKey&&r.key==="l"&&(r.preventDefault(),lo(!so()))}),fc(),ul(),El(),Vs(),Cl("text",Ec),gi((r,i)=>{zn(),bc(r),i==="text"&&wc(),Qt(),Jr(),Fl(r==="select"),tr(r),yc(r)}),hi(()=>{ht(Nt()),mc(Ni())}),pc(()=>{let r=Uo();r&&L(`Undo: ${r}`)});let n=!1,o=0;ea(()=>{if(n){L("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);L(`Please wait ${a}s before retrying`);return}if(!Nt()){L("Nothing to confirm \u2014 make some visual changes first");return}let i=Mi();if(console.log("[FrameUp] batchOps:",i.length,i.map(a=>`${a.op}@${a.file}`),"hasTextAnns:",qt()),i.length>0&&(n=!0,ht(!1),L(`Applying ${i.length} change${i.length!==1?"s":""}...`),be({type:"commitBatch",operations:i})),qt()){let a=Li();n=!0,ht(!1),L("Generating from annotations..."),be({type:"generate",annotations:a})}i.length===0&&!qt()&&L("Could not resolve source files for these changes \u2014 try re-selecting")}),se(r=>{if(r.type==="commitBatchComplete"){qt()||(n=!1,ht(Nt()));let i=r.results?.filter(c=>c.success).length??0,a=r.results?.length??0,s=r.undoIds??[];r.success?(ue({type:"commitBatch",componentName:"Batch Apply",filePath:"",summary:`${i}/${a} changes applied`,state:"active",revertData:{type:"batchApplyUndo",undoIds:s}}),L(`Applied ${i}/${a} changes`),De(),fo(),St()):i>0?(ue({type:"commitBatch",componentName:"Batch Apply",filePath:"",summary:`${i}/${a} changes applied (${a-i} failed)`,state:"active",revertData:{type:"batchApplyUndo",undoIds:s}}),L(`Applied ${i}/${a} \u2014 ${a-i} failed`),De(),fo(),St()):(L(`Error: ${r.error||"Batch apply failed"}`),o=Date.now()+5e3,n=!1,ht(Nt()))}}),se(r=>{if(r.type==="generateProgress"&&L(r.message),r.type==="generateComplete")if(n=!1,ht(Nt()),r.success){let i=r.changes.length;ue({type:"generate",componentName:"AI Generate",filePath:r.changes[0]?.filePath||"",summary:`${i} file${i!==1?"s":""} changed`,state:"active",revertData:{type:"generateUndo",undoIds:r.undoIds||[]}});let a=r.changes.map(s=>s.description||s.filePath).join(", ");L(`Applied: ${a}`),De(),fo(),St()}else L(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),ta(()=>{let r=Uo();return r?(L(`Undo: ${r}`),!0):!1}),uc(()=>{De(),fo(),St(),ll(),updateEyeButton(!0),L("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function bp(){Qt(),Jr(),_l(),cs(),rc(),Js(),lc(),ba?.disconnect(),vc(),jl(),pl(),Nl(),St(),_i(),nc(),Qi()}function Mc(){try{yp(),hp()}catch(e){ya(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Mc):Mc();})();
/*! Bundled license information:

bippy/dist/rdt-hook.js:
bippy/dist/install-hook-only.js:
bippy/dist/core.js:
bippy/dist/index.js:
bippy/dist/source.js:
  (**
   * @license bippy
   *
   * Copyright (c) Aiden Bai
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
