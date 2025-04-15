import{j as t}from"./ui-B9MhWaVJ.js";import{r as e}from"./router-D7BdrHDj.js";import{e as s}from"./index-BMLMJrKU.js";import{L as r}from"./label-hQz2gHLy.js";const n=t=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,63}))$/.test(String(t).toLowerCase()),a=t=>{const e=/[A-Z]/.test(t),s=/[a-z]/.test(t),r=/\d/.test(t),n=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(t);return{isValid:t.length>=8&&e&&s&&r&&n,errors:{length:t.length<8,upperCase:!e,lowerCase:!s,digit:!r,specialChar:!n}}},i=t=>{if(!t)return!1;const e=t.replace(/\D/g,"");if(10===e.length&&e.startsWith("0"))return/^0[1-9]/.test(e);if(e.startsWith("33")&&11===e.length){const t="0"+e.substring(2);return/^0[1-9]/.test(t)}return!(e.startsWith("33")&&e.length>11)},o=t=>{let e=t.replace(/\D/g,"");return e.startsWith("33")?(e=e.substring(0,11),11===e.length?`+33 ${e.substring(2,4)} ${e.substring(4,6)} ${e.substring(6,8)} ${e.substring(8,10)} ${e.substring(10)}`:`+33 ${e.substring(2)}`):e.startsWith("0")&&e.length<=10?`${e.substring(0,2)} ${e.substring(2,4)} ${e.substring(4,6)} ${e.substring(6,8)} ${e.substring(8)}`:t},l=t=>{if(!t)return!1;const e=new Date,s=new Date(t),r=e.getFullYear()-s.getFullYear(),n=e.getMonth()>s.getMonth()||e.getMonth()===s.getMonth()&&e.getDate()>=s.getDate()?r:r-1;return n>=16&&n<=120},u=t=>{if(!t)return!1;try{const e=new URL(t);return!("https:"!==e.protocol||"www.linkedin.com"!==e.hostname||!e.pathname.startsWith("/in/"))}catch(e){return!1}},c=t=>{if(!t)return!1;try{return"https:"===new URL(t).protocol}catch(e){return!1}},g=t=>{if(!t)return!1;const e=t.trim();if(e.length<2)return!1;return/^[a-zA-ZÀ-ÿ\u00C0-\u017F\s\-']+$/.test(e)},h=e.forwardRef((({className:n,value:a="",onChange:l,error:u,label:c,id:g,placeholder:h="06 12 34 56 78",disabled:d=!1,...p},b)=>{const[m,f]=e.useState("");e.useEffect((()=>{if(a)if(a.startsWith("+33"))f(o(a));else if(a.startsWith("0")){const t=`+33${a.substring(1)}`;f(o(t)),l(t.replace(/\s/g,""))}else{const t=`+33${a}`;f(o(t)),l(t.replace(/\s/g,""))}else f("")}),[a]);const $=!a||i(a);return t.jsxs("div",{className:"w-full",children:[c&&t.jsx(r,{htmlFor:g,className:"block text-sm font-medium text-blue-300 mb-1",children:c}),t.jsx("input",{id:g,ref:b,type:"tel",value:m,onChange:t=>{const e=t.target.value.replace(/[^\d\s+]/g,"");if(!e.startsWith("+33")){if(e.startsWith("0")){const t=`+33${e.substring(1)}`,s=o(t);return f(s),void l(t.replace(/\s/g,""))}const t=`+33${e}`,s=o(t);return f(s),void l(t.replace(/\s/g,""))}const s=o(e);f(s);const r=s.replace(/\s/g,"");l(r)},className:s("w-full px-4 py-3 rounded-md border bg-gray-800/50 text-white placeholder-gray-400","focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none",u||!$?"border-red-500":"border-gray-700",d&&"opacity-50 cursor-not-allowed",n),placeholder:h,disabled:d,inputMode:"numeric",autoComplete:"tel-national",name:"phoneNumber"}),u&&t.jsx("p",{className:"text-red-500 text-xs mt-1",children:u})]})}));h.displayName="PhoneInput";export{h as P,l as a,i as b,g as c,u as d,c as e,n as i,a as v};
