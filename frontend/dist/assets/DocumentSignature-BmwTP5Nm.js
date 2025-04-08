import{j as e}from"./ui-B9MhWaVJ.js";import{u as t,r}from"./router-D7BdrHDj.js";import{a as o,u as s,t as n,B as i,M as a,b as c}from"./index-Bd05LC-l.js";import{A as l,a as u,b as d}from"./alert-BOCndHDX.js";import{C as g}from"./circle-check-big-vnIXhqc7.js";const h=r.forwardRef(((t,o)=>{const s=r.useRef(null),[n,i]=r.useState(!1),[a,c]=r.useState(!0);r.useEffect((()=>{const e=s.current,t=e.getContext("2d");t.lineWidth=2,t.lineCap="round",t.strokeStyle="#000000",t.fillStyle="#ffffff",t.fillRect(0,0,e.width,e.height);const r=()=>{const r=e.parentElement;e.width=r.clientWidth,e.height=200,t.lineWidth=2,t.lineCap="round",t.strokeStyle="#000000",t.fillStyle="#ffffff",t.fillRect(0,0,e.width,e.height)};return r(),window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}}),[]);const l=e=>{const t=s.current,r=t.getContext("2d"),o=t.getBoundingClientRect();let n,a;"mousedown"===e.type?(n=e.clientX-o.left,a=e.clientY-o.top):"touchstart"===e.type&&(n=e.touches[0].clientX-o.left,a=e.touches[0].clientY-o.top),r.beginPath(),r.moveTo(n,a),i(!0),c(!1)},u=e=>{if(!n)return;const t=s.current,r=t.getContext("2d"),o=t.getBoundingClientRect();let i,a;"mousemove"===e.type?(i=e.clientX-o.left,a=e.clientY-o.top):"touchmove"===e.type&&(i=e.touches[0].clientX-o.left,a=e.touches[0].clientY-o.top),r.lineTo(i,a),r.stroke()},d=()=>{n&&(i(!1),t.onEnd&&t.onEnd())},g=()=>{const e=s.current,t=e.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,e.width,e.height),c(!0)},h=()=>s.current.toDataURL();return r.useEffect((()=>{o&&(o.current={clear:g,isEmpty:()=>a,toDataURL:h})}),[a,o]),e.jsx("canvas",{ref:s,className:"border border-gray-300 rounded-md w-full",onMouseDown:l,onMouseMove:u,onMouseUp:d,onMouseLeave:d,onTouchStart:l,onTouchMove:u,onTouchEnd:d,style:{touchAction:"none"}})})),p=()=>{const p=t(),[f,m]=r.useState(null),[E,y]=r.useState(!1),[S,v]=r.useState(!1),[w,x]=r.useState(!1),[j,b]=r.useState(null),[P,A]=r.useState([]),[L,k]=r.useState({}),I=r.useRef(null),[R,N]=r.useState(!1),{hasRole:T}=o();s(),r.useEffect((()=>{if(!(T("ROLE_TEACHER")||T("ROLE_STUDENT")))return n.error("Accès non autorisé",{description:"Seuls les étudiants et les enseignants peuvent accéder à cette page."}),void p("/dashboard")}),[T,p]);const C=async(e,t,r=3)=>{for(let s=0;s<r;s++)try{const o=await fetch(e,t);if(!o.ok){const e=await o.json().catch((()=>({})));if(console.warn(`API call failed (attempt ${s+1}/${r}):`,e),s===r-1)throw new Error(e.message||`Request failed with status ${o.status}`);await new Promise((e=>setTimeout(e,1e3*Math.pow(2,s))));continue}return await o.json()}catch(o){if(console.error(`API call error (attempt ${s+1}/${r}):`,o),s===r-1)throw o;await new Promise((e=>setTimeout(e,1e3*Math.pow(2,s))))}};r.useEffect((()=>{(()=>{try{const e=Object.keys(localStorage).filter((e=>e.includes("signature")||e.includes("signed")||e.includes("period")));e.length>0&&(console.log("Found potential signature-related localStorage keys:",e),e.forEach((e=>{localStorage.removeItem(e),console.log(`Removed localStorage key: ${e}`)})))}catch(e){console.error("Error clearing cached signature state:",e)}})()}),[]),r.useEffect((()=>{(async()=>{try{await c.ensureUserDataInLocalStorage()}catch(e){console.error("Failed to ensure user data in localStorage:",e)}})();(async()=>{try{N(!0),console.log("Checking today signatures - starting API request");const t=new Promise(((e,t)=>setTimeout((()=>t(new Error("API request timeout"))),1e4))),r=localStorage.getItem("token");if(!r)throw new Error("Authentication token not found");try{console.log("Fetching signature data from API...");const e=await Promise.race([C("http://localhost:8000/api/signatures/today",{method:"GET",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}}),t]);console.log("Signature data returned from API:",e),console.log("Current period from API:",e?.currentPeriod),console.log("Signed periods from API:",e?.signedPeriods),e?(e.currentPeriod&&(console.log("Setting current period to:",e.currentPeriod),b(e.currentPeriod)),e.signedPeriods&&(console.log("Setting signed periods to:",e.signedPeriods),A(e.signedPeriods||[])),e.availablePeriods&&(console.log("Setting available periods to:",e.availablePeriods),k(e.availablePeriods))):(b("afternoon"),A([]),k({morning:"Matin (9h-12h)",afternoon:"Après-midi (13h-17h)"}))}catch(e){console.error("Error checking today's signatures:",e),b("afternoon"),A([]),k({morning:"Matin (9h-12h)",afternoon:"Après-midi (13h-17h)"}),n.error("Erreur",{description:"Impossible de vérifier les signatures. Utilisation de valeurs par défaut."})}finally{N(!1)}}catch(e){console.error("Error in signature setup:",e),N(!1),b("afternoon"),A([]),k({morning:"Matin (9h-12h)",afternoon:"Après-midi (13h-17h)"})}})(),M()}),[]);const M=()=>{y(!0),navigator.geolocation?navigator.geolocation.getCurrentPosition((e=>{const t=`${e.coords.latitude},${e.coords.longitude}`;console.log("Location detected:",t),m(t),y(!1),n.success("Localisation détectée",{description:"Votre position a été détectée avec succès."})}),(e=>{console.error("Error getting location:",e),y(!1);let t="Impossible d'obtenir votre position.";switch(e.code){case e.PERMISSION_DENIED:t="L'accès à la géolocalisation a été refusé. Veuillez autoriser l'accès dans les paramètres de votre navigateur.";break;case e.POSITION_UNAVAILABLE:t="Les informations de localisation ne sont pas disponibles.";break;case e.TIMEOUT:t="La requête de localisation a expiré. Veuillez réessayer.";break;default:t=`Une erreur est survenue: ${e.message}`}n.error("Erreur de localisation",{description:t})}),{enableHighAccuracy:!1,timeout:3e4,maximumAge:3e5}):(y(!1),n.error("Localisation non supportée",{description:"Votre navigateur ne supporte pas la géolocalisation."}))},$=()=>{I.current&&I.current.clear()};return j&&P.includes(j)?e.jsxs("div",{className:"space-y-4",children:[e.jsxs(l,{className:"bg-green-50 border-green-200",children:[e.jsx(g,{className:"h-4 w-4 text-green-600"}),e.jsx(u,{className:"text-green-800",children:"Présence déjà enregistrée"}),e.jsxs(d,{className:"text-green-700",children:["Vous avez déjà signé pour la période ",L[j]," aujourd'hui."]})]}),e.jsxs("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:[e.jsx("p",{children:"Les signatures sont autorisées aux périodes suivantes :"}),e.jsxs("ul",{className:"list-disc list-inside mt-2",children:[e.jsx("li",{children:"Matin : 9h - 12h"}),e.jsx("li",{children:"Après-midi : 13h - 17h"})]})]})]}):e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"border rounded-md p-4 bg-gray-50 dark:bg-gray-900",children:[e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400 mb-2",children:j?`Signez ci-dessous pour confirmer votre présence pour la période ${L[j]}`:"Les signatures ne sont autorisées qu'entre 9h-12h (matin) et 13h-17h (après-midi)."}),e.jsx(h,{ref:I,onEnd:()=>console.log("Signature completed")}),e.jsxs("div",{className:"flex justify-between mt-4",children:[e.jsx(i,{variant:"outline",onClick:$,disabled:S,children:"Effacer"}),e.jsx(i,{onClick:async()=>{if(f)if(I.current&&!I.current.isEmpty())if(j)if(P.includes(j))n.error("Erreur",{description:`Vous avez déjà signé pour la période ${L[j]} aujourd'hui.`});else try{v(!0);const t=I.current.toDataURL();console.log(`Signature data size: ${t.length} characters`);const r={location:f,drawing:t};console.log("Sending signature request with data:",r);const o=localStorage.getItem("token");if(!o)throw new Error("Authentication token not found");console.log("Sending actual API request to backend");try{const e=await fetch("http://localhost:8000/api/signatures",{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(r)});if(console.log("API Response status:",e.status),!e.ok){const t=await e.json();throw new Error(t.message||"Failed to create signature")}const t=await e.json();console.log("Signature created successfully:",t),A([...P,j]),x(!0),$(),n.success("Succès",{description:`Signature enregistrée pour la période ${L[j]}.`});const s=JSON.parse(localStorage.getItem("userRoles")||"[]");s.includes("ROLE_TEACHER")?p("/teacher/dashboard"):s.includes("ROLE_STUDENT")?p("/student/dashboard"):p("/dashboard")}catch(e){console.error("API request failed:",e),n.error("Erreur",{description:e.message||"Une erreur est survenue lors de l'envoi de la signature."})}}catch(e){console.error("Error submitting signature:",e),n.error("Erreur",{description:"Une erreur est survenue lors de la soumission de la signature."})}finally{v(!1)}else n.error("Erreur",{description:"Les signatures ne sont autorisées qu'entre 9h-12h (matin) et 13h-17h (après-midi)."});else n.error("Erreur",{description:"Veuillez signer avant de soumettre."});else n.error("Erreur",{description:"La localisation est requise. Veuillez autoriser l'accès à votre position."})},disabled:!!S||!!P.includes(j),children:S?"Envoi en cours...":f?!I.current||I.current.isEmpty()?"Signature requise":P.includes(j)?"Déjà signé pour cette période":j?"Signer":"Hors période":"Localisation requise"})]})]}),e.jsxs("div",{className:"flex items-center text-sm text-gray-500 dark:text-gray-400",children:[e.jsx(a,{className:"h-4 w-4 mr-2"}),E?"Détection de la localisation...":f?"Localisation détectée":"Localisation non disponible"]})]})};export{p as D};
