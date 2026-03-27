"use strict";var FrameUp=(()=>{var Ac=Object.defineProperty;var S=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ca=(e,t)=>{for(var n in t)Ac(e,n,{get:t[n],enumerable:!0})};function $c(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function Oc(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(E=>{try{return Array.from(E.cssRules)}catch{return[]}}).filter(E=>E instanceof CSSStyleRule&&E.selectorText===":root").flatMap(E=>Array.from(E.style)).filter(E=>E.startsWith("--")),n={},o={},r={},i={},a={},s={},l={},d={},u={},p={},f={},m={},h={},y={},k={},M={},F={},_={},U=(E,$,me,fe)=>{E[me]=fe,$[fe]=me};for(let E of t){let $=e.getPropertyValue(E).trim();if(!$)continue;let me=E.match(/^--spacing-(.+)$/);if(me){U(n,p,me[1],$);continue}let fe=E.match(/^--color-(.+)$/);if(fe){let yo=fe[1];o[yo]=$,f[$c($)]=yo;continue}let A=E.match(/^--font-size-(.+)$/);if(A){U(r,m,A[1],$);continue}let K=E.match(/^--font-weight-(.+)$/);if(K){U(i,h,K[1],$);continue}let b=E.match(/^--radius-(.+)$/);if(b){U(a,y,b[1],$);continue}let T=E.match(/^--border-(.+)$/);if(T){U(s,k,T[1],$);continue}let W=E.match(/^--opacity-(.+)$/);if(W){U(l,M,W[1],$);continue}let te=E.match(/^--tracking-(.+)$/);if(te){U(d,F,te[1],$);continue}let ne=E.match(/^--leading-(.+)$/);if(ne){U(u,_,ne[1],$);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:l,letterSpacing:d,lineHeight:u,spacingReverse:p,colorsReverse:f,fontSizeReverse:m,fontWeightReverse:h,borderRadiusReverse:y,borderWidthReverse:k,opacityReverse:M,letterSpacingReverse:F,lineHeightReverse:_}}function Ic(e,t){let n={};for(let o of Hc){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function vo(e,t){return t.get(e)??null}function Ea(e,t,n){let r=(n??bt())[e],i=[];for(let[s,l]of r.entries()){let d=parseFloat(l);isNaN(d)||i.push({numericValue:d,token:s,cssValue:l})}let a=parseFloat(t);return isNaN(a)||i.some(l=>l.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,l)=>s.numericValue-l.numericValue),i}function wa(e){Ta=e,fn=null}function bt(){if(fn!==null)return fn;let e=Oc();return fn=Ic(e,Ta??{}),fn}var Hc,Ta,fn,_t=S(()=>{"use strict";Hc=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];Ta=null,fn=null});function Sa(e){Dc=e}var Dc,Na=S(()=>{"use strict";Dc=!1});var c,O,L,C,x,Ma,X=S(()=>{"use strict";c={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},O={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},L={xs:"4px",sm:"6px",md:"10px",lg:"14px"},C={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},x="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Ma=`
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
`});var Nr,bn,La,_c,gn,ka,Co,Ra,Pa,hn,xo,at,Mr,yn,Lr,Ft,Pr,Eo,vn=S(()=>{"use strict";Nr="0.5.32",bn=`bippy-${Nr}`,La=Object.defineProperty,_c=Object.prototype.hasOwnProperty,gn=()=>{},ka=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},Co=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Ra=!1,hn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Ra?!0:(e&&typeof e.inject=="function"&&(Pa=e.inject.toString()),!!Pa?.includes("(injected)")),xo=new Set,at=new Set,Mr=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:bn,checkDCE:ka,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),at.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,xo.forEach(a=>a())),i},on:gn,onCommitFiberRoot:gn,onCommitFiberUnmount:gn,onPostCommitFiberRoot:gn,renderers:t,supportsFiber:!0,supportsFlight:!0};try{La(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((l,d)=>{at.add(l),a.renderers.set(d,l)}),yn(e))}}});let r=window.hasOwnProperty,i=!1;La(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{yn(e)}return o},yn=e=>{e&&xo.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=ka,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=bn,t._instrumentationIsActive=!1;let n=Co(t);if(n||(t.on=gn),t.renderers.size){t._instrumentationIsActive=!0,xo.forEach(i=>i());return}let o=t.inject,r=hn(t);r&&!n&&(Ra=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return at.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,xo.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||hn())&&e?.()}catch{}},Lr=()=>_c.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),Ft=e=>Lr()?(yn(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Mr(e),Pr=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),Eo=()=>{try{Pr()&&Ft()}catch{}}});var Aa=S(()=>{"use strict";vn();Eo()});function Br(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await jr(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Wr(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var kr,Rr,Ar,$r,Or,Hr,Ir,Dr,_r,Fr,Vr,zr,ge,Wr,jr,Ur,ae,Gr,Yr,J,Fc,Kr=S(()=>{"use strict";vn();kr=0,Rr=1,Ar=5,$r=11,Or=13,Hr=15,Ir=16,Dr=19,_r=26,Fr=27,Vr=28,zr=30,ge=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};Wr=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Wr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},jr=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await jr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Ur=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Ur(t.type||t.render):null},ae=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=Ur(t);return o&&(o.displayName||o.name)||null},Gr=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||Co(e)||hn(e)},Yr=e=>{let t=Ft(e.onActive);t._instrumentationSource=e.name??bn;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,l)=>{n!==i&&(n?.(a,s,l),e.onCommitFiberRoot?.(a,s,l))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},J=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Fc=Error()});var st=S(()=>{"use strict";vn();Aa();Kr();});function xn(e,t){let n=0,o=0,r=0;do r=Ya[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function Da(e,t){return e.pos>=t?!1:e.peek()!==Gc}function Ka(e){let{length:t}=e,n=new Kc(e),o=[],r=0,i=0,a=0,s=0,l=0;do{let d=n.indexOf(";"),u=[],p=!0,f=0;for(r=0;n.pos<d;){let m;r=xn(n,r),r<f&&(p=!1),f=r,Da(n,d)?(i=xn(n,i),a=xn(n,a),s=xn(n,s),Da(n,d)?(l=xn(n,l),m=[r,i,a,s,l]):m=[r,i,a,s]):m=[r],u.push(m),n.pos++}p||Xc(u),o.push(u),n.pos=d+1}while(n.pos<=t);return o}function Xc(e){e.sort(qc)}function qc(e,t){return e[0]-t[0]}var $a,Vc,zc,Ba,Bc,Wc,Wa,jc,ja,Uc,Ua,Ga,Zr,Oa,Ha,Gc,Ia,Yc,Ya,Kc,Xa,Zc,Jc,qa,Cn,To,Qc,_a,ed,td,nd,od,Fa,rd,id,ad,sd,ld,Va,Ke,cd,Xr,qr,dd,ud,pd,md,fd,gd,hd,yd,Ae,za,bd,vd,En,Tn,vt=S(()=>{"use strict";vn();Kr();$a=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Vc=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],zc=["<anonymous>","eval",""],Ba=/\.(jsx|tsx|ts|js)$/,Bc=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Wc=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Wa="(at Server)",jc=/(^|@)\S+:\d+/,ja=/^\s*at .*(\S+:\d+|\(native\))/m,Uc=/^(eval@)?(\[native code\])?$/,Ua=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=Oa(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(jc)){let i=Ha(r,void 0)[0];i&&o.push(i)}return Zr(o,t)}return e.match(ja)?Oa(e,t):Ha(e,t)},Ga=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},Zr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,Oa=(e,t)=>Zr(e.split(`
`).filter(n=>!!n.match(ja)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Ga(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),Ha=(e,t)=>Zr(e.split(`
`).filter(n=>!n.match(Uc)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=Ga(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}}),Gc=44,Ia="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Yc=new Uint8Array(64),Ya=new Uint8Array(128);for(let e=0;e<Ia.length;e++){let t=Ia.charCodeAt(e);Yc[e]=t,Ya[t]=e}Kc=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};Xa=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Zc=/^data:application\/json[^,]+base64,/,Jc=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,qa=typeof WeakRef<"u",Cn=new Map,To=new Map,Qc=e=>qa&&e instanceof WeakRef,_a=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,s,l]=i;if(a===void 0||s===void 0||l===void 0)return null;let d=t[a];return d?{columnNumber:l,fileName:d,lineNumber:s+1}:null},ed=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return _a(o.map.mappings,o.map.sources,r,i)}return _a(e.mappings,e.sources,t-1,n)},td=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Jc);a&&(o=a[1]||a[2])}if(!o)return null;let r=Xa.test(o);if(!(Zc.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},nd=e=>({file:e.file,mappings:Ka(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),od=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Ka(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Fa=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Xa);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},rd=async(e,t=fetch)=>{if(!Fa(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=td(e,n);if(!o||!Fa(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?od(i):nd(i)}catch{return null}},id=async(e,t=!0,n)=>{if(t&&Cn.has(e)){let i=Cn.get(e);if(i==null)return null;if(Qc(i)){let a=i.deref();if(a)return a;Cn.delete(e)}else return i}if(t&&To.has(e))return To.get(e);let o=rd(e,n);t&&To.set(e,o);let r=await o;return t&&To.delete(e),t&&(r===null?Cn.set(e,null):Cn.set(e,qa?new WeakRef(r):r)),r},ad=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await id(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=ed(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),sd=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",ld=()=>{let e=Ft();for(let t of[...Array.from(at),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},Va=e=>{for(let t of at){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Ke=e=>`
    in ${e}`,cd=(e,t)=>{let n=Ke(e);return t&&(n+=` (at ${t})`),n},Xr=!1,qr=(e,t)=>{if(!e||Xr)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Xr=!0;let o=ld();Va(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){u=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){u=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){u=f}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[l,d]=s.DetermineComponentFrameRoot();if(l&&d){let u=l.split(`
`),p=d.split(`
`),f=0,m=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(f===u.length||m===p.length)for(f=u.length-1,m=p.length-1;f>=1&&m>=0&&u[f]!==p[m];)m--;for(;f>=1&&m>=0;f--,m--)if(u[f]!==p[m]){if(f!==1||m!==1)do if(f--,m--,m<0||u[f]!==p[m]){let h=`
${u[f].replace(" at new "," at ")}`,y=ae(e);return y&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",y)),h}while(f>=1&&m>=0);break}}}finally{Xr=!1,Error.prepareStackTrace=n,Va(o),console.error=r,console.warn=i}let a=e?ae(e):"";return a?Ke(a):""},dd=(e,t)=>{let n=e.tag,o="";switch(n){case Vr:o=Ke("Activity");break;case Rr:o=qr(e.type,!0);break;case $r:o=qr(e.type.render,!1);break;case kr:case Hr:o=qr(e.type,!1);break;case Ar:case _r:case Fr:o=Ke(e.type);break;case Ir:o=Ke("Lazy");break;case Or:o=e.child!==t&&t!==null?Ke("Suspense Fallback"):Ke("Suspense");break;case Dr:o=Ke("SuspenseList");break;case zr:o=Ke("ViewTransition");break;default:return""}return o},ud=e=>{try{let t="",n=e,o=null;do{t+=dd(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=cd(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},pd=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},md=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),fd=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,gd=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!md(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>fd(a,o))||(i.push(o),t.set(r,i))}return t},hd=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Wa,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},yd=e=>{let t=[];return Br(e,n=>{if(!sd(n))return;let o=typeof n.type=="string"?n.type:ae(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Ua(pd(n._debugStack?.stack))})},!0),t},Ae=async(e,t=!0,n)=>{let o=yd(e),r=Ua(ud(e)),i=gd(o),a=new Map;return ad(r.map(s=>s.source?.includes(Wa)??!1?hd(s,i,a):s).filter((s,l,d)=>{if(l===0)return!0;let u=d[l-1];return s.functionName!==u.functionName}),t,n)},za=e=>e.split("/").filter(Boolean).length,bd=e=>e.split("/").filter(Boolean)[0]??null,vd=e=>{let t=e.indexOf("/",1);if(t===-1||za(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!Ba.test(n)||za(n)<2)return e;let o=bd(n);return!o||o.startsWith("@")||o.length>4?e:n},En=e=>{if(!e||zc.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=vd(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of Vc)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if($a.test(t)){let i=t.match($a);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Wc.test(i)&&(t=t.slice(0,r))}return t},Tn=e=>{let t=En(e);return!(!t||!Ba.test(t)||Bc.test(t))}});function Ed(e){if(!e)return"";let t=e;for(let o of xd)if(t.startsWith(o)){t=t.slice(o.length);break}let n=t.match(/\/_next\/static\/chunks\/(?:app\/)?(.+)/);n&&(t=n[1]);for(let o of Cd)t=t.replace(o,"");return t.startsWith("/")&&!t.startsWith("./")&&(t=t.slice(1)),t.startsWith("./")&&(t=t.slice(2)),t}function Xe(e){if(!e)return"";let t=En(e);if(t&&Tn(t))return t;let n=Ed(e);return n&&Tn(n)||n&&/\.(tsx?|jsx?|mjs)$/.test(n)&&!n.includes("node_modules")&&!n.startsWith("../")&&!n.includes("/dist/")&&!n.includes("/build/")?n:""}var xd,Cd,wn=S(()=>{"use strict";vt();xd=["webpack-internal:///(app-pages-browser)/./","webpack-internal:///(ssr)/./","webpack-internal:///(rsc)/./","webpack-internal:///./","webpack-internal:///","webpack:///(app-pages-browser)/./","webpack:///./","webpack:///","/@fs/","file:///","file://"],Cd=[/\?[a-f0-9]+$/,/\?v=\d+$/,/\?t=\d+$/,/\?import$/]});function qe(e){return!!(Td.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function Vt(e){return e?e.includes("node_modules")||e.includes("/dist/")||e.includes("/build/")||e.startsWith("../")||e.includes("framer-motion")||e.includes("react-router")||e.includes("@radix-ui")||e.includes("@mui")||e.includes("@emotion")||e.includes("styled-components"):!1}function Jr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function Qr(){Sn=new WeakMap}function Md(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Ld(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Sd}function Pd(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<wo||o.height/window.innerHeight<wo)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>Nd}function xt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&Jr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=Sn.get(e);if(o&&n-o.timestamp<wd)return o.isValid;let r=window.getComputedStyle(e);return Md(e,r)?e.clientWidth/window.innerWidth>=wo&&e.clientHeight/window.innerHeight>=wo&&(Ld(r)||Pd(e,r))?(Sn.set(e,{isValid:!1,timestamp:n}),!1):(Sn.set(e,{isValid:!0,timestamp:n}),!0):(Sn.set(e,{isValid:!1,timestamp:n}),!1)}var Td,wd,wo,Sd,Nd,Sn,Ct=S(()=>{"use strict";Td=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode","MotionDOMComponent","MotionComponent","AnimatePresence","RenderedRoute","RenderErrorBoundary","Outlet","StyledComponent","EmotionCssPropInternal","Primitive","Slot","Transition","TransitionGroup"]);wd=50,wo=.9,Sd=2147483600,Nd=1e3,Sn=new WeakMap});function zt(e,t,n){return Math.min(n,Math.max(t,e))}function Rd(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,l=r+e.height/2,d=zt(Math.ceil(e.width/Za),So,No),u=zt(Math.ceil(e.height/Za),So,No);if(d*u>Ja){let h=Math.sqrt(Ja/(d*u));d=zt(Math.floor(d*h),So,No),u=zt(Math.floor(u*h),So,No)}let p=new Set,f=[],m=(h,y)=>{let k=zt(Math.round(h),0,t-1),M=zt(Math.round(y),0,n-1),F=`${k}:${M}`;p.has(F)||(p.add(F),f.push({x:k,y:M}))};m(o+Te,r+Te),m(i-Te,r+Te),m(o+Te,a-Te),m(i-Te,a-Te),m(s,r+Te),m(s,a-Te),m(o+Te,l),m(i-Te,l),m(s,l);for(let h=0;h<d;h++){let y=o+(h+.5)/d*e.width;for(let k=0;k<u;k++)m(y,r+(k+.5)/u*e.height)}return f}function Qa(e,t=xt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Rd(e);for(let l of i)for(let d of document.elementsFromPoint(l.x,l.y))r.add(d);let a=[];for(let l of r){if(!t(l))continue;let d=l.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;let u={left:d.left,top:d.top,right:d.left+d.width,bottom:d.top+d.height};if(n){let p=Math.max(o.left,u.left),f=Math.max(o.top,u.top),m=Math.min(o.right,u.right),h=Math.min(o.bottom,u.bottom),y=Math.max(0,m-p)*Math.max(0,h-f),k=d.width*d.height;k>0&&y/k>=kd&&a.push(l)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(l)}let s=a.filter(l=>!a.some(d=>d!==l&&d.contains(l)));return s.sort((l,d)=>{let u=l.compareDocumentPosition(d);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}var kd,Za,So,No,Ja,Te,es=S(()=>{"use strict";Ct();kd=.75,Za=32,So=3,No=20,Ja=100,Te=1});function Bt(e,t,n){return e+(t-e)*n}var ts=S(()=>{"use strict"});function as(){let e=q();e&&(oe=document.createElement("canvas"),oe.setAttribute("data-frameup-overlay","true"),oe.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(oe),ii(),window.addEventListener("resize",ii))}function Lo(e,t=4){if(!e){se&&(se.targetOpacity=0,Ze());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!se||!se.initialized?se=li(n,t):(se.target=n,se.borderRadius=t,se.targetOpacity=1),Ze()}function Et(e,t=4){if(!e){j&&(j.targetOpacity=0,Ze());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!j||!j.initialized?j=li(n,t):(j.target=n,j.borderRadius=t,j.targetOpacity=1),Ze()}function ss(e){lt=e,Ze()}function ai(){lt=null,Ze()}function ls(e){for(j=null;G.length>e.length;)G.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<G.length?(G[t].target=o,G[t].borderRadius=n.borderRadius,G[t].targetOpacity=1):G.push(li(o,n.borderRadius))}Ze()}function Mn(){G=[],Ze()}function si(e,t){if(!ri)return null;let n=us();if(!n)return null;let o=fs(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=rs*rs)return r.corner}return null}function cs(){return us()}function ds(){jt!==null&&cancelAnimationFrame(jt),window.removeEventListener("resize",ii),oe?.remove(),oe=null,R=null,se=null,j=null,G=[],lt=null}function us(){if(G.length>1)return ps(G);if(j&&j.opacity>=.5){let{x:e,y:t,w:n,h:o}=j.current;return{x:e,y:t,w:n,h:o}}if(G.length===1){let{x:e,y:t,w:n,h:o}=G[0].current;return{x:e,y:t,w:n,h:o}}return null}function ps(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:l,h:d}=i.current;a<t&&(t=a),s<n&&(n=s),a+l>o&&(o=a+l),s+d>r&&(r=s+d)}return{x:t,y:n,w:o-t,h:r-n}}function li(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function ii(){oe&&(Nn=Math.max(window.devicePixelRatio||1,$d),ei=window.innerWidth,ti=window.innerHeight,oe.width=ei*Nn,oe.height=ti*Nn,oe.style.width=`${ei}px`,oe.style.height=`${ti}px`,R=oe.getContext("2d"),Ze())}function Ze(){jt===null&&(jt=requestAnimationFrame(ms))}function ms(){if(jt=null,!R||!oe)return;let e=!1;se?.initialized&&(ni(se,Ad)&&(e=!0),se.opacity<.01&&se.targetOpacity===0&&(se=null)),j?.initialized&&(ni(j,ns)&&(e=!0),j.opacity<.01&&j.targetOpacity===0&&(j=null));for(let t=G.length-1;t>=0;t--){let n=G[t];n.initialized&&ni(n,ns)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&G.splice(t,1)}if(R.setTransform(1,0,0,1,0,0),R.clearRect(0,0,oe.width,oe.height),R.setTransform(Nn,0,0,Nn,0,0),se&&oi(R,se,Wt,Od),j&&(oi(R,j,Wt,os),ri&&is(R,j.current,j.opacity)),lt){if(R.save(),R.globalAlpha=.6,R.strokeStyle=Wt,R.lineWidth=1,R.setLineDash([4,4]),lt.verticalLine){let{x:t}=lt.verticalLine;R.beginPath(),R.moveTo(t,0),R.lineTo(t,oe.height),R.stroke()}if(lt.horizontalLine){let{y:t}=lt.horizontalLine;R.beginPath(),R.moveTo(0,t),R.lineTo(oe.width,t),R.stroke()}R.restore()}if(G.length>0){for(let t of G)oi(R,t,Wt,os);if(ri&&G.length>0){let t=ps(G);t&&t.w>=24&&t.h>=24&&(G.length>1&&(R.globalAlpha=.6,R.beginPath(),R.rect(t.x,t.y,t.w,t.h),R.strokeStyle=Wt,R.lineWidth=1,R.setLineDash([4,4]),R.stroke(),R.setLineDash([]),R.globalAlpha=1),is(R,t,1))}}e&&(jt=requestAnimationFrame(ms))}function ni(e,t){let n=e.current,o=e.target,r=Bt(n.x,o.x,t),i=Bt(n.y,o.y,t),a=Bt(n.w,o.w,t),s=Bt(n.h,o.h,t),l=Bt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<Mo&&Math.abs(i-o.y)<Mo&&Math.abs(a-o.w)<Mo&&Math.abs(s-o.h)<Mo&&Math.abs(l-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=l,!0)}function oi(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let l=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),l>0?e.roundRect(r,i,a,s,l):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function fs(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function is(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=fs(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,Hd,0,Math.PI*2),e.fillStyle=Id,e.fill(),e.strokeStyle=Dd,e.lineWidth=_d,e.stroke();e.globalAlpha=1}var Ad,ns,Mo,$d,oe,R,ei,ti,Nn,jt,se,j,G,Wt,Od,os,Hd,rs,Id,Dd,_d,ri,lt,Po=S(()=>{"use strict";we();ts();X();Ad=.35,ns=.3,Mo=.5,$d=2,oe=null,R=null,ei=0,ti=0,Nn=1,jt=null,se=null,j=null,G=[],Wt=c.accent,Od="rgba(162,89,255,0.08)",os="rgba(162,89,255,0.15)",Hd=4,rs=10,Id="#ffffff",Dd=Wt,_d=1.5,ri=!0,lt=null});var Fd,Vd,zd,Bd,Wd,Ve,gs=S(()=>{"use strict";Fd=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Vd=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],zd=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Bd=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Wd=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Ve=[...Fd,...Vd,...zd,...Bd,...Wd]});function hs(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let l=document.createElement("span");l.style.cssText=`font-size:10px; color:${c.textSecondary}; font-family:${x};`,a.appendChild(s),a.appendChild(l);let d=new Map(t);function u(){return d.get(r.key)??r.defaultValue}function p(f){let m=parseFloat(f);s.value=isNaN(m)?f:String(m);try{let y=Ea(i,f).find(k=>k.cssValue===f);y?.token?l.textContent=`${r.tailwindPrefix}-${y.token}`:l.textContent=""}catch{l.textContent=""}}return s.addEventListener("blur",()=>{let f=s.value.trim(),m=parseFloat(f);if(isNaN(m))jd.has(f)?(d.set(r.key,f),p(f),n(r.key,f),o()):p(u());else{let y=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${m}px`;d.set(r.key,y),p(y),n(r.key,y),o()}}),s.addEventListener("keydown",f=>{f.key==="Enter"?s.blur():f.key==="Escape"&&(p(u()),s.blur())}),p(u()),{element:a,setValue(f,m){f===r.key&&(d.set(f,m),p(m))},destroy(){}}}var jd,ys=S(()=>{"use strict";_t();X();jd=new Set(["auto","none","normal","inherit","initial"])});function bs(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${c.bgTertiary};
    border-radius:${L.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,l=[];function d(u){s=u;for(let{btn:p,value:f,opt:m}of l){let h=f===u;p.style.background=h?c.accent:"transparent",p.style.color=h?c.textOnAccent:c.textSecondary,p.title=h&&m.tailwindValue?`${m.label} (${m.tailwindValue})`:m.label}}for(let u of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${L.xs};
      font-family:${x};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${c.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=u.icon??u.label,p.title=u.label,p.addEventListener("click",()=>{d(u.value),n(r.key,u.value),o()}),l.push({btn:p,value:u.value,opt:u}),a.appendChild(p)}return d(s),{element:a,setValue(u,p){u===r.key&&d(p)},destroy(){}}}var vs=S(()=>{"use strict";X()});function Ln(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let l=r===0?0:a/r*100,d=r*100;return{h:s,s:l,v:d}}function ko(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),l=o*(1-(1-i)*n),d,u,p;switch(r%6){case 0:d=o,u=l,p=a;break;case 1:d=s,u=o,p=a;break;case 2:d=a,u=o,p=l;break;case 3:d=a,u=s,p=o;break;case 4:d=l,u=a,p=o;break;case 5:d=o,u=a,p=s;break;default:d=0,u=0,p=0}let f=m=>Math.round(m*255).toString(16).padStart(2,"0");return`#${f(d)}${f(u)}${f(p)}`}var xs=S(()=>{"use strict"});function Ro(e){Ut();let t=q();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    box-shadow: ${O.lg};
    border-radius: ${L.md};
    font-family: ${x};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let b=n.getBoundingClientRect();b.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-b.height-8}px`),n.style.opacity="1"});let o=Ln(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=Ud(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${O.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let l=document.createElement("div");l.style.cssText="position:relative;width:176px;height:120px;",l.appendChild(i),l.appendChild(s),n.appendChild(l);function d(){let b=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${b}, 0%, 100%)`),T.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let W=a.createLinearGradient(0,0,0,120);W.addColorStop(0,"rgba(0,0,0,0)"),W.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=W,a.fillRect(0,0,176,120);let te=o.s/100*176,ne=(1-o.v/100)*120;s.style.left=`${te}px`,s.style.top=`${ne}px`}let u=!1;i.addEventListener("mousedown",b=>{u=!0,p(b)});function p(b){let T=i.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left)),te=Math.max(0,Math.min(120,b.clientY-T.top));o.s=W/176*100,o.v=(1-te/120)*100,d(),$()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let m=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${O.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(f),y.appendChild(h),n.appendChild(y);function k(){let b=m.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)b.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);m.fillStyle=b,m.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let M=!1;f.addEventListener("mousedown",b=>{M=!0,F(b)});function F(b){let T=f.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left));o.h=W/176*360,k(),d(),$()}let _=document.createElement("input");_.type="text",_.value=ko(o),_.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${c.bgSecondary};
    border: 1px solid ${c.border};
    border-radius: ${L.sm};
    color: ${c.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,_.addEventListener("keydown",b=>{b.key==="Enter"&&_.blur(),b.stopPropagation()}),_.addEventListener("blur",()=>{let b=_.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let T=b.startsWith("#")?b:`#${b}`;o=Ln(T),d(),k(),$()}else _.value=ko(o)}),n.appendChild(_);let U=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],E=document.createElement("div");E.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of U){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${c.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${C.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=O.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=Ln(b),d(),k(),_.value=b,$()}),E.appendChild(T)}if(n.appendChild(E),e.projectColors&&e.projectColors.length>0){let b=document.createElement("div");b.textContent="Project",b.style.cssText=`
      font-size: 10px;
      color: ${c.textSecondary};
      font-family: ${x};
      margin-top: 2px;
    `,n.appendChild(b);let T=document.createElement("div");T.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:W,hex:te}of e.projectColors){let ne=document.createElement("button");ne.title=W,ne.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${te};
        border: 1px solid ${c.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${C.fast};
      `,ne.addEventListener("mouseenter",()=>{ne.style.boxShadow=O.sm}),ne.addEventListener("mouseleave",()=>{ne.style.boxShadow="none"}),ne.addEventListener("click",()=>{o=Ln(te),d(),k(),_.value=te,$(),e.onPickedToken?.(W)}),T.appendChild(ne)}n.appendChild(T)}function $(){let b=ko(o);_.value=b,e.onColorChange(b),e.onPickedToken?.(void 0)}t.appendChild(n),ct=n,d(),k();let me=b=>{u&&p(b),M&&F(b)},fe=()=>{u=!1,M=!1};document.addEventListener("mousemove",me),document.addEventListener("mouseup",fe);let A=b=>{b.key==="Escape"&&Ut()};document.addEventListener("keydown",A,!0);let K=b=>{ct&&!b.composedPath().includes(ct)&&Ut()};setTimeout(()=>document.addEventListener("mousedown",K,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",me),document.removeEventListener("mouseup",fe),document.removeEventListener("keydown",A,!0),document.removeEventListener("mousedown",K,!0)},n._onClose=e.onClose}function Ut(){ct&&(ct._cleanup?.(),ct._onClose?.(),ct.remove(),ct=null)}function Ud(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${c.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?c.bgPrimary:"transparent"};
      box-shadow: ${i===t?O.sm:"none"};
      color: ${i===t?c.textPrimary:c.textSecondary};
      font-family: ${x}; font-size: 12px; cursor: pointer;
      transition: background ${C.fast}, color ${C.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,l)=>{s.style.background=l===i?c.bgPrimary:"transparent",s.style.boxShadow=l===i?O.sm:"none",s.style.color=l===i?c.textPrimary:c.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var ct,ci=S(()=>{"use strict";X();we();xs();ct=null});function Gd(){return di||(di=document.createElement("canvas").getContext("2d")),di}function Cs(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${L.sm};
    border:1px solid ${c.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let l=document.createElement("span");l.style.cssText=`font-size:10px; color:${c.textSecondary}; font-family:${x};`,i.appendChild(a),i.appendChild(s),i.appendChild(l);let d=t.get(r.key)??r.defaultValue,u=!1;function p(h){let y=h.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let k=Gd();k.fillStyle="#000000",k.fillStyle=y;let M=k.fillStyle;if(M.startsWith("#"))return M;let F=M.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(F){let _=parseInt(F[1],10),U=parseInt(F[2],10),E=parseInt(F[3],10);return`#${((1<<24)+(_<<16)+(U<<8)+E).toString(16).slice(1)}`}return"#000000"}function f(h){d=h,s.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let y=bt(),k=vo(h,y.colorsReverse);k?l.textContent=`${r.tailwindPrefix??"bg"}-${k}`:l.textContent=""}catch{l.textContent=""}}function m(){if(u)return;let h=s.value.trim();if(!h){f(d);return}let y=p(h);f(y),n(r.key,y),o()}return a.addEventListener("click",()=>{if(u){Ut(),u=!1;return}let h=a.getBoundingClientRect();u=!0,Ro({initialColor:p(d),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:y=>{f(y),n(r.key,y)},onClose:()=>{u=!1,o()}})}),s.addEventListener("keydown",h=>{h.key==="Enter"?(m(),s.blur()):h.key==="Escape"&&(f(d),s.blur())}),s.addEventListener("blur",()=>{m()}),s.addEventListener("input",()=>{let h=s.value.trim(),y=p(h);a.style.background=y}),f(d),{element:i,setValue(h,y){h===r.key&&f(y)},destroy(){u&&(Ut(),u=!1)}}}var di,Es=S(()=>{"use strict";X();ci();_t();di=null});function Ts(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function ws(e,t,n,o){let r=new Map(t),i=[];for(let N of e){let w=Ts(N.key);w&&i.push({descriptor:N,...w})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${x};
    font-size:10px;
    color:${c.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("div");s.style.cssText="position:relative; padding:4px;";let l=document.createElement("div");l.style.cssText=`
    background:${c.marginBoxBg};
    border:1px dashed ${c.marginBoxBorder};
    border-radius:${L.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let d=document.createElement("div");d.style.cssText=`
    background:${c.paddingBoxBg};
    border:1px dashed ${c.paddingBoxBorder};
    border-radius:${L.sm};
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
    color:${c.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${c.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let p=[];function f(N){let w=document.createElement("span"),xe=r.get(N.key)??N.defaultValue;return w.textContent=F(xe),w.title=N.label,w.style.cssText=`
      cursor:pointer;
      color:${c.textPrimary};
      font-size:10px;
      font-family:${x};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=c.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==m||m.dataset.key!==N.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{k(N,w)}),p.push({key:N.key,span:w,descriptor:N}),w}let m=document.createElement("input");m.type="text",m.className="prop-input",m.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(m);let h=null,y=null;function k(N,w){h&&h!==N&&M(),h=N,y=w,m.dataset.key=N.key;let xe=r.get(N.key)??N.defaultValue;m.value=F(xe);let ie=0,yt=0,it=w;for(;it&&it!==a;)ie+=it.offsetLeft,yt+=it.offsetTop,it=it.offsetParent;m.style.display="block",m.style.left=`${ie}px`,m.style.top=`${yt}px`;let xa=w.getBoundingClientRect();m.style.width=`${Math.max(40,xa.width+10)}px`,m.focus(),m.select()}function M(){if(!h||!y)return;let N=m.value.trim(),w=h,xe=y,ie,yt=parseFloat(N),it=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(yt)?it.has(N)?ie=N:ie=r.get(w.key)??w.defaultValue:ie=N.match(/(px|rem|em|%|vw|vh|ch)$/)?N:`${yt}px`,r.set(w.key,ie),xe.textContent=F(ie),xe.style.background="transparent",m.style.display="none",m.dataset.key="",h=null,y=null,n(w.key,ie),o()}m.addEventListener("keydown",N=>{if(N.key==="Enter")M();else if(N.key==="Escape"){if(h&&y){let w=r.get(h.key)??h.defaultValue;y.textContent=F(w)}m.style.display="none",m.dataset.key="",h=null,y=null}}),m.addEventListener("blur",()=>{M()});function F(N){let w=parseFloat(N);return isNaN(w)?N:w===Math.round(w)?String(Math.round(w)):N}function _(N){let w=document.createElement("span");return w.textContent=N,w.style.cssText=`
      font-size:9px;
      color:${c.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function U(N,w){return i.find(xe=>xe.layer===N&&xe.side===w)}function E(N,w){let xe=U(N,w);if(!xe){let ie=document.createElement("span");return ie.textContent="-",ie.style.cssText=`text-align:center; color:${c.textTertiary};`,ie}return f(xe.descriptor)}let $=E("padding","top");$.style.gridRow="1",$.style.gridColumn="2",$.style.textAlign="center";let me=E("padding","left");me.style.gridRow="2",me.style.gridColumn="1";let fe=E("padding","right");fe.style.gridRow="2",fe.style.gridColumn="3";let A=E("padding","bottom");A.style.gridRow="3",A.style.gridColumn="2",A.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",d.appendChild($),d.appendChild(me),d.appendChild(u),d.appendChild(fe),d.appendChild(A);let K=document.createElement("div");K.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=E("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let T=E("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let W=E("margin","right");W.style.gridRow="2",W.style.gridColumn="3";let te=E("margin","bottom");te.style.gridRow="3",te.style.gridColumn="2",te.style.textAlign="center";let ne=document.createElement("div");ne.style.cssText="grid-row:2; grid-column:2;",ne.appendChild(d),K.appendChild(b),K.appendChild(T),K.appendChild(ne),K.appendChild(W),K.appendChild(te);let yo=_("margin"),Rc=_("padding"),bo=document.createElement("div");return bo.style.cssText="display:flex; gap:8px; padding:0 4px;",bo.appendChild(yo),bo.appendChild(Rc),l.appendChild(K),s.appendChild(l),a.appendChild(bo),a.appendChild(s),{element:a,setValue(N,w){if(!Ts(N))return;r.set(N,w);let ie=p.find(yt=>yt.key===N);ie&&(ie.span.textContent=F(w))},destroy(){}}}var Ss=S(()=>{"use strict";X()});function Ns(e){return Ao.has(e)}function Ms(e){return $o.push(e),()=>{let t=$o.indexOf(e);t>=0&&$o.splice(t,1)}}function qd(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Zd(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Jd(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}function eu(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function ui(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=Xd,i.appendChild(a);let s=[],l=Zd(e);for(let[d,u]of l){let p=d==="layout"&&!eu(t)?u.filter(M=>!Qd.has(M.key)):u;if(p.length===0)continue;let f=document.createElement("div");f.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Yd[d]}</span>${qd()}`;let h=document.createElement("div");h.className="prop-section-body";let y=Ao.has(d);if(y){let M=m.querySelector(".prop-section-chevron");M&&M.classList.add("collapsed"),h.classList.add("collapsed")}m.addEventListener("click",()=>{if(y=!y,y)Ao.add(d);else{Ao.delete(d);for(let F of $o)F(d)}let M=m.querySelector(".prop-section-chevron");M&&M.classList.toggle("collapsed",y),h.classList.toggle("collapsed",y)}),f.appendChild(m);let k=Jd(p);for(let M of k){let F=Kd[M.controlType];if(!F)continue;let _=F(M.descriptors,t,n,o);if(M.descriptors.length>1||M.controlType==="box-model")h.appendChild(_.element);else{let U=document.createElement("div");U.className="prop-control-row";let E=document.createElement("span");E.className="prop-control-label",E.textContent=M.descriptors[0].label,E.title=M.descriptors[0].label;let $=document.createElement("div");$.className="prop-control-value",$.appendChild(_.element),U.appendChild(E),U.appendChild($),h.appendChild(U)}s.push(_)}f.appendChild(h),i.appendChild(f)}if(r){let d=document.createElement("div");d.className="prop-show-all",d.textContent="Show all properties",d.addEventListener("click",r),i.appendChild(d)}return{container:i,controls:s}}var Ao,$o,Yd,Kd,Xd,Qd,Ls=S(()=>{"use strict";ys();vs();Es();Ss();X();Ao=new Set;$o=[];Yd={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Kd={"number-scrub":hs,segmented:bs,"color-swatch":Cs,"box-model":ws},Xd=`
  .prop-section {
    border-bottom: 1px solid ${c.border};
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
    background: ${c.bgSecondary};
    cursor: pointer;
    user-select: none;
    font-family: ${x};
    font-size: 11px;
    font-weight: 600;
    color: ${c.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .prop-section-header:hover {
    background: ${c.bgTertiary};
  }
  .prop-section-chevron {
    width: 12px;
    height: 12px;
    transition: transform 150ms ease;
    color: ${c.textTertiary};
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
    background: ${c.bgTertiary};
    border: 1px solid ${c.border};
    border-radius: ${L.xs};
    padding: 4px 6px;
    font-family: ${x};
    font-size: 11px;
    color: ${c.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${C.fast}, box-shadow ${C.fast};
  }
  .prop-input:hover {
    border-color: ${c.borderStrong};
  }
  .prop-input:focus {
    border-color: ${c.accent};
    box-shadow: 0 0 0 2px ${c.focusRing};
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
    color: ${c.textTertiary};
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
    color: ${c.textTertiary};
    cursor: pointer;
    text-align: center;
    user-select: none;
  }
  .prop-show-all:hover {
    color: ${c.accent};
  }
`;Qd=new Set(["flexDirection","justifyContent","alignItems","gap"])});function ru(){try{let e=localStorage.getItem(Rs);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Ps&&t<=ks)return t}}catch{}return Math.min(tu,Math.floor(window.innerWidth*.22))}function iu(e){try{localStorage.setItem(Rs,String(e))}catch{}}function As(e,t){let n=document.createElement("style");n.textContent=ou,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${ru()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let l=document.createElement("span");l.className="prop-sidebar-saving-dot";let d=document.createElement("div");d.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(d);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Collapse panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let m=!1,h=0,y=0;r.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),m=!0,h=A.clientX,y=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(A.pointerId)}),r.addEventListener("pointermove",A=>{if(!m)return;let K=h-A.clientX,b=Math.max(Ps,Math.min(ks,y+K));o.style.width=`${b}px`});let k=()=>{m&&(m=!1,r.classList.remove("active"),iu(o.offsetWidth))};r.addEventListener("pointerup",k),r.addEventListener("pointercancel",k),o.addEventListener("pointerdown",A=>A.stopPropagation()),o.addEventListener("mousedown",A=>A.stopPropagation()),o.addEventListener("click",A=>A.stopPropagation()),o.addEventListener("mouseup",A=>A.stopPropagation()),u.addEventListener("click",()=>{_(),t&&t()});let M=!1;function F(A,K,b,T){s.textContent=`<${A}>`,s.appendChild(l),d.textContent=`${K}:${b}`,d.title=`${K}:${b}`,f.innerHTML="",f.appendChild(T),M||(M=!0,o.offsetHeight,o.classList.add("visible"))}function _(){M&&(M=!1,o.classList.remove("visible"))}function U(A){f.innerHTML="",f.appendChild(A)}function E(A,K,b){p.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=A;let W=document.createElement("button");W.className="prop-sidebar-warning-btn",W.textContent=K,W.addEventListener("click",te=>{te.stopPropagation(),b()}),p.appendChild(T),p.appendChild(W),p.style.display="flex"}function $(){p.style.display="none",p.innerHTML=""}function me(){l.classList.add("active")}function fe(){l.classList.remove("active")}return{show:F,hide:_,isVisible:()=>M,getElement:()=>o,replaceContent:U,showWarning:E,clearWarning:$,showSaving:me,hideSaving:fe}}var tu,Ps,ks,Rs,nu,ou,$s=S(()=>{"use strict";X();tu=300,Ps=260,ks=380,Rs="frameup-sidebar-width",nu=4,ou=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${c.bgPrimary};
    border-left: 1px solid ${c.border};
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
    width: ${nu}px;
    cursor: col-resize;
    z-index: 1;
  }
  .prop-sidebar-resize:hover,
  .prop-sidebar-resize.active {
    background: ${c.accent};
    opacity: 0.3;
  }
  .prop-sidebar-header {
    padding: 12px 16px;
    border-bottom: 1px solid ${c.border};
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
    color: ${c.textTertiary};
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${L.sm};
  }
  .prop-sidebar-close:hover {
    background: ${c.bgTertiary};
    color: ${c.textPrimary};
  }
  .prop-sidebar-component-name {
    font-size: 13px;
    font-weight: 600;
    color: ${c.textPrimary};
    margin: 0 0 4px;
    line-height: 1.3;
  }
  .prop-sidebar-file-path {
    font-size: 11px;
    color: ${c.textTertiary};
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
    background: ${c.accent};
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
    background: ${c.dangerSoft};
    border-bottom: 1px solid ${c.danger};
    font-family: ${x};
    font-size: 11px;
    color: ${c.danger};
    flex-shrink: 0;
  }
  .prop-sidebar-warning-text {
    flex: 1;
    font-weight: 500;
  }
  .prop-sidebar-warning-btn {
    border: 1px solid ${c.danger};
    background: none;
    color: ${c.danger};
    font-family: ${x};
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: ${L.xs};
    cursor: pointer;
    white-space: nowrap;
  }
  .prop-sidebar-warning-btn:hover {
    background: ${c.danger};
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
    background: ${c.borderStrong};
    border-radius: 3px;
  }
`});function dt(e){let t=pi.get(e);if(t){if(Date.now()-t.timestamp>3e4){pi.delete(e);return}return t.filePath}}function ut(e,t){pi.set(e,{filePath:t,timestamp:Date.now()})}var pi,Pn=S(()=>{"use strict";pi=new Map});function Os(e){let t=e.parentElement,n=t?getComputedStyle(t):null,o=getComputedStyle(e);return{display:n?.display??"block",flexDirection:n?.flexDirection??"row",elementPosition:o.position}}function au(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function pt(e){e.element.style.transform=au(e.delta.dx,e.delta.dy,e.existingTransform)}function Hs(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function kn(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=O.lg,e.style.transition="none",e.style.zIndex="2147483644"}function Is(e){pt(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function Ds(e){let t=e.parentElement;if(!t)return 0;let n=e.tagName,o=0;for(let r of Array.from(t.children)){if(r===e)break;r.tagName===n&&o++}return o}function Gt(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=J(n);for(;o;){if(ge(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Oo(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=J(n);if(!o)continue;let r=await Ae(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=En(i.fileName);if(Tn(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var Rn=S(()=>{"use strict";st();vt();X()});var Wo={};Ca(Wo,{addAnnotation:()=>xi,addMove:()=>bi,addPendingPropertyOperation:()=>Mi,addPendingReorderOperation:()=>Li,addTextEditAnnotation:()=>zo,buildBatchOperations:()=>Pi,canUndo:()=>Ni,canvasUndo:()=>Bo,getActiveTool:()=>In,getAnnotations:()=>lu,getCanvasTransform:()=>ze,getMoveContainingElement:()=>Si,getMoveForElement:()=>wi,getMoves:()=>yi,getOriginalsHidden:()=>cu,getToolOptions:()=>Yt,hasChanges:()=>St,hasMoveForElement:()=>Ti,hasTextAnnotations:()=>Xt,onAnnotationRemoved:()=>Ei,onCanvasTransformChange:()=>Fn,onStateChange:()=>hi,onToolChange:()=>gi,pageToViewport:()=>pu,peekUndoStack:()=>uu,pushUndoAction:()=>Dn,removeAnnotation:()=>Do,removeMove:()=>Vo,resetCanvas:()=>wt,restoreMoveDelta:()=>su,serializeTextAnnotationsOnly:()=>ki,setActiveTool:()=>_o,setCanvasTransform:()=>_n,setOriginalsHidden:()=>du,setToolOption:()=>Fo,updateMoveDelta:()=>vi,viewportToPage:()=>Kt});function gi(e){return Ho.push(e),()=>{Ho=Ho.filter(t=>t!==e)}}function hi(e){return Io.push(e),()=>{Io=Io.filter(t=>t!==e)}}function Ne(){Io.forEach(e=>e())}function In(){return mi}function _o(e){let t=mi;t!==e&&(mi=e,Ho.forEach(n=>n(e,t)))}function Yt(){return{...Fs}}function Fo(e,t){Fs[e]=t}function yi(){return de}function bi(e){de.set(e.id,e),Dn({type:"moveCreate",moveId:e.id})}function vi(e,t,n){let o=de.get(e);o&&(o.delta=t,pt(o),Dn({type:"moveDelta",moveId:e,previousDelta:n}))}function su(e,t){let n=de.get(e);n&&(n.delta=t,pt(n),Ne())}function Vo(e){let t=de.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),de.delete(e),Ne())}function lu(){return Se}function xi(e){if(Se.push(e),e.type==="colorChange"){let t=e;$e.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else $e.push({type:"annotationAdd",annotationId:e.id});Ne()}function zo(e,t,n,o){Se.push(e),o&&Ci.set(e.id,o),$e.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),Ne()}function Ei(e){Vs=e}function Do(e){Se=Se.filter(t=>t.id!==e),Vs?.(e),Ne()}function cu(){return fi}function du(e){fi=e;for(let t of de.values())e?pt(t):Hs(t);Ne()}function Ti(e){for(let t of de.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return!0;return!1}function wi(e){for(let t of de.values())if(t.element===e)return t}function Si(e){for(let t of de.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return t}function Bo(){let e=$e.pop();if(!e)return null;switch(e.type){case"moveCreate":return Vo(e.moveId),"move removed";case"moveDelta":{let t=de.get(e.moveId);return t&&(t.delta=e.previousDelta,pt(t)),"move reverted"}case"annotationAdd":return Do(e.annotationId),"annotation removed";case"colorChange":{let t=Se.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Do(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return t.pendingMergeKey&&t.pendingPropertyKeys?.length&&gu(t.pendingMergeKey,t.pendingPropertyKeys),"property reverted"}case"textEditRestore":{let t=Gt(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),Do(e.annotationId),"text edit reverted"}}return null}function Dn(e){$e.push(e),Ne()}function uu(){return $e.length>0?$e[$e.length-1]:null}function ze(){return{scale:Tt,offsetX:On,offsetY:Hn}}function _n(e,t,n){Tt=e,On=t,Hn=n,An.forEach(o=>o())}function Fn(e){return An.push(e),()=>{An=An.filter(t=>t!==e)}}function Kt(e,t){return{x:(e-On)/Tt,y:(t-Hn)/Tt}}function pu(e,t){return{x:e*Tt+On,y:t*Tt+Hn}}function wt(){for(let e of de.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Se)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of $e)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}de=new Map,Se=[],$e=[],mt=[],$n=[],Ci.clear(),fi=!0,Tt=1,On=0,Hn=0,An.forEach(e=>e()),Ne()}function St(){return de.size>0||Se.length>0||mt.length>0||$n.length>0}function Ni(){return $e.length>0}function _s(e){let t=Math.abs(e),n=bt(),o=null,r=1/0;for(let[i,a]of n.spacing){let s;if(a.endsWith("rem"))s=parseFloat(a)*mu;else if(a.endsWith("px"))s=parseFloat(a);else continue;if(Number.isNaN(s))continue;let l=Math.abs(t-s);l<r&&(r=l,o=i)}return o!==null&&r<=Math.min(t*.15,8)?o:`[${Math.round(t)}px]`}function fu(e){if(!e)return"block";let t=e.elementPosition;if(t==="absolute"||t==="fixed")return"positioned";let n=e.display;return n==="flex"||n==="inline-flex"?"flex":n==="grid"||n==="inline-grid"?"grid":"block"}function Mi(e,t,n){let o=mt.find(a=>a.mergeKey===e);if(!o){mt.push({mergeKey:e,operation:{...t,updates:[...t.updates]},propertyKeys:[...n]}),Ne();return}let r=[...o.operation.updates],i=[...o.propertyKeys];for(let[a,s]of t.updates.entries()){let l=n[a]??`${s.tailwindPrefix}:${a}`,d=i.indexOf(l);d>=0?r[d]=s:(r.push(s),i.push(l))}o.operation={...o.operation,...t,updates:r},o.propertyKeys=i,Ne()}function gu(e,t){let n=mt.findIndex(a=>a.mergeKey===e);if(n<0)return;let o=mt[n],r=[],i=[];for(let[a,s]of o.propertyKeys.entries())t.includes(s)||(r.push(o.operation.updates[a]),i.push(s));r.length===0?mt.splice(n,1):(o.operation={...o.operation,updates:r},o.propertyKeys=i),Ne()}function Li(e,t){let n=$n.find(o=>o.mergeKey===e);n?n.operation=t:$n.push({mergeKey:e,operation:t}),Ne()}function Pi(){let e=[];for(let t of mt)e.push({...t.operation,updates:[...t.operation.updates]});for(let t of Se){if(t.type==="colorChange"){let n=t,o=n.property==="backgroundColor"?"bg":"text";e.push({op:"updateClass",file:n.component.filePath,line:n.component.lineNumber,col:n.columnNumber??0,componentName:n.component.componentName,updates:[{tailwindPrefix:o,tailwindToken:n.pickedToken??null,value:n.toColor}]})}if(t.type==="textEdit"){let n=t;if(n.filePath){let o=Ci.get(n.id);e.push({op:"updateText",file:n.filePath,line:n.lineNumber,col:n.columnNumber,componentName:n.componentName,tagName:o?.tagName,className:o?.className,parentTagName:o?.parentTagName,parentClassName:o?.parentClassName,originalText:n.originalText,newText:n.newText,cursorOffset:n.cursorOffset})}}}for(let t of de.values()){let n=t.identity.filePath||t.componentRef.filePath;if(!n)continue;let o=t.identity.lineNumber,r=t.identity.columnNumber,i=fu(t.parentLayout),a=t.element.tagName.toLowerCase(),s=t.element.className||void 0,l=t.element.parentElement,d=l?.tagName.toLowerCase(),u=l?.className||void 0,p=t.element.id||void 0,f={componentName:t.componentRef.componentName,tagName:a,className:s,parentTagName:d,parentClassName:u,nthOfType:t.nthOfType,id:p,jsxKey:t.jsxKey,fileMtime:t.fileMtime,fileSize:t.fileSize};Math.abs(t.delta.dx)>=1&&e.push({op:"moveSpacing",file:n,line:o,col:r,...f,axis:"x",token:_s(t.delta.dx),direction:t.delta.dx>0?"positive":"negative",layoutContext:i}),Math.abs(t.delta.dy)>=1&&e.push({op:"moveSpacing",file:n,line:o,col:r,...f,axis:"y",token:_s(t.delta.dy),direction:t.delta.dy>0?"positive":"negative",layoutContext:i})}for(let t of $n)e.push(t.operation);return e}function Xt(){return Se.some(e=>e.type==="text")}function ki(){let e=[];for(let t of Se)t.type==="text"&&e.push({type:"text",content:t.content,position:t.position,targetComponent:t.targetComponent?.componentName,targetFile:t.targetComponent?.filePath,targetLine:t.targetComponent?.lineNumber});return{moves:[],annotations:e,colorChanges:[],textEdits:[]}}var de,Se,$e,mt,$n,mi,fi,Fs,Tt,On,Hn,An,Ho,Io,Ci,Vs,mu,le=S(()=>{"use strict";Rn();_t();de=new Map,Se=[],$e=[],mt=[],$n=[],mi="select",fi=!0,Fs={fontSize:16,textColor:"#ffffff"},Tt=1,On=0,Hn=0,An=[],Ho=[],Io=[];Ci=new Map;Vs=null;mu=16});function Bs(){if(localStorage.getItem(zs))return;let e=q();if(!e)return;Oe=document.createElement("div"),Oe.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${c.bgSecondary};
    font-family: ${x};
    font-size: 12px;
    color: ${c.textSecondary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
    pointer-events: auto;
  `;let t=document.createElement("span");t.textContent="Click any element to edit its properties. Double-click text to edit it.";let n=document.createElement("span");n.textContent="\xD7",n.style.cssText=`
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 4px;
    color: ${c.textTertiary};
  `,n.addEventListener("click",()=>Vn()),Oe.appendChild(t),Oe.appendChild(n),e.appendChild(Oe),requestAnimationFrame(()=>{Oe&&(Oe.style.opacity="1")})}function Vn(){Oe&&(localStorage.setItem(zs,"1"),Oe.style.opacity="0",setTimeout(()=>{Oe?.remove(),Oe=null},150))}var zs,Oe,Ri=S(()=>{"use strict";X();we();zs="frameup-onboarding-dismissed",Oe=null});function jo(e){let t=e.parentElement;if(!t)return 1;let n=1;for(let o=0;o<t.children.length&&t.children[o]!==e;o++)t.children[o].tagName===e.tagName&&n++;return n}var Ws=S(()=>{"use strict"});function Ai(e,t){return e.includes(":")?!1:e===t?!0:e.startsWith(`${t}-`)}var js=S(()=>{"use strict"});function Ks(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||yu.has(r))&&t.add("typography"),t}function vu(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){Mt();return}let n=xu(e);if(n){Ys(n,t).then(o=>{Zt(n,o)});return}Cu(e).then(async o=>{if(o){let r=await Ys(o,t);Zt(o,r)}else Mt()})}function xu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=J(n);for(;o;){if(ge(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Cu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=J(n);if(!o)continue;let r=await Ae(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s=Xe(i.fileName);if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}async function Ys(e,t){let n=J(e);if(!n)return t;try{let r=await Ae(n);if(r&&r.length>0)for(let i of r){if(!i.functionName)continue;let a=i.functionName;if(a[0]===a[0].toUpperCase()&&(a===t.componentName||!t.componentName)){let s=Xe(i.fileName);if(s){let l=e.getBoundingClientRect();return{...t,filePath:s,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:l.top,left:l.left,width:l.width,height:l.height}}}}}}catch{}let o=n;for(;o;){if(ge(o)){let r=ae(o.type),i=o._debugSource||o._debugOwner?._debugSource;if(r===t.componentName&&i?.fileName){let a=e.getBoundingClientRect();return{...t,filePath:i.fileName,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:a.top,left:a.left,width:a.width,height:a.height}}}}o=o.return}return t}function Eu(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Ve){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function Tu(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of Ve){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of Nt)i.setValue(n.key,r)}}function Bn(){for(let e of Nt)e.destroy();Nt=[]}function $i(){if(!g.selectedElement||!g.componentInfo)return;Bn();let e=g.showAllGroups?null:Ks(g.selectedElement),t=e?Ve.filter(a=>e.has(a.group)):Ve,o=e!==null&&t.length<Ve.length?()=>Js(!0):void 0,{container:r,controls:i}=ui(t,g.currentValues,Wn,Xo,o);Nt=i,Y.replaceContent(r)}function wu(){if(!g.selectedElement||!g.componentInfo||g.pendingBatch.size===0)return;let e=g.selectedElement,t=g.componentInfo,n=e.parentElement,r=(e.getAttribute("class")||"").split(/\s+/).filter(Boolean),i=[];for(let[s,l]of g.pendingBatch){let d=Yo.get(l.property),u="";if(d?.classPattern){let m=new RegExp(d.classPattern);u=r.find(h=>!h.includes(":")&&m.test(h))||""}else u=r.find(m=>Ai(m,l.tailwindPrefix))||"";let p=[];for(let m of l.relatedPrefixes??[]){let h=r.find(y=>Ai(y,m));h&&p.push(h)}let f=l.tailwindToken||"";i.push({cssProperty:s,tailwindPrefix:l.tailwindPrefix,tailwindToken:l.tailwindToken,value:l.value,oldClass:u,newClass:f,relatedOldClasses:p})}let a=[t.filePath,t.lineNumber,t.columnNumber,t.tagName,e.id||"",jo(e)].join(":");Mi(a,{op:"updateClass",file:t.filePath,line:t.lineNumber,col:t.columnNumber-1,componentName:t.componentName,tagName:e.tagName.toLowerCase(),className:e.className||void 0,parentTagName:n?.tagName.toLowerCase(),parentClassName:n?.className||void 0,nthOfType:jo(e),id:e.id||void 0,updates:[...g.pendingBatch.values()].map(s=>{let l=Yo.get(s.property);return{tailwindPrefix:s.tailwindPrefix,tailwindToken:s.tailwindToken,value:s.value,relatedPrefixes:s.relatedPrefixes,classPattern:l?.classPattern,standalone:l?.standalone}})},[...g.pendingBatch.values()].map(s=>s.property))}function Xo(){Ce&&clearTimeout(Ce),Ce=setTimeout(()=>{Ce=null,Hi()},bu)}function Oi(){Ce&&(clearTimeout(Ce),Ce=null),qt&&(qt(),qt=null),Je&&(clearTimeout(Je.timeoutId),Je=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1}}function Xs(e){Y=As(e,()=>{qo(),Bn(),Oi()});let t=(n,o,r)=>{if(Y&&Y.hideSaving(),Je)if(clearTimeout(Je.timeoutId),n)Je=null;else{let{batch:i,previousOriginals:a}=Je;Je=null;for(let[s]of i){let l=a.get(s);l!==void 0&&g.originalValues.set(s,l)}if(g.selectedElement){for(let[s]of i){g.selectedElement.style[s]="",g.activeOverrides.delete(s);let l=g.originalValues.get(s);l!==void 0&&g.currentValues.set(s,l)}for(let s of Nt)for(let[l]of i){let d=g.originalValues.get(l);d!==void 0&&s.setValue(l,d)}}if(zn=null,Y){let l={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||r||"Failed to write changes";Y.showWarning(l,"Dismiss",()=>Y.clearWarning())}}else if(!n&&Y){let a={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||r||"Failed to write changes";Y.showWarning(a,"Dismiss",()=>Y.clearWarning())}};Go=re(n=>{if(n.type!=="commitBatchComplete"||!Je)return;let o=n.results.find(i=>i.op==="updateClass");if(!o)return;let r=o.error?.match(/^(DYNAMIC_CLASSNAME|FILE_CHANGED|MAPPED_ELEMENT|CONFLICTING_CLASS|ELEMENT_NOT_FOUND)/);t(o.success,r?.[1],o.error||n.error)}),Uo=re(n=>{if(n.type==="commitBatchComplete"&&n.success&&zn){let{componentInfo:o,batch:r}=zn,i=n.results.find(s=>s.op==="updateClass")?.undoId??n.undoIds[0];if(!i)return;let a={componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,tagName:o.tagName};for(let s of r)he({type:"property",componentName:o.componentName,filePath:o.filePath,summary:`${s.cssProperty}: ${s.originalValue} \u2192 ${s.value}`,state:"active",propertyKey:s.cssProperty,elementIdentity:a,revertData:{type:"cliUndo",undoIds:[i]}});zn=null}})}function Zt(e,t){if(g.pendingBatch.size>0&&Hi(),Vn(),Bn(),g.showAllGroups=!1,g.readOnly=!1,g.selectedElement=e,g.componentInfo=t,!t.filePath&&t.componentName){let u=dt(t.componentName);u?g.componentInfo={...t,filePath:u}:ft(t.componentName).then(p=>{p&&(ut(t.componentName,p),g.componentInfo?.componentName===t.componentName&&(g.componentInfo={...g.componentInfo,filePath:p}))})}g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(hu);for(let u of Us)Ns(u)||n.add(u);let o=Eu(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,t.filePath||(g.readOnly=!0),qt&&qt(),qt=Ms(u=>{Us.has(u)&&Tu(u)});let r=g.showAllGroups?null:Ks(e),i=r?Ve.filter(u=>r.has(u.group)):Ve,s=r!==null&&i.length<Ve.length?()=>Js(!0):void 0,{container:l,controls:d}=ui(i,g.currentValues,Wn,Xo,s);Nt=d,Ko.disconnect(),Ko.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),Y.show(t.componentName,t.filePath,t.lineNumber,l),t.filePath?Y.clearWarning():Y.showWarning("Source file couldn't be resolved for this element","Dismiss",()=>Y.clearWarning())}function Wn(e,t){let n=Yo.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=bt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?vo(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(l=>l.value===t);s&&(a=s.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if($i(),t==="none"){let s=g.originalValues.get("display")||"block";Y.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=s),g.activeOverrides.delete("display"),g.currentValues.set("display",s),g.pendingBatch.delete("display"),$i(),Y.clearWarning()})}else Y.clearWarning()}function Hi(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath||"",t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1,o=g.selectedElement,r=[...g.pendingBatch.values()].map(a=>{let s=Yo.get(a.property);return{tailwindPrefix:a.tailwindPrefix,tailwindToken:a.tailwindToken,value:a.value,relatedPrefixes:a.relatedPrefixes,classPattern:s?.classPattern,standalone:s?.standalone}}),i=[e,t,n,o?.tagName.toLowerCase()||"",o?.id||"",o?jo(o):0].join(":");wu(),o&&g.elementIdentity&&Dn({type:"propertyChange",elementIdentity:g.elementIdentity,element:o,pendingMergeKey:i,pendingPropertyKeys:[...g.pendingBatch.values()].map(a=>a.property),overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))});for(let[a,s]of g.pendingBatch)g.originalValues.set(a,s.value);g.pendingBatch.clear()}function qo(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of Nt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function Mt(){Ce&&(clearTimeout(Ce),Ce=null),Ko.disconnect(),qo(),Bn(),Y&&Y.hide(),Oi()}function qs(){Ce&&(clearTimeout(Ce),Ce=null),Ko.disconnect(),Hi(),Bn(),Y&&Y.hide(),Oi()}function Zs(){return g.activeOverrides.size>0}function Js(e){g.showAllGroups=e,$i()}function Qs(){Go&&(Go(),Go=null),Uo&&(Uo(),Uo=null),zn=null,Mt()}var Yo,hu,Us,yu,g,Nt,Y,Gs,Ce,bu,Je,zn,qt,Uo,Go,Ko,Ii=S(()=>{"use strict";gs();Ls();$s();_t();He();Pn();Lt();le();Ri();st();vt();wn();Ws();js();Yo=new Map(Ve.map(e=>[e.key,e])),hu=new Set(["layout","spacing","size"]),Us=new Set(["typography","background"]),yu=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1},Nt=[],Ce=null,bu=300,Je=null,zn=null,qt=null,Uo=null,Go=null,Ko=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(Gs),Gs=setTimeout(()=>{vu()},80))})});function el(e,t){if(!Pt)return;let n=performance.now(),o=Math.abs(e-Pt.clientX),r=Math.abs(t-Pt.clientY),i=o<=2&&r<=2,a=n-Pt.timestamp<16;if(i||a)return Pt.element}function tl(e,t,n){Pt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Jt(){Pt=null}var Pt,Di=S(()=>{"use strict";Pt=null});function ku(){Fi=document.body.style.background||document.body.style.backgroundColor||"",Vi=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Q=document.createElement("div"),Q.setAttribute("data-frameup-canvas-wrapper","true"),Q.style.cssText=`
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
    background-color: ${c.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(rl.push(r),Q.appendChild(r));Q.style.position="relative",Q.style.zIndex="1",document.body.insertBefore(Ie,document.body.firstChild),document.body.insertBefore(Q,Ie.nextSibling),_i=Fn(ol),ol(),il.forEach(r=>r(Q))}function ol(){if(!Q||!Ie)return;let{scale:e,offsetX:t,offsetY:n}=ze();Q.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=Lu*e,r=t%o,i=n%o;Ie.style.backgroundImage=`radial-gradient(circle, ${Pu} ${nl}px, transparent ${nl}px)`,Ie.style.backgroundSize=`${o}px ${o}px`,Ie.style.backgroundPosition=`${r}px ${i}px`}function Ru(e,t,n){let{scale:o,offsetX:r,offsetY:i}=ze(),a=Math.min(Nu,Math.max(Su,o+n));if(a===o)return;let s=(e-r)/o,l=(t-i)/o,d=e-s*a,u=t-l*a;_n(a,d,u)}function al(e){e.preventDefault();let t=-e.deltaY*Mu,{scale:n}=ze(),o=t*n;Ru(e.clientX,e.clientY,o)}function sl(e,t){let{scale:n,offsetX:o,offsetY:r}=ze();_n(n,o+e,r+t)}function ll(){_n(1,0,0)}function cl(){return Q!==null}function dl(){Q?zi():ku()}function zi(){if(il.forEach(e=>e(null)),_i?.(),_i=null,Q){for(;Q.firstChild;)document.body.insertBefore(Q.firstChild,Q);Q.remove(),Q=null}Ie?.remove(),Ie=null,rl=[],document.body.style.background=Fi,document.documentElement.style.background=Vi,Fi="",Vi=""}var Su,Nu,Mu,Lu,nl,Pu,Q,Ie,_i,rl,il,Fi,Vi,Zo=S(()=>{"use strict";le();X();Su=.1,Nu=5,Mu=.002,Lu=24,nl=1,Pu="rgba(0,0,0,0.15)",Q=null,Ie=null,_i=null,rl=[],il=[],Fi="",Vi=""});function Qt(e,t){return e.length>t?e.slice(0,t)+"\u2026":e}function Qe(){return V!==null}function ul(){document.addEventListener("dblclick",ml,!0),document.addEventListener("mousedown",hl,!0),Wi=re(e=>{e.type==="updateTextComplete"&&$u(e)})}function pl(){V&&bl(),document.removeEventListener("dblclick",ml,!0),document.removeEventListener("mousedown",hl,!0),Wi?.(),Wi=null}function $u(e){if(e.success&&e.undoId&&jn){let t=jn,n={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};he({type:"textEdit",componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,summary:`"${Qt(t.originalText,20)}" \u2192 "${Qt(t.newText,20)}"`,state:"active",elementIdentity:n,revertData:{type:"cliUndo",undoIds:[e.undoId]}})}else if(!e.success&&e.reason==="no-match"&&jn){let t=jn,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText,cursorOffset:t.cursorOffset},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};zo(n,o,t.originalInnerHTML),he({type:"textAnnotation",componentName:n.componentName,filePath:n.filePath||"",summary:`"${Qt(n.originalText,20)}" \u2192 "${Qt(n.newText,20)}"`,state:"pending",elementIdentity:o,revertData:{type:"annotationRemove",annotationId:n.id,originalInnerHTML:t.originalInnerHTML,elementIdentity:o}})}jn=null}function Ou(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function Hu(e){let t=J(e);if(!t)return null;try{let n=await Ae(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||qe(r))continue;let i=Xe(o.fileName);if(!(!i||Vt(i)||Vt(o.fileName||"")))return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(ge(n)){let o=ae(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!qe(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function ml(e){V&&kt();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=At(e.clientX,e.clientY),t&&(Au.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),Iu(t)))}function Iu(e){V=e,Un=e.textContent||"",Jo=e.innerHTML,Qo=Un;let t=tr();t&&t.filePath?z=t:(z=null,Hu(e).then(o=>{V===e&&(z=o)})),Bi=e.style.outline,e.style.outline=`2px solid ${c.accent}`,e.contentEditable="true",vl(!1),e.focus();let n=window.getSelection();if(n){n.removeAllRanges();let o=document.createRange();o.selectNodeContents(e),o.collapse(!1),n.addRange(o)}e.addEventListener("blur",gl),e.addEventListener("keydown",yl),e.addEventListener("input",fl)}function fl(){V&&(Qo=V.textContent||"")}function gl(){kt()}function hl(e){if(!V)return;let t=e.target;if(t instanceof Node&&(t===V||V.contains(t)))return;if((t instanceof HTMLElement?t:null)?.closest("#frameup-root")){kt();return}let o=Du(e);if(o&&xt(o)){e.preventDefault(),e.stopPropagation(),kt({nextSelection:o,reselectEditedElement:!1});return}e.preventDefault(),e.stopPropagation(),kt({clearSelection:!0,reselectEditedElement:!1})}function yl(e){if(e.key==="Escape"){e.preventDefault(),kt();return}if(e.key==="Enter"&&V&&!Ou(V)){e.preventDefault(),kt();return}e.stopPropagation()}function Du(e){let t=e.target;return t instanceof HTMLElement&&t!==document.documentElement&&t!==document.body&&!t.hasAttribute("data-frameup-interaction")&&!t.closest("#frameup-root")?t:At(e.clientX,e.clientY)}function _u(e){let t=window.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0);if(!n.collapsed||!e.contains(n.endContainer))return;let o=n.cloneRange();return o.selectNodeContents(e),o.setEnd(n.endContainer,n.endOffset),o.toString().length}function kt(e){if(!V)return;let t=Qo,n=_u(V),o=t!==Un;if(console.log("[FrameUp:textEdit] commitAndExit changed:",o,"componentInfo:",z?.componentName,"filePath:",z?.filePath),o&&z){if(!z.filePath&&z.componentName){let i=dt(z.componentName);i?z={...z,filePath:i}:ft(z.componentName).then(a=>{a&&ut(z.componentName,a)})}{let i={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:z.componentName,filePath:z.filePath||"",lineNumber:z.lineNumber||0,columnNumber:z.columnNumber||0,originalText:Un,newText:t,cursorOffset:n},a={componentName:z.componentName,filePath:z.filePath||"",lineNumber:z.lineNumber||0,columnNumber:z.columnNumber||0,tagName:z.tagName};zo(i,a,Jo,{tagName:V?.tagName.toLowerCase()||z.tagName,className:V?.className||void 0,parentTagName:V?.parentElement?.tagName.toLowerCase(),parentClassName:V?.parentElement?.className||void 0}),he({type:"textAnnotation",componentName:i.componentName,filePath:i.filePath||"",summary:`"${Qt(i.originalText,20)}" \u2192 "${Qt(i.newText,20)}"`,state:"pending",elementIdentity:a,revertData:{type:"annotationRemove",annotationId:i.id,originalInnerHTML:Jo,elementIdentity:a}})}}let r=V;if(bl(),e?.nextSelection&&document.contains(e.nextSelection)){Rt(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){De();return}e?.reselectEditedElement!==!1&&r&&document.contains(r)&&Rt(r,{skipSidebar:!1})}function bl(){V&&(V.removeEventListener("blur",gl),V.removeEventListener("keydown",yl),V.removeEventListener("input",fl),V.removeAttribute("contenteditable"),V.style.outline=Bi,er(In()),V=null,Un="",Jo="",Qo="",z=null,Bi="")}var Au,V,Un,Jo,Qo,z,Bi,Wi,jn,Gn=S(()=>{"use strict";st();vt();wn();He();Pn();X();Yn();le();le();Ct();en();Lt();Au=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),V=null,Un="",Jo="",Qo="",z=null,Bi="",Wi=null,jn=null});function Cl(e,t){ji.set(e,t)}function El(){H=document.createElement("div"),H.setAttribute("data-frameup-interaction","true"),H.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(H),document.addEventListener("scroll",Jt,!0),H.addEventListener("mousedown",e=>{if(et){tn=e.clientX,Kn=e.clientY,H&&(H.style.cursor="grabbing"),e.preventDefault();return}Xn?.onMouseDown?.(e)}),H.addEventListener("mousemove",e=>{if(et&&tn!==0){sl(e.clientX-tn,e.clientY-Kn),tn=e.clientX,Kn=e.clientY;return}Xn?.onMouseMove?.(e)}),H.addEventListener("mouseup",e=>{if(et){H&&(H.style.cursor="grab"),tn=0,Kn=0;return}Xn?.onMouseUp?.(e)}),document.addEventListener("wheel",Tl,{passive:!1}),document.addEventListener("keydown",wl),document.addEventListener("keyup",Sl)}function Tl(e){!H||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||al(e)}function wl(e){if(e.key!==" "||Qe())return;let t=document.activeElement;t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable||(e.preventDefault(),!et&&H&&(xl=H.style.cursor,H.style.cursor="grab",H.style.pointerEvents="auto",et=!0))}function Sl(e){if(e.key===" "&&et&&(e.preventDefault(),et=!1,tn=0,Kn=0,H)){H.style.cursor=xl;let t=In();H.style.pointerEvents=t==="select"?"none":"auto"}}function nr(){return et}function er(e){Xn=ji.get(e)||null,H&&(H.style.pointerEvents=e==="select"?"none":"auto"),Fu(e)}function Fu(e){if(H)switch(e){case"select":H.style.cursor="default";break;case"text":H.style.cursor="text";break;default:H.style.cursor="default"}}function vl(e){H&&(H.style.pointerEvents=e?"auto":"none")}function At(e,t){let n=el(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!Jr(i)){r=i;break}return tl(e,t,r),r}function Nl(){document.removeEventListener("scroll",Jt,!0),document.removeEventListener("wheel",Tl),document.removeEventListener("keydown",wl),document.removeEventListener("keyup",Sl),et=!1,H?.remove(),H=null,Xn=null,ji.clear()}var H,Xn,ji,et,tn,Kn,xl,Yn=S(()=>{"use strict";Di();Ct();Zo();Gn();le();H=null,Xn=null,ji=new Map,et=!1,tn=0,Kn=0,xl=""});function Ml(e,t,n,o,r,i){let a=e.left+e.width/2,s=e.top+e.height/2,l=t.left+t.width/2,d=t.top+t.height/2,u=l-a,p=d-s,f=Math.abs(u)<=r,m=Math.abs(p)<=r;return{dx:f?n+u/i:n,dy:m?o+p/i:o,snappedX:f,snappedY:m,guides:{verticalLine:f?{x:l,top:t.top,bottom:t.bottom}:null,horizontalLine:m?{y:d,left:t.left,right:t.right}:null}}}var Ll=S(()=>{"use strict"});function Ui(e,t,n){let o=Kt(e,t),r=wi(n);if(r)return ye=r,or={x:o.x,y:o.y},Zn={...r.delta},qn=!1,kn(r.element,r.delta.dx,r.delta.dy,r.existingTransform),!0;let i=tr(),a=Rl();if(!i||!a||n!==a)return!1;let s=a.getBoundingClientRect(),l=a.style.cssText,d=getComputedStyle(a).transform,u=J(a),p=u?.key!=null?String(u.key):void 0,f=Ds(a),m={id:crypto.randomUUID(),componentRef:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber},element:a,placeholder:null,originalRect:s,delta:{dx:0,dy:0},originalCssText:l,existingTransform:d==="none"?"":d,identity:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber,tagName:a.tagName.toLowerCase()},parentLayout:Os(a),nthOfType:f,jsxKey:p};return Al(i.filePath).then(({mtime:h,size:y})=>{m.fileMtime=h,m.fileSize=y}),bi(m),ye=m,or={x:o.x,y:o.y},Zn={dx:0,dy:0},qn=!0,kn(a,0,0,m.existingTransform),!0}function Gi(e,t){if(!ye)return;let n=Kt(e,t),o=Zn.dx+(n.x-or.x),r=Zn.dy+(n.y-or.y);kn(ye.element,o,r,ye.existingTransform);let i=ye.element.parentElement;if(!i||i===document.body||i===document.documentElement){ye.delta={dx:o,dy:r},ai();return}let a=ye.element.getBoundingClientRect(),s=i.getBoundingClientRect(),{scale:l}=ze(),d=Ml(a,s,o,r,5,l);(d.snappedX||d.snappedY)&&kn(ye.element,d.dx,d.dy,ye.existingTransform),ye.delta={dx:d.dx,dy:d.dy},ss(d.guides)}function Pl(){if(!ye)return null;let e=ye,t={...Zn},n={...e.delta};qn||vi(e.id,n,t),Is(e),ai(),he({type:"move",componentName:e.componentRef.componentName,filePath:e.componentRef.filePath,summary:`moved (${Math.round(n.dx)}px, ${Math.round(n.dy)}px)`,state:"pending",elementIdentity:e.identity,revertData:qn?{type:"moveRemove",moveId:e.id}:{type:"moveRestore",moveId:e.id,previousDelta:t}});let o=e.element;return ye=null,qn=!1,o}var ye,or,Zn,qn,kl=S(()=>{"use strict";Rn();Lt();le();en();Ll();Po();He();st();ye=null,or={x:0,y:0},Zn={dx:0,dy:0},qn=!1});async function Vu(e){let t=J(e);if(!t)return null;try{let n=await Ae(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||qe(i))continue;let a=Xe(r.fileName);o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0){let r=o.find(i=>i.filePath)||o[0];return{tagName:e.tagName.toLowerCase(),componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,stack:o}}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return $l(e,t)}function $l(e,t){let n=[],o=t;for(;o;){if(ge(o)){let r=ae(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,l=0;i&&(a=i.fileName||"",s=i.lineNumber||0,l=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!qe(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:l})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Ol(e){let t=J(e);return t?$l(e,t):null}function zu(e){let t=e.tagName.toLowerCase(),n=e.getAttribute("data-component-name")?.trim(),o=e.getAttribute("aria-label")?.trim(),r=e.textContent?.trim(),i=n||o||(r?r.slice(0,24):"")||`<${t}>`;return{tagName:t,componentName:i,filePath:"",lineNumber:0,columnNumber:0,stack:[]}}function Hl(e,t){let n=At(e,t);return n?Si(n)?.element??n:null}function Il(e){Bu=e.onStart,Wu=e.onMove,ju=e.onEnd}function Dl(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=Uu,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),_e=document.createElement("div"),_e.className="marquee-box",e.appendChild(_e),nt=!0,document.addEventListener("mousedown",rr,!0),document.addEventListener("mousemove",ir,!0),document.addEventListener("mouseup",ar,!0),document.addEventListener("keydown",lr,!0),document.addEventListener("click",sr,!0),document.addEventListener("scroll",tt,!0),window.addEventListener("resize",tt),nn=!0}function rr(e){if(!nt||Qe()||nr()||e.metaKey||e.ctrlKey||e.composedPath().some(r=>r instanceof HTMLElement&&r.id==="frameup-root"))return;let n=Hl(e.clientX,e.clientY);if(Z||D.size>0){let r=si(e.clientX,e.clientY);if(r){e.preventDefault(),e.stopPropagation();let i=cs();if(Me=r,cr=i?{...i}:null,D.size>0){gt=[];for(let[a]of D){let s=getComputedStyle(a);gt.push({element:a,width:parseFloat(s.width)||a.offsetWidth,height:parseFloat(s.height)||a.offsetHeight})}Jn=0,Qn=0}else if(B){let a=getComputedStyle(B);Jn=parseFloat(a.width)||B.offsetWidth,Qn=parseFloat(a.height)||B.offsetHeight,gt=[]}I={x:e.clientX,y:e.clientY},ue="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!n||!xt(n)){(Z||D.size>0)&&(qs(),Z=null,B=null,dr(),Et(null),v&&(v.classList.remove("visible"),v.style.display="none"),We(null));return}if(I={x:e.clientX,y:e.clientY},Be=n,eo=e.shiftKey,Ti(n)&&Ui(e.clientX,e.clientY,n)){ue="move-drag";return}if(!eo&&B&&n===B){ue="pending-move";return}ue="pending"}function ir(e){if(nt&&!Qe()&&!nr()){if(ue==="resize-drag"&&Me&&I&&cr){e.preventDefault(),e.stopPropagation();let t=e.clientX-I.x,n=e.clientY-I.y;if(gt.length>0){for(let o of gt){let r=o.width,i=o.height;Me==="tr"||Me==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Me==="bl"||Me==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}to()}else{let o=Jn,r=Qn;Me==="tr"||Me==="br"?o=Math.max(10,Jn+t):o=Math.max(10,Jn-t),Me==="bl"||Me==="br"?r=Math.max(10,Qn+n):r=Math.max(10,Qn-n),o=Math.round(o),r=Math.round(r),Wn("width",`${o}px`),Wn("height",`${r}px`),tt()}return}if(ue==="pending-move"&&I){let t=Math.abs(e.clientX-I.x),n=Math.abs(e.clientY-I.y);(t>4||n>4)&&(Be&&Ui(I.x,I.y,Be)?(ue="move-drag",Gi(e.clientX,e.clientY)):ue="marquee");return}if(ue==="move-drag"){Gi(e.clientX,e.clientY);return}if(ue==="pending"&&I){let t=Math.abs(e.clientX-I.x),n=Math.abs(e.clientY-I.y);(t>10||n>10)&&(ue="marquee")}if(ue==="marquee"&&I&&_e){let t=Math.min(e.clientX,I.x),n=Math.min(e.clientY,I.y),o=Math.abs(e.clientX-I.x),r=Math.abs(e.clientY-I.y);_e.style.display="block",_e.style.left=`${t}px`,_e.style.top=`${n}px`,_e.style.width=`${o}px`,_e.style.height=`${r}px`;return}if(ue==="idle"){if(Z&&B||D.size>0){let i=si(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=Hl(e.clientX,e.clientY);if(!n||!xt(n)){Lo(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Lo(o,r+2)}}}function ar(e){if(!nt||Qe()||nr())return;let t=ue;if(ue="idle",t==="resize-drag"){document.body.style.cursor="",Me=null,cr=null,I=null,gt.length>0?gt=[]:Xo();return}if(t==="move-drag"){let n=Pl();n&&Xu(n),I=null,Be=null;return}if(t==="pending-move"){I=null,Be=null;return}if(t==="marquee"&&I){_e&&(_e.style.display="none"),Gu(Math.min(e.clientX,I.x),Math.min(e.clientY,I.y),Math.max(e.clientX,I.x),Math.max(e.clientY,I.y)),I=null,Be=null,eo=!1;return}Be&&(eo?Yu(Be):(dr(),Rt(Be))),I=null,Be=null,eo=!1}async function Rt(e,t){try{let n=e.getBoundingClientRect();B=e,Yi(n,{}),Ku();let o=await Vu(e)??zu(e);if(!o.filePath&&o.componentName){let r=dt(o.componentName);if(r===void 0){let i=await ft(o.componentName);if(ut(o.componentName,i),i&&(o.filePath=i,o.stack))for(let a of o.stack)a.componentName===o.componentName&&!a.filePath&&(a.filePath=i)}else if(r&&(o.filePath=r,o.stack))for(let i of o.stack)i.componentName===o.componentName&&!i.filePath&&(i.filePath=r)}if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o.componentName,o.filePath,"stack:",o.stack?.map(r=>r.componentName)),Z={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||Zt(e,Z),We({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function Gu(e,t,n,o){let r=Qa({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){Mt(),Z=null,B=null,Et(null),v&&(v.classList.remove("visible"),v.style.display="none"),D.clear();for(let i of r.slice(0,50)){let a=Ol(i);if(!a)continue;let s=i.getBoundingClientRect(),l={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};D.set(i,{element:i,info:l})}if(D.size!==0){if(D.size===1){let[i,a]=[...D.entries()][0];D.clear(),B=i,Z=a.info;let s=i.getBoundingClientRect();if(Yi(s,Z),v){let l=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${l?`<span class="comp-path">${l}</span>`:""}`}Zt(i,Z),We({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}to(),We(null),v&&(v.innerHTML=`<span class="comp-name">${D.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Yu(e){if(D.has(e)){if(D.delete(e),D.size===1){let[r,i]=[...D.entries()][0];D.clear(),Mn(),B=r,Z=i.info;let a=r.getBoundingClientRect();if(Yi(a,Z),Zt(r,Z),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}We({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else D.size===0?(Mn(),De()):(to(),v&&(v.innerHTML=`<span class="comp-name">${D.size} elements selected</span>`));return}let t=Ol(e);if(!t)return;Z&&B&&D.size===0&&(D.set(B,{element:B,info:Z}),Mt(),Z=null,B=null,Et(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};D.set(e,{element:e,info:o}),to(),We(null),v&&(v.innerHTML=`<span class="comp-name">${D.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function dr(){D.clear(),Mn()}function to(){if(D.size===0){Mn();return}let e=[];for(let[t]of D){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}ls(e)}function sr(e){nt&&(Qe()||e.metaKey||e.ctrlKey||e.preventDefault())}function lr(e){if(nt&&e.key==="Escape"){if(D.size>0){dr(),v&&(v.classList.remove("visible"),v.style.display="none"),We(null),e.preventDefault();return}if(Z){if(Zs()){qo(),e.preventDefault();return}De(),e.preventDefault()}}}function Yi(e,t){if(B){let n=parseFloat(getComputedStyle(B).borderRadius)||4;Et(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function tt(){if(D.size>0){to();return}if(!B||!Z)return;let e=B.getBoundingClientRect(),t=parseFloat(getComputedStyle(B).borderRadius)||4;if(Et(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Ku(){Lo(null)}function De(){Mt(),Z=null,B=null,Me=null,cr=null,gt=[],dr(),document.body.style.cursor="",Et(null),v&&(v.classList.remove("visible"),v.style.display="none"),We(null)}function tr(){return Z}function _l(){nt=!1,document.removeEventListener("mousedown",rr,!0),document.removeEventListener("mousemove",ir,!0),document.removeEventListener("mouseup",ar,!0),document.removeEventListener("keydown",lr,!0),document.removeEventListener("click",sr,!0),document.removeEventListener("scroll",tt,!0),window.removeEventListener("resize",tt),nn=!1,v?.remove(),v=null}function Fl(e){e&&!nn?(document.addEventListener("mousedown",rr,!0),document.addEventListener("mousemove",ir,!0),document.addEventListener("mouseup",ar,!0),document.addEventListener("keydown",lr,!0),document.addEventListener("click",sr,!0),document.addEventListener("scroll",tt,!0),window.addEventListener("resize",tt),nn=!0,nt=!0):!e&&nn&&(document.removeEventListener("mousedown",rr,!0),document.removeEventListener("mousemove",ir,!0),document.removeEventListener("mouseup",ar,!0),document.removeEventListener("keydown",lr,!0),document.removeEventListener("click",sr,!0),document.removeEventListener("scroll",tt,!0),window.removeEventListener("resize",tt),nn=!1,nt=!1)}function Rl(){return B??null}async function Xu(e){await Rt(e,{skipSidebar:!0})}var Z,B,nt,nn,D,v,_e,ue,I,Be,Me,cr,Jn,Qn,gt,eo,Bu,Wu,ju,Uu,en=S(()=>{"use strict";st();vt();wn();we();Ct();es();X();Po();Ii();Yn();kl();le();Pn();He();Gn();Gr()||Yr({onCommitFiberRoot(){}});Z=null,B=null,nt=!1,nn=!1,D=new Map,v=null,_e=null,ue="idle",I=null,Be=null,Me=null,cr=null,Jn=0,Qn=0,gt=[],eo=!1,Bu=null,Wu=null,ju=null,Uu=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    box-shadow: ${O.sm};
    border-radius: ${L.sm};
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
    color: ${c.textPrimary};
    font-size: 12px;
    font-weight: 600;
  }
  .selection-label .comp-path {
    color: ${c.textSecondary};
    font-size: 11px;
    margin-left: 8px;
  }
  .selection-label .loading-dots {
    color: ${c.textTertiary};
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
    border: 1px solid ${c.accent};
    background: ${c.accentSoft};
    border-radius: 2px;
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`});function Ki(e){return no.push(e),()=>{no=no.filter(t=>t!==e)}}function Ot(){no.forEach(e=>e())}function he(e){let t=crypto.randomUUID(),n={...e,id:t,timestamp:Date.now()};return Fe.set(t,n),Ot(),t}function qu(e){let t=Fe.get(e);if(!(!t||t.state==="reverted")){switch(t.revertData.type){case"noop":return;case"cliUndo":case"generateUndo":mr.add(e),Ee({type:"revertChanges",undoIds:t.revertData.undoIds});break;case"moveRemove":{let{moveId:n}=t.revertData;Promise.resolve().then(()=>(le(),Wo)).then(({removeMove:o})=>{o(n)}),pr(t);break}case"moveRestore":{let{moveId:n,previousDelta:o}=t.revertData;Promise.resolve().then(()=>(le(),Wo)).then(({restoreMoveDelta:r})=>{r(n,o)}),pr(t);break}case"annotationRemove":{let{annotationId:n,originalInnerHTML:o}=t.revertData;Promise.resolve().then(()=>(le(),Wo)).then(({removeAnnotation:r})=>{r(n)}),pr(t);break}}t.state="reverted",Ot()}}function Xi(){let e=0;for(let t of Fe.values())t.state!=="reverted"&&e++;return e}function io(){return on}function ao(e){on=e,Ot()}function Zu(){Fe.clear(),Ot()}function zl(){let e=!1;for(let t of Fe.values())t.state==="pending"&&(t.state="active",e=!0);e&&Ot()}function Bl(){let e=!1;for(let[t,n]of Fe)n.state==="pending"&&(Fe.delete(t),e=!0);e&&Ot()}function Qu(e){let t=Math.floor((Date.now()-e)/1e3);if(t<10)return"just now";let n=Math.floor(t/60),o=t%60;return`${n}:${String(o).padStart(2,"0")} ago`}function ep(e){return e.split("/").pop()??e}function ro(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Vl(e){return!!e.elementIdentity}function tp(e){return e.state!=="reverted"&&e.revertData.type!=="noop"}function np(e){let t=ro(e.summary).replaceAll(" \u2192 ",'<span class="arrow"> \u2192 </span>');return`<span class="component-name">${ro(e.componentName)}</span><span class="entry-separator">\u2022</span>${t}`}function pr(e){he({type:e.type,componentName:e.componentName,filePath:e.filePath,summary:`reverted ${e.summary}`,state:"active",propertyKey:e.propertyKey,elementIdentity:e.elementIdentity,revertData:{type:"noop"}})}async function op(e){let t=Fe.get(e),n=t?.elementIdentity;if(!t||!n)return;let o=Gt(n);if(o||(o=await Oo(n)),!o){P(`Couldn't find ${t.componentName}`);return}await Rt(o,{skipSidebar:!1})}function rp(){if(!ot)return;let e=Array.from(Fe.values()).reverse();if(e.length===0){ot.innerHTML='<div class="changelog-empty">No logs yet. Changes will appear here.</div>';return}ot.innerHTML=e.map(o=>{let r=["changelog-entry",Vl(o)?"selectable":"",o.state==="reverted"?"reverted":"",o.state==="pending"?"pending":""].filter(Boolean).join(" "),i=o.filePath?ep(o.filePath):"",a=Qu(o.timestamp);return`<div class="${r}" data-entry-id="${ro(o.id)}">
  <span class="entry-summary">${np(o)}</span>
  ${i?`<span class="entry-file" title="${ro(i)}">${ro(i)}</span>`:""}
  <span class="entry-time">${a}</span>
  ${tp(o)?'<button class="entry-revert" title="Revert this change">\u21A9</button>':""}
</div>`}).join("");let t=Array.from(ot.querySelectorAll(".entry-revert"));for(let o of t){let i=o.closest(".changelog-entry")?.dataset.entryId;i&&o.addEventListener("click",a=>{a.stopPropagation(),qu(i)})}let n=Array.from(ot.querySelectorAll(".changelog-entry"));for(let o of n){let r=o.dataset.entryId;if(!r)continue;let i=Fe.get(r);!i||!Vl(i)||o.addEventListener("click",()=>{op(r)})}}function ip(){if(!rt)return;let e=Xi();e===0?rt.classList.add("hidden"):(rt.classList.remove("hidden"),rt.textContent=String(e))}function Wl(e){oo=document.createElement("style"),oo.textContent=Ju,e.appendChild(oo),pe=document.createElement("div"),pe.className="changelog-panel",pe.style.display="none";let t=document.createElement("div");t.className="changelog-header";let n=document.createElement("div");n.className="changelog-header-main";let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("changelog-header-icon"),o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.7"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.innerHTML='<path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path>';let r=document.createElement("span");r.className="changelog-title",r.textContent="Logs",rt=document.createElement("span"),rt.className="changelog-badge hidden",rt.textContent="0";let i=document.createElement("span");i.className="changelog-header-copy",i.textContent="Latest changes",$t=document.createElement("svg"),$t.className="changelog-chevron",$t.setAttribute("viewBox","0 0 16 16"),$t.setAttribute("fill","currentColor"),$t.innerHTML='<path d="M3.5 5.5L8 10l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',n.appendChild(o),n.appendChild(r),n.appendChild(rt),n.appendChild(i),t.appendChild(n),t.appendChild($t),t.addEventListener("click",()=>ao(!on)),pe.appendChild(t),ot=document.createElement("div"),ot.className="changelog-body",pe.appendChild(ot),e.appendChild(pe);let a=Ki(()=>{rp(),ip(),pe&&(on&&pe.style.display==="none"?(pe.style.display="",requestAnimationFrame(()=>{requestAnimationFrame(()=>{pe?.classList.add("visible")})})):on||(pe.style.display="none",pe.classList.remove("visible")),pe.classList.toggle("collapsed",!on))});ur=re(l=>{if(l.type==="revertComplete"){for(let[d,u]of Fe){if(!mr.has(d))continue;let p=u.revertData;if(p.type!=="cliUndo"&&p.type!=="generateUndo")continue;let f=l.results.filter(m=>p.undoIds.includes(m.undoId));f.length!==0&&(mr.delete(d),f.every(m=>m.success)?pr(u):(u.state="active",Ot()))}for(let d of l.results)!d.success&&d.error&&P(`Revert failed: ${d.error}`)}});let s=fr;fr=()=>{s(),a()}}function jl(){ur&&(ur(),ur=null),fr(),fr=()=>{},pe?.remove(),pe=null,oo?.remove(),oo=null,ot=null,rt=null,$t=null,mr.clear(),Zu(),no=[]}var Fe,on,mr,no,pe,ot,rt,$t,ur,oo,Ju,fr,Lt=S(()=>{"use strict";He();X();we();en();Rn();Fe=new Map,on=!1,mr=new Set,no=[];pe=null,ot=null,rt=null,$t=null,ur=null,oo=null,Ju=`
  .changelog-panel {
    position: fixed;
    top: 16px;
    right: 16px;
    bottom: 16px;
    width: 380px;
    max-width: min(380px, calc(100vw - 32px));
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    border-radius: ${L.lg};
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
    border-bottom: 1px solid ${c.border};
    background: ${c.bgSecondary};
    transition: background ${C.fast};
    flex-shrink: 0;
  }
  .changelog-header:hover {
    background: ${c.bgTertiary};
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
    color: ${c.accent};
    flex-shrink: 0;
  }
  .changelog-title {
    font-size: 13px;
    font-weight: 600;
    color: ${c.textPrimary};
  }
  .changelog-badge {
    background: ${c.accent};
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
    color: ${c.textTertiary};
    font-size: 11px;
  }
  .changelog-chevron {
    width: 14px;
    height: 14px;
    color: ${c.textTertiary};
    transition: transform ${C.medium};
    flex-shrink: 0;
  }
  .changelog-panel:not(.collapsed) .changelog-chevron {
    transform: rotate(180deg);
  }
  .changelog-body {
    flex: 1;
    overflow-y: auto;
    background: ${c.bgPrimary};
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
    border-bottom: 1px solid ${c.border};
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
    background: ${c.bgTertiary};
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
    color: ${c.textSecondary};
    min-width: 0;
    line-height: 1.3;
  }
  .component-name {
    color: ${c.textPrimary};
    font-weight: 600;
  }
  .entry-separator {
    color: ${c.textTertiary};
    margin: 0 6px;
  }
  .arrow {
    color: ${c.textTertiary};
  }
  .entry-file {
    color: ${c.textTertiary};
    flex-shrink: 0;
    font-size: 11px;
    max-width: 96px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .entry-time {
    color: ${c.textTertiary};
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
    color: ${c.accent};
    font-size: 14px;
    border-radius: ${L.xs};
    opacity: 0;
    transition: opacity ${C.fast}, background ${C.fast};
  }
  .changelog-entry:hover .entry-revert {
    opacity: 1;
  }
  .entry-revert:hover {
    background: ${c.accentSoft};
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
    color: ${c.textTertiary};
    text-align: center;
  }
`;fr=()=>{}});function Ul(e){so=e}function Zi(){return rn}function sp(){return[...an.values()]}function qi(){an.clear(),so?.(0)}function Gl(){Bl();for(let[,{element:e,overrides:t}]of hr)for(let[n,o]of t)e.style[n]=o;hr.clear(),qi(),P("Discarded all pending changes","info")}function Yl(){if(an.size===0||rn)return;rn=!0,so?.(an.size);let e=sp();Ee({type:"applyAllChanges",changes:e}),gr=setTimeout(()=>{rn&&(rn=!1,so?.(an.size),P("Apply timed out \u2014 changes still pending, try again","error"))},ap)}var ap,an,rn,gr,so,hr,Kl=S(()=>{"use strict";He();we();Lt();ap=3e4,an=new Map,rn=!1,gr=null,so=null;hr=new Map;Xl(e=>{rn=!1,gr&&(clearTimeout(gr),gr=null),e.success?(zl(),hr.clear(),qi(),P(`Applied ${e.appliedCount} change${e.appliedCount===1?"":"s"}`,"success")):e.appliedCount>0?(hr.clear(),P(`Applied ${e.appliedCount}, failed ${e.failedCount}`,"warning"),qi()):P(e.error||"Failed to apply changes","error"),so?.(an.size)})});var Jl={};Ca(Jl,{destroyToolbar:()=>na,getShadowRoot:()=>q,hideGenerateButton:()=>dp,mountToolbar:()=>ta,setOnCanvasUndo:()=>ra,setOnGenerate:()=>oa,showToast:()=>P,updateComponentDetail:()=>We,updateGenerateButton:()=>ht});function ta(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),ln=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=cp;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${Qi}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <div class="pending-actions" style="display:none">
      <button class="confirm-btn" title="Confirm Changes">Confirm Changes</button>
      <button class="discard-btn" title="Discard all pending changes">\u2715</button>
    </div>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${lp}
    </button>
  `,ln.appendChild(n),ln.appendChild(o),ee=o.querySelector(".undo-btn"),cn=o.querySelector(".generate-btn");let r=o.querySelector(".close-btn");sn=o.querySelector(".component-detail"),Ht=document.createElement("div"),Ht.className="toast",ln.appendChild(Ht),ee.addEventListener("click",()=>{Ee({type:"undo"}),ee&&(ee.innerHTML='<div class="spinner"></div>',ee.disabled=!0)}),r.addEventListener("click",e),cn.addEventListener("click",()=>{ea&&ea()});let i=o.querySelector(".pending-actions"),a=o.querySelector(".confirm-btn"),s=o.querySelector(".discard-btn");Ul(l=>{l>0&&!Zi()?(i.style.display="flex",a.textContent=`Confirm Changes (${l})`,a.disabled=!1):Zi()?(i.style.display="flex",a.textContent="Applying...",a.disabled=!0,s.style.display="none"):(i.style.display="none",s.style.display="inline-block")}),a.addEventListener("click",()=>{Yl()}),s.addEventListener("click",()=>{Gl()}),document.addEventListener("keydown",l=>{l.key==="z"&&(l.ctrlKey||l.metaKey)&&!l.shiftKey&&!up()&&Zl?.()&&l.preventDefault()}),Ql(()=>{P("Disconnected. Click to reconnect."),nc()}),ec(()=>{P("Disconnected: another tab took over")}),tc(()=>{lo=0,ee&&(ee.disabled=!0)}),re(l=>{switch(l.type){case"reorderComplete":l.success?(lo++,ee&&(ee.innerHTML=ql,setTimeout(()=>{ee&&(ee.innerHTML=Qi,ee.disabled=!1)},200))):l.error&&P(l.error);break;case"undoComplete":l.success?(lo=Math.max(0,lo-1),ee&&(ee.innerHTML=ql,setTimeout(()=>{ee&&(ee.innerHTML=Qi,ee.disabled=lo===0)},200))):l.error&&P(l.error);break;case"devServerDisconnected":P("Dev server disconnected");break;case"devServerReconnected":P("Dev server reconnected");break}})}function na(){let e=document.getElementById("frameup-root");e&&e.remove(),ln=null,ee=null}function q(){return ln}function oa(e){ea=e}function ra(e){Zl=e}function ht(e){cn&&(cn.disabled=!e)}function dp(){cn&&(cn.style.display="none")}function We(e){if(!sn)return;if(!e){sn.className="component-detail empty",sn.textContent="No selection";return}sn.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";sn.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function P(e,t="info"){Ht&&(Ht.textContent=e,Ht.classList.add("visible"),Ji&&clearTimeout(Ji),Ji=setTimeout(()=>{Ht?.classList.remove("visible")},2e3))}function up(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var ln,ee,lo,Ht,Ji,sn,cn,ea,Zl,Qi,lp,ql,cp,we=S(()=>{"use strict";He();X();Kl();ln=null,ee=null,lo=0,Ht=null,Ji=null,sn=null,cn=null,ea=null,Zl=null,Qi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',lp='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',ql='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',cp=`
  :host {
    all: initial;
  }
  ${Ma}
  .toolbar {
    position: fixed;
    bottom: 16px;
    left: 76px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    border-radius: ${L.md};
    font-family: ${x};
    font-size: 12px;
    color: ${c.textPrimary};
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
    background: ${c.border};
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
    color: ${c.textSecondary};
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
    background: ${c.bgSecondary};
    color: ${c.textPrimary};
  }
  .icon-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .icon-btn.active {
    color: ${c.accent};
  }
  .close-btn {
    color: ${c.textTertiary};
  }
  .close-btn:hover {
    background: ${c.dangerSoft};
    color: ${c.danger};
  }
  .generate-btn {
    background: ${c.accent};
    border: none;
    border-radius: ${L.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${x};
    cursor: pointer;
    transition: background ${C.fast};
  }
  .generate-btn:hover:not(:disabled) {
    background: ${c.accentHover};
  }
  .generate-btn:disabled {
    background: ${c.bgTertiary};
    color: ${c.textTertiary};
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
    color: ${c.accent};
    font-size: 11px;
    font-weight: 600;
    font-family: monospace;
    flex-shrink: 0;
  }
  .component-detail .name {
    color: ${c.textPrimary};
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .component-detail .path {
    color: ${c.textTertiary};
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .component-detail.empty {
    color: ${c.textTertiary};
    font-size: 12px;
  }
  .toast {
    position: fixed;
    bottom: 68px;
    left: 76px;
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    color: ${c.textPrimary};
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
    border: 2px solid ${c.border};
    border-top-color: ${c.textSecondary};
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  .pending-actions {
    display: none;
    align-items: center;
    gap: 4px;
  }
  .confirm-btn {
    background: ${c.accent};
    border: none;
    border-radius: ${L.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${x};
    cursor: pointer;
    transition: background ${C.fast};
    white-space: nowrap;
  }
  .confirm-btn:hover { background: ${c.accentHover}; }
  .confirm-btn:disabled { background: ${c.bgTertiary}; color: ${c.textTertiary}; cursor: wait; }
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
`});function Xl(e){da=e}function yr(e){be&&be.readyState===WebSocket.OPEN||(ca=e,be=new WebSocket(`ws://localhost:${e}`),be.onopen=()=>{let t=dn>0;dn=0,t&&la&&la()},be.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&wa(n.tokens),n.type==="updatePropertyComplete"&&oc&&oc(n.success,n.errorCode,n.error),n.type==="config"&&(Sa(n.hasApiKey),n.hasApiKey&&Promise.resolve().then(()=>(we(),Jl)).then(o=>o.hideGenerateButton())),n.type==="applyAllComplete"&&da&&da(n),co.forEach(o=>o(n))}catch{}},be.onclose=t=>{if(be=null,t.code===4001){sa&&sa();return}if(dn<pp){let n=500*Math.pow(2,dn);dn++,ia=setTimeout(()=>yr(e),n)}else aa&&aa()},be.onerror=()=>{})}function Ee(e){be&&be.readyState===WebSocket.OPEN&&be.send(JSON.stringify(e))}function re(e){return co.push(e),()=>{co=co.filter(t=>t!==e)}}function rc(){ia&&clearTimeout(ia),be&&(be.close(),be=null),co=[]}function ft(e){return new Promise(t=>{let n=re(o=>{o.type==="discoverFileResult"&&o.componentName===e&&(n(),t(o.filePath))});Ee({type:"discoverFile",componentName:e}),setTimeout(()=>{n(),t(null)},5e3)})}function Ql(e){aa=e}function ec(e){sa=e}function tc(e){la=e}function nc(){ca&&(dn=0,yr(ca))}function Al(e){return new Promise(t=>{let n=re(o=>{o.type==="fileStatResult"&&o.filePath===e&&(n(),t({mtime:o.mtime,size:o.size}))});Ee({type:"fileStat",filePath:e}),setTimeout(()=>{n(),t({mtime:0,size:0})},2e3)})}var be,co,dn,pp,ia,aa,sa,la,ca,oc,da,He=S(()=>{"use strict";_t();Na();be=null,co=[],dn=0,pp=5,ia=null,aa=null,sa=null,la=null,ca=null,oc=null,da=null});He();we();en();Po();st();He();le();en();we();var Pe=null,Le=null,je=null,ic=null,Cr=!1,uo=null,br=[],vr=new Map,xr=!1,mp=`
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
`,po=null;function ac(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=mp,e.appendChild(t),Il({onStart:fp,onMove:gp,onEnd:hp}),re(n=>{n.type==="reorderComplete"&&(un(),De())})}function fp(e,t,n){je=n,ic=t,uo={x:e.clientX,y:e.clientY},Cr=!1,xr=!1,br=[],vr=new Map,po=null;let o=q();if(!o)return;Pe=document.createElement("div"),Pe.className="drag-preview";let r=t.getBoundingClientRect();Pe.style.width=`${r.width}px`,Pe.style.height=`${r.height}px`,Pe.innerHTML=t.outerHTML,o.appendChild(Pe),Le=document.createElement("div"),Le.className="drop-indicator",o.appendChild(Le);let i=n.stack[1];if(!i?.filePath){P("Can't reorder this element"),un();return}Ee({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=re(s=>{if(s.type!=="siblingsList")return;a(),br=s.siblings;let l=document.querySelectorAll("*");for(let d of l){if(d.closest("#frameup-root"))continue;let u=J(d);if(!u)continue;let p=u;for(;p;){if(ge(p)){let f=p._debugSource||p._debugOwner?._debugSource;if(f){for(let m of s.siblings)f.lineNumber===m.lineNumber&&f.fileName===i.filePath&&vr.set(m.lineNumber,{el:d,rect:d.getBoundingClientRect()});break}}p=p.return}}xr=!0})}function gp(e){if(!uo)return;let t=Math.abs(e.clientX-uo.x),n=Math.abs(e.clientY-uo.y);if(t<5&&n<5||(Cr=!0,Pe&&(Pe.style.display="block",Pe.style.left=`${e.clientX+10}px`,Pe.style.top=`${e.clientY+10}px`),!xr||!je))return;let o=null,r=1/0,i=0,a=0,s=0;for(let l of br){if(l.lineNumber===je.lineNumber)continue;let d=vr.get(l.lineNumber);if(!d)continue;let u=d.rect,p=u.top+u.height/2,f=Math.abs(e.clientY-p);f<r&&(r=f,o=l,e.clientY<p?i=u.top-2:i=u.bottom+2,a=u.left,s=u.width)}po=o,o&&Le?(Le.style.display="block",Le.style.top=`${i}px`,Le.style.left=`${a}px`,Le.style.width=`${s}px`):Le&&(Le.style.display="none")}function hp(e){if(!Cr||!po||!je){un();return}if(!je.filePath){P("Can't reorder this element"),un();return}Li(`${je.filePath}:${je.lineNumber}`,{op:"reorder",file:je.filePath,fromLine:je.lineNumber,toLine:po.lineNumber}),un()}function un(){Pe?.remove(),Le?.remove(),Pe=null,Le=null,je=null,ic=null,Cr=!1,uo=null,xr=!1,br=[],vr=new Map,po=null}function sc(){un()}we();X();le();var ua="http://www.w3.org/2000/svg",pn=null,ke=null,pa=null;function lc(){let e=q();e&&(pn=document.createElementNS(ua,"svg"),pn.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),ke=document.createElementNS(ua,"g"),ke.setAttribute("class","annotation-root"),pn.appendChild(ke),e.appendChild(pn),window.addEventListener("scroll",Er,{passive:!0}),pa=Fn(Er),Er())}function Er(){if(!ke)return;let{scale:e,offsetX:t,offsetY:n}=ze();ke.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function cc(e,t,n,o,r,i){if(!ke)return null;let a=document.createElementNS(ua,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${c.bgPrimary};
    color: ${c.textPrimary};
    border: 1px solid ${c.border};
    box-shadow: ${O.sm};
    padding: 4px 8px;
    border-radius: ${L.sm};
    font-size: ${r}px;
    font-family: ${x};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),ke.appendChild(a),a}function dc(e){if(!ke)return;let t=ke.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function mo(){ke&&(ke.innerHTML="")}function uc(){window.removeEventListener("scroll",Er),pa?.(),pa=null,pn?.remove(),pn=null,ke=null}Rn();le();we();X();ci();Zo();Gn();Lt();var mn={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',logs:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},pc=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",ma=navigator.platform.includes("Mac")?"Cmd":"Ctrl",ya=[{type:"select",icon:mn.pointer,label:"Select",shortcut:"S"},{type:"text",icon:mn.text,label:"Text",shortcut:"T"}],yp=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    border-radius: ${L.lg};
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
    background: ${c.border};
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
    color: ${c.textSecondary};
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
    background: ${c.bgSecondary};
    color: ${c.textPrimary};
  }
  .tool-btn.active {
    background: ${c.accentSoft};
    color: ${c.accent};
    border-left-color: ${c.accent};
    border-radius: 0 50% 50% 0;
  }
  .tool-btn .tooltip {
    display: none;
    position: absolute;
    left: 44px;
    top: 50%;
    transform: translateY(-50%);
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    box-shadow: ${O.sm};
    color: ${c.textPrimary};
    padding: 4px 8px;
    border-radius: ${L.sm};
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${C.medium};
    z-index: 2147483647;
  }
  .tool-btn .tooltip .shortcut-badge {
    display: inline-block;
    background: ${c.bgSecondary};
    color: ${c.textTertiary};
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
    border-top: 1px solid ${c.border};
    border-bottom: 1px solid ${c.border};
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
    background: ${c.bgSecondary};
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
    color: ${c.textSecondary};
    font-size: 10px;
    font-family: ${x};
    cursor: pointer;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast}, box-shadow ${C.fast};
  }
  .segment.active {
    background: ${c.bgPrimary};
    color: ${c.textPrimary};
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
    color: ${c.textSecondary};
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
    background: ${c.bgSecondary};
    color: ${c.textPrimary};
  }
  .action-btn.active {
    background: ${c.accentSoft};
    color: ${c.accent};
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
    background: ${c.accent};
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
    background: ${c.dangerSoft};
    color: ${c.danger};
  }
  .help-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${c.textTertiary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: ${x};
    transition: background ${C.fast}, color ${C.fast};
  }
  .help-btn:hover {
    background: ${c.bgSecondary};
    color: ${c.textPrimary};
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
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    border-radius: ${L.lg};
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
    color: ${c.textPrimary};
    margin: 0 0 16px 0;
  }
  .shortcuts-section {
    margin-bottom: 14px;
  }
  .shortcuts-section-label {
    font-size: 10px;
    font-weight: 600;
    color: ${c.textTertiary};
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
    color: ${c.textPrimary};
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
    background: ${c.bgSecondary};
    border: 1px solid ${c.border};
    border-radius: 5px;
    font-size: 11px;
    font-family: ${x};
    color: ${c.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${c.textTertiary};
  }
`,ve=null,Re=null,wr=new Map,Ue=null,Ge=null,fo=null,fa=null,ga=null,ha=null;function fc(e){fa=e}function gc(e){ga=e}function hc(e){Ue&&(Ue.disabled=!e)}function mc(){if(!Ge||!fo)return;let e=Xi();Ge.classList.toggle("active",io()),fo.classList.toggle("hidden",e===0),fo.textContent=String(e)}function yc(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=yp,e.appendChild(t),ve=document.createElement("div"),ve.className="tools-panel";let n=[["select","text"]];for(let s=0;s<n.length;s++){if(s>0){let l=document.createElement("div");l.className="tool-divider",ve.appendChild(l)}for(let l of n[s]){let d=ya.find(f=>f.type===l),u=document.createElement("button");u.className=`tool-btn${d.type==="select"?" active":""}`,u.innerHTML=`${d.icon}<span class="tooltip">${d.label}<span class="shortcut-badge">${pc}${d.shortcut}</span></span>`,u.addEventListener("click",()=>_o(d.type));let p=null;u.addEventListener("mouseenter",()=>{p=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{p&&clearTimeout(p),u.classList.remove("tooltip-visible")}),ve.appendChild(u),wr.set(d.type,u)}}Re=document.createElement("div"),Re.className="sub-options hidden",ve.appendChild(Re);let o=document.createElement("div");o.className="tool-divider",ve.appendChild(o),Ue=document.createElement("button"),Ue.className="action-btn",Ue.innerHTML=mn.undo,Ue.title="Undo (Ctrl+Z)",Ue.disabled=!0,Ue.addEventListener("click",()=>{ga&&ga()}),ve.appendChild(Ue),Ge=document.createElement("button"),Ge.className="action-btn has-badge",Ge.innerHTML=`${mn.logs}<span class="action-badge hidden">0</span>`,Ge.title="Logs",Ge.addEventListener("click",()=>{ao(!io())}),fo=Ge.querySelector(".action-badge"),ve.appendChild(Ge);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=mn.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{fa&&fa()}),ve.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=mn.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{dl(),i.style.color=cl()?c.accent:""}),ve.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${pc}/)`,a.addEventListener("click",()=>vc()),ve.appendChild(a),e.appendChild(ve),document.addEventListener("keydown",bc,!0),ha=Ki(mc),mc()}function bc(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||Qe()||e.ctrlKey||e.metaKey||e.altKey)return;let n=e.key.toUpperCase();if(e.key==="?"){vc(),e.preventDefault();return}let o=ya.find(r=>r.shortcut===n);o&&(_o(o.type),e.preventDefault())}var Ye=null,go=null;function vc(){Ye?Tr():bp()}function bp(){let e=q();if(!e||Ye)return;Ye=document.createElement("div"),Ye.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:ya.map(r=>({action:r.label,keys:[r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[ma,"Z"]},{action:"Toggle Logs",keys:[ma,"Shift","L"]},{action:"Keyboard Shortcuts",keys:["?"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Space","Drag"]},{action:"Zoom",keys:[ma,"Scroll"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let l=document.createElement("div");l.className="shortcut-row";let d=document.createElement("span");d.className="shortcut-action",d.textContent=s.action,l.appendChild(d);let u=document.createElement("span");u.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let m=document.createElement("span");m.className="shortcut-plus",m.textContent="+",u.appendChild(m)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=s.keys[p],u.appendChild(f)}l.appendChild(u),i.appendChild(l)}t.appendChild(i)}Ye.appendChild(t),Ye.addEventListener("click",r=>{r.target===Ye&&Tr()}),e.appendChild(Ye),go=r=>{Tr()},document.addEventListener("keydown",go,!0)}function Tr(){go&&(document.removeEventListener("keydown",go,!0),go=null),Ye?.remove(),Ye=null}function xc(e){for(let[t,n]of wr)n.classList.toggle("active",t===e);vp(e)}function vp(e){if(Re&&(Re.innerHTML="",Re.classList.add("hidden"),Re.classList.remove("visible"),e==="text")){Re.classList.remove("hidden"),requestAnimationFrame(()=>Re?.classList.add("visible"));let t=Yt(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();Ro({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Fo("textColor",i),n.style.background=i},onClose(){}})}),Re.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Fo("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}Re.appendChild(o)}}function Cc(e){let t=wr.get(e);t&&(t.style.backgroundColor=c.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function Ec(){document.removeEventListener("keydown",bc,!0),ha?.(),ha=null,Tr(),ve?.remove(),ve=null,Re=null,Ue=null,Ge=null,fo=null,wr.clear()}Yn();Di();Ct();Ri();le();Ii();le();st();vt();wn();Ct();Yn();Pn();He();async function Tc(e,t){let n=At(e,t);if(!n)return null;let o=J(n);if(!o)return null;let r=null;try{let i=await Ae(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||qe(s))continue;let l=Xe(a.fileName);if(!(!l||Vt(l)||Vt(a.fileName||""))){r={componentName:s,filePath:l,lineNumber:a.lineNumber??0,columnNumber:a.columnNumber??0};break}}}catch{}if(!r){let i=o;for(;i;){if(ge(i)){let a=ae(i.type);if(a&&a[0]===a[0].toUpperCase()&&!qe(a)){let s=i._debugSource||i._debugOwner?._debugSource;r={componentName:a,filePath:s?.fileName||"",lineNumber:s?.lineNumber||0,columnNumber:s?.columnNumber??0};break}}i=i.return}}if(r&&!r.filePath&&r.componentName){let i=dt(r.componentName);if(i===void 0){let a=await ft(r.componentName);ut(r.componentName,a),a&&(r.filePath=a)}else i&&(r.filePath=i)}return r}X();var ce=null,It=null,Sr=null,Sc={onMouseDown(e){if(ce){wc();return}let t=Kt(e.clientX,e.clientY);It={pageX:t.x,pageY:t.y},Tc(e.clientX,e.clientY).then(n=>{Sr=n}),ce=document.createElement("input"),ce.type="text",ce.placeholder="Type annotation...",ce.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${c.bgPrimary};
      color: ${c.textPrimary};
      border: 1.5px solid ${c.accent};
      border-radius: ${L.sm};
      padding: 4px 8px;
      font-size: ${Yt().fontSize}px;
      font-family: ${x};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${c.accentSoft};
    `,ce.setAttribute("data-frameup-overlay","true"),ce.addEventListener("keydown",n=>{n.key==="Enter"&&(wc(),n.preventDefault()),n.key==="Escape"&&(Nc(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(ce),ce.focus()},onMouseMove(){},onMouseUp(){}};function wc(){if(!ce||!It)return;let e=ce.value.trim();if(ce.remove(),ce=null,!e)return;let t=Yt(),n=crypto.randomUUID();cc(n,It.pageX,It.pageY,e,t.fontSize,t.textColor),xi({type:"text",id:n,position:It,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:Sr}),It=null,Sr=null}function Nc(){ce&&(ce.remove(),ce=null),It=null,Sr=null}function Mc(){Nc()}Gn();Zo();X();Lt();var Dt=null,ho=null;function Lc(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function xp(e){let t=q();if(!t)return;Dt&&Dt.parentNode&&Dt.parentNode.removeChild(Dt),ho&&clearTimeout(ho);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${x}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${L.sm}`,`box-shadow: ${O.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${C.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${x}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${L.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),ho&&clearTimeout(ho),Dt=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),Dt=n,requestAnimationFrame(()=>{n.style.opacity="1"}),ho=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),Dt=null},8e3)}function ba(e){console.error("[FrameUp]",e),xp("FrameUp encountered an error. Your app is unaffected.")}function Cp(){window.addEventListener("error",e=>{Lc(e.error??e.message)&&(ba(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{Lc(e.reason)&&(ba(e.reason),e.preventDefault())})}var va=null;function Pc(e,t,n){t.originalCssText=n.style.cssText,t.element=n,pt(t)}function Ep(){if(window!==window.top)return;let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;yr(e),ta(Tp);let t=q();t&&(Xs(t),Wl(t)),Dl(),as(),ac(),lc(),Ei(r=>dc(r)),va=new MutationObserver(()=>{for(let[r,i]of yi())document.contains(i.element)||setTimeout(()=>{let a=Gt(i.identity);if(a){Pc(r,i,a);return}Oo(i.identity).then(s=>{s?Pc(r,i,s):(Vo(r),P(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),va.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("keydown",r=>{(r.metaKey||r.ctrlKey)&&r.shiftKey&&r.key==="l"&&(r.preventDefault(),ao(!io()))}),yc(),ul(),El(),Bs(),Cl("text",Sc),gi((r,i)=>{Vn(),Cc(r),i==="text"&&Mc(),Jt(),Qr(),Fl(r==="select"),er(r),xc(r)}),hi(()=>{ht(St()),hc(Ni())}),gc(()=>{let r=Bo();r&&P(`Undo: ${r}`)});let n=!1,o=0;oa(()=>{if(n){P("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);P(`Please wait ${a}s before retrying`);return}if(!St()){P("Nothing to confirm \u2014 make some visual changes first");return}let i=Pi();if(console.log("[FrameUp] batchOps:",i.length,i.map(a=>`${a.op}@${a.file}`),"hasTextAnns:",Xt()),i.length>0&&(n=!0,ht(!1),P(`Applying ${i.length} change${i.length!==1?"s":""}...`),Ee({type:"commitBatch",operations:i})),Xt()){let a=ki();n=!0,ht(!1),P("Generating from annotations..."),Ee({type:"generate",annotations:a})}i.length===0&&!Xt()&&P("Could not resolve source files for these changes \u2014 try re-selecting")}),re(r=>{if(r.type==="commitBatchComplete"){if(!n)return;Xt()||(n=!1,ht(St()));let i=r.results?.filter(l=>l.success).length??0,a=r.results?.length??0,s=r.undoIds??[];r.success?(he({type:"commitBatch",componentName:"Batch Apply",filePath:"",summary:`${i}/${a} changes applied`,state:"active",revertData:{type:"batchApplyUndo",undoIds:s}}),P(`Applied ${i}/${a} changes`),De(),mo(),wt()):i>0?(he({type:"commitBatch",componentName:"Batch Apply",filePath:"",summary:`${i}/${a} changes applied (${a-i} failed)`,state:"active",revertData:{type:"batchApplyUndo",undoIds:s}}),P(`Applied ${i}/${a} \u2014 ${a-i} failed`),De(),mo(),wt()):(P(`Error: ${r.error||"Batch apply failed"}`),o=Date.now()+5e3,n=!1,ht(St()))}}),re(r=>{if(r.type==="generateProgress"&&P(r.message),r.type==="generateComplete")if(n=!1,ht(St()),r.success){let i=r.changes.length;he({type:"generate",componentName:"AI Generate",filePath:r.changes[0]?.filePath||"",summary:`${i} file${i!==1?"s":""} changed`,state:"active",revertData:{type:"generateUndo",undoIds:r.undoIds||[]}});let a=r.changes.map(s=>s.description||s.filePath).join(", ");P(`Applied: ${a}`),De(),mo(),wt()}else P(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),ra(()=>{let r=Bo();return r?(P(`Undo: ${r}`),!0):!1}),fc(()=>{De(),mo(),wt(),ll(),updateEyeButton(!0),P("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function Tp(){Jt(),Qr(),_l(),ds(),sc(),Qs(),uc(),va?.disconnect(),Ec(),jl(),pl(),Nl(),wt(),zi(),rc(),na()}function kc(){try{Ep(),Cp()}catch(e){ba(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",kc):kc();})();
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
