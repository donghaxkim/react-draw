"use strict";var FrameUp=(()=>{var al=Object.defineProperty;var ve=(e,t)=>()=>(e&&(t=e(e=0)),t);var sl=(e,t)=>{for(var n in t)al(e,n,{get:t[n],enumerable:!0})};function Ti(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${c.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function Fo(e){if(Ln&&Ln.size===e)return Ln.uri;let t=Math.max(e,2),n=t*2+4,o=n/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${n}' height='${n}'><circle cx='${o}' cy='${o}' r='${t}' fill='none' stroke='${c.accent}' stroke-width='1.5'/></svg>`)}") ${o} ${o}, crosshair`;return Ln={size:e,uri:r},r}var c,R,L,M,C,Ci,Ln,Y=ve(()=>{"use strict";c={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},R={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},L={xs:"4px",sm:"6px",md:"10px",lg:"14px"},M={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},C="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Ci=`
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
`;Ln=null});var Wo,qt,Ai,hl,Ut,$i,On,Hi,Oi,Xt,An,Xe,Go,Kt,Yo,Tt,jo,$n,Zt=ve(()=>{"use strict";Wo="0.5.32",qt=`bippy-${Wo}`,Ai=Object.defineProperty,hl=Object.prototype.hasOwnProperty,Ut=()=>{},$i=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},On=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Hi=!1,Xt=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Hi?!0:(e&&typeof e.inject=="function"&&(Oi=e.inject.toString()),!!Oi?.includes("(injected)")),An=new Set,Xe=new Set,Go=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:qt,checkDCE:$i,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),Xe.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,An.forEach(a=>a())),i},on:Ut,onCommitFiberRoot:Ut,onCommitFiberUnmount:Ut,onPostCommitFiberRoot:Ut,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Ai(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((l,u)=>{Xe.add(l),a.renderers.set(u,l)}),Kt(e))}}});let r=window.hasOwnProperty,i=!1;Ai(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{Kt(e)}return o},Kt=e=>{e&&An.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=$i,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=qt,t._instrumentationIsActive=!1;let n=On(t);if(n||(t.on=Ut),t.renderers.size){t._instrumentationIsActive=!0,An.forEach(i=>i());return}let o=t.inject,r=Xt(t);r&&!n&&(Hi=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return Xe.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,An.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||Xt())&&e?.()}catch{}},Yo=()=>hl.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),Tt=e=>Yo()?(Kt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Go(e),jo=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),$n=()=>{try{jo()&&Tt()}catch{}}});var Ii=ve(()=>{"use strict";Zt();$n()});function ir(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await sr(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=ar(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var Uo,Xo,Ko,qo,Zo,Jo,Qo,er,tr,nr,or,rr,ge,ar,sr,lr,le,cr,dr,oe,bl,ur=ve(()=>{"use strict";Zt();Uo=0,Xo=1,Ko=5,qo=11,Zo=13,Jo=15,Qo=16,er=19,tr=26,nr=27,or=28,rr=30,ge=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};ar=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=ar(o,t,n);if(r)return r;o=n?null:o.sibling}return null},sr=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await sr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},lr=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?lr(t.type||t.render):null},le=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=lr(t);return o&&(o.displayName||o.name)||null},cr=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||On(e)||Xt(e)},dr=e=>{let t=Tt(e.onActive);t._instrumentationSource=e.name??qt;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,l)=>{n!==i&&(n?.(a,s,l),e.onCommitFiberRoot?.(a,s,l))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},oe=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},bl=Error()});var it=ve(()=>{"use strict";Zt();Ii();ur();});function Jt(e,t){let n=0,o=0,r=0;do r=Zi[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function zi(e,t){return e.pos>=t?!1:e.peek()!==wl}function Ji(e){let{length:t}=e,n=new Ml(e),o=[],r=0,i=0,a=0,s=0,l=0;do{let u=n.indexOf(";"),d=[],p=!0,m=0;for(r=0;n.pos<u;){let f;r=Jt(n,r),r<m&&(p=!1),m=r,zi(n,u)?(i=Jt(n,i),a=Jt(n,a),s=Jt(n,s),zi(n,u)?(l=Jt(n,l),f=[r,i,a,s,l]):f=[r,i,a,s]):f=[r],d.push(f),n.pos++}p||Ll(d),o.push(d),n.pos=u+1}while(n.pos<=t);return o}function Ll(e){e.sort(Nl)}function Nl(e,t){return e[0]-t[0]}var _i,yl,vl,ji,xl,Cl,Ui,Tl,Xi,El,Ki,qi,fr,Di,Fi,wl,Vi,Sl,Zi,Ml,Qi,kl,Rl,ea,Qt,Hn,Pl,Bi,Al,Ol,$l,Hl,Wi,Il,_l,Dl,Fl,Vl,Gi,_e,zl,pr,mr,Bl,Wl,Gl,Yl,jl,Ul,Xl,Kl,Re,Yi,ql,Zl,Le,Pe,Et=ve(()=>{"use strict";Zt();ur();_i=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,yl=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],vl=["<anonymous>","eval",""],ji=/\.(jsx|tsx|ts|js)$/,xl=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Cl=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Ui="(at Server)",Tl=/(^|@)\S+:\d+/,Xi=/^\s*at .*(\S+:\d+|\(native\))/m,El=/^(eval@)?(\[native code\])?$/,Ki=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=Di(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Tl)){let i=Fi(r,void 0)[0];i&&o.push(i)}return fr(o,t)}return e.match(Xi)?Di(e,t):Fi(e,t)},qi=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},fr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,Di=(e,t)=>fr(e.split(`
`).filter(n=>!!n.match(Xi)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=qi(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),Fi=(e,t)=>fr(e.split(`
`).filter(n=>!n.match(El)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=qi(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}}),wl=44,Vi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Sl=new Uint8Array(64),Zi=new Uint8Array(128);for(let e=0;e<Vi.length;e++){let t=Vi.charCodeAt(e);Sl[e]=t,Zi[t]=e}Ml=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};Qi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,kl=/^data:application\/json[^,]+base64,/,Rl=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,ea=typeof WeakRef<"u",Qt=new Map,Hn=new Map,Pl=e=>ea&&e instanceof WeakRef,Bi=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let d of r)if(d[0]<=o)i=d;else break;if(!i||i.length<4)return null;let[,a,s,l]=i;if(a===void 0||s===void 0||l===void 0)return null;let u=t[a];return u?{columnNumber:l,fileName:u,lineNumber:s+1}:null},Al=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return Bi(o.map.mappings,o.map.sources,r,i)}return Bi(e.mappings,e.sources,t-1,n)},Ol=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Rl);a&&(o=a[1]||a[2])}if(!o)return null;let r=Qi.test(o);if(!(kl.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},$l=e=>({file:e.file,mappings:Ji(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Hl=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Ji(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Wi=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Qi);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},Il=async(e,t=fetch)=>{if(!Wi(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Ol(e,n);if(!o||!Wi(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Hl(i):$l(i)}catch{return null}},_l=async(e,t=!0,n)=>{if(t&&Qt.has(e)){let i=Qt.get(e);if(i==null)return null;if(Pl(i)){let a=i.deref();if(a)return a;Qt.delete(e)}else return i}if(t&&Hn.has(e))return Hn.get(e);let o=Il(e,n);t&&Hn.set(e,o);let r=await o;return t&&Hn.delete(e),t&&(r===null?Qt.set(e,null):Qt.set(e,ea?new WeakRef(r):r)),r},Dl=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await _l(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Al(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),Fl=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",Vl=()=>{let e=Tt();for(let t of[...Array.from(Xe),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},Gi=e=>{for(let t of Xe){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},_e=e=>`
    in ${e}`,zl=(e,t)=>{let n=_e(e);return t&&(n+=` (at ${t})`),n},pr=!1,mr=(e,t)=>{if(!e||pr)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,pr=!0;let o=Vl();Gi(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let d;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){d=m}Reflect.construct(e,[],p)}else{try{p.call()}catch(m){d=m}e.call(p.prototype)}}else{try{throw Error()}catch(m){d=m}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&d instanceof Error&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[l,u]=s.DetermineComponentFrameRoot();if(l&&u){let d=l.split(`
`),p=u.split(`
`),m=0,f=0;for(;m<d.length&&!d[m].includes("DetermineComponentFrameRoot");)m++;for(;f<p.length&&!p[f].includes("DetermineComponentFrameRoot");)f++;if(m===d.length||f===p.length)for(m=d.length-1,f=p.length-1;m>=1&&f>=0&&d[m]!==p[f];)f--;for(;m>=1&&f>=0;m--,f--)if(d[m]!==p[f]){if(m!==1||f!==1)do if(m--,f--,f<0||d[m]!==p[f]){let h=`
${d[m].replace(" at new "," at ")}`,y=le(e);return y&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",y)),h}while(m>=1&&f>=0);break}}}finally{pr=!1,Error.prepareStackTrace=n,Gi(o),console.error=r,console.warn=i}let a=e?le(e):"";return a?_e(a):""},Bl=(e,t)=>{let n=e.tag,o="";switch(n){case or:o=_e("Activity");break;case Xo:o=mr(e.type,!0);break;case qo:o=mr(e.type.render,!1);break;case Uo:case Jo:o=mr(e.type,!1);break;case Ko:case tr:case nr:o=_e(e.type);break;case Qo:o=_e("Lazy");break;case Zo:o=e.child!==t&&t!==null?_e("Suspense Fallback"):_e("Suspense");break;case er:o=_e("SuspenseList");break;case rr:o=_e("ViewTransition");break;default:return""}return o},Wl=e=>{try{let t="",n=e,o=null;do{t+=Bl(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=zl(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},Gl=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},Yl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),jl=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,Ul=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!Yl(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>jl(a,o))||(i.push(o),t.set(r,i))}return t},Xl=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Ui,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},Kl=e=>{let t=[];return ir(e,n=>{if(!Fl(n))return;let o=typeof n.type=="string"?n.type:le(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Ki(Gl(n._debugStack?.stack))})},!0),t},Re=async(e,t=!0,n)=>{let o=Kl(e),r=Ki(Wl(e)),i=Ul(o),a=new Map;return Dl(r.map(s=>s.source?.includes(Ui)??!1?Xl(s,i,a):s).filter((s,l,u)=>{if(l===0)return!0;let d=u[l-1];return s.functionName!==d.functionName}),t,n)},Yi=e=>e.split("/").filter(Boolean).length,ql=e=>e.split("/").filter(Boolean)[0]??null,Zl=e=>{let t=e.indexOf("/",1);if(t===-1||Yi(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!ji.test(n)||Yi(n)<2)return e;let o=ql(n);return!o||o.startsWith("@")||o.length>4?e:n},Le=e=>{if(!e||vl.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=Zl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of yl)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(_i.test(t)){let i=t.match(_i);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Cl.test(i)&&(t=t.slice(0,r))}return t},Pe=e=>{let t=Le(e);return!(!t||!ji.test(t)||xl.test(t))}});function De(e){return!!(Jl.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function gr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function hr(){en=new WeakMap}function nc(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function oc(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=ec}function rc(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<In||o.height/window.innerHeight<In)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>tc}function tn(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&gr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=en.get(e);if(o&&n-o.timestamp<Ql)return o.isValid;let r=window.getComputedStyle(e);return nc(e,r)?e.clientWidth/window.innerWidth>=In&&e.clientHeight/window.innerHeight>=In&&(oc(r)||rc(e,r))?(en.set(e,{isValid:!1,timestamp:n}),!1):(en.set(e,{isValid:!0,timestamp:n}),!0):(en.set(e,{isValid:!1,timestamp:n}),!1)}var Jl,Ql,In,ec,tc,en,at=ve(()=>{"use strict";Jl=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);Ql=50,In=.9,ec=2147483600,tc=1e3,en=new WeakMap});function Hc(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function lt(e){e.element.style.transform=Hc(e.delta.dx,e.delta.dy,e.existingTransform)}function Na(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function kt(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=R.lg,e.style.transition="none",e.style.zIndex="2147483644"}function ka(e){lt(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function Gn(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(ge(o)){let r=o._debugSource,i=le(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Ra(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await Re(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Le(i.fileName);if(Pe(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var Yn=ve(()=>{"use strict";it();Et();Y()});function Aa(e){return jn.push(e),()=>{jn=jn.filter(t=>t!==e)}}function Oa(e){return Un.push(e),()=>{Un=Un.filter(t=>t!==e)}}function ct(){Un.forEach(e=>e())}function qn(){return kr}function Pr(e){let t=kr;t!==e&&(kr=e,jn.forEach(n=>n(e,t)))}function Ee(){return{...Pa}}function cn(e,t){Pa[e]=t}function $a(){return Te}function Ha(e){Te.set(e.id,e),Jn({type:"moveCreate",moveId:e.id})}function Ia(e,t,n){let o=Te.get(e);o&&(o.delta=t,lt(o),Jn({type:"moveDelta",moveId:e,previousDelta:n}))}function Ar(e){let t=Te.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),Te.delete(e),ct())}function Zn(e){if(Ve.push(e),e.type==="colorChange"){let t=e;Je.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else Je.push({type:"annotationAdd",annotationId:e.id});ct()}function Or(e,t,n){Ve.push(e),Je.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),ct()}function Da(e){_a=e}function Nr(e){Ve=Ve.filter(t=>t.id!==e),_a?.(e),ct()}function Fa(){return Rr}function Va(e){Rr=e;for(let t of Te.values())e?lt(t):Na(t);ct()}function $r(e){for(let t of Te.values())if(t.element===e)return t}function Hr(){let e=Je.pop();if(!e)return null;switch(e.type){case"moveCreate":return Ar(e.moveId),"move removed";case"moveDelta":{let t=Te.get(e.moveId);return t&&(t.delta=e.previousDelta,lt(t)),"move reverted"}case"annotationAdd":return Nr(e.annotationId),"annotation removed";case"colorChange":{let t=Ve.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Nr(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=Gn(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),Nr(e.annotationId),"text edit reverted"}}return null}function Jn(e){Je.push(e),ct()}function ze(){return{scale:ln,offsetX:Xn,offsetY:Kn}}function Qn(e,t,n){ln=e,Xn=t,Kn=n,sn.forEach(o=>o())}function eo(e){return sn.push(e),()=>{sn=sn.filter(t=>t!==e)}}function Qe(e,t){return{x:(e-Xn)/ln,y:(t-Kn)/ln}}function to(){for(let e of Te.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Ve)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of Je)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}Te=new Map,Ve=[],Je=[],Rr=!0,ln=1,Xn=0,Kn=0,sn.forEach(e=>e()),ct()}function no(){return Te.size>0||Ve.length>0}function za(){return Je.length>0}function Ba(){let e=Array.from(Te.values()).map(r=>({component:r.componentRef.componentName,file:r.componentRef.filePath,line:r.componentRef.lineNumber,originalRect:{top:r.originalRect.top,left:r.originalRect.left,width:r.originalRect.width,height:r.originalRect.height},delta:{dx:r.delta.dx,dy:r.delta.dy},siblingRects:(()=>{let i=r.element.parentElement;if(!i)return;let a=[];for(let s of Array.from(i.children)){if(s===r.element||!(s instanceof HTMLElement))continue;let l=s.getBoundingClientRect();a.push({component:s.tagName.toLowerCase(),rect:{top:l.top,left:l.left,width:l.width,height:l.height}})}return a.length>0?a:void 0})()})),t=[],n=[],o=[];for(let r of Ve)r.type==="draw"?t.push({type:"draw",startComponent:r.targetComponent?.componentName,startFile:r.targetComponent?.filePath,startLine:r.targetComponent?.lineNumber,points:r.points,color:r.color,strokeWidth:r.strokeWidth}):r.type==="text"?t.push({type:"text",content:r.content,position:r.position,targetComponent:r.targetComponent?.componentName,targetFile:r.targetComponent?.filePath,targetLine:r.targetComponent?.lineNumber}):r.type==="colorChange"?n.push({component:r.component.componentName,file:r.component.filePath,line:r.component.lineNumber,property:r.property,from:r.fromColor,to:r.toColor,pickedToken:r.pickedToken}):r.type==="textEdit"&&o.push({component:r.componentName,file:r.filePath,line:r.lineNumber,column:r.columnNumber,originalText:r.originalText,newText:r.newText});return{moves:e,annotations:t,colorChanges:n,textEdits:o}}var Te,Ve,Je,kr,Rr,Pa,ln,Xn,Kn,sn,jn,Un,_a,we=ve(()=>{"use strict";Yn();Te=new Map,Ve=[],Je=[],kr="pointer",Rr=!0,Pa={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},ln=1,Xn=0,Kn=0,sn=[],jn=[],Un=[];_a=null});function ld(){jr=document.body.style.background||document.body.style.backgroundColor||"",Ur=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",q=document.createElement("div"),q.setAttribute("data-frameup-canvas-wrapper","true"),q.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),ke=document.createElement("div"),ke.setAttribute("data-frameup-dot-bg","true"),ke.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${c.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(gs.push(r),q.appendChild(r));q.style.position="relative",q.style.zIndex="1",document.body.insertBefore(ke,document.body.firstChild),document.body.insertBefore(q,ke.nextSibling),Yr=eo(fs),fs(),hs.forEach(r=>r(q))}function fs(){if(!q||!ke)return;let{scale:e,offsetX:t,offsetY:n}=ze();q.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=ad*e,r=t%o,i=n%o;ke.style.backgroundImage=`radial-gradient(circle, ${sd} ${ms}px, transparent ${ms}px)`,ke.style.backgroundSize=`${o}px ${o}px`,ke.style.backgroundPosition=`${r}px ${i}px`}function cd(e,t,n){let{scale:o,offsetX:r,offsetY:i}=ze(),a=Math.min(rd,Math.max(od,o+n));if(a===o)return;let s=(e-r)/o,l=(t-i)/o,u=e-s*a,d=t-l*a;Qn(a,u,d)}function bs(e){e.preventDefault();let t=-e.deltaY*id,{scale:n}=ze(),o=t*n;cd(e.clientX,e.clientY,o)}function ys(e,t){let{scale:n,offsetX:o,offsetY:r}=ze();Qn(n,o+e,r+t)}function vs(){Qn(1,0,0)}function xs(){return q!==null}function Cs(){q?Xr():ld()}function Xr(){if(hs.forEach(e=>e(null)),Yr?.(),Yr=null,q){for(;q.firstChild;)document.body.insertBefore(q.firstChild,q);q.remove(),q=null}ke?.remove(),ke=null,gs=[],document.body.style.background=jr,document.documentElement.style.background=Ur,jr="",Ur=""}var od,rd,id,ad,ms,sd,q,ke,Yr,gs,hs,jr,Ur,hn=ve(()=>{"use strict";we();Y();od=.1,rd=5,id=.002,ad=24,ms=1,sd="rgba(0,0,0,0.15)",q=null,ke=null,Yr=null,gs=[],hs=[],jr="",Ur=""});function Ts(e,t){if(!pt)return;let n=performance.now(),o=Math.abs(e-pt.clientX),r=Math.abs(t-pt.clientY),i=o<=2&&r<=2,a=n-pt.timestamp<16;if(i||a)return pt.element}function Es(e,t,n){pt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Dt(){pt=null}var pt,Kr=ve(()=>{"use strict";pt=null});var Ss={};sl(Ss,{activateInteraction:()=>yn,destroyInteraction:()=>Qr,getPageElementAtPoint:()=>mt,initInteraction:()=>Zr,refreshDrawCursor:()=>ud,registerToolHandler:()=>Ft,setInteractionCursor:()=>xo,setInteractionPointerEvents:()=>Jr});function Ft(e,t){qr.set(e,t)}function Zr(){I=document.createElement("div"),I.setAttribute("data-frameup-interaction","true"),I.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(I),document.addEventListener("scroll",Dt,!0),I.addEventListener("mousedown",e=>{bn?.onMouseDown?.(e)}),I.addEventListener("mousemove",e=>{bn?.onMouseMove?.(e)}),I.addEventListener("mouseup",e=>{bn?.onMouseUp?.(e)}),document.addEventListener("wheel",ws,{passive:!1})}function ws(e){!I||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||bs(e)}function yn(e){bn=qr.get(e)||null,I&&(I.style.pointerEvents=e==="pointer"?"none":"auto"),dd(e)}function dd(e){if(I)switch(e){case"pointer":I.style.cursor="default";break;case"grab":I.style.cursor="grab";break;case"move":I.style.cursor=Ti();break;case"draw":I.style.cursor=Fo(Ee().brushSize);break;case"text":I.style.cursor="text";break;default:I.style.cursor="default"}}function ud(){qn()==="draw"&&I&&(I.style.cursor=Fo(Ee().brushSize))}function xo(e){I&&(I.style.cursor=e)}function Jr(e){I&&(I.style.pointerEvents=e?"auto":"none")}function mt(e,t){let n=Ts(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!gr(i)){r=i;break}return Es(e,t,r),r}function Qr(){document.removeEventListener("scroll",Dt,!0),document.removeEventListener("wheel",ws),I?.remove(),I=null,bn=null,qr.clear()}var I,bn,qr,ft=ve(()=>{"use strict";we();Y();Kr();at();hn();I=null,bn=null,qr=new Map});function ll(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function cl(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(T=>{try{return Array.from(T.cssRules)}catch{return[]}}).filter(T=>T instanceof CSSStyleRule&&T.selectorText===":root").flatMap(T=>Array.from(T.style)).filter(T=>T.startsWith("--")),n={},o={},r={},i={},a={},s={},l={},u={},d={},p={},m={},f={},h={},y={},x={},P={},H={},A={},V=(T,$,ce,de)=>{T[ce]=de,$[de]=ce};for(let T of t){let $=e.getPropertyValue(T).trim();if(!$)continue;let ce=T.match(/^--spacing-(.+)$/);if(ce){V(n,p,ce[1],$);continue}let de=T.match(/^--color-(.+)$/);if(de){let En=de[1];o[En]=$,m[ll($)]=En;continue}let k=T.match(/^--font-size-(.+)$/);if(k){V(r,f,k[1],$);continue}let G=T.match(/^--font-weight-(.+)$/);if(G){V(i,h,G[1],$);continue}let b=T.match(/^--radius-(.+)$/);if(b){V(a,y,b[1],$);continue}let E=T.match(/^--border-(.+)$/);if(E){V(s,x,E[1],$);continue}let _=T.match(/^--opacity-(.+)$/);if(_){V(l,P,_[1],$);continue}let Q=T.match(/^--tracking-(.+)$/);if(Q){V(u,H,Q[1],$);continue}let ee=T.match(/^--leading-(.+)$/);if(ee){V(d,A,ee[1],$);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:l,letterSpacing:u,lineHeight:d,spacingReverse:p,colorsReverse:m,fontSizeReverse:f,fontWeightReverse:h,borderRadiusReverse:y,borderWidthReverse:x,opacityReverse:P,letterSpacingReverse:H,lineHeightReverse:A}}var dl=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function ul(e,t){let n={};for(let o of dl){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function Sn(e,t){return t.get(e)??null}function pi(e,t,n){let r=(n??Wt())[e],i=[];for(let[s,l]of r.entries()){let u=parseFloat(l);isNaN(u)||i.push({numericValue:u,token:s,cssValue:l})}let a=parseFloat(t);return isNaN(a)||i.some(l=>l.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,l)=>s.numericValue-l.numericValue),i}var mi=null,Bt=null;function fi(e){mi=e,Bt=null}function Wt(){if(Bt!==null)return Bt;let e=cl();return Bt=ul(e,mi??{}),Bt}var ue=null,Gt=[],vt=0,pl=5,Oo=null,$o=null,Ho=null,Io=null,_o=null,Do=null;function gi(e){Do=e}function Mn(e){ue&&ue.readyState===WebSocket.OPEN||(_o=e,ue=new WebSocket(`ws://localhost:${e}`),ue.onopen=()=>{let t=vt>0;vt=0,t&&Io&&Io()},ue.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&fi(n.tokens),n.type==="updatePropertyComplete"&&Do&&Do(n.success,n.errorCode,n.error),Gt.forEach(o=>o(n))}catch{}},ue.onclose=t=>{if(ue=null,t.code===4001){Ho&&Ho();return}if(vt<pl){let n=500*Math.pow(2,vt);vt++,Oo=setTimeout(()=>Mn(e),n)}else $o&&$o()},ue.onerror=()=>{})}function xe(e){ue&&ue.readyState===WebSocket.OPEN&&ue.send(JSON.stringify(e))}function He(e){return Gt.push(e),()=>{Gt=Gt.filter(t=>t!==e)}}function hi(){Oo&&clearTimeout(Oo),ue&&(ue.close(),ue=null),Gt=[]}function bi(e){$o=e}function yi(e){Ho=e}function vi(e){Io=e}function xi(){_o&&(vt=0,Mn(_o))}Y();var Ct=null,K=null,Yt=0,Nn=null,kn=null,rt=null,Vo=null,xt=null,jt=null,Bo=null,Si=null,ml='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>',Mi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path></svg>',zo='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',fl='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',Ei='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',gl=`
  :host {
    all: initial;
  }
  ${Ci}
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
    font-family: ${C};
    font-size: 12px;
    color: ${c.textPrimary};
    box-shadow: ${R.md};
    user-select: none;
    opacity: 0;
    animation: fadeIn ${M.settle} forwards;
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
    transition: background ${M.fast}, color ${M.fast};
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
    font-family: ${C};
    cursor: pointer;
    transition: background ${M.fast};
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
    font-family: ${C};
    box-shadow: ${R.md};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
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
`;function Li(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),Ct=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=gl;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${Mi}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${zo}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${fl}
    </button>
  `,Ct.appendChild(n),Ct.appendChild(o),K=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");Nn=o.querySelector(".generate-btn"),kn=o.querySelector(".eye-btn"),xt=o.querySelector(".component-detail"),rt=document.createElement("div"),rt.className="toast",Ct.appendChild(rt),K.addEventListener("click",()=>{xe({type:"undo"}),K&&(K.innerHTML='<div class="spinner"></div>',K.disabled=!0)}),r.addEventListener("click",e),kn.addEventListener("click",()=>{jt&&jt()}),Nn.addEventListener("click",()=>{Bo&&Bo()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!wi()&&(jt&&jt(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!wi()&&Si?.()&&i.preventDefault()}),bi(()=>{U("Disconnected. Click to reconnect."),xi()}),yi(()=>{U("Disconnected: another tab took over")}),vi(()=>{Yt=0,K&&(K.disabled=!0)}),He(i=>{switch(i.type){case"reorderComplete":i.success?(Yt++,K&&(K.innerHTML=Ei,setTimeout(()=>{K&&(K.innerHTML=zo,K.disabled=!1)},200))):i.error&&U(i.error);break;case"undoComplete":i.success?(Yt=Math.max(0,Yt-1),K&&(K.innerHTML=Ei,setTimeout(()=>{K&&(K.innerHTML=zo,K.disabled=Yt===0)},200))):i.error&&U(i.error);break;case"devServerDisconnected":U("Dev server disconnected");break;case"devServerReconnected":U("Dev server reconnected");break}})}function Ni(){let e=document.getElementById("frameup-root");e&&e.remove(),Ct=null,K=null}function X(){return Ct}function ki(e){jt=e}function Ri(e){Bo=e}function Pi(e){Si=e}function Rn(e){kn&&(kn.innerHTML=e?Mi:ml)}function Pn(e){Nn&&(Nn.disabled=!e)}function Ie(e){if(!xt)return;if(!e){xt.className="component-detail empty",xt.textContent="No selection";return}xt.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";xt.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function U(e){rt&&(rt.textContent=e,rt.classList.add("visible"),Vo&&clearTimeout(Vo),Vo=setTimeout(()=>{rt?.classList.remove("visible")},2e3))}function wi(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}it();Et();at();at();var ic=.75,ta=32,_n=3,Dn=20,na=100,Ce=1;function wt(e,t,n){return Math.min(n,Math.max(t,e))}function ac(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,l=r+e.height/2,u=wt(Math.ceil(e.width/ta),_n,Dn),d=wt(Math.ceil(e.height/ta),_n,Dn);if(u*d>na){let h=Math.sqrt(na/(u*d));u=wt(Math.floor(u*h),_n,Dn),d=wt(Math.floor(d*h),_n,Dn)}let p=new Set,m=[],f=(h,y)=>{let x=wt(Math.round(h),0,t-1),P=wt(Math.round(y),0,n-1),H=`${x}:${P}`;p.has(H)||(p.add(H),m.push({x,y:P}))};f(o+Ce,r+Ce),f(i-Ce,r+Ce),f(o+Ce,a-Ce),f(i-Ce,a-Ce),f(s,r+Ce),f(s,a-Ce),f(o+Ce,l),f(i-Ce,l),f(s,l);for(let h=0;h<u;h++){let y=o+(h+.5)/u*e.width;for(let x=0;x<d;x++)f(y,r+(x+.5)/d*e.height)}return m}function oa(e,t=tn,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=ac(e);for(let l of i)for(let u of document.elementsFromPoint(l.x,l.y))r.add(u);let a=[];for(let l of r){if(!t(l))continue;let u=l.getBoundingClientRect();if(u.width<=0||u.height<=0)continue;let d={left:u.left,top:u.top,right:u.left+u.width,bottom:u.top+u.height};if(n){let p=Math.max(o.left,d.left),m=Math.max(o.top,d.top),f=Math.min(o.right,d.right),h=Math.min(o.bottom,d.bottom),y=Math.max(0,f-p)*Math.max(0,h-m),x=u.width*u.height;x>0&&y/x>=ic&&a.push(l)}else o.left<d.right&&o.right>d.left&&o.top<d.bottom&&o.bottom>d.top&&a.push(l)}let s=a.filter(l=>!a.some(u=>u!==l&&u.contains(l)));return s.sort((l,u)=>{let d=l.compareDocumentPosition(u);return d&Node.DOCUMENT_POSITION_FOLLOWING?-1:d&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}Y();function St(e,t,n){return e+(t-e)*n}Y();var sc=.35,ra=.3,Fn=.5,lc=2,te=null,N=null,br=0,yr=0,nn=1,Lt=null,re=null,D=null,z=[],Mt=c.accent,cc="rgba(162,89,255,0.08)",ia="rgba(162,89,255,0.15)",dc=4,aa=10,uc="#ffffff",pc=Mt,mc=1.5,Cr=!0,Ke=null;function la(){let e=X();e&&(te=document.createElement("canvas"),te.setAttribute("data-frameup-overlay","true"),te.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(te),Tr(),window.addEventListener("resize",Tr))}function Vn(e,t=4){if(!e){re&&(re.targetOpacity=0,Fe());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!re||!re.initialized?re=Sr(n,t):(re.target=n,re.borderRadius=t,re.targetOpacity=1),Fe()}function st(e,t=4){if(!e){D&&(D.targetOpacity=0,Fe());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!D||!D.initialized?D=Sr(n,t):(D.target=n,D.borderRadius=t,D.targetOpacity=1),Fe()}function ca(e){Ke=e,Fe()}function Er(){Ke=null,Fe()}function da(e){for(D=null;z.length>e.length;)z.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<z.length?(z[t].target=o,z[t].borderRadius=n.borderRadius,z[t].targetOpacity=1):z.push(Sr(o,n.borderRadius))}Fe()}function on(){z=[],Fe()}function wr(e,t){if(!Cr)return null;let n=ma();if(!n)return null;let o=ha(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=aa*aa)return r.corner}return null}function ua(){return ma()}function pa(){Lt!==null&&cancelAnimationFrame(Lt),window.removeEventListener("resize",Tr),te?.remove(),te=null,N=null,re=null,D=null,z=[],Ke=null}function ma(){if(z.length>1)return fa(z);if(D&&D.opacity>=.5){let{x:e,y:t,w:n,h:o}=D.current;return{x:e,y:t,w:n,h:o}}if(z.length===1){let{x:e,y:t,w:n,h:o}=z[0].current;return{x:e,y:t,w:n,h:o}}return null}function fa(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:l,h:u}=i.current;a<t&&(t=a),s<n&&(n=s),a+l>o&&(o=a+l),s+u>r&&(r=s+u)}return{x:t,y:n,w:o-t,h:r-n}}function Sr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function Tr(){te&&(nn=Math.max(window.devicePixelRatio||1,lc),br=window.innerWidth,yr=window.innerHeight,te.width=br*nn,te.height=yr*nn,te.style.width=`${br}px`,te.style.height=`${yr}px`,N=te.getContext("2d"),Fe())}function Fe(){Lt===null&&(Lt=requestAnimationFrame(ga))}function ga(){if(Lt=null,!N||!te)return;let e=!1;re?.initialized&&(vr(re,sc)&&(e=!0),re.opacity<.01&&re.targetOpacity===0&&(re=null)),D?.initialized&&(vr(D,ra)&&(e=!0),D.opacity<.01&&D.targetOpacity===0&&(D=null));for(let t=z.length-1;t>=0;t--){let n=z[t];n.initialized&&vr(n,ra)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&z.splice(t,1)}if(N.setTransform(1,0,0,1,0,0),N.clearRect(0,0,te.width,te.height),N.setTransform(nn,0,0,nn,0,0),re&&xr(N,re,Mt,cc),D&&(xr(N,D,Mt,ia),Cr&&sa(N,D.current,D.opacity)),Ke){if(N.save(),N.globalAlpha=.6,N.strokeStyle=Mt,N.lineWidth=1,N.setLineDash([4,4]),Ke.verticalLine){let{x:t}=Ke.verticalLine;N.beginPath(),N.moveTo(t,0),N.lineTo(t,te.height),N.stroke()}if(Ke.horizontalLine){let{y:t}=Ke.horizontalLine;N.beginPath(),N.moveTo(0,t),N.lineTo(te.width,t),N.stroke()}N.restore()}if(z.length>0){for(let t of z)xr(N,t,Mt,ia);if(Cr&&z.length>0){let t=fa(z);t&&t.w>=24&&t.h>=24&&(z.length>1&&(N.globalAlpha=.6,N.beginPath(),N.rect(t.x,t.y,t.w,t.h),N.strokeStyle=Mt,N.lineWidth=1,N.setLineDash([4,4]),N.stroke(),N.setLineDash([]),N.globalAlpha=1),sa(N,t,1))}}e&&(Lt=requestAnimationFrame(ga))}function vr(e,t){let n=e.current,o=e.target,r=St(n.x,o.x,t),i=St(n.y,o.y,t),a=St(n.w,o.w,t),s=St(n.h,o.h,t),l=St(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<Fn&&Math.abs(i-o.y)<Fn&&Math.abs(a-o.w)<Fn&&Math.abs(s-o.h)<Fn&&Math.abs(l-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=l,!0)}function xr(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let l=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),l>0?e.roundRect(r,i,a,s,l):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function ha(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function sa(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=ha(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,dc,0,Math.PI*2),e.fillStyle=uc,e.fill(),e.strokeStyle=pc,e.lineWidth=mc,e.stroke();e.globalAlpha=1}var fc=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],gc=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],hc=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],bc=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],yc=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],qe=[...fc,...gc,...hc,...bc,...yc];Y();var vc=new Set(["auto","none","normal","inherit","initial"]);function ba(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let l=document.createElement("span");l.style.cssText=`font-size:10px; color:${c.textSecondary}; font-family:${C};`,a.appendChild(s),a.appendChild(l);let u=new Map(t);function d(){return u.get(r.key)??r.defaultValue}function p(m){let f=parseFloat(m);s.value=isNaN(f)?m:String(f);try{let y=pi(i,m).find(x=>x.cssValue===m);y?.token?l.textContent=`${r.tailwindPrefix}-${y.token}`:l.textContent=""}catch{l.textContent=""}}return s.addEventListener("blur",()=>{let m=s.value.trim(),f=parseFloat(m);if(isNaN(f))vc.has(m)?(u.set(r.key,m),p(m),n(r.key,m),o()):p(d());else{let y=m.match(/(px|rem|em|%|vw|vh|ch)$/)?m:`${f}px`;u.set(r.key,y),p(y),n(r.key,y),o()}}),s.addEventListener("keydown",m=>{m.key==="Enter"?s.blur():m.key==="Escape"&&(p(d()),s.blur())}),p(d()),{element:a,setValue(m,f){m===r.key&&(u.set(m,f),p(f))},destroy(){}}}Y();function ya(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${c.bgTertiary};
    border-radius:${L.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,l=[];function u(d){s=d;for(let{btn:p,value:m,opt:f}of l){let h=m===d;p.style.background=h?c.accent:"transparent",p.style.color=h?c.textOnAccent:c.textSecondary,p.title=h&&f.tailwindValue?`${f.label} (${f.tailwindValue})`:f.label}}for(let d of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${L.xs};
      font-family:${C};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${c.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=d.icon??d.label,p.title=d.label,p.addEventListener("click",()=>{u(d.value),n(r.key,d.value),o()}),l.push({btn:p,value:d.value,opt:d}),a.appendChild(p)}return u(s),{element:a,setValue(d,p){d===r.key&&u(p)},destroy(){}}}Y();Y();function rn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let l=r===0?0:a/r*100,u=r*100;return{h:s,s:l,v:u}}function zn(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),l=o*(1-(1-i)*n),u,d,p;switch(r%6){case 0:u=o,d=l,p=a;break;case 1:u=s,d=o,p=a;break;case 2:u=a,d=o,p=l;break;case 3:u=a,d=s,p=o;break;case 4:u=l,d=a,p=o;break;case 5:u=o,d=a,p=s;break;default:u=0,d=0,p=0}let m=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${m(u)}${m(d)}${m(p)}`}var Ze=null;function an(e){Nt();let t=X();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    box-shadow: ${R.lg};
    border-radius: ${L.md};
    font-family: ${C};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let b=n.getBoundingClientRect();b.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-b.height-8}px`),n.style.opacity="1"});let o=rn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=xc(["Fill","Text"],0,E=>{r=E===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${R.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let l=document.createElement("div");l.style.cssText="position:relative;width:176px;height:120px;",l.appendChild(i),l.appendChild(s),n.appendChild(l);function u(){let b=o.h,E=a.createLinearGradient(0,0,176,0);E.addColorStop(0,`hsl(${b}, 0%, 100%)`),E.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=E,a.fillRect(0,0,176,120);let _=a.createLinearGradient(0,0,0,120);_.addColorStop(0,"rgba(0,0,0,0)"),_.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=_,a.fillRect(0,0,176,120);let Q=o.s/100*176,ee=(1-o.v/100)*120;s.style.left=`${Q}px`,s.style.top=`${ee}px`}let d=!1;i.addEventListener("mousedown",b=>{d=!0,p(b)});function p(b){let E=i.getBoundingClientRect(),_=Math.max(0,Math.min(176,b.clientX-E.left)),Q=Math.max(0,Math.min(120,b.clientY-E.top));o.s=_/176*100,o.v=(1-Q/120)*100,u(),$()}let m=document.createElement("canvas");m.width=176,m.height=14,m.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let f=m.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${R.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(m),y.appendChild(h),n.appendChild(y);function x(){let b=f.createLinearGradient(0,0,176,0);for(let E=0;E<=6;E++)b.addColorStop(E/6,`hsl(${E*60}, 100%, 50%)`);f.fillStyle=b,f.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let P=!1;m.addEventListener("mousedown",b=>{P=!0,H(b)});function H(b){let E=m.getBoundingClientRect(),_=Math.max(0,Math.min(176,b.clientX-E.left));o.h=_/176*360,x(),u(),$()}let A=document.createElement("input");A.type="text",A.value=zn(o),A.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${c.bgSecondary};
    border: 1px solid ${c.border};
    border-radius: ${L.sm};
    color: ${c.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,A.addEventListener("keydown",b=>{b.key==="Enter"&&A.blur(),b.stopPropagation()}),A.addEventListener("blur",()=>{let b=A.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let E=b.startsWith("#")?b:`#${b}`;o=rn(E),u(),x(),$()}else A.value=zn(o)}),n.appendChild(A);let V=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],T=document.createElement("div");T.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of V){let E=document.createElement("button");E.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${c.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${M.fast};
    `,E.addEventListener("mouseenter",()=>{E.style.boxShadow=R.sm}),E.addEventListener("mouseleave",()=>{E.style.boxShadow="none"}),E.addEventListener("click",()=>{o=rn(b),u(),x(),A.value=b,$()}),T.appendChild(E)}if(n.appendChild(T),e.projectColors&&e.projectColors.length>0){let b=document.createElement("div");b.textContent="Project",b.style.cssText=`
      font-size: 10px;
      color: ${c.textSecondary};
      font-family: ${C};
      margin-top: 2px;
    `,n.appendChild(b);let E=document.createElement("div");E.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:_,hex:Q}of e.projectColors){let ee=document.createElement("button");ee.title=_,ee.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${Q};
        border: 1px solid ${c.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${M.fast};
      `,ee.addEventListener("mouseenter",()=>{ee.style.boxShadow=R.sm}),ee.addEventListener("mouseleave",()=>{ee.style.boxShadow="none"}),ee.addEventListener("click",()=>{o=rn(Q),u(),x(),A.value=Q,$(),e.onPickedToken?.(_)}),E.appendChild(ee)}n.appendChild(E)}function $(){let b=zn(o);A.value=b,e.onColorChange(b),e.onPickedToken?.(void 0)}t.appendChild(n),Ze=n,u(),x();let ce=b=>{d&&p(b),P&&H(b)},de=()=>{d=!1,P=!1};document.addEventListener("mousemove",ce),document.addEventListener("mouseup",de);let k=b=>{b.key==="Escape"&&Nt()};document.addEventListener("keydown",k,!0);let G=b=>{Ze&&!b.composedPath().includes(Ze)&&Nt()};setTimeout(()=>document.addEventListener("mousedown",G,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",ce),document.removeEventListener("mouseup",de),document.removeEventListener("keydown",k,!0),document.removeEventListener("mousedown",G,!0)},n._onClose=e.onClose}function Nt(){Ze&&(Ze._cleanup?.(),Ze._onClose?.(),Ze.remove(),Ze=null)}function xc(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${c.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?c.bgPrimary:"transparent"};
      box-shadow: ${i===t?R.sm:"none"};
      color: ${i===t?c.textPrimary:c.textSecondary};
      font-family: ${C}; font-size: 12px; cursor: pointer;
      transition: background ${M.fast}, color ${M.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,l)=>{s.style.background=l===i?c.bgPrimary:"transparent",s.style.boxShadow=l===i?R.sm:"none",s.style.color=l===i?c.textPrimary:c.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var Mr=null;function Cc(){return Mr||(Mr=document.createElement("canvas").getContext("2d")),Mr}function va(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${L.sm};
    border:1px solid ${c.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let l=document.createElement("span");l.style.cssText=`font-size:10px; color:${c.textSecondary}; font-family:${C};`,i.appendChild(a),i.appendChild(s),i.appendChild(l);let u=t.get(r.key)??r.defaultValue,d=!1;function p(h){let y=h.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let x=Cc();x.fillStyle="#000000",x.fillStyle=y;let P=x.fillStyle;if(P.startsWith("#"))return P;let H=P.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(H){let A=parseInt(H[1],10),V=parseInt(H[2],10),T=parseInt(H[3],10);return`#${((1<<24)+(A<<16)+(V<<8)+T).toString(16).slice(1)}`}return"#000000"}function m(h){u=h,s.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let y=Wt(),x=Sn(h,y.colorsReverse);x?l.textContent=`${r.tailwindPrefix??"bg"}-${x}`:l.textContent=""}catch{l.textContent=""}}function f(){if(d)return;let h=s.value.trim();if(!h){m(u);return}let y=p(h);m(y),n(r.key,y),o()}return a.addEventListener("click",()=>{if(d){Nt(),d=!1;return}let h=a.getBoundingClientRect();d=!0,an({initialColor:p(u),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:y=>{m(y),n(r.key,y)},onClose:()=>{d=!1,o()}})}),s.addEventListener("keydown",h=>{h.key==="Enter"?(f(),s.blur()):h.key==="Escape"&&(m(u),s.blur())}),s.addEventListener("blur",()=>{f()}),s.addEventListener("input",()=>{let h=s.value.trim(),y=p(h);a.style.background=y}),m(u),{element:i,setValue(h,y){h===r.key&&m(y)},destroy(){d&&(Nt(),d=!1)}}}Y();function xa(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Ca(e,t,n,o){let r=new Map(t),i=[];for(let S of e){let w=xa(S.key);w&&i.push({descriptor:S,...w})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${C};
    font-size:10px;
    color:${c.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("div");s.style.cssText="position:relative; padding:4px;";let l=document.createElement("div");l.style.cssText=`
    background:${c.marginBoxBg};
    border:1px dashed ${c.marginBoxBorder};
    border-radius:${L.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let u=document.createElement("div");u.style.cssText=`
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
  `.trim().replace(/\n\s*/g," ");let d=document.createElement("div");d.style.cssText=`
    grid-row:2;
    grid-column:2;
    text-align:center;
    color:${c.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${c.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g," "),d.textContent="content";let p=[];function m(S){let w=document.createElement("span"),fe=r.get(S.key)??S.defaultValue;return w.textContent=H(fe),w.title=S.label,w.style.cssText=`
      cursor:pointer;
      color:${c.textPrimary};
      font-size:10px;
      font-family:${C};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=c.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==f||f.dataset.key!==S.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{x(S,w)}),p.push({key:S.key,span:w,descriptor:S}),w}let f=document.createElement("input");f.type="text",f.className="prop-input",f.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(f);let h=null,y=null;function x(S,w){h&&h!==S&&P(),h=S,y=w,f.dataset.key=S.key;let fe=r.get(S.key)??S.defaultValue;f.value=H(fe);let ne=0,ot=0,Ue=w;for(;Ue&&Ue!==a;)ne+=Ue.offsetLeft,ot+=Ue.offsetTop,Ue=Ue.offsetParent;f.style.display="block",f.style.left=`${ne}px`,f.style.top=`${ot}px`;let ui=w.getBoundingClientRect();f.style.width=`${Math.max(40,ui.width+10)}px`,f.focus(),f.select()}function P(){if(!h||!y)return;let S=f.value.trim(),w=h,fe=y,ne,ot=parseFloat(S),Ue=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(ot)?Ue.has(S)?ne=S:ne=r.get(w.key)??w.defaultValue:ne=S.match(/(px|rem|em|%|vw|vh|ch)$/)?S:`${ot}px`,r.set(w.key,ne),fe.textContent=H(ne),fe.style.background="transparent",f.style.display="none",f.dataset.key="",h=null,y=null,n(w.key,ne),o()}f.addEventListener("keydown",S=>{if(S.key==="Enter")P();else if(S.key==="Escape"){if(h&&y){let w=r.get(h.key)??h.defaultValue;y.textContent=H(w)}f.style.display="none",f.dataset.key="",h=null,y=null}}),f.addEventListener("blur",()=>{P()});function H(S){let w=parseFloat(S);return isNaN(w)?S:w===Math.round(w)?String(Math.round(w)):S}function A(S){let w=document.createElement("span");return w.textContent=S,w.style.cssText=`
      font-size:9px;
      color:${c.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function V(S,w){return i.find(fe=>fe.layer===S&&fe.side===w)}function T(S,w){let fe=V(S,w);if(!fe){let ne=document.createElement("span");return ne.textContent="-",ne.style.cssText=`text-align:center; color:${c.textTertiary};`,ne}return m(fe.descriptor)}let $=T("padding","top");$.style.gridRow="1",$.style.gridColumn="2",$.style.textAlign="center";let ce=T("padding","left");ce.style.gridRow="2",ce.style.gridColumn="1";let de=T("padding","right");de.style.gridRow="2",de.style.gridColumn="3";let k=T("padding","bottom");k.style.gridRow="3",k.style.gridColumn="2",k.style.textAlign="center",d.style.gridRow="2",d.style.gridColumn="2",u.appendChild($),u.appendChild(ce),u.appendChild(d),u.appendChild(de),u.appendChild(k);let G=document.createElement("div");G.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=T("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let E=T("margin","left");E.style.gridRow="2",E.style.gridColumn="1";let _=T("margin","right");_.style.gridRow="2",_.style.gridColumn="3";let Q=T("margin","bottom");Q.style.gridRow="3",Q.style.gridColumn="2",Q.style.textAlign="center";let ee=document.createElement("div");ee.style.cssText="grid-row:2; grid-column:2;",ee.appendChild(u),G.appendChild(b),G.appendChild(E),G.appendChild(ee),G.appendChild(_),G.appendChild(Q);let En=A("margin"),il=A("padding"),wn=document.createElement("div");return wn.style.cssText="display:flex; gap:8px; padding:0 4px;",wn.appendChild(En),wn.appendChild(il),l.appendChild(G),s.appendChild(l),a.appendChild(wn),a.appendChild(s),{element:a,setValue(S,w){if(!xa(S))return;r.set(S,w);let ne=p.find(ot=>ot.key===S);ne&&(ne.span.textContent=H(w))},destroy(){}}}Y();var Bn=new Set;function Ta(e){return Bn.has(e)}var Wn=[];function Ea(e){return Wn.push(e),()=>{let t=Wn.indexOf(e);t>=0&&Wn.splice(t,1)}}var Tc={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Ec={"number-scrub":ba,segmented:ya,"color-swatch":va,"box-model":Ca},wc=`
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
    font-family: ${C};
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
    font-family: ${C};
    font-size: 11px;
    color: ${c.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${M.fast}, box-shadow ${M.fast};
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
    font-family: ${C};
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
`;function Sc(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Mc(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Lc(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var Nc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function kc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function Lr(e,t,n,o){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=wc,r.appendChild(i);let a=[],s=Mc(e);for(let[l,u]of s){let d=l==="layout"&&!kc(t)?u.filter(x=>!Nc.has(x.key)):u;if(d.length===0)continue;let p=document.createElement("div");p.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Tc[l]}</span>${Sc()}`;let f=document.createElement("div");f.className="prop-section-body";let h=Bn.has(l);if(h){let x=m.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),f.classList.add("collapsed")}m.addEventListener("click",()=>{if(h=!h,h)Bn.add(l);else{Bn.delete(l);for(let P of Wn)P(l)}let x=m.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",h),f.classList.toggle("collapsed",h)}),p.appendChild(m);let y=Lc(d);for(let x of y){let P=Ec[x.controlType];if(!P)continue;let H=P(x.descriptors,t,n,o);if(x.descriptors.length>1||x.controlType==="box-model")f.appendChild(H.element);else{let A=document.createElement("div");A.className="prop-control-row";let V=document.createElement("span");V.className="prop-control-label",V.textContent=x.descriptors[0].label,V.title=x.descriptors[0].label;let T=document.createElement("div");T.className="prop-control-value",T.appendChild(H.element),A.appendChild(V),A.appendChild(T),f.appendChild(A)}a.push(H)}p.appendChild(f),r.appendChild(p)}return{container:r,controls:a}}Y();var Rc=300,wa=260,Sa=380,Ma="frameup-sidebar-width",Pc=4,Ac=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${c.bgPrimary};
    border-left: 1px solid ${c.border};
    box-shadow: ${R.lg};
    z-index: 2147483645;
    font-family: ${C};
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform ${M.settle};
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
    width: ${Pc}px;
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
    font-family: ${C};
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
    font-family: ${C};
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
`;function Oc(){try{let e=localStorage.getItem(Ma);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=wa&&t<=Sa)return t}}catch{}return Math.min(Rc,Math.floor(window.innerWidth*.22))}function $c(e){try{localStorage.setItem(Ma,String(e))}catch{}}function La(e,t){let n=document.createElement("style");n.textContent=Ac,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${Oc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let l=document.createElement("span");l.className="prop-sidebar-saving-dot";let u=document.createElement("div");u.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(u);let d=document.createElement("button");d.className="prop-sidebar-close",d.title="Collapse panel",d.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(d),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let m=document.createElement("div");m.className="prop-sidebar-content",o.appendChild(m),e.appendChild(o);let f=!1,h=0,y=0;r.addEventListener("pointerdown",k=>{k.preventDefault(),k.stopPropagation(),f=!0,h=k.clientX,y=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(k.pointerId)}),r.addEventListener("pointermove",k=>{if(!f)return;let G=h-k.clientX,b=Math.max(wa,Math.min(Sa,y+G));o.style.width=`${b}px`});let x=()=>{f&&(f=!1,r.classList.remove("active"),$c(o.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),o.addEventListener("pointerdown",k=>k.stopPropagation()),o.addEventListener("mousedown",k=>k.stopPropagation()),o.addEventListener("click",k=>k.stopPropagation()),o.addEventListener("mouseup",k=>k.stopPropagation()),d.addEventListener("click",()=>{A(),t&&t()});let P=!1;function H(k,G,b,E){s.textContent=`<${k}>`,s.appendChild(l),u.textContent=`${G}:${b}`,u.title=`${G}:${b}`,m.innerHTML="",m.appendChild(E),P||(P=!0,o.offsetHeight,o.classList.add("visible"))}function A(){P&&(P=!1,o.classList.remove("visible"))}function V(k){m.innerHTML="",m.appendChild(k)}function T(k,G,b){p.innerHTML="";let E=document.createElement("span");E.className="prop-sidebar-warning-text",E.textContent=k;let _=document.createElement("button");_.className="prop-sidebar-warning-btn",_.textContent=G,_.addEventListener("click",Q=>{Q.stopPropagation(),b()}),p.appendChild(E),p.appendChild(_),p.style.display="flex"}function $(){p.style.display="none",p.innerHTML=""}function ce(){l.classList.add("active")}function de(){l.classList.remove("active")}return{show:H,hide:A,isVisible:()=>P,getElement:()=>o,replaceContent:V,showWarning:T,clearWarning:$,showSaving:ce,hideSaving:de}}we();it();Et();var Ir=new Map(qe.map(e=>[e.key,e]));var Ic=new Set(["layout","spacing","size"]),Wa=new Set(["typography","background"]),_c=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);function ja(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||_c.has(r))&&t.add("typography"),t}var Dc=5e3,g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1},dt=[],F,Ga,he=null,Fc=300,Se=null,Rt=null,oo=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(Ga),Ga=setTimeout(()=>{Vc()},80))});function Vc(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){At();return}let n=zc(e);if(n){Pt(n,t);return}Bc(e).then(o=>{o?Pt(o,t):At()})}function zc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(ge(o)){let r=o._debugSource,i=le(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Bc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await Re(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let l=Le(i.fileName);Pe(l)&&(s=l)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function Wc(e,t){let n=getComputedStyle(e),o=new Map;for(let r of qe){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function Gc(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of qe){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of dt)i.setValue(n.key,r)}}function dn(){for(let e of dt)e.destroy();dt=[]}function Ya(){if(!g.selectedElement||!g.componentInfo)return;dn();let e=g.showAllGroups?null:ja(g.selectedElement),t=e?qe.filter(r=>e.has(r.group)):qe,{container:n,controls:o}=Lr(t,g.currentValues,un,ro);dt=o,F.replaceContent(n)}function ro(){he&&clearTimeout(he),he=setTimeout(()=>{he=null,Dr()},Fc)}function _r(){he&&(clearTimeout(he),he=null),Rt&&(Rt(),Rt=null),Se&&(clearTimeout(Se.timeoutId),Se=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1}}function Ua(e){F=La(e,()=>{io(),dn(),_r()}),gi((t,n,o)=>{if(F&&F.hideSaving(),Se)if(clearTimeout(Se.timeoutId),t)Se=null;else{let{batch:r,previousOriginals:i}=Se;Se=null;for(let[a]of r){let s=i.get(a);s!==void 0&&g.originalValues.set(a,s)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let s=g.originalValues.get(a);s!==void 0&&g.currentValues.set(a,s)}for(let a of dt)for(let[s]of r){let l=g.originalValues.get(s);l!==void 0&&a.setValue(s,l)}}if(F){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";F.showWarning(s,"Dismiss",()=>F.clearWarning())}}else if(!t&&F){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";F.showWarning(i,"Dismiss",()=>F.clearWarning())}})}function Pt(e,t){g.pendingBatch.size>0&&Dr(),dn(),g.selectedElement=e,g.componentInfo=t,g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(Ic);for(let l of Wa)Ta(l)||n.add(l);let o=Wc(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,Rt&&Rt(),Rt=Ea(l=>{Wa.has(l)&&Gc(l)});let r=g.showAllGroups?null:ja(e),i=r?qe.filter(l=>r.has(l.group)):qe,{container:a,controls:s}=Lr(i,g.currentValues,un,ro);dt=s,oo.disconnect(),oo.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),F.show(t.componentName,t.filePath,t.lineNumber,a)}function un(e,t){let n=Ir.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=Wt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?Sn(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(l=>l.value===t);s&&(a=s.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(Ya(),t==="none"){let s=g.originalValues.get("display")||"block";F.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=s),g.activeOverrides.delete("display"),g.currentValues.set("display",s),g.pendingBatch.delete("display"),Ya(),F.clearWarning()})}else F.clearWarning()}function Dr(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath,t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1;if(g.pendingBatch.size===1){let a=[...g.pendingBatch.values()][0],s=Ir.get(a.property);xe({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else xe({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...g.pendingBatch.values()].map(a=>{let s=Ir.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});g.selectedElement&&g.elementIdentity&&Jn({type:"propertyChange",elementIdentity:g.elementIdentity,element:g.selectedElement,overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),F&&F.showSaving();let o=new Map;for(let[a]of g.pendingBatch)o.set(a,g.originalValues.get(a)||"");for(let[a,s]of g.pendingBatch)g.originalValues.set(a,s.value);let r=new Map(g.pendingBatch),i=setTimeout(()=>{Se&&Se.batch===r&&(Se=null,F&&F.hideSaving())},Dc);Se={batch:r,previousOriginals:o,timeoutId:i},g.pendingBatch.clear()}function io(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of dt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function At(){he&&(clearTimeout(he),he=null),oo.disconnect(),io(),dn(),F&&F.hide(),_r()}function Xa(){he&&(clearTimeout(he),he=null),oo.disconnect(),Dr(),dn(),F&&F.hide(),_r()}function Ka(){return g.activeOverrides.size>0}cr()||dr({onCommitFiberRoot(){}});async function Yc(e){let t=oe(e);if(!t)return null;try{let n=await Re(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||De(i))continue;let a="";if(r.fileName){let s=Le(r.fileName);Pe(s)&&(a=s)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return qa(e,t)}function qa(e,t){let n=[],o=t;for(;o;){if(ge(o)){let r=le(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,l=0;i&&(a=i.fileName||"",s=i.lineNumber||0,l=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!De(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:l})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Za(e){let t=oe(e);return t?qa(e,t):null}var j=null,W=null,Ge=!1,$t=!1,O=new Map,v=null,Ne=null,Be="idle",B=null,Ot=null,Me=null,mo=null,pn=0,mn=0,et=[],ao=!1,jc=null,Uc=null,Xc=null,Kc=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    box-shadow: ${R.sm};
    border-radius: ${L.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${C};
    white-space: nowrap;
    display: none;
    opacity: 0;
    transition: opacity ${M.medium};
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
`;function Ja(e){jc=e.onStart,Uc=e.onMove,Xc=e.onEnd}function Qa(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Kc,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),Ne=document.createElement("div"),Ne.className="marquee-box",e.appendChild(Ne),Ge=!0,document.addEventListener("mousedown",so,!0),document.addEventListener("mousemove",lo,!0),document.addEventListener("mouseup",co,!0),document.addEventListener("keydown",po,!0),document.addEventListener("click",uo,!0),document.addEventListener("scroll",We,!0),window.addEventListener("resize",We),$t=!0}function so(e){if(!Ge||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#frameup-root"))return;if(j||O.size>0){let o=wr(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=ua();if(Me=o,mo=r?{...r}:null,O.size>0){et=[];for(let[i]of O){let a=getComputedStyle(i);et.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}pn=0,mn=0}else if(W){let i=getComputedStyle(W);pn=parseFloat(i.width)||W.offsetWidth,mn=parseFloat(i.height)||W.offsetHeight,et=[]}B={x:e.clientX,y:e.clientY},Be="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!tn(t)){(j||O.size>0)&&(Xa(),j=null,W=null,go(),st(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ie(null));return}B={x:e.clientX,y:e.clientY},Ot=t,ao=e.shiftKey,Be="pending"}function lo(e){if(Ge){if(Be==="resize-drag"&&Me&&B&&mo){e.preventDefault(),e.stopPropagation();let t=e.clientX-B.x,n=e.clientY-B.y;if(et.length>0){for(let o of et){let r=o.width,i=o.height;Me==="tr"||Me==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Me==="bl"||Me==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}fn()}else{let o=pn,r=mn;Me==="tr"||Me==="br"?o=Math.max(10,pn+t):o=Math.max(10,pn-t),Me==="bl"||Me==="br"?r=Math.max(10,mn+n):r=Math.max(10,mn-n),o=Math.round(o),r=Math.round(r),un("width",`${o}px`),un("height",`${r}px`),We()}return}if(Be==="pending"&&B){let t=Math.abs(e.clientX-B.x),n=Math.abs(e.clientY-B.y);(t>10||n>10)&&(Be="marquee")}if(Be==="marquee"&&B&&Ne){let t=Math.min(e.clientX,B.x),n=Math.min(e.clientY,B.y),o=Math.abs(e.clientX-B.x),r=Math.abs(e.clientY-B.y);Ne.style.display="block",Ne.style.left=`${t}px`,Ne.style.top=`${n}px`,Ne.style.width=`${o}px`,Ne.style.height=`${r}px`;return}if(Be==="idle"){if(j&&W||O.size>0){let i=wr(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!tn(n)){Vn(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Vn(o,r+2)}}}function co(e){if(!Ge)return;let t=Be;if(Be="idle",t==="resize-drag"){document.body.style.cursor="",Me=null,mo=null,B=null,et.length>0?et=[]:ro();return}if(t==="marquee"&&B){Ne&&(Ne.style.display="none"),qc(Math.min(e.clientX,B.x),Math.min(e.clientY,B.y),Math.max(e.clientX,B.x),Math.max(e.clientY,B.y)),B=null,Ot=null,ao=!1;return}Ot&&(ao?Zc(Ot):(go(),fo(Ot))),B=null,Ot=null,ao=!1}async function fo(e,t){try{let n=e.getBoundingClientRect();W=e,Fr(n,{}),Jc();let o=await Yc(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o?.componentName,o?.filePath,"stack:",o?.stack?.map(r=>r.componentName)),!o)return;if(j={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||Pt(e,j),Ie({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function qc(e,t,n,o){let r=oa({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){At(),j=null,W=null,st(null),v&&(v.classList.remove("visible"),v.style.display="none"),O.clear();for(let i of r.slice(0,50)){let a=Za(i);if(!a)continue;let s=i.getBoundingClientRect(),l={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};O.set(i,{element:i,info:l})}if(O.size!==0){if(O.size===1){let[i,a]=[...O.entries()][0];O.clear(),W=i,j=a.info;let s=i.getBoundingClientRect();if(Fr(s,j),v){let l=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${l?`<span class="comp-path">${l}</span>`:""}`}Pt(i,j),Ie({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}fn(),Ie(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Zc(e){if(O.has(e)){if(O.delete(e),O.size===1){let[r,i]=[...O.entries()][0];O.clear(),on(),W=r,j=i.info;let a=r.getBoundingClientRect();if(Fr(a,j),Pt(r,j),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}Ie({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else O.size===0?(on(),Ye()):(fn(),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`));return}let t=Za(e);if(!t)return;j&&W&&O.size===0&&(O.set(W,{element:W,info:j}),At(),j=null,W=null,st(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};O.set(e,{element:e,info:o}),fn(),Ie(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function go(){O.clear(),on()}function fn(){if(O.size===0){on();return}let e=[];for(let[t]of O){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}da(e)}function uo(e){Ge&&(e.metaKey||e.ctrlKey||e.preventDefault())}function po(e){if(Ge&&e.key==="Escape"){if(O.size>0){go(),v&&(v.classList.remove("visible"),v.style.display="none"),Ie(null),e.preventDefault();return}if(j){if(Ka()){io(),e.preventDefault();return}Ye(),e.preventDefault()}}}function Fr(e,t){if(W){let n=parseFloat(getComputedStyle(W).borderRadius)||4;st(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function We(){if(O.size>0){fn();return}if(!W||!j)return;let e=W.getBoundingClientRect(),t=parseFloat(getComputedStyle(W).borderRadius)||4;if(st(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Jc(){Vn(null)}function Ye(){At(),j=null,W=null,Me=null,mo=null,et=[],go(),document.body.style.cursor="",st(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ie(null)}function es(){return j}function ts(){Ge=!1,document.removeEventListener("mousedown",so,!0),document.removeEventListener("mousemove",lo,!0),document.removeEventListener("mouseup",co,!0),document.removeEventListener("keydown",po,!0),document.removeEventListener("click",uo,!0),document.removeEventListener("scroll",We,!0),window.removeEventListener("resize",We),$t=!1,v?.remove(),v=null}function Vr(e){e&&!$t?(document.addEventListener("mousedown",so,!0),document.addEventListener("mousemove",lo,!0),document.addEventListener("mouseup",co,!0),document.addEventListener("keydown",po,!0),document.addEventListener("click",uo,!0),document.addEventListener("scroll",We,!0),window.addEventListener("resize",We),$t=!0,Ge=!0):!e&&$t&&(document.removeEventListener("mousedown",so,!0),document.removeEventListener("mousemove",lo,!0),document.removeEventListener("mouseup",co,!0),document.removeEventListener("keydown",po,!0),document.removeEventListener("click",uo,!0),document.removeEventListener("scroll",We,!0),window.removeEventListener("resize",We),$t=!1,Ge=!1)}function ns(){return W??null}async function zr(e){await fo(e,{skipSidebar:!0})}it();var me=null,pe=null,tt=null,os=null,gn=!1,Ht=null,ho=[],bo=new Map,yo=!1,Qc=`
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
`,It=null;function rs(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Qc,e.appendChild(t),Ja({onStart:ed,onMove:td,onEnd:nd}),He(n=>{n.type==="reorderComplete"&&(Br(),Ye())})}function ed(e,t,n){tt=n,os=t,Ht={x:e.clientX,y:e.clientY},gn=!1,yo=!1,ho=[],bo=new Map,It=null;let o=X();if(!o)return;me=document.createElement("div"),me.className="drag-preview";let r=t.getBoundingClientRect();me.style.width=`${r.width}px`,me.style.height=`${r.height}px`,me.innerHTML=t.outerHTML,o.appendChild(me),pe=document.createElement("div"),pe.className="drop-indicator",o.appendChild(pe);let i=n.stack[1];if(!i)return;xe({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=He(s=>{if(s.type!=="siblingsList")return;a(),ho=s.siblings;let l=document.querySelectorAll("*");for(let u of l){if(u.closest("#frameup-root"))continue;let d=oe(u);if(!d)continue;let p=d;for(;p;){if(ge(p)){let m=p._debugSource||p._debugOwner?._debugSource;if(m){for(let f of s.siblings)m.lineNumber===f.lineNumber&&m.fileName===i.filePath&&bo.set(f.lineNumber,{el:u,rect:u.getBoundingClientRect()});break}}p=p.return}}yo=!0})}function td(e){if(!Ht)return;let t=Math.abs(e.clientX-Ht.x),n=Math.abs(e.clientY-Ht.y);if(t<5&&n<5||(gn=!0,me&&(me.style.display="block",me.style.left=`${e.clientX+10}px`,me.style.top=`${e.clientY+10}px`),!yo||!tt))return;let o=null,r=1/0,i=0,a=0,s=0;for(let l of ho){if(l.lineNumber===tt.lineNumber)continue;let u=bo.get(l.lineNumber);if(!u)continue;let d=u.rect,p=d.top+d.height/2,m=Math.abs(e.clientY-p);m<r&&(r=m,o=l,e.clientY<p?i=d.top-2:i=d.bottom+2,a=d.left,s=d.width)}It=o,o&&pe?(pe.style.display="block",pe.style.top=`${i}px`,pe.style.left=`${a}px`,pe.style.width=`${s}px`):pe&&(pe.style.display="none")}function nd(e){if(!gn||!It||!tt){Br();return}xe({type:"reorder",filePath:tt.filePath,fromLine:tt.lineNumber,toLine:It.lineNumber,fromComponent:tt.componentName,toComponent:It.componentName}),me&&(me.style.display="none"),pe&&(pe.style.display="none"),gn=!1,Ht=null}function Br(){me?.remove(),pe?.remove(),me=null,pe=null,tt=null,os=null,gn=!1,Ht=null,yo=!1,ho=[],bo=new Map,It=null}function is(){Br()}Y();we();var ut="http://www.w3.org/2000/svg",_t=null,ie=null,Wr=null;function as(){let e=X();e&&(_t=document.createElementNS(ut,"svg"),_t.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),ie=document.createElementNS(ut,"g"),ie.setAttribute("class","annotation-root"),_t.appendChild(ie),e.appendChild(_t),window.addEventListener("scroll",vo,{passive:!0}),Wr=eo(vo),vo())}function vo(){if(!ie)return;let{scale:e,offsetX:t,offsetY:n}=ze();ie.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function ss(e,t,n,o){if(!ie||t.length<2)return null;let r=document.createElementNS(ut,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(ut,"path");return i.setAttribute("d",us(t)),i.setAttribute("stroke",n),i.setAttribute("stroke-width",String(o)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),ie.appendChild(r),r}function ls(e,t,n,o,r,i){if(!ie)return null;let a=document.createElementNS(ut,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${c.bgPrimary};
    color: ${c.textPrimary};
    border: 1px solid ${c.border};
    box-shadow: ${R.sm};
    padding: 4px 8px;
    border-radius: ${L.sm};
    font-size: ${r}px;
    font-family: ${C};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),ie.appendChild(a),a}function cs(e){if(!ie)return;let t=ie.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Gr(){ie&&(ie.innerHTML="")}function ds(){window.removeEventListener("scroll",vo),Wr?.(),Wr=null,_t?.remove(),_t=null,ie=null}function us(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let n=1;n<e.length;n++)t+=` L${e[n].x},${e[n].y}`;return t}function ps(e,t){if(!ie)return null;let n=[],o=document.createElementNS(ut,"g"),r=document.createElementNS(ut,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),o.appendChild(r),ie.appendChild(o),{path:r,group:o,addPoint(i,a){n.push({x:i,y:a}),r.setAttribute("d",us(n))},getPoints(){return n}}}Yn();we();Y();hn();it();Et();Y();ft();we();we();at();var pd=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),Z=null,gt="",To="",wo="",be=null,ei="",ti=null,Co=null;function Ms(){return Z!==null}function Ls(){document.addEventListener("dblclick",ks,!0),ti=He(e=>{e.type==="updateTextComplete"&&md(e)})}function Ns(){Z&&Os(),document.removeEventListener("dblclick",ks,!0),ti?.(),ti=null}function md(e){if(!e.success&&e.reason==="no-match"&&Co){let t=Co,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};Or(n,o,t.originalInnerHTML)}Co=null}function fd(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function gd(e){let t=oe(e);if(!t)return null;try{let n=await Re(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||De(r))continue;let i="";if(o.fileName){let a=Le(o.fileName);Pe(a)&&(i=a)}return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(ge(n)){let o=le(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!De(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function ks(e){Z&&Eo();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=mt(e.clientX,e.clientY),t&&(pd.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),hd(t)))}function hd(e){Z=e,gt=e.textContent||"",To=e.innerHTML,wo=gt,be=null,gd(e).then(n=>{Z===e&&(be=n)}),ei=e.style.outline,e.style.outline=`2px solid ${c.accent}`,e.contentEditable="true",Jr(!1),e.focus();let t=window.getSelection();if(t){t.removeAllRanges();let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.addRange(n)}e.addEventListener("blur",Ps),e.addEventListener("keydown",As),e.addEventListener("input",Rs)}function Rs(){Z&&(wo=Z.textContent||"")}function Ps(){Eo()}function As(e){if(e.key==="Escape"){e.preventDefault(),Eo();return}if(e.key==="Enter"&&Z&&!fd(Z)){e.preventDefault(),Eo();return}e.stopPropagation()}function Eo(){if(!Z)return;let e=wo;if(e!==gt&&be)if(be.filePath)Co={componentInfo:be,originalText:gt,newText:e,originalInnerHTML:To,tagName:be.tagName},xe({type:"updateText",filePath:be.filePath,lineNumber:be.lineNumber,columnNumber:be.columnNumber,originalText:gt,newText:e});else{let o={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:be.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:gt,newText:e},r={componentName:be.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:be.tagName};Or(o,r,To)}let n=Z;Os(),n&&document.contains(n)&&fo(n,{skipSidebar:!1})}function Os(){Z&&(Z.removeEventListener("blur",Ps),Z.removeEventListener("keydown",As),Z.removeEventListener("input",Rs),Z.removeAttribute("contenteditable"),Z.style.outline=ei,yn(qn()),Z=null,gt="",To="",wo="",be=null,ei="")}var nt={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L16.2426 6.24264L14.8284 7.65685L12 4.82843L9.17157 7.65685L7.75736 6.24264L12 2ZM2 12L6.24264 7.75736L7.65685 9.17157L4.82843 12L7.65685 14.8284L6.24264 16.2426L2 12ZM22 12L17.7574 16.2426L16.3431 14.8284L19.1716 12L16.3431 9.17157L17.7574 7.75736L22 12ZM12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14ZM12 22L7.75736 17.7574L9.17157 16.3431L12 19.1716L14.8284 16.3431L16.2426 17.7574L12 22Z"></path></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 11V8L22 12L18 16V13H13V18H16L12 22L8 18H11V13H6V16L2 12L6 8V11H11V6H8L12 2L16 6H13V11H18Z"></path></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},$s=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",So=navigator.platform.includes("Mac")?"Cmd":"Ctrl",ri=[{type:"pointer",icon:nt.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:nt.grab,label:"Grab",shortcut:"G"},{type:"move",icon:nt.move,label:"Move",shortcut:"J"},{type:"draw",icon:nt.draw,label:"Draw",shortcut:"D"},{type:"text",icon:nt.text,label:"Text",shortcut:"T"}],bd=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    border-radius: ${L.lg};
    box-shadow: ${R.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${C};
    user-select: none;
    opacity: 0;
    animation: panelFadeIn ${M.settle} forwards;
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
    transition: background ${M.fast}, color ${M.fast};
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
    box-shadow: ${R.sm};
    color: ${c.textPrimary};
    padding: 4px 8px;
    border-radius: ${L.sm};
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${M.medium};
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
    transition: opacity ${M.medium};
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
    box-shadow: ${R.sm};
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
    font-family: ${C};
    cursor: pointer;
    padding: 0;
    transition: background ${M.fast}, color ${M.fast}, box-shadow ${M.fast};
  }
  .segment.active {
    background: ${c.bgPrimary};
    color: ${c.textPrimary};
    box-shadow: ${R.sm};
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
    transition: background ${M.fast}, color ${M.fast}, opacity ${M.fast};
  }
  .action-btn svg {
    width: 18px;
    height: 18px;
  }
  .action-btn:hover {
    background: ${c.bgSecondary};
    color: ${c.textPrimary};
  }
  .action-btn:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
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
    font-family: ${C};
    transition: background ${M.fast}, color ${M.fast};
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
    box-shadow: ${R.lg};
    padding: 24px 28px;
    min-width: 320px;
    max-width: 420px;
    font-family: ${C};
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
    font-family: ${C};
    color: ${c.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${c.textTertiary};
  }
`,ye=null,ae=null,Lo=new Map,je=null,ni=null,oi=null;function Hs(e){ni=e}function Is(e){oi=e}function _s(e){je&&(je.disabled=!e)}function Ds(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=bd,e.appendChild(t),ye=document.createElement("div"),ye.className="tools-panel";let n=[["pointer","grab"],["move"],["draw","text"]];for(let s=0;s<n.length;s++){if(s>0){let l=document.createElement("div");l.className="tool-divider",ye.appendChild(l)}for(let l of n[s]){let u=ri.find(m=>m.type===l),d=document.createElement("button");d.className=`tool-btn${u.type==="pointer"?" active":""}`,d.innerHTML=`${u.icon}<span class="tooltip">${u.label}<span class="shortcut-badge">${$s}${u.shortcut}</span></span>`,d.addEventListener("click",()=>Pr(u.type));let p=null;d.addEventListener("mouseenter",()=>{p=setTimeout(()=>d.classList.add("tooltip-visible"),400)}),d.addEventListener("mouseleave",()=>{p&&clearTimeout(p),d.classList.remove("tooltip-visible")}),ye.appendChild(d),Lo.set(u.type,d)}}ae=document.createElement("div"),ae.className="sub-options hidden",ye.appendChild(ae);let o=document.createElement("div");o.className="tool-divider",ye.appendChild(o),je=document.createElement("button"),je.className="action-btn",je.innerHTML=nt.undo,je.title="Undo (Ctrl+Z)",je.disabled=!0,je.addEventListener("click",()=>{oi&&oi()}),ye.appendChild(je);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=nt.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{ni&&ni()}),ye.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=nt.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{Cs(),i.style.color=xs()?c.accent:""}),ye.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${$s}/)`,a.addEventListener("click",()=>Vs()),ye.appendChild(a),e.appendChild(ye),document.addEventListener("keydown",Fs,!0)}function Fs(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||Ms()||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){Vs(),e.preventDefault();return}let o=ri.find(r=>r.shortcut===n);o&&(Pr(o.type),e.preventDefault())}var Ae=null,vn=null;function Vs(){Ae?Mo():yd()}function yd(){let e=X();if(!e||Ae)return;Ae=document.createElement("div"),Ae.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:ri.map(r=>({action:r.label,keys:[So,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[So,"Z"]},{action:"Toggle Originals",keys:[So,"."]},{action:"Keyboard Shortcuts",keys:[So,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let l=document.createElement("div");l.className="shortcut-row";let u=document.createElement("span");u.className="shortcut-action",u.textContent=s.action,l.appendChild(u);let d=document.createElement("span");d.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let f=document.createElement("span");f.className="shortcut-plus",f.textContent="+",d.appendChild(f)}let m=document.createElement("span");m.className="shortcut-key",m.textContent=s.keys[p],d.appendChild(m)}l.appendChild(d),i.appendChild(l)}t.appendChild(i)}Ae.appendChild(t),Ae.addEventListener("click",r=>{r.target===Ae&&Mo()}),e.appendChild(Ae),vn=r=>{Mo()},document.addEventListener("keydown",vn,!0)}function Mo(){vn&&(document.removeEventListener("keydown",vn,!0),vn=null),Ae?.remove(),Ae=null}function zs(e){for(let[t,n]of Lo)n.classList.toggle("active",t===e);vd(e)}function vd(e){if(ae){if(ae.innerHTML="",ae.classList.add("hidden"),ae.classList.remove("visible"),e==="draw"){ae.classList.remove("hidden"),requestAnimationFrame(()=>ae?.classList.add("visible"));let t=Ee(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.brushColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();an({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){cn("brushColor",i),n.style.background=i},onClose(){}})}),ae.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{cn("brushSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(ft(),Ss)).then(a=>a.refreshDrawCursor())}),o.appendChild(i)}ae.appendChild(o)}else if(e==="text"){ae.classList.remove("hidden"),requestAnimationFrame(()=>ae?.classList.add("visible"));let t=Ee(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();an({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){cn("textColor",i),n.style.background=i},onClose(){}})}),ae.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{cn("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}ae.appendChild(o)}}}function Bs(e){let t=Lo.get(e);t&&(t.style.backgroundColor=c.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function Ws(){document.removeEventListener("keydown",Fs,!0),Mo(),ye?.remove(),ye=null,ae=null,Lo.clear()}ft();Kr();at();Y();var Gs="frameup-onboarding-seen",Oe=null,No=null;function Ys(){if(localStorage.getItem(Gs))return;let e=X();if(!e)return;Oe=document.createElement("div"),Oe.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${c.bgPrimary};
    border: 1px solid ${c.border};
    box-shadow: ${R.md};
    border-radius: ${L.md};
    padding: 12px 16px;
    font-family: ${C};
    font-size: 12px;
    color: ${c.textPrimary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    max-width: 260px;
  `;let t=["V","H","M","D","C","T","L"],n=`
    display: inline-block;
    background: ${c.bgSecondary};
    color: ${c.textTertiary};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: ${C};
    margin: 0 2px;
  `;Oe.innerHTML=`Press ${t.map(o=>`<span style="${n}">${o}</span>`).join(" ")} to switch tools`,e.appendChild(Oe),requestAnimationFrame(()=>{Oe&&(Oe.style.opacity="1")}),No=setTimeout(ii,5e3)}function ii(){Oe&&(localStorage.setItem(Gs,"1"),Oe.style.opacity="0",setTimeout(()=>{Oe?.remove(),Oe=null},150),No&&(clearTimeout(No),No=null))}we();function js(){Vr(!0)}function Us(){Vr(!1)}ft();hn();var ai=!1,si=0,li=0,Xs={onMouseDown(e){ai=!0,si=e.clientX,li=e.clientY,xo("grabbing")},onMouseMove(e){if(!ai)return;let t=e.clientX-si,n=e.clientY-li;ys(t,n),si=e.clientX,li=e.clientY},onMouseUp(e){ai=!1,xo("grab")}};Yn();we();ft();function Ks(e,t,n,o,r,i){let a=e.left+e.width/2,s=e.top+e.height/2,l=t.left+t.width/2,u=t.top+t.height/2,d=l-a,p=u-s,m=Math.abs(d)<=r,f=Math.abs(p)<=r;return{dx:m?n+d/i:n,dy:f?o+p/i:o,snappedX:m,snappedY:f,guides:{verticalLine:m?{x:l,top:t.top,bottom:t.bottom}:null,horizontalLine:f?{y:u,left:t.left,right:t.right}:null}}}var J=null,xn={x:0,y:0},Vt={dx:0,dy:0},zt=!1,ht=!1,Cn=null,qs={onMouseDown(e){Cn=null,zt=!1,ht=!1;let t=Qe(e.clientX,e.clientY),n=mt(e.clientX,e.clientY);if(!n){Ye();return}let o=$r(n);if(o){J=o,xn={x:t.x,y:t.y},Vt={...o.delta},zt=!1,ht=!0,kt(o.element,o.delta.dx,o.delta.dy,o.existingTransform);return}let r=es(),i=ns();if(!r||!i||n!==i){Cn=n;return}let a=$r(i);if(a){J=a,xn={x:t.x,y:t.y},Vt={...a.delta},zt=!1,ht=!0,kt(a.element,a.delta.dx,a.delta.dy,a.existingTransform);return}let s=i.getBoundingClientRect(),l=i.style.cssText,u=getComputedStyle(i).transform,d={id:crypto.randomUUID(),componentRef:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber},element:i,placeholder:null,originalRect:s,delta:{dx:0,dy:0},originalCssText:l,existingTransform:u==="none"?"":u,identity:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,tagName:i.tagName.toLowerCase()}};Ha(d),J=d,xn={x:t.x,y:t.y},Vt={dx:0,dy:0},zt=!0,ht=!0,kt(i,0,0,d.existingTransform)},onMouseMove(e){if(!ht||!J)return;let t=Qe(e.clientX,e.clientY),n=Vt.dx+(t.x-xn.x),o=Vt.dy+(t.y-xn.y);kt(J.element,n,o,J.existingTransform);let r=J.element.parentElement;if(!r||r===document.body||r===document.documentElement){J.delta={dx:n,dy:o},Er();return}let i=J.element.getBoundingClientRect(),a=r.getBoundingClientRect(),{scale:s}=ze(),l=Ks(i,a,n,o,5,s);(l.snappedX||l.snappedY)&&kt(J.element,l.dx,l.dy,J.existingTransform),J.delta={dx:l.dx,dy:l.dy},ca(l.guides)},onMouseUp(){ht&&J&&(zt||Ia(J.id,J.delta,Vt),ka(J),Er(),zr(J.element)),J=null,ht=!1,zt=!1,Cn&&(zr(Cn),Cn=null)}};we();function ko(e,t=2){if(e.length<=2)return e;let n=0,o=0,r=e[0],i=e[e.length-1];for(let a=1;a<e.length-1;a++){let s=xd(e[a],r,i);s>n&&(n=s,o=a)}if(n>t){let a=ko(e.slice(0,o+1),t),s=ko(e.slice(o),t);return[...a.slice(0,-1),...s]}return[r,i]}function xd(e,t,n){let o=n.x-t.x,r=n.y-t.y,i=o*o+r*r;if(i===0){let s=e.x-t.x,l=e.y-t.y;return Math.sqrt(s*s+l*l)}return Math.abs(r*e.x-o*e.y+n.x*t.y-n.y*t.x)/Math.sqrt(i)}it();Et();at();ft();async function Ro(e,t){let n=mt(e,t);if(!n)return null;let o=oe(n);if(!o)return null;try{let i=await Re(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||De(s))continue;let l="";if(a.fileName){let u=Le(a.fileName);Pe(u)&&(l=u)}return{componentName:s,filePath:l,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(ge(r)){let i=le(r.type);if(i&&i[0]===i[0].toUpperCase()&&!De(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}var $e=null,Po=null,Zs={onMouseDown(e){let t=Ee();if($e=ps(t.brushColor,t.brushSize),$e){let n=Qe(e.clientX,e.clientY);$e.addPoint(n.x,n.y)}Po=Ro(e.clientX,e.clientY)},onMouseMove(e){if(!$e)return;let t=Qe(e.clientX,e.clientY);$e.addPoint(t.x,t.y)},onMouseUp(e){if(!$e)return;let t=$e.getPoints(),n=Ee();if($e.group.remove(),t.length<2){$e=null,Po=null;return}let o=ko(t,2),r=crypto.randomUUID();ss(r,o,n.brushColor,n.brushSize);let i={type:"draw",id:r,points:o,color:n.brushColor,strokeWidth:n.brushSize,targetComponent:null};Zn(i);let a=Po;Po=null,a?.then(s=>{i.targetComponent=s}),$e=null}};we();Y();var se=null,bt=null,Ao=null,Qs={onMouseDown(e){se&&Js();let t=Qe(e.clientX,e.clientY);bt={pageX:t.x,pageY:t.y},Ro(e.clientX,e.clientY).then(n=>{Ao=n}),se=document.createElement("input"),se.type="text",se.placeholder="Type annotation...",se.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${c.bgPrimary};
      color: ${c.textPrimary};
      border: 1.5px solid ${c.accent};
      border-radius: ${L.sm};
      padding: 4px 8px;
      font-size: ${Ee().fontSize}px;
      font-family: ${C};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${c.accentSoft};
    `,se.setAttribute("data-frameup-overlay","true"),se.addEventListener("keydown",n=>{n.key==="Enter"&&(Js(),n.preventDefault()),n.key==="Escape"&&(el(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(se),se.focus()},onMouseMove(){},onMouseUp(){}};function Js(){if(!se||!bt)return;let e=se.value.trim();if(se.remove(),se=null,!e)return;let t=Ee(),n=crypto.randomUUID();ls(n,bt.pageX,bt.pageY,e,t.fontSize,t.textColor),Zn({type:"text",id:n,position:bt,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:Ao}),bt=null,Ao=null}function el(){se&&(se.remove(),se=null),bt=null,Ao=null}function tl(){el()}hn();Y();var yt=null,Tn=null;function nl(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function Cd(e){let t=X();if(!t)return;yt&&yt.parentNode&&yt.parentNode.removeChild(yt),Tn&&clearTimeout(Tn);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${C}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${L.sm}`,`box-shadow: ${R.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${M.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${C}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${L.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),Tn&&clearTimeout(Tn),yt=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),yt=n,requestAnimationFrame(()=>{n.style.opacity="1"}),Tn=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),yt=null},8e3)}function ci(e){console.error("[FrameUp]",e),Cd("FrameUp encountered an error. Your app is unaffected.")}function Td(){window.addEventListener("error",e=>{nl(e.error??e.message)&&(ci(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{nl(e.reason)&&(ci(e.reason),e.preventDefault())})}var di=null;function ol(e,t,n){t.originalCssText=n.style.cssText,t.element=n,lt(t)}function Ed(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;Mn(e),Li(wd);let t=X();t&&Ua(t),Qa(),la(),rs(),as(),Da(r=>cs(r)),di=new MutationObserver(()=>{for(let[r,i]of $a())document.contains(i.element)||setTimeout(()=>{let a=Gn(i.identity);if(a){ol(r,i,a);return}Ra(i.identity).then(s=>{s?ol(r,i,s):(Ar(r),U(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),di.observe(document.body,{childList:!0,subtree:!0}),Ds(),Ls(),Zr(),Ys(),Ft("grab",Xs),Ft("move",qs),Ft("draw",Zs),Ft("text",Qs),Aa((r,i)=>{ii(),Bs(r),i==="pointer"&&Us(),i==="text"&&tl(),Dt(),hr(),r==="pointer"&&js(),yn(r),zs(r)}),Oa(()=>{Pn(no()),_s(za())}),Is(()=>{let r=Hr();r&&U(`Undo: ${r}`)}),ki(()=>{if(!no()){U("No moved components to toggle");return}let r=!Fa();Va(r),Rn(r)});let n=!1,o=0;Ri(()=>{if(n){U("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);U(`Please wait ${a}s before retrying`);return}let i=Ba();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length&&!i.textEdits.length){U("Nothing to confirm \u2014 make some visual changes first");return}n=!0,Pn(!1),U("Generating..."),xe({type:"generate",annotations:i})}),He(r=>{if(r.type==="generateProgress"&&U(r.message),r.type==="generateComplete")if(n=!1,Pn(no()),r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");U(`Applied: ${i}`),Ye(),Gr(),to(),Rn(!0)}else U(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),Pi(()=>{let r=Hr();return r?(U(`Undo: ${r}`),!0):!1}),Hs(()=>{Ye(),Gr(),to(),vs(),Rn(!0),U("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function wd(){Dt(),hr(),ts(),pa(),is(),ds(),di?.disconnect(),Ws(),Ns(),Qr(),to(),Xr(),hi(),Ni()}function rl(){try{Ed(),Td()}catch(e){ci(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",rl):rl();})();
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
