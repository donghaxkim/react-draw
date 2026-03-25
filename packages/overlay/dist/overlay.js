"use strict";var FrameUp=(()=>{var Mc=Object.defineProperty;var S=(e,t)=>()=>(e&&(t=e(e=0)),t);var va=(e,t)=>{for(var n in t)Mc(e,n,{get:t[n],enumerable:!0})};function Lc(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),l=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+l).toString(16).slice(1)}`}return e}function kc(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(E=>{try{return Array.from(E.cssRules)}catch{return[]}}).filter(E=>E instanceof CSSStyleRule&&E.selectorText===":root").flatMap(E=>Array.from(E.style)).filter(E=>E.startsWith("--")),n={},o={},r={},i={},a={},l={},c={},d={},u={},m={},f={},p={},h={},y={},k={},M={},V={},F={},U=(E,O,pe,me)=>{E[pe]=me,O[me]=pe};for(let E of t){let O=e.getPropertyValue(E).trim();if(!O)continue;let pe=E.match(/^--spacing-(.+)$/);if(pe){U(n,m,pe[1],O);continue}let me=E.match(/^--color-(.+)$/);if(me){let go=me[1];o[go]=O,f[Lc(O)]=go;continue}let A=E.match(/^--font-size-(.+)$/);if(A){U(r,p,A[1],O);continue}let K=E.match(/^--font-weight-(.+)$/);if(K){U(i,h,K[1],O);continue}let b=E.match(/^--radius-(.+)$/);if(b){U(a,y,b[1],O);continue}let T=E.match(/^--border-(.+)$/);if(T){U(l,k,T[1],O);continue}let W=E.match(/^--opacity-(.+)$/);if(W){U(c,M,W[1],O);continue}let ee=E.match(/^--tracking-(.+)$/);if(ee){U(d,V,ee[1],O);continue}let te=E.match(/^--leading-(.+)$/);if(te){U(u,F,te[1],O);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:l,opacity:c,letterSpacing:d,lineHeight:u,spacingReverse:m,colorsReverse:f,fontSizeReverse:p,fontWeightReverse:h,borderRadiusReverse:y,borderWidthReverse:k,opacityReverse:M,letterSpacingReverse:V,lineHeightReverse:F}}function Rc(e,t){let n={};for(let o of Pc){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function yo(e,t){return t.get(e)??null}function xa(e,t,n){let r=(n??hn())[e],i=[];for(let[l,c]of r.entries()){let d=parseFloat(c);isNaN(d)||i.push({numericValue:d,token:l,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((l,c)=>l.numericValue-c.numericValue),i}function Ea(e){Ca=e,gn=null}function hn(){if(gn!==null)return gn;let e=kc();return gn=Rc(e,Ca??{}),gn}var Pc,Ca,gn,yn=S(()=>{"use strict";Pc=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];Ca=null,gn=null});function wa(e){Ta=e}function qe(){return Ta}var Ta,It=S(()=>{"use strict";Ta=!1});var s,H,L,C,x,Sa,X=S(()=>{"use strict";s={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},H={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},L={xs:"4px",sm:"6px",md:"10px",lg:"14px"},C={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},x="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Sa=`
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
`});var Er,Cn,Na,Ac,bn,La,vo,ka,Ma,vn,bo,st,Tr,xn,wr,Dt,Sr,xo,En=S(()=>{"use strict";Er="0.5.32",Cn=`bippy-${Er}`,Na=Object.defineProperty,Ac=Object.prototype.hasOwnProperty,bn=()=>{},La=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},vo=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),ka=!1,vn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>ka?!0:(e&&typeof e.inject=="function"&&(Ma=e.inject.toString()),!!Ma?.includes("(injected)")),bo=new Set,st=new Set,Tr=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Cn,checkDCE:La,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),st.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,bo.forEach(a=>a())),i},on:bn,onCommitFiberRoot:bn,onCommitFiberUnmount:bn,onPostCommitFiberRoot:bn,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Na(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let l=o.renderers;o=a,l.size>0&&(l.forEach((c,d)=>{st.add(c),a.renderers.set(d,c)}),xn(e))}}});let r=window.hasOwnProperty,i=!1;Na(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{xn(e)}return o},xn=e=>{e&&bo.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=La,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Cn,t._instrumentationIsActive=!1;let n=vo(t);if(n||(t.on=bn),t.renderers.size){t._instrumentationIsActive=!0,bo.forEach(i=>i());return}let o=t.inject,r=vn(t);r&&!n&&(ka=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return st.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,bo.forEach(l=>l()),a}}(t.renderers.size||t._instrumentationIsActive||vn())&&e?.()}catch{}},wr=()=>Ac.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),Dt=e=>wr()?(xn(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Tr(e),Sr=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),xo=()=>{try{Sr()&&Dt()}catch{}}});var Pa=S(()=>{"use strict";En();xo()});function _r(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Vr(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Fr(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var Nr,Mr,Lr,kr,Pr,Rr,Ar,$r,Or,Hr,Ir,Dr,fe,Fr,Vr,zr,ae,Br,Wr,ne,$c,jr=S(()=>{"use strict";En();Nr=0,Mr=1,Lr=5,kr=11,Pr=13,Rr=15,Ar=16,$r=19,Or=26,Hr=27,Ir=28,Dr=30,fe=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};Fr=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Fr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Vr=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Vr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},zr=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?zr(t.type||t.render):null},ae=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=zr(t);return o&&(o.displayName||o.name)||null},Br=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||vo(e)||vn(e)},Wr=e=>{let t=Dt(e.onActive);t._instrumentationSource=e.name??Cn;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,l,c)=>{n!==i&&(n?.(a,l,c),e.onCommitFiberRoot?.(a,l,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,l)=>{t.onCommitFiberUnmount===i&&(o?.(a,l),e.onCommitFiberUnmount?.(a,l))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,l)=>{t.onPostCommitFiberRoot===i&&(r?.(a,l),e.onPostCommitFiberRoot?.(a,l))};t.onPostCommitFiberRoot=i}return t},ne=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},$c=Error()});var bt=S(()=>{"use strict";En();Pa();jr();});function Tn(e,t){let n=0,o=0,r=0;do r=Ga[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function Ha(e,t){return e.pos>=t?!1:e.peek()!==Vc}function Ua(e){let{length:t}=e,n=new Bc(e),o=[],r=0,i=0,a=0,l=0,c=0;do{let d=n.indexOf(";"),u=[],m=!0,f=0;for(r=0;n.pos<d;){let p;r=Tn(n,r),r<f&&(m=!1),f=r,Ha(n,d)?(i=Tn(n,i),a=Tn(n,a),l=Tn(n,l),Ha(n,d)?(c=Tn(n,c),p=[r,i,a,l,c]):p=[r,i,a,l]):p=[r],u.push(p),n.pos++}m||Wc(u),o.push(u),n.pos=d+1}while(n.pos<=t);return o}function Wc(e){e.sort(jc)}function jc(e,t){return e[0]-t[0]}var Ra,Oc,Hc,Va,Ic,Dc,za,_c,Ba,Fc,Wa,ja,Yr,Aa,$a,Vc,Oa,zc,Ga,Bc,Ya,Gc,Uc,Ka,wn,Co,Yc,Ia,Kc,Xc,qc,Zc,Da,Jc,Qc,ed,td,nd,_a,Ze,od,Gr,Ur,rd,id,ad,ld,sd,cd,dd,ud,$e,Fa,pd,md,Kr,Xr,vt=S(()=>{"use strict";En();jr();Ra=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Oc=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Hc=["<anonymous>","eval",""],Va=/\.(jsx|tsx|ts|js)$/,Ic=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Dc=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,za="(at Server)",_c=/(^|@)\S+:\d+/,Ba=/^\s*at .*(\S+:\d+|\(native\))/m,Fc=/^(eval@)?(\[native code\])?$/,Wa=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=Aa(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(_c)){let i=$a(r,void 0)[0];i&&o.push(i)}return Yr(o,t)}return e.match(Ba)?Aa(e,t):$a(e,t)},ja=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},Yr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,Aa=(e,t)=>Yr(e.split(`
`).filter(n=>!!n.match(Ba)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=ja(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),$a=(e,t)=>Yr(e.split(`
`).filter(n=>!n.match(Fc)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,l=ja(o.replace(r,""));return{functionName:a,fileName:l[0],lineNumber:l[1]?+l[1]:void 0,columnNumber:l[2]?+l[2]:void 0,source:o}}}),Vc=44,Oa="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",zc=new Uint8Array(64),Ga=new Uint8Array(128);for(let e=0;e<Oa.length;e++){let t=Oa.charCodeAt(e);zc[e]=t,Ga[t]=e}Bc=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};Ya=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Gc=/^data:application\/json[^,]+base64,/,Uc=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Ka=typeof WeakRef<"u",wn=new Map,Co=new Map,Yc=e=>Ka&&e instanceof WeakRef,Ia=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,l,c]=i;if(a===void 0||l===void 0||c===void 0)return null;let d=t[a];return d?{columnNumber:c,fileName:d,lineNumber:l+1}:null},Kc=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return Ia(o.map.mappings,o.map.sources,r,i)}return Ia(e.mappings,e.sources,t-1,n)},Xc=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Uc);a&&(o=a[1]||a[2])}if(!o)return null;let r=Ya.test(o);if(!(Gc.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},qc=e=>({file:e.file,mappings:Ua(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Zc=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Ua(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Da=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Ya);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},Jc=async(e,t=fetch)=>{if(!Da(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Xc(e,n);if(!o||!Da(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Zc(i):qc(i)}catch{return null}},Qc=async(e,t=!0,n)=>{if(t&&wn.has(e)){let i=wn.get(e);if(i==null)return null;if(Yc(i)){let a=i.deref();if(a)return a;wn.delete(e)}else return i}if(t&&Co.has(e))return Co.get(e);let o=Jc(e,n);t&&Co.set(e,o);let r=await o;return t&&Co.delete(e),t&&(r===null?wn.set(e,null):wn.set(e,Ka?new WeakRef(r):r)),r},ed=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await Qc(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Kc(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),td=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",nd=()=>{let e=Dt();for(let t of[...Array.from(st),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},_a=e=>{for(let t of st){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Ze=e=>`
    in ${e}`,od=(e,t)=>{let n=Ze(e);return t&&(n+=` (at ${t})`),n},Gr=!1,Ur=(e,t)=>{if(!e||Gr)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Gr=!0;let o=nd();_a(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let l={DetermineComponentFrameRoot(){let u;try{if(t){let m=function(){throw Error()};if(Object.defineProperty(m.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(m,[])}catch(f){u=f}Reflect.construct(e,[],m)}else{try{m.call()}catch(f){u=f}e.call(m.prototype)}}else{try{throw Error()}catch(f){u=f}let m=e();m&&typeof m.catch=="function"&&m.catch(()=>{})}}catch(m){if(m instanceof Error&&u instanceof Error&&typeof m.stack=="string")return[m.stack,u.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,d]=l.DetermineComponentFrameRoot();if(c&&d){let u=c.split(`
`),m=d.split(`
`),f=0,p=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;p<m.length&&!m[p].includes("DetermineComponentFrameRoot");)p++;if(f===u.length||p===m.length)for(f=u.length-1,p=m.length-1;f>=1&&p>=0&&u[f]!==m[p];)p--;for(;f>=1&&p>=0;f--,p--)if(u[f]!==m[p]){if(f!==1||p!==1)do if(f--,p--,p<0||u[f]!==m[p]){let h=`
${u[f].replace(" at new "," at ")}`,y=ae(e);return y&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",y)),h}while(f>=1&&p>=0);break}}}finally{Gr=!1,Error.prepareStackTrace=n,_a(o),console.error=r,console.warn=i}let a=e?ae(e):"";return a?Ze(a):""},rd=(e,t)=>{let n=e.tag,o="";switch(n){case Ir:o=Ze("Activity");break;case Mr:o=Ur(e.type,!0);break;case kr:o=Ur(e.type.render,!1);break;case Nr:case Rr:o=Ur(e.type,!1);break;case Lr:case Or:case Hr:o=Ze(e.type);break;case Ar:o=Ze("Lazy");break;case Pr:o=e.child!==t&&t!==null?Ze("Suspense Fallback"):Ze("Suspense");break;case $r:o=Ze("SuspenseList");break;case Dr:o=Ze("ViewTransition");break;default:return""}return o},id=e=>{try{let t="",n=e,o=null;do{t+=rd(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=od(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},ad=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},ld=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),sd=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,cd=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!ld(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>sd(a,o))||(i.push(o),t.set(r,i))}return t},dd=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(za,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},ud=e=>{let t=[];return _r(e,n=>{if(!td(n))return;let o=typeof n.type=="string"?n.type:ae(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Wa(ad(n._debugStack?.stack))})},!0),t},$e=async(e,t=!0,n)=>{let o=ud(e),r=Wa(id(e)),i=cd(o),a=new Map;return ed(r.map(l=>l.source?.includes(za)??!1?dd(l,i,a):l).filter((l,c,d)=>{if(c===0)return!0;let u=d[c-1];return l.functionName!==u.functionName}),t,n)},Fa=e=>e.split("/").filter(Boolean).length,pd=e=>e.split("/").filter(Boolean)[0]??null,md=e=>{let t=e.indexOf("/",1);if(t===-1||Fa(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!Va.test(n)||Fa(n)<2)return e;let o=pd(n);return!o||o.startsWith("@")||o.length>4?e:n},Kr=e=>{if(!e||Hc.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=md(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),l=i.indexOf(":");t=a!==-1&&(l===-1||a<l)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of Oc)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(Ra.test(t)){let i=t.match(Ra);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Dc.test(i)&&(t=t.slice(0,r))}return t},Xr=e=>{let t=Kr(e);return!(!t||!Va.test(t)||Ic.test(t))}});function hd(e){if(!e)return"";let t=e;for(let o of fd)if(t.startsWith(o)){t=t.slice(o.length);break}let n=t.match(/\/_next\/static\/chunks\/(?:app\/)?(.+)/);n&&(t=n[1]);for(let o of gd)t=t.replace(o,"");return t.startsWith("/")&&!t.startsWith("./")&&(t=t.slice(1)),t.startsWith("./")&&(t=t.slice(2)),t}function Oe(e){if(!e)return"";let t=Kr(e);if(t&&Xr(t))return t;let n=hd(e);return n&&Xr(n)||n&&/\.(tsx?|jsx?|mjs)$/.test(n)&&!n.includes("node_modules")&&!n.startsWith("../")&&!n.includes("/dist/")&&!n.includes("/build/")?n:""}var fd,gd,_t=S(()=>{"use strict";vt();fd=["webpack-internal:///(app-pages-browser)/./","webpack-internal:///(ssr)/./","webpack-internal:///(rsc)/./","webpack-internal:///./","webpack-internal:///","webpack:///(app-pages-browser)/./","webpack:///./","webpack:///","/@fs/","file:///","file://"],gd=[/\?[a-f0-9]+$/,/\?v=\d+$/,/\?t=\d+$/,/\?import$/]});function Je(e){return!!(yd.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function qr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function Zr(){Sn=new WeakMap}function Cd(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Ed(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=vd}function Td(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<Eo||o.height/window.innerHeight<Eo)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>xd}function xt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&qr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=Sn.get(e);if(o&&n-o.timestamp<bd)return o.isValid;let r=window.getComputedStyle(e);return Cd(e,r)?e.clientWidth/window.innerWidth>=Eo&&e.clientHeight/window.innerHeight>=Eo&&(Ed(r)||Td(e,r))?(Sn.set(e,{isValid:!1,timestamp:n}),!1):(Sn.set(e,{isValid:!0,timestamp:n}),!0):(Sn.set(e,{isValid:!1,timestamp:n}),!1)}var yd,bd,Eo,vd,xd,Sn,Ct=S(()=>{"use strict";yd=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);bd=50,Eo=.9,vd=2147483600,xd=1e3,Sn=new WeakMap});function Ft(e,t,n){return Math.min(n,Math.max(t,e))}function Sd(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,l=o+e.width/2,c=r+e.height/2,d=Ft(Math.ceil(e.width/Xa),To,wo),u=Ft(Math.ceil(e.height/Xa),To,wo);if(d*u>qa){let h=Math.sqrt(qa/(d*u));d=Ft(Math.floor(d*h),To,wo),u=Ft(Math.floor(u*h),To,wo)}let m=new Set,f=[],p=(h,y)=>{let k=Ft(Math.round(h),0,t-1),M=Ft(Math.round(y),0,n-1),V=`${k}:${M}`;m.has(V)||(m.add(V),f.push({x:k,y:M}))};p(o+Me,r+Me),p(i-Me,r+Me),p(o+Me,a-Me),p(i-Me,a-Me),p(l,r+Me),p(l,a-Me),p(o+Me,c),p(i-Me,c),p(l,c);for(let h=0;h<d;h++){let y=o+(h+.5)/d*e.width;for(let k=0;k<u;k++)p(y,r+(k+.5)/u*e.height)}return f}function Za(e,t=xt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Sd(e);for(let c of i)for(let d of document.elementsFromPoint(c.x,c.y))r.add(d);let a=[];for(let c of r){if(!t(c))continue;let d=c.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;let u={left:d.left,top:d.top,right:d.left+d.width,bottom:d.top+d.height};if(n){let m=Math.max(o.left,u.left),f=Math.max(o.top,u.top),p=Math.min(o.right,u.right),h=Math.min(o.bottom,u.bottom),y=Math.max(0,p-m)*Math.max(0,h-f),k=d.width*d.height;k>0&&y/k>=wd&&a.push(c)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(c)}let l=a.filter(c=>!a.some(d=>d!==c&&d.contains(c)));return l.sort((c,d)=>{let u=c.compareDocumentPosition(d);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),l}var wd,Xa,To,wo,qa,Me,Ja=S(()=>{"use strict";Ct();wd=.75,Xa=32,To=3,wo=20,qa=100,Me=1});function Vt(e,t,n){return e+(t-e)*n}var Qa=S(()=>{"use strict"});function rl(){let e=q();e&&(oe=document.createElement("canvas"),oe.setAttribute("data-frameup-overlay","true"),oe.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(oe),oi(),window.addEventListener("resize",oi))}function No(e,t=4){if(!e){le&&(le.targetOpacity=0,Qe());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!le||!le.initialized?le=ai(n,t):(le.target=n,le.borderRadius=t,le.targetOpacity=1),Qe()}function Et(e,t=4){if(!e){j&&(j.targetOpacity=0,Qe());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!j||!j.initialized?j=ai(n,t):(j.target=n,j.borderRadius=t,j.targetOpacity=1),Qe()}function il(e){ct=e,Qe()}function ri(){ct=null,Qe()}function al(e){for(j=null;Y.length>e.length;)Y.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<Y.length?(Y[t].target=o,Y[t].borderRadius=n.borderRadius,Y[t].targetOpacity=1):Y.push(ai(o,n.borderRadius))}Qe()}function Mn(){Y=[],Qe()}function ii(e,t){if(!ni)return null;let n=cl();if(!n)return null;let o=pl(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=nl*nl)return r.corner}return null}function ll(){return cl()}function sl(){Bt!==null&&cancelAnimationFrame(Bt),window.removeEventListener("resize",oi),oe?.remove(),oe=null,P=null,le=null,j=null,Y=[],ct=null}function cl(){if(Y.length>1)return dl(Y);if(j&&j.opacity>=.5){let{x:e,y:t,w:n,h:o}=j.current;return{x:e,y:t,w:n,h:o}}if(Y.length===1){let{x:e,y:t,w:n,h:o}=Y[0].current;return{x:e,y:t,w:n,h:o}}return null}function dl(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:l,w:c,h:d}=i.current;a<t&&(t=a),l<n&&(n=l),a+c>o&&(o=a+c),l+d>r&&(r=l+d)}return{x:t,y:n,w:o-t,h:r-n}}function ai(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function oi(){oe&&(Nn=Math.max(window.devicePixelRatio||1,Md),Jr=window.innerWidth,Qr=window.innerHeight,oe.width=Jr*Nn,oe.height=Qr*Nn,oe.style.width=`${Jr}px`,oe.style.height=`${Qr}px`,P=oe.getContext("2d"),Qe())}function Qe(){Bt===null&&(Bt=requestAnimationFrame(ul))}function ul(){if(Bt=null,!P||!oe)return;let e=!1;le?.initialized&&(ei(le,Nd)&&(e=!0),le.opacity<.01&&le.targetOpacity===0&&(le=null)),j?.initialized&&(ei(j,el)&&(e=!0),j.opacity<.01&&j.targetOpacity===0&&(j=null));for(let t=Y.length-1;t>=0;t--){let n=Y[t];n.initialized&&ei(n,el)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&Y.splice(t,1)}if(P.setTransform(1,0,0,1,0,0),P.clearRect(0,0,oe.width,oe.height),P.setTransform(Nn,0,0,Nn,0,0),le&&ti(P,le,zt,Ld),j&&(ti(P,j,zt,tl),ni&&ol(P,j.current,j.opacity)),ct){if(P.save(),P.globalAlpha=.6,P.strokeStyle=zt,P.lineWidth=1,P.setLineDash([4,4]),ct.verticalLine){let{x:t}=ct.verticalLine;P.beginPath(),P.moveTo(t,0),P.lineTo(t,oe.height),P.stroke()}if(ct.horizontalLine){let{y:t}=ct.horizontalLine;P.beginPath(),P.moveTo(0,t),P.lineTo(oe.width,t),P.stroke()}P.restore()}if(Y.length>0){for(let t of Y)ti(P,t,zt,tl);if(ni&&Y.length>0){let t=dl(Y);t&&t.w>=24&&t.h>=24&&(Y.length>1&&(P.globalAlpha=.6,P.beginPath(),P.rect(t.x,t.y,t.w,t.h),P.strokeStyle=zt,P.lineWidth=1,P.setLineDash([4,4]),P.stroke(),P.setLineDash([]),P.globalAlpha=1),ol(P,t,1))}}e&&(Bt=requestAnimationFrame(ul))}function ei(e,t){let n=e.current,o=e.target,r=Vt(n.x,o.x,t),i=Vt(n.y,o.y,t),a=Vt(n.w,o.w,t),l=Vt(n.h,o.h,t),c=Vt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<So&&Math.abs(i-o.y)<So&&Math.abs(a-o.w)<So&&Math.abs(l-o.h)<So&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=l,e.opacity=c,!0)}function ti(e,t,n,o){let{x:r,y:i,w:a,h:l}=t.current;if(a<=0||l<=0)return;let c=Math.min(t.borderRadius,a/2,l/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,l,c):e.rect(r,i,a,l),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function pl(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function ol(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=pl(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,kd,0,Math.PI*2),e.fillStyle=Pd,e.fill(),e.strokeStyle=Rd,e.lineWidth=Ad,e.stroke();e.globalAlpha=1}var Nd,el,So,Md,oe,P,Jr,Qr,Nn,Bt,le,j,Y,zt,Ld,tl,kd,nl,Pd,Rd,Ad,ni,ct,Mo=S(()=>{"use strict";we();Qa();X();Nd=.35,el=.3,So=.5,Md=2,oe=null,P=null,Jr=0,Qr=0,Nn=1,Bt=null,le=null,j=null,Y=[],zt=s.accent,Ld="rgba(162,89,255,0.08)",tl="rgba(162,89,255,0.15)",kd=4,nl=10,Pd="#ffffff",Rd=zt,Ad=1.5,ni=!0,ct=null});var $d,Od,Hd,Id,Dd,Ve,ml=S(()=>{"use strict";$d=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Od=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Hd=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Id=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Dd=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Ve=[...$d,...Od,...Hd,...Id,...Dd]});function fl(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let l=document.createElement("input");l.type="text",l.className="prop-input",l.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,a.appendChild(l),a.appendChild(c);let d=new Map(t);function u(){return d.get(r.key)??r.defaultValue}function m(f){let p=parseFloat(f);l.value=isNaN(p)?f:String(p);try{let y=xa(i,f).find(k=>k.cssValue===f);y?.token?c.textContent=`${r.tailwindPrefix}-${y.token}`:c.textContent=""}catch{c.textContent=""}}return l.addEventListener("blur",()=>{let f=l.value.trim(),p=parseFloat(f);if(isNaN(p))_d.has(f)?(d.set(r.key,f),m(f),n(r.key,f),o()):m(u());else{let y=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${p}px`;d.set(r.key,y),m(y),n(r.key,y),o()}}),l.addEventListener("keydown",f=>{f.key==="Enter"?l.blur():f.key==="Escape"&&(m(u()),l.blur())}),m(u()),{element:a,setValue(f,p){f===r.key&&(d.set(f,p),m(p))},destroy(){}}}var _d,gl=S(()=>{"use strict";yn();X();_d=new Set(["auto","none","normal","inherit","initial"])});function hl(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${s.bgTertiary};
    border-radius:${L.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let l=t.get(r.key)??r.defaultValue,c=[];function d(u){l=u;for(let{btn:m,value:f,opt:p}of c){let h=f===u;m.style.background=h?s.accent:"transparent",m.style.color=h?s.textOnAccent:s.textSecondary,m.title=h&&p.tailwindValue?`${p.label} (${p.tailwindValue})`:p.label}}for(let u of i){let m=document.createElement("button");m.style.cssText=`
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
      color:${s.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),m.textContent=u.icon??u.label,m.title=u.label,m.addEventListener("click",()=>{d(u.value),n(r.key,u.value),o()}),c.push({btn:m,value:u.value,opt:u}),a.appendChild(m)}return d(l),{element:a,setValue(u,m){u===r.key&&d(m)},destroy(){}}}var yl=S(()=>{"use strict";X()});function Ln(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,l=0;a!==0&&(r===t?l=((n-o)/a+(n<o?6:0))*60:r===n?l=((o-t)/a+2)*60:l=((t-n)/a+4)*60);let c=r===0?0:a/r*100,d=r*100;return{h:l,s:c,v:d}}function Lo(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),l=o*(1-i*n),c=o*(1-(1-i)*n),d,u,m;switch(r%6){case 0:d=o,u=c,m=a;break;case 1:d=l,u=o,m=a;break;case 2:d=a,u=o,m=c;break;case 3:d=a,u=l,m=o;break;case 4:d=c,u=a,m=o;break;case 5:d=o,u=a,m=l;break;default:d=0,u=0,m=0}let f=p=>Math.round(p*255).toString(16).padStart(2,"0");return`#${f(d)}${f(u)}${f(m)}`}var bl=S(()=>{"use strict"});function ko(e){Wt();let t=q();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${H.lg};
    border-radius: ${L.md};
    font-family: ${x};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let b=n.getBoundingClientRect();b.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-b.height-8}px`),n.style.opacity="1"});let o=Ln(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=Fd(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),l=document.createElement("div");l.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${H.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(l),n.appendChild(c);function d(){let b=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${b}, 0%, 100%)`),T.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let W=a.createLinearGradient(0,0,0,120);W.addColorStop(0,"rgba(0,0,0,0)"),W.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=W,a.fillRect(0,0,176,120);let ee=o.s/100*176,te=(1-o.v/100)*120;l.style.left=`${ee}px`,l.style.top=`${te}px`}let u=!1;i.addEventListener("mousedown",b=>{u=!0,m(b)});function m(b){let T=i.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left)),ee=Math.max(0,Math.min(120,b.clientY-T.top));o.s=W/176*100,o.v=(1-ee/120)*100,d(),O()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let p=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${H.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(f),y.appendChild(h),n.appendChild(y);function k(){let b=p.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)b.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);p.fillStyle=b,p.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let M=!1;f.addEventListener("mousedown",b=>{M=!0,V(b)});function V(b){let T=f.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left));o.h=W/176*360,k(),d(),O()}let F=document.createElement("input");F.type="text",F.value=Lo(o),F.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${s.bgSecondary};
    border: 1px solid ${s.border};
    border-radius: ${L.sm};
    color: ${s.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,F.addEventListener("keydown",b=>{b.key==="Enter"&&F.blur(),b.stopPropagation()}),F.addEventListener("blur",()=>{let b=F.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let T=b.startsWith("#")?b:`#${b}`;o=Ln(T),d(),k(),O()}else F.value=Lo(o)}),n.appendChild(F);let U=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],E=document.createElement("div");E.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of U){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${s.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${C.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=H.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=Ln(b),d(),k(),F.value=b,O()}),E.appendChild(T)}if(n.appendChild(E),e.projectColors&&e.projectColors.length>0){let b=document.createElement("div");b.textContent="Project",b.style.cssText=`
      font-size: 10px;
      color: ${s.textSecondary};
      font-family: ${x};
      margin-top: 2px;
    `,n.appendChild(b);let T=document.createElement("div");T.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:W,hex:ee}of e.projectColors){let te=document.createElement("button");te.title=W,te.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${ee};
        border: 1px solid ${s.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${C.fast};
      `,te.addEventListener("mouseenter",()=>{te.style.boxShadow=H.sm}),te.addEventListener("mouseleave",()=>{te.style.boxShadow="none"}),te.addEventListener("click",()=>{o=Ln(ee),d(),k(),F.value=ee,O(),e.onPickedToken?.(W)}),T.appendChild(te)}n.appendChild(T)}function O(){let b=Lo(o);F.value=b,e.onColorChange(b),e.onPickedToken?.(void 0)}t.appendChild(n),dt=n,d(),k();let pe=b=>{u&&m(b),M&&V(b)},me=()=>{u=!1,M=!1};document.addEventListener("mousemove",pe),document.addEventListener("mouseup",me);let A=b=>{b.key==="Escape"&&Wt()};document.addEventListener("keydown",A,!0);let K=b=>{dt&&!b.composedPath().includes(dt)&&Wt()};setTimeout(()=>document.addEventListener("mousedown",K,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",pe),document.removeEventListener("mouseup",me),document.removeEventListener("keydown",A,!0),document.removeEventListener("mousedown",K,!0)},n._onClose=e.onClose}function Wt(){dt&&(dt._cleanup?.(),dt._onClose?.(),dt.remove(),dt=null)}function Fd(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${s.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?s.bgPrimary:"transparent"};
      box-shadow: ${i===t?H.sm:"none"};
      color: ${i===t?s.textPrimary:s.textSecondary};
      font-family: ${x}; font-size: 12px; cursor: pointer;
      transition: background ${C.fast}, color ${C.fast};
    `,a.addEventListener("click",()=>{r.forEach((l,c)=>{l.style.background=c===i?s.bgPrimary:"transparent",l.style.boxShadow=c===i?H.sm:"none",l.style.color=c===i?s.textPrimary:s.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var dt,li=S(()=>{"use strict";X();we();bl();dt=null});function Vd(){return si||(si=document.createElement("canvas").getContext("2d")),si}function vl(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${L.sm};
    border:1px solid ${s.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let l=document.createElement("input");l.type="text",l.placeholder="#rrggbb",l.className="prop-input",l.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,i.appendChild(a),i.appendChild(l),i.appendChild(c);let d=t.get(r.key)??r.defaultValue,u=!1;function m(h){let y=h.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let k=Vd();k.fillStyle="#000000",k.fillStyle=y;let M=k.fillStyle;if(M.startsWith("#"))return M;let V=M.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(V){let F=parseInt(V[1],10),U=parseInt(V[2],10),E=parseInt(V[3],10);return`#${((1<<24)+(F<<16)+(U<<8)+E).toString(16).slice(1)}`}return"#000000"}function f(h){d=h,l.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let y=hn(),k=yo(h,y.colorsReverse);k?c.textContent=`${r.tailwindPrefix??"bg"}-${k}`:c.textContent=""}catch{c.textContent=""}}function p(){if(u)return;let h=l.value.trim();if(!h){f(d);return}let y=m(h);f(y),n(r.key,y),o()}return a.addEventListener("click",()=>{if(u){Wt(),u=!1;return}let h=a.getBoundingClientRect();u=!0,ko({initialColor:m(d),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:y=>{f(y),n(r.key,y)},onClose:()=>{u=!1,o()}})}),l.addEventListener("keydown",h=>{h.key==="Enter"?(p(),l.blur()):h.key==="Escape"&&(f(d),l.blur())}),l.addEventListener("blur",()=>{p()}),l.addEventListener("input",()=>{let h=l.value.trim(),y=m(h);a.style.background=y}),f(d),{element:i,setValue(h,y){h===r.key&&f(y)},destroy(){u&&(Wt(),u=!1)}}}var si,xl=S(()=>{"use strict";X();li();yn();si=null});function Cl(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function El(e,t,n,o){let r=new Map(t),i=[];for(let N of e){let w=Cl(N.key);w&&i.push({descriptor:N,...w})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${x};
    font-size:10px;
    color:${s.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let l=document.createElement("div");l.style.cssText="position:relative; padding:4px;";let c=document.createElement("div");c.style.cssText=`
    background:${s.marginBoxBg};
    border:1px dashed ${s.marginBoxBorder};
    border-radius:${L.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let d=document.createElement("div");d.style.cssText=`
    background:${s.paddingBoxBg};
    border:1px dashed ${s.paddingBoxBorder};
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
    color:${s.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${s.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let m=[];function f(N){let w=document.createElement("span"),Te=r.get(N.key)??N.defaultValue;return w.textContent=V(Te),w.title=N.label,w.style.cssText=`
      cursor:pointer;
      color:${s.textPrimary};
      font-size:10px;
      font-family:${x};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=s.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==p||p.dataset.key!==N.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{k(N,w)}),m.push({key:N.key,span:w,descriptor:N}),w}let p=document.createElement("input");p.type="text",p.className="prop-input",p.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(p);let h=null,y=null;function k(N,w){h&&h!==N&&M(),h=N,y=w,p.dataset.key=N.key;let Te=r.get(N.key)??N.defaultValue;p.value=V(Te);let ie=0,yt=0,lt=w;for(;lt&&lt!==a;)ie+=lt.offsetLeft,yt+=lt.offsetTop,lt=lt.offsetParent;p.style.display="block",p.style.left=`${ie}px`,p.style.top=`${yt}px`;let ba=w.getBoundingClientRect();p.style.width=`${Math.max(40,ba.width+10)}px`,p.focus(),p.select()}function M(){if(!h||!y)return;let N=p.value.trim(),w=h,Te=y,ie,yt=parseFloat(N),lt=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(yt)?lt.has(N)?ie=N:ie=r.get(w.key)??w.defaultValue:ie=N.match(/(px|rem|em|%|vw|vh|ch)$/)?N:`${yt}px`,r.set(w.key,ie),Te.textContent=V(ie),Te.style.background="transparent",p.style.display="none",p.dataset.key="",h=null,y=null,n(w.key,ie),o()}p.addEventListener("keydown",N=>{if(N.key==="Enter")M();else if(N.key==="Escape"){if(h&&y){let w=r.get(h.key)??h.defaultValue;y.textContent=V(w)}p.style.display="none",p.dataset.key="",h=null,y=null}}),p.addEventListener("blur",()=>{M()});function V(N){let w=parseFloat(N);return isNaN(w)?N:w===Math.round(w)?String(Math.round(w)):N}function F(N){let w=document.createElement("span");return w.textContent=N,w.style.cssText=`
      font-size:9px;
      color:${s.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function U(N,w){return i.find(Te=>Te.layer===N&&Te.side===w)}function E(N,w){let Te=U(N,w);if(!Te){let ie=document.createElement("span");return ie.textContent="-",ie.style.cssText=`text-align:center; color:${s.textTertiary};`,ie}return f(Te.descriptor)}let O=E("padding","top");O.style.gridRow="1",O.style.gridColumn="2",O.style.textAlign="center";let pe=E("padding","left");pe.style.gridRow="2",pe.style.gridColumn="1";let me=E("padding","right");me.style.gridRow="2",me.style.gridColumn="3";let A=E("padding","bottom");A.style.gridRow="3",A.style.gridColumn="2",A.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",d.appendChild(O),d.appendChild(pe),d.appendChild(u),d.appendChild(me),d.appendChild(A);let K=document.createElement("div");K.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=E("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let T=E("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let W=E("margin","right");W.style.gridRow="2",W.style.gridColumn="3";let ee=E("margin","bottom");ee.style.gridRow="3",ee.style.gridColumn="2",ee.style.textAlign="center";let te=document.createElement("div");te.style.cssText="grid-row:2; grid-column:2;",te.appendChild(d),K.appendChild(b),K.appendChild(T),K.appendChild(te),K.appendChild(W),K.appendChild(ee);let go=F("margin"),Nc=F("padding"),ho=document.createElement("div");return ho.style.cssText="display:flex; gap:8px; padding:0 4px;",ho.appendChild(go),ho.appendChild(Nc),c.appendChild(K),l.appendChild(c),a.appendChild(ho),a.appendChild(l),{element:a,setValue(N,w){if(!Cl(N))return;r.set(N,w);let ie=m.find(yt=>yt.key===N);ie&&(ie.span.textContent=V(w))},destroy(){}}}var Tl=S(()=>{"use strict";X()});function wl(e){return Po.has(e)}function Sl(e){return Ro.push(e),()=>{let t=Ro.indexOf(e);t>=0&&Ro.splice(t,1)}}function jd(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Gd(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Ud(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}function Kd(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function ci(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=Wd,i.appendChild(a);let l=[],c=Gd(e);for(let[d,u]of c){let m=d==="layout"&&!Kd(t)?u.filter(M=>!Yd.has(M.key)):u;if(m.length===0)continue;let f=document.createElement("div");f.className="prop-section";let p=document.createElement("div");p.className="prop-section-header",p.innerHTML=`<span>${zd[d]}</span>${jd()}`;let h=document.createElement("div");h.className="prop-section-body";let y=Po.has(d);if(y){let M=p.querySelector(".prop-section-chevron");M&&M.classList.add("collapsed"),h.classList.add("collapsed")}p.addEventListener("click",()=>{if(y=!y,y)Po.add(d);else{Po.delete(d);for(let V of Ro)V(d)}let M=p.querySelector(".prop-section-chevron");M&&M.classList.toggle("collapsed",y),h.classList.toggle("collapsed",y)}),f.appendChild(p);let k=Ud(m);for(let M of k){let V=Bd[M.controlType];if(!V)continue;let F=V(M.descriptors,t,n,o);if(M.descriptors.length>1||M.controlType==="box-model")h.appendChild(F.element);else{let U=document.createElement("div");U.className="prop-control-row";let E=document.createElement("span");E.className="prop-control-label",E.textContent=M.descriptors[0].label,E.title=M.descriptors[0].label;let O=document.createElement("div");O.className="prop-control-value",O.appendChild(F.element),U.appendChild(E),U.appendChild(O),h.appendChild(U)}l.push(F)}f.appendChild(h),i.appendChild(f)}if(r){let d=document.createElement("div");d.className="prop-show-all",d.textContent="Show all properties",d.addEventListener("click",r),i.appendChild(d)}return{container:i,controls:l}}var Po,Ro,zd,Bd,Wd,Yd,Nl=S(()=>{"use strict";gl();yl();xl();Tl();X();Po=new Set;Ro=[];zd={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Bd={"number-scrub":fl,segmented:hl,"color-swatch":vl,"box-model":El},Wd=`
  .prop-section {
    border-bottom: 1px solid ${s.border};
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
    background: ${s.bgSecondary};
    cursor: pointer;
    user-select: none;
    font-family: ${x};
    font-size: 11px;
    font-weight: 600;
    color: ${s.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .prop-section-header:hover {
    background: ${s.bgTertiary};
  }
  .prop-section-chevron {
    width: 12px;
    height: 12px;
    transition: transform 150ms ease;
    color: ${s.textTertiary};
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
    background: ${s.bgTertiary};
    border: 1px solid ${s.border};
    border-radius: ${L.xs};
    padding: 4px 6px;
    font-family: ${x};
    font-size: 11px;
    color: ${s.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${C.fast}, box-shadow ${C.fast};
  }
  .prop-input:hover {
    border-color: ${s.borderStrong};
  }
  .prop-input:focus {
    border-color: ${s.accent};
    box-shadow: 0 0 0 2px ${s.focusRing};
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
    color: ${s.textTertiary};
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
    color: ${s.textTertiary};
    cursor: pointer;
    text-align: center;
    user-select: none;
  }
  .prop-show-all:hover {
    color: ${s.accent};
  }
`;Yd=new Set(["flexDirection","justifyContent","alignItems","gap"])});function Jd(){try{let e=localStorage.getItem(kl);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Ml&&t<=Ll)return t}}catch{}return Math.min(Xd,Math.floor(window.innerWidth*.22))}function Qd(e){try{localStorage.setItem(kl,String(e))}catch{}}function Pl(e,t){let n=document.createElement("style");n.textContent=Zd,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${Jd()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let l=document.createElement("div");l.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let d=document.createElement("div");d.className="prop-sidebar-file-path",a.appendChild(l),a.appendChild(d);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Collapse panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let m=document.createElement("div");m.className="prop-sidebar-warning",m.style.display="none",o.appendChild(m);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let p=!1,h=0,y=0;r.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),p=!0,h=A.clientX,y=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(A.pointerId)}),r.addEventListener("pointermove",A=>{if(!p)return;let K=h-A.clientX,b=Math.max(Ml,Math.min(Ll,y+K));o.style.width=`${b}px`});let k=()=>{p&&(p=!1,r.classList.remove("active"),Qd(o.offsetWidth))};r.addEventListener("pointerup",k),r.addEventListener("pointercancel",k),o.addEventListener("pointerdown",A=>A.stopPropagation()),o.addEventListener("mousedown",A=>A.stopPropagation()),o.addEventListener("click",A=>A.stopPropagation()),o.addEventListener("mouseup",A=>A.stopPropagation()),u.addEventListener("click",()=>{F(),t&&t()});let M=!1;function V(A,K,b,T){l.textContent=`<${A}>`,l.appendChild(c),d.textContent=`${K}:${b}`,d.title=`${K}:${b}`,f.innerHTML="",f.appendChild(T),M||(M=!0,o.offsetHeight,o.classList.add("visible"))}function F(){M&&(M=!1,o.classList.remove("visible"))}function U(A){f.innerHTML="",f.appendChild(A)}function E(A,K,b){m.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=A;let W=document.createElement("button");W.className="prop-sidebar-warning-btn",W.textContent=K,W.addEventListener("click",ee=>{ee.stopPropagation(),b()}),m.appendChild(T),m.appendChild(W),m.style.display="flex"}function O(){m.style.display="none",m.innerHTML=""}function pe(){c.classList.add("active")}function me(){c.classList.remove("active")}return{show:V,hide:F,isVisible:()=>M,getElement:()=>o,replaceContent:U,showWarning:E,clearWarning:O,showSaving:pe,hideSaving:me}}var Xd,Ml,Ll,kl,qd,Zd,Rl=S(()=>{"use strict";X();Xd=300,Ml=260,Ll=380,kl="frameup-sidebar-width",qd=4,Zd=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${s.bgPrimary};
    border-left: 1px solid ${s.border};
    box-shadow: ${H.lg};
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
    width: ${qd}px;
    cursor: col-resize;
    z-index: 1;
  }
  .prop-sidebar-resize:hover,
  .prop-sidebar-resize.active {
    background: ${s.accent};
    opacity: 0.3;
  }
  .prop-sidebar-header {
    padding: 12px 16px;
    border-bottom: 1px solid ${s.border};
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
    color: ${s.textTertiary};
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${L.sm};
  }
  .prop-sidebar-close:hover {
    background: ${s.bgTertiary};
    color: ${s.textPrimary};
  }
  .prop-sidebar-component-name {
    font-size: 13px;
    font-weight: 600;
    color: ${s.textPrimary};
    margin: 0 0 4px;
    line-height: 1.3;
  }
  .prop-sidebar-file-path {
    font-size: 11px;
    color: ${s.textTertiary};
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
    background: ${s.accent};
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
    background: ${s.dangerSoft};
    border-bottom: 1px solid ${s.danger};
    font-family: ${x};
    font-size: 11px;
    color: ${s.danger};
    flex-shrink: 0;
  }
  .prop-sidebar-warning-text {
    flex: 1;
    font-weight: 500;
  }
  .prop-sidebar-warning-btn {
    border: 1px solid ${s.danger};
    background: none;
    color: ${s.danger};
    font-family: ${x};
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: ${L.xs};
    cursor: pointer;
    white-space: nowrap;
  }
  .prop-sidebar-warning-btn:hover {
    background: ${s.danger};
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
    background: ${s.borderStrong};
    border-radius: 3px;
  }
`});function eu(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function ut(e){e.element.style.transform=eu(e.delta.dx,e.delta.dy,e.existingTransform)}function Al(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function kn(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=H.lg,e.style.transition="none",e.style.zIndex="2147483644"}function $l(e){ut(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function jt(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);for(;o;){if(fe(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Ao(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);if(!o)continue;let r=await $e(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let a=Oe(i.fileName);if(a&&a.endsWith(e.filePath))return n}}catch{}return null}var Pn=S(()=>{"use strict";bt();vt();_t();X()});var Bo={};va(Bo,{addAnnotation:()=>yi,addMove:()=>gi,addTextEditAnnotation:()=>Fo,canUndo:()=>Ti,canvasUndo:()=>Vo,getActiveTool:()=>On,getAnnotations:()=>nu,getCanvasTransform:()=>Be,getMoveContainingElement:()=>Ei,getMoveForElement:()=>Ci,getMoves:()=>fi,getOriginalsHidden:()=>ou,getToolOptions:()=>Gt,hasChanges:()=>zo,hasMoveForElement:()=>xi,isMovedAwayFromPoint:()=>vi,onAnnotationRemoved:()=>bi,onCanvasTransformChange:()=>Dn,onStateChange:()=>mi,onToolChange:()=>pi,pageToViewport:()=>au,peekUndoStack:()=>iu,pushUndoAction:()=>Hn,removeAnnotation:()=>Ho,removeMove:()=>_o,resetCanvas:()=>_n,restoreMoveDelta:()=>tu,serializeAnnotations:()=>wi,setActiveTool:()=>Io,setCanvasTransform:()=>In,setOriginalsHidden:()=>ru,setToolOption:()=>Do,updateMoveDelta:()=>hi,viewportToPage:()=>Ut});function pi(e){return $o.push(e),()=>{$o=$o.filter(t=>t!==e)}}function mi(e){return Oo.push(e),()=>{Oo=Oo.filter(t=>t!==e)}}function pt(){Oo.forEach(e=>e())}function On(){return di}function Io(e){let t=di;t!==e&&(di=e,$o.forEach(n=>n(e,t)))}function Gt(){return{...Ol}}function Do(e,t){Ol[e]=t}function fi(){return se}function gi(e){se.set(e.id,e),Hn({type:"moveCreate",moveId:e.id})}function hi(e,t,n){let o=se.get(e);o&&(o.delta=t,ut(o),Hn({type:"moveDelta",moveId:e,previousDelta:n}))}function tu(e,t){let n=se.get(e);n&&(n.delta=t,ut(n),pt())}function _o(e){let t=se.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),se.delete(e),pt())}function nu(){return ze}function yi(e){if(ze.push(e),e.type==="colorChange"){let t=e;He.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else He.push({type:"annotationAdd",annotationId:e.id});pt()}function Fo(e,t,n){ze.push(e),He.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),pt()}function bi(e){Hl=e}function Ho(e){ze=ze.filter(t=>t.id!==e),Hl?.(e),pt()}function ou(){return ui}function ru(e){ui=e;for(let t of se.values())e?ut(t):Al(t);pt()}function vi(e,t,n){for(let o of se.values())if(o.element===e||o.element.contains(e)){let r=o.element.getBoundingClientRect();if(t<r.left||t>r.right||n<r.top||n>r.bottom)return!0}return!1}function xi(e){for(let t of se.values())if(t.element===e||t.element.contains(e))return!0;return!1}function Ci(e){for(let t of se.values())if(t.element===e)return t}function Ei(e){for(let t of se.values())if(t.element===e||t.element.contains(e))return t}function Vo(){let e=He.pop();if(!e)return null;switch(e.type){case"moveCreate":return _o(e.moveId),"move removed";case"moveDelta":{let t=se.get(e.moveId);return t&&(t.delta=e.previousDelta,ut(t)),"move reverted"}case"annotationAdd":return Ho(e.annotationId),"annotation removed";case"colorChange":{let t=ze.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Ho(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=jt(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),Ho(e.annotationId),"text edit reverted"}}return null}function Hn(e){He.push(e),pt()}function iu(){return He.length>0?He[He.length-1]:null}function Be(){return{scale:Tt,offsetX:An,offsetY:$n}}function In(e,t,n){Tt=e,An=t,$n=n,Rn.forEach(o=>o())}function Dn(e){return Rn.push(e),()=>{Rn=Rn.filter(t=>t!==e)}}function Ut(e,t){return{x:(e-An)/Tt,y:(t-$n)/Tt}}function au(e,t){return{x:e*Tt+An,y:t*Tt+$n}}function _n(){for(let e of se.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of ze)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of He)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}se=new Map,ze=[],He=[],ui=!0,Tt=1,An=0,$n=0,Rn.forEach(e=>e()),pt()}function zo(){return se.size>0||ze.length>0}function Ti(){return He.length>0}function wi(){let e=Array.from(se.values()).map(r=>({component:r.componentRef.componentName,file:r.componentRef.filePath,line:r.componentRef.lineNumber,originalRect:{top:r.originalRect.top,left:r.originalRect.left,width:r.originalRect.width,height:r.originalRect.height},delta:{dx:r.delta.dx,dy:r.delta.dy},siblingRects:(()=>{let i=r.element.parentElement;if(!i)return;let a=[];for(let l of Array.from(i.children)){if(l===r.element||!(l instanceof HTMLElement))continue;let c=l.getBoundingClientRect();a.push({component:l.tagName.toLowerCase(),rect:{top:c.top,left:c.left,width:c.width,height:c.height}})}return a.length>0?a:void 0})()})),t=[],n=[],o=[];for(let r of ze)r.type==="text"?t.push({type:"text",content:r.content,position:r.position,targetComponent:r.targetComponent?.componentName,targetFile:r.targetComponent?.filePath,targetLine:r.targetComponent?.lineNumber}):r.type==="colorChange"?n.push({component:r.component.componentName,file:r.component.filePath,line:r.component.lineNumber,property:r.property,from:r.fromColor,to:r.toColor,pickedToken:r.pickedToken}):r.type==="textEdit"&&o.push({component:r.componentName,file:r.filePath,line:r.lineNumber,column:r.columnNumber,originalText:r.originalText,newText:r.newText});return{moves:e,annotations:t,colorChanges:n,textEdits:o}}var se,ze,He,di,ui,Ol,Tt,An,$n,Rn,$o,Oo,Hl,de=S(()=>{"use strict";Pn();se=new Map,ze=[],He=[],di="select",ui=!0,Ol={fontSize:16,textColor:"#ffffff"},Tt=1,An=0,$n=0,Rn=[],$o=[],Oo=[];Hl=null});function Dl(){if(localStorage.getItem(Il))return;let e=q();if(!e)return;Ie=document.createElement("div"),Ie.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${s.bgSecondary};
    font-family: ${x};
    font-size: 12px;
    color: ${s.textSecondary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
    pointer-events: auto;
  `;let t=document.createElement("span");t.textContent="Click any element to edit its properties. Double-click text to edit it.";let n=document.createElement("span");n.textContent="\xD7",n.style.cssText=`
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 4px;
    color: ${s.textTertiary};
  `,n.addEventListener("click",()=>Fn()),Ie.appendChild(t),Ie.appendChild(n),e.appendChild(Ie),requestAnimationFrame(()=>{Ie&&(Ie.style.opacity="1")})}function Fn(){Ie&&(localStorage.setItem(Il,"1"),Ie.style.opacity="0",setTimeout(()=>{Ie?.remove(),Ie=null},150))}var Il,Ie,Si=S(()=>{"use strict";X();we();Il="frameup-onboarding-dismissed",Ie=null});function Yt(e){let t=e.parentElement;if(!t)return 1;let n=1;for(let o=0;o<t.children.length&&t.children[o]!==e;o++)t.children[o].tagName===e.tagName&&n++;return n}var Wo=S(()=>{"use strict"});function Ni(e,t){return e.includes(":")?!1:e===t?!0:e.startsWith(`${t}-`)}var _l=S(()=>{"use strict"});function Bl(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||su.has(r))&&t.add("typography"),t}function uu(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){Nt();return}let n=pu(e);if(n){zl(n,t).then(o=>{St(n,o)});return}mu(e).then(async o=>{if(o){let r=await zl(o,t);St(o,r)}else Nt()})}function pu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);for(;o;){if(fe(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function mu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);if(!o)continue;let r=await $e(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let l=Oe(i.fileName);if(l&&e.filePath.endsWith(l)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}async function zl(e,t){let n=ne(e);if(!n)return t;try{let r=await $e(n);if(r&&r.length>0)for(let i of r){if(!i.functionName)continue;let a=i.functionName;if(a[0]===a[0].toUpperCase()&&(a===t.componentName||!t.componentName)){let l=Oe(i.fileName);if(l){let c=e.getBoundingClientRect();return{...t,filePath:l,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:c.top,left:c.left,width:c.width,height:c.height}}}}}}catch{}let o=n;for(;o;){if(fe(o)){let r=ae(o.type),i=o._debugSource||o._debugOwner?._debugSource;if(r===t.componentName&&i?.fileName){let a=e.getBoundingClientRect();return{...t,filePath:i.fileName,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:a.top,left:a.left,width:a.width,height:a.height}}}}o=o.return}return t}function fu(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Ve){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function gu(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of Ve){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of wt)i.setValue(n.key,r)}}function Xt(){for(let e of wt)e.destroy();wt=[]}function Mi(){if(!g.selectedElement||!g.componentInfo)return;Xt();let e=g.showAllGroups?null:Bl(g.selectedElement),t=e?Ve.filter(a=>e.has(a.group)):Ve,o=e!==null&&t.length<Ve.length?()=>Yl(!0):void 0,{container:r,controls:i}=ci(t,g.currentValues,Bn,Yo,o);wt=i,$.replaceContent(r)}function Wl(){if(!g.selectedElement||!g.componentInfo||g.pendingBatch.size===0)return;let e=g.selectedElement,t=g.componentInfo,n=e.parentElement,r=(e.getAttribute("class")||"").split(/\s+/).filter(Boolean),i=[];for(let[l,c]of g.pendingBatch){let d=Go.get(c.property),u="";if(d?.classPattern){let p=new RegExp(d.classPattern);u=r.find(h=>!h.includes(":")&&p.test(h))||""}else u=r.find(p=>Ni(p,c.tailwindPrefix))||"";let m=[];for(let p of c.relatedPrefixes??[]){let h=r.find(y=>Ni(y,p));h&&m.push(h)}let f=c.tailwindToken||"";i.push({cssProperty:l,tailwindPrefix:c.tailwindPrefix,tailwindToken:c.tailwindToken,value:c.value,oldClass:u,newClass:f,relatedOldClasses:m})}let a={type:"property",componentName:t.componentName,tag:t.tagName,filePath:t.filePath,textContent:(e.textContent||"").slice(0,50),className:e.className,nthOfType:Yt(e),parentTag:n?.tagName.toLowerCase()||"",parentClassName:n?.className||"",lineHint:t.lineNumber,updates:i};mt(a),Xl(a,e,g.activeOverrides)}function Yo(){if(qe()){Wl();return}Se&&clearTimeout(Se),Se=setTimeout(()=>{Se=null,Li()},du)}function Uo(){Se&&(clearTimeout(Se),Se=null),Kt&&(Kt(),Kt=null),Le&&(clearTimeout(Le.timeoutId),Le=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1}}function jl(e){$=Pl(e,()=>{Ko(),Xt(),Uo()}),ql((t,n,o)=>{if($&&$.hideSaving(),Le)if(clearTimeout(Le.timeoutId),t)Le=null;else{let{batch:r,previousOriginals:i}=Le;Le=null;for(let[a]of r){let l=i.get(a);l!==void 0&&g.originalValues.set(a,l)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let l=g.originalValues.get(a);l!==void 0&&g.currentValues.set(a,l)}for(let a of wt)for(let[l]of r){let c=g.originalValues.get(l);c!==void 0&&a.setValue(l,c)}}if($){let l={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";$.showWarning(l,"Dismiss",()=>$.clearWarning())}}else if(!t&&$){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";$.showWarning(i,"Dismiss",()=>$.clearWarning())}}),jo=ge(t=>{if(t.type==="updatePropertyComplete"&&t.success&&t.undoId&&Vn){let{componentInfo:n,batch:o}=Vn,r={componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,tagName:n.tagName};for(let i of o)Ne({type:"property",componentName:n.componentName,filePath:n.filePath,summary:`${i.cssProperty}: ${i.originalValue} \u2192 ${i.value}`,state:"active",propertyKey:i.cssProperty,elementIdentity:r,revertData:{type:"cliUndo",undoIds:[t.undoId]}});Vn=null}})}function St(e,t){g.pendingBatch.size>0&&Li(),Fn(),Xt(),g.showAllGroups=!1,g.readOnly=!1,g.selectedElement=e,g.componentInfo=t,g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(lu);for(let u of Fl)wl(u)||n.add(u);let o=fu(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,t.filePath||(g.readOnly=!0),Kt&&Kt(),Kt=Sl(u=>{Fl.has(u)&&gu(u)});let r=g.showAllGroups?null:Bl(e),i=r?Ve.filter(u=>r.has(u.group)):Ve,l=r!==null&&i.length<Ve.length?()=>Yl(!0):void 0,{container:c,controls:d}=ci(i,g.currentValues,Bn,Yo,l);wt=d,zn.disconnect(),zn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),$.show(t.componentName,t.filePath,t.lineNumber,c),t.filePath?$.clearWarning():$.showWarning("Source file couldn't be resolved for this element","Dismiss",()=>$.clearWarning())}function Bn(e,t){let n=Go.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=hn(),r=n.tailwindScale+"Reverse",i=o[r],a=i?yo(t,i):null;if(!a&&n.enumValues){let l=n.enumValues.find(c=>c.value===t);l&&(a=l.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(Mi(),t==="none"){let l=g.originalValues.get("display")||"block";$.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=l),g.activeOverrides.delete("display"),g.currentValues.set("display",l),g.pendingBatch.delete("display"),Mi(),$.clearWarning()})}else $.clearWarning()}function Li(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath;if(!e){g.pendingBatch.clear(),$&&($.hideSaving(),$.showWarning("This element can be inspected, but its source file couldn't be resolved","Dismiss",()=>$.clearWarning())),R("Can't save changes for this element");return}let t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1;if(Vn={componentInfo:{...g.componentInfo},batch:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,originalValue:a.originalValue,value:a.value}))},g.pendingBatch.size===1){let a=[...g.pendingBatch.values()][0],l=Go.get(a.property);re({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:l?.classPattern,standalone:l?.standalone})}else re({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...g.pendingBatch.values()].map(a=>{let l=Go.get(a.property);return{...a,classPattern:l?.classPattern,standalone:l?.standalone}}),framework:"tailwind"});g.selectedElement&&g.elementIdentity&&Hn({type:"propertyChange",elementIdentity:g.elementIdentity,element:g.selectedElement,overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),$&&$.showSaving();let o=new Map;for(let[a]of g.pendingBatch)o.set(a,g.originalValues.get(a)||"");for(let[a,l]of g.pendingBatch)g.originalValues.set(a,l.value);let r=new Map(g.pendingBatch),i=setTimeout(()=>{Le&&Le.batch===r&&(Le=null,$&&$.hideSaving())},cu);Le={batch:r,previousOriginals:o,timeoutId:i},g.pendingBatch.clear()}function Ko(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of wt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function Nt(){Se&&(clearTimeout(Se),Se=null),zn.disconnect(),Ko(),Xt(),$&&$.hide(),Uo()}function Gl(){if(qe()){Wl(),zn.disconnect(),Xt(),$&&$.hide(),Uo();return}Se&&(clearTimeout(Se),Se=null),zn.disconnect(),Li(),Xt(),$&&$.hide(),Uo()}function Ul(){return g.activeOverrides.size>0}function Yl(e){g.showAllGroups=e,Mi()}function Kl(){jo&&(jo(),jo=null),Vn=null,Nt()}var Go,lu,Fl,su,cu,g,wt,$,Vl,Se,du,Le,Vn,Kt,jo,zn,ki=S(()=>{"use strict";ml();Nl();Rl();yn();We();Mt();we();de();Si();bt();vt();_t();qt();Wo();It();_l();Go=new Map(Ve.map(e=>[e.key,e])),lu=new Set(["layout","spacing","size"]),Fl=new Set(["typography","background"]),su=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);cu=5e3,g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1},wt=[],Se=null,du=300,Le=null,Vn=null,Kt=null,jo=null,zn=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(Vl),Vl=setTimeout(()=>{uu()},80))})});function Zl(e,t){if(!Lt)return;let n=performance.now(),o=Math.abs(e-Lt.clientX),r=Math.abs(t-Lt.clientY),i=o<=2&&r<=2,a=n-Lt.timestamp<16;if(i||a)return Lt.element}function Jl(e,t,n){Lt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Zt(){Lt=null}var Lt,Pi=S(()=>{"use strict";Lt=null});function Cu(){Ai=document.body.style.background||document.body.style.backgroundColor||"",$i=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Z=document.createElement("div"),Z.setAttribute("data-frameup-canvas-wrapper","true"),Z.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),De=document.createElement("div"),De.setAttribute("data-frameup-dot-bg","true"),De.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${s.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(ts.push(r),Z.appendChild(r));Z.style.position="relative",Z.style.zIndex="1",document.body.insertBefore(De,document.body.firstChild),document.body.insertBefore(Z,De.nextSibling),Ri=Dn(es),es(),ns.forEach(r=>r(Z))}function es(){if(!Z||!De)return;let{scale:e,offsetX:t,offsetY:n}=Be();Z.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=vu*e,r=t%o,i=n%o;De.style.backgroundImage=`radial-gradient(circle, ${xu} ${Ql}px, transparent ${Ql}px)`,De.style.backgroundSize=`${o}px ${o}px`,De.style.backgroundPosition=`${r}px ${i}px`}function Eu(e,t,n){let{scale:o,offsetX:r,offsetY:i}=Be(),a=Math.min(yu,Math.max(hu,o+n));if(a===o)return;let l=(e-r)/o,c=(t-i)/o,d=e-l*a,u=t-c*a;In(a,d,u)}function os(e){e.preventDefault();let t=-e.deltaY*bu,{scale:n}=Be(),o=t*n;Eu(e.clientX,e.clientY,o)}function rs(e,t){let{scale:n,offsetX:o,offsetY:r}=Be();In(n,o+e,r+t)}function is(){In(1,0,0)}function as(){return Z!==null}function ls(){Z?Oi():Cu()}function Oi(){if(ns.forEach(e=>e(null)),Ri?.(),Ri=null,Z){for(;Z.firstChild;)document.body.insertBefore(Z.firstChild,Z);Z.remove(),Z=null}De?.remove(),De=null,ts=[],document.body.style.background=Ai,document.documentElement.style.background=$i,Ai="",$i=""}var hu,yu,bu,vu,Ql,xu,Z,De,Ri,ts,ns,Ai,$i,Xo=S(()=>{"use strict";de();X();hu=.1,yu=5,bu=.002,vu=24,Ql=1,xu="rgba(0,0,0,0.15)",Z=null,De=null,Ri=null,ts=[],ns=[],Ai="",$i=""});function Qt(e,t){return e.length>t?e.slice(0,t)+"\u2026":e}function et(){return z!==null}function ss(){document.addEventListener("dblclick",ds,!0),document.addEventListener("mousedown",ms,!0),Ii=ge(e=>{e.type==="updateTextComplete"&&wu(e)})}function cs(){z&&Di(),document.removeEventListener("dblclick",ds,!0),document.removeEventListener("mousedown",ms,!0),Ii?.(),Ii=null}function wu(e){if(e.success&&e.undoId&&Jt){let t=Jt,n={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};Ne({type:"textEdit",componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,summary:`"${Qt(t.originalText,20)}" \u2192 "${Qt(t.newText,20)}"`,state:"active",elementIdentity:n,revertData:{type:"cliUndo",undoIds:[e.undoId]}})}else if(!e.success&&e.reason==="no-match"&&Jt){let t=Jt,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};Fo(n,o,t.originalInnerHTML),Ne({type:"textAnnotation",componentName:n.componentName,filePath:n.filePath||"",summary:`"${Qt(n.originalText,20)}" \u2192 "${Qt(n.newText,20)}"`,state:"pending",elementIdentity:o,revertData:{type:"annotationRemove",annotationId:n.id,originalInnerHTML:t.originalInnerHTML,elementIdentity:o}})}Jt=null}function Su(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function Nu(e){let t=ne(e);if(!t)return null;try{let n=await $e(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||Je(r))continue;let i=Oe(o.fileName);return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(fe(n)){let o=ae(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!Je(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function ds(e){z&&kt();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=Pt(e.clientX,e.clientY),t&&(Tu.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),Mu(t)))}function Mu(e){z=e,ft=e.textContent||"",Wn=e.innerHTML,qo=ft,J=null,Nu(e).then(n=>{z===e&&(J=n)}),Hi=e.style.outline,e.style.outline=`2px solid ${s.accent}`,e.contentEditable="true",gs(!1),e.focus();let t=window.getSelection();if(t){t.removeAllRanges();let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.addRange(n)}e.addEventListener("blur",ps),e.addEventListener("keydown",fs),e.addEventListener("input",us)}function us(){z&&(qo=z.textContent||"")}function ps(){kt()}function ms(e){if(!z)return;let t=e.target;if(t instanceof Node&&(t===z||z.contains(t)))return;if((t instanceof HTMLElement?t:null)?.closest("#frameup-root")){kt();return}let o=Lu(e);if(o&&xt(o)){e.preventDefault(),e.stopPropagation(),kt({nextSelection:o,reselectEditedElement:!1});return}e.preventDefault(),e.stopPropagation(),kt({clearSelection:!0,reselectEditedElement:!1})}function fs(e){if(e.key==="Escape"){e.preventDefault(),kt();return}if(e.key==="Enter"&&z&&!Su(z)){e.preventDefault(),kt();return}e.stopPropagation()}function Lu(e){let t=e.target;return t instanceof HTMLElement&&t!==document.documentElement&&t!==document.body&&!t.hasAttribute("data-frameup-interaction")&&!t.closest("#frameup-root")?t:Pt(e.clientX,e.clientY)}function kt(e){if(!z)return;let t=qo;if(t!==ft&&J){if(qe()&&J.filePath){let r=z,i=r?.parentElement;mt({type:"text",componentName:J.componentName,tag:J.tagName,filePath:J.filePath,className:r?.className||"",nthOfType:r?Yt(r):1,parentTag:i?.tagName.toLowerCase()||"",parentClassName:i?.className||"",lineHint:J.lineNumber,originalText:ft,newText:t});let a=z;if(Di(),e?.nextSelection&&document.contains(e.nextSelection)){je(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){Ge();return}if(e?.reselectEditedElement===!1)return;a&&document.contains(a)&&je(a,{skipSidebar:!1});return}if(J.filePath)Jt={componentInfo:J,originalText:ft,newText:t,originalInnerHTML:Wn,tagName:J.tagName},re({type:"updateText",filePath:J.filePath,lineNumber:J.lineNumber,columnNumber:J.columnNumber,originalText:ft,newText:t});else{let r={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:J.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:ft,newText:t},i={componentName:J.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:J.tagName};Fo(r,i,Wn),Ne({type:"textAnnotation",componentName:r.componentName,filePath:r.filePath||"",summary:`"${Qt(r.originalText,20)}" \u2192 "${Qt(r.newText,20)}"`,state:"pending",elementIdentity:i,revertData:{type:"annotationRemove",annotationId:r.id,originalInnerHTML:Wn,elementIdentity:i}})}}let o=z;if(Di(),e?.nextSelection&&document.contains(e.nextSelection)){je(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){Ge();return}e?.reselectEditedElement!==!1&&o&&document.contains(o)&&je(o,{skipSidebar:!1})}function Di(){z&&(z.removeEventListener("blur",ps),z.removeEventListener("keydown",fs),z.removeEventListener("input",us),z.removeAttribute("contenteditable"),z.style.outline=Hi,Zo(On()),z=null,ft="",Wn="",qo="",J=null,Hi="")}var Tu,z,ft,Wn,qo,J,Hi,Ii,Jt,jn=S(()=>{"use strict";bt();vt();_t();We();X();Gn();de();de();Ct();en();Mt();qt();Wo();It();Tu=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),z=null,ft="",Wn="",qo="",J=null,Hi="",Ii=null,Jt=null});function ys(e,t){_i.set(e,t)}function bs(){I=document.createElement("div"),I.setAttribute("data-frameup-interaction","true"),I.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(I),document.addEventListener("scroll",Zt,!0),I.addEventListener("mousedown",e=>{if(tt){tn=e.clientX,Un=e.clientY,I&&(I.style.cursor="grabbing"),e.preventDefault();return}Yn?.onMouseDown?.(e)}),I.addEventListener("mousemove",e=>{if(tt&&tn!==0){rs(e.clientX-tn,e.clientY-Un),tn=e.clientX,Un=e.clientY;return}Yn?.onMouseMove?.(e)}),I.addEventListener("mouseup",e=>{if(tt){I&&(I.style.cursor="grab"),tn=0,Un=0;return}Yn?.onMouseUp?.(e)}),document.addEventListener("wheel",vs,{passive:!1}),document.addEventListener("keydown",xs),document.addEventListener("keyup",Cs)}function vs(e){!I||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||os(e)}function xs(e){if(e.key!==" "||et())return;let t=document.activeElement;t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable||(e.preventDefault(),!tt&&I&&(hs=I.style.cursor,I.style.cursor="grab",I.style.pointerEvents="auto",tt=!0))}function Cs(e){if(e.key===" "&&tt&&(e.preventDefault(),tt=!1,tn=0,Un=0,I)){I.style.cursor=hs;let t=On();I.style.pointerEvents=t==="select"?"none":"auto"}}function Jo(){return tt}function Zo(e){Yn=_i.get(e)||null,I&&(I.style.pointerEvents=e==="select"?"none":"auto"),ku(e)}function ku(e){if(I)switch(e){case"select":I.style.cursor="default";break;case"text":I.style.cursor="text";break;default:I.style.cursor="default"}}function gs(e){I&&(I.style.pointerEvents=e?"auto":"none")}function Pt(e,t){let n=Zl(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!qr(i)&&!vi(i,e,t)){r=i;break}return Jl(e,t,r),r}function Es(){document.removeEventListener("scroll",Zt,!0),document.removeEventListener("wheel",vs),document.removeEventListener("keydown",xs),document.removeEventListener("keyup",Cs),tt=!1,I?.remove(),I=null,Yn=null,_i.clear()}var I,Yn,_i,tt,tn,Un,hs,Gn=S(()=>{"use strict";Pi();Ct();Xo();jn();de();I=null,Yn=null,_i=new Map,tt=!1,tn=0,Un=0,hs=""});function Ts(e,t,n,o,r,i){let a=e.left+e.width/2,l=e.top+e.height/2,c=t.left+t.width/2,d=t.top+t.height/2,u=c-a,m=d-l,f=Math.abs(u)<=r,p=Math.abs(m)<=r;return{dx:f?n+u/i:n,dy:p?o+m/i:o,snappedX:f,snappedY:p,guides:{verticalLine:f?{x:c,top:t.top,bottom:t.bottom}:null,horizontalLine:p?{y:d,left:t.left,right:t.right}:null}}}var ws=S(()=>{"use strict"});function Ss(e,t,n){let o=Ut(e,t),r=Ci(n);if(r)return he=r,Qo={x:o.x,y:o.y},Xn={...r.delta},Kn=!1,kn(r.element,r.delta.dx,r.delta.dy,r.existingTransform),!0;let i=Ls(),a=ks();if(!i||!a||n!==a)return!1;let l=a.getBoundingClientRect(),c=a.style.cssText,d=getComputedStyle(a).transform,u={id:crypto.randomUUID(),componentRef:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber},element:a,placeholder:null,originalRect:l,delta:{dx:0,dy:0},originalCssText:c,existingTransform:d==="none"?"":d,identity:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber,tagName:a.tagName.toLowerCase()}};return gi(u),he=u,Qo={x:o.x,y:o.y},Xn={dx:0,dy:0},Kn=!0,kn(a,0,0,u.existingTransform),!0}function Fi(e,t){if(!he)return;let n=Ut(e,t),o=Xn.dx+(n.x-Qo.x),r=Xn.dy+(n.y-Qo.y);kn(he.element,o,r,he.existingTransform);let i=he.element.parentElement;if(!i||i===document.body||i===document.documentElement){he.delta={dx:o,dy:r},ri();return}let a=he.element.getBoundingClientRect(),l=i.getBoundingClientRect(),{scale:c}=Be(),d=Ts(a,l,o,r,5,c);(d.snappedX||d.snappedY)&&kn(he.element,d.dx,d.dy,he.existingTransform),he.delta={dx:d.dx,dy:d.dy},il(d.guides)}function Ns(){if(!he)return null;let e=he,t={...Xn},n={...e.delta};if(Kn||hi(e.id,n,t),$l(e),ri(),Ne({type:"move",componentName:e.componentRef.componentName,filePath:e.componentRef.filePath,summary:`moved (${Math.round(n.dx)}px, ${Math.round(n.dy)}px)`,state:"pending",elementIdentity:e.identity,revertData:Kn?{type:"moveRemove",moveId:e.id}:{type:"moveRestore",moveId:e.id,previousDelta:t}}),qe()&&e.componentRef.filePath){let r=e.element,i=r?.parentElement;mt({type:"move",componentName:e.componentRef.componentName,tag:r?.tagName.toLowerCase()||"div",filePath:e.componentRef.filePath,className:r?.className||"",nthOfType:r?Yt(r):1,parentTag:i?.tagName.toLowerCase()||"",parentClassName:i?.className||"",lineHint:e.componentRef.lineNumber,delta:{dx:n.dx,dy:n.dy},resolvedDx:null,resolvedDy:null})}let o=e.element;return he=null,Kn=!1,o}var he,Qo,Xn,Kn,Ms=S(()=>{"use strict";Pn();Mt();de();en();ws();Mo();qt();Wo();It();he=null,Qo={x:0,y:0},Xn={dx:0,dy:0},Kn=!1});function er(e){let t=Vi.get(e);if(t){if(Date.now()-t.timestamp>3e4){Vi.delete(e);return}return t.filePath}}function tr(e,t){Vi.set(e,{filePath:t,timestamp:Date.now()})}var Vi,zi=S(()=>{"use strict";Vi=new Map});async function Pu(e){let t=ne(e);if(!t)return null;try{let n=await $e(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||Je(i))continue;let a=Oe(r.fileName);o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0){let r=o.find(i=>i.filePath)||o[0];return{tagName:e.tagName.toLowerCase(),componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,stack:o}}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return Ps(e,t)}function Ps(e,t){let n=[],o=t;for(;o;){if(fe(o)){let r=ae(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",l=0,c=0;i&&(a=i.fileName||"",l=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!Je(r)&&n.push({componentName:r,filePath:a,lineNumber:l,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Rs(e){let t=ne(e);return t?Ps(e,t):null}function Ru(e){let t=e.tagName.toLowerCase(),n=e.getAttribute("data-component-name")?.trim(),o=e.getAttribute("aria-label")?.trim(),r=e.textContent?.trim(),i=n||o||(r?r.slice(0,24):"")||`<${t}>`;return{tagName:t,componentName:i,filePath:"",lineNumber:0,columnNumber:0,stack:[]}}function As(e,t){let n=Pt(e,t);return n?Ei(n)?.element??n:null}function $s(e){Au=e.onStart,$u=e.onMove,Ou=e.onEnd}function Os(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=Hu,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),_e=document.createElement("div"),_e.className="marquee-box",e.appendChild(_e),ot=!0,document.addEventListener("mousedown",nr,!0),document.addEventListener("mousemove",or,!0),document.addEventListener("mouseup",rr,!0),document.addEventListener("keydown",ar,!0),document.addEventListener("click",ir,!0),document.addEventListener("scroll",nt,!0),window.addEventListener("resize",nt),nn=!0}function nr(e){if(!ot||et()||Jo()||e.metaKey||e.ctrlKey)return;let t=As(e.clientX,e.clientY);if(G||_.size>0){let o=ii(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=ll();if(ke=o,lr=r?{...r}:null,_.size>0){gt=[];for(let[i]of _){let a=getComputedStyle(i);gt.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}qn=0,Zn=0}else if(B){let i=getComputedStyle(B);qn=parseFloat(i.width)||B.offsetWidth,Zn=parseFloat(i.height)||B.offsetHeight,gt=[]}D={x:e.clientX,y:e.clientY},be="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!xt(t)){(G||_.size>0)&&(Gl(),G=null,B=null,sr(),Et(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ue(null));return}if(D={x:e.clientX,y:e.clientY},ye=t,Jn=e.shiftKey,!Jn&&(xi(t)||B&&t===B)){be="pending-move";return}be="pending"}function or(e){if(ot&&!et()&&!Jo()){if(be==="resize-drag"&&ke&&D&&lr){e.preventDefault(),e.stopPropagation();let t=e.clientX-D.x,n=e.clientY-D.y;if(gt.length>0){for(let o of gt){let r=o.width,i=o.height;ke==="tr"||ke==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),ke==="bl"||ke==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}Qn()}else{let o=qn,r=Zn;ke==="tr"||ke==="br"?o=Math.max(10,qn+t):o=Math.max(10,qn-t),ke==="bl"||ke==="br"?r=Math.max(10,Zn+n):r=Math.max(10,Zn-n),o=Math.round(o),r=Math.round(r),Bn("width",`${o}px`),Bn("height",`${r}px`),nt()}return}if(be==="pending-move"&&D){let t=Math.abs(e.clientX-D.x),n=Math.abs(e.clientY-D.y);(t>4||n>4)&&(ye&&Ss(D.x,D.y,ye)?(be="move-drag",Fi(e.clientX,e.clientY)):be="marquee");return}if(be==="move-drag"){Fi(e.clientX,e.clientY);return}if(be==="pending"&&D){let t=Math.abs(e.clientX-D.x),n=Math.abs(e.clientY-D.y);(t>10||n>10)&&(be="marquee")}if(be==="marquee"&&D&&_e){let t=Math.min(e.clientX,D.x),n=Math.min(e.clientY,D.y),o=Math.abs(e.clientX-D.x),r=Math.abs(e.clientY-D.y);_e.style.display="block",_e.style.left=`${t}px`,_e.style.top=`${n}px`,_e.style.width=`${o}px`,_e.style.height=`${r}px`;return}if(be==="idle"){if(G&&B||_.size>0){let i=ii(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=As(e.clientX,e.clientY);if(!n||!xt(n)){No(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;No(o,r+2)}}}function rr(e){if(!ot||et()||Jo())return;let t=be;if(be="idle",t==="resize-drag"){document.body.style.cursor="",ke=null,lr=null,D=null,gt.length>0?gt=[]:Yo();return}if(t==="move-drag"){let n=Ns();n&&Fu(n),D=null,ye=null;return}if(t==="pending-move"){ye&&G?St(ye,G):ye&&je(ye),D=null,ye=null;return}if(t==="marquee"&&D){_e&&(_e.style.display="none"),Iu(Math.min(e.clientX,D.x),Math.min(e.clientY,D.y),Math.max(e.clientX,D.x),Math.max(e.clientY,D.y)),D=null,ye=null,Jn=!1;return}ye&&(Jn?Du(ye):(sr(),je(ye))),D=null,ye=null,Jn=!1}async function je(e,t){try{let n=e.getBoundingClientRect();B=e,Bi(n,{}),_u();let o=await Pu(e)??Ru(e);if(!o.filePath&&o.componentName){let r=er(o.componentName);if(r===void 0){let i=await cr(o.componentName);if(tr(o.componentName,i),i&&(o.filePath=i,o.stack))for(let a of o.stack)a.componentName===o.componentName&&!a.filePath&&(a.filePath=i)}else if(r&&(o.filePath=r,o.stack))for(let i of o.stack)i.componentName===o.componentName&&!i.filePath&&(i.filePath=r)}if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o.componentName,o.filePath,"stack:",o.stack?.map(r=>r.componentName)),G={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||St(e,G),Ue({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function Iu(e,t,n,o){let r=Za({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){Nt(),G=null,B=null,Et(null),v&&(v.classList.remove("visible"),v.style.display="none"),_.clear();for(let i of r.slice(0,50)){let a=Rs(i);if(!a)continue;let l=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:l.top,left:l.left,width:l.width,height:l.height}};_.set(i,{element:i,info:c})}if(_.size!==0){if(_.size===1){let[i,a]=[..._.entries()][0];_.clear(),B=i,G=a.info;let l=i.getBoundingClientRect();if(Bi(l,G),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}St(i,G),Ue({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}Qn(),Ue(null),v&&(v.innerHTML=`<span class="comp-name">${_.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Du(e){if(_.has(e)){if(_.delete(e),_.size===1){let[r,i]=[..._.entries()][0];_.clear(),Mn(),B=r,G=i.info;let a=r.getBoundingClientRect();if(Bi(a,G),St(r,G),v){let l=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${l?`<span class="comp-path">${l}</span>`:""}`}Ue({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else _.size===0?(Mn(),Ge()):(Qn(),v&&(v.innerHTML=`<span class="comp-name">${_.size} elements selected</span>`));return}let t=Rs(e);if(!t)return;G&&B&&_.size===0&&(_.set(B,{element:B,info:G}),Nt(),G=null,B=null,Et(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};_.set(e,{element:e,info:o}),Qn(),Ue(null),v&&(v.innerHTML=`<span class="comp-name">${_.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function sr(){_.clear(),Mn()}function Qn(){if(_.size===0){Mn();return}let e=[];for(let[t]of _){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}al(e)}function ir(e){ot&&(et()||e.metaKey||e.ctrlKey||e.preventDefault())}function ar(e){if(ot&&e.key==="Escape"){if(_.size>0){sr(),v&&(v.classList.remove("visible"),v.style.display="none"),Ue(null),e.preventDefault();return}if(G){if(Ul()){Ko(),e.preventDefault();return}Ge(),e.preventDefault()}}}function Bi(e,t){if(B){let n=parseFloat(getComputedStyle(B).borderRadius)||4;Et(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function nt(){if(_.size>0){Qn();return}if(!B||!G)return;let e=B.getBoundingClientRect(),t=parseFloat(getComputedStyle(B).borderRadius)||4;if(Et(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function _u(){No(null)}function Ge(){Nt(),G=null,B=null,ke=null,lr=null,gt=[],sr(),document.body.style.cursor="",Et(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ue(null)}function Ls(){return G}function Hs(){ot=!1,document.removeEventListener("mousedown",nr,!0),document.removeEventListener("mousemove",or,!0),document.removeEventListener("mouseup",rr,!0),document.removeEventListener("keydown",ar,!0),document.removeEventListener("click",ir,!0),document.removeEventListener("scroll",nt,!0),window.removeEventListener("resize",nt),nn=!1,v?.remove(),v=null}function Is(e){e&&!nn?(document.addEventListener("mousedown",nr,!0),document.addEventListener("mousemove",or,!0),document.addEventListener("mouseup",rr,!0),document.addEventListener("keydown",ar,!0),document.addEventListener("click",ir,!0),document.addEventListener("scroll",nt,!0),window.addEventListener("resize",nt),nn=!0,ot=!0):!e&&nn&&(document.removeEventListener("mousedown",nr,!0),document.removeEventListener("mousemove",or,!0),document.removeEventListener("mouseup",rr,!0),document.removeEventListener("keydown",ar,!0),document.removeEventListener("click",ir,!0),document.removeEventListener("scroll",nt,!0),window.removeEventListener("resize",nt),nn=!1,ot=!1)}function ks(){return B??null}async function Fu(e){await je(e,{skipSidebar:!0})}var G,B,ot,nn,_,v,_e,be,D,ye,ke,lr,qn,Zn,gt,Jn,Au,$u,Ou,Hu,en=S(()=>{"use strict";bt();vt();_t();we();Ct();Ja();X();Mo();ki();Gn();Ms();de();zi();We();jn();Br()||Wr({onCommitFiberRoot(){}});G=null,B=null,ot=!1,nn=!1,_=new Map,v=null,_e=null,be="idle",D=null,ye=null,ke=null,lr=null,qn=0,Zn=0,gt=[],Jn=!1,Au=null,$u=null,Ou=null,Hu=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${H.sm};
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
    color: ${s.textPrimary};
    font-size: 12px;
    font-weight: 600;
  }
  .selection-label .comp-path {
    color: ${s.textSecondary};
    font-size: 11px;
    margin-left: 8px;
  }
  .selection-label .loading-dots {
    color: ${s.textTertiary};
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
    border: 1px solid ${s.accent};
    background: ${s.accentSoft};
    border-radius: 2px;
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`});function Wi(e){return eo.push(e),()=>{eo=eo.filter(t=>t!==e)}}function At(){eo.forEach(e=>e())}function Ne(e){let t=crypto.randomUUID(),n={...e,id:t,timestamp:Date.now()};return Fe.set(t,n),At(),t}function Vu(e){let t=Fe.get(e);if(!(!t||t.state==="reverted")){switch(t.revertData.type){case"noop":return;case"cliUndo":case"generateUndo":pr.add(e),re({type:"revertChanges",undoIds:t.revertData.undoIds});break;case"moveRemove":{let{moveId:n}=t.revertData;Promise.resolve().then(()=>(de(),Bo)).then(({removeMove:o})=>{o(n)}),ur(t);break}case"moveRestore":{let{moveId:n,previousDelta:o}=t.revertData;Promise.resolve().then(()=>(de(),Bo)).then(({restoreMoveDelta:r})=>{r(n,o)}),ur(t);break}case"annotationRemove":{let{annotationId:n,originalInnerHTML:o}=t.revertData;Promise.resolve().then(()=>(de(),Bo)).then(({removeAnnotation:r})=>{r(n)}),ur(t);break}}t.state="reverted",At()}}function ji(){let e=0;for(let t of Fe.values())t.state!=="reverted"&&e++;return e}function oo(){return on}function ro(e){on=e,At()}function zu(){Fe.clear(),At()}function _s(){let e=!1;for(let t of Fe.values())t.state==="pending"&&(t.state="active",e=!0);e&&At()}function Fs(){let e=!1;for(let[t,n]of Fe)n.state==="pending"&&(Fe.delete(t),e=!0);e&&At()}function Wu(e){let t=Math.floor((Date.now()-e)/1e3);if(t<10)return"just now";let n=Math.floor(t/60),o=t%60;return`${n}:${String(o).padStart(2,"0")} ago`}function ju(e){return e.split("/").pop()??e}function no(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ds(e){return!!e.elementIdentity}function Gu(e){return e.state!=="reverted"&&e.revertData.type!=="noop"}function Uu(e){let t=no(e.summary).replaceAll(" \u2192 ",'<span class="arrow"> \u2192 </span>');return`<span class="component-name">${no(e.componentName)}</span><span class="entry-separator">\u2022</span>${t}`}function ur(e){Ne({type:e.type,componentName:e.componentName,filePath:e.filePath,summary:`reverted ${e.summary}`,state:"active",propertyKey:e.propertyKey,elementIdentity:e.elementIdentity,revertData:{type:"noop"}})}async function Yu(e){let t=Fe.get(e),n=t?.elementIdentity;if(!t||!n)return;let o=jt(n);if(o||(o=await Ao(n)),!o){R(`Couldn't find ${t.componentName}`);return}await je(o,{skipSidebar:!1})}function Ku(){if(!rt)return;let e=Array.from(Fe.values()).reverse();if(e.length===0){rt.innerHTML='<div class="changelog-empty">No logs yet. Changes will appear here.</div>';return}rt.innerHTML=e.map(o=>{let r=["changelog-entry",Ds(o)?"selectable":"",o.state==="reverted"?"reverted":"",o.state==="pending"?"pending":""].filter(Boolean).join(" "),i=o.filePath?ju(o.filePath):"",a=Wu(o.timestamp);return`<div class="${r}" data-entry-id="${no(o.id)}">
  <span class="entry-summary">${Uu(o)}</span>
  ${i?`<span class="entry-file" title="${no(i)}">${no(i)}</span>`:""}
  <span class="entry-time">${a}</span>
  ${Gu(o)?'<button class="entry-revert" title="Revert this change">\u21A9</button>':""}
</div>`}).join("");let t=Array.from(rt.querySelectorAll(".entry-revert"));for(let o of t){let i=o.closest(".changelog-entry")?.dataset.entryId;i&&o.addEventListener("click",a=>{a.stopPropagation(),Vu(i)})}let n=Array.from(rt.querySelectorAll(".changelog-entry"));for(let o of n){let r=o.dataset.entryId;if(!r)continue;let i=Fe.get(r);!i||!Ds(i)||o.addEventListener("click",()=>{Yu(r)})}}function Xu(){if(!it)return;let e=ji();e===0?it.classList.add("hidden"):(it.classList.remove("hidden"),it.textContent=String(e))}function Vs(e){to=document.createElement("style"),to.textContent=Bu,e.appendChild(to),ue=document.createElement("div"),ue.className="changelog-panel",ue.style.display="none";let t=document.createElement("div");t.className="changelog-header";let n=document.createElement("div");n.className="changelog-header-main";let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("changelog-header-icon"),o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.7"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.innerHTML='<path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path>';let r=document.createElement("span");r.className="changelog-title",r.textContent="Logs",it=document.createElement("span"),it.className="changelog-badge hidden",it.textContent="0";let i=document.createElement("span");i.className="changelog-header-copy",i.textContent="Latest changes",Rt=document.createElement("svg"),Rt.className="changelog-chevron",Rt.setAttribute("viewBox","0 0 16 16"),Rt.setAttribute("fill","currentColor"),Rt.innerHTML='<path d="M3.5 5.5L8 10l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',n.appendChild(o),n.appendChild(r),n.appendChild(it),n.appendChild(i),t.appendChild(n),t.appendChild(Rt),t.addEventListener("click",()=>ro(!on)),ue.appendChild(t),rt=document.createElement("div"),rt.className="changelog-body",ue.appendChild(rt),e.appendChild(ue);let a=Wi(()=>{Ku(),Xu(),ue&&(on&&ue.style.display==="none"?(ue.style.display="",requestAnimationFrame(()=>{requestAnimationFrame(()=>{ue?.classList.add("visible")})})):on||(ue.style.display="none",ue.classList.remove("visible")),ue.classList.toggle("collapsed",!on))});dr=ge(c=>{if(c.type==="revertComplete"){for(let[d,u]of Fe){if(!pr.has(d))continue;let m=u.revertData;if(m.type!=="cliUndo"&&m.type!=="generateUndo")continue;let f=c.results.filter(p=>m.undoIds.includes(p.undoId));f.length!==0&&(pr.delete(d),f.every(p=>p.success)?ur(u):(u.state="active",At()))}for(let d of c.results)!d.success&&d.error&&R(`Revert failed: ${d.error}`)}});let l=mr;mr=()=>{l(),a()}}function zs(){dr&&(dr(),dr=null),mr(),mr=()=>{},ue?.remove(),ue=null,to?.remove(),to=null,rt=null,it=null,Rt=null,pr.clear(),zu(),eo=[]}var Fe,on,pr,eo,ue,rt,it,Rt,dr,to,Bu,mr,Mt=S(()=>{"use strict";We();X();we();en();Pn();Fe=new Map,on=!1,pr=new Set,eo=[];ue=null,rt=null,it=null,Rt=null,dr=null,to=null,Bu=`
  .changelog-panel {
    position: fixed;
    top: 16px;
    right: 16px;
    bottom: 16px;
    width: 380px;
    max-width: min(380px, calc(100vw - 32px));
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${L.lg};
    box-shadow: ${H.lg};
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
    border-bottom: 1px solid ${s.border};
    background: ${s.bgSecondary};
    transition: background ${C.fast};
    flex-shrink: 0;
  }
  .changelog-header:hover {
    background: ${s.bgTertiary};
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
    color: ${s.accent};
    flex-shrink: 0;
  }
  .changelog-title {
    font-size: 13px;
    font-weight: 600;
    color: ${s.textPrimary};
  }
  .changelog-badge {
    background: ${s.accent};
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
    color: ${s.textTertiary};
    font-size: 11px;
  }
  .changelog-chevron {
    width: 14px;
    height: 14px;
    color: ${s.textTertiary};
    transition: transform ${C.medium};
    flex-shrink: 0;
  }
  .changelog-panel:not(.collapsed) .changelog-chevron {
    transform: rotate(180deg);
  }
  .changelog-body {
    flex: 1;
    overflow-y: auto;
    background: ${s.bgPrimary};
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
    border-bottom: 1px solid ${s.border};
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
    background: ${s.bgTertiary};
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
    color: ${s.textSecondary};
    min-width: 0;
    line-height: 1.3;
  }
  .component-name {
    color: ${s.textPrimary};
    font-weight: 600;
  }
  .entry-separator {
    color: ${s.textTertiary};
    margin: 0 6px;
  }
  .arrow {
    color: ${s.textTertiary};
  }
  .entry-file {
    color: ${s.textTertiary};
    flex-shrink: 0;
    font-size: 11px;
    max-width: 96px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .entry-time {
    color: ${s.textTertiary};
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
    color: ${s.accent};
    font-size: 14px;
    border-radius: ${L.xs};
    opacity: 0;
    transition: opacity ${C.fast}, background ${C.fast};
  }
  .changelog-entry:hover .entry-revert {
    opacity: 1;
  }
  .entry-revert:hover {
    background: ${s.accentSoft};
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
    color: ${s.textTertiary};
    text-align: center;
  }
`;mr=()=>{}});function Bs(e){return`${e.componentName}:${e.filePath}:${e.lineHint}:${e.tag}`}function Ws(e){an=e}function Zu(e){switch(e.type){case"property":return e.updates.map(t=>`${t.oldClass||"none"} \u2192 ${t.newClass}`).join(", ");case"text":return`"${e.originalText.slice(0,20)}" \u2192 "${e.newText.slice(0,20)}"`;case"reorder":return`reorder children (${e.fromIndex+1} \u2192 ${e.toIndex+1})`;case"move":return`move (${Math.round(e.delta.dx)}px, ${Math.round(e.delta.dy)}px)`}}function mt(e){if(!e.filePath){R("Cannot track changes \u2014 source file not resolved","warning");return}let t=Bs(e),n=at.get(t);if(n&&n.type==="property"&&e.type==="property")for(let o of e.updates){let r=n.updates.findIndex(i=>i.cssProperty===o.cssProperty);r>=0?n.updates[r]=o:n.updates.push(o)}else at.set(t,e);an?.(at.size),Ne({type:e.type==="reorder"?"property":e.type==="move"?"move":e.type==="text"?"textEdit":"property",componentName:e.componentName,filePath:e.filePath,summary:Zu(e),state:"pending",revertData:{type:"noop"}})}function Ui(){return rn}function Ju(){return[...at.values()]}function Gi(){at.clear(),an?.(0)}function Xl(e,t,n){let o=Bs(e);io.set(o,{element:t,overrides:new Map(n)})}function js(){Fs();for(let[,{element:e,overrides:t}]of io)for(let[n,o]of t)e.style[n]=o;io.clear(),Gi(),R("Discarded all pending changes","info")}function Gs(){if(at.size===0||rn)return;rn=!0,an?.(at.size);let e=Ju();re({type:"applyAllChanges",changes:e}),fr=setTimeout(()=>{rn&&(rn=!1,an?.(at.size),R("Apply timed out \u2014 changes still pending, try again","error"))},qu)}var qu,at,rn,fr,an,io,qt=S(()=>{"use strict";We();we();Mt();qu=3e4,at=new Map,rn=!1,fr=null,an=null;io=new Map;Us(e=>{rn=!1,fr&&(clearTimeout(fr),fr=null),e.success?(_s(),io.clear(),Gi(),R(`Applied ${e.appliedCount} change${e.appliedCount===1?"":"s"}`,"success")):e.appliedCount>0?(io.clear(),R(`Applied ${e.appliedCount}, failed ${e.failedCount}`,"warning"),Gi()):R(e.error||"Failed to apply changes","error"),an?.(at.size)})});var Xs={};va(Xs,{destroyToolbar:()=>Zi,getShadowRoot:()=>q,hideGenerateButton:()=>tp,mountToolbar:()=>qi,setOnCanvasUndo:()=>Qi,setOnGenerate:()=>Ji,showToast:()=>R,updateComponentDetail:()=>Ue,updateGenerateButton:()=>lo});function qi(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),sn=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=ep;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${Ki}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <div class="pending-actions" style="display:none">
      <button class="confirm-btn" title="Confirm Changes">Confirm Changes</button>
      <button class="discard-btn" title="Discard all pending changes">\u2715</button>
    </div>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${Qu}
    </button>
  `,sn.appendChild(n),sn.appendChild(o),Q=o.querySelector(".undo-btn"),cn=o.querySelector(".generate-btn");let r=o.querySelector(".close-btn");ln=o.querySelector(".component-detail"),$t=document.createElement("div"),$t.className="toast",sn.appendChild($t),Q.addEventListener("click",()=>{re({type:"undo"}),Q&&(Q.innerHTML='<div class="spinner"></div>',Q.disabled=!0)}),r.addEventListener("click",e),cn.addEventListener("click",()=>{Xi&&Xi()});let i=o.querySelector(".pending-actions"),a=o.querySelector(".confirm-btn"),l=o.querySelector(".discard-btn");Ws(c=>{c>0&&!Ui()?(i.style.display="flex",a.textContent=`Confirm Changes (${c})`,a.disabled=!1):Ui()?(i.style.display="flex",a.textContent="Applying...",a.disabled=!0,l.style.display="none"):(i.style.display="none",l.style.display="inline-block")}),a.addEventListener("click",()=>{Gs()}),l.addEventListener("click",()=>{js()}),document.addEventListener("keydown",c=>{c.key==="z"&&(c.ctrlKey||c.metaKey)&&!c.shiftKey&&!np()&&Ks?.()&&c.preventDefault()}),qs(()=>{R("Disconnected. Click to reconnect."),Qs()}),Zs(()=>{R("Disconnected: another tab took over")}),Js(()=>{ao=0,Q&&(Q.disabled=!0)}),ge(c=>{switch(c.type){case"reorderComplete":c.success?(ao++,Q&&(Q.innerHTML=Ys,setTimeout(()=>{Q&&(Q.innerHTML=Ki,Q.disabled=!1)},200))):c.error&&R(c.error);break;case"undoComplete":c.success?(ao=Math.max(0,ao-1),Q&&(Q.innerHTML=Ys,setTimeout(()=>{Q&&(Q.innerHTML=Ki,Q.disabled=ao===0)},200))):c.error&&R(c.error);break;case"devServerDisconnected":R("Dev server disconnected");break;case"devServerReconnected":R("Dev server reconnected");break}})}function Zi(){let e=document.getElementById("frameup-root");e&&e.remove(),sn=null,Q=null}function q(){return sn}function Ji(e){Xi=e}function Qi(e){Ks=e}function lo(e){cn&&(cn.disabled=!e)}function tp(){cn&&(cn.style.display="none")}function Ue(e){if(!ln)return;if(!e){ln.className="component-detail empty",ln.textContent="No selection";return}ln.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";ln.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function R(e,t="info"){$t&&($t.textContent=e,$t.classList.add("visible"),Yi&&clearTimeout(Yi),Yi=setTimeout(()=>{$t?.classList.remove("visible")},2e3))}function np(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var sn,Q,ao,$t,Yi,ln,cn,Xi,Ks,Ki,Qu,Ys,ep,we=S(()=>{"use strict";We();X();qt();sn=null,Q=null,ao=0,$t=null,Yi=null,ln=null,cn=null,Xi=null,Ks=null,Ki='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',Qu='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',Ys='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',ep=`
  :host {
    all: initial;
  }
  ${Sa}
  .toolbar {
    position: fixed;
    bottom: 16px;
    left: 76px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${L.md};
    font-family: ${x};
    font-size: 12px;
    color: ${s.textPrimary};
    box-shadow: ${H.md};
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
    background: ${s.border};
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
    color: ${s.textSecondary};
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
    background: ${s.bgSecondary};
    color: ${s.textPrimary};
  }
  .icon-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .icon-btn.active {
    color: ${s.accent};
  }
  .close-btn {
    color: ${s.textTertiary};
  }
  .close-btn:hover {
    background: ${s.dangerSoft};
    color: ${s.danger};
  }
  .generate-btn {
    background: ${s.accent};
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
    background: ${s.accentHover};
  }
  .generate-btn:disabled {
    background: ${s.bgTertiary};
    color: ${s.textTertiary};
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
    color: ${s.accent};
    font-size: 11px;
    font-weight: 600;
    font-family: monospace;
    flex-shrink: 0;
  }
  .component-detail .name {
    color: ${s.textPrimary};
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .component-detail .path {
    color: ${s.textTertiary};
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .component-detail.empty {
    color: ${s.textTertiary};
    font-size: 12px;
  }
  .toast {
    position: fixed;
    bottom: 68px;
    left: 76px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    color: ${s.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: ${x};
    box-shadow: ${H.md};
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
    border: 2px solid ${s.border};
    border-top-color: ${s.textSecondary};
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  .pending-actions {
    display: none;
    align-items: center;
    gap: 4px;
  }
  .confirm-btn {
    background: ${s.accent};
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
  .confirm-btn:hover { background: ${s.accentHover}; }
  .confirm-btn:disabled { background: ${s.bgTertiary}; color: ${s.textTertiary}; cursor: wait; }
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
`});function ql(e){ia=e}function Us(e){aa=e}function gr(e){ve&&ve.readyState===WebSocket.OPEN||(ra=e,ve=new WebSocket(`ws://localhost:${e}`),ve.onopen=()=>{let t=dn>0;dn=0,t&&oa&&oa()},ve.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Ea(n.tokens),n.type==="updatePropertyComplete"&&ia&&ia(n.success,n.errorCode,n.error),n.type==="config"&&(wa(n.hasApiKey),n.hasApiKey&&Promise.resolve().then(()=>(we(),Xs)).then(o=>o.hideGenerateButton())),n.type==="applyAllComplete"&&aa&&aa(n),so.forEach(o=>o(n))}catch{}},ve.onclose=t=>{if(ve=null,t.code===4001){na&&na();return}if(dn<op){let n=500*Math.pow(2,dn);dn++,ea=setTimeout(()=>gr(e),n)}else ta&&ta()},ve.onerror=()=>{})}function re(e){ve&&ve.readyState===WebSocket.OPEN&&ve.send(JSON.stringify(e))}function ge(e){return so.push(e),()=>{so=so.filter(t=>t!==e)}}function ec(){ea&&clearTimeout(ea),ve&&(ve.close(),ve=null),so=[]}function cr(e){return new Promise(t=>{let n=ge(o=>{o.type==="discoverFileResult"&&o.componentName===e&&(n(),t(o.filePath))});re({type:"discoverFile",componentName:e}),setTimeout(()=>{n(),t(null)},5e3)})}function qs(e){ta=e}function Zs(e){na=e}function Js(e){oa=e}function Qs(){ra&&(dn=0,gr(ra))}var ve,so,dn,op,ea,ta,na,oa,ra,ia,aa,We=S(()=>{"use strict";yn();It();ve=null,so=[],dn=0,op=5,ea=null,ta=null,na=null,oa=null,ra=null,ia=null;aa=null});We();we();en();Mo();bt();We();en();we();qt();It();var Ce=null,xe=null,Pe=null,la=null,co=!1,un=null,hr=[],uo=new Map,yr=!1,rp=`
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
`,ht=null;function tc(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=rp,e.appendChild(t),$s({onStart:ip,onMove:ap,onEnd:lp}),ge(n=>{n.type==="reorderComplete"&&(pn(),Ge())})}function ip(e,t,n){Pe=n,la=t,un={x:e.clientX,y:e.clientY},co=!1,yr=!1,hr=[],uo=new Map,ht=null;let o=q();if(!o)return;Ce=document.createElement("div"),Ce.className="drag-preview";let r=t.getBoundingClientRect();Ce.style.width=`${r.width}px`,Ce.style.height=`${r.height}px`,Ce.innerHTML=t.outerHTML,o.appendChild(Ce),xe=document.createElement("div"),xe.className="drop-indicator",o.appendChild(xe);let i=n.stack[1];if(!i?.filePath){R("Can't reorder this element"),pn();return}re({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=ge(l=>{if(l.type!=="siblingsList")return;a(),hr=l.siblings;let c=document.querySelectorAll("*");for(let d of c){if(d.closest("#frameup-root"))continue;let u=ne(d);if(!u)continue;let m=u;for(;m;){if(fe(m)){let f=m._debugSource||m._debugOwner?._debugSource;if(f){for(let p of l.siblings)f.lineNumber===p.lineNumber&&f.fileName===i.filePath&&uo.set(p.lineNumber,{el:d,rect:d.getBoundingClientRect()});break}}m=m.return}}yr=!0})}function ap(e){if(!un)return;let t=Math.abs(e.clientX-un.x),n=Math.abs(e.clientY-un.y);if(t<5&&n<5||(co=!0,Ce&&(Ce.style.display="block",Ce.style.left=`${e.clientX+10}px`,Ce.style.top=`${e.clientY+10}px`),!yr||!Pe))return;let o=null,r=1/0,i=0,a=0,l=0;for(let c of hr){if(c.lineNumber===Pe.lineNumber)continue;let d=uo.get(c.lineNumber);if(!d)continue;let u=d.rect,m=u.top+u.height/2,f=Math.abs(e.clientY-m);f<r&&(r=f,o=c,e.clientY<m?i=u.top-2:i=u.bottom+2,a=u.left,l=u.width)}ht=o,o&&xe?(xe.style.display="block",xe.style.top=`${i}px`,xe.style.left=`${a}px`,xe.style.width=`${l}px`):xe&&(xe.style.display="none")}function lp(e){if(!co||!ht||!Pe){pn();return}if(!Pe.filePath){R("Can't reorder this element"),pn();return}if(qe()){let t=la,n=t?.parentElement,r=(n?Array.from(n.children):[]).map(l=>({tag:l.tagName.toLowerCase(),className:l.className||"",textContent:(l.textContent||"").slice(0,30)})),i=t&&n?Array.from(n.children).indexOf(t):0,a=i;if(ht&&n){let l=uo.get(ht.lineNumber)?.el;if(l){let c=Array.from(n.children).indexOf(l);c>=0&&(a=c)}}mt({type:"reorder",componentName:Pe.componentName,tag:t?.tagName.toLowerCase()||"div",filePath:Pe.filePath,parentClassName:n?.className||"",lineHint:Pe.lineNumber,childrenContext:r,fromIndex:i,toIndex:a}),pn();return}re({type:"reorder",filePath:Pe.filePath,fromLine:Pe.lineNumber,toLine:ht.lineNumber,fromComponent:Pe.componentName,toComponent:ht.componentName}),Ce&&(Ce.style.display="none"),xe&&(xe.style.display="none"),co=!1,un=null}function pn(){Ce?.remove(),xe?.remove(),Ce=null,xe=null,Pe=null,la=null,co=!1,un=null,yr=!1,hr=[],uo=new Map,ht=null}function nc(){pn()}we();X();de();var sa="http://www.w3.org/2000/svg",mn=null,Re=null,ca=null;function oc(){let e=q();e&&(mn=document.createElementNS(sa,"svg"),mn.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Re=document.createElementNS(sa,"g"),Re.setAttribute("class","annotation-root"),mn.appendChild(Re),e.appendChild(mn),window.addEventListener("scroll",br,{passive:!0}),ca=Dn(br),br())}function br(){if(!Re)return;let{scale:e,offsetX:t,offsetY:n}=Be();Re.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function rc(e,t,n,o,r,i){if(!Re)return null;let a=document.createElementNS(sa,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let l=document.createElement("div");return l.style.cssText=`
    background: ${s.bgPrimary};
    color: ${s.textPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${H.sm};
    padding: 4px 8px;
    border-radius: ${L.sm};
    font-size: ${r}px;
    font-family: ${x};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,l.textContent=o,a.appendChild(l),Re.appendChild(a),a}function ic(e){if(!Re)return;let t=Re.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function da(){Re&&(Re.innerHTML="")}function ac(){window.removeEventListener("scroll",br),ca?.(),ca=null,mn?.remove(),mn=null,Re=null}Pn();de();we();X();li();Xo();jn();Mt();var fn={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',logs:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},lc=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",ua=navigator.platform.includes("Mac")?"Cmd":"Ctrl",ga=[{type:"select",icon:fn.pointer,label:"Select",shortcut:"S"},{type:"text",icon:fn.text,label:"Text",shortcut:"T"}],sp=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${L.lg};
    box-shadow: ${H.md};
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
    background: ${s.border};
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
    color: ${s.textSecondary};
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
    background: ${s.bgSecondary};
    color: ${s.textPrimary};
  }
  .tool-btn.active {
    background: ${s.accentSoft};
    color: ${s.accent};
    border-left-color: ${s.accent};
    border-radius: 0 50% 50% 0;
  }
  .tool-btn .tooltip {
    display: none;
    position: absolute;
    left: 44px;
    top: 50%;
    transform: translateY(-50%);
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${H.sm};
    color: ${s.textPrimary};
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
    background: ${s.bgSecondary};
    color: ${s.textTertiary};
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
    border-top: 1px solid ${s.border};
    border-bottom: 1px solid ${s.border};
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
    box-shadow: ${H.sm};
  }
  .segmented-control {
    display: flex;
    background: ${s.bgSecondary};
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
    color: ${s.textSecondary};
    font-size: 10px;
    font-family: ${x};
    cursor: pointer;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast}, box-shadow ${C.fast};
  }
  .segment.active {
    background: ${s.bgPrimary};
    color: ${s.textPrimary};
    box-shadow: ${H.sm};
  }
  .action-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${s.textSecondary};
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
    background: ${s.bgSecondary};
    color: ${s.textPrimary};
  }
  .action-btn.active {
    background: ${s.accentSoft};
    color: ${s.accent};
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
    background: ${s.accent};
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
    background: ${s.dangerSoft};
    color: ${s.danger};
  }
  .help-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${s.textTertiary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: ${x};
    transition: background ${C.fast}, color ${C.fast};
  }
  .help-btn:hover {
    background: ${s.bgSecondary};
    color: ${s.textPrimary};
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
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${L.lg};
    box-shadow: ${H.lg};
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
    color: ${s.textPrimary};
    margin: 0 0 16px 0;
  }
  .shortcuts-section {
    margin-bottom: 14px;
  }
  .shortcuts-section-label {
    font-size: 10px;
    font-weight: 600;
    color: ${s.textTertiary};
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
    color: ${s.textPrimary};
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
    background: ${s.bgSecondary};
    border: 1px solid ${s.border};
    border-radius: 5px;
    font-size: 11px;
    font-family: ${x};
    color: ${s.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${s.textTertiary};
  }
`,Ee=null,Ae=null,xr=new Map,Ye=null,Ke=null,po=null,pa=null,ma=null,fa=null;function cc(e){pa=e}function dc(e){ma=e}function uc(e){Ye&&(Ye.disabled=!e)}function sc(){if(!Ke||!po)return;let e=ji();Ke.classList.toggle("active",oo()),po.classList.toggle("hidden",e===0),po.textContent=String(e)}function pc(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=sp,e.appendChild(t),Ee=document.createElement("div"),Ee.className="tools-panel";let n=[["select","text"]];for(let l=0;l<n.length;l++){if(l>0){let c=document.createElement("div");c.className="tool-divider",Ee.appendChild(c)}for(let c of n[l]){let d=ga.find(f=>f.type===c),u=document.createElement("button");u.className=`tool-btn${d.type==="select"?" active":""}`,u.innerHTML=`${d.icon}<span class="tooltip">${d.label}<span class="shortcut-badge">${lc}${d.shortcut}</span></span>`,u.addEventListener("click",()=>Io(d.type));let m=null;u.addEventListener("mouseenter",()=>{m=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{m&&clearTimeout(m),u.classList.remove("tooltip-visible")}),Ee.appendChild(u),xr.set(d.type,u)}}Ae=document.createElement("div"),Ae.className="sub-options hidden",Ee.appendChild(Ae);let o=document.createElement("div");o.className="tool-divider",Ee.appendChild(o),Ye=document.createElement("button"),Ye.className="action-btn",Ye.innerHTML=fn.undo,Ye.title="Undo (Ctrl+Z)",Ye.disabled=!0,Ye.addEventListener("click",()=>{ma&&ma()}),Ee.appendChild(Ye),Ke=document.createElement("button"),Ke.className="action-btn has-badge",Ke.innerHTML=`${fn.logs}<span class="action-badge hidden">0</span>`,Ke.title="Logs",Ke.addEventListener("click",()=>{ro(!oo())}),po=Ke.querySelector(".action-badge"),Ee.appendChild(Ke);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=fn.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{pa&&pa()}),Ee.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=fn.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{ls(),i.style.color=as()?s.accent:""}),Ee.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${lc}/)`,a.addEventListener("click",()=>fc()),Ee.appendChild(a),e.appendChild(Ee),document.addEventListener("keydown",mc,!0),fa=Wi(sc),sc()}function mc(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||et()||e.ctrlKey||e.metaKey||e.altKey)return;let n=e.key.toUpperCase();if(e.key==="?"){fc(),e.preventDefault();return}let o=ga.find(r=>r.shortcut===n);o&&(Io(o.type),e.preventDefault())}var Xe=null,mo=null;function fc(){Xe?vr():cp()}function cp(){let e=q();if(!e||Xe)return;Xe=document.createElement("div"),Xe.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:ga.map(r=>({action:r.label,keys:[r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[ua,"Z"]},{action:"Toggle Logs",keys:[ua,"Shift","L"]},{action:"Keyboard Shortcuts",keys:["?"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Space","Drag"]},{action:"Zoom",keys:[ua,"Scroll"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let l of r.items){let c=document.createElement("div");c.className="shortcut-row";let d=document.createElement("span");d.className="shortcut-action",d.textContent=l.action,c.appendChild(d);let u=document.createElement("span");u.className="shortcut-keys";for(let m=0;m<l.keys.length;m++){if(m>0){let p=document.createElement("span");p.className="shortcut-plus",p.textContent="+",u.appendChild(p)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=l.keys[m],u.appendChild(f)}c.appendChild(u),i.appendChild(c)}t.appendChild(i)}Xe.appendChild(t),Xe.addEventListener("click",r=>{r.target===Xe&&vr()}),e.appendChild(Xe),mo=r=>{vr()},document.addEventListener("keydown",mo,!0)}function vr(){mo&&(document.removeEventListener("keydown",mo,!0),mo=null),Xe?.remove(),Xe=null}function gc(e){for(let[t,n]of xr)n.classList.toggle("active",t===e);dp(e)}function dp(e){if(Ae&&(Ae.innerHTML="",Ae.classList.add("hidden"),Ae.classList.remove("visible"),e==="text")){Ae.classList.remove("hidden"),requestAnimationFrame(()=>Ae?.classList.add("visible"));let t=Gt(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();ko({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Do("textColor",i),n.style.background=i},onClose(){}})}),Ae.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Do("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}Ae.appendChild(o)}}function hc(e){let t=xr.get(e);t&&(t.style.backgroundColor=s.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function yc(){document.removeEventListener("keydown",mc,!0),fa?.(),fa=null,vr(),Ee?.remove(),Ee=null,Ae=null,Ye=null,Ke=null,po=null,xr.clear()}Gn();Pi();Ct();Si();de();ki();de();bt();vt();_t();Ct();Gn();zi();We();async function bc(e,t){let n=Pt(e,t);if(!n)return null;let o=ne(n);if(!o)return null;let r=null;try{let i=await $e(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let l=a.functionName;if(l[0]!==l[0].toUpperCase()||Je(l))continue;let c=Oe(a.fileName);r={componentName:l,filePath:c,lineNumber:a.lineNumber??0};break}}catch{}if(!r){let i=o;for(;i;){if(fe(i)){let a=ae(i.type);if(a&&a[0]===a[0].toUpperCase()&&!Je(a)){let l=i._debugSource||i._debugOwner?._debugSource;r={componentName:a,filePath:l?.fileName||"",lineNumber:l?.lineNumber||0};break}}i=i.return}}if(r&&!r.filePath&&r.componentName){let i=er(r.componentName);if(i===void 0){let a=await cr(r.componentName);tr(r.componentName,a),a&&(r.filePath=a)}else i&&(r.filePath=i)}return r}X();var ce=null,Ot=null,Cr=null,xc={onMouseDown(e){if(ce){vc();return}let t=Ut(e.clientX,e.clientY);Ot={pageX:t.x,pageY:t.y},bc(e.clientX,e.clientY).then(n=>{Cr=n}),ce=document.createElement("input"),ce.type="text",ce.placeholder="Type annotation...",ce.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${s.bgPrimary};
      color: ${s.textPrimary};
      border: 1.5px solid ${s.accent};
      border-radius: ${L.sm};
      padding: 4px 8px;
      font-size: ${Gt().fontSize}px;
      font-family: ${x};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${s.accentSoft};
    `,ce.setAttribute("data-frameup-overlay","true"),ce.addEventListener("keydown",n=>{n.key==="Enter"&&(vc(),n.preventDefault()),n.key==="Escape"&&(Cc(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(ce),ce.focus()},onMouseMove(){},onMouseUp(){}};function vc(){if(!ce||!Ot)return;let e=ce.value.trim();if(ce.remove(),ce=null,!e)return;let t=Gt(),n=crypto.randomUUID();rc(n,Ot.pageX,Ot.pageY,e,t.fontSize,t.textColor),yi({type:"text",id:n,position:Ot,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:Cr}),Ot=null,Cr=null}function Cc(){ce&&(ce.remove(),ce=null),Ot=null,Cr=null}function Ec(){Cc()}jn();Xo();X();Mt();var Ht=null,fo=null;function Tc(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function up(e){let t=q();if(!t)return;Ht&&Ht.parentNode&&Ht.parentNode.removeChild(Ht),fo&&clearTimeout(fo);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${x}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${L.sm}`,`box-shadow: ${H.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${C.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${x}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${L.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),fo&&clearTimeout(fo),Ht=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),Ht=n,requestAnimationFrame(()=>{n.style.opacity="1"}),fo=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),Ht=null},8e3)}function ha(e){console.error("[FrameUp]",e),up("FrameUp encountered an error. Your app is unaffected.")}function pp(){window.addEventListener("error",e=>{Tc(e.error??e.message)&&(ha(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{Tc(e.reason)&&(ha(e.reason),e.preventDefault())})}var ya=null;function wc(e,t,n){t.originalCssText=n.style.cssText,t.element=n,ut(t)}function mp(){if(window!==window.top)return;let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;gr(e),qi(fp);let t=q();t&&(jl(t),Vs(t)),Os(),rl(),tc(),oc(),bi(r=>ic(r)),ya=new MutationObserver(()=>{for(let[r,i]of fi())document.contains(i.element)||setTimeout(()=>{let a=jt(i.identity);if(a){wc(r,i,a);return}Ao(i.identity).then(l=>{l?wc(r,i,l):(_o(r),R(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),ya.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("keydown",r=>{(r.metaKey||r.ctrlKey)&&r.shiftKey&&r.key==="l"&&(r.preventDefault(),ro(!oo()))}),pc(),ss(),bs(),Dl(),ys("text",xc),pi((r,i)=>{Fn(),hc(r),i==="text"&&Ec(),Zt(),Zr(),Is(r==="select"),Zo(r),gc(r)}),mi(()=>{lo(zo()),uc(Ti())}),dc(()=>{let r=Vo();r&&R(`Undo: ${r}`)});let n=!1,o=0;Ji(()=>{if(n){R("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);R(`Please wait ${a}s before retrying`);return}let i=wi();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length&&!i.textEdits.length){R("Nothing to confirm \u2014 make some visual changes first");return}n=!0,lo(!1),R("Generating..."),re({type:"generate",annotations:i})}),ge(r=>{if(r.type==="generateProgress"&&R(r.message),r.type==="generateComplete")if(n=!1,lo(zo()),r.success){let i=r.changes.length;Ne({type:"generate",componentName:"AI Generate",filePath:r.changes[0]?.filePath||"",summary:`${i} file${i!==1?"s":""} changed`,state:"active",revertData:{type:"generateUndo",undoIds:r.undoIds||[]}});let a=r.changes.map(l=>l.description||l.filePath).join(", ");R(`Applied: ${a}`),Ge(),da(),_n()}else R(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),Qi(()=>{let r=Vo();return r?(R(`Undo: ${r}`),!0):!1}),cc(()=>{Ge(),da(),_n(),is(),updateEyeButton(!0),R("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function fp(){Zt(),Zr(),Hs(),sl(),nc(),Kl(),ac(),ya?.disconnect(),yc(),zs(),cs(),Es(),_n(),Oi(),ec(),Zi()}function Sc(){try{mp(),pp()}catch(e){ha(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Sc):Sc();})();
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
