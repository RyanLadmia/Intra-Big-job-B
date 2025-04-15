import{j as e}from"./ui-B9MhWaVJ.js";import{r as s}from"./router-D7BdrHDj.js";import{t as r,ab as n,n as a,o as t,p as i,q as o,r as l,ay as c,B as d,a as m,D as u,i as h,E as x,j,k as p,F as g}from"./index-Dh3VsLo2.js";import{u as v,b as f,a as E}from"./query-DKQ6_O-p.js";import{T as N,a as C,b as S,c as T,d as L,e as U}from"./table-n3dh8fC-.js";import{C as b}from"./checkbox-DjmMJkPs.js";import{D as y}from"./DashboardLayout-KgKZtk43.js";import"./label-CKTbyxqy.js";import{L as G}from"./loader-circle-MNtbErZU.js";import"./react-0RZ2pslC.js";import"./charts-DkICKEBk.js";import"./circle-alert-CDKGMAAk.js";const k=n.create({baseURL:"http://localhost:5173/api"});k.interceptors.request.use((e=>{const s=localStorage.getItem("token");return s&&(e.headers.Authorization=`Bearer ${s}`),e}));const w="/users",R="/user-roles/change-role",$=({open:s,onOpenChange:r,user:n,onConfirm:a,isProcessing:t})=>{const i=n?.roles?.some((e=>"GUEST"===e.name||"ROLE_GUEST"===e.name));return e.jsx(u,{open:s,onOpenChange:r,children:e.jsxs(h,{children:[e.jsxs(x,{children:[e.jsx(j,{children:"Confirmation du changement de rôle"}),e.jsx(p,{children:i?`Êtes-vous sûr de vouloir promouvoir ${n?.firstName} ${n?.lastName} en tant qu'élève ?`:`Êtes-vous sûr de vouloir rétrograder ${n?.firstName} ${n?.lastName} en tant qu'invité ?`})]}),e.jsxs(g,{children:[e.jsx(d,{variant:"outline",onClick:()=>r(!1),children:"Annuler"}),e.jsxs(d,{onClick:a,disabled:t,children:[t?e.jsx(G,{className:"w-4 h-4 mr-2 animate-spin"}):null,"Confirmer"]})]})]})})};function O(){const n=v(),[u,h]=s.useState(null),[x,j]=s.useState(!1),[p,g]=s.useState({guest:!0,student:!1}),[O,q]=s.useState(1),[_,D]=s.useState([]),{data:F=[],isLoading:P}=f({queryKey:["guest-student-users",p],queryFn:async()=>{try{const e=await k.get(w);if(e.data.success){return(e.data.data||[]).filter((e=>{const s=e.roles.map((e=>e.name));return!(!p.guest||!s.includes("GUEST"))||!(!p.student||!s.includes("STUDENT"))}))}return[]}catch(e){return console.error("Error fetching users:",e),r.error("Erreur lors de la récupération des utilisateurs"),[]}}}),A=E({mutationFn:async e=>{const s=e.roles.some((e=>"GUEST"===e.name||"ROLE_GUEST"===e.name))?"ROLE_STUDENT":"ROLE_GUEST";return k.post(R,{userId:e.id,newRole:s})},onSuccess:(e,s)=>{const a=s.roles.some((e=>"GUEST"===e.name||"ROLE_GUEST"===e.name));r.success(a?`${s.firstName} ${s.lastName} a été promu en élève`:`${s.firstName} ${s.lastName} a été rétrogradé en invité`),n.invalidateQueries(["guest-student-users"]),j(!1)},onError:e=>{console.error("Error changing role:",e),r.error("Une erreur est survenue lors du changement de rôle")}}),I=s.useMemo((()=>{const e=10*(O-1),s=e+10;return F.slice(e,s)}),[F,O]);return s.useEffect((()=>{(()=>{const e=m.getUser(),s=e?.roles?.some((e=>"string"==typeof e?e.toLowerCase().includes("recruiter"):(e.name||e.role||"").toLowerCase().includes("recruiter"))),n=e?.roles?.some((e=>"string"==typeof e?e.toLowerCase().includes("admin")||e.toLowerCase().includes("superadmin"):(e.name||e.role||"").toLowerCase().includes("admin")));s||n||r.error("Vous n'avez pas les droits pour accéder à cette page")})()}),[]),s.useEffect((()=>{F&&D(F)}),[F]),e.jsxs(y,{children:[e.jsx("div",{className:"container mx-auto py-6",children:e.jsxs(a,{children:[e.jsxs(t,{children:[e.jsx(i,{children:"Gestion des rôles Invité/Élève"}),e.jsx(o,{children:"Gérez la promotion des invités en élèves et la rétrogradation des élèves en invités"})]}),e.jsxs(l,{children:[e.jsxs("div",{className:"flex items-center space-x-4 mb-6",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(b,{id:"invites",checked:p.guest,onCheckedChange:e=>g((s=>({...s,guest:e})))}),e.jsx("label",{htmlFor:"invites",children:"Invités"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(b,{id:"eleves",checked:p.student,onCheckedChange:e=>g((s=>({...s,student:e})))}),e.jsx("label",{htmlFor:"eleves",children:"Élèves"})]}),e.jsxs("div",{className:"ml-auto flex items-center space-x-2",children:[e.jsx("span",{children:"Éléments par page:"}),e.jsx("select",{className:"border rounded p-1",value:10,disabled:!0,children:e.jsx("option",{value:10,children:"10"})}),e.jsxs("span",{children:["Affichage de ",I.length," sur ",_.length," utilisateurs"]})]})]}),e.jsxs(N,{children:[e.jsx(C,{children:e.jsxs(S,{children:[e.jsx(T,{className:"w-[200px]",children:"Nom ↑"}),e.jsx(T,{children:"Prénom"}),e.jsx(T,{children:"Email"}),e.jsx(T,{children:"Rôles actuels"}),e.jsx(T,{className:"text-right",children:"Actions"})]})}),e.jsx(L,{children:P?e.jsx(S,{children:e.jsx(U,{colSpan:5,className:"text-center py-4",children:e.jsx(G,{className:"w-6 h-6 animate-spin mx-auto"})})}):I.map((s=>e.jsxs(S,{children:[e.jsx(U,{children:s.lastName}),e.jsx(U,{children:s.firstName}),e.jsx(U,{children:s.email}),e.jsx(U,{children:s.roles.map((s=>e.jsx(c,{role:s.name,className:"mr-1"},s.id||s.name)))}),e.jsx(U,{className:"text-right",children:e.jsx(d,{variant:"outline",onClick:()=>{h(s),j(!0)},children:s.roles.some((e=>"GUEST"===e.name||"ROLE_GUEST"===e.name))?"Promouvoir en élève":"Rétrograder en invité"})})]},s.id)))})]})]})]})}),e.jsx($,{open:x,onOpenChange:j,user:u,onConfirm:()=>A.mutate(u),isProcessing:A.isPending})]})}export{O as default};
