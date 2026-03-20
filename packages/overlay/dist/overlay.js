"use strict";var SketchUI=(()=>{var x=null,me=[],te=0,Jo=5,rt=null,it=null,lt=null,st=null,at=null;function Oe(e){x&&x.readyState===WebSocket.OPEN||(at=e,x=new WebSocket(`ws://localhost:${e}`),x.onopen=()=>{let t=te>0;te=0,t&&st&&st()},x.onmessage=t=>{try{let o=JSON.parse(t.data);me.forEach(n=>n(o))}catch{}},x.onclose=t=>{if(x=null,t.code===4001){lt&&lt();return}if(te<Jo){let o=500*Math.pow(2,te);te++,rt=setTimeout(()=>Oe(e),o)}else it&&it()},x.onerror=()=>{})}function fe(e){x&&x.readyState===WebSocket.OPEN&&x.send(JSON.stringify(e))}function he(e){return me.push(e),()=>{me=me.filter(t=>t!==e)}}function ln(){rt&&clearTimeout(rt),x&&(x.close(),x=null),me=[]}function sn(e){it=e}function an(e){lt=e}function cn(e){st=e}function un(){at&&(te=0,Oe(at))}var ne=null,f=null,A=null,ct=null,ge=0,Fe=null,He=null,q=null,ut=null,be=null,dt=null,pn=null,Qo=`
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
    font-size: 14px;
    padding: 4px 6px;
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
`;function mn(e){let t=document.createElement("div");t.id="sketch-ui-root",document.body.appendChild(t),ne=t.attachShadow({mode:"open"});let o=document.createElement("style");o.textContent=Qo;let n=document.createElement("div");n.className="toolbar",n.innerHTML=`
    <span class="mode">Select</span>
    <span class="divider"></span>
    <span class="component-info">No selection</span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="eye-btn" title="Toggle originals (.)">\u{1F441}</button>
    <button class="undo-btn" disabled>Undo Reorder</button>
    <button class="close-btn">&times;</button>
  `,ne.appendChild(o),ne.appendChild(n),f=n.querySelector(".component-info"),A=n.querySelector(".undo-btn");let r=n.querySelector(".close-btn");Fe=n.querySelector(".generate-btn"),He=n.querySelector(".eye-btn"),q=document.createElement("div"),q.className="toast",ne.appendChild(q),A.addEventListener("click",()=>{fe({type:"undo"}),A.disabled=!0}),r.addEventListener("click",e),He.addEventListener("click",()=>{be&&be()}),Fe.addEventListener("click",()=>{dt&&dt()}),document.addEventListener("keydown",i=>{i.key==="."&&!dn()&&be&&be(),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!dn()&&pn?.()&&i.preventDefault()}),sn(()=>{f&&(f.innerHTML='Disconnected. <button style="background:none;border:none;color:#64b5f6;cursor:pointer;text-decoration:underline;font:inherit;">Reconnect</button>',f.classList.add("error"),f.querySelector("button")?.addEventListener("click",()=>{un(),f&&(f.textContent="Reconnecting...")}))}),an(()=>{_e("Disconnected: another tab took over")}),cn(()=>{ge=0,A&&(A.disabled=!0)}),he(i=>{switch(i.type){case"reorderComplete":i.success?(ge++,A&&(A.disabled=!1)):i.error&&_e(i.error);break;case"undoComplete":i.success?(ge=Math.max(0,ge-1),A&&(A.disabled=ge===0)):i.error&&_e(i.error);break;case"devServerDisconnected":_e("Dev server disconnected");break;case"devServerReconnected":ye("No selection");break}})}function ye(e){f&&(f.textContent=e,f.classList.remove("error"))}function _e(e){f&&(f.textContent=e,f.classList.add("error"),ct&&clearTimeout(ct),ct=setTimeout(()=>{f&&(f.textContent="No selection",f.classList.remove("error"))},3e3))}function fn(){let e=document.getElementById("sketch-ui-root");e&&e.remove(),ne=null,f=null,A=null}function E(){return ne}function hn(e){be=e}function gn(e){dt=e}function bn(e){pn=e}function yn(e){He&&(He.textContent=e?"\u{1F441}\u200D\u{1F5E8}":"\u{1F441}")}function vn(e){Fe&&(Fe.disabled=!e)}function pt(e){q&&(q.textContent=e,q.classList.add("visible"),ut&&clearTimeout(ut),ut=setTimeout(()=>{q?.classList.remove("visible")},2e3))}function xn(e){let t=E()?.querySelector(".mode");t&&(t.textContent=e)}function dn(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var mt="0.5.32",Te=`bippy-${mt}`,En=Object.defineProperty,er=Object.prototype.hasOwnProperty,ve=()=>{},Cn=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},Ie=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Sn=!1,Tn,xe=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Sn?!0:(e&&typeof e.inject=="function"&&(Tn=e.inject.toString()),!!Tn?.includes("(injected)")),Pe=new Set,z=new Set,ft=e=>{let t=new Map,o=0,n={_instrumentationIsActive:!1,_instrumentationSource:Te,checkDCE:Cn,hasUnsupportedRendererAttached:!1,inject(r){let i=++o;return t.set(i,r),z.add(r),n._instrumentationIsActive||(n._instrumentationIsActive=!0,Pe.forEach(l=>l())),i},on:ve,onCommitFiberRoot:ve,onCommitFiberUnmount:ve,onPostCommitFiberRoot:ve,renderers:t,supportsFiber:!0,supportsFlight:!0};try{En(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return n},set(l){if(l&&typeof l=="object"){let s=n.renderers;n=l,s.size>0&&(s.forEach((a,c)=>{z.add(a),l.renderers.set(c,a)}),Ee(e))}}});let r=window.hasOwnProperty,i=!1;En(window,"hasOwnProperty",{configurable:!0,value:function(...l){try{if(!i&&l[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,l)},writable:!0})}catch{Ee(e)}return n},Ee=e=>{e&&Pe.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Cn,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Te,t._instrumentationIsActive=!1;let o=Ie(t);if(o||(t.on=ve),t.renderers.size){t._instrumentationIsActive=!0,Pe.forEach(i=>i());return}let n=t.inject,r=xe(t);r&&!o&&(Sn=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let l=n(i);return z.add(i),r&&t.renderers.set(l,i),t._instrumentationIsActive=!0,Pe.forEach(s=>s()),l}}(t.renderers.size||t._instrumentationIsActive||xe())&&e?.()}catch{}},ht=()=>er.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),oe=e=>ht()?(Ee(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):ft(e),gt=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),De=()=>{try{gt()&&oe()}catch{}};De();var bt=0,yt=1;var vt=5;var xt=11,Et=13;var Tt=15,Ct=16;var St=19;var wt=26,Nt=27,Mt=28,kt=30;var K=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function Lt(e,t,o=!1){if(!e)return null;let n=t(e);if(n instanceof Promise)return(async()=>{if(await n===!0)return e;let i=o?e.return:e.child;for(;i;){let l=await At(i,t,o);if(l)return l;i=o?null:i.sibling}return null})();if(n===!0)return e;let r=o?e.return:e.child;for(;r;){let i=Rt(r,t,o);if(i)return i;r=o?null:r.sibling}return null}var Rt=(e,t,o=!1)=>{if(!e)return null;if(t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=Rt(n,t,o);if(r)return r;n=o?null:n.sibling}return null},At=async(e,t,o=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=await At(n,t,o);if(r)return r;n=o?null:n.sibling}return null};var Ot=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Ot(t.type||t.render):null},H=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let o=t.displayName||t.name||null;if(o)return o;let n=Ot(t);return n&&(n.displayName||n.name)||null};var _t=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||Ie(e)||xe(e)};var Ft=e=>{let t=oe(e.onActive);t._instrumentationSource=e.name??Te;let o=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(l,s,a)=>{o!==i&&(o?.(l,s,a),e.onCommitFiberRoot?.(l,s,a))};t.onCommitFiberRoot=i}let n=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(l,s)=>{t.onCommitFiberUnmount===i&&(n?.(l,s),e.onCommitFiberUnmount?.(l,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(l,s)=>{t.onPostCommitFiberRoot===i&&(r?.(l,s),e.onPostCommitFiberRoot?.(l,s))};t.onPostCommitFiberRoot=i}return t},B=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let o of t.renderers.values())try{let n=o.findFiberByHostInstance?.(e);if(n)return n}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let o in e)if(o.startsWith("__reactContainer$")||o.startsWith("__reactInternalInstance$")||o.startsWith("__reactFiber"))return e[o]||null}return null},tr=Error();var wn=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,nr=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],or=["<anonymous>","eval",""],Fn=/\.(jsx|tsx|ts|js)$/,rr=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,ir=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Hn="(at Server)",lr=/(^|@)\S+:\d+/,Pn=/^\s*at .*(\S+:\d+|\(native\))/m,sr=/^(eval@)?(\[native code\])?$/;var In=(e,t)=>{if(t?.includeInElement!==!1){let o=e.split(`
`),n=[];for(let r of o)if(/^\s*at\s+/.test(r)){let i=Nn(r,void 0)[0];i&&n.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");n.push({functionName:i,source:r})}else if(r.match(lr)){let i=Mn(r,void 0)[0];i&&n.push(i)}return It(n,t)}return e.match(Pn)?Nn(e,t):Mn(e,t)},Dn=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,o=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return o?[o[1],o[2]||void 0,o[3]||void 0]:[t,void 0,void 0]},It=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var Nn=(e,t)=>It(e.split(`
`).filter(o=>!!o.match(Pn)),t).map(o=>{let n=o;n.includes("(eval ")&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let l=Dn(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(l[0])?void 0:l[0],lineNumber:l[1]?+l[1]:void 0,columnNumber:l[2]?+l[2]:void 0,source:n}});var Mn=(e,t)=>It(e.split(`
`).filter(o=>!o.match(sr)),t).map(o=>{let n=o;if(n.includes(" > eval")&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!n.includes("@")&&!n.includes(":"))return{functionName:n};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=n.match(r),l=i&&i[1]?i[1]:void 0,s=Dn(n.replace(r,""));return{functionName:l,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:n}}});var ar=44,kn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",cr=new Uint8Array(64),$n=new Uint8Array(128);for(let e=0;e<kn.length;e++){let t=kn.charCodeAt(e);cr[e]=t,$n[t]=e}function Ce(e,t){let o=0,n=0,r=0;do r=$n[e.next()],o|=(r&31)<<n,n+=5;while(r&32);let i=o&1;return o>>>=1,i&&(o=-2147483648|-o),t+o}function Ln(e,t){return e.pos>=t?!1:e.peek()!==ar}var ur=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:o}=this,n=t.indexOf(e,o);return n===-1?t.length:n}};function zn(e){let{length:t}=e,o=new ur(e),n=[],r=0,i=0,l=0,s=0,a=0;do{let c=o.indexOf(";"),u=[],p=!0,d=0;for(r=0;o.pos<c;){let m;r=Ce(o,r),r<d&&(p=!1),d=r,Ln(o,c)?(i=Ce(o,i),l=Ce(o,l),s=Ce(o,s),Ln(o,c)?(a=Ce(o,a),m=[r,i,l,s,a]):m=[r,i,l,s]):m=[r],u.push(m),o.pos++}p||dr(u),n.push(u),o.pos=c+1}while(o.pos<=t);return n}function dr(e){e.sort(pr)}function pr(e,t){return e[0]-t[0]}var Bn=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,mr=/^data:application\/json[^,]+base64,/,fr=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Gn=typeof WeakRef<"u",Se=new Map,$e=new Map,hr=e=>Gn&&e instanceof WeakRef,Rn=(e,t,o,n)=>{if(o<0||o>=e.length)return null;let r=e[o];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=n)i=u;else break;if(!i||i.length<4)return null;let[,l,s,a]=i;if(l===void 0||s===void 0||a===void 0)return null;let c=t[l];return c?{columnNumber:a,fileName:c,lineNumber:s+1}:null},gr=(e,t,o)=>{if(e.sections){let n=null;for(let l of e.sections)if(t>l.offset.line||t===l.offset.line&&o>=l.offset.column)n=l;else break;if(!n)return null;let r=t-n.offset.line,i=t===n.offset.line?o-n.offset.column:o;return Rn(n.map.mappings,n.map.sources,r,i)}return Rn(e.mappings,e.sources,t-1,o)},br=(e,t)=>{let o=t.split(`
`),n;for(let i=o.length-1;i>=0&&!n;i--){let l=o[i].match(fr);l&&(n=l[1]||l[2])}if(!n)return null;let r=Bn.test(n);if(!(mr.test(n)||r||n.startsWith("/"))){let i=e.split("/");i[i.length-1]=n,n=i.join("/")}return n},yr=e=>({file:e.file,mappings:zn(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),vr=e=>{let t=e.sections.map(({map:n,offset:r})=>({map:{...n,mappings:zn(n.mappings)},offset:r})),o=new Set;for(let n of t)for(let r of n.map.sources)o.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(o),sourcesContent:void 0,version:3}},An=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let o=t.match(Bn);if(!o)return!0;let n=o[0].toLowerCase();return n==="http:"||n==="https:"},xr=async(e,t=fetch)=>{if(!An(e))return null;let o;try{let r=await t(e);if(!r.ok)return null;o=await r.text()}catch{return null}if(!o)return null;let n=br(e,o);if(!n||!An(n))return null;try{let r=await t(n);if(!r.ok)return null;let i=await r.json();return"sections"in i?vr(i):yr(i)}catch{return null}},Er=async(e,t=!0,o)=>{if(t&&Se.has(e)){let i=Se.get(e);if(i==null)return null;if(hr(i)){let l=i.deref();if(l)return l;Se.delete(e)}else return i}if(t&&$e.has(e))return $e.get(e);let n=xr(e,o);t&&$e.set(e,n);let r=await n;return t&&$e.delete(e),t&&(r===null?Se.set(e,null):Se.set(e,Gn?new WeakRef(r):r)),r},Tr=async(e,t=!0,o)=>await Promise.all(e.map(async n=>{if(!n.fileName)return n;let r=await Er(n.fileName,t,o);if(!r||typeof n.lineNumber!="number"||typeof n.columnNumber!="number")return n;let i=gr(r,n.lineNumber,n.columnNumber);return i?{...n,source:i.fileName&&n.source?n.source.replace(n.fileName,i.fileName):n.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:n})),Cr=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",Sr=()=>{let e=oe();for(let t of[...Array.from(z),...Array.from(e.renderers.values())]){let o=t.currentDispatcherRef;if(o&&typeof o=="object")return"H"in o?o.H:o.current}return null},On=e=>{for(let t of z){let o=t.currentDispatcherRef;o&&typeof o=="object"&&("H"in o?o.H=e:o.current=e)}},P=e=>`
    in ${e}`,wr=(e,t)=>{let o=P(e);return t&&(o+=` (at ${t})`),o},Ht=!1,Pt=(e,t)=>{if(!e||Ht)return"";let o=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Ht=!0;let n=Sr();On(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(d){u=d}Reflect.construct(e,[],p)}else{try{p.call()}catch(d){u=d}e.call(p.prototype)}}else{try{throw Error()}catch(d){u=d}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[a,c]=s.DetermineComponentFrameRoot();if(a&&c){let u=a.split(`
`),p=c.split(`
`),d=0,m=0;for(;d<u.length&&!u[d].includes("DetermineComponentFrameRoot");)d++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(d===u.length||m===p.length)for(d=u.length-1,m=p.length-1;d>=1&&m>=0&&u[d]!==p[m];)m--;for(;d>=1&&m>=0;d--,m--)if(u[d]!==p[m]){if(d!==1||m!==1)do if(d--,m--,m<0||u[d]!==p[m]){let w=`
${u[d].replace(" at new "," at ")}`,pe=H(e);return pe&&w.includes("<anonymous>")&&(w=w.replace("<anonymous>",pe)),w}while(d>=1&&m>=0);break}}}finally{Ht=!1,Error.prepareStackTrace=o,On(n),console.error=r,console.warn=i}let l=e?H(e):"";return l?P(l):""},Nr=(e,t)=>{let o=e.tag,n="";switch(o){case Mt:n=P("Activity");break;case yt:n=Pt(e.type,!0);break;case xt:n=Pt(e.type.render,!1);break;case bt:case Tt:n=Pt(e.type,!1);break;case vt:case wt:case Nt:n=P(e.type);break;case Ct:n=P("Lazy");break;case Et:n=e.child!==t&&t!==null?P("Suspense Fallback"):P("Suspense");break;case St:n=P("SuspenseList");break;case kt:n=P("ViewTransition");break;default:return""}return n},Mr=e=>{try{let t="",o=e,n=null;do{t+=Nr(o,n);let r=o._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let l=r[i];typeof l.name=="string"&&(t+=wr(l.name,l.env))}n=o,o=o.return}while(o);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},kr=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let o=e;if(!o)return"";Error.prepareStackTrace=t,o.startsWith(`Error: react-stack-top-frame
`)&&(o=o.slice(29));let n=o.indexOf(`
`);if(n!==-1&&(o=o.slice(n+1)),n=Math.max(o.indexOf("react_stack_bottom_frame"),o.indexOf("react-stack-bottom-frame")),n!==-1&&(n=o.lastIndexOf(`
`,n)),n!==-1)o=o.slice(0,n);else return"";return o},Lr=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),Rr=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,Ar=e=>{let t=new Map;for(let o of e)for(let n of o.stackFrames){if(!Lr(n))continue;let r=n.functionName,i=t.get(r)??[];i.some(l=>Rr(l,n))||(i.push(n),t.set(r,i))}return t},Or=(e,t,o)=>{if(!e.functionName)return{...e,isServer:!0};let n=t.get(e.functionName);if(!n||n.length===0)return{...e,isServer:!0};let r=o.get(e.functionName)??0,i=n[r%n.length];return o.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Hn,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},_r=e=>{let t=[];return Lt(e,o=>{if(!Cr(o))return;let n=typeof o.type=="string"?o.type:H(o.type)||"<anonymous>";t.push({componentName:n,stackFrames:In(kr(o._debugStack?.stack))})},!0),t},ze=async(e,t=!0,o)=>{let n=_r(e),r=In(Mr(e)),i=Ar(n),l=new Map;return Tr(r.map(s=>s.source?.includes(Hn)??!1?Or(s,i,l):s).filter((s,a,c)=>{if(a===0)return!0;let u=c[a-1];return s.functionName!==u.functionName}),t,o)};var _n=e=>e.split("/").filter(Boolean).length,Fr=e=>e.split("/").filter(Boolean)[0]??null,Hr=e=>{let t=e.indexOf("/",1);if(t===-1||_n(e.slice(0,t))!==1)return e;let o=e.slice(t);if(!Fn.test(o)||_n(o)<2)return e;let n=Fr(o);return!n||n.startsWith("@")||n.length>4?e:o},we=e=>{if(!e||or.some(i=>i===e))return"";let t=e,o=t.startsWith("http://")||t.startsWith("https://");if(o)try{t=new URL(t).pathname}catch{}if(o&&(t=Hr(t)),t.startsWith("about://React/")){let i=t.slice(14),l=i.indexOf("/"),s=i.indexOf(":");t=l!==-1&&(s===-1||l<s)?i.slice(l+1):i}let n=!0;for(;n;){n=!1;for(let i of nr)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),n=!0;break}}if(wn.test(t)){let i=t.match(wn);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);ir.test(i)&&(t=t.slice(0,r))}return t},Be=e=>{let t=we(e);return!(!t||!Fn.test(t)||rr.test(t))};var Pr=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function re(e){return!!(Pr.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}_t()||Ft({onCommitFiberRoot(){}});async function Ir(e){let t=B(e);if(!t)return null;try{let o=await ze(t);if(o&&o.length>0){let n=[];for(let r of o){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||re(i))continue;let l="";if(r.fileName){let s=we(r.fileName);Be(s)&&(l=s)}n.push({componentName:i,filePath:l,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(n.length>0)return{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}}catch(o){console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:",o)}return jn(e,t)}function jn(e,t){let o=[],n=t;for(;n;){if(K(n)){let r=H(n.type),i=n._debugSource||n._debugOwner?._debugSource,l="",s=0,a=0;i&&(l=i.fileName||"",s=i.lineNumber||0,a=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!re(r)&&o.push({componentName:r,filePath:l,lineNumber:s,columnNumber:a})}n=n.return}return o.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}function Yn(e){let t=B(e);return t?jn(e,t):null}var D=null,Z=null,G=!1,le=!1,M=null,k=null,O=null,L=null,I="idle",h=null,ie=null,Dt=null,$t=null,zt=null,Dr=`
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
`;function Un(e){Dt=e.onStart,$t=e.onMove,zt=e.onEnd}function Xn(){let e=E();if(!e)return;let t=document.createElement("style");t.textContent=Dr,e.appendChild(t),M=document.createElement("div"),M.className="hover-overlay",e.appendChild(M),k=document.createElement("div"),k.className="selection-overlay",e.appendChild(k),O=document.createElement("div"),O.className="selection-label",e.appendChild(O),L=document.createElement("div"),L.className="marquee-box",e.appendChild(L),G=!0,document.addEventListener("mousedown",Ge,!0),document.addEventListener("mousemove",Ye,!0),document.addEventListener("mouseup",je,!0),document.addEventListener("keydown",Ue,!0),le=!0}function Ge(e){if(!G)return;e.preventDefault(),e.stopPropagation();let t=document.elementFromPoint(e.clientX,e.clientY);!t||t.closest("#sketch-ui-root")||(h={x:e.clientX,y:e.clientY},ie=t,D&&Z&&Z.contains(t)?(I="drag",Dt&&Dt(e,Z,D)):I="pending")}function Ye(e){if(G){if(I==="drag"){$t&&$t(e);return}if(I==="pending"&&h){let t=Math.abs(e.clientX-h.x),o=Math.abs(e.clientY-h.y);(t>10||o>10)&&(I="marquee")}if(I==="marquee"&&h&&L){let t=Math.min(e.clientX,h.x),o=Math.min(e.clientY,h.y),n=Math.abs(e.clientX-h.x),r=Math.abs(e.clientY-h.y);L.style.display="block",L.style.left=`${t}px`,L.style.top=`${o}px`,L.style.width=`${n}px`,L.style.height=`${r}px`;return}if(I==="idle"){let t=document.elementFromPoint(e.clientX,e.clientY);if(!t||t.closest("#sketch-ui-root")){Wn();return}let o=t.getBoundingClientRect();M&&(M.style.display="block",M.style.left=`${o.left}px`,M.style.top=`${o.top}px`,M.style.width=`${o.width}px`,M.style.height=`${o.height}px`)}}}function je(e){if(!G)return;let t=I;if(I="idle",t==="drag"){zt&&zt(e),h=null,ie=null;return}if(t==="marquee"&&h){L&&(L.style.display="none"),zr(Math.min(e.clientX,h.x),Math.min(e.clientY,h.y),Math.max(e.clientX,h.x),Math.max(e.clientY,h.y)),h=null,ie=null;return}ie&&$r(ie),h=null,ie=null}async function $r(e){try{let t=await Ir(e);if(console.log("[SketchUI] selectElement:",e.tagName,"\u2192",t?.componentName,t?.filePath,"stack:",t?.stack?.map(l=>l.componentName)),!t)return;Z=e,D={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:e.getBoundingClientRect().top,left:e.getBoundingClientRect().left,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}},Vn(e.getBoundingClientRect(),D),Wn();let o=`<${t.tagName}>`,n=`<${t.componentName} />`,r=t.filePath?` \u2014 ${t.filePath}:${t.lineNumber}`:"",i=t.tagName===t.componentName.toLowerCase()?`${n}${r}`:`${o} in ${n}${r}`;ye(i)}catch(t){console.error("[SketchUI] selectElement error:",t)}}function zr(e,t,o,n){let r=[],i=document.querySelectorAll("*");for(let a of i){if(a.closest("#sketch-ui-root"))continue;let c=a.getBoundingClientRect();c.left<o&&c.right>e&&c.top<n&&c.bottom>t&&c.width>0&&c.height>0&&r.push(a)}if(r.length===0)return;let l=[];for(let a of r.slice(0,50)){let c=Yn(a);c?.stack?.length&&l.push(c.stack)}if(l.length===0)return;let s=Br(l);if(s)for(let a of r){let c=Yn(a);if(c&&c.componentName===s.componentName){let u=a.getBoundingClientRect();Z=a,D={tagName:a.tagName.toLowerCase(),componentName:s.componentName,filePath:s.filePath,lineNumber:s.lineNumber,columnNumber:s.columnNumber,stack:c.stack,boundingRect:{top:u.top,left:u.left,width:u.width,height:u.height}},Vn(u,D),ye(`<${s.componentName} /> \u2014 ${s.filePath}:${s.lineNumber}`);return}}}function Br(e){if(e.length===0)return null;if(e.length===1)return e[0][0];let t=e[0],o=null;for(let n=0;n<t.length;n++){let r=t[n];if(e.every(l=>l[n]&&l[n].filePath===r.filePath&&l[n].lineNumber===r.lineNumber))o=r;else break}return o}function Ue(e){G&&e.key==="Escape"&&D&&(Bt(),e.preventDefault())}function Vn(e,t){k&&(k.style.display="block",k.style.left=`${e.left}px`,k.style.top=`${e.top}px`,k.style.width=`${e.width}px`,k.style.height=`${e.height}px`),O&&(O.style.display="block",O.style.left=`${e.left}px`,O.style.top=`${e.top-20}px`,O.textContent=`<${t.componentName} />`)}function Wn(){M&&(M.style.display="none")}function Bt(){D=null,Z=null,k&&(k.style.display="none"),O&&(O.style.display="none"),ye("No selection")}function qn(){return D}function Kn(){G=!1,document.removeEventListener("mousedown",Ge,!0),document.removeEventListener("mousemove",Ye,!0),document.removeEventListener("mouseup",je,!0),document.removeEventListener("keydown",Ue,!0),le=!1}function Gt(e){e&&!le?(document.addEventListener("mousedown",Ge,!0),document.addEventListener("mousemove",Ye,!0),document.addEventListener("mouseup",je,!0),document.addEventListener("keydown",Ue,!0),le=!0,G=!0):!e&&le&&(document.removeEventListener("mousedown",Ge,!0),document.removeEventListener("mousemove",Ye,!0),document.removeEventListener("mouseup",je,!0),document.removeEventListener("keydown",Ue,!0),le=!1,G=!1)}function Zn(){return Z??null}var C=null,T=null,Y=null,Jn=null,Ne=!1,se=null,Xe=[],Ve=new Map,We=!1,Gr=`
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
`,ae=null;function Qn(){let e=E();if(!e)return;let t=document.createElement("style");t.textContent=Gr,e.appendChild(t),Un({onStart:Yr,onMove:jr,onEnd:Ur}),he(o=>{o.type==="reorderComplete"&&(Yt(),Bt())})}function Yr(e,t,o){Y=o,Jn=t,se={x:e.clientX,y:e.clientY},Ne=!1,We=!1,Xe=[],Ve=new Map,ae=null;let n=E();if(!n)return;C=document.createElement("div"),C.className="drag-preview";let r=t.getBoundingClientRect();C.style.width=`${r.width}px`,C.style.height=`${r.height}px`,C.innerHTML=t.outerHTML,n.appendChild(C),T=document.createElement("div"),T.className="drop-indicator",n.appendChild(T);let i=o.stack[1];if(!i)return;fe({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let l=he(s=>{if(s.type!=="siblingsList")return;l(),Xe=s.siblings;let a=document.querySelectorAll("*");for(let c of a){if(c.closest("#sketch-ui-root"))continue;let u=B(c);if(!u)continue;let p=u;for(;p;){if(K(p)){let d=p._debugSource||p._debugOwner?._debugSource;if(d){for(let m of s.siblings)d.lineNumber===m.lineNumber&&d.fileName===i.filePath&&Ve.set(m.lineNumber,{el:c,rect:c.getBoundingClientRect()});break}}p=p.return}}We=!0})}function jr(e){if(!se)return;let t=Math.abs(e.clientX-se.x),o=Math.abs(e.clientY-se.y);if(t<5&&o<5||(Ne=!0,C&&(C.style.display="block",C.style.left=`${e.clientX+10}px`,C.style.top=`${e.clientY+10}px`),!We||!Y))return;let n=null,r=1/0,i=0,l=0,s=0;for(let a of Xe){if(a.lineNumber===Y.lineNumber)continue;let c=Ve.get(a.lineNumber);if(!c)continue;let u=c.rect,p=u.top+u.height/2,d=Math.abs(e.clientY-p);d<r&&(r=d,n=a,e.clientY<p?i=u.top-2:i=u.bottom+2,l=u.left,s=u.width)}ae=n,n&&T?(T.style.display="block",T.style.top=`${i}px`,T.style.left=`${l}px`,T.style.width=`${s}px`):T&&(T.style.display="none")}function Ur(e){if(!Ne||!ae||!Y){Yt();return}fe({type:"reorder",filePath:Y.filePath,fromLine:Y.lineNumber,toLine:ae.lineNumber,fromComponent:Y.componentName,toComponent:ae.componentName}),C&&(C.style.display="none"),T&&(T.style.display="none"),Ne=!1,se=null}function Yt(){C?.remove(),T?.remove(),C=null,T=null,Y=null,Jn=null,Ne=!1,se=null,We=!1,Xe=[],Ve=new Map,ae=null}function eo(){Yt()}var j="http://www.w3.org/2000/svg",ce=null,g=null;function to(){let e=E();e&&(ce=document.createElementNS(j,"svg"),ce.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),g=document.createElementNS(j,"g"),g.setAttribute("class","annotation-root"),ce.appendChild(g),e.appendChild(ce),window.addEventListener("scroll",Ut,{passive:!0}),Ut())}var jt=null;function Ut(){jt===null&&(jt=requestAnimationFrame(()=>{jt=null,g&&g.setAttribute("transform",`translate(${-window.scrollX}, ${-window.scrollY})`)}))}function no(e,t,o,n){if(!g||t.length<2)return null;let r=document.createElementNS(j,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(j,"path");return i.setAttribute("d",so(t)),i.setAttribute("stroke",o),i.setAttribute("stroke-width",String(n)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),g.appendChild(r),r}function oo(e,t,o,n,r,i){if(!g)return null;let l=document.createElementNS(j,"foreignObject");l.setAttribute("data-annotation-id",e),l.setAttribute("x",String(t)),l.setAttribute("y",String(o)),l.setAttribute("width","300"),l.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: rgba(0,0,0,0.8);
    color: ${i};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: ${r}px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=n,l.appendChild(s),g.appendChild(l),l}function ro(e,t,o,n){if(!g)return null;let r=document.createElementNS(j,"circle");return r.setAttribute("data-annotation-id",e),r.setAttribute("cx",String(t)),r.setAttribute("cy",String(o)),r.setAttribute("r","6"),r.setAttribute("fill",n),r.setAttribute("stroke","white"),r.setAttribute("stroke-width","1.5"),g.appendChild(r),r}function io(){g&&(g.innerHTML="")}function lo(){window.removeEventListener("scroll",Ut),ce?.remove(),ce=null,g=null}function so(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let o=1;o<e.length;o++)t+=` L${e[o].x},${e[o].y}`;return t}function ao(e,t){if(!g)return null;let o=[],n=document.createElementNS(j,"g"),r=document.createElementNS(j,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),n.appendChild(r),g.appendChild(n),{path:r,group:n,addPoint(i,l){o.push({x:i,y:l}),r.setAttribute("d",so(o))},getPoints(){return o}}}var R=new Map,U=[],Me=[],Xt="pointer",Vt=!1,uo={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},qe=[],Ke=[];function po(e){return qe.push(e),()=>{qe=qe.filter(t=>t!==e)}}function mo(e){return Ke.push(e),()=>{Ke=Ke.filter(t=>t!==e)}}function J(){Ke.forEach(e=>e())}function fo(){return Xt}function ke(e){let t=Xt;t!==e&&(Xt=e,qe.forEach(o=>o(e,t)))}function $(){return{...uo}}function Le(e,t){uo[e]=t}function Ze(){return R}function ho(e){R.set(e.id,e),Me.push({type:"ghostCreate",ghostId:e.id}),J()}function go(e,t){let o=R.get(e);if(!o)return;let n={...o.currentPos};o.currentPos=t,Me.push({type:"ghostMove",ghostId:e,previousPos:n}),J()}function Xr(e){let t=R.get(e);t&&(t.cloneEl.remove(),t.originalEl.style.opacity=t.originalOpacity,t.originalEl.style.visibility=t.originalVisibility,R.delete(e),J())}function ue(e){U.push(e),Me.push({type:"annotationAdd",annotationId:e.id}),J()}function co(e){U=U.filter(t=>t.id!==e),J()}function Je(){return Vt}function bo(e){Vt=e;for(let t of R.values())e?(t.originalEl.style.opacity="0",t.originalEl.style.visibility="hidden"):(t.originalEl.style.opacity="0.3",t.originalEl.style.visibility="visible");J()}function yo(){let e=Me.pop();if(!e)return null;switch(e.type){case"ghostCreate":return Xr(e.ghostId),"ghost removed";case"ghostMove":{let t=R.get(e.ghostId);return t&&(t.currentPos=e.previousPos,t.cloneEl.style.left=`${e.previousPos.x}px`,t.cloneEl.style.top=`${e.previousPos.y}px`),"move reverted"}case"annotationAdd":return co(e.annotationId),"annotation removed";case"colorChange":{let t=U.find(o=>o.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),co(e.annotationId),"color reverted"}}return null}function Wt(){for(let e of R.values())e.cloneEl.remove(),e.originalEl.style.opacity=e.originalOpacity,e.originalEl.style.visibility=e.originalVisibility;for(let e of U)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}R=new Map,U=[],Me=[],Vt=!1,J()}function vo(){return R.size>0||U.length>0}function xo(){let e=[];for(let n of R.values())e.push({component:n.componentRef.componentName,file:n.componentRef.filePath,line:n.componentRef.lineNumber,from:n.originalRect,to:n.currentPos});let t=[],o=[];for(let n of U)n.type==="draw"?t.push({type:"draw",startComponent:n.targetComponent?.componentName,startFile:n.targetComponent?.filePath,startLine:n.targetComponent?.lineNumber,points:n.points,color:n.color,strokeWidth:n.strokeWidth}):n.type==="text"?t.push({type:"text",content:n.content,position:n.position,targetComponent:n.targetComponent?.componentName,targetFile:n.targetComponent?.filePath,targetLine:n.targetComponent?.lineNumber}):n.type==="colorChange"&&o.push({component:n.component.componentName,file:n.component.filePath,line:n.component.lineNumber,property:n.property,from:n.fromColor,to:n.toColor});return{moves:e,annotations:t,colorChanges:o}}var Vr="2147483644";function Eo(){window.addEventListener("scroll",To,{passive:!0})}var qt=null;function To(){qt===null&&(qt=requestAnimationFrame(()=>{qt=null;for(let e of Ze().values())e.cloneEl.style.left=`${e.currentPos.x-window.scrollX}px`,e.cloneEl.style.top=`${e.currentPos.y-window.scrollY}px`}))}function Co(e,t){let o=e.getBoundingClientRect(),n=e.cloneNode(!0);n.setAttribute("data-sketch-ui-ghost","true"),n.style.position="fixed",n.style.left=`${o.left}px`,n.style.top=`${o.top}px`,n.style.width=`${o.width}px`,n.style.height=`${o.height}px`,n.style.zIndex=Vr,n.style.pointerEvents="none",n.style.margin="0",n.style.boxSizing="border-box",document.body.appendChild(n);let r=e.style.opacity||"",i=e.style.visibility||"",l=Je();e.style.opacity=l?"0":"0.3",l&&(e.style.visibility="hidden");let s={id:crypto.randomUUID(),componentRef:t,originalRect:{top:o.top+window.scrollY,left:o.left+window.scrollX,width:o.width,height:o.height},currentPos:{x:o.left+window.scrollX,y:o.top+window.scrollY},cloneEl:n,originalEl:e,originalOpacity:r,originalVisibility:i};return ho(s),s}function So(e,t,o){let n=Ze().get(e);n&&(n.currentPos={x:t,y:o},n.cloneEl.style.left=`${t-window.scrollX}px`,n.cloneEl.style.top=`${o-window.scrollY}px`)}function wo(e,t){for(let o of Ze().values()){let n=o.cloneEl.getBoundingClientRect();if(e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom)return o}return null}function No(){window.removeEventListener("scroll",To)}var Mo=[{type:"pointer",icon:"\u2196",label:"Pointer",shortcut:"V"},{type:"grab",icon:"\u270B",label:"Grab",shortcut:"H"},{type:"move",icon:"\u21D4",label:"Move",shortcut:"M"},{type:"draw",icon:"\u270F",label:"Draw",shortcut:"D"},{type:"color",icon:"\u{1F4A7}",label:"Color",shortcut:"C"},{type:"text",icon:"T",label:"Text",shortcut:"T"},{type:"lasso",icon:"\u2B55",label:"Lasso",shortcut:"L"}],Wr=`
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
`,X=null,b=null,Zt=new Map,Kt=null;function ko(e){Kt=e}function Lo(){let e=E();if(!e)return;let t=document.createElement("style");t.textContent=Wr,e.appendChild(t),X=document.createElement("div"),X.className="tools-panel";for(let n of Mo){let r=document.createElement("button");r.className=`tool-btn${n.type==="pointer"?" active":""}`,r.innerHTML=`${n.icon}<span class="tooltip">${n.label} (${n.shortcut})</span>`,r.addEventListener("click",()=>ke(n.type)),X.appendChild(r),Zt.set(n.type,r)}b=document.createElement("div"),b.className="sub-options hidden",X.appendChild(b);let o=document.createElement("button");o.className="clear-btn",o.textContent="\u2715",o.title="Clear All",o.addEventListener("click",()=>{Kt&&Kt()}),X.appendChild(o),e.appendChild(X),document.addEventListener("keydown",Ro,!0)}function Ro(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement)return;let o=e.key.toUpperCase(),n=Mo.find(r=>r.shortcut===o);n&&(ke(n.type),e.preventDefault())}function Ao(e){for(let[t,o]of Zt)o.classList.toggle("active",t===e);qr(e)}function qr(e){if(b){if(b.innerHTML="",b.classList.add("hidden"),e==="draw"){b.classList.remove("hidden");let t=$(),o=document.createElement("input");o.type="color",o.className="color-swatch",o.value=t.brushColor,o.style.cssText="width:24px;height:24px;border:2px solid #444;border-radius:50%;cursor:pointer;padding:0;background:none;",o.addEventListener("input",()=>Le("brushColor",o.value)),b.appendChild(o);for(let n of[2,4,8]){let r=document.createElement("button");r.className=`size-btn${n===t.brushSize?" active":""}`,r.textContent=`${n}px`,r.addEventListener("click",()=>{Le("brushSize",n),b?.querySelectorAll(".size-btn").forEach(i=>i.classList.remove("active")),r.classList.add("active")}),b.appendChild(r)}}else if(e==="text"){b.classList.remove("hidden");let t=$(),o=document.createElement("input");o.type="color",o.value=t.textColor,o.style.cssText="width:24px;height:24px;border:2px solid #444;border-radius:50%;cursor:pointer;padding:0;background:none;",o.addEventListener("input",()=>Le("textColor",o.value)),b.appendChild(o);for(let n of[12,16,20,24]){let r=document.createElement("button");r.className=`size-btn${n===t.fontSize?" active":""}`,r.textContent=`${n}`,r.addEventListener("click",()=>{Le("fontSize",n),b?.querySelectorAll(".size-btn").forEach(i=>i.classList.remove("active")),r.classList.add("active")}),b.appendChild(r)}}}}function Oo(){document.removeEventListener("keydown",Ro,!0),X?.remove(),X=null,b=null,Zt.clear()}var y=null,Re=null,Jt=new Map;function Q(e,t){Jt.set(e,t)}function _o(){y=document.createElement("div"),y.setAttribute("data-sketch-ui-interaction","true"),y.style.cssText=`
    position: fixed;
    top: 0;
    left: 48px;
    width: calc(100vw - 48px);
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(y),y.addEventListener("mousedown",e=>{Re?.onMouseDown?.(e)}),y.addEventListener("mousemove",e=>{Re?.onMouseMove?.(e)}),y.addEventListener("mouseup",e=>{Re?.onMouseUp?.(e)})}function Fo(e){Re=Jt.get(e)||null,y&&(y.style.pointerEvents=e==="pointer"?"none":"auto");let t={pointer:"default",grab:"grab",move:"move",draw:"crosshair",color:"pointer",text:"text",lasso:"crosshair"};y&&(y.style.cursor=t[e]||"default")}function Qt(e){y&&(y.style.cursor=e)}function Ho(){y?.remove(),y=null,Re=null,Jt.clear()}function Po(){Gt(!0)}function Io(){Gt(!1)}var en=!1,tn=0,nn=0,Do={onMouseDown(e){en=!0,tn=e.clientX,nn=e.clientY,Qt("grabbing")},onMouseMove(e){if(!en)return;let t=e.clientX-tn,o=e.clientY-nn;window.scrollBy(-t,-o),tn=e.clientX,nn=e.clientY},onMouseUp(e){en=!1,Qt("grab")}};var V=null,Qe={x:0,y:0},Ae=!1,Kr=!1,$o={onMouseDown(e){let t=wo(e.clientX,e.clientY);if(t){V=t,Qe={x:e.clientX+window.scrollX-t.currentPos.x,y:e.clientY+window.scrollY-t.currentPos.y},Ae=!0;return}let o=qn();if(!o){Kr=!0,ke("pointer");return}let n=Zn();if(!n)return;let r=Co(n,{componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber});V=r,Qe={x:e.clientX+window.scrollX-r.currentPos.x,y:e.clientY+window.scrollY-r.currentPos.y},Ae=!0},onMouseMove(e){if(!Ae||!V)return;let t=e.clientX+window.scrollX-Qe.x,o=e.clientY+window.scrollY-Qe.y;So(V.id,t,o)},onMouseUp(e){Ae&&V&&go(V.id,V.currentPos),V=null,Ae=!1}};function et(e,t=2){if(e.length<=2)return e;let o=0,n=0,r=e[0],i=e[e.length-1];for(let l=1;l<e.length-1;l++){let s=Zr(e[l],r,i);s>o&&(o=s,n=l)}if(o>t){let l=et(e.slice(0,n+1),t),s=et(e.slice(n),t);return[...l.slice(0,-1),...s]}return[r,i]}function Zr(e,t,o){let n=o.x-t.x,r=o.y-t.y,i=n*n+r*r;if(i===0){let s=e.x-t.x,a=e.y-t.y;return Math.sqrt(s*s+a*a)}return Math.abs(r*e.x-n*e.y+o.x*t.y-o.y*t.x)/Math.sqrt(i)}async function W(e,t){let o=document.elementFromPoint(e,t);if(!o||o.closest("#sketch-ui-root")||o.hasAttribute("data-sketch-ui-ghost"))return null;let n=B(o);if(!n)return null;try{let i=await ze(n);if(i&&i.length>0)for(let l of i){if(!l.functionName)continue;let s=l.functionName;if(s[0]!==s[0].toUpperCase()||re(s))continue;let a="";if(l.fileName){let c=we(l.fileName);Be(c)&&(a=c)}return{componentName:s,filePath:a,lineNumber:l.lineNumber??0}}}catch{}let r=n;for(;r;){if(K(r)){let i=H(r.type);if(i&&i[0]===i[0].toUpperCase()&&!re(i)){let l=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:l?.fileName||"",lineNumber:l?.lineNumber||0}}}r=r.return}return null}var _=null,tt=null,zo={onMouseDown(e){let t=$();if(_=ao(t.brushColor,t.brushSize),_){let o=e.clientX+window.scrollX,n=e.clientY+window.scrollY;_.addPoint(o,n)}tt=W(e.clientX,e.clientY)},onMouseMove(e){if(!_)return;let t=e.clientX+window.scrollX,o=e.clientY+window.scrollY;_.addPoint(t,o)},async onMouseUp(e){if(!_)return;let t=_.getPoints(),o=$();if(_.group.remove(),t.length<2){_=null,tt=null;return}let n=await tt,r=et(t,2),i=crypto.randomUUID();no(i,r,o.brushColor,o.brushSize),ue({type:"draw",id:i,points:r,color:o.brushColor,strokeWidth:o.brushSize,targetComponent:n}),_=null,tt=null}};var v=null,ee=null,nt=null,Go={onMouseDown(e){v&&Bo();let t=e.clientX+window.scrollX,o=e.clientY+window.scrollY;ee={pageX:t,pageY:o},W(e.clientX,e.clientY).then(n=>{nt=n}),v=document.createElement("input"),v.type="text",v.placeholder="Type annotation...",v.style.cssText=`
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
    `,v.addEventListener("keydown",n=>{n.key==="Enter"&&(Bo(),n.preventDefault()),n.key==="Escape"&&(Yo(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(v),v.focus()},onMouseMove(){},onMouseUp(){}};function Bo(){if(!v||!ee)return;let e=v.value.trim();if(v.remove(),v=null,!e)return;let t=$(),o=crypto.randomUUID();oo(o,ee.pageX,ee.pageY,e,t.fontSize,t.textColor),ue({type:"text",id:o,position:ee,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:nt}),ee=null,nt=null}function Yo(){v&&(v.remove(),v=null),ee=null,nt=null}function jo(){Yo()}var S=null,Xo={async onMouseDown(e){S&&(S.remove(),S=null);let t=document.elementFromPoint(e.clientX,e.clientY);if(!t||t.closest("#sketch-ui-root")||t.hasAttribute("data-sketch-ui-ghost"))return;let o=await W(e.clientX,e.clientY);if(!o)return;let n=getComputedStyle(t).backgroundColor,r=getComputedStyle(t).color,i=E();if(!i)return;S=document.createElement("div"),S.style.cssText=`
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
    `;let l="backgroundColor",s=document.createElement("div");s.style.cssText="display:flex;gap:8px;";for(let d of["backgroundColor","color"]){let m=document.createElement("label");m.style.cssText="display:flex;align-items:center;gap:4px;cursor:pointer;";let w=document.createElement("input");w.type="radio",w.name="color-prop",w.checked=d==="backgroundColor",w.addEventListener("change",()=>{l=d,a.value=Uo(d==="backgroundColor"?n:r)}),m.appendChild(w),m.appendChild(document.createTextNode(d==="backgroundColor"?"Background":"Text")),s.appendChild(m)}S.appendChild(s);let a=document.createElement("input");a.type="color",a.value=Uo(n),a.style.cssText="width:100%;height:32px;cursor:pointer;border:none;",a.addEventListener("input",()=>{t.style[l]=a.value}),a.addEventListener("change",()=>{let d=l==="backgroundColor"?n:r,m=a.value,w=crypto.randomUUID(),pe=t.getBoundingClientRect();ro(w,pe.right+window.scrollX,pe.top+window.scrollY,m),ue({type:"colorChange",id:w,component:o,targetElement:t,property:l,fromColor:d,toColor:m}),c()}),S.appendChild(a),i.appendChild(S);let c=()=>{S?.remove(),S=null,document.removeEventListener("keydown",u,!0),document.removeEventListener("mousedown",p,!0)},u=d=>{d.key==="Escape"&&c()};document.addEventListener("keydown",u,!0);let p=d=>{S&&!S.contains(d.target)&&c()};setTimeout(()=>document.addEventListener("mousedown",p,!0),0)},onMouseMove(){},onMouseUp(){}};function Uo(e){let t=e.match(/\d+/g);return!t||t.length<3?"#000000":"#"+t.slice(0,3).map(o=>parseInt(o).toString(16).padStart(2,"0")).join("")}function Vo(){S?.remove(),S=null}var Wo="http://www.w3.org/2000/svg",N=[],F=null,de=null,qo=[],on=[],Ko={onMouseDown(e){ot(),N=[{x:e.clientX,y:e.clientY}];let t=E();t&&(de=document.createElementNS(Wo,"svg"),de.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647;"),F=document.createElementNS(Wo,"path"),F.setAttribute("stroke","#42a5f5"),F.setAttribute("stroke-width","2"),F.setAttribute("stroke-dasharray","4,4"),F.setAttribute("fill","rgba(66,165,245,0.1)"),de.appendChild(F),t.appendChild(de))},onMouseMove(e){!F||N.length===0||(N.push({x:e.clientX,y:e.clientY}),Jr())},async onMouseUp(e){if(N.length<3){rn();return}let t=Qr();rn();let o=document.querySelectorAll("*"),n=new Set,r=[];for(let l of o){if(l.closest("#sketch-ui-root")||l.hasAttribute?.("data-sketch-ui-ghost"))continue;let s=l.getBoundingClientRect();s.left<t.right&&s.right>t.left&&s.top<t.bottom&&s.bottom>t.top&&s.width>0&&s.height>0&&r.push({el:l,rect:s})}let i=await Promise.all(r.map(({rect:l})=>W(l.left+l.width/2,l.top+l.height/2)));for(let l=0;l<r.length;l++){let s=i[l],{el:a,rect:c}=r[l];s&&!n.has(`${s.filePath}:${s.lineNumber}`)&&(n.add(`${s.filePath}:${s.lineNumber}`),qo.push(a),ei(c))}}};function Jr(){if(!F||N.length<2)return;let e=`M${N[0].x},${N[0].y}`;for(let t=1;t<N.length;t++)e+=` L${N[t].x},${N[t].y}`;e+=" Z",F.setAttribute("d",e)}function Qr(){let e=1/0,t=1/0,o=-1/0,n=-1/0;for(let r of N)e=Math.min(e,r.x),t=Math.min(t,r.y),o=Math.max(o,r.x),n=Math.max(n,r.y);return{left:e,top:t,right:o,bottom:n}}function ei(e){let t=document.createElement("div");t.setAttribute("data-sketch-ui-ghost","true"),t.style.cssText=`
    position: fixed;
    left: ${e.left}px;
    top: ${e.top}px;
    width: ${e.width}px;
    height: ${e.height}px;
    border: 2px solid #42a5f5;
    pointer-events: none;
    z-index: 2147483645;
  `,document.body.appendChild(t),on.push(t)}function rn(){de?.remove(),de=null,F=null,N=[]}function ot(){rn(),on.forEach(e=>e.remove()),on=[],qo=[]}var ti={pointer:"Select",grab:"Grab",move:"Move",draw:"Draw",color:"Color",text:"Text",lasso:"Lasso"};function Zo(){let e=window.__SKETCH_UI_WS_PORT__;if(!e){console.warn("[SketchUI] No WebSocket port found.");return}document.getElementById("sketch-ui-root")||(Oe(e),mn(ni),Xn(),Qn(),to(),Eo(),Lo(),_o(),Q("grab",Do),Q("move",$o),Q("draw",zo),Q("text",Go),Q("color",Xo),Q("lasso",Ko),po((t,o)=>{o==="pointer"&&Io(),o==="text"&&jo(),o==="color"&&Vo(),o==="lasso"&&ot(),t==="pointer"&&Po(),Fo(t),Ao(t),xn(ti[t]||t)}),mo(()=>{vn(vo())}),hn(()=>{let t=!Je();bo(t),yn(t)}),gn(()=>{let t=xo();console.log("[SketchUI] Generate \u2014 serialized annotations:",JSON.stringify(t,null,2))}),bn(()=>{if(fo()==="pointer")return!1;let t=yo();return t?(pt(`Undo: ${t}`),!0):!1}),ko(()=>{io(),ot(),Wt(),pt("Canvas cleared")}),console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools"))}function ni(){Kn(),eo(),lo(),No(),Oo(),Ho(),Wt(),ln(),fn()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Zo):Zo();})();
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
