import{j as e}from"./ui-B9MhWaVJ.js";import{r as s,L as r}from"./router-D7BdrHDj.js";import{u as i}from"./useDashboardQueries-BwMMpzFh.js";import{aj as a,T as t,t as l,a as n,Y as o,n as c,r as d,m as u,af as m,C as h,D as p,i as x,E as j,j as f,k as g,F as b,B as N,v}from"./index-Dh3VsLo2.js";import{I as y}from"./input-D_0VsEmu.js";import{L as C}from"./label-CKTbyxqy.js";import{D as w}from"./DashboardLayout-KgKZtk43.js";import{C as E}from"./checkbox-DjmMJkPs.js";import"./react-0RZ2pslC.js";import"./query-DKQ6_O-p.js";import"./charts-DkICKEBk.js";import"./circle-alert-CDKGMAAk.js";const k=({text:e})=>{const{translate:r}=a(),[i,t]=s.useState(e);return s.useEffect((()=>{(async()=>{try{const s=await r(e);t(s)}catch(s){console.error("[AsyncTranslation] Error:",s),t(e)}})()}),[e,r]),i},S={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.08,delayChildren:.1}}},L={hidden:{y:15,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:400,damping:25}}},T=()=>{const{translate:T,currentLanguage:D}=a(),{user:A,users:G,isLoading:F,isError:$,error:I,refetch:U}=i(),[q,z]=s.useState(!1),[M,O]=s.useState(!1),[P,R]=s.useState(null),[V,B]=s.useState("ALL"),[Q,Y]=s.useState("calendar"),[H,J]=s.useState({firstName:"",lastName:"",email:"",phoneNumber:""}),K=s.useRef(!1),[W,X]=s.useState([]),[Z,_]=s.useState([]),[ee,se]=s.useState(!1),[re,ie]=s.useState({title:"",cards:[]}),ae=[{id:1,title:"Gestion des utilisateurs",description:"Gérer les utilisateurs, les rôles et les permissions",link:"/admin/users",color:"bg-blue-500"},{id:2,title:"Gestion des entreprises",description:"Gérer les entreprises partenaires",link:"/admin/companies",color:"bg-green-500"},{id:3,title:"Gestion des offres",description:"Gérer les offres d'emploi et de stage",link:"/admin/offers",color:"bg-purple-500"},{id:4,title:"Gestion des événements",description:"Gérer les événements et les actualités",link:"/admin/events",color:"bg-yellow-500"}],te=t((e=>e&&e.id?`/users/${e.id}`:"/users"),"put","admin-users",{onSuccess:()=>{z(!1),U(),l.success("Les informations de l'utilisateur ont été mises à jour.")},onError:e=>{console.error("Erreur lors de la modification de l'utilisateur:",e),l.error("Impossible de modifier l'utilisateur.")}});t((e=>e?`/users/${e}`:"/users"),"delete","admin-users",{onSuccess:()=>{O(!1),U(),l.success("L'utilisateur a été supprimé avec succès.")},onError:e=>{console.error("Erreur lors de la suppression de l'utilisateur:",e),l.error("Impossible de supprimer l'utilisateur.")}});s.useEffect((()=>{(async()=>{se(!0);try{const e=await v.get("/user-roles/roles");e.success&&e.data?X(e.data):l.error("Impossible de récupérer les rôles disponibles")}catch(e){console.error("Erreur lors de la récupération des rôles:",e),l.error("Échec de la récupération des rôles")}finally{se(!1)}})()}),[]);const le=e=>{const{name:s,value:r}=e.target;J((e=>({...e,[s]:r})))};G?.filter((e=>"ALL"===V||!V||e.roles&&e.roles.some((e=>e.name===V)))),s.useEffect((()=>{if(!A&&!K.current&&!F){K.current=!0;const e=setTimeout((()=>{n.getCurrentUser()}),300);return()=>clearTimeout(e)}}),[A,F]),s.useEffect((()=>{console.log("[AdminDashboard] Component mounted"),console.log("[AdminDashboard] Current language:",D)}),[]),s.useEffect((()=>{console.log("[Translation] Language changed to:",D)}),[D]);const ne=s.useCallback((async()=>{try{const[e,...s]=await Promise.all([T("Tableau de bord administrateur"),...ae.map((async e=>({...e,translatedTitle:await T(e.title),translatedDescription:await T(e.description)})))]);ie({title:e,cards:s})}catch(e){console.error("Translation error:",e)}}),[T]);return s.useEffect((()=>{ne()}),[D,ne]),e.jsx(w,{loading:F,error:$?I?.message||e.jsx(k,{text:"Une erreur est survenue lors du chargement des données"}):null,className:"p-0",user:A,headerIcon:o,headerTitle:e.jsx(k,{text:"Tableau de bord administrateur"}),children:e.jsxs("div",{className:"container p-4 mx-auto sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen",children:[e.jsx(c,{className:"border-0 shadow-md mb-6",children:e.jsxs(d,{className:"p-6",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-800 mb-6",children:e.jsx(k,{text:"Accès rapide"})}),e.jsx(u.div,{variants:S,initial:"hidden",animate:"visible",className:"grid grid-cols-1 md:grid-cols-2 gap-5",children:re.cards.map(((s,i)=>e.jsx(u.div,{variants:L,className:"h-full",children:e.jsx(r,{to:s.link,className:"block h-full",children:e.jsxs("div",{className:"relative h-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group",children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${s.color} opacity-90 group-hover:opacity-100 transition-opacity`}),e.jsxs("div",{className:"relative p-5 h-full flex flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:"p-2.5 rounded-lg bg-white/20 backdrop-blur-sm",children:e.jsx(m,{className:"w-5 h-5 text-white"})}),e.jsx("div",{className:"p-1.5 rounded-full bg-white/20 backdrop-blur-sm",children:e.jsx(h,{className:"w-4 h-4 text-white"})})]}),e.jsx("h2",{className:"text-xl font-semibold text-white mb-1",children:s.translatedTitle}),e.jsx("p",{className:"text-white/80 text-sm mb-4",children:s.translatedDescription})]})]})})},i)))})]})}),e.jsx(p,{open:q,onOpenChange:z,children:e.jsxs(x,{className:"no-focus-outline",children:[e.jsxs(j,{children:[e.jsx(f,{children:e.jsx(k,{text:"Modifier l'utilisateur"})}),e.jsx(g,{children:e.jsx(k,{text:"Modifier les informations de l'utilisateur"})})]}),e.jsxs("form",{onSubmit:async e=>{if(e.preventDefault(),!P||!P.id)return void l.error("Utilisateur invalide. Veuillez réessayer.");const s={...H,id:P.id,roles:Z};try{te.mutate(s)}catch(r){console.error("Error in handleEditUser:",r),l.error("Une erreur s'est produite. Veuillez réessayer.")}},className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(C,{htmlFor:"firstName",children:"Prénom"}),e.jsx(y,{id:"firstName",name:"firstName",value:H.firstName,onChange:le,required:!0,className:"no-focus-outline"})]}),e.jsxs("div",{children:[e.jsx(C,{htmlFor:"lastName",children:"Nom"}),e.jsx(y,{id:"lastName",name:"lastName",value:H.lastName,onChange:le,required:!0,className:"no-focus-outline"})]}),e.jsxs("div",{children:[e.jsx(C,{htmlFor:"email",children:"Email"}),e.jsx(y,{id:"email",name:"email",type:"email",value:H.email,onChange:le,required:!0,className:"no-focus-outline"})]}),e.jsxs("div",{children:[e.jsx(C,{htmlFor:"phoneNumber",children:"Numéro de téléphone"}),e.jsx(y,{id:"phoneNumber",name:"phoneNumber",value:H.phoneNumber,onChange:le,className:"no-focus-outline"})]}),e.jsxs("div",{children:[e.jsx(C,{className:"mb-2 block",children:"Rôles"}),ee?e.jsx("div",{className:"py-2 text-sm text-gray-500",children:"Chargement des rôles..."}):e.jsx("div",{className:"grid grid-cols-2 gap-2",children:W.map((s=>e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(E,{id:`role-${s.id}`,checked:Z.includes(s.id),onCheckedChange:()=>{return e=s.id,void _((s=>s.includes(e)?s.filter((s=>s!==e)):[...s,e]));var e},className:"no-focus-outline"}),e.jsx(C,{htmlFor:`role-${s.id}`,className:"text-sm font-normal",children:s.name})]},s.id)))})]}),e.jsxs(b,{children:[e.jsx(N,{type:"button",variant:"outline",onClick:()=>z(!1),className:"no-focus-outline",children:"Annuler"}),e.jsx(N,{type:"submit",disabled:te.isLoading,className:"no-focus-outline",children:te.isLoading?"Enregistrement...":"Enregistrer"})]})]})]})}),e.jsx(p,{open:M,onOpenChange:O,children:e.jsxs(x,{className:"no-focus-outline",children:[e.jsxs(j,{children:[e.jsx(f,{children:e.jsx(k,{text:"Supprimer l'utilisateur"})}),e.jsx(g,{children:e.jsx(k,{text:"Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."})})]}),e.jsx(b,{children:e.jsx(N,{variant:"outline",onClick:()=>O(!1),className:"no-focus-outline",children:"Annuler"})})]})})]})})};export{T as default};
