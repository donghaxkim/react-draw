"use strict";var SketchUI=(()=>{var ws=Object.defineProperty;var Pt=(e,t)=>()=>(e&&(t=e(e=0)),t);var Es=(e,t)=>{for(var n in t)ws(e,n,{get:t[n],enumerable:!0})};function Fr(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function ho(e){if(mn&&mn.size===e)return mn.uri;let t=Math.max(e,2),n=t*2+4,o=n/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${n}' height='${n}'><circle cx='${o}' cy='${o}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${o} ${o}, crosshair`;return mn={size:e,uri:r},r}function Vr(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M2 22l1-1h3l9-9'/><path d='M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7'/><path d='M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14'/><path d='m9 7 6 6'/><path d='M20 2a2.83 2.83 0 0 1 0 4L16 10'/></svg>`)}") 2 22, pointer`}function Br(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><line x1='8' y1='2' x2='8' y2='14' stroke='${l.accent}' stroke-width='1'/><line x1='2' y1='8' x2='14' y2='8' stroke='${l.accent}' stroke-width='1'/></svg>`)}") 8 8, crosshair`}var l,L,P,S,w,Dr,mn,D=Pt(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},L={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},P={xs:"4px",sm:"6px",md:"10px",lg:"14px"},S={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},w="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Dr=`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/__sketch-ui/inter-regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/__sketch-ui/inter-semibold.woff2') format('woff2');
  }
`;mn=null});function Wi(e){return Ln.push(e),()=>{Ln=Ln.filter(t=>t!==e)}}function Yi(e){return Nn.push(e),()=>{Nn=Nn.filter(t=>t!==e)}}function Ge(){Nn.forEach(e=>e())}function An(){return Zo}function Xt(e){let t=Zo;t!==e&&(Zo=e,Ln.forEach(n=>n(e,t)))}function me(){return{...Gi}}function Kt(e,t){Gi[e]=t}function We(){return pe}function ji(e){pe.set(e.id,e),Le.push({type:"ghostCreate",ghostId:e.id}),Ge()}function Ui(e,t){let n=pe.get(e);if(!n)return;let o={...n.currentPos};n.currentPos=t,Le.push({type:"ghostMove",ghostId:e,previousPos:o}),Ge()}function Jl(e){let t=pe.get(e);t&&(t.cloneEl.remove(),t.originalEl.style.opacity=t.originalOpacity,t.originalEl.style.visibility=t.originalVisibility,pe.delete(e),Ge())}function ft(e){if(ze.push(e),e.type==="colorChange"){let t=e;Le.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else Le.push({type:"annotationAdd",annotationId:e.id});Ge()}function Ki(e){Xi=e}function Zi(e){qi=e}function zi(e){ze=ze.filter(t=>t.id!==e),Xi?.(e),Ge()}function _n(){return Jo}function Ji(e){Jo=e;for(let t of pe.values())e?(t.originalEl.style.opacity="0",t.originalEl.style.visibility="hidden"):(t.originalEl.style.opacity="0.3",t.originalEl.style.visibility="visible");Ge()}function Qi(e){for(let t of pe.values())if(t.originalEl===e||t.originalEl.contains(e)||e.contains(t.originalEl))return!0;return!1}function Qo(){let e=Le.pop();if(!e)return null;switch(e.type){case"ghostCreate":return Jl(e.ghostId),"ghost removed";case"ghostMove":{let t=pe.get(e.ghostId);return t&&(t.currentPos=e.previousPos,qi?.(e.ghostId,e.previousPos.x,e.previousPos.y)),"move reverted"}case"annotationAdd":return zi(e.annotationId),"annotation removed";case"colorChange":{let t=ze.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),zi(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}}return null}function ea(e){Le.push(e),Ge()}function Ce(){return{scale:Ut,offsetX:On,offsetY:$n}}function Hn(e,t,n){Ut=e,On=t,$n=n,jt.forEach(o=>o())}function In(e){return jt.push(e),()=>{jt=jt.filter(t=>t!==e)}}function fe(e,t){return{x:(e-On)/Ut,y:(t-$n)/Ut}}function Dn(){for(let e of pe.values())e.cloneEl.remove(),e.originalEl.style.opacity=e.originalOpacity,e.originalEl.style.visibility=e.originalVisibility;for(let e of ze)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of Le)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}pe=new Map,ze=[],Le=[],Jo=!1,Ut=1,On=0,$n=0,jt.forEach(e=>e()),Ge()}function er(){return pe.size>0||ze.length>0}function ta(){return Le.length>0}function na(){let e=[];for(let o of pe.values())e.push({component:o.componentRef.componentName,file:o.componentRef.filePath,line:o.componentRef.lineNumber,from:o.originalRect,to:o.currentPos});let t=[],n=[];for(let o of ze)o.type==="draw"?t.push({type:"draw",startComponent:o.targetComponent?.componentName,startFile:o.targetComponent?.filePath,startLine:o.targetComponent?.lineNumber,points:o.points,color:o.color,strokeWidth:o.strokeWidth}):o.type==="text"?t.push({type:"text",content:o.content,position:o.position,targetComponent:o.targetComponent?.componentName,targetFile:o.targetComponent?.filePath,targetLine:o.targetComponent?.lineNumber}):o.type==="colorChange"&&n.push({component:o.component.componentName,file:o.component.filePath,line:o.component.lineNumber,property:o.property,from:o.fromColor,to:o.toColor});return{moves:e,annotations:t,colorChanges:n}}var pe,ze,Le,Zo,Jo,Gi,Ut,On,$n,jt,Ln,Nn,Xi,qi,ie=Pt(()=>{"use strict";pe=new Map,ze=[],Le=[],Zo="pointer",Jo=!0,Gi={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},Ut=1,On=0,$n=0,jt=[],Ln=[],Nn=[];Xi=null;qi=null});function sr(){return B}function fa(e){return Zt.push(e),()=>{Zt=Zt.filter(t=>t!==e)}}function pc(){ir=document.body.style.background||document.body.style.backgroundColor||"",ar=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",B=document.createElement("div"),B.setAttribute("data-sketch-ui-canvas-wrapper","true"),B.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),ye=document.createElement("div"),ye.setAttribute("data-sketch-ui-dot-bg","true"),ye.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="sketch-ui-root"||r.hasAttribute("data-sketch-ui-interaction")||r.hasAttribute("data-sketch-ui-ghost")||r.hasAttribute("data-sketch-ui-annotation")||r.hasAttribute("data-sketch-ui-dot-bg")||r.hasAttribute("data-sketch-ui-canvas-wrapper"))||(ma.push(r),B.appendChild(r));B.style.position="relative",B.style.zIndex="1",document.body.insertBefore(ye,document.body.firstChild),document.body.insertBefore(B,ye.nextSibling),rr=In(pa),pa(),Zt.forEach(r=>r(B))}function pa(){if(!B||!ye)return;let{scale:e,offsetX:t,offsetY:n}=Ce();B.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=dc*e,r=t%o,i=n%o;ye.style.backgroundImage=`radial-gradient(circle, ${uc} ${ua}px, transparent ${ua}px)`,ye.style.backgroundSize=`${o}px ${o}px`,ye.style.backgroundPosition=`${r}px ${i}px`}function mc(e,t,n){let{scale:o,offsetX:r,offsetY:i}=Ce(),a=Math.min(lc,Math.max(sc,o+n));if(a===o)return;let s=(e-r)/o,c=(t-i)/o,u=e-s*a,d=t-c*a;Hn(a,u,d)}function ga(e){e.preventDefault();let t=-e.deltaY*cc,{scale:n}=Ce(),o=t*n;mc(e.clientX,e.clientY,o)}function ha(e,t){let{scale:n,offsetX:o,offsetY:r}=Ce();Hn(n,o+e,r+t)}function ya(){Hn(1,0,0)}function ba(){return B!==null}function va(){B?lr():pc()}function lr(){if(Zt.forEach(e=>e(null)),rr?.(),rr=null,B){for(;B.firstChild;)document.body.insertBefore(B.firstChild,B);B.remove(),B=null}ye?.remove(),ye=null,ma=[],document.body.style.background=ir,document.documentElement.style.background=ar,ir="",ar=""}var sc,lc,cc,dc,ua,uc,B,ye,rr,ma,Zt,ir,ar,ht=Pt(()=>{"use strict";ie();D();sc=.1,lc=5,cc=.002,dc=24,ua=1,uc="rgba(0,0,0,0.15)",B=null,ye=null,rr=null,ma=[],Zt=[];ir="",ar=""});function Ga(e,t){if(!rt)return;let n=performance.now(),o=Math.abs(e-rt.clientX),r=Math.abs(t-rt.clientY),i=o<=2&&r<=2,a=n-rt.timestamp<16;if(i||a)return rt.element}function Wa(e,t,n){rt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Et(){rt=null}var rt,fr=Pt(()=>{"use strict";rt=null});var ja={};Es(ja,{activateInteraction:()=>yr,destroyInteraction:()=>br,getPageElementAtPoint:()=>nn,initInteraction:()=>hr,refreshDrawCursor:()=>Lc,registerToolHandler:()=>qe,setInteractionCursor:()=>eo,setInteractionPointerEvents:()=>tn});function qe(e,t){gr.set(e,t)}function hr(){O=document.createElement("div"),O.setAttribute("data-sketch-ui-interaction","true"),O.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(O),document.addEventListener("scroll",Et,!0),O.addEventListener("mousedown",e=>{en?.onMouseDown?.(e)}),O.addEventListener("mousemove",e=>{en?.onMouseMove?.(e)}),O.addEventListener("mouseup",e=>{en?.onMouseUp?.(e)}),document.addEventListener("wheel",Ya,{passive:!1})}function Ya(e){!O||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#sketch-ui-root")||ga(e)}function yr(e){en=gr.get(e)||null,O&&(O.style.pointerEvents=e==="pointer"?"none":"auto"),Rc(e)}function Rc(e){if(O)switch(e){case"pointer":O.style.cursor="default";break;case"grab":O.style.cursor="grab";break;case"move":O.style.cursor=Fr();break;case"draw":O.style.cursor=ho(me().brushSize);break;case"color":O.style.cursor=Vr();break;case"text":O.style.cursor="text";break;case"lasso":O.style.cursor=Br();break;default:O.style.cursor="default"}}function Lc(){An()==="draw"&&O&&(O.style.cursor=ho(me().brushSize))}function eo(e){O&&(O.style.cursor=e)}function tn(e){O&&(O.style.pointerEvents=e?"auto":"none")}function nn(e,t){let n=Ga(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#sketch-ui-root")&&!i.hasAttribute("data-sketch-ui-interaction")&&!i.hasAttribute("data-sketch-ui-ghost")&&!(i===document.body||i===document.documentElement)){r=i;break}return Wa(e,t,r),r}function br(){document.removeEventListener("scroll",Et,!0),document.removeEventListener("wheel",Ya),O?.remove(),O=null,en=null,gr.clear()}var O,en,gr,Tt=Pt(()=>{"use strict";ie();D();fr();ht();O=null,en=null,gr=new Map});function Ts(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function Ss(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(x=>{try{return Array.from(x.cssRules)}catch{return[]}}).filter(x=>x instanceof CSSStyleRule&&x.selectorText===":root").flatMap(x=>Array.from(x.style)).filter(x=>x.startsWith("--")),n={},o={},r={},i={},a={},s={},c={},u={},d={},p={},m={},f={},g={},b={},v={},R={},$={},N={},H=(x,A,J,Q)=>{x[J]=Q,A[Q]=J};for(let x of t){let A=e.getPropertyValue(x).trim();if(!A)continue;let J=x.match(/^--spacing-(.+)$/);if(J){H(n,p,J[1],A);continue}let Q=x.match(/^--color-(.+)$/);if(Q){let cn=Q[1];o[cn]=A,m[Ts(A)]=cn;continue}let M=x.match(/^--font-size-(.+)$/);if(M){H(r,f,M[1],A);continue}let I=x.match(/^--font-weight-(.+)$/);if(I){H(i,g,I[1],A);continue}let y=x.match(/^--radius-(.+)$/);if(y){H(a,b,y[1],A);continue}let T=x.match(/^--border-(.+)$/);if(T){H(s,v,T[1],A);continue}let V=x.match(/^--opacity-(.+)$/);if(V){H(c,R,V[1],A);continue}let oe=x.match(/^--tracking-(.+)$/);if(oe){H(u,$,oe[1],A);continue}let _e=x.match(/^--leading-(.+)$/);if(_e){H(d,N,_e[1],A);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:u,lineHeight:d,spacingReverse:p,colorsReverse:m,fontSizeReverse:f,fontWeightReverse:g,borderRadiusReverse:b,borderWidthReverse:v,opacityReverse:R,letterSpacingReverse:$,lineHeightReverse:N}}var ks=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Ms(e,t){let n={};for(let o of ks){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function un(e,t){return t.get(e)??null}function Rr(e,t,n){let r=(n??Lt())[e],i=[];for(let[s,c]of r.entries()){let u=parseFloat(c);isNaN(u)||i.push({numericValue:u,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var Lr=null,Rt=null;function Nr(e){Lr=e,Rt=null}function Lt(){if(Rt!==null)return Rt;let e=Ss();return Rt=Ms(e,Lr??{}),Rt}var ee=null,Nt=[],at=0,Ps=5,co=null,uo=null,po=null,mo=null,fo=null,go=null;function Or(e){go=e}function pn(e){ee&&ee.readyState===WebSocket.OPEN||(fo=e,ee=new WebSocket(`ws://localhost:${e}`),ee.onopen=()=>{let t=at>0;at=0,t&&mo&&mo()},ee.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Nr(n.tokens),n.type==="updatePropertyComplete"&&go&&go(n.success,n.errorCode,n.error),Nt.forEach(o=>o(n))}catch{}},ee.onclose=t=>{if(ee=null,t.code===4001){po&&po();return}if(at<Ps){let n=500*Math.pow(2,at);at++,co=setTimeout(()=>pn(e),n)}else uo&&uo()},ee.onerror=()=>{})}function ve(e){ee&&ee.readyState===WebSocket.OPEN&&ee.send(JSON.stringify(e))}function Je(e){return Nt.push(e),()=>{Nt=Nt.filter(t=>t!==e)}}function $r(){co&&clearTimeout(co),ee&&(ee.close(),ee=null),Nt=[]}function Ar(e){uo=e}function _r(e){po=e}function Hr(e){mo=e}function Ir(){fo&&(at=0,pn(fo))}D();var lt=null,z=null,Ot=0,fn=null,gn=null,Qe=null,yo=null,st=null,$t=null,vo=null,Wr=null,Yr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',Rs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',bo='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',Ls='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',zr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',Ns=`
  :host {
    all: initial;
  }
  ${Dr}
  .toolbar {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${P.md};
    font-family: ${w};
    font-size: 12px;
    color: ${l.textPrimary};
    box-shadow: ${L.md};
    user-select: none;
    opacity: 0;
    animation: fadeIn ${S.settle} forwards;
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
    transition: background ${S.fast}, color ${S.fast};
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
    border-radius: ${P.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${w};
    cursor: pointer;
    transition: background ${S.fast};
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
    right: 16px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    color: ${l.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: ${w};
    box-shadow: ${L.md};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${S.medium};
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
`;function jr(e){let t=document.createElement("div");t.id="sketch-ui-root",document.body.appendChild(t),lt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=Ns;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${Yr}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${bo}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="icon-btn close-btn" title="Close SketchUI">
      ${Ls}
    </button>
  `,lt.appendChild(n),lt.appendChild(o),z=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");fn=o.querySelector(".generate-btn"),gn=o.querySelector(".eye-btn"),st=o.querySelector(".component-detail"),Qe=document.createElement("div"),Qe.className="toast",lt.appendChild(Qe),z.addEventListener("click",()=>{ve({type:"undo"}),z&&(z.innerHTML='<div class="spinner"></div>',z.disabled=!0)}),r.addEventListener("click",e),gn.addEventListener("click",()=>{$t&&$t()}),fn.addEventListener("click",()=>{vo&&vo()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!Gr()&&($t&&$t(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!Gr()&&Wr?.()&&i.preventDefault()}),Ar(()=>{W("Disconnected. Click to reconnect."),Ir()}),_r(()=>{W("Disconnected: another tab took over")}),Hr(()=>{Ot=0,z&&(z.disabled=!0)}),Je(i=>{switch(i.type){case"reorderComplete":i.success?(Ot++,z&&(z.innerHTML=zr,setTimeout(()=>{z&&(z.innerHTML=bo,z.disabled=!1)},200))):i.error&&W(i.error);break;case"undoComplete":i.success?(Ot=Math.max(0,Ot-1),z&&(z.innerHTML=zr,setTimeout(()=>{z&&(z.innerHTML=bo,z.disabled=Ot===0)},200))):i.error&&W(i.error);break;case"devServerDisconnected":W("Dev server disconnected");break;case"devServerReconnected":W("Dev server reconnected");break}})}function Ur(){let e=document.getElementById("sketch-ui-root");e&&e.remove(),lt=null,z=null}function F(){return lt}function Xr(e){$t=e}function Kr(e){vo=e}function qr(e){Wr=e}function Zr(e){gn&&(gn.innerHTML=e?Rs:Yr)}function Jr(e){fn&&(fn.disabled=!e)}function hn(e){if(!st)return;if(!e){st.className="component-detail empty",st.textContent="No selection";return}st.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";st.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function W(e){Qe&&(Qe.textContent=e,Qe.classList.add("visible"),yo&&clearTimeout(yo),yo=setTimeout(()=>{Qe?.classList.remove("visible")},2e3))}function Gr(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var xo="0.5.32",It=`bippy-${xo}`,Qr=Object.defineProperty,Os=Object.prototype.hasOwnProperty,At=()=>{},ti=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},bn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),ni=!1,ei,_t=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>ni?!0:(e&&typeof e.inject=="function"&&(ei=e.inject.toString()),!!ei?.includes("(injected)")),yn=new Set,Ie=new Set,Co=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:It,checkDCE:ti,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),Ie.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,yn.forEach(a=>a())),i},on:At,onCommitFiberRoot:At,onCommitFiberUnmount:At,onPostCommitFiberRoot:At,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Qr(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((c,u)=>{Ie.add(c),a.renderers.set(u,c)}),Ht(e))}}});let r=window.hasOwnProperty,i=!1;Qr(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{Ht(e)}return o},Ht=e=>{e&&yn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=ti,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=It,t._instrumentationIsActive=!1;let n=bn(t);if(n||(t.on=At),t.renderers.size){t._instrumentationIsActive=!0,yn.forEach(i=>i());return}let o=t.inject,r=_t(t);r&&!n&&(ni=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return Ie.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,yn.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||_t())&&e?.()}catch{}},wo=()=>Os.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),ct=e=>wo()?(Ht(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Co(e),Eo=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),vn=()=>{try{Eo()&&ct()}catch{}};vn();var To=0,So=1;var ko=5;var Mo=11,Po=13;var Ro=15,Lo=16;var No=19;var Oo=26,$o=27,Ao=28,_o=30;var xe=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function Ho(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Do(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Io(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var Io=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Io(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Do=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Do(o,t,n);if(r)return r;o=n?null:o.sibling}return null};var Fo=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Fo(t.type||t.render):null},ce=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=Fo(t);return o&&(o.displayName||o.name)||null};var Vo=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||bn(e)||_t(e)};var Bo=e=>{let t=ct(e.onActive);t._instrumentationSource=e.name??It;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{n!==i&&(n?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},de=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},$s=Error();var oi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,As=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],_s=["<anonymous>","eval",""],pi=/\.(jsx|tsx|ts|js)$/,Hs=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Is=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,mi="(at Server)",Ds=/(^|@)\S+:\d+/,fi=/^\s*at .*(\S+:\d+|\(native\))/m,Fs=/^(eval@)?(\[native code\])?$/;var gi=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=ri(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Ds)){let i=ii(r,void 0)[0];i&&o.push(i)}return Wo(o,t)}return e.match(fi)?ri(e,t):ii(e,t)},hi=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},Wo=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var ri=(e,t)=>Wo(e.split(`
`).filter(n=>!!n.match(fi)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=hi(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}});var ii=(e,t)=>Wo(e.split(`
`).filter(n=>!n.match(Fs)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=hi(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}});var Vs=44,ai="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Bs=new Uint8Array(64),yi=new Uint8Array(128);for(let e=0;e<ai.length;e++){let t=ai.charCodeAt(e);Bs[e]=t,yi[t]=e}function Dt(e,t){let n=0,o=0,r=0;do r=yi[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function si(e,t){return e.pos>=t?!1:e.peek()!==Vs}var zs=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};function bi(e){let{length:t}=e,n=new zs(e),o=[],r=0,i=0,a=0,s=0,c=0;do{let u=n.indexOf(";"),d=[],p=!0,m=0;for(r=0;n.pos<u;){let f;r=Dt(n,r),r<m&&(p=!1),m=r,si(n,u)?(i=Dt(n,i),a=Dt(n,a),s=Dt(n,s),si(n,u)?(c=Dt(n,c),f=[r,i,a,s,c]):f=[r,i,a,s]):f=[r],d.push(f),n.pos++}p||Gs(d),o.push(d),n.pos=u+1}while(n.pos<=t);return o}function Gs(e){e.sort(Ws)}function Ws(e,t){return e[0]-t[0]}var vi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Ys=/^data:application\/json[^,]+base64,/,js=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,xi=typeof WeakRef<"u",Ft=new Map,xn=new Map,Us=e=>xi&&e instanceof WeakRef,li=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let d of r)if(d[0]<=o)i=d;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let u=t[a];return u?{columnNumber:c,fileName:u,lineNumber:s+1}:null},Xs=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return li(o.map.mappings,o.map.sources,r,i)}return li(e.mappings,e.sources,t-1,n)},Ks=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(js);a&&(o=a[1]||a[2])}if(!o)return null;let r=vi.test(o);if(!(Ys.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},qs=e=>({file:e.file,mappings:bi(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Zs=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:bi(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},ci=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(vi);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},Js=async(e,t=fetch)=>{if(!ci(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Ks(e,n);if(!o||!ci(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Zs(i):qs(i)}catch{return null}},Qs=async(e,t=!0,n)=>{if(t&&Ft.has(e)){let i=Ft.get(e);if(i==null)return null;if(Us(i)){let a=i.deref();if(a)return a;Ft.delete(e)}else return i}if(t&&xn.has(e))return xn.get(e);let o=Js(e,n);t&&xn.set(e,o);let r=await o;return t&&xn.delete(e),t&&(r===null?Ft.set(e,null):Ft.set(e,xi?new WeakRef(r):r)),r},el=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await Qs(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Xs(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),tl=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",nl=()=>{let e=ct();for(let t of[...Array.from(Ie),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},di=e=>{for(let t of Ie){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Pe=e=>`
    in ${e}`,ol=(e,t)=>{let n=Pe(e);return t&&(n+=` (at ${t})`),n},zo=!1,Go=(e,t)=>{if(!e||zo)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,zo=!0;let o=nl();di(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let d;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){d=m}Reflect.construct(e,[],p)}else{try{p.call()}catch(m){d=m}e.call(p.prototype)}}else{try{throw Error()}catch(m){d=m}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&d instanceof Error&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,u]=s.DetermineComponentFrameRoot();if(c&&u){let d=c.split(`
`),p=u.split(`
`),m=0,f=0;for(;m<d.length&&!d[m].includes("DetermineComponentFrameRoot");)m++;for(;f<p.length&&!p[f].includes("DetermineComponentFrameRoot");)f++;if(m===d.length||f===p.length)for(m=d.length-1,f=p.length-1;m>=1&&f>=0&&d[m]!==p[f];)f--;for(;m>=1&&f>=0;m--,f--)if(d[m]!==p[f]){if(m!==1||f!==1)do if(m--,f--,f<0||d[m]!==p[f]){let g=`
${d[m].replace(" at new "," at ")}`,b=ce(e);return b&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",b)),g}while(m>=1&&f>=0);break}}}finally{zo=!1,Error.prepareStackTrace=n,di(o),console.error=r,console.warn=i}let a=e?ce(e):"";return a?Pe(a):""},rl=(e,t)=>{let n=e.tag,o="";switch(n){case Ao:o=Pe("Activity");break;case So:o=Go(e.type,!0);break;case Mo:o=Go(e.type.render,!1);break;case To:case Ro:o=Go(e.type,!1);break;case ko:case Oo:case $o:o=Pe(e.type);break;case Lo:o=Pe("Lazy");break;case Po:o=e.child!==t&&t!==null?Pe("Suspense Fallback"):Pe("Suspense");break;case No:o=Pe("SuspenseList");break;case _o:o=Pe("ViewTransition");break;default:return""}return o},il=e=>{try{let t="",n=e,o=null;do{t+=rl(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=ol(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},al=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},sl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),ll=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,cl=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!sl(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>ll(a,o))||(i.push(o),t.set(r,i))}return t},dl=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(mi,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},ul=e=>{let t=[];return Ho(e,n=>{if(!tl(n))return;let o=typeof n.type=="string"?n.type:ce(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:gi(al(n._debugStack?.stack))})},!0),t},et=async(e,t=!0,n)=>{let o=ul(e),r=gi(il(e)),i=cl(o),a=new Map;return el(r.map(s=>s.source?.includes(mi)??!1?dl(s,i,a):s).filter((s,c,u)=>{if(c===0)return!0;let d=u[c-1];return s.functionName!==d.functionName}),t,n)};var ui=e=>e.split("/").filter(Boolean).length,pl=e=>e.split("/").filter(Boolean)[0]??null,ml=e=>{let t=e.indexOf("/",1);if(t===-1||ui(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!pi.test(n)||ui(n)<2)return e;let o=pl(n);return!o||o.startsWith("@")||o.length>4?e:n},De=e=>{if(!e||_s.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=ml(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of As)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(oi.test(t)){let i=t.match(oi);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Is.test(i)&&(t=t.slice(0,r))}return t},tt=e=>{let t=De(e);return!(!t||!pi.test(t)||Hs.test(t))};var fl=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function Fe(e){return!!(fl.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function gl(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}var hl=50,Cn=.9,yl=2147483600,bl=1e3,Vt=new WeakMap;function Yo(){Vt=new WeakMap}function vl(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function xl(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=yl}function Cl(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<Cn||o.height/window.innerHeight<Cn)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>bl}function Bt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&gl(e)||e.closest("#sketch-ui-root")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-ghost"))return!1;let n=performance.now(),o=Vt.get(e);if(o&&n-o.timestamp<hl)return o.isValid;let r=window.getComputedStyle(e);return vl(e,r)?e.clientWidth/window.innerWidth>=Cn&&e.clientHeight/window.innerHeight>=Cn&&(xl(r)||Cl(e,r))?(Vt.set(e,{isValid:!1,timestamp:n}),!1):(Vt.set(e,{isValid:!0,timestamp:n}),!0):(Vt.set(e,{isValid:!1,timestamp:n}),!1)}var wl=.75,Ci=32,wn=3,En=20,wi=100,ue=1;function dt(e,t,n){return Math.min(n,Math.max(t,e))}function El(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,c=r+e.height/2,u=dt(Math.ceil(e.width/Ci),wn,En),d=dt(Math.ceil(e.height/Ci),wn,En);if(u*d>wi){let g=Math.sqrt(wi/(u*d));u=dt(Math.floor(u*g),wn,En),d=dt(Math.floor(d*g),wn,En)}let p=new Set,m=[],f=(g,b)=>{let v=dt(Math.round(g),0,t-1),R=dt(Math.round(b),0,n-1),$=`${v}:${R}`;p.has($)||(p.add($),m.push({x:v,y:R}))};f(o+ue,r+ue),f(i-ue,r+ue),f(o+ue,a-ue),f(i-ue,a-ue),f(s,r+ue),f(s,a-ue),f(o+ue,c),f(i-ue,c),f(s,c);for(let g=0;g<u;g++){let b=o+(g+.5)/u*e.width;for(let v=0;v<d;v++)f(b,r+(v+.5)/d*e.height)}return m}function Tn(e,t=Bt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=El(e);for(let c of i)for(let u of document.elementsFromPoint(c.x,c.y))r.add(u);let a=[];for(let c of r){if(!t(c))continue;let u=c.getBoundingClientRect();if(u.width<=0||u.height<=0)continue;let d={left:u.left,top:u.top,right:u.left+u.width,bottom:u.top+u.height};if(n){let p=Math.max(o.left,d.left),m=Math.max(o.top,d.top),f=Math.min(o.right,d.right),g=Math.min(o.bottom,d.bottom),b=Math.max(0,f-p)*Math.max(0,g-m),v=u.width*u.height;v>0&&b/v>=wl&&a.push(c)}else o.left<d.right&&o.right>d.left&&o.top<d.bottom&&o.bottom>d.top&&a.push(c)}let s=a.filter(c=>!a.some(u=>u!==c&&u.contains(c)));return s.sort((c,u)=>{let d=c.compareDocumentPosition(u);return d&Node.DOCUMENT_POSITION_FOLLOWING?-1:d&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}D();function ut(e,t,n){return e+(t-e)*n}D();var Tl=.35,Sl=.3,Sn=.5,kl=2,Z=null,Ve=null,jo=0,Uo=0,zt=1,pt=null,U=null,X=null,Ei=l.accent,Ml="rgba(162,89,255,0.08)",Pl="rgba(162,89,255,0.15)";function ki(){let e=F();e&&(Z=document.createElement("canvas"),Z.setAttribute("data-sketch-ui-ghost","true"),Z.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(Z),Xo(),window.addEventListener("resize",Xo))}function Wt(e,t=4){if(!e){U&&(U.targetOpacity=0,Gt());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!U||!U.initialized?U=Pi(n,t):(U.target=n,U.borderRadius=t,U.targetOpacity=1),Gt()}function Yt(e,t=4){if(!e){X&&(X.targetOpacity=0,Gt());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!X||!X.initialized?X=Pi(n,t):(X.target=n,X.borderRadius=t,X.targetOpacity=1),Gt()}function Mi(){pt!==null&&cancelAnimationFrame(pt),window.removeEventListener("resize",Xo),Z?.remove(),Z=null,Ve=null,U=null,X=null}function Pi(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function Xo(){Z&&(zt=Math.max(window.devicePixelRatio||1,kl),jo=window.innerWidth,Uo=window.innerHeight,Z.width=jo*zt,Z.height=Uo*zt,Z.style.width=`${jo}px`,Z.style.height=`${Uo}px`,Ve=Z.getContext("2d"),Gt())}function Gt(){pt===null&&(pt=requestAnimationFrame(Ri))}function Ri(){if(pt=null,!Ve||!Z)return;let e=!1;U?.initialized&&(Ti(U,Tl)&&(e=!0),U.opacity<.01&&U.targetOpacity===0&&(U=null)),X?.initialized&&(Ti(X,Sl)&&(e=!0),X.opacity<.01&&X.targetOpacity===0&&(X=null)),Ve.setTransform(1,0,0,1,0,0),Ve.clearRect(0,0,Z.width,Z.height),Ve.setTransform(zt,0,0,zt,0,0),U&&Si(Ve,U,Ei,Ml),X&&Si(Ve,X,Ei,Pl),e&&(pt=requestAnimationFrame(Ri))}function Ti(e,t){let n=e.current,o=e.target,r=ut(n.x,o.x,t),i=ut(n.y,o.y,t),a=ut(n.w,o.w,t),s=ut(n.h,o.h,t),c=ut(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<Sn&&Math.abs(i-o.y)<Sn&&Math.abs(a-o.w)<Sn&&Math.abs(s-o.h)<Sn&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=c,!0)}function Si(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}var Rl=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Ll=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Nl=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Ol=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],$l=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Al=[{key:"borderWidth",label:"Width",group:"border",controlType:"number-scrub",cssProperty:"border-width",tailwindPrefix:"border",tailwindScale:"borderWidth",defaultValue:"0",min:0,classPattern:"^border-(\\d+|\\[.+\\])$"},{key:"borderColor",label:"Color",group:"border",controlType:"color-swatch",cssProperty:"border-color",tailwindPrefix:"border",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^border-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"},{key:"borderStyle",label:"Style",group:"border",controlType:"segmented",cssProperty:"border-style",tailwindPrefix:"border",tailwindScale:"borderStyle",defaultValue:"none",classPattern:"^border-(solid|dashed|dotted|double|none)$",enumValues:[{value:"solid",tailwindValue:"solid",label:"Solid"},{value:"dashed",tailwindValue:"dashed",label:"Dashed"},{value:"dotted",tailwindValue:"dotted",label:"Dotted"},{value:"none",tailwindValue:"none",label:"None"}]},{key:"borderRadius",label:"Radius",group:"border",controlType:"number-scrub",cssProperty:"border-radius",tailwindPrefix:"rounded",tailwindScale:"borderRadius",defaultValue:"0",min:0},{key:"borderTopLeftRadius",label:"TL",group:"border",controlType:"number-scrub",cssProperty:"border-top-left-radius",tailwindPrefix:"rounded-tl",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-t","rounded-l"],defaultValue:"0",min:0},{key:"borderTopRightRadius",label:"TR",group:"border",controlType:"number-scrub",cssProperty:"border-top-right-radius",tailwindPrefix:"rounded-tr",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-t","rounded-r"],defaultValue:"0",min:0},{key:"borderBottomRightRadius",label:"BR",group:"border",controlType:"number-scrub",cssProperty:"border-bottom-right-radius",tailwindPrefix:"rounded-br",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-b","rounded-r"],defaultValue:"0",min:0},{key:"borderBottomLeftRadius",label:"BL",group:"border",controlType:"number-scrub",cssProperty:"border-bottom-left-radius",tailwindPrefix:"rounded-bl",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-b","rounded-l"],defaultValue:"0",min:0}],_l=[{key:"opacity",label:"Opacity",group:"effects",controlType:"slider",cssProperty:"opacity",tailwindPrefix:"opacity",tailwindScale:"opacity",defaultValue:"1",min:0,max:100}],mt=[...Rl,...Ll,...Nl,...Ol,...$l,...Al,..._l];D();var Hl=new Set(["auto","none","normal","inherit","initial"]);function Li(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${w};`,a.appendChild(s),a.appendChild(c);let u=new Map(t);function d(){return u.get(r.key)??r.defaultValue}function p(m){let f=parseFloat(m);s.value=isNaN(f)?m:String(f);try{let b=Rr(i,m).find(v=>v.cssValue===m);b?.token?c.textContent=`${r.tailwindPrefix}-${b.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let m=s.value.trim(),f=parseFloat(m);if(isNaN(f))Hl.has(m)?(u.set(r.key,m),p(m),n(r.key,m),o()):p(d());else{let b=m.match(/(px|rem|em|%|vw|vh|ch)$/)?m:`${f}px`;u.set(r.key,b),p(b),n(r.key,b),o()}}),s.addEventListener("keydown",m=>{m.key==="Enter"?s.blur():m.key==="Escape"&&(p(d()),s.blur())}),p(d()),{element:a,setValue(m,f){m===r.key&&(u.set(m,f),p(f))},destroy(){}}}D();function Ni(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${P.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,c=[];function u(d){s=d;for(let{btn:p,value:m,opt:f}of c){let g=m===d;p.style.background=g?l.accent:"transparent",p.style.color=g?l.textOnAccent:l.textSecondary,p.title=g&&f.tailwindValue?`${f.label} (${f.tailwindValue})`:f.label}}for(let d of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${P.xs};
      font-family:${w};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=d.icon??d.label,p.title=d.label,p.addEventListener("click",()=>{u(d.value),n(r.key,d.value),o()}),c.push({btn:p,value:d.value,opt:d}),a.appendChild(p)}return u(s),{element:a,setValue(d,p){d===r.key&&u(p)},destroy(){}}}D();D();function kn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let c=r===0?0:a/r*100,u=r*100;return{h:s,s:c,v:u}}function Mn(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),c=o*(1-(1-i)*n),u,d,p;switch(r%6){case 0:u=o,d=c,p=a;break;case 1:u=s,d=o,p=a;break;case 2:u=a,d=o,p=c;break;case 3:u=a,d=s,p=o;break;case 4:u=c,d=a,p=o;break;case 5:u=o,d=a,p=s;break;default:u=0,d=0,p=0}let m=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${m(u)}${m(d)}${m(p)}`}var Be=null;function nt(e){Re();let t=F();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.lg};
    border-radius: ${P.md};
    font-family: ${w};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${S.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let y=n.getBoundingClientRect();y.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-y.width-8}px`),y.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-y.height-8}px`),n.style.opacity="1"});let o=kn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let y=Il(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(y)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${L.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),n.appendChild(c);function u(){let y=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${y}, 0%, 100%)`),T.addColorStop(1,`hsl(${y}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let V=a.createLinearGradient(0,0,0,120);V.addColorStop(0,"rgba(0,0,0,0)"),V.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=V,a.fillRect(0,0,176,120);let oe=o.s/100*176,_e=(1-o.v/100)*120;s.style.left=`${oe}px`,s.style.top=`${_e}px`}let d=!1;i.addEventListener("mousedown",y=>{d=!0,p(y)});function p(y){let T=i.getBoundingClientRect(),V=Math.max(0,Math.min(176,y.clientX-T.left)),oe=Math.max(0,Math.min(120,y.clientY-T.top));o.s=V/176*100,o.v=(1-oe/120)*100,u(),A()}let m=document.createElement("canvas");m.width=176,m.height=14,m.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let f=m.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${L.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(m),b.appendChild(g),n.appendChild(b);function v(){let y=f.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)y.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);f.fillStyle=y,f.fillRect(0,0,176,14),g.style.left=`${o.h/360*176}px`}let R=!1;m.addEventListener("mousedown",y=>{R=!0,$(y)});function $(y){let T=m.getBoundingClientRect(),V=Math.max(0,Math.min(176,y.clientX-T.left));o.h=V/176*360,v(),u(),A()}let N=document.createElement("input");N.type="text",N.value=Mn(o),N.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${P.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,N.addEventListener("keydown",y=>{y.key==="Enter"&&N.blur(),y.stopPropagation()}),N.addEventListener("blur",()=>{let y=N.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(y)){let T=y.startsWith("#")?y:`#${y}`;o=kn(T),u(),v(),A()}else N.value=Mn(o)}),n.appendChild(N);let H=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],x=document.createElement("div");x.style.cssText="display:flex;gap:4px;justify-content:center;";for(let y of H){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${y};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${S.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=L.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=kn(y),u(),v(),N.value=y,A()}),x.appendChild(T)}n.appendChild(x);function A(){let y=Mn(o);N.value=y,e.onColorChange(y)}t.appendChild(n),Be=n,u(),v();let J=y=>{d&&p(y),R&&$(y)},Q=()=>{d=!1,R=!1};document.addEventListener("mousemove",J),document.addEventListener("mouseup",Q);let M=y=>{y.key==="Escape"&&Re()};document.addEventListener("keydown",M,!0);let I=y=>{Be&&!y.composedPath().includes(Be)&&Re()};setTimeout(()=>document.addEventListener("mousedown",I,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",J),document.removeEventListener("mouseup",Q),document.removeEventListener("keydown",M,!0),document.removeEventListener("mousedown",I,!0)},n._onClose=e.onClose}function Re(){Be&&(Be._cleanup?.(),Be._onClose?.(),Be.remove(),Be=null)}function Il(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?l.bgPrimary:"transparent"};
      box-shadow: ${i===t?L.sm:"none"};
      color: ${i===t?l.textPrimary:l.textSecondary};
      font-family: ${w}; font-size: 12px; cursor: pointer;
      transition: background ${S.fast}, color ${S.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?L.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var Ko=null;function Dl(){return Ko||(Ko=document.createElement("canvas").getContext("2d")),Ko}function Oi(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${P.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${w};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let u=t.get(r.key)??r.defaultValue,d=!1;function p(g){let b=g.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let v=Dl();v.fillStyle="#000000",v.fillStyle=b;let R=v.fillStyle;if(R.startsWith("#"))return R;let $=R.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if($){let N=parseInt($[1],10),H=parseInt($[2],10),x=parseInt($[3],10);return`#${((1<<24)+(N<<16)+(H<<8)+x).toString(16).slice(1)}`}return"#000000"}function m(g){u=g,s.value=g,g==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=g;try{let b=Lt(),v=un(g,b.colorsReverse);v?c.textContent=`${r.tailwindPrefix??"bg"}-${v}`:c.textContent=""}catch{c.textContent=""}}function f(){if(d)return;let g=s.value.trim();if(!g){m(u);return}let b=p(g);m(b),n(r.key,b),o()}return a.addEventListener("click",()=>{if(d){Re(),d=!1;return}let g=a.getBoundingClientRect();d=!0,nt({initialColor:p(u),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:b=>{m(b),n(r.key,b)},onClose:()=>{d=!1,o()}})}),s.addEventListener("keydown",g=>{g.key==="Enter"?(f(),s.blur()):g.key==="Escape"&&(m(u),s.blur())}),s.addEventListener("blur",()=>{f()}),s.addEventListener("input",()=>{let g=s.value.trim(),b=p(g);a.style.background=b}),m(u),{element:i,setValue(g,b){g===r.key&&m(b)},destroy(){d&&(Re(),d=!1)}}}D();function $i(e,t,n,o){let r=e[0],i=r.key==="opacity",a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:6px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`
    font-family:${w};
    font-size:11px;
    color:${l.textSecondary};
    min-width:16px;
  `.trim().replace(/\n\s*/g," "),i&&(c.textContent="%"),a.appendChild(s),a.appendChild(c);let u=t.get(r.key)??r.defaultValue;function d(p){u=p;let m=parseFloat(p);isNaN(m)?s.value=p:s.value=String(i?Math.round(m*100):m)}return s.addEventListener("blur",()=>{let p=s.value.trim(),m=parseFloat(p);if(isNaN(m))d(u);else{let f=String(i?Math.min(100,Math.max(0,m))/100:m);u=f,d(f),n(r.key,f),o()}}),s.addEventListener("keydown",p=>{p.key==="Enter"?s.blur():p.key==="Escape"&&(d(u),s.blur())}),d(u),{element:a,setValue(p,m){p===r.key&&d(m)},destroy(){}}}D();function Ai(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function _i(e,t,n,o){let r=new Map(t),i=[];for(let E of e){let C=Ai(E.key);C&&i.push({descriptor:E,...C})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${w};
    font-size:10px;
    color:${l.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("div");s.style.cssText="position:relative; padding:4px;";let c=document.createElement("div");c.style.cssText=`
    background:${l.marginBoxBg};
    border:1px dashed ${l.marginBoxBorder};
    border-radius:${P.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let u=document.createElement("div");u.style.cssText=`
    background:${l.paddingBoxBg};
    border:1px dashed ${l.paddingBoxBorder};
    border-radius:${P.sm};
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
    color:${l.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${l.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g," "),d.textContent="content";let p=[];function m(E){let C=document.createElement("span"),re=r.get(E.key)??E.defaultValue;return C.textContent=$(re),C.title=E.label,C.style.cssText=`
      cursor:pointer;
      color:${l.textPrimary};
      font-size:10px;
      font-family:${w};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),C.addEventListener("mouseenter",()=>{C.style.background=l.bgTertiary}),C.addEventListener("mouseleave",()=>{(document.activeElement!==f||f.dataset.key!==E.key)&&(C.style.background="transparent")}),C.addEventListener("click",()=>{v(E,C)}),p.push({key:E.key,span:C,descriptor:E}),C}let f=document.createElement("input");f.type="text",f.className="prop-input",f.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(f);let g=null,b=null;function v(E,C){g&&g!==E&&R(),g=E,b=C,f.dataset.key=E.key;let re=r.get(E.key)??E.defaultValue;f.value=$(re);let j=0,Ze=0,He=C;for(;He&&He!==a;)j+=He.offsetLeft,Ze+=He.offsetTop,He=He.offsetParent;f.style.display="block",f.style.left=`${j}px`,f.style.top=`${Ze}px`;let Pr=C.getBoundingClientRect();f.style.width=`${Math.max(40,Pr.width+10)}px`,f.focus(),f.select()}function R(){if(!g||!b)return;let E=f.value.trim(),C=g,re=b,j,Ze=parseFloat(E),He=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(Ze)?He.has(E)?j=E:j=r.get(C.key)??C.defaultValue:j=E.match(/(px|rem|em|%|vw|vh|ch)$/)?E:`${Ze}px`,r.set(C.key,j),re.textContent=$(j),re.style.background="transparent",f.style.display="none",f.dataset.key="",g=null,b=null,n(C.key,j),o()}f.addEventListener("keydown",E=>{if(E.key==="Enter")R();else if(E.key==="Escape"){if(g&&b){let C=r.get(g.key)??g.defaultValue;b.textContent=$(C)}f.style.display="none",f.dataset.key="",g=null,b=null}}),f.addEventListener("blur",()=>{R()});function $(E){let C=parseFloat(E);return isNaN(C)?E:C===Math.round(C)?String(Math.round(C)):E}function N(E){let C=document.createElement("span");return C.textContent=E,C.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),C}function H(E,C){return i.find(re=>re.layer===E&&re.side===C)}function x(E,C){let re=H(E,C);if(!re){let j=document.createElement("span");return j.textContent="-",j.style.cssText=`text-align:center; color:${l.textTertiary};`,j}return m(re.descriptor)}let A=x("padding","top");A.style.gridRow="1",A.style.gridColumn="2",A.style.textAlign="center";let J=x("padding","left");J.style.gridRow="2",J.style.gridColumn="1";let Q=x("padding","right");Q.style.gridRow="2",Q.style.gridColumn="3";let M=x("padding","bottom");M.style.gridRow="3",M.style.gridColumn="2",M.style.textAlign="center",d.style.gridRow="2",d.style.gridColumn="2",u.appendChild(A),u.appendChild(J),u.appendChild(d),u.appendChild(Q),u.appendChild(M);let I=document.createElement("div");I.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let y=x("margin","top");y.style.gridRow="1",y.style.gridColumn="2",y.style.textAlign="center";let T=x("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let V=x("margin","right");V.style.gridRow="2",V.style.gridColumn="3";let oe=x("margin","bottom");oe.style.gridRow="3",oe.style.gridColumn="2",oe.style.textAlign="center";let _e=document.createElement("div");_e.style.cssText="grid-row:2; grid-column:2;",_e.appendChild(u),I.appendChild(y),I.appendChild(T),I.appendChild(_e),I.appendChild(V),I.appendChild(oe);let cn=N("margin"),Cs=N("padding"),dn=document.createElement("div");return dn.style.cssText="display:flex; gap:8px; padding:0 4px;",dn.appendChild(cn),dn.appendChild(Cs),c.appendChild(I),s.appendChild(c),a.appendChild(dn),a.appendChild(s),{element:a,setValue(E,C){if(!Ai(E))return;r.set(E,C);let j=p.find(Ze=>Ze.key===E);j&&(j.span.textContent=$(C))},destroy(){}}}D();var Pn=new Set;function Hi(e){return Pn.has(e)}var Rn=[];function Ii(e){return Rn.push(e),()=>{let t=Rn.indexOf(e);t>=0&&Rn.splice(t,1)}}var Fl={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background",border:"Border",effects:"Effects"},Vl={"number-scrub":Li,segmented:Ni,"color-swatch":Oi,slider:$i,"box-model":_i},Bl=`
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
    font-family: ${w};
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
    border-radius: ${P.xs};
    padding: 4px 6px;
    font-family: ${w};
    font-size: 11px;
    color: ${l.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${S.fast}, box-shadow ${S.fast};
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
    font-family: ${w};
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
`;function zl(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Gl(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Wl(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var Yl=new Set(["flexDirection","justifyContent","alignItems","gap"]);function jl(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function qo(e,t,n,o){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=Bl,r.appendChild(i);let a=[],s=Gl(e);for(let[c,u]of s){let d=c==="layout"&&!jl(t)?u.filter(v=>!Yl.has(v.key)):u;if(d.length===0)continue;let p=document.createElement("div");p.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Fl[c]}</span>${zl()}`;let f=document.createElement("div");f.className="prop-section-body";let g=Pn.has(c);if(g){let v=m.querySelector(".prop-section-chevron");v&&v.classList.add("collapsed"),f.classList.add("collapsed")}m.addEventListener("click",()=>{if(g=!g,g)Pn.add(c);else{Pn.delete(c);for(let R of Rn)R(c)}let v=m.querySelector(".prop-section-chevron");v&&v.classList.toggle("collapsed",g),f.classList.toggle("collapsed",g)}),p.appendChild(m);let b=Wl(d);for(let v of b){let R=Vl[v.controlType];if(!R)continue;let $=R(v.descriptors,t,n,o);if(v.descriptors.length>1||v.controlType==="box-model")f.appendChild($.element);else{let N=document.createElement("div");N.className="prop-control-row";let H=document.createElement("span");H.className="prop-control-label",H.textContent=v.descriptors[0].label,H.title=v.descriptors[0].label;let x=document.createElement("div");x.className="prop-control-value",x.appendChild($.element),N.appendChild(H),N.appendChild(x),f.appendChild(N)}a.push($)}p.appendChild(f),r.appendChild(p)}return{container:r,controls:a}}D();var Ul=300,Di=260,Fi=380,Vi="sketch-ui-sidebar-width",Xl=4,Kl=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${L.lg};
    z-index: 2147483645;
    font-family: ${w};
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform ${S.settle};
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
    width: ${Xl}px;
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
    border-radius: ${P.sm};
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
    font-family: ${w};
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
    font-family: ${w};
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: ${P.xs};
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
`;function ql(){try{let e=localStorage.getItem(Vi);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Di&&t<=Fi)return t}}catch{}return Math.min(Ul,Math.floor(window.innerWidth*.22))}function Zl(e){try{localStorage.setItem(Vi,String(e))}catch{}}function Bi(e,t){let n=document.createElement("style");n.textContent=Kl,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${ql()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let u=document.createElement("div");u.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(u);let d=document.createElement("button");d.className="prop-sidebar-close",d.title="Close panel",d.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(a),i.appendChild(d),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let m=document.createElement("div");m.className="prop-sidebar-content",o.appendChild(m),e.appendChild(o);let f=!1,g=0,b=0;r.addEventListener("pointerdown",M=>{M.preventDefault(),M.stopPropagation(),f=!0,g=M.clientX,b=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(M.pointerId)}),r.addEventListener("pointermove",M=>{if(!f)return;let I=g-M.clientX,y=Math.max(Di,Math.min(Fi,b+I));o.style.width=`${y}px`});let v=()=>{f&&(f=!1,r.classList.remove("active"),Zl(o.offsetWidth))};r.addEventListener("pointerup",v),r.addEventListener("pointercancel",v),o.addEventListener("pointerdown",M=>M.stopPropagation()),o.addEventListener("mousedown",M=>M.stopPropagation()),o.addEventListener("click",M=>M.stopPropagation()),o.addEventListener("mouseup",M=>M.stopPropagation()),d.addEventListener("click",()=>{N(),t&&t()});let R=!1;function $(M,I,y,T){s.textContent=`<${M}>`,s.appendChild(c),u.textContent=`${I}:${y}`,u.title=`${I}:${y}`,m.innerHTML="",m.appendChild(T),R||(R=!0,o.offsetHeight,o.classList.add("visible"))}function N(){R&&(R=!1,o.classList.remove("visible"))}function H(M){m.innerHTML="",m.appendChild(M)}function x(M,I,y){p.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=M;let V=document.createElement("button");V.className="prop-sidebar-warning-btn",V.textContent=I,V.addEventListener("click",oe=>{oe.stopPropagation(),y()}),p.appendChild(T),p.appendChild(V),p.style.display="flex"}function A(){p.style.display="none",p.innerHTML=""}function J(){c.classList.add("active")}function Q(){c.classList.remove("active")}return{show:$,hide:N,isVisible:()=>R,getElement:()=>o,replaceContent:H,showWarning:x,clearWarning:A,showSaving:J,hideSaving:Q}}ie();var tr=new Map(mt.map(e=>[e.key,e]));var Ql=new Set(["layout","spacing","size"]),oa=new Set(["typography","background","border","effects"]),ec=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},ot=[],_,ra,ae=null,tc=300,ge=null,gt=null,Fn=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(ra),ra=setTimeout(()=>{nc()},80))});function nc(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){Bn();return}let n=oc(e);if(n){Vn(n,t);return}rc(e).then(o=>{o?Vn(o,t):Bn()})}function oc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=de(n);for(;o;){if(xe(o)){let r=o._debugSource,i=ce(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function rc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=de(n);if(!o)continue;let r=await et(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=De(i.fileName);tt(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function ic(e,t){let n=getComputedStyle(e),o=new Map;for(let r of mt){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function ac(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let n of mt){if(n.group!==e||h.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;h.currentValues.set(n.key,r),h.originalValues.get(n.key)===n.defaultValue&&h.originalValues.set(n.key,r);for(let i of ot)i.setValue(n.key,r)}}function qt(){for(let e of ot)e.destroy();ot=[]}function ia(){if(!h.selectedElement||!h.componentInfo)return;qt();let{container:e,controls:t}=qo(mt,h.currentValues,la,aa);ot=t,_.replaceContent(e)}function aa(){ae&&clearTimeout(ae),ae=setTimeout(()=>{ae=null,or()},tc)}function nr(){ae&&(clearTimeout(ae),ae=null),gt&&(gt(),gt=null),ge&&(clearTimeout(ge.timeoutId),ge=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function sa(e){_=Bi(e,()=>{zn(),qt(),nr()}),Or((t,n,o)=>{if(_&&_.hideSaving(),ge)if(clearTimeout(ge.timeoutId),t)ge=null;else{let{batch:r,previousOriginals:i}=ge;ge=null;for(let[a]of r){let s=i.get(a);s!==void 0&&h.originalValues.set(a,s)}if(h.selectedElement){for(let[a]of r){h.selectedElement.style[a]="",h.activeOverrides.delete(a);let s=h.originalValues.get(a);s!==void 0&&h.currentValues.set(a,s)}for(let a of ot)for(let[s]of r){let c=h.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(_){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";_.showWarning(s,"Dismiss",()=>_.clearWarning())}}else if(!t&&_){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";_.showWarning(i,"Dismiss",()=>_.clearWarning())}})}function Vn(e,t){h.pendingBatch.size>0&&or(),qt(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(Ql);for(let a of oa)Hi(a)||n.add(a);let o=ic(e,n);h.currentValues=o,h.originalValues=new Map(o),h.activeOverrides=new Map,h.pendingBatch=new Map,gt&&gt(),gt=Ii(a=>{oa.has(a)&&ac(a)});let{container:r,controls:i}=qo(mt,h.currentValues,la,aa);ot=i,Fn.disconnect(),Fn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),_.show(t.componentName,t.filePath,t.lineNumber,r)}function la(e,t){let n=tr.get(e);if(!n||!h.selectedElement)return;h.selectedElement.style[n.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let o=Lt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?un(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:h.originalValues.get(e)||n.defaultValue}),e==="display")if(ia(),t==="none"){let s=h.originalValues.get("display")||"block";_.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=s),h.activeOverrides.delete("display"),h.currentValues.set("display",s),h.pendingBatch.delete("display"),ia(),_.clearWarning()})}else _.clearWarning()}function or(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,n=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let a=[...h.pendingBatch.values()][0],s=tr.get(a.property);ve({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else ve({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...h.pendingBatch.values()].map(a=>{let s=tr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&ea({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),_&&_.showSaving();let o=new Map;for(let[a]of h.pendingBatch)o.set(a,h.originalValues.get(a)||"");for(let[a,s]of h.pendingBatch)h.originalValues.set(a,s.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{ge&&ge.batch===r&&(ge=null,_&&_.hideSaving())},ec);ge={batch:r,previousOriginals:o,timeoutId:i},h.pendingBatch.clear()}function zn(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of ot)for(let[t,n]of h.originalValues)e.setValue(t,n);h.activeOverrides.clear(),h.pendingBatch.clear()}}function Bn(){ae&&(clearTimeout(ae),ae=null),Fn.disconnect(),zn(),qt(),_&&_.hide(),nr()}function ca(){ae&&(clearTimeout(ae),ae=null),Fn.disconnect(),or(),qt(),_&&_.hide(),nr()}function da(){return h.activeOverrides.size>0}ie();ie();ht();D();var fc="2147483644",cr=null;function xa(){cr=fa(gc)}function gc(e){for(let t of We().values())e?(e.appendChild(t.cloneEl),t.cloneEl.style.position="absolute",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin=""):(document.body.appendChild(t.cloneEl),t.cloneEl.style.position="fixed",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin="")}function Ca(e,t){let n=e.getBoundingClientRect(),{scale:o,offsetX:r,offsetY:i}=Ce(),a=e.cloneNode(!0);a.setAttribute("data-sketch-ui-ghost","true"),a.style.width=`${n.width/o}px`,a.style.height=`${n.height/o}px`,a.style.zIndex=fc,a.style.pointerEvents="none",a.style.margin="0",a.style.boxSizing="border-box",a.style.boxShadow=L.sm;let s=(n.left-r)/o,c=(n.top-i)/o,u=sr();u?(a.style.position="absolute",a.style.left=`${s}px`,a.style.top=`${c}px`,u.appendChild(a)):(a.style.position="fixed",a.style.left=`${n.left}px`,a.style.top=`${n.top}px`,a.style.transform=`scale(${o})`,a.style.transformOrigin="0 0",document.body.appendChild(a));let d=e.style.opacity||"",p=e.style.visibility||"",m=_n();e.style.opacity=m?"0":"0.3",m&&(e.style.visibility="hidden");let f={id:crypto.randomUUID(),componentRef:t,originalRect:{top:c,left:s,width:n.width/o,height:n.height/o},currentPos:{x:s,y:c},cloneEl:a,originalEl:e,originalOpacity:d,originalVisibility:p};return ji(f),f}function Gn(e,t,n){let o=We().get(e);if(!o)return;if(o.currentPos={x:t,y:n},sr())o.cloneEl.style.left=`${t}px`,o.cloneEl.style.top=`${n}px`;else{let{scale:i,offsetX:a,offsetY:s}=Ce();o.cloneEl.style.left=`${t*i+a}px`,o.cloneEl.style.top=`${n*i+s}px`,o.cloneEl.style.transform=`scale(${i})`,o.cloneEl.style.transformOrigin="0 0"}}function Jt(e,t){for(let n of We().values()){let o=n.cloneEl.getBoundingClientRect();if(e>=o.left&&e<=o.right&&t>=o.top&&t<=o.bottom)return n}return null}function wa(){cr?.(),cr=null}function Wn(e){let t=We().get(e);t&&(t.cloneEl.style.boxShadow=L.lg,t.cloneEl.style.opacity="0.9",t.cloneEl.style.transition=`box-shadow ${S.settle}`)}function Ea(e){let t=We().get(e);t&&(t.cloneEl.style.boxShadow=L.sm,t.cloneEl.style.opacity="1")}Vo()||Bo({onCommitFiberRoot(){}});async function hc(e){let t=de(e);if(!t)return null;try{let n=await et(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||Fe(i))continue;let a="";if(r.fileName){let s=De(r.fileName);tt(s)&&(a=s)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:",n)}return Sa(e,t)}function Sa(e,t){let n=[],o=t;for(;o;){if(xe(o)){let r=ce(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!Fe(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Ta(e){let t=de(e);return t?Sa(e,t):null}var Ee=null,we=null,Ue=null,Ne=!1,yt=!1,k=null,be=null,Ye="idle",Y=null,bt=null,yc=null,bc=null,vc=null,xc=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.sm};
    border-radius: ${P.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${w};
    white-space: nowrap;
    display: none;
    opacity: 0;
    transition: opacity ${S.medium};
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
`;function ka(e){yc=e.onStart,bc=e.onMove,vc=e.onEnd}function Ma(){let e=F();if(!e)return;let t=document.createElement("style");t.textContent=xc,e.appendChild(t),k=document.createElement("div"),k.className="selection-label",e.appendChild(k),be=document.createElement("div"),be.className="marquee-box",e.appendChild(be),Ne=!0,document.addEventListener("mousedown",Yn,!0),document.addEventListener("mousemove",jn,!0),document.addEventListener("mouseup",Un,!0),document.addEventListener("keydown",Kn,!0),document.addEventListener("click",Xn,!0),document.addEventListener("scroll",je,!0),window.addEventListener("resize",je),yt=!0}function Yn(e){if(!Ne||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#sketch-ui-root"))return;e.preventDefault(),e.stopPropagation();let n=Jt(e.clientX,e.clientY);if(n){Y={x:e.clientX,y:e.clientY},bt=n.originalEl,Ue=n,Ye="pending";return}if(!t||!Bt(t)){Ee&&(ca(),Ee=null,we=null,Ue=null,Yt(null),k&&(k.classList.remove("visible"),k.style.display="none"),hn(null));return}Y={x:e.clientX,y:e.clientY},bt=t,Ue=null,Ye="pending"}function jn(e){if(Ne){if(Ye==="pending"&&Y){let t=Math.abs(e.clientX-Y.x),n=Math.abs(e.clientY-Y.y);(t>10||n>10)&&(Ye="marquee")}if(Ye==="marquee"&&Y&&be){let t=Math.min(e.clientX,Y.x),n=Math.min(e.clientY,Y.y),o=Math.abs(e.clientX-Y.x),r=Math.abs(e.clientY-Y.y);be.style.display="block",be.style.left=`${t}px`,be.style.top=`${n}px`,be.style.width=`${o}px`,be.style.height=`${r}px`;return}if(Ye==="idle"){let t=Jt(e.clientX,e.clientY);if(t){let i=t.cloneEl.getBoundingClientRect(),a=parseFloat(getComputedStyle(t.originalEl).borderRadius)||4;Wt(i,a+2);return}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!Bt(n)){Wt(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Wt(o,r+2)}}}function Un(e){if(!Ne)return;let t=Ye;if(Ye="idle",t==="marquee"&&Y){be&&(be.style.display="none"),wc(Math.min(e.clientX,Y.x),Math.min(e.clientY,Y.y),Math.max(e.clientX,Y.x),Math.max(e.clientY,Y.y)),Y=null,bt=null;return}bt&&Cc(bt),Y=null,bt=null}async function Cc(e){try{let t=Ue?Ue.cloneEl.getBoundingClientRect():e.getBoundingClientRect();we=e,Pa(t,{}),Tc();let n=await hc(e);if(console.log("[SketchUI] selectElement:",e.tagName,"\u2192",n?.componentName,n?.filePath,"stack:",n?.stack?.map(o=>o.componentName)),!n)return;if(Ee={tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,stack:n.stack,boundingRect:{top:t.top,left:t.left,width:t.width,height:t.height}},k){let o=n.filePath?`${n.filePath}:${n.lineNumber}`:"";k.innerHTML=`<span class="comp-name">${n.componentName}</span>${o?`<span class="comp-path">${o}</span>`:""}`}Vn(e,Ee),hn({tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber})}catch(t){console.error("[SketchUI] selectElement error:",t)}}function wc(e,t,n,o){let r=Tn({x:e,y:t,width:n-e,height:o-t});if(r.length===0)return;let i=[];for(let s of r.slice(0,50)){let c=Ta(s);c?.stack?.length&&i.push(c.stack)}if(i.length===0)return;let a=Ec(i);if(a)for(let s of r){let c=Ta(s);if(c&&c.componentName===a.componentName){let u=s.getBoundingClientRect();if(we=s,Ee={tagName:s.tagName.toLowerCase(),componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:c.stack,boundingRect:{top:u.top,left:u.left,width:u.width,height:u.height}},Pa(u,Ee),k){let d=a.filePath?`${a.filePath}:${a.lineNumber}`:"";k.innerHTML=`<span class="comp-name">${a.componentName}</span>${d?`<span class="comp-path">${d}</span>`:""}`}return}}}function Ec(e){if(e.length===0)return null;if(e.length===1)return e[0][0];let t=e[0],n=null;for(let o=0;o<t.length;o++){let r=t[o];if(e.every(a=>a[o]&&a[o].filePath===r.filePath&&a[o].lineNumber===r.lineNumber))n=r;else break}return n}function Xn(e){Ne&&(e.metaKey||e.ctrlKey||e.preventDefault())}function Kn(e){if(Ne&&e.key==="Escape"&&Ee){if(da()){zn(),e.preventDefault();return}vt(),e.preventDefault()}}function Pa(e,t){if(we){let n=parseFloat(getComputedStyle(we).borderRadius)||4;Yt(e,n+2)}if(k){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),k.style.left=`${i}px`,k.style.top=`${r}px`,k.style.display="block",k.style.right="auto",k.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>k?.classList.add("visible")),requestAnimationFrame(()=>{if(!k)return;k.getBoundingClientRect().right>window.innerWidth-8&&(k.style.left="auto",k.style.right="8px")})}}function je(){if(!we||!Ee)return;let e=Ue?Ue.cloneEl.getBoundingClientRect():we.getBoundingClientRect(),t=parseFloat(getComputedStyle(we).borderRadius)||4;if(Yt(e,t+2),k&&k.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),k.style.left=`${e.left}px`,k.style.top=`${r}px`,k.style.right="auto",k.getBoundingClientRect().right>window.innerWidth-8&&(k.style.left="auto",k.style.right="8px")}}function Tc(){Wt(null)}function vt(){Bn(),Ee=null,we=null,Ue=null,Yt(null),k&&(k.classList.remove("visible"),k.style.display="none"),hn(null)}function Ra(){return Ee}function La(){Ne=!1,document.removeEventListener("mousedown",Yn,!0),document.removeEventListener("mousemove",jn,!0),document.removeEventListener("mouseup",Un,!0),document.removeEventListener("keydown",Kn,!0),document.removeEventListener("click",Xn,!0),document.removeEventListener("scroll",je,!0),window.removeEventListener("resize",je),yt=!1,k?.remove(),k=null}function dr(e){e&&!yt?(document.addEventListener("mousedown",Yn,!0),document.addEventListener("mousemove",jn,!0),document.addEventListener("mouseup",Un,!0),document.addEventListener("keydown",Kn,!0),document.addEventListener("click",Xn,!0),document.addEventListener("scroll",je,!0),window.addEventListener("resize",je),yt=!0,Ne=!0):!e&&yt&&(document.removeEventListener("mousedown",Yn,!0),document.removeEventListener("mousemove",jn,!0),document.removeEventListener("mouseup",Un,!0),document.removeEventListener("keydown",Kn,!0),document.removeEventListener("click",Xn,!0),document.removeEventListener("scroll",je,!0),window.removeEventListener("resize",je),yt=!1,Ne=!1)}function Na(){return we??null}var ne=null,te=null,Xe=null,Oa=null,Qt=!1,xt=null,qn=[],Zn=new Map,Jn=!1,Sc=`
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
`,Ct=null;function $a(){let e=F();if(!e)return;let t=document.createElement("style");t.textContent=Sc,e.appendChild(t),ka({onStart:kc,onMove:Mc,onEnd:Pc}),Je(n=>{n.type==="reorderComplete"&&(ur(),vt())})}function kc(e,t,n){Xe=n,Oa=t,xt={x:e.clientX,y:e.clientY},Qt=!1,Jn=!1,qn=[],Zn=new Map,Ct=null;let o=F();if(!o)return;ne=document.createElement("div"),ne.className="drag-preview";let r=t.getBoundingClientRect();ne.style.width=`${r.width}px`,ne.style.height=`${r.height}px`,ne.innerHTML=t.outerHTML,o.appendChild(ne),te=document.createElement("div"),te.className="drop-indicator",o.appendChild(te);let i=n.stack[1];if(!i)return;ve({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=Je(s=>{if(s.type!=="siblingsList")return;a(),qn=s.siblings;let c=document.querySelectorAll("*");for(let u of c){if(u.closest("#sketch-ui-root"))continue;let d=de(u);if(!d)continue;let p=d;for(;p;){if(xe(p)){let m=p._debugSource||p._debugOwner?._debugSource;if(m){for(let f of s.siblings)m.lineNumber===f.lineNumber&&m.fileName===i.filePath&&Zn.set(f.lineNumber,{el:u,rect:u.getBoundingClientRect()});break}}p=p.return}}Jn=!0})}function Mc(e){if(!xt)return;let t=Math.abs(e.clientX-xt.x),n=Math.abs(e.clientY-xt.y);if(t<5&&n<5||(Qt=!0,ne&&(ne.style.display="block",ne.style.left=`${e.clientX+10}px`,ne.style.top=`${e.clientY+10}px`),!Jn||!Xe))return;let o=null,r=1/0,i=0,a=0,s=0;for(let c of qn){if(c.lineNumber===Xe.lineNumber)continue;let u=Zn.get(c.lineNumber);if(!u)continue;let d=u.rect,p=d.top+d.height/2,m=Math.abs(e.clientY-p);m<r&&(r=m,o=c,e.clientY<p?i=d.top-2:i=d.bottom+2,a=d.left,s=d.width)}Ct=o,o&&te?(te.style.display="block",te.style.top=`${i}px`,te.style.left=`${a}px`,te.style.width=`${s}px`):te&&(te.style.display="none")}function Pc(e){if(!Qt||!Ct||!Xe){ur();return}ve({type:"reorder",filePath:Xe.filePath,fromLine:Xe.lineNumber,toLine:Ct.lineNumber,fromComponent:Xe.componentName,toComponent:Ct.componentName}),ne&&(ne.style.display="none"),te&&(te.style.display="none"),Qt=!1,xt=null}function ur(){ne?.remove(),te?.remove(),ne=null,te=null,Xe=null,Oa=null,Qt=!1,xt=null,Jn=!1,qn=[],Zn=new Map,Ct=null}function Aa(){ur()}D();ie();var Ke="http://www.w3.org/2000/svg",wt=null,G=null,pr=null;function _a(){let e=F();e&&(wt=document.createElementNS(Ke,"svg"),wt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),G=document.createElementNS(Ke,"g"),G.setAttribute("class","annotation-root"),wt.appendChild(G),e.appendChild(wt),window.addEventListener("scroll",Qn,{passive:!0}),pr=In(Qn),Qn())}function Qn(){if(!G)return;let{scale:e,offsetX:t,offsetY:n}=Ce();G.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function Ha(e,t,n,o){if(!G||t.length<2)return null;let r=document.createElementNS(Ke,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(Ke,"path");return i.setAttribute("d",Ba(t)),i.setAttribute("stroke",n),i.setAttribute("stroke-width",String(o)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),G.appendChild(r),r}function Ia(e,t,n,o,r,i){if(!G)return null;let a=document.createElementNS(Ke,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.sm};
    padding: 4px 8px;
    border-radius: ${P.sm};
    font-size: ${r}px;
    font-family: ${w};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),G.appendChild(a),a}function Da(e,t,n,o){if(!G)return null;let r=document.createElementNS(Ke,"circle");return r.setAttribute("data-annotation-id",e),r.setAttribute("cx",String(t)),r.setAttribute("cy",String(n)),r.setAttribute("r","6"),r.setAttribute("fill",o),r.setAttribute("stroke","white"),r.setAttribute("stroke-width","1.5"),G.appendChild(r),r}function Fa(e){if(!G)return;let t=G.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function mr(){G&&(G.innerHTML="")}function Va(){window.removeEventListener("scroll",Qn),pr?.(),pr=null,wt?.remove(),wt=null,G=null}function Ba(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let n=1;n<e.length;n++)t+=` L${e[n].x},${e[n].y}`;return t}function za(e,t){if(!G)return null;let n=[],o=document.createElementNS(Ke,"g"),r=document.createElementNS(Ke,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),o.appendChild(r),G.appendChild(o),{path:r,group:o,addPoint(i,a){n.push({x:i,y:a}),r.setAttribute("d",Ba(n))},getPoints(){return n}}}ie();D();ht();var Te={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',lasso:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-4.42 0-8 2.24-8 5 0 1.72 1.3 3.24 3.3 4.2"/><path d="M12 4c4.42 0 8 2.24 8 5 0 2.76-3.58 5-8 5"/><path d="M7.3 13.2C5.71 14.08 5 15.27 5 16.5c0 2.49 3.13 4.5 7 4.5s7-2.01 7-4.5c0-1.23-.71-2.42-2.3-3.3"/></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18c3.87 0 7-3.13 7-7s-3.13-7-7-7H4"/><polyline points="8 10 4 6 8 2"/></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>'},Ua=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",to=navigator.platform.includes("Mac")?"Cmd":"Ctrl",Cr=[{type:"pointer",icon:Te.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Te.grab,label:"Grab",shortcut:"H"},{type:"move",icon:Te.move,label:"Move",shortcut:"M"},{type:"draw",icon:Te.draw,label:"Draw",shortcut:"D"},{type:"color",icon:Te.color,label:"Color",shortcut:"E"},{type:"text",icon:Te.text,label:"Text",shortcut:"T"},{type:"lasso",icon:Te.lasso,label:"Lasso",shortcut:"L"}],Nc=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${P.lg};
    box-shadow: ${L.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${w};
    user-select: none;
    opacity: 0;
    animation: panelFadeIn ${S.settle} forwards;
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
    transition: background ${S.fast}, color ${S.fast};
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
    box-shadow: ${L.sm};
    color: ${l.textPrimary};
    padding: 4px 8px;
    border-radius: ${P.sm};
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${S.medium};
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
    transition: opacity ${S.medium};
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
    box-shadow: ${L.sm};
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
    font-family: ${w};
    cursor: pointer;
    padding: 0;
    transition: background ${S.fast}, color ${S.fast}, box-shadow ${S.fast};
  }
  .segment.active {
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    box-shadow: ${L.sm};
  }
  .clear-btn {
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
    transition: background ${S.fast}, color ${S.fast};
  }
  .clear-btn svg {
    width: 18px;
    height: 18px;
  }
  .clear-btn:hover {
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
    font-family: ${w};
    transition: background ${S.fast}, color ${S.fast};
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
    border-radius: ${P.lg};
    box-shadow: ${L.lg};
    padding: 24px 28px;
    min-width: 320px;
    max-width: 420px;
    font-family: ${w};
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
    font-family: ${w};
    color: ${l.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${l.textTertiary};
  }
`,se=null,K=null,oo=new Map,Oe=null,vr=null,xr=null;function Xa(e){vr=e}function Ka(e){xr=e}function qa(e){Oe&&(Oe.disabled=!e)}function Za(){let e=F();if(!e)return;let t=document.createElement("style");t.textContent=Nc,e.appendChild(t),se=document.createElement("div"),se.className="tools-panel";let n=[["pointer","grab"],["move"],["draw","color","text"],["lasso"]];for(let s=0;s<n.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",se.appendChild(c)}for(let c of n[s]){let u=Cr.find(m=>m.type===c),d=document.createElement("button");d.className=`tool-btn${u.type==="pointer"?" active":""}`,d.innerHTML=`${u.icon}<span class="tooltip">${u.label}<span class="shortcut-badge">${Ua}${u.shortcut}</span></span>`,d.addEventListener("click",()=>Xt(u.type));let p=null;d.addEventListener("mouseenter",()=>{p=setTimeout(()=>d.classList.add("tooltip-visible"),400)}),d.addEventListener("mouseleave",()=>{p&&clearTimeout(p),d.classList.remove("tooltip-visible")}),se.appendChild(d),oo.set(u.type,d)}}K=document.createElement("div"),K.className="sub-options hidden",se.appendChild(K);let o=document.createElement("div");o.className="tool-divider",se.appendChild(o),Oe=document.createElement("button"),Oe.className="clear-btn",Oe.innerHTML=Te.undo,Oe.title="Undo (Ctrl+Z)",Oe.disabled=!0,Oe.addEventListener("click",()=>{xr&&xr()}),se.appendChild(Oe);let r=document.createElement("button");r.className="clear-btn",r.innerHTML=Te.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{vr&&vr()}),se.appendChild(r);let i=document.createElement("button");i.className="clear-btn",i.innerHTML=Te.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{va(),i.style.color=ba()?l.accent:""}),se.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.textContent="?",a.title=`Keyboard Shortcuts (${Ua}/)`,a.addEventListener("click",()=>Qa()),se.appendChild(a),e.appendChild(se),document.addEventListener("keydown",Ja,!0)}function Ja(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){Qa(),e.preventDefault();return}let o=Cr.find(r=>r.shortcut===n);o&&(Xt(o.type),e.preventDefault())}var Se=null,on=null;function Qa(){Se?no():Oc()}function Oc(){let e=F();if(!e||Se)return;Se=document.createElement("div"),Se.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:Cr.map(r=>({action:r.label,keys:[to,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[to,"Z"]},{action:"Toggle Originals",keys:[to,"."]},{action:"Keyboard Shortcuts",keys:[to,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let u=document.createElement("span");u.className="shortcut-action",u.textContent=s.action,c.appendChild(u);let d=document.createElement("span");d.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let f=document.createElement("span");f.className="shortcut-plus",f.textContent="+",d.appendChild(f)}let m=document.createElement("span");m.className="shortcut-key",m.textContent=s.keys[p],d.appendChild(m)}c.appendChild(d),i.appendChild(c)}t.appendChild(i)}Se.appendChild(t),Se.addEventListener("click",r=>{r.target===Se&&no()}),e.appendChild(Se),on=r=>{no()},document.addEventListener("keydown",on,!0)}function no(){on&&(document.removeEventListener("keydown",on,!0),on=null),Se?.remove(),Se=null}function es(e){for(let[t,n]of oo)n.classList.toggle("active",t===e);$c(e)}function $c(e){if(K){if(K.innerHTML="",K.classList.add("hidden"),K.classList.remove("visible"),e==="draw"){K.classList.remove("hidden"),requestAnimationFrame(()=>K?.classList.add("visible"));let t=me(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.brushColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();nt({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Kt("brushColor",i),n.style.background=i},onClose(){}})}),K.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Kt("brushSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(Tt(),ja)).then(a=>a.refreshDrawCursor())}),o.appendChild(i)}K.appendChild(o)}else if(e==="text"){K.classList.remove("hidden"),requestAnimationFrame(()=>K?.classList.add("visible"));let t=me(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();nt({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Kt("textColor",i),n.style.background=i},onClose(){}})}),K.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Kt("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}K.appendChild(o)}}}function ts(e){let t=oo.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function ns(){document.removeEventListener("keydown",Ja,!0),no(),se?.remove(),se=null,K=null,oo.clear()}Tt();fr();D();var os="sketch-ui-onboarding-seen",ke=null,ro=null;function rs(){if(localStorage.getItem(os))return;let e=F();if(!e)return;ke=document.createElement("div"),ke.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.md};
    border-radius: ${P.md};
    padding: 12px 16px;
    font-family: ${w};
    font-size: 12px;
    color: ${l.textPrimary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${S.medium};
    max-width: 260px;
  `;let t=["V","H","M","D","C","T","L"],n=`
    display: inline-block;
    background: ${l.bgSecondary};
    color: ${l.textTertiary};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: ${w};
    margin: 0 2px;
  `;ke.innerHTML=`Press ${t.map(o=>`<span style="${n}">${o}</span>`).join(" ")} to switch tools`,e.appendChild(ke),requestAnimationFrame(()=>{ke&&(ke.style.opacity="1")}),ro=setTimeout(wr,5e3)}function wr(){ke&&(localStorage.setItem(os,"1"),ke.style.opacity="0",setTimeout(()=>{ke?.remove(),ke=null},150),ro&&(clearTimeout(ro),ro=null))}ie();function is(){dr(!0)}function as(){dr(!1)}Tt();ht();var Er=!1,Tr=0,Sr=0,ss={onMouseDown(e){Er=!0,Tr=e.clientX,Sr=e.clientY,eo("grabbing")},onMouseMove(e){if(!Er)return;let t=e.clientX-Tr,n=e.clientY-Sr;ha(t,n),Tr=e.clientX,Sr=e.clientY},onMouseUp(e){Er=!1,eo("grab")}};ie();var le=null,rn={x:0,y:0},St=!1,Ac=!1,ls={onMouseDown(e){let t=Jt(e.clientX,e.clientY);if(t){le=t;let a=fe(e.clientX,e.clientY);rn={x:a.x-t.currentPos.x,y:a.y-t.currentPos.y},St=!0,Wn(le.id);return}let n=Ra();if(!n){Ac=!0,Xt("pointer");return}let o=Na();if(!o)return;if(Qi(o)){for(let a of We().values())if(a.originalEl===o||a.originalEl.contains(o)||o.contains(a.originalEl)){le=a;let s=fe(e.clientX,e.clientY);rn={x:s.x-a.currentPos.x,y:s.y-a.currentPos.y},St=!0,Wn(le.id);return}}let r=Ca(o,{componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber});le=r;let i=fe(e.clientX,e.clientY);rn={x:i.x-r.currentPos.x,y:i.y-r.currentPos.y},St=!0,Wn(le.id)},onMouseMove(e){if(!St||!le)return;let t=fe(e.clientX,e.clientY),n=t.x-rn.x,o=t.y-rn.y;Gn(le.id,n,o)},onMouseUp(e){St&&le&&(Ui(le.id,le.currentPos),Ea(le.id)),le=null,St=!1}};ie();function io(e,t=2){if(e.length<=2)return e;let n=0,o=0,r=e[0],i=e[e.length-1];for(let a=1;a<e.length-1;a++){let s=_c(e[a],r,i);s>n&&(n=s,o=a)}if(n>t){let a=io(e.slice(0,o+1),t),s=io(e.slice(o),t);return[...a.slice(0,-1),...s]}return[r,i]}function _c(e,t,n){let o=n.x-t.x,r=n.y-t.y,i=o*o+r*r;if(i===0){let s=e.x-t.x,c=e.y-t.y;return Math.sqrt(s*s+c*c)}return Math.abs(r*e.x-o*e.y+n.x*t.y-n.y*t.x)/Math.sqrt(i)}Tt();async function kt(e,t){let n=nn(e,t);if(!n)return null;let o=de(n);if(!o)return null;try{let i=await et(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||Fe(s))continue;let c="";if(a.fileName){let u=De(a.fileName);tt(u)&&(c=u)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(xe(r)){let i=ce(r.type);if(i&&i[0]===i[0].toUpperCase()&&!Fe(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}async function cs(e){let t=de(e);if(!t)return null;try{let o=await et(t);if(o&&o.length>0)for(let r of o){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||Fe(i))continue;let a="";if(r.fileName){let s=De(r.fileName);tt(s)&&(a=s)}return{componentName:i,filePath:a,lineNumber:r.lineNumber??0}}}catch{}let n=t;for(;n;){if(xe(n)){let o=ce(n.type);if(o&&o[0]===o[0].toUpperCase()&&!Fe(o)){let r=n._debugSource||n._debugOwner?._debugSource;return{componentName:o,filePath:r?.fileName||"",lineNumber:r?.lineNumber||0}}}n=n.return}return null}var Me=null,ao=null,ds={onMouseDown(e){let t=me();if(Me=za(t.brushColor,t.brushSize),Me){let n=fe(e.clientX,e.clientY);Me.addPoint(n.x,n.y)}ao=kt(e.clientX,e.clientY)},onMouseMove(e){if(!Me)return;let t=fe(e.clientX,e.clientY);Me.addPoint(t.x,t.y)},async onMouseUp(e){if(!Me)return;let t=Me.getPoints(),n=me();if(Me.group.remove(),t.length<2){Me=null,ao=null;return}let o=await ao,r=io(t,2),i=crypto.randomUUID();Ha(i,r,n.brushColor,n.brushSize),ft({type:"draw",id:i,points:r,color:n.brushColor,strokeWidth:n.brushSize,targetComponent:o}),Me=null,ao=null}};ie();D();var q=null,it=null,so=null,ps={onMouseDown(e){q&&us();let t=fe(e.clientX,e.clientY);it={pageX:t.x,pageY:t.y},kt(e.clientX,e.clientY).then(n=>{so=n}),q=document.createElement("input"),q.type="text",q.placeholder="Type annotation...",q.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${P.sm};
      padding: 4px 8px;
      font-size: ${me().fontSize}px;
      font-family: ${w};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,q.setAttribute("data-sketch-ui-ghost","true"),q.addEventListener("keydown",n=>{n.key==="Enter"&&(us(),n.preventDefault()),n.key==="Escape"&&(ms(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(q),q.focus()},onMouseMove(){},onMouseUp(){}};function us(){if(!q||!it)return;let e=q.value.trim();if(q.remove(),q=null,!e)return;let t=me(),n=crypto.randomUUID();Ia(n,it.pageX,it.pageY,e,t.fontSize,t.textColor),ft({type:"text",id:n,position:it,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:so}),it=null,so=null}function ms(){q&&(q.remove(),q=null),it=null,so=null}function fs(){ms()}Tt();ie();var $e=null,sn=null,an="backgroundColor",lo={bg:"",color:""},gs={async onMouseDown(e){Re();let t=nn(e.clientX,e.clientY);if(!t)return;$e=t,lo={bg:getComputedStyle(t).backgroundColor,color:getComputedStyle(t).color};let n=await kt(e.clientX,e.clientY);if(!n)return;sn=n;let o=Hc(lo.bg);tn(!1),nt({initialColor:o,position:{x:e.clientX+10,y:e.clientY+10},showPropertyToggle:!0,onColorChange(r){$e&&($e.style[an]=r)},onPropertyChange(r){an=r},onClose(){if(tn(!0),!$e||!sn)return;let r=an==="backgroundColor"?lo.bg:lo.color,i=$e.style[an];if(i&&i!==r){let a=crypto.randomUUID(),s=$e.getBoundingClientRect(),c=fe(s.right,s.top);Da(a,c.x,c.y,i),ft({type:"colorChange",id:a,component:sn,targetElement:$e,property:an,fromColor:r,toColor:i})}$e=null,sn=null}})},onMouseMove(){},onMouseUp(){}};function Hc(e){let t=e.match(/\d+/g);return!t||t.length<3?"#000000":"#"+t.slice(0,3).map(n=>parseInt(n).toString(16).padStart(2,"0")).join("")}function hs(){Re(),tn(!0),$e=null,sn=null}D();var ys="http://www.w3.org/2000/svg",he=[],Ae=null,Mt=null,bs=[],kr=[],vs={onMouseDown(e){ln(),he=[{x:e.clientX,y:e.clientY}];let t=F();t&&(Mt=document.createElementNS(ys,"svg"),Mt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647;"),Ae=document.createElementNS(ys,"path"),Ae.setAttribute("stroke",l.accent),Ae.setAttribute("stroke-width","1.5"),Ae.setAttribute("fill",l.accentSoft),Mt.appendChild(Ae),t.appendChild(Mt))},onMouseMove(e){!Ae||he.length===0||(he.push({x:e.clientX,y:e.clientY}),Ic())},async onMouseUp(e){if(he.length<3){Mr();return}let t=Dc();Mr();let n=Tn({x:t.left,y:t.top,width:t.right-t.left,height:t.bottom-t.top}),o=new Set,r=await Promise.all(n.map(i=>cs(i)));for(let i=0;i<n.length;i++){let a=r[i],s=n[i];a&&!o.has(`${a.filePath}:${a.lineNumber}`)&&(o.add(`${a.filePath}:${a.lineNumber}`),bs.push(s),Fc(s.getBoundingClientRect()))}}};function Ic(){if(!Ae||he.length<2)return;let e=`M${he[0].x},${he[0].y}`;for(let t=1;t<he.length;t++)e+=` L${he[t].x},${he[t].y}`;e+=" Z",Ae.setAttribute("d",e)}function Dc(){let e=1/0,t=1/0,n=-1/0,o=-1/0;for(let r of he)e=Math.min(e,r.x),t=Math.min(t,r.y),n=Math.max(n,r.x),o=Math.max(o,r.y);return{left:e,top:t,right:n,bottom:o}}function Fc(e){let t=document.createElement("div");t.setAttribute("data-sketch-ui-ghost","true"),t.style.cssText=`
    position: fixed;
    left: ${e.left}px;
    top: ${e.top}px;
    width: ${e.width}px;
    height: ${e.height}px;
    border: 1.5px solid ${l.accent};
    pointer-events: none;
    z-index: 2147483645;
  `,document.body.appendChild(t),kr.push(t)}function Mr(){Mt?.remove(),Mt=null,Ae=null,he=[]}function ln(){Mr(),kr.forEach(e=>e.remove()),kr=[],bs=[]}ht();function xs(){let e=window.__SKETCH_UI_WS_PORT__;if(!e){console.warn("[SketchUI] No WebSocket port found.");return}if(document.getElementById("sketch-ui-root"))return;pn(e),jr(Vc);let t=F();t&&sa(t),Ma(),ki(),$a(),_a(),xa(),Ki(r=>Fa(r)),Zi((r,i,a)=>Gn(r,i,a)),Za(),hr(),rs(),qe("grab",ss),qe("move",ls),qe("draw",ds),qe("text",ps),qe("color",gs),qe("lasso",vs),Wi((r,i)=>{wr(),ts(r),i==="pointer"&&as(),i==="text"&&fs(),i==="color"&&hs(),i==="lasso"&&ln(),Et(),Yo(),r==="pointer"&&is(),yr(r),es(r)}),Yi(()=>{Jr(er()),qa(ta())}),Ka(()=>{let r=Qo();r&&W(`Undo: ${r}`)}),Xr(()=>{if(!er()){W("No moved components to toggle");return}let r=!_n();Ji(r),Zr(r)});let n=!1,o=0;Kr(()=>{if(n)return;let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);W(`Please wait ${a}s before retrying`);return}let i=na();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length){W("Nothing to generate \u2014 make some visual changes first");return}n=!0,W("Generating..."),ve({type:"generate",annotations:i})}),Je(r=>{if(r.type==="generateProgress"&&W(r.message),r.type==="generateComplete")if(n=!1,r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");W(`Applied: ${i}`),vt(),mr(),ln(),Dn()}else W(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),qr(()=>{if(An()==="pointer")return!1;let r=Qo();return r?(W(`Undo: ${r}`),!0):!1}),Xa(()=>{vt(),mr(),ln(),Dn(),ya(),W("Canvas cleared")}),console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools")}function Vc(){Et(),Yo(),La(),Mi(),Aa(),Va(),wa(),ns(),br(),Dn(),lr(),$r(),Ur()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",xs):xs();})();
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
