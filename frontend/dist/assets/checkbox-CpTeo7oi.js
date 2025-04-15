import{r as e,z as t,j as r,l as s,m as a,v as n,o,V as c,W as d}from"./ui-B9MhWaVJ.js";import{r as i}from"./router-D7BdrHDj.js";import{e as l,h as u}from"./index-BMLMJrKU.js";var f="Checkbox",[p,b]=s(f),[m,h]=p(f),k=i.forwardRef(((s,o)=>{const{__scopeCheckbox:c,name:d,checked:l,defaultChecked:u,required:f,disabled:p,value:b="on",onCheckedChange:h,form:k,...x}=s,[y,w]=i.useState(null),g=e(o,(e=>w(e))),E=i.useRef(!1),N=!y||(k||!!y.closest("form")),[R=!1,D]=t({prop:l,defaultProp:u,onChange:h}),P=i.useRef(R);return i.useEffect((()=>{const e=y?.form;if(e){const t=()=>D(P.current);return e.addEventListener("reset",t),()=>e.removeEventListener("reset",t)}}),[y,D]),r.jsxs(m,{scope:c,state:R,disabled:p,children:[r.jsx(a.button,{type:"button",role:"checkbox","aria-checked":j(R)?"mixed":R,"aria-required":f,"data-state":C(R),"data-disabled":p?"":void 0,disabled:p,value:b,...x,ref:g,onKeyDown:n(s.onKeyDown,(e=>{"Enter"===e.key&&e.preventDefault()})),onClick:n(s.onClick,(e=>{D((e=>!!j(e)||!e)),N&&(E.current=e.isPropagationStopped(),E.current||e.stopPropagation())}))}),N&&r.jsx(v,{control:y,bubbles:!E.current,name:d,value:b,checked:R,required:f,disabled:p,form:k,style:{transform:"translateX(-100%)"},defaultChecked:!j(u)&&u})]})}));k.displayName=f;var x="CheckboxIndicator",y=i.forwardRef(((e,t)=>{const{__scopeCheckbox:s,forceMount:n,...c}=e,d=h(x,s);return r.jsx(o,{present:n||j(d.state)||!0===d.state,children:r.jsx(a.span,{"data-state":C(d.state),"data-disabled":d.disabled?"":void 0,...c,ref:t,style:{pointerEvents:"none",...e.style}})})}));y.displayName=x;var v=e=>{const{control:t,checked:s,bubbles:a=!0,defaultChecked:n,...o}=e,l=i.useRef(null),u=c(s),f=d(t);i.useEffect((()=>{const e=l.current,t=window.HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(t,"checked").set;if(u!==s&&r){const t=new Event("click",{bubbles:a});e.indeterminate=j(s),r.call(e,!j(s)&&s),e.dispatchEvent(t)}}),[u,s,a]);const p=i.useRef(!j(s)&&s);return r.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:n??p.current,...o,tabIndex:-1,ref:l,style:{...e.style,...f,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function j(e){return"indeterminate"===e}function C(e){return j(e)?"indeterminate":e?"checked":"unchecked"}var w=k,g=y;const E=i.forwardRef((({className:e,...t},s)=>r.jsx(w,{ref:s,className:l("peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...t,children:r.jsx(g,{className:l("flex items-center justify-center text-current"),children:r.jsx(u,{className:"h-4 w-4"})})})));E.displayName=w.displayName;export{E as C};
