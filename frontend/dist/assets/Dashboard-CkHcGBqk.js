import{j as e}from"./ui-B9MhWaVJ.js";import{r as s,L as a}from"./router-D7BdrHDj.js";import{a as r}from"./useDashboardQueries-CIXQ-9_k.js";import{D as t}from"./DashboardLayout-BvekbIMj.js";import{s as l,I as i,m as d,f as o,ad as n,B as c,W as m,a2 as x,ae as h,a1 as p,S as g}from"./index-Bd05LC-l.js";import{U as u}from"./user-check-BZENl44L.js";import{C as b}from"./chart-column-CaCu1q7Q.js";import{A as v,Z as j}from"./zap-Be-cIZLz.js";import{R as y,a as f,P as N,b as w,d as k,e as C,T as z}from"./charts-DkICKEBk.js";import"./react-0RZ2pslC.js";import"./query-DKQ6_O-p.js";import"./circle-alert-DkC07JJn.js";
/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=l("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]),V=l("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),D=l("FolderCheck",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"m9 13 2 2 4-4",key:"6343dt"}]]),S=l("FolderGit2",[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",key:"1w6njk"}],["circle",{cx:"13",cy:"12",r:"2",key:"1j92g6"}],["path",{d:"M18 19c-2.8 0-5-2.2-5-5v8",key:"pkpw2h"}],["circle",{cx:"20",cy:"19",r:"2",key:"1obnsp"}]]),H=l("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]),L={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.08,delayChildren:.1}}},$={hidden:{y:15,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:400,damping:25}}},A={hidden:{opacity:0},visible:{opacity:1,transition:{duration:.4}}},T=()=>{const{user:l,isLoading:T,isError:E,error:O}=r(),[R,q]=s.useState(!1),B=s.useRef(null),P=s.useRef(!1);s.useEffect((()=>(!T||B.current||P.current||(B.current=setTimeout((()=>{T&&q(!0)}),300)),!T&&l&&(P.current=!0,q(!1),B.current&&(clearTimeout(B.current),B.current=null)),()=>{B.current&&(clearTimeout(B.current),B.current=null)})),[T,l]),s.useMemo((()=>(new Date).toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})),[]),s.useMemo((()=>l?.firstName&&l?.lastName?`${l.firstName[0]}${l.lastName[0]}`:"ET"),[l]);s.useMemo((()=>({system:{label:"Système",color:"hsl(var(--primary))"},devops:{label:"DevOps",color:"hsl(var(--primary))"},database:{label:"Base de données",color:"hsl(var(--primary))"},security:{label:"Cyber Sécurité",color:"hsl(var(--primary))"},development:{label:"Développement",color:"hsl(var(--primary))"},tools:{label:"Outils",color:"hsl(var(--primary))"}})),[]);const W=[{title:"Emploi du temps",description:"Consultez votre planning de cours",icon:o,color:"from-blue-500 to-blue-600",textColor:"text-blue-50",link:"/student/schedule",stats:"3 cours aujourd'hui",progress:75},{title:"Notes et résultats",description:"Suivez vos performances académiques",icon:i,color:"from-emerald-500 to-emerald-600",textColor:"text-emerald-50",link:"/student/grades",stats:"Moyenne: 16.5/20",progress:82},{title:"Suivi des absences",description:"Gérez vos absences et justificatifs",icon:u,color:"from-amber-500 to-amber-600",textColor:"text-amber-50",link:"/student/absences",stats:"98% de présence",progress:98},{title:"Projets",description:"Vos projets en cours et à venir",icon:S,color:"from-purple-500 to-purple-600",textColor:"text-purple-50",link:"/student/projects",stats:"2 projets en cours",progress:65}],F=[{title:"Développement Web Avancé",type:"Cours",time:"Aujourd'hui, 14:00 - 17:00",location:"Salle B204",icon:x,color:"text-blue-500",bgColor:"bg-blue-100 dark:bg-blue-900/20"},{title:"Projet DevOps",type:"Rendu",time:"Demain, 23:59",location:"En ligne",icon:S,color:"text-purple-500",bgColor:"bg-purple-100 dark:bg-purple-900/20"},{title:"Examen Machine Learning",type:"Évaluation",time:"Vendredi, 09:00 - 11:00",location:"Amphithéâtre A",icon:H,color:"text-red-500",bgColor:"bg-red-100 dark:bg-red-900/20"}],Z=()=>e.jsx("div",{className:"h-full overflow-hidden rounded-xl shadow-sm bg-white dark:bg-gray-800",children:e.jsxs("div",{className:"p-5 h-full flex flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx(g,{className:"h-10 w-10 rounded-lg"}),e.jsx(g,{className:"h-7 w-7 rounded-full"})]}),e.jsx(g,{className:"h-6 w-2/3 mb-1"}),e.jsx(g,{className:"h-4 w-1/2 mb-4"}),e.jsxs("div",{className:"mt-auto",children:[e.jsx(g,{className:"h-4 w-1/3 mb-2"}),e.jsx(g,{className:"h-2 w-full rounded-full"})]})]})});return e.jsx(t,{loading:T,error:E?O?.message||"Une erreur est survenue lors du chargement des données":null,className:"p-0",user:l,headerIcon:i,headerTitle:"Tableau de bord étudiant",children:e.jsxs("div",{className:"container mx-auto px-4 py-6 space-y-8",children:[e.jsx(d.div,{variants:L,initial:"hidden",animate:"visible",className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8",children:R?Array(4).fill(0).map(((s,a)=>e.jsx(d.div,{variants:$,className:"h-full",children:e.jsx(Z,{})},`skeleton-card-${a}`))):W.map(((s,r)=>e.jsx(d.div,{variants:$,className:"h-full",children:e.jsx(a,{to:s.link,className:"block h-full",children:e.jsxs("div",{className:"relative h-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group",children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${s.color} opacity-90 group-hover:opacity-100 transition-opacity`}),e.jsxs("div",{className:"relative p-5 h-full flex flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:"p-2.5 rounded-lg bg-white/20 backdrop-blur-sm",children:e.jsx(s.icon,{className:"w-5 h-5 text-white"})}),e.jsx("div",{className:"p-1.5 rounded-full bg-white/20 backdrop-blur-sm",children:e.jsx(n,{className:"w-4 h-4 text-white"})})]}),e.jsx("h2",{className:"text-xl font-semibold text-white mb-1",children:s.title}),e.jsx("p",{className:"text-white/80 text-sm mb-4",children:s.description}),e.jsxs("div",{className:"mt-auto",children:[e.jsx("p",{className:`${s.textColor} text-sm font-medium mb-1`,children:s.stats}),e.jsx("div",{className:"w-full bg-white/20 rounded-full h-1.5",children:e.jsx("div",{className:"bg-white h-1.5 rounded-full",style:{width:`${s.progress}%`}})})]})]})]})})},r)))}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8",children:[e.jsx(d.div,{variants:A,initial:"hidden",animate:"visible",className:"lg:col-span-1",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-full",children:[e.jsx("div",{className:"p-5 border-b border-gray-100 dark:border-gray-700",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30",children:e.jsx(b,{className:"h-4 w-4 text-indigo-600 dark:text-indigo-400"})}),e.jsx("h3",{className:"text-lg font-semibold text-gray-800 dark:text-gray-200",children:"Compétences"})]}),e.jsxs(c,{variant:"ghost",size:"sm",className:"gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-0 h-auto hover:bg-transparent",children:["Détails",e.jsx(n,{className:"h-3.5 w-3.5"})]})]})}),e.jsx("div",{className:"aspect-square w-full p-4",children:!R&&e.jsx(y,{width:"100%",height:"100%",children:e.jsxs(f,{data:[{name:"Système",value:90},{name:"DevOps",value:60},{name:"Base de données",value:85},{name:"Cyber Sécurité",value:70},{name:"Développement",value:95},{name:"Outils",value:75}],margin:{top:20,right:30,bottom:20,left:30},children:[e.jsx(N,{gridType:"circle",stroke:"rgba(148, 163, 184, 0.2)",strokeWidth:1}),e.jsx(w,{dataKey:"name",tick:{fill:"#64748b",fontSize:11,fontWeight:500}}),e.jsx(k,{angle:30,domain:[0,100],axisLine:!1,tick:{fill:"#94a3b8",fontSize:10},tickCount:5}),e.jsx(C,{name:"Compétences",dataKey:"value",stroke:"rgba(99, 102, 241, 0.8)",fill:"rgba(99, 102, 241, 0.4)",fillOpacity:.6,dot:!0,activeDot:{r:4}}),e.jsx(z,{formatter:e=>[`${e}%`,"Niveau"],contentStyle:{backgroundColor:"rgba(255, 255, 255, 0.9)",borderRadius:"6px",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",border:"none",padding:"8px 12px"}})]})})}),e.jsx("div",{className:"px-5 py-3 border-t border-gray-100 dark:border-gray-700",children:e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400 font-medium",children:"QCP 37873 Bloc 3 - Préparer le déploiement d'une application sécurisée"})})]})}),e.jsx(d.div,{variants:A,initial:"hidden",animate:"visible",className:"lg:col-span-2",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-full",children:[e.jsx("div",{className:"p-5 border-b border-gray-100 dark:border-gray-700",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30",children:e.jsx(m,{className:"h-4 w-4 text-blue-600 dark:text-blue-400"})}),e.jsx("h3",{className:"text-lg font-semibold text-gray-800 dark:text-gray-200",children:"Événements à venir"})]}),e.jsxs(c,{variant:"outline",size:"sm",className:"gap-1 text-xs",children:[e.jsx(o,{className:"h-3.5 w-3.5"}),e.jsx("span",{children:"Planning complet"})]})]})}),e.jsx("div",{className:"p-5",children:e.jsx("div",{className:"space-y-4",children:F.map(((s,a)=>e.jsxs(d.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.2+.1*a},className:"flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors",children:[e.jsx("div",{className:`rounded-full p-3 self-start ${s.bgColor}`,children:e.jsx(s.icon,{className:`h-5 w-5 ${s.color}`})}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"font-medium text-gray-900 dark:text-gray-100",children:s.title}),e.jsx(h,{variant:"outline",className:`${s.color} border-current/30`,children:s.type})]}),e.jsxs("div",{className:"mt-2 space-y-1",children:[e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5",children:[e.jsx(m,{className:"h-3.5 w-3.5 text-gray-400"}),s.time]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"text-gray-400",children:[e.jsx("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}),e.jsx("circle",{cx:"12",cy:"10",r:"3"})]}),s.location]})]})]})]},a)))})}),e.jsx("div",{className:"px-5 py-4 border-t border-gray-100 dark:border-gray-700",children:e.jsxs(c,{variant:"ghost",size:"sm",className:"w-full justify-center gap-1 text-primary",children:[e.jsx("span",{children:"Voir tous les événements"}),e.jsx(V,{className:"h-3.5 w-3.5"})]})})]})})]}),e.jsx(d.div,{variants:A,initial:"hidden",animate:"visible",className:"mb-8",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden",children:[e.jsx("div",{className:"p-5 border-b border-gray-100 dark:border-gray-700",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"p-2 rounded-lg bg-green-100 dark:bg-green-900/30",children:e.jsx(M,{className:"h-4 w-4 text-green-600 dark:text-green-400"})}),e.jsx("h3",{className:"text-lg font-semibold text-gray-800 dark:text-gray-200",children:"Objectifs du semestre"})]}),e.jsx(h,{variant:"outline",className:"text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",children:"En cours"})]})}),e.jsx("div",{className:"p-5",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsxs(d.div,{className:"bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow",whileHover:{scale:1.03},children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"p-2 bg-green-50 dark:bg-green-900/20 rounded-lg",children:e.jsx(p,{className:"h-6 w-6 text-green-500"})}),e.jsx("h4",{className:"font-semibold text-lg text-gray-900 dark:text-gray-100",children:"Votre progression"})]}),e.jsxs("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:["Vous avez déjà validé ",e.jsx("span",{className:"font-bold text-green-500",children:"30 ECTS"})," ! Continuez comme ça, vous êtes sur la bonne voie."]}),e.jsx(c,{variant:"outline",className:"w-full",children:"Voir les prochaines étapes"})]}),e.jsxs(d.div,{className:"bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow",whileHover:{scale:1.03},children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg",children:e.jsx(D,{className:"h-6 w-6 text-blue-500"})}),e.jsx("h4",{className:"font-semibold text-lg text-gray-900 dark:text-gray-100",children:"Vos projets"})]}),e.jsxs("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:["Félicitations ! Vous avez terminé ",e.jsx("span",{className:"font-bold text-blue-500",children:"8 projets"}),". Le prochain est à portée de main."]}),e.jsx(c,{variant:"outline",className:"w-full",children:"Découvrir le prochain projet"})]}),e.jsxs(d.div,{className:"bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow",whileHover:{scale:1.03},children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg",children:e.jsx(v,{className:"h-6 w-6 text-purple-500"})}),e.jsx("h4",{className:"font-semibold text-lg text-gray-900 dark:text-gray-100",children:"Vos compétences"})]}),e.jsxs("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:["Vous avez développé ",e.jsx("span",{className:"font-bold text-purple-500",children:"75% des compétences"})," visées. Un excellent travail !"]}),e.jsx(c,{variant:"outline",className:"w-full",children:"Explorer vos compétences"})]})]})})]})}),e.jsx(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6,duration:.5},children:e.jsxs("div",{className:"relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/90 to-primary p-6 shadow-lg",children:[e.jsx("div",{className:"absolute top-0 right-0 -mt-4 -mr-16 h-40 w-40 rounded-full bg-white/10 blur-2xl"}),e.jsx("div",{className:"absolute bottom-0 left-0 -mb-16 -ml-10 h-40 w-40 rounded-full bg-white/10 blur-xl"}),e.jsxs("div",{className:"relative flex flex-col md:flex-row items-center justify-between gap-6",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("h3",{className:"text-xl font-bold text-white mb-2 flex items-center gap-2",children:[e.jsx(j,{className:"h-5 w-5"}),"Continuez sur votre lancée !"]}),e.jsx("p",{className:"text-white/90 max-w-lg",children:"Vous avez accompli 75% de vos objectifs ce semestre. Maintenez vos efforts pour terminer en beauté !"})]}),e.jsx(c,{className:"bg-white text-primary hover:bg-white/90 shadow-sm",children:"Voir mes objectifs"})]})]})})]})})};export{T as default};
