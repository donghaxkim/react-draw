"use strict";var SketchUI=(()=>{var E=null,he=[],ne=0,ir=5,lt=null,st=null,at=null,ct=null,ut=null;function He(e){E&&E.readyState===WebSocket.OPEN||(ut=e,E=new WebSocket(`ws://localhost:${e}`),E.onopen=()=>{let t=ne>0;ne=0,t&&ct&&ct()},E.onmessage=t=>{try{let o=JSON.parse(t.data);he.forEach(n=>n(o))}catch{}},E.onclose=t=>{if(E=null,t.code===4001){at&&at();return}if(ne<ir){let o=500*Math.pow(2,ne);ne++,lt=setTimeout(()=>He(e),o)}else st&&st()},E.onerror=()=>{})}function ge(e){E&&E.readyState===WebSocket.OPEN&&E.send(JSON.stringify(e))}function be(e){return he.push(e),()=>{he=he.filter(t=>t!==e)}}function dn(){lt&&clearTimeout(lt),E&&(E.close(),E=null),he=[]}function pn(e){st=e}function mn(e){at=e}function fn(e){ct=e}function hn(){ut&&(ne=0,He(ut))}var oe=null,f=null,A=null,dt=null,ve=0,Pe=null,Ie=null,q=null,pt=null,ye=null,mt=null,bn=null,lr=`
  :host {
    all: initial;
  }
  .toolbar {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: #1a1a2e;
    border: 1px solid #333;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    color: #e0e0e0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    user-select: none;
  }
  .mode {
    color: #64b5f6;
    font-weight: 600;
  }
  .divider {
    width: 1px;
    height: 16px;
    background: #444;
  }
  .component-info {
    color: #aaa;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .component-info.error {
    color: #ef5350;
  }
  button {
    background: #2a2a3e;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
  }
  button:hover:not(:disabled) {
    background: #3a3a4e;
  }
  button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .close-btn {
    background: transparent;
    border: none;
    color: #888;
    font-size: 16px;
    padding: 2px 6px;
    line-height: 1;
  }
  .close-btn:hover {
    color: #ef5350;
  }
  .generate-btn {
    background: #1e88e5;
    border: 1px solid #1565c0;
    color: white;
  }
  .generate-btn:hover:not(:disabled) {
    background: #1565c0;
  }
  .eye-btn {
    background: transparent;
    border: 1px solid #444;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .eye-btn svg {
    width: 16px;
    height: 16px;
  }
  .toast {
    position: fixed;
    bottom: 60px;
    right: 16px;
    background: #333;
    color: #e0e0e0;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    z-index: 2147483647;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .toast.visible {
    opacity: 1;
  }
`;function vn(e){let t=document.createElement("div");t.id="sketch-ui-root",document.body.appendChild(t),oe=t.attachShadow({mode:"open"});let o=document.createElement("style");o.textContent=lr;let n=document.createElement("div");n.className="toolbar",n.innerHTML=`
    <span class="mode">Select</span>
    <span class="divider"></span>
    <span class="component-info">No selection</span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="eye-btn" title="Toggle originals (.)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
    <button class="undo-btn" disabled>Undo Reorder</button>
    <button class="close-btn">&times;</button>
  `,oe.appendChild(o),oe.appendChild(n),f=n.querySelector(".component-info"),A=n.querySelector(".undo-btn");let r=n.querySelector(".close-btn");Pe=n.querySelector(".generate-btn"),Ie=n.querySelector(".eye-btn"),q=document.createElement("div"),q.className="toast",oe.appendChild(q),A.addEventListener("click",()=>{ge({type:"undo"}),A.disabled=!0}),r.addEventListener("click",e),Ie.addEventListener("click",()=>{ye&&ye()}),Pe.addEventListener("click",()=>{mt&&mt()}),document.addEventListener("keydown",i=>{i.key==="."&&!gn()&&ye&&ye(),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!gn()&&bn?.()&&i.preventDefault()}),pn(()=>{f&&(f.innerHTML='Disconnected. <button style="background:none;border:none;color:#64b5f6;cursor:pointer;text-decoration:underline;font:inherit;">Reconnect</button>',f.classList.add("error"),f.querySelector("button")?.addEventListener("click",()=>{hn(),f&&(f.textContent="Reconnecting...")}))}),mn(()=>{Fe("Disconnected: another tab took over")}),fn(()=>{ve=0,A&&(A.disabled=!0)}),be(i=>{switch(i.type){case"reorderComplete":i.success?(ve++,A&&(A.disabled=!1)):i.error&&Fe(i.error);break;case"undoComplete":i.success?(ve=Math.max(0,ve-1),A&&(A.disabled=ve===0)):i.error&&Fe(i.error);break;case"devServerDisconnected":Fe("Dev server disconnected");break;case"devServerReconnected":xe("No selection");break}})}function xe(e){f&&(f.textContent=e,f.classList.remove("error"))}function Fe(e){f&&(f.textContent=e,f.classList.add("error"),dt&&clearTimeout(dt),dt=setTimeout(()=>{f&&(f.textContent="No selection",f.classList.remove("error"))},3e3))}function yn(){let e=document.getElementById("sketch-ui-root");e&&e.remove(),oe=null,f=null,A=null}function C(){return oe}function xn(e){ye=e}function En(e){mt=e}function Cn(e){bn=e}var sr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',ar='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';function Tn(e){Ie&&(Ie.innerHTML=e?ar:sr)}function wn(e){Pe&&(Pe.disabled=!e)}function ft(e){q&&(q.textContent=e,q.classList.add("visible"),pt&&clearTimeout(pt),pt=setTimeout(()=>{q?.classList.remove("visible")},2e3))}function Sn(e){let t=C()?.querySelector(".mode");t&&(t.textContent=e)}function gn(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var ht="0.5.32",we=`bippy-${ht}`,Nn=Object.defineProperty,cr=Object.prototype.hasOwnProperty,Ee=()=>{},Mn=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},$e=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Ln=!1,kn,Ce=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Ln?!0:(e&&typeof e.inject=="function"&&(kn=e.inject.toString()),!!kn?.includes("(injected)")),De=new Set,z=new Set,gt=e=>{let t=new Map,o=0,n={_instrumentationIsActive:!1,_instrumentationSource:we,checkDCE:Mn,hasUnsupportedRendererAttached:!1,inject(r){let i=++o;return t.set(i,r),z.add(r),n._instrumentationIsActive||(n._instrumentationIsActive=!0,De.forEach(l=>l())),i},on:Ee,onCommitFiberRoot:Ee,onCommitFiberUnmount:Ee,onPostCommitFiberRoot:Ee,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Nn(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return n},set(l){if(l&&typeof l=="object"){let s=n.renderers;n=l,s.size>0&&(s.forEach((a,c)=>{z.add(a),l.renderers.set(c,a)}),Te(e))}}});let r=window.hasOwnProperty,i=!1;Nn(window,"hasOwnProperty",{configurable:!0,value:function(...l){try{if(!i&&l[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,l)},writable:!0})}catch{Te(e)}return n},Te=e=>{e&&De.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Mn,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=we,t._instrumentationIsActive=!1;let o=$e(t);if(o||(t.on=Ee),t.renderers.size){t._instrumentationIsActive=!0,De.forEach(i=>i());return}let n=t.inject,r=Ce(t);r&&!o&&(Ln=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let l=n(i);return z.add(i),r&&t.renderers.set(l,i),t._instrumentationIsActive=!0,De.forEach(s=>s()),l}}(t.renderers.size||t._instrumentationIsActive||Ce())&&e?.()}catch{}},bt=()=>cr.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),re=e=>bt()?(Te(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):gt(e),vt=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),ze=()=>{try{vt()&&re()}catch{}};ze();var yt=0,xt=1;var Et=5;var Ct=11,Tt=13;var wt=15,St=16;var Nt=19;var kt=26,Mt=27,Lt=28,Rt=30;var K=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function At(e,t,o=!1){if(!e)return null;let n=t(e);if(n instanceof Promise)return(async()=>{if(await n===!0)return e;let i=o?e.return:e.child;for(;i;){let l=await _t(i,t,o);if(l)return l;i=o?null:i.sibling}return null})();if(n===!0)return e;let r=o?e.return:e.child;for(;r;){let i=Ot(r,t,o);if(i)return i;r=o?null:r.sibling}return null}var Ot=(e,t,o=!1)=>{if(!e)return null;if(t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=Ot(n,t,o);if(r)return r;n=o?null:n.sibling}return null},_t=async(e,t,o=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=await _t(n,t,o);if(r)return r;n=o?null:n.sibling}return null};var Ht=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Ht(t.type||t.render):null},F=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let o=t.displayName||t.name||null;if(o)return o;let n=Ht(t);return n&&(n.displayName||n.name)||null};var Ft=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||$e(e)||Ce(e)};var Pt=e=>{let t=re(e.onActive);t._instrumentationSource=e.name??we;let o=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(l,s,a)=>{o!==i&&(o?.(l,s,a),e.onCommitFiberRoot?.(l,s,a))};t.onCommitFiberRoot=i}let n=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(l,s)=>{t.onCommitFiberUnmount===i&&(n?.(l,s),e.onCommitFiberUnmount?.(l,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(l,s)=>{t.onPostCommitFiberRoot===i&&(r?.(l,s),e.onPostCommitFiberRoot?.(l,s))};t.onPostCommitFiberRoot=i}return t},B=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let o of t.renderers.values())try{let n=o.findFiberByHostInstance?.(e);if(n)return n}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let o in e)if(o.startsWith("__reactContainer$")||o.startsWith("__reactInternalInstance$")||o.startsWith("__reactFiber"))return e[o]||null}return null},ur=Error();var Rn=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,dr=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],pr=["<anonymous>","eval",""],$n=/\.(jsx|tsx|ts|js)$/,mr=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,fr=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,zn="(at Server)",hr=/(^|@)\S+:\d+/,Bn=/^\s*at .*(\S+:\d+|\(native\))/m,gr=/^(eval@)?(\[native code\])?$/;var jn=(e,t)=>{if(t?.includeInElement!==!1){let o=e.split(`
`),n=[];for(let r of o)if(/^\s*at\s+/.test(r)){let i=An(r,void 0)[0];i&&n.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");n.push({functionName:i,source:r})}else if(r.match(hr)){let i=On(r,void 0)[0];i&&n.push(i)}return $t(n,t)}return e.match(Bn)?An(e,t):On(e,t)},Gn=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,o=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return o?[o[1],o[2]||void 0,o[3]||void 0]:[t,void 0,void 0]},$t=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var An=(e,t)=>$t(e.split(`
`).filter(o=>!!o.match(Bn)),t).map(o=>{let n=o;n.includes("(eval ")&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let l=Gn(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(l[0])?void 0:l[0],lineNumber:l[1]?+l[1]:void 0,columnNumber:l[2]?+l[2]:void 0,source:n}});var On=(e,t)=>$t(e.split(`
`).filter(o=>!o.match(gr)),t).map(o=>{let n=o;if(n.includes(" > eval")&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!n.includes("@")&&!n.includes(":"))return{functionName:n};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=n.match(r),l=i&&i[1]?i[1]:void 0,s=Gn(n.replace(r,""));return{functionName:l,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:n}}});var br=44,_n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",vr=new Uint8Array(64),Yn=new Uint8Array(128);for(let e=0;e<_n.length;e++){let t=_n.charCodeAt(e);vr[e]=t,Yn[t]=e}function Se(e,t){let o=0,n=0,r=0;do r=Yn[e.next()],o|=(r&31)<<n,n+=5;while(r&32);let i=o&1;return o>>>=1,i&&(o=-2147483648|-o),t+o}function Hn(e,t){return e.pos>=t?!1:e.peek()!==br}var yr=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:o}=this,n=t.indexOf(e,o);return n===-1?t.length:n}};function Un(e){let{length:t}=e,o=new yr(e),n=[],r=0,i=0,l=0,s=0,a=0;do{let c=o.indexOf(";"),u=[],p=!0,d=0;for(r=0;o.pos<c;){let m;r=Se(o,r),r<d&&(p=!1),d=r,Hn(o,c)?(i=Se(o,i),l=Se(o,l),s=Se(o,s),Hn(o,c)?(a=Se(o,a),m=[r,i,l,s,a]):m=[r,i,l,s]):m=[r],u.push(m),o.pos++}p||xr(u),n.push(u),o.pos=c+1}while(o.pos<=t);return n}function xr(e){e.sort(Er)}function Er(e,t){return e[0]-t[0]}var Vn=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Cr=/^data:application\/json[^,]+base64,/,Tr=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Xn=typeof WeakRef<"u",Ne=new Map,Be=new Map,wr=e=>Xn&&e instanceof WeakRef,Fn=(e,t,o,n)=>{if(o<0||o>=e.length)return null;let r=e[o];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=n)i=u;else break;if(!i||i.length<4)return null;let[,l,s,a]=i;if(l===void 0||s===void 0||a===void 0)return null;let c=t[l];return c?{columnNumber:a,fileName:c,lineNumber:s+1}:null},Sr=(e,t,o)=>{if(e.sections){let n=null;for(let l of e.sections)if(t>l.offset.line||t===l.offset.line&&o>=l.offset.column)n=l;else break;if(!n)return null;let r=t-n.offset.line,i=t===n.offset.line?o-n.offset.column:o;return Fn(n.map.mappings,n.map.sources,r,i)}return Fn(e.mappings,e.sources,t-1,o)},Nr=(e,t)=>{let o=t.split(`
`),n;for(let i=o.length-1;i>=0&&!n;i--){let l=o[i].match(Tr);l&&(n=l[1]||l[2])}if(!n)return null;let r=Vn.test(n);if(!(Cr.test(n)||r||n.startsWith("/"))){let i=e.split("/");i[i.length-1]=n,n=i.join("/")}return n},kr=e=>({file:e.file,mappings:Un(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Mr=e=>{let t=e.sections.map(({map:n,offset:r})=>({map:{...n,mappings:Un(n.mappings)},offset:r})),o=new Set;for(let n of t)for(let r of n.map.sources)o.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(o),sourcesContent:void 0,version:3}},Pn=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let o=t.match(Vn);if(!o)return!0;let n=o[0].toLowerCase();return n==="http:"||n==="https:"},Lr=async(e,t=fetch)=>{if(!Pn(e))return null;let o;try{let r=await t(e);if(!r.ok)return null;o=await r.text()}catch{return null}if(!o)return null;let n=Nr(e,o);if(!n||!Pn(n))return null;try{let r=await t(n);if(!r.ok)return null;let i=await r.json();return"sections"in i?Mr(i):kr(i)}catch{return null}},Rr=async(e,t=!0,o)=>{if(t&&Ne.has(e)){let i=Ne.get(e);if(i==null)return null;if(wr(i)){let l=i.deref();if(l)return l;Ne.delete(e)}else return i}if(t&&Be.has(e))return Be.get(e);let n=Lr(e,o);t&&Be.set(e,n);let r=await n;return t&&Be.delete(e),t&&(r===null?Ne.set(e,null):Ne.set(e,Xn?new WeakRef(r):r)),r},Ar=async(e,t=!0,o)=>await Promise.all(e.map(async n=>{if(!n.fileName)return n;let r=await Rr(n.fileName,t,o);if(!r||typeof n.lineNumber!="number"||typeof n.columnNumber!="number")return n;let i=Sr(r,n.lineNumber,n.columnNumber);return i?{...n,source:i.fileName&&n.source?n.source.replace(n.fileName,i.fileName):n.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:n})),Or=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",_r=()=>{let e=re();for(let t of[...Array.from(z),...Array.from(e.renderers.values())]){let o=t.currentDispatcherRef;if(o&&typeof o=="object")return"H"in o?o.H:o.current}return null},In=e=>{for(let t of z){let o=t.currentDispatcherRef;o&&typeof o=="object"&&("H"in o?o.H=e:o.current=e)}},P=e=>`
    in ${e}`,Hr=(e,t)=>{let o=P(e);return t&&(o+=` (at ${t})`),o},It=!1,Dt=(e,t)=>{if(!e||It)return"";let o=Error.prepareStackTrace;Error.prepareStackTrace=void 0,It=!0;let n=_r();In(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(d){u=d}Reflect.construct(e,[],p)}else{try{p.call()}catch(d){u=d}e.call(p.prototype)}}else{try{throw Error()}catch(d){u=d}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[a,c]=s.DetermineComponentFrameRoot();if(a&&c){let u=a.split(`
`),p=c.split(`
`),d=0,m=0;for(;d<u.length&&!u[d].includes("DetermineComponentFrameRoot");)d++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(d===u.length||m===p.length)for(d=u.length-1,m=p.length-1;d>=1&&m>=0&&u[d]!==p[m];)m--;for(;d>=1&&m>=0;d--,m--)if(u[d]!==p[m]){if(d!==1||m!==1)do if(d--,m--,m<0||u[d]!==p[m]){let N=`
${u[d].replace(" at new "," at ")}`,fe=F(e);return fe&&N.includes("<anonymous>")&&(N=N.replace("<anonymous>",fe)),N}while(d>=1&&m>=0);break}}}finally{It=!1,Error.prepareStackTrace=o,In(n),console.error=r,console.warn=i}let l=e?F(e):"";return l?P(l):""},Fr=(e,t)=>{let o=e.tag,n="";switch(o){case Lt:n=P("Activity");break;case xt:n=Dt(e.type,!0);break;case Ct:n=Dt(e.type.render,!1);break;case yt:case wt:n=Dt(e.type,!1);break;case Et:case kt:case Mt:n=P(e.type);break;case St:n=P("Lazy");break;case Tt:n=e.child!==t&&t!==null?P("Suspense Fallback"):P("Suspense");break;case Nt:n=P("SuspenseList");break;case Rt:n=P("ViewTransition");break;default:return""}return n},Pr=e=>{try{let t="",o=e,n=null;do{t+=Fr(o,n);let r=o._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let l=r[i];typeof l.name=="string"&&(t+=Hr(l.name,l.env))}n=o,o=o.return}while(o);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},Ir=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let o=e;if(!o)return"";Error.prepareStackTrace=t,o.startsWith(`Error: react-stack-top-frame
`)&&(o=o.slice(29));let n=o.indexOf(`
`);if(n!==-1&&(o=o.slice(n+1)),n=Math.max(o.indexOf("react_stack_bottom_frame"),o.indexOf("react-stack-bottom-frame")),n!==-1&&(n=o.lastIndexOf(`
`,n)),n!==-1)o=o.slice(0,n);else return"";return o},Dr=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),$r=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,zr=e=>{let t=new Map;for(let o of e)for(let n of o.stackFrames){if(!Dr(n))continue;let r=n.functionName,i=t.get(r)??[];i.some(l=>$r(l,n))||(i.push(n),t.set(r,i))}return t},Br=(e,t,o)=>{if(!e.functionName)return{...e,isServer:!0};let n=t.get(e.functionName);if(!n||n.length===0)return{...e,isServer:!0};let r=o.get(e.functionName)??0,i=n[r%n.length];return o.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(zn,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},jr=e=>{let t=[];return At(e,o=>{if(!Or(o))return;let n=typeof o.type=="string"?o.type:F(o.type)||"<anonymous>";t.push({componentName:n,stackFrames:jn(Ir(o._debugStack?.stack))})},!0),t},je=async(e,t=!0,o)=>{let n=jr(e),r=jn(Pr(e)),i=zr(n),l=new Map;return Ar(r.map(s=>s.source?.includes(zn)??!1?Br(s,i,l):s).filter((s,a,c)=>{if(a===0)return!0;let u=c[a-1];return s.functionName!==u.functionName}),t,o)};var Dn=e=>e.split("/").filter(Boolean).length,Gr=e=>e.split("/").filter(Boolean)[0]??null,Yr=e=>{let t=e.indexOf("/",1);if(t===-1||Dn(e.slice(0,t))!==1)return e;let o=e.slice(t);if(!$n.test(o)||Dn(o)<2)return e;let n=Gr(o);return!n||n.startsWith("@")||n.length>4?e:o},ke=e=>{if(!e||pr.some(i=>i===e))return"";let t=e,o=t.startsWith("http://")||t.startsWith("https://");if(o)try{t=new URL(t).pathname}catch{}if(o&&(t=Yr(t)),t.startsWith("about://React/")){let i=t.slice(14),l=i.indexOf("/"),s=i.indexOf(":");t=l!==-1&&(s===-1||l<s)?i.slice(l+1):i}let n=!0;for(;n;){n=!1;for(let i of dr)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),n=!0;break}}if(Rn.test(t)){let i=t.match(Rn);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);fr.test(i)&&(t=t.slice(0,r))}return t},Ge=e=>{let t=ke(e);return!(!t||!$n.test(t)||mr.test(t))};var Ur=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function ie(e){return!!(Ur.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}Ft()||Pt({onCommitFiberRoot(){}});async function Vr(e){let t=B(e);if(!t)return null;try{let o=await je(t);if(o&&o.length>0){let n=[];for(let r of o){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||ie(i))continue;let l="";if(r.fileName){let s=ke(r.fileName);Ge(s)&&(l=s)}n.push({componentName:i,filePath:l,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(n.length>0)return{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}}catch(o){console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:",o)}return qn(e,t)}function qn(e,t){let o=[],n=t;for(;n;){if(K(n)){let r=F(n.type),i=n._debugSource||n._debugOwner?._debugSource,l="",s=0,a=0;i&&(l=i.fileName||"",s=i.lineNumber||0,a=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!ie(r)&&o.push({componentName:r,filePath:l,lineNumber:s,columnNumber:a})}n=n.return}return o.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}function Wn(e){let t=B(e);return t?qn(e,t):null}var D=null,Z=null,j=!1,se=!1,g=null,M=null,O=null,L=null,I="idle",h=null,le=null,zt=null,Bt=null,jt=null,Xr=`
  .hover-overlay {
    position: fixed;
    pointer-events: none;
    border: 2px solid #42a5f5;
    background: rgba(66, 165, 245, 0.08);
    z-index: 2147483646;
    transition: all 0.05s ease-out;
    display: none;
  }
  .selection-overlay {
    position: fixed;
    pointer-events: none;
    border: 2px solid #1e88e5;
    background: rgba(30, 136, 229, 0.05);
    z-index: 2147483646;
    display: none;
  }
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: #1e88e5;
    color: white;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 3px;
    z-index: 2147483646;
    font-family: -apple-system, BlinkMacSystemFont, monospace;
    white-space: nowrap;
    display: none;
  }
  .marquee-box {
    position: fixed;
    border: 1px dashed #42a5f5;
    background: rgba(66, 165, 245, 0.1);
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`;function Kn(e){zt=e.onStart,Bt=e.onMove,jt=e.onEnd}function Zn(){let e=C();if(!e)return;let t=document.createElement("style");t.textContent=Xr,e.appendChild(t),g=document.createElement("div"),g.className="hover-overlay",e.appendChild(g),M=document.createElement("div"),M.className="selection-overlay",e.appendChild(M),O=document.createElement("div"),O.className="selection-label",e.appendChild(O),L=document.createElement("div"),L.className="marquee-box",e.appendChild(L),j=!0,document.addEventListener("mousedown",Ye,!0),document.addEventListener("mousemove",Ue,!0),document.addEventListener("mouseup",Ve,!0),document.addEventListener("keydown",Xe,!0),se=!0}function Ye(e){if(!j)return;e.preventDefault(),e.stopPropagation();let t=document.elementFromPoint(e.clientX,e.clientY);!t||t.closest("#sketch-ui-root")||(h={x:e.clientX,y:e.clientY},le=t,D&&Z&&Z.contains(t)?(I="drag",zt&&zt(e,Z,D)):I="pending")}function Ue(e){if(j){if(I==="drag"){Bt&&Bt(e);return}if(I==="pending"&&h){let t=Math.abs(e.clientX-h.x),o=Math.abs(e.clientY-h.y);(t>10||o>10)&&(I="marquee")}if(I==="marquee"&&h&&L){let t=Math.min(e.clientX,h.x),o=Math.min(e.clientY,h.y),n=Math.abs(e.clientX-h.x),r=Math.abs(e.clientY-h.y);L.style.display="block",L.style.left=`${t}px`,L.style.top=`${o}px`,L.style.width=`${n}px`,L.style.height=`${r}px`;return}if(I==="idle"){let t=document.elementFromPoint(e.clientX,e.clientY);if(!t||t.closest("#sketch-ui-root")){Yt();return}let o=t.getBoundingClientRect();g&&(g.style.display="block",g.style.left=`${o.left}px`,g.style.top=`${o.top}px`,g.style.width=`${o.width}px`,g.style.height=`${o.height}px`)}}}function Ve(e){if(!j)return;let t=I;if(I="idle",t==="drag"){jt&&jt(e),h=null,le=null;return}if(t==="marquee"&&h){L&&(L.style.display="none"),qr(Math.min(e.clientX,h.x),Math.min(e.clientY,h.y),Math.max(e.clientX,h.x),Math.max(e.clientY,h.y)),h=null,le=null;return}le&&Wr(le),h=null,le=null}async function Wr(e){try{let t=await Vr(e);if(console.log("[SketchUI] selectElement:",e.tagName,"\u2192",t?.componentName,t?.filePath,"stack:",t?.stack?.map(l=>l.componentName)),!t)return;Z=e,D={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:e.getBoundingClientRect().top,left:e.getBoundingClientRect().left,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}},Jn(e.getBoundingClientRect(),D),Yt();let o=`<${t.tagName}>`,n=`<${t.componentName} />`,r=t.filePath?` \u2014 ${t.filePath}:${t.lineNumber}`:"",i=t.tagName===t.componentName.toLowerCase()?`${n}${r}`:`${o} in ${n}${r}`;xe(i),Gt&&Gt()}catch(t){console.error("[SketchUI] selectElement error:",t)}}function qr(e,t,o,n){let r=[],i=document.querySelectorAll("*");for(let a of i){if(a.closest("#sketch-ui-root"))continue;let c=a.getBoundingClientRect();c.left<o&&c.right>e&&c.top<n&&c.bottom>t&&c.width>0&&c.height>0&&r.push(a)}if(r.length===0)return;let l=[];for(let a of r.slice(0,50)){let c=Wn(a);c?.stack?.length&&l.push(c.stack)}if(l.length===0)return;let s=Kr(l);if(s)for(let a of r){let c=Wn(a);if(c&&c.componentName===s.componentName){let u=a.getBoundingClientRect();Z=a,D={tagName:a.tagName.toLowerCase(),componentName:s.componentName,filePath:s.filePath,lineNumber:s.lineNumber,columnNumber:s.columnNumber,stack:c.stack,boundingRect:{top:u.top,left:u.left,width:u.width,height:u.height}},Jn(u,D),xe(`<${s.componentName} /> \u2014 ${s.filePath}:${s.lineNumber}`);return}}}function Kr(e){if(e.length===0)return null;if(e.length===1)return e[0][0];let t=e[0],o=null;for(let n=0;n<t.length;n++){let r=t[n];if(e.every(l=>l[n]&&l[n].filePath===r.filePath&&l[n].lineNumber===r.lineNumber))o=r;else break}return o}function Xe(e){j&&e.key==="Escape"&&D&&(Me(),e.preventDefault())}function Jn(e,t){M&&(M.style.display="block",M.style.left=`${e.left}px`,M.style.top=`${e.top}px`,M.style.width=`${e.width}px`,M.style.height=`${e.height}px`),O&&(O.style.display="block",O.style.left=`${e.left}px`,O.style.top=`${e.top-20}px`,O.textContent=`<${t.componentName} />`)}function Yt(){g&&(g.style.display="none")}function Me(){D=null,Z=null,M&&(M.style.display="none"),O&&(O.style.display="none"),xe("No selection")}function Qn(){return D}function eo(){j=!1,document.removeEventListener("mousedown",Ye,!0),document.removeEventListener("mousemove",Ue,!0),document.removeEventListener("mouseup",Ve,!0),document.removeEventListener("keydown",Xe,!0),se=!1}function Ut(e){e&&!se?(document.addEventListener("mousedown",Ye,!0),document.addEventListener("mousemove",Ue,!0),document.addEventListener("mouseup",Ve,!0),document.addEventListener("keydown",Xe,!0),se=!0,j=!0):!e&&se&&(document.removeEventListener("mousedown",Ye,!0),document.removeEventListener("mousemove",Ue,!0),document.removeEventListener("mouseup",Ve,!0),document.removeEventListener("keydown",Xe,!0),se=!1,j=!1)}function to(){return Z??null}function no(e,t){let o=document.elementFromPoint(e,t);if(!o||o.closest("#sketch-ui-root")||o.hasAttribute("data-sketch-ui-ghost")||o.hasAttribute("data-sketch-ui-interaction")){Vt();return}let n=o.getBoundingClientRect();g&&(g.style.display="block",g.style.left=`${n.left}px`,g.style.top=`${n.top}px`,g.style.width=`${n.width}px`,g.style.height=`${n.height}px`)}function Vt(){Yt()}var Gt=null;function oo(e){Gt=e}var w=null,T=null,G=null,ro=null,Le=!1,ae=null,We=[],qe=new Map,Ke=!1,Zr=`
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
`,ce=null;function io(){let e=C();if(!e)return;let t=document.createElement("style");t.textContent=Zr,e.appendChild(t),Kn({onStart:Jr,onMove:Qr,onEnd:ei}),be(o=>{o.type==="reorderComplete"&&(Xt(),Me())})}function Jr(e,t,o){G=o,ro=t,ae={x:e.clientX,y:e.clientY},Le=!1,Ke=!1,We=[],qe=new Map,ce=null;let n=C();if(!n)return;w=document.createElement("div"),w.className="drag-preview";let r=t.getBoundingClientRect();w.style.width=`${r.width}px`,w.style.height=`${r.height}px`,w.innerHTML=t.outerHTML,n.appendChild(w),T=document.createElement("div"),T.className="drop-indicator",n.appendChild(T);let i=o.stack[1];if(!i)return;ge({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let l=be(s=>{if(s.type!=="siblingsList")return;l(),We=s.siblings;let a=document.querySelectorAll("*");for(let c of a){if(c.closest("#sketch-ui-root"))continue;let u=B(c);if(!u)continue;let p=u;for(;p;){if(K(p)){let d=p._debugSource||p._debugOwner?._debugSource;if(d){for(let m of s.siblings)d.lineNumber===m.lineNumber&&d.fileName===i.filePath&&qe.set(m.lineNumber,{el:c,rect:c.getBoundingClientRect()});break}}p=p.return}}Ke=!0})}function Qr(e){if(!ae)return;let t=Math.abs(e.clientX-ae.x),o=Math.abs(e.clientY-ae.y);if(t<5&&o<5||(Le=!0,w&&(w.style.display="block",w.style.left=`${e.clientX+10}px`,w.style.top=`${e.clientY+10}px`),!Ke||!G))return;let n=null,r=1/0,i=0,l=0,s=0;for(let a of We){if(a.lineNumber===G.lineNumber)continue;let c=qe.get(a.lineNumber);if(!c)continue;let u=c.rect,p=u.top+u.height/2,d=Math.abs(e.clientY-p);d<r&&(r=d,n=a,e.clientY<p?i=u.top-2:i=u.bottom+2,l=u.left,s=u.width)}ce=n,n&&T?(T.style.display="block",T.style.top=`${i}px`,T.style.left=`${l}px`,T.style.width=`${s}px`):T&&(T.style.display="none")}function ei(e){if(!Le||!ce||!G){Xt();return}ge({type:"reorder",filePath:G.filePath,fromLine:G.lineNumber,toLine:ce.lineNumber,fromComponent:G.componentName,toComponent:ce.componentName}),w&&(w.style.display="none"),T&&(T.style.display="none"),Le=!1,ae=null}function Xt(){w?.remove(),T?.remove(),w=null,T=null,G=null,ro=null,Le=!1,ae=null,Ke=!1,We=[],qe=new Map,ce=null}function lo(){Xt()}var Y="http://www.w3.org/2000/svg",ue=null,b=null;function so(){let e=C();e&&(ue=document.createElementNS(Y,"svg"),ue.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),b=document.createElementNS(Y,"g"),b.setAttribute("class","annotation-root"),ue.appendChild(b),e.appendChild(ue),window.addEventListener("scroll",qt,{passive:!0}),qt())}var Wt=null;function qt(){Wt===null&&(Wt=requestAnimationFrame(()=>{Wt=null,b&&b.setAttribute("transform",`translate(${-window.scrollX}, ${-window.scrollY})`)}))}function ao(e,t,o,n){if(!b||t.length<2)return null;let r=document.createElementNS(Y,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(Y,"path");return i.setAttribute("d",fo(t)),i.setAttribute("stroke",o),i.setAttribute("stroke-width",String(n)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),b.appendChild(r),r}function co(e,t,o,n,r,i){if(!b)return null;let l=document.createElementNS(Y,"foreignObject");l.setAttribute("data-annotation-id",e),l.setAttribute("x",String(t)),l.setAttribute("y",String(o)),l.setAttribute("width","300"),l.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: rgba(0,0,0,0.8);
    color: ${i};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: ${r}px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=n,l.appendChild(s),b.appendChild(l),l}function uo(e,t,o,n){if(!b)return null;let r=document.createElementNS(Y,"circle");return r.setAttribute("data-annotation-id",e),r.setAttribute("cx",String(t)),r.setAttribute("cy",String(o)),r.setAttribute("r","6"),r.setAttribute("fill",n),r.setAttribute("stroke","white"),r.setAttribute("stroke-width","1.5"),b.appendChild(r),r}function po(){b&&(b.innerHTML="")}function mo(){window.removeEventListener("scroll",qt),ue?.remove(),ue=null,b=null}function fo(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let o=1;o<e.length;o++)t+=` L${e[o].x},${e[o].y}`;return t}function ho(e,t){if(!b)return null;let o=[],n=document.createElementNS(Y,"g"),r=document.createElementNS(Y,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),n.appendChild(r),b.appendChild(n),{path:r,group:n,addPoint(i,l){o.push({x:i,y:l}),r.setAttribute("d",fo(o))},getPoints(){return o}}}var R=new Map,U=[],Re=[],Kt="pointer",Zt=!1,bo={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},Ze=[],Je=[];function vo(e){return Ze.push(e),()=>{Ze=Ze.filter(t=>t!==e)}}function yo(e){return Je.push(e),()=>{Je=Je.filter(t=>t!==e)}}function J(){Je.forEach(e=>e())}function xo(){return Kt}function de(e){let t=Kt;t!==e&&(Kt=e,Ze.forEach(o=>o(e,t)))}function $(){return{...bo}}function Ae(e,t){bo[e]=t}function Qe(){return R}function Eo(e){R.set(e.id,e),Re.push({type:"ghostCreate",ghostId:e.id}),J()}function Co(e,t){let o=R.get(e);if(!o)return;let n={...o.currentPos};o.currentPos=t,Re.push({type:"ghostMove",ghostId:e,previousPos:n}),J()}function ti(e){let t=R.get(e);t&&(t.cloneEl.remove(),t.originalEl.style.opacity=t.originalOpacity,t.originalEl.style.visibility=t.originalVisibility,R.delete(e),J())}function pe(e){U.push(e),Re.push({type:"annotationAdd",annotationId:e.id}),J()}function go(e){U=U.filter(t=>t.id!==e),J()}function et(){return Zt}function To(e){Zt=e;for(let t of R.values())e?(t.originalEl.style.opacity="0",t.originalEl.style.visibility="hidden"):(t.originalEl.style.opacity="0.3",t.originalEl.style.visibility="visible");J()}function wo(){let e=Re.pop();if(!e)return null;switch(e.type){case"ghostCreate":return ti(e.ghostId),"ghost removed";case"ghostMove":{let t=R.get(e.ghostId);return t&&(t.currentPos=e.previousPos,t.cloneEl.style.left=`${e.previousPos.x}px`,t.cloneEl.style.top=`${e.previousPos.y}px`),"move reverted"}case"annotationAdd":return go(e.annotationId),"annotation removed";case"colorChange":{let t=U.find(o=>o.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),go(e.annotationId),"color reverted"}}return null}function Jt(){for(let e of R.values())e.cloneEl.remove(),e.originalEl.style.opacity=e.originalOpacity,e.originalEl.style.visibility=e.originalVisibility;for(let e of U)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}R=new Map,U=[],Re=[],Zt=!1,J()}function So(){return R.size>0||U.length>0}function No(){let e=[];for(let n of R.values())e.push({component:n.componentRef.componentName,file:n.componentRef.filePath,line:n.componentRef.lineNumber,from:n.originalRect,to:n.currentPos});let t=[],o=[];for(let n of U)n.type==="draw"?t.push({type:"draw",startComponent:n.targetComponent?.componentName,startFile:n.targetComponent?.filePath,startLine:n.targetComponent?.lineNumber,points:n.points,color:n.color,strokeWidth:n.strokeWidth}):n.type==="text"?t.push({type:"text",content:n.content,position:n.position,targetComponent:n.targetComponent?.componentName,targetFile:n.targetComponent?.filePath,targetLine:n.targetComponent?.lineNumber}):n.type==="colorChange"&&o.push({component:n.component.componentName,file:n.component.filePath,line:n.component.lineNumber,property:n.property,from:n.fromColor,to:n.toColor});return{moves:e,annotations:t,colorChanges:o}}var ni="2147483644";function ko(){window.addEventListener("scroll",Mo,{passive:!0})}var Qt=null;function Mo(){Qt===null&&(Qt=requestAnimationFrame(()=>{Qt=null;for(let e of Qe().values())e.cloneEl.style.left=`${e.currentPos.x-window.scrollX}px`,e.cloneEl.style.top=`${e.currentPos.y-window.scrollY}px`}))}function Lo(e,t){let o=e.getBoundingClientRect(),n=e.cloneNode(!0);n.setAttribute("data-sketch-ui-ghost","true"),n.style.position="fixed",n.style.left=`${o.left}px`,n.style.top=`${o.top}px`,n.style.width=`${o.width}px`,n.style.height=`${o.height}px`,n.style.zIndex=ni,n.style.pointerEvents="none",n.style.margin="0",n.style.boxSizing="border-box",document.body.appendChild(n);let r=e.style.opacity||"",i=e.style.visibility||"",l=et();e.style.opacity=l?"0":"0.3",l&&(e.style.visibility="hidden");let s={id:crypto.randomUUID(),componentRef:t,originalRect:{top:o.top+window.scrollY,left:o.left+window.scrollX,width:o.width,height:o.height},currentPos:{x:o.left+window.scrollX,y:o.top+window.scrollY},cloneEl:n,originalEl:e,originalOpacity:r,originalVisibility:i};return Eo(s),s}function Ro(e,t,o){let n=Qe().get(e);n&&(n.currentPos={x:t,y:o},n.cloneEl.style.left=`${t-window.scrollX}px`,n.cloneEl.style.top=`${o-window.scrollY}px`)}function Ao(e,t){for(let o of Qe().values()){let n=o.cloneEl.getBoundingClientRect();if(e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom)return o}return null}function Oo(){window.removeEventListener("scroll",Mo)}var Q={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v1"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',lasso:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 22a5 5 0 0 1-2-4"/><path d="M7 16.93c.96.43 1.96.74 2.99.91"/><path d="M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8-4.48 8-10 8a12 12 0 0 1-3-.38"/><path d="M5 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>'},_o=[{type:"pointer",icon:Q.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Q.grab,label:"Grab",shortcut:"H"},{type:"move",icon:Q.move,label:"Move",shortcut:"M"},{type:"draw",icon:Q.draw,label:"Draw",shortcut:"D"},{type:"color",icon:Q.color,label:"Color",shortcut:"C"},{type:"text",icon:Q.text,label:"Text",shortcut:"T"},{type:"lasso",icon:Q.lasso,label:"Lasso",shortcut:"L"}],oi=`
  .tools-panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 48px;
    height: 100vh;
    background: #1a1a2e;
    border-right: 1px solid #333;
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
    gap: 4px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    user-select: none;
  }
  .tool-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    color: #aaa;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
  }
  .tool-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .tool-btn:hover {
    background: #2a2a3e;
    color: #e0e0e0;
  }
  .tool-btn.active {
    background: #3a3a4e;
    color: #64b5f6;
    border-left-color: #64b5f6;
  }
  .tool-btn .tooltip {
    display: none;
    position: absolute;
    left: 52px;
    top: 50%;
    transform: translateY(-50%);
    background: #333;
    color: #e0e0e0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    white-space: nowrap;
    pointer-events: none;
  }
  .tool-btn:hover .tooltip {
    display: block;
  }
  .sub-options {
    width: 48px;
    padding: 4px 0;
    border-top: 1px solid #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .sub-options.hidden {
    display: none;
  }
  .size-btn {
    width: 32px;
    height: 24px;
    background: #2a2a3e;
    border: 1px solid #444;
    border-radius: 3px;
    color: #aaa;
    font-size: 10px;
    cursor: pointer;
  }
  .size-btn.active {
    background: #3a3a4e;
    color: #64b5f6;
    border-color: #64b5f6;
  }
  .color-swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #444;
    cursor: pointer;
    padding: 0;
    background: #ef4444;
  }
  .clear-btn {
    margin-top: auto;
    margin-bottom: 16px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid #444;
    color: #888;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;
  }
  .clear-btn:hover {
    border-color: #ef5350;
    color: #ef5350;
  }
`,V=null,v=null,tn=new Map,en=null;function Ho(e){en=e}function Fo(){let e=C();if(!e)return;let t=document.createElement("style");t.textContent=oi,e.appendChild(t),V=document.createElement("div"),V.className="tools-panel";for(let n of _o){let r=document.createElement("button");r.className=`tool-btn${n.type==="pointer"?" active":""}`,r.innerHTML=`${n.icon}<span class="tooltip">${n.label} (${n.shortcut})</span>`,r.addEventListener("click",()=>de(n.type)),V.appendChild(r),tn.set(n.type,r)}v=document.createElement("div"),v.className="sub-options hidden",V.appendChild(v);let o=document.createElement("button");o.className="clear-btn",o.textContent="\u2715",o.title="Clear All",o.addEventListener("click",()=>{en&&en()}),V.appendChild(o),e.appendChild(V),document.addEventListener("keydown",Po,!0)}function Po(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement)return;let o=e.key.toUpperCase(),n=_o.find(r=>r.shortcut===o);n&&(de(n.type),e.preventDefault())}function Io(e){for(let[t,o]of tn)o.classList.toggle("active",t===e);ri(e)}function ri(e){if(v){if(v.innerHTML="",v.classList.add("hidden"),e==="draw"){v.classList.remove("hidden");let t=$(),o=document.createElement("input");o.type="color",o.className="color-swatch",o.value=t.brushColor,o.style.cssText="width:24px;height:24px;border:2px solid #444;border-radius:50%;cursor:pointer;padding:0;background:none;",o.addEventListener("input",()=>Ae("brushColor",o.value)),v.appendChild(o);for(let n of[2,4,8]){let r=document.createElement("button");r.className=`size-btn${n===t.brushSize?" active":""}`,r.textContent=`${n}px`,r.addEventListener("click",()=>{Ae("brushSize",n),v?.querySelectorAll(".size-btn").forEach(i=>i.classList.remove("active")),r.classList.add("active")}),v.appendChild(r)}}else if(e==="text"){v.classList.remove("hidden");let t=$(),o=document.createElement("input");o.type="color",o.value=t.textColor,o.style.cssText="width:24px;height:24px;border:2px solid #444;border-radius:50%;cursor:pointer;padding:0;background:none;",o.addEventListener("input",()=>Ae("textColor",o.value)),v.appendChild(o);for(let n of[12,16,20,24]){let r=document.createElement("button");r.className=`size-btn${n===t.fontSize?" active":""}`,r.textContent=`${n}`,r.addEventListener("click",()=>{Ae("fontSize",n),v?.querySelectorAll(".size-btn").forEach(i=>i.classList.remove("active")),r.classList.add("active")}),v.appendChild(r)}}}}function Do(){document.removeEventListener("keydown",Po,!0),V?.remove(),V=null,v=null,tn.clear()}var y=null,Oe=null,nn=new Map;function ee(e,t){nn.set(e,t)}function $o(){y=document.createElement("div"),y.setAttribute("data-sketch-ui-interaction","true"),y.style.cssText=`
    position: fixed;
    top: 0;
    left: 48px;
    width: calc(100vw - 48px);
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(y),y.addEventListener("mousedown",e=>{Oe?.onMouseDown?.(e)}),y.addEventListener("mousemove",e=>{Oe?.onMouseMove?.(e)}),y.addEventListener("mouseup",e=>{Oe?.onMouseUp?.(e)})}function zo(e){Oe=nn.get(e)||null,y&&(y.style.pointerEvents=e==="pointer"?"none":"auto");let t={pointer:"default",grab:"grab",move:"move",draw:"crosshair",color:"pointer",text:"text",lasso:"crosshair"};y&&(y.style.cursor=t[e]||"default")}function on(e){y&&(y.style.cursor=e)}function Bo(){y?.remove(),y=null,Oe=null,nn.clear()}function jo(){Ut(!0)}function Go(){Ut(!1)}var rn=!1,ln=0,sn=0,Yo={onMouseDown(e){rn=!0,ln=e.clientX,sn=e.clientY,on("grabbing")},onMouseMove(e){if(!rn)return;let t=e.clientX-ln,o=e.clientY-sn;window.scrollBy(-t,-o),ln=e.clientX,sn=e.clientY},onMouseUp(e){rn=!1,on("grab")}};var X=null,tt={x:0,y:0},_e=!1,an=!1,Uo={onMouseDown(e){Vt();let t=Ao(e.clientX,e.clientY);if(t){X=t,tt={x:e.clientX+window.scrollX-t.currentPos.x,y:e.clientY+window.scrollY-t.currentPos.y},_e=!0;return}let o=Qn();if(!o){an=!0,de("pointer");return}let n=to();if(!n)return;let r=Lo(n,{componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber});X=r,tt={x:e.clientX+window.scrollX-r.currentPos.x,y:e.clientY+window.scrollY-r.currentPos.y},_e=!0},onMouseMove(e){if(_e&&X){let t=e.clientX+window.scrollX-tt.x,o=e.clientY+window.scrollY-tt.y;Ro(X.id,t,o);return}no(e.clientX,e.clientY)},onMouseUp(e){_e&&X&&(Co(X.id,X.currentPos),Me()),X=null,_e=!1}};function Vo(){an&&(an=!1,de("move"))}function nt(e,t=2){if(e.length<=2)return e;let o=0,n=0,r=e[0],i=e[e.length-1];for(let l=1;l<e.length-1;l++){let s=ii(e[l],r,i);s>o&&(o=s,n=l)}if(o>t){let l=nt(e.slice(0,n+1),t),s=nt(e.slice(n),t);return[...l.slice(0,-1),...s]}return[r,i]}function ii(e,t,o){let n=o.x-t.x,r=o.y-t.y,i=n*n+r*r;if(i===0){let s=e.x-t.x,a=e.y-t.y;return Math.sqrt(s*s+a*a)}return Math.abs(r*e.x-n*e.y+o.x*t.y-o.y*t.x)/Math.sqrt(i)}async function W(e,t){let o=document.elementFromPoint(e,t);if(!o||o.closest("#sketch-ui-root")||o.hasAttribute("data-sketch-ui-ghost"))return null;let n=B(o);if(!n)return null;try{let i=await je(n);if(i&&i.length>0)for(let l of i){if(!l.functionName)continue;let s=l.functionName;if(s[0]!==s[0].toUpperCase()||ie(s))continue;let a="";if(l.fileName){let c=ke(l.fileName);Ge(c)&&(a=c)}return{componentName:s,filePath:a,lineNumber:l.lineNumber??0}}}catch{}let r=n;for(;r;){if(K(r)){let i=F(r.type);if(i&&i[0]===i[0].toUpperCase()&&!ie(i)){let l=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:l?.fileName||"",lineNumber:l?.lineNumber||0}}}r=r.return}return null}var _=null,ot=null,Xo={onMouseDown(e){let t=$();if(_=ho(t.brushColor,t.brushSize),_){let o=e.clientX+window.scrollX,n=e.clientY+window.scrollY;_.addPoint(o,n)}ot=W(e.clientX,e.clientY)},onMouseMove(e){if(!_)return;let t=e.clientX+window.scrollX,o=e.clientY+window.scrollY;_.addPoint(t,o)},async onMouseUp(e){if(!_)return;let t=_.getPoints(),o=$();if(_.group.remove(),t.length<2){_=null,ot=null;return}let n=await ot,r=nt(t,2),i=crypto.randomUUID();ao(i,r,o.brushColor,o.brushSize),pe({type:"draw",id:i,points:r,color:o.brushColor,strokeWidth:o.brushSize,targetComponent:n}),_=null,ot=null}};var x=null,te=null,rt=null,qo={onMouseDown(e){x&&Wo();let t=e.clientX+window.scrollX,o=e.clientY+window.scrollY;te={pageX:t,pageY:o},W(e.clientX,e.clientY).then(n=>{rt=n}),x=document.createElement("input"),x.type="text",x.placeholder="Type annotation...",x.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: rgba(0,0,0,0.8);
      color: white;
      border: 1px solid #64b5f6;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: ${$().fontSize}px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      outline: none;
      min-width: 120px;
    `,x.addEventListener("keydown",n=>{n.key==="Enter"&&(Wo(),n.preventDefault()),n.key==="Escape"&&(Ko(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(x),x.focus()},onMouseMove(){},onMouseUp(){}};function Wo(){if(!x||!te)return;let e=x.value.trim();if(x.remove(),x=null,!e)return;let t=$(),o=crypto.randomUUID();co(o,te.pageX,te.pageY,e,t.fontSize,t.textColor),pe({type:"text",id:o,position:te,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:rt}),te=null,rt=null}function Ko(){x&&(x.remove(),x=null),te=null,rt=null}function Zo(){Ko()}var S=null,Qo={async onMouseDown(e){S&&(S.remove(),S=null);let t=document.elementFromPoint(e.clientX,e.clientY);if(!t||t.closest("#sketch-ui-root")||t.hasAttribute("data-sketch-ui-ghost"))return;let o=await W(e.clientX,e.clientY);if(!o)return;let n=getComputedStyle(t).backgroundColor,r=getComputedStyle(t).color,i=C();if(!i)return;S=document.createElement("div"),S.style.cssText=`
      position: fixed;
      left: ${e.clientX+10}px;
      top: ${e.clientY+10}px;
      background: #1a1a2e;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 8px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 12px;
      color: #e0e0e0;
    `;let l="backgroundColor",s=document.createElement("div");s.style.cssText="display:flex;gap:8px;";for(let d of["backgroundColor","color"]){let m=document.createElement("label");m.style.cssText="display:flex;align-items:center;gap:4px;cursor:pointer;";let N=document.createElement("input");N.type="radio",N.name="color-prop",N.checked=d==="backgroundColor",N.addEventListener("change",()=>{l=d,a.value=Jo(d==="backgroundColor"?n:r)}),m.appendChild(N),m.appendChild(document.createTextNode(d==="backgroundColor"?"Background":"Text")),s.appendChild(m)}S.appendChild(s);let a=document.createElement("input");a.type="color",a.value=Jo(n),a.style.cssText="width:100%;height:32px;cursor:pointer;border:none;",a.addEventListener("input",()=>{t.style[l]=a.value}),a.addEventListener("change",()=>{let d=l==="backgroundColor"?n:r,m=a.value,N=crypto.randomUUID(),fe=t.getBoundingClientRect();uo(N,fe.right+window.scrollX,fe.top+window.scrollY,m),pe({type:"colorChange",id:N,component:o,targetElement:t,property:l,fromColor:d,toColor:m}),c()}),S.appendChild(a),i.appendChild(S);let c=()=>{S?.remove(),S=null,document.removeEventListener("keydown",u,!0),document.removeEventListener("mousedown",p,!0)},u=d=>{d.key==="Escape"&&c()};document.addEventListener("keydown",u,!0);let p=d=>{S&&!S.contains(d.target)&&c()};setTimeout(()=>document.addEventListener("mousedown",p,!0),0)},onMouseMove(){},onMouseUp(){}};function Jo(e){let t=e.match(/\d+/g);return!t||t.length<3?"#000000":"#"+t.slice(0,3).map(o=>parseInt(o).toString(16).padStart(2,"0")).join("")}function er(){S?.remove(),S=null}var tr="http://www.w3.org/2000/svg",k=[],H=null,me=null,nr=[],cn=[],or={onMouseDown(e){it(),k=[{x:e.clientX,y:e.clientY}];let t=C();t&&(me=document.createElementNS(tr,"svg"),me.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647;"),H=document.createElementNS(tr,"path"),H.setAttribute("stroke","#42a5f5"),H.setAttribute("stroke-width","2"),H.setAttribute("stroke-dasharray","4,4"),H.setAttribute("fill","rgba(66,165,245,0.1)"),me.appendChild(H),t.appendChild(me))},onMouseMove(e){!H||k.length===0||(k.push({x:e.clientX,y:e.clientY}),li())},async onMouseUp(e){if(k.length<3){un();return}let t=si();un();let o=document.querySelectorAll("*"),n=new Set,r=[];for(let l of o){if(l.closest("#sketch-ui-root")||l.hasAttribute?.("data-sketch-ui-ghost"))continue;let s=l.getBoundingClientRect();s.left<t.right&&s.right>t.left&&s.top<t.bottom&&s.bottom>t.top&&s.width>0&&s.height>0&&r.push({el:l,rect:s})}let i=await Promise.all(r.map(({rect:l})=>W(l.left+l.width/2,l.top+l.height/2)));for(let l=0;l<r.length;l++){let s=i[l],{el:a,rect:c}=r[l];s&&!n.has(`${s.filePath}:${s.lineNumber}`)&&(n.add(`${s.filePath}:${s.lineNumber}`),nr.push(a),ai(c))}}};function li(){if(!H||k.length<2)return;let e=`M${k[0].x},${k[0].y}`;for(let t=1;t<k.length;t++)e+=` L${k[t].x},${k[t].y}`;e+=" Z",H.setAttribute("d",e)}function si(){let e=1/0,t=1/0,o=-1/0,n=-1/0;for(let r of k)e=Math.min(e,r.x),t=Math.min(t,r.y),o=Math.max(o,r.x),n=Math.max(n,r.y);return{left:e,top:t,right:o,bottom:n}}function ai(e){let t=document.createElement("div");t.setAttribute("data-sketch-ui-ghost","true"),t.style.cssText=`
    position: fixed;
    left: ${e.left}px;
    top: ${e.top}px;
    width: ${e.width}px;
    height: ${e.height}px;
    border: 2px solid #42a5f5;
    pointer-events: none;
    z-index: 2147483645;
  `,document.body.appendChild(t),cn.push(t)}function un(){me?.remove(),me=null,H=null,k=[]}function it(){un(),cn.forEach(e=>e.remove()),cn=[],nr=[]}var ci={pointer:"Select",grab:"Grab",move:"Move",draw:"Draw",color:"Color",text:"Text",lasso:"Lasso"};function rr(){let e=window.__SKETCH_UI_WS_PORT__;if(!e){console.warn("[SketchUI] No WebSocket port found.");return}document.getElementById("sketch-ui-root")||(He(e),vn(ui),Zn(),io(),so(),ko(),Fo(),$o(),oo(()=>{Vo()}),ee("grab",Yo),ee("move",Uo),ee("draw",Xo),ee("text",qo),ee("color",Qo),ee("lasso",or),vo((t,o)=>{o==="pointer"&&Go(),o==="text"&&Zo(),o==="color"&&er(),o==="lasso"&&it(),t==="pointer"&&jo(),zo(t),Io(t),Sn(ci[t]||t)}),yo(()=>{wn(So())}),xn(()=>{let t=!et();To(t),Tn(t)}),En(()=>{let t=No();console.log("[SketchUI] Generate \u2014 serialized annotations:",JSON.stringify(t,null,2))}),Cn(()=>{if(xo()==="pointer")return!1;let t=wo();return t?(ft(`Undo: ${t}`),!0):!1}),Ho(()=>{po(),it(),Jt(),ft("Canvas cleared")}),console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools"))}function ui(){eo(),lo(),mo(),Oo(),Do(),Bo(),Jt(),dn(),yn()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",rr):rr();})();
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
