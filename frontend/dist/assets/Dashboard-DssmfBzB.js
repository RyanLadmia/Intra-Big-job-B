import{j as e}from"./ui-B9MhWaVJ.js";import{r,L as s}from"./router-D7BdrHDj.js";import{D as t}from"./DashboardLayout-yJw6cGbE.js";import{d as a}from"./useDashboardQueries-BxrNwsvJ.js";import{Y as i,o,s as l,m as n,af as d,C as c}from"./index-BMLMJrKU.js";import{S as m}from"./shield-alert-Dy1gkWU6.js";import"./react-0RZ2pslC.js";import"./charts-DkICKEBk.js";import"./circle-alert-BcgKqbFs.js";import"./query-DKQ6_O-p.js";
/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=i("Book",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]]),h={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.08,delayChildren:.1}}},p={hidden:{y:15,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:400,damping:25}}},f=()=>{const{data:i,isLoading:f,error:b,refetch:g}=a(),x=r.useRef(!1);r.useEffect((()=>{console.log("SuperAdminDashboard - User data from useUserData:",i),console.log("SuperAdminDashboard - Loading state:",f),console.log("SuperAdminDashboard - Error state:",b),console.log("SuperAdminDashboard - Refresh attempted:",x.current)}),[i,f,b]),r.useMemo((()=>{if(!i?.roles?.length)return"";const e=i.roles[0].replace("ROLE_","");return{SUPERADMIN:"Super Administrateur",ADMIN:"Administrateur",TEACHER:"Formateur",STUDENT:"Étudiant",HR:"Ressources Humaines",RECRUITER:"Recruteur"}[e]||e}),[i]),r.useEffect((()=>{if(i?.firstName&&i?.lastName)return console.log("SuperAdminDashboard - User data is already complete, skipping refresh"),void(x.current=!0);if(x.current||f)return void console.log("SuperAdminDashboard - Refresh already attempted or loading, skipping");const e=setTimeout((()=>{i?.firstName||x.current?console.log("SuperAdminDashboard - firstName is available, no need to refresh"):(console.log("SuperAdminDashboard - No firstName available, triggering refresh"),(async()=>{try{console.log("SuperAdminDashboard - Attempting to refresh user data"),x.current=!0,await g(),console.log("SuperAdminDashboard - User data refreshed successfully")}catch(e){console.error("SuperAdminDashboard - Error refreshing user data:",e)}})())}),500);return()=>clearTimeout(e)}),[i,g,f]);const j=[{title:"Gestion des utilisateurs",description:"Gérer les utilisateurs",icon:d,color:"from-blue-500 to-blue-600",textColor:"text-blue-50",link:"/admin/users"},{title:"Gestion des rôles",description:"Gérer les rôles des étudiants invités",icon:d,color:"from-blue-500 to-blue-600",textColor:"text-blue-50",link:"/recruiter/guest-student-roles"},{title:"Formations",description:"Gérer et consulter les formations",icon:u,color:"from-purple-500 to-purple-600",textColor:"text-purple-50",link:"/formations"}];return e.jsx(t,{loading:f,error:b?.message||null,user:i,headerIcon:m,headerTitle:"Tableau de bord super administrateur",children:e.jsx(o,{className:"border-0 shadow-md mb-6",children:e.jsxs(l,{className:"p-6",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-800 mb-6",children:"Accès rapide"}),e.jsx(n.div,{variants:h,initial:"hidden",animate:"visible",className:"grid grid-cols-1 md:grid-cols-2 gap-5",children:j.map(((r,t)=>e.jsx(n.div,{variants:p,className:"h-full",children:e.jsx(s,{to:r.link,className:"block h-full",children:e.jsxs("div",{className:"relative h-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group",children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${r.color} opacity-90 group-hover:opacity-100 transition-opacity`}),e.jsxs("div",{className:"relative p-5 h-full flex flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:"p-2.5 rounded-lg bg-white/20 backdrop-blur-sm",children:e.jsx(r.icon,{className:"w-5 h-5 text-white"})}),e.jsx("div",{className:"p-1.5 rounded-full bg-white/20 backdrop-blur-sm",children:e.jsx(c,{className:"w-4 h-4 text-white"})})]}),e.jsx("h2",{className:"text-xl font-semibold text-white mb-1",children:r.title}),e.jsx("p",{className:"text-white/80 text-sm mb-4",children:r.description})]})]})})},t)))})]})})})};export{f as default};
