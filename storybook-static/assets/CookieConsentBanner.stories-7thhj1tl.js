import{j as u}from"./jsx-runtime-DFAAy_2V.js";import{r as l,o as Oe}from"./index-Bc2G9s8g.js";import{within as Le,userEvent as Ue}from"./index-CLEdRh-S.js";import"./index-Dy83Z4lh.js";import{A as S,d as v}from"./AppButton-CBdVkNSc.js";/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},L.apply(this,arguments)}var C;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(C||(C={}));function Ne(e){e===void 0&&(e={});let{initialEntries:t=["/"],initialIndex:n,v5Compat:a=!1}=e,r;r=t.map((s,m)=>f(s,typeof s=="string"?null:s.state,m===0?"default":void 0));let i=p(n??r.length-1),o=C.Pop,c=null;function p(s){return Math.min(Math.max(s,0),r.length-1)}function d(){return r[i]}function f(s,m,x){m===void 0&&(m=null);let b=Be(r?d().pathname:"/",s,m,x);return he(b.pathname.charAt(0)==="/","relative pathnames are not supported in memory history: "+JSON.stringify(s)),b}function h(s){return typeof s=="string"?s:A(s)}return{get index(){return i},get action(){return o},get location(){return d()},createHref:h,createURL(s){return new URL(h(s),"http://localhost")},encodeLocation(s){let m=typeof s=="string"?E(s):s;return{pathname:m.pathname||"",search:m.search||"",hash:m.hash||""}},push(s,m){o=C.Push;let x=f(s,m);i+=1,r.splice(i,r.length,x),a&&c&&c({action:o,location:x,delta:1})},replace(s,m){o=C.Replace;let x=f(s,m);r[i]=x,a&&c&&c({action:o,location:x,delta:0})},go(s){o=C.Pop;let m=p(i+s),x=r[m];i=m,c&&c({action:o,location:x,delta:s})},listen(s){return c=s,()=>{c=null}}}}function y(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function he(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ie(){return Math.random().toString(36).substr(2,8)}function Be(e,t,n,a){return n===void 0&&(n=null),L({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?E(t):t,{state:n,key:t&&t.key||a||Ie()})}function A(e){let{pathname:t="/",search:n="",hash:a=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),a&&a!=="#"&&(t+=a.charAt(0)==="#"?a:"#"+a),t}function E(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}var $;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})($||($={}));function me(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}const Te=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,_e=e=>Te.test(e);function Me(e,t){t===void 0&&(t="/");let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?E(e):e,i;if(n)if(_e(n))i=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),he(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?i=q(n.substring(1),"/"):i=q(n,t)}else i=t;return{pathname:i,search:ze(a),hash:We(r)}}function q(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function B(e,t,n,a){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(a)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Ae(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function ge(e,t){let n=Ae(e);return t?n.map((a,r)=>r===n.length-1?a.pathname:a.pathnameBase):n.map(a=>a.pathnameBase)}function xe(e,t,n,a){a===void 0&&(a=!1);let r;typeof e=="string"?r=E(e):(r=L({},e),y(!r.pathname||!r.pathname.includes("?"),B("?","pathname","search",r)),y(!r.pathname||!r.pathname.includes("#"),B("#","pathname","hash",r)),y(!r.search||!r.search.includes("#"),B("#","search","hash",r)));let i=e===""||r.pathname==="",o=i?"/":r.pathname,c;if(o==null)c=n;else{let h=t.length-1;if(!a&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),h-=1;r.pathname=g.join("/")}c=h>=0?t[h]:"/"}let p=Me(r,c),d=o&&o!=="/"&&o.endsWith("/"),f=(i||o===".")&&n.endsWith("/");return!p.pathname.endsWith("/")&&(d||f)&&(p.pathname+="/"),p}const ve=e=>e.join("/").replace(/\/\/+/g,"/"),ze=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,We=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,ye=["post","put","patch","delete"];new Set(ye);const Ve=["get",...ye];new Set(Ve);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function U(){return U=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},U.apply(this,arguments)}const be=l.createContext(null),k=l.createContext(null),J=l.createContext(null),N=l.createContext({outlet:null,matches:[],isDataRoute:!1});function Je(e,t){let{relative:n}=t===void 0?{}:t;I()||y(!1);let{basename:a,navigator:r}=l.useContext(k),{hash:i,pathname:o,search:c}=Ce(e,{relative:n}),p=o;return a!=="/"&&(p=o==="/"?a:ve([a,o])),r.createHref({pathname:p,search:c,hash:i})}function I(){return l.useContext(J)!=null}function K(){return I()||y(!1),l.useContext(J).location}function we(e){l.useContext(k).static||l.useLayoutEffect(e)}function Ke(){let{isDataRoute:e}=l.useContext(N);return e?qe():Fe()}function Fe(){I()||y(!1);let e=l.useContext(be),{basename:t,future:n,navigator:a}=l.useContext(k),{matches:r}=l.useContext(N),{pathname:i}=K(),o=JSON.stringify(ge(r,n.v7_relativeSplatPath)),c=l.useRef(!1);return we(()=>{c.current=!0}),l.useCallback(function(d,f){if(f===void 0&&(f={}),!c.current)return;if(typeof d=="number"){a.go(d);return}let h=xe(d,JSON.parse(o),i,f.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:ve([t,h.pathname])),(f.replace?a.replace:a.push)(h,f.state,f)},[t,a,o,i,e])}function Ce(e,t){let{relative:n}=t===void 0?{}:t,{future:a}=l.useContext(k),{matches:r}=l.useContext(N),{pathname:i}=K(),o=JSON.stringify(ge(r,a.v7_relativeSplatPath));return l.useMemo(()=>xe(e,JSON.parse(o),i,n==="path"),[e,o,i,n])}var ke=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ke||{}),Se=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Se||{});function De(e){let t=l.useContext(be);return t||y(!1),t}function Ge(e){let t=l.useContext(N);return t||y(!1),t}function $e(e){let t=Ge(),n=t.matches[t.matches.length-1];return n.route.id||y(!1),n.route.id}function qe(){let{router:e}=De(ke.UseNavigateStable),t=$e(Se.UseNavigateStable),n=l.useRef(!1);return we(()=>{n.current=!0}),l.useCallback(function(r,i){i===void 0&&(i={}),n.current&&(typeof r=="number"?e.navigate(r):e.navigate(r,U({fromRouteId:t},i)))},[e,t])}function Xe(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}const Ye="startTransition",X=Oe[Ye];function Qe(e){let{basename:t,children:n,initialEntries:a,initialIndex:r,future:i}=e,o=l.useRef();o.current==null&&(o.current=Ne({initialEntries:a,initialIndex:r,v5Compat:!0}));let c=o.current,[p,d]=l.useState({action:c.action,location:c.location}),{v7_startTransition:f}=i||{},h=l.useCallback(g=>{f&&X?X(()=>d(g)):d(g)},[d,f]);return l.useLayoutEffect(()=>c.listen(h),[c,h]),l.useEffect(()=>Xe(i),[i]),l.createElement(Ze,{basename:t,children:n,location:p.location,navigationType:p.action,navigator:c,future:i})}function Ze(e){let{basename:t="/",children:n=null,location:a,navigationType:r=C.Pop,navigator:i,static:o=!1,future:c}=e;I()&&y(!1);let p=t.replace(/^\/*/,"/"),d=l.useMemo(()=>({basename:p,navigator:i,static:o,future:U({v7_relativeSplatPath:!1},c)}),[p,c,i,o]);typeof a=="string"&&(a=E(a));let{pathname:f="/",search:h="",hash:g="",state:s=null,key:m="default"}=a,x=l.useMemo(()=>{let b=me(f,p);return b==null?null:{location:{pathname:b,search:h,hash:g,state:s,key:m},navigationType:r}},[p,f,h,g,s,m,r]);return x==null?null:l.createElement(k.Provider,{value:d},l.createElement(J.Provider,{children:n,value:x}))}new Promise(()=>{});/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function z(){return z=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},z.apply(this,arguments)}function He(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,i;for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function et(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function tt(e,t){return e.button===0&&(!t||t==="_self")&&!et(e)}const nt=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],at="6";try{window.__reactRouterVersion=at}catch{}const rt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",it=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ot=l.forwardRef(function(t,n){let{onClick:a,relative:r,reloadDocument:i,replace:o,state:c,target:p,to:d,preventScrollReset:f,viewTransition:h}=t,g=He(t,nt),{basename:s}=l.useContext(k),m,x=!1;if(typeof d=="string"&&it.test(d)&&(m=d,rt))try{let w=new URL(window.location.href),O=d.startsWith("//")?new URL(w.protocol+d):new URL(d),G=me(O.pathname,s);O.origin===w.origin&&G!=null?d=G+O.search+O.hash:x=!0}catch{}let b=Je(d,{relative:r}),Pe=st(d,{replace:o,state:c,target:p,preventScrollReset:f,relative:r,viewTransition:h});function Ee(w){a&&a(w),w.defaultPrevented||Pe(w)}return l.createElement("a",z({},g,{href:m||b,onClick:x||i?a:Ee,ref:n,target:p}))});var Y;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Y||(Y={}));var Q;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Q||(Q={}));function st(e,t){let{target:n,replace:a,state:r,preventScrollReset:i,relative:o,viewTransition:c}=t===void 0?{}:t,p=Ke(),d=K(),f=Ce(e,{relative:o});return l.useCallback(h=>{if(tt(h,n)){h.preventDefault();let g=a!==void 0?a:A(d)===A(f);p(e,{replace:g,state:r,preventScrollReset:i,relative:o,viewTransition:c})}},[d,p,f,a,r,n,e,i,o,c])}const F="trivia-quiz-cookie-consent-v1",je=1;function W(){return{necessary:!0,analytics:!1,marketing:!1}}function lt(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.version=="number"&&typeof t.updatedAt=="string"&&typeof t.resolution=="string"&&t.categories&&typeof t.categories=="object"}function V(){if(typeof window>"u"||!window.localStorage)return null;try{const e=window.localStorage.getItem(F);if(!e)return null;const t=JSON.parse(e);return lt(t)?t:null}catch{return null}}function D(e){var n,a;const t={version:e.version??je,updatedAt:e.updatedAt??new Date().toISOString(),resolution:e.resolution,categories:{necessary:!0,analytics:!!((n=e.categories)!=null&&n.analytics),marketing:!!((a=e.categories)!=null&&a.marketing)}};return typeof window<"u"&&window.localStorage&&window.localStorage.setItem(F,JSON.stringify(t)),t}function ct(){const e=V();return!e||e.version!==je?!0:e.resolution==="pending"}function ut(){return D({resolution:"accepted",categories:{necessary:!0,analytics:!0,marketing:!0}})}function dt(){return D({resolution:"rejected",categories:W()})}function pt(e){return D({resolution:"custom",categories:{necessary:!0,analytics:!!e.analytics,marketing:!!e.marketing}})}const ft=v.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(2, 6, 23, 0) 0%,
    rgba(2, 6, 23, 0.55) 100%
  );
`,ht=v.div`
  position: fixed;
  z-index: 41;
  left: 12px;
  right: 12px;
  bottom: 12px;
  max-width: min(720px, calc(100vw - 24px));
  margin: 0 auto;
  border-radius: 20px;
  padding: 18px 18px 16px;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.45);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(99, 102, 241, 0.12);
  backdrop-filter: blur(14px);
  pointer-events: auto;

  @media (min-width: 640px) {
    padding: 22px 22px 18px;
    left: 24px;
    right: 24px;
    bottom: 24px;
  }
`,mt=v.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`,gt=v.h2`
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #a855f7, #6366f1, #22c55e);
  -webkit-background-clip: text;
  color: transparent;
`,xt=v.p`
  margin: 0 0 12px;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--text-muted);
`,Z=v.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`,vt=v.div`
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(148, 163, 184, 0.25);
  display: flex;
  flex-direction: column;
  gap: 10px;
`,T=v.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.85rem;
  color: var(--text-main);
`,_=v.input`
  width: 42px;
  height: 22px;
  accent-color: #6366f1;
  cursor: pointer;
`,yt=v.div`
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
`,M=v(ot)`
  color: #a5b4fc;
  text-decoration: none;
  border-bottom: 1px solid rgba(165, 180, 252, 0.35);
  &:hover {
    color: #c7d2fe;
  }
`;function Re(){const[e,t]=l.useState(()=>ct()),[n,a]=l.useState(!1),[r,i]=l.useState(()=>{const s=typeof window<"u"?V():null;return s?!!s.categories.analytics:W().analytics}),[o,c]=l.useState(()=>{const s=typeof window<"u"?V():null;return s?!!s.categories.marketing:W().marketing}),p=l.useMemo(()=>"Необхідні cookies потрібні для збереження вашої згоди та базової роботи застосунку.",[]);if(!e)return null;const d=()=>t(!1),f=()=>{ut(),d()},h=()=>{dt(),d()},g=()=>{pt({analytics:r,marketing:o}),d()};return u.jsxs(u.Fragment,{children:[u.jsx(ft,{"aria-hidden":!0}),u.jsxs(ht,{role:"dialog","aria-modal":"false","aria-labelledby":"cookie-consent-title",children:[u.jsx(mt,{children:u.jsx(gt,{id:"cookie-consent-title",children:"Конфіденційність та cookies"})}),u.jsx(xt,{children:"Ми використовуємо локальне сховище браузера для налаштувань гри, історії результатів і запису ваших преференцій щодо cookies. Ви можете прийняти всі категорії, відхилити опційні або налаштувати їх окремо. Детальніше — у документах нижче."}),!n&&u.jsxs(Z,{children:[u.jsx(S,{variant:"primary",onClick:f,children:"Прийняти всі"}),u.jsx(S,{variant:"secondary",onClick:h,children:"Лише необхідні"}),u.jsx(S,{variant:"ghost",onClick:()=>a(!0),children:"Налаштувати"})]}),n&&u.jsxs(vt,{children:[u.jsxs(T,{children:[u.jsx("span",{children:"Необхідні (завжди увімкнено)"}),u.jsx(_,{type:"checkbox",checked:!0,disabled:!0,"aria-label":"Необхідні cookies"})]}),u.jsxs(T,{children:[u.jsx("span",{children:"Аналітика (опційно)"}),u.jsx(_,{type:"checkbox",checked:r,onChange:s=>i(s.target.checked),"aria-label":"Аналітичні cookies"})]}),u.jsxs(T,{children:[u.jsx("span",{children:"Маркетинг (опційно)"}),u.jsx(_,{type:"checkbox",checked:o,onChange:s=>c(s.target.checked),"aria-label":"Маркетингові cookies"})]}),u.jsxs(Z,{children:[u.jsx(S,{variant:"primary",onClick:g,children:"Зберегти вибір"}),u.jsx(S,{variant:"ghost",onClick:()=>a(!1),children:"Назад"})]})]}),u.jsxs(yt,{children:[u.jsx("span",{children:p}),u.jsx(M,{to:"/legal/gdpr",children:"GDPR"}),u.jsx(M,{to:"/legal/cookies",children:"Політика cookies"}),u.jsx(M,{to:"/legal/privacy",children:"Конфіденційність"})]})]})]})}Re.__docgenInfo={description:"Банер згоди на cookies з варіантами «прийняти», «відхилити опційні» та «налаштувати».\r\nЗберігає вибір у `localStorage` відповідно до політики cookies та пояснення GDPR.",methods:[],displayName:"CookieConsentBanner"};const jt={title:"Legal/CookieConsentBanner",component:Re,tags:["autodocs"],decorators:[(e,t)=>(window.localStorage.removeItem(F),u.jsx(Qe,{initialEntries:[t.parameters.routerPath||"/"],children:u.jsx("div",{style:{paddingBottom:240},children:u.jsx(e,{})})}))],parameters:{routerPath:"/",docs:{description:{component:"Банер згоди відповідно до моделі GDPR: зберігання лише першої згоди категорій. Не впливає на історію вікторини чи налаштування гри."}}}},j={},R={play:async({canvasElement:e})=>{const t=Le(e);await Ue.click(t.getByRole("button",{name:/налаштувати/i}))}},P={parameters:{viewport:{viewports:{palm384:{name:"Palm 384",styles:{width:"384px",height:"736px"},type:"mobile"}},defaultViewport:"palm384"}}};var H,ee,te,ne,ae;j.parameters={...j.parameters,docs:{...(H=j.parameters)==null?void 0:H.docs,source:{originalSource:"{}",...(te=(ee=j.parameters)==null?void 0:ee.docs)==null?void 0:te.source},description:{story:"Банер із трьома головними діями.",...(ae=(ne=j.parameters)==null?void 0:ne.docs)==null?void 0:ae.description}}};var re,ie,oe,se,le;R.parameters={...R.parameters,docs:{...(re=R.parameters)==null?void 0:re.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", {
      name: /налаштувати/i
    }));
  }
}`,...(oe=(ie=R.parameters)==null?void 0:ie.docs)==null?void 0:oe.source},description:{story:"Відкриває режим «Налаштувати» й показує перемикачі категорій (інтеракція).",...(le=(se=R.parameters)==null?void 0:se.docs)==null?void 0:le.description}}};var ce,ue,de,pe,fe;P.parameters={...P.parameters,docs:{...(ce=P.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        palm384: {
          name: "Palm 384",
          styles: {
            width: "384px",
            height: "736px"
          },
          type: "mobile"
        }
      },
      defaultViewport: "palm384"
    }
  }
}`,...(de=(ue=P.parameters)==null?void 0:ue.docs)==null?void 0:de.source},description:{story:"Адаптивний вигляд на типовій ширині мобільного екрана.",...(fe=(pe=P.parameters)==null?void 0:pe.docs)==null?void 0:fe.description}}};const Rt=["DefaultBanner","CustomizeInteractive","MobileViewport"];export{R as CustomizeInteractive,j as DefaultBanner,P as MobileViewport,Rt as __namedExportsOrder,jt as default};
