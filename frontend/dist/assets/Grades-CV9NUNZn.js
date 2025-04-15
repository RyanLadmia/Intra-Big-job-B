import{j as e}from"./ui-B9MhWaVJ.js";import{r as s,u as a}from"./router-D7BdrHDj.js";import{Y as r,m as l,B as t,c as i,o as n,p as d,q as c,r as o,s as m,i as x,ak as u,ao as h,ap as j,aq as g,A as b,v as p,a6 as v,a7 as N}from"./index-BMLMJrKU.js";import{T as f,a as y,b as w,c as k,d as q,e as V}from"./table-guYHF0BW.js";import{S as D}from"./scroll-area-DjWZrVRJ.js";import"./progress-CFMoxU24.js";import{T as M}from"./trending-up-D88hp5Vw.js";import{A as T,Z as C}from"./zap-C3Nyi4MW.js";import{D as E}from"./download-D_lm4U0X.js";import"./react-0RZ2pslC.js";import"./query-DKQ6_O-p.js";import"./charts-DkICKEBk.js";import"./index-jVOyRz7F.js";
/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=r("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]),B=r("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),O=[{id:1,courseName:"Développement Web Avancé",subject:"Informatique",type:"Examen",date:"2025-02-15",value:17.5,maxValue:20,comment:"Excellent travail sur le projet React"},{id:2,courseName:"Développement Web Avancé",subject:"Informatique",type:"TP",date:"2025-01-20",value:16,maxValue:20,comment:"Bonne maîtrise des concepts"},{id:3,courseName:"Bases de données",subject:"Informatique",type:"Examen",date:"2025-02-10",value:15,maxValue:20,comment:"Bonnes connaissances en SQL"},{id:4,courseName:"Bases de données",subject:"Informatique",type:"TP",date:"2025-01-25",value:18,maxValue:20,comment:"Excellent modèle de données"},{id:5,courseName:"Mathématiques pour l'informatique",subject:"Mathématiques",type:"Examen",date:"2025-02-05",value:14,maxValue:20,comment:"Bonne compréhension des concepts"},{id:6,courseName:"Anglais technique",subject:"Langues",type:"Oral",date:"2025-02-20",value:16,maxValue:20,comment:"Bonne présentation et vocabulaire technique"}],P=[{id:1,projectName:"Projet Intranet",courseName:"Développement Web Avancé",type:"Projet de groupe",date:"2025-03-01",value:18,maxValue:20,comment:"Excellent travail d'équipe et fonctionnalités complètes"},{id:2,projectName:"Système de gestion de base de données",courseName:"Bases de données",type:"Projet individuel",date:"2025-02-25",value:17,maxValue:20,comment:"Très bonne conception et implémentation"},{id:3,projectName:"Application mobile",courseName:"Développement mobile",type:"Projet de groupe",date:"2025-03-10",value:16.5,maxValue:20,comment:"Interface utilisateur intuitive et bonnes fonctionnalités"}],z=[{name:"Développement Web",progress:85,icon:e.jsx(C,{className:"w-5 h-5 text-purple-500"}),color:"from-purple-500 to-purple-400"},{name:"Bases de données",progress:78,icon:e.jsx(B,{className:"w-5 h-5 text-blue-500"}),color:"from-blue-500 to-blue-400"},{name:"Mathématiques",progress:70,icon:e.jsx(v,{className:"w-5 h-5 text-green-500"}),color:"from-green-500 to-green-400"},{name:"Langues",progress:80,icon:e.jsx(N,{className:"w-5 h-5 text-amber-500"}),color:"from-amber-500 to-amber-400"}],I=[{name:"Améliorer les compétences en mathématiques",progress:70,deadline:"Juin 2025",color:"from-green-500 to-green-400"},{name:"Maîtriser React et Next.js",progress:85,deadline:"Mai 2025",color:"from-blue-500 to-blue-400"},{name:"Obtenir la certification en bases de données",progress:60,deadline:"Juillet 2025",color:"from-amber-500 to-amber-400"}],L=()=>{const[r,v]=s.useState("courses");(()=>{const e={};O.forEach((s=>{e[s.subject]||(e[s.subject]={total:0,count:0,average:0}),e[s.subject].total+=s.value/s.maxValue*20,e[s.subject].count+=1})),Object.keys(e).forEach((s=>{e[s].average=e[s].total/e[s].count}))})();const N=a(),C={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{type:"spring",stiffness:100,damping:15}}},B=(()=>{let e=0,s=0;return O.forEach((a=>{e+=a.value/a.maxValue*20,s+=1})),(e/s).toFixed(2)})(),L=Math.max(...O.map((e=>e.value)));return e.jsx(l.div,{initial:"hidden",animate:"visible",variants:{hidden:{opacity:0},visible:{opacity:1,transition:{duration:.3,staggerChildren:.1}}},className:"min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",children:e.jsxs("div",{className:"container p-4 mx-auto max-w-7xl",children:[e.jsxs(l.div,{variants:C,className:"flex items-center gap-4 mb-8",children:[e.jsx(t,{variant:"ghost",size:"icon",onClick:()=>N("/student/dashboard"),className:"hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",children:e.jsx(i,{className:"w-5 h-5"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent",children:"Notes et résultats"}),e.jsx("p",{className:"text-muted-foreground",children:"Consultez et analysez vos performances académiques"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-6 mb-8 md:grid-cols-3",children:[e.jsx(l.div,{variants:C,whileHover:{scale:1.02},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:10},children:e.jsxs(n,{className:"relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-900/20 dark:to-blue-800/10 backdrop-blur-sm h-full",children:[e.jsx("div",{className:"absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-blue-500/10 dark:bg-blue-400/10"}),e.jsxs(d,{className:"space-y-1 border-b border-gray-100/20 dark:border-gray-700/20",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"p-2 rounded-full bg-blue-100 dark:bg-blue-900/30",children:e.jsx(M,{className:"w-5 h-5 text-blue-500 dark:text-blue-400"})}),e.jsx(c,{className:"text-xl",children:"Moyenne générale"})]}),e.jsx(o,{children:"Performance globale"})]}),e.jsxs(m,{className:"pt-6",children:[e.jsx("div",{className:"flex items-center justify-center",children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"text-6xl font-bold text-blue-600 dark:text-blue-400",children:B}),e.jsx("div",{className:"absolute -top-2 -right-6 text-lg text-gray-400",children:"/20"})]})}),e.jsx("div",{className:"mt-4",children:e.jsx("div",{className:"h-2.5 w-full rounded-full bg-blue-100/50 dark:bg-blue-900/20 overflow-hidden",children:e.jsx(l.div,{initial:{width:0},animate:{width:5*parseFloat(B)+"%"},transition:{duration:1,ease:"easeOut",delay:.3},className:"h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"})})})]})]})}),e.jsx(l.div,{variants:C,whileHover:{scale:1.02},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:10},children:e.jsxs(n,{className:"relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/5 dark:from-green-900/20 dark:to-green-800/10 backdrop-blur-sm h-full",children:[e.jsx("div",{className:"absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-green-500/10 dark:bg-green-400/10"}),e.jsxs(d,{className:"space-y-1 border-b border-gray-100/20 dark:border-gray-700/20",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"p-2 rounded-full bg-green-100 dark:bg-green-900/30",children:e.jsx(T,{className:"w-5 h-5 text-green-500 dark:text-green-400"})}),e.jsx(c,{className:"text-xl",children:"Meilleure note"})]}),e.jsx(o,{children:"Note la plus élevée"})]}),e.jsxs(m,{className:"pt-6",children:[e.jsx("div",{className:"flex items-center justify-center",children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"text-6xl font-bold text-green-600 dark:text-green-400",children:L}),e.jsx("div",{className:"absolute -top-2 -right-6 text-lg text-gray-400",children:"/20"})]})}),e.jsx("div",{className:"mt-4",children:e.jsx("div",{className:"h-2.5 w-full rounded-full bg-green-100/50 dark:bg-green-900/20 overflow-hidden",children:e.jsx(l.div,{initial:{width:0},animate:{width:5*L+"%"},transition:{duration:1,ease:"easeOut",delay:.4},className:"h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"})})})]})]})}),e.jsx(l.div,{variants:C,whileHover:{scale:1.02},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:10},children:e.jsxs(n,{className:"relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-amber-500/10 to-amber-600/5 dark:from-amber-900/20 dark:to-amber-800/10 backdrop-blur-sm h-full",children:[e.jsx("div",{className:"absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-amber-500/10 dark:bg-amber-400/10"}),e.jsxs(d,{className:"space-y-1 border-b border-gray-100/20 dark:border-gray-700/20",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"p-2 rounded-full bg-amber-100 dark:bg-amber-900/30",children:e.jsx(x,{className:"w-5 h-5 text-amber-500 dark:text-amber-400"})}),e.jsx(c,{className:"text-xl",children:"Notes à venir"})]}),e.jsx(o,{children:"Examens prévus"})]}),e.jsxs(m,{className:"pt-6",children:[e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{className:"text-6xl font-bold text-amber-600 dark:text-amber-400",children:3})}),e.jsxs("div",{className:"mt-6 space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsx("span",{children:"Mathématiques"}),e.jsx("span",{className:"text-muted-foreground",children:"28 Mai"})]}),e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsx("span",{children:"Développement Web"}),e.jsx("span",{className:"text-muted-foreground",children:"2 Juin"})]}),e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsx("span",{children:"Anglais"}),e.jsx("span",{className:"text-muted-foreground",children:"10 Juin"})]})]})]})]})})]}),e.jsx(l.div,{variants:C,className:"mb-8",children:e.jsxs(n,{className:"overflow-hidden border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm",children:[e.jsxs(d,{className:"border-b border-gray-100 dark:border-gray-700",children:[e.jsxs(c,{className:"flex items-center gap-2",children:[e.jsx(A,{className:"w-5 h-5 text-blue-500"}),"Progression et compétences"]}),e.jsx(o,{children:"Visualisez votre progression et vos compétences acquises"})]}),e.jsx(m,{className:"p-6",children:e.jsxs("div",{className:"grid grid-cols-1 gap-8 md:grid-cols-2",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Compétences acquises"}),e.jsx("div",{className:"space-y-4",children:z.map(((s,a)=>e.jsxs(l.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.1*a},className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[s.icon,e.jsx("span",{children:s.name})]}),e.jsxs("span",{className:"font-medium",children:[s.progress,"%"]})]}),e.jsx("div",{className:"h-2.5 w-full rounded-full bg-gray-200/50 dark:bg-gray-700/40 overflow-hidden",children:e.jsx(l.div,{initial:{width:0},animate:{width:`${s.progress}%`},transition:{duration:1,ease:"easeOut",delay:.1*a+.2},className:`h-full rounded-full bg-gradient-to-r ${s.color}`})})]},a)))})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-lg font-medium",children:"Objectifs académiques"}),e.jsx("div",{className:"space-y-6",children:I.map(((s,a)=>e.jsxs(l.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:.1*a},className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{children:s.name}),e.jsx(u,{variant:"outline",children:s.deadline})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"h-2.5 flex-1 rounded-full bg-gray-200/50 dark:bg-gray-700/40 overflow-hidden",children:e.jsx(l.div,{initial:{width:0},animate:{width:`${s.progress}%`},transition:{duration:1,ease:"easeOut",delay:.1*a+.2},className:`h-full rounded-full bg-gradient-to-r ${s.color} relative`,children:e.jsx("span",{className:"absolute -right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-white dark:bg-gray-800 border-2 border-current"})})}),e.jsxs("span",{className:"text-sm font-medium w-10 text-right",children:[s.progress,"%"]})]})]},a)))})]})]})})]})}),e.jsx(l.div,{variants:C,children:e.jsxs(h,{defaultValue:"courses",onValueChange:v,className:"space-y-4",children:[e.jsxs(j,{className:"grid w-full grid-cols-2 h-12",children:[e.jsx(g,{value:"courses",className:"text-sm",children:"Notes des cours"}),e.jsx(g,{value:"projects",className:"text-sm",children:"Notes des projets"})]}),e.jsxs("div",{className:"relative",children:[e.jsx(b,{mode:"wait",initial:!1,children:e.jsxs(l.div,{variants:{hidden:{opacity:0,y:10},visible:{opacity:1,y:0,transition:{duration:.2,ease:"easeOut"}},exit:{opacity:0,y:-10,transition:{duration:.15,ease:"easeIn"}}},initial:"hidden",animate:"visible",exit:"exit",className:"absolute w-full",children:["courses"===r&&e.jsxs(n,{className:"border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm",children:[e.jsxs(d,{className:"border-b border-gray-100 dark:border-gray-700",children:[e.jsx(c,{children:"Notes des cours"}),e.jsx(o,{children:"Consultez vos notes pour chaque cours et examen"})]}),e.jsx(m,{className:"p-0",children:e.jsx(D,{className:"h-[500px] w-full",children:e.jsxs(f,{children:[e.jsx(y,{children:e.jsxs(w,{children:[e.jsx(k,{children:"Cours"}),e.jsx(k,{children:"Matière"}),e.jsx(k,{children:"Type"}),e.jsx(k,{children:"Date"}),e.jsx(k,{className:"text-right",children:"Note"}),e.jsx(k,{children:"Commentaire"})]})}),e.jsx(q,{children:O.map((s=>e.jsxs(w,{className:"transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50",children:[e.jsx(V,{className:"font-medium",children:s.courseName}),e.jsx(V,{children:e.jsx(u,{variant:"outline",className:"font-normal",children:s.subject})}),e.jsx(V,{children:s.type}),e.jsx(V,{children:new Date(s.date).toLocaleDateString("fr-FR")}),e.jsx(V,{className:"text-right",children:e.jsxs(u,{variant:s.value>=16?"success":s.value>=12?"default":s.value>=10?"warning":"destructive",children:[s.value,"/",s.maxValue]})}),e.jsx(V,{className:"max-w-xs truncate",children:s.comment})]},s.id)))})]})})})]}),"projects"===r&&e.jsxs(n,{className:"border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm",children:[e.jsxs(d,{className:"border-b border-gray-100 dark:border-gray-700",children:[e.jsx(c,{children:"Notes des projets"}),e.jsx(o,{children:"Consultez vos notes pour chaque projet"})]}),e.jsx(m,{className:"p-0",children:e.jsx(D,{className:"h-[500px] w-full",children:e.jsxs(f,{children:[e.jsx(y,{children:e.jsxs(w,{children:[e.jsx(k,{children:"Projet"}),e.jsx(k,{children:"Cours associé"}),e.jsx(k,{children:"Type"}),e.jsx(k,{children:"Date"}),e.jsx(k,{className:"text-right",children:"Note"}),e.jsx(k,{children:"Commentaire"})]})}),e.jsx(q,{children:P.map((s=>e.jsxs(w,{className:"transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50",children:[e.jsx(V,{className:"font-medium",children:s.projectName}),e.jsx(V,{children:e.jsx(u,{variant:"outline",className:"font-normal",children:s.courseName})}),e.jsx(V,{children:s.type}),e.jsx(V,{children:new Date(s.date).toLocaleDateString("fr-FR")}),e.jsx(V,{className:"text-right",children:e.jsxs(u,{variant:s.value>=16?"success":s.value>=12?"default":s.value>=10?"warning":"destructive",children:[s.value,"/",s.maxValue]})}),e.jsx(V,{className:"max-w-xs truncate",children:s.comment})]},s.id)))})]})})}),e.jsx(p,{className:"border-t border-gray-100 dark:border-gray-700",children:e.jsxs(t,{variant:"outline",className:"ml-auto gap-2",children:[e.jsx(E,{className:"w-4 h-4"}),"Télécharger le relevé"]})})]})]},r)}),e.jsx("div",{className:("courses"===r?"h-[590px]":"h-[630px]")+" invisible"})]})]})})]})})};export{L as default};
