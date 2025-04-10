import{j as e}from"./ui-B9MhWaVJ.js";import{r as s,u as t}from"./router-D7BdrHDj.js";import{T as a,a as r,b as i,c as n,d as l,e as c}from"./table-CPW8ECtE.js";import{s as o,c as d,f as m,W as u,m as h,B as x,ai as f,k as j,l as g,S as p,p as b,a0 as v,n as N,o as y,ae as w,q as k,D as C,g as T,y as _,h as E,i as $,z as J,E as S}from"./index-Bd05LC-l.js";import{T as z,R as D,f as M,g as A,C as q,L as K}from"./charts-DkICKEBk.js";import{S as L,a as P,b as R,c as I,d as F}from"./select-gSRVLbKq.js";import{U as H}from"./user-check-BZENl44L.js";import{f as O}from"./index-DV0JwV4u.js";import"./react-0RZ2pslC.js";import"./query-DKQ6_O-p.js";import"./index-jVOyRz7F.js";import"./chevron-up-Db7ZLIiO.js";
/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=o("Clock3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]),V={light:"",dark:".dark"},W=s.createContext(null);function G(){const e=s.useContext(W);if(!e)throw new Error("useChart must be used within a <ChartContainer />");return e}const U=s.forwardRef((({id:t,className:a,children:r,config:i,...n},l)=>{const c=s.useId(),o=`chart-${t||c.replace(/:/g,"")}`;return e.jsx(W.Provider,{value:{config:i},children:e.jsxs("div",{"data-chart":o,ref:l,className:d("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",a),...n,children:[e.jsx(Q,{id:o,config:i}),e.jsx(D,{children:r})]})})}));U.displayName="Chart";const Q=({id:s,config:t})=>{const a=Object.entries(t).filter((([,e])=>e.theme||e.color));return a.length?e.jsx("style",{dangerouslySetInnerHTML:{__html:Object.entries(V).map((([e,t])=>`\n${t} [data-chart=${s}] {\n${a.map((([s,t])=>{const a=t.theme?.[e]||t.color;return a?`  --color-${s}: ${a};`:null})).join("\n")}\n}\n`)).join("\n")}}):null},X=z;s.forwardRef((({active:t,payload:a,className:r,indicator:i="dot",hideLabel:n=!1,hideIndicator:l=!1,label:c,labelFormatter:o,labelClassName:m,formatter:u,color:h,nameKey:x,labelKey:f},j)=>{const{config:g}=G(),p=s.useMemo((()=>{if(n||!a?.length)return null;const[s]=a,t=`${f||s.dataKey||s.name||"value"}`,r=Y(g,s,t),i=f||"string"!=typeof c?r?.label:g[c]?.label||c;return o?e.jsx("div",{className:d("font-medium",m),children:o(i,a)}):i?e.jsx("div",{className:d("font-medium",m),children:i}):null}),[c,o,a,n,m,g,f]);if(!t||!a?.length)return null;const b=1===a.length&&"dot"!==i;return e.jsxs("div",{ref:j,className:d("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",r),children:[b?null:p,e.jsx("div",{className:"grid gap-1.5",children:a.map(((s,t)=>{const a=`${x||s.name||s.dataKey||"value"}`,r=Y(g,s,a),n=h||s.payload.fill||s.color;return e.jsx("div",{className:d("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground","dot"===i&&"items-center"),children:u&&void 0!==s?.value&&s.name?u(s.value,s.name,s,t,s.payload):e.jsxs(e.Fragment,{children:[r?.icon?e.jsx(r.icon,{}):!l&&e.jsx("div",{className:d("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",{"h-2.5 w-2.5":"dot"===i,"w-1":"line"===i,"w-0 border-[1.5px] border-dashed bg-transparent":"dashed"===i,"my-0.5":b&&"dashed"===i}),style:{"--color-bg":n,"--color-border":n}}),e.jsxs("div",{className:d("flex flex-1 justify-between leading-none",b?"items-end":"items-center"),children:[e.jsxs("div",{className:"grid gap-1.5",children:[b?p:null,e.jsx("span",{className:"text-muted-foreground",children:r?.label||s.name})]}),s.value&&e.jsx("span",{className:"font-mono font-medium tabular-nums text-foreground",children:s.value.toLocaleString()})]})]})},s.dataKey)}))})]})})).displayName="ChartTooltip";function Y(e,s,t){if("object"!=typeof s||null===s)return;const a="payload"in s&&"object"==typeof s.payload&&null!==s.payload?s.payload:void 0;let r=t;return t in s&&"string"==typeof s[t]?r=s[t]:a&&t in a&&"string"==typeof a[t]&&(r=a[t]),r in e?e[r]:e[t]}s.forwardRef((({className:s,hideIcon:t=!1,payload:a,verticalAlign:r="bottom",nameKey:i},n)=>{const{config:l}=G();return a?.length?e.jsx("div",{ref:n,className:d("flex items-center justify-center gap-4","top"===r?"pb-3":"pt-3",s),children:a.map((s=>{const a=`${i||s.dataKey||"value"}`,r=Y(l,s,a);return e.jsxs("div",{className:d("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"),children:[r?.icon&&!t?e.jsx(r.icon,{}):e.jsx("div",{className:"h-2 w-2 shrink-0 rounded-[2px]",style:{backgroundColor:s.color}}),r?.label]},s.value)}))}):null})).displayName="ChartLegend";const Z=[{id:1,courseName:"Développement Web Avancé",date:"2025-02-15",startTime:"08:30",endTime:"12:30",status:"Non justifiée",justification:null,documentPath:null},{id:2,courseName:"Bases de données",date:"2025-01-20",startTime:"14:00",endTime:"18:00",status:"Justifiée",justification:"Certificat médical",documentPath:"/documents/certificat_medical_20250120.pdf"},{id:3,courseName:"Mathématiques pour l'informatique",date:"2025-02-05",startTime:"08:30",endTime:"12:30",status:"En attente",justification:"Rendez-vous administratif",documentPath:"/documents/convocation_20250205.pdf"},{id:4,courseName:"Anglais technique",date:"2025-02-20",startTime:"14:00",endTime:"16:00",status:"Justifiée",justification:"Participation à un événement universitaire",documentPath:"/documents/attestation_evenement_20250220.pdf"},{id:5,courseName:"Développement mobile",date:"2025-03-01",startTime:"08:30",endTime:"12:30",status:"Non justifiée",justification:null,documentPath:null}],ee={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.08,delayChildren:.1}},exit:{opacity:0,transition:{duration:.3}}},se={hidden:{y:15,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:400,damping:25}}},te={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{type:"spring",stiffness:100,damping:15}}},ae=e=>{const s=new Date(e);return O(s,"EEEE d MMMM yyyy",{locale:S})},re=e=>{const s=new Date(e);return O(s,"dd/MM/yyyy",{locale:S})},ie=()=>{const e={"Justifiée":0,"Non justifiée":0,"En attente":0};return Z.forEach((s=>{e[s.status]++})),[{name:"Justifiée",value:e["Justifiée"],color:"#10b981"},{name:"Non justifiée",value:e["Non justifiée"],color:"#ef4444"},{name:"En attente",value:e["En attente"],color:"#f59e0b"}]},ne=()=>{const[o,d]=s.useState(null),[S,z]=s.useState(!1),[O,V]=s.useState(!0),[W,G]=s.useState("all"),Q=t();ie();const Y=[{title:"Total des absences",value:Z.length,description:"Nombre d'absences enregistrées",color:"text-blue-600 dark:text-blue-400",bgColor:"bg-blue-50 dark:bg-blue-900/20",icon:m},{title:"Heures manquées",value:"10h",description:"Total des heures d'absence",color:"text-amber-600 dark:text-amber-400",bgColor:"bg-amber-50 dark:bg-amber-900/20",icon:u},{title:"Absences justifiées",value:`${Z.filter((e=>"Justifiée"===e.status)).length}`,description:"Nombre d'absences justifiées",color:"text-green-600 dark:text-green-400",bgColor:"bg-green-50 dark:bg-green-900/20",icon:H},{title:"En attente",value:`${Z.filter((e=>"En attente"===e.status)).length}`,description:"Absences en attente de justification",color:"text-amber-600 dark:text-amber-400",bgColor:"bg-amber-50 dark:bg-amber-900/20",icon:B}];s.useEffect((()=>{const e=setTimeout((()=>{V(!1)}),1e3);return()=>clearTimeout(e)}),[]);const ne=Z.filter((e=>"all"===W||e.status===W));return e.jsx(h.div,{initial:"hidden",animate:"visible",exit:"exit",variants:ee,className:"min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",children:e.jsxs("div",{className:"container p-4 mx-auto max-w-7xl",children:[e.jsxs(h.div,{variants:se,className:"flex items-center gap-4 mb-8",children:[e.jsx(x,{variant:"ghost",size:"icon",onClick:()=>Q("/student/dashboard"),className:"hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",children:e.jsx(f,{className:"w-5 h-5"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent",children:"Suivi des absences"}),e.jsx("p",{className:"text-muted-foreground",children:"Gérez vos absences et justificatifs"})]})]}),e.jsx(h.div,{variants:ee,className:"grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",children:Y.map(((s,t)=>e.jsx(h.div,{variants:se,children:e.jsxs(j,{className:"relative overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 group",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-black/40 dark:to-black/0 z-10"}),e.jsx("div",{className:"absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/0 dark:from-white/5 dark:to-white/0"}),e.jsx(g,{className:"relative z-20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:`p-3 rounded-xl ${s.bgColor} transform group-hover:scale-110 transition-transform duration-300`,children:e.jsx(s.icon,{className:`h-6 w-6 ${s.color}`})}),O?e.jsx(p,{className:"h-8 w-16"}):e.jsx("span",{className:`text-3xl font-bold ${s.color}`,children:s.value})]})}),e.jsxs(b,{className:"relative z-20 pt-0",children:[e.jsx("h3",{className:"font-semibold text-lg mb-1",children:s.title}),e.jsx("p",{className:"text-sm text-muted-foreground",children:s.description})]})]})},s.title)))}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8",children:[e.jsx(h.div,{variants:te,className:"lg:col-span-4",children:e.jsxs(j,{className:"overflow-hidden border-none shadow-md h-full",children:[e.jsx(g,{className:"border-b border-gray-100 dark:border-gray-800",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20",children:e.jsx(v,{className:"h-5 w-5 text-indigo-600 dark:text-indigo-400"})}),e.jsxs("div",{children:[e.jsx(N,{children:"Répartition des absences"}),e.jsx(y,{children:"Vue d'ensemble des absences par statut"})]})]})}),e.jsx(b,{className:"flex justify-center items-center h-[400px]",children:O?e.jsx(p,{className:"h-[250px] w-[250px] rounded-full"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center",children:e.jsx(U,{config:{"Justifiée":{theme:{light:"#10b981",dark:"#10b981"}},"Non justifiée":{theme:{light:"#ef4444",dark:"#ef4444"}},"En attente":{theme:{light:"#f59e0b",dark:"#f59e0b"}}},className:"w-full h-full",children:e.jsx(D,{width:"100%",height:"100%",children:e.jsxs(M,{margin:{top:0,right:0,bottom:0,left:0},children:[e.jsx(A,{data:ie(),cx:"50%",cy:"50%",innerRadius:60,outerRadius:80,paddingAngle:5,dataKey:"value",label:({name:e,value:s})=>`${s}`,labelLine:!1,children:ie().map(((s,t)=>e.jsx(q,{fill:s.color,className:"stroke-background hover:opacity-80 transition-opacity duration-200"},`cell-${t}`)))}),e.jsx(K,{layout:"vertical",verticalAlign:"middle",align:"right",iconType:"circle",wrapperStyle:{paddingLeft:0},payload:ie().map((e=>({value:e.name,type:"circle",color:e.color,id:e.name}))),formatter:s=>e.jsx("span",{className:"text-sm font-medium",children:s})}),e.jsx(X,{content:({active:s,payload:t})=>{if(!s||!t?.length)return null;const a=t[0].payload;return e.jsx("div",{className:"rounded-lg border bg-background p-2 shadow-sm",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-2 w-2 rounded-full",style:{backgroundColor:a.color}}),e.jsx("span",{className:"font-medium",children:a.name}),e.jsxs("span",{children:[": ",a.value]})]})})}})]})})})})})]})}),e.jsx(h.div,{variants:te,className:"lg:col-span-8",children:e.jsxs(j,{className:"h-full",children:[e.jsx(g,{children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx(N,{children:"Liste des absences"}),e.jsx(y,{children:"Toutes vos absences pour l'année académique 2024-2025"})]}),e.jsxs(L,{value:W,onValueChange:G,children:[e.jsx(P,{className:"w-[180px]",children:e.jsx(R,{placeholder:"Filtrer par statut"})}),e.jsxs(I,{children:[e.jsx(F,{value:"all",children:"Tous les statuts"}),e.jsx(F,{value:"Justifiée",children:"Justifiées"}),e.jsx(F,{value:"Non justifiée",children:"Non justifiées"}),e.jsx(F,{value:"En attente",children:"En attente"})]})]})]})}),e.jsx(b,{className:"p-0",children:e.jsx("div",{className:"overflow-auto max-h-[350px] scrollbar-hide",children:e.jsxs(a,{children:[e.jsx(r,{className:"sticky top-0 bg-background z-10",children:e.jsxs(i,{children:[e.jsx(n,{className:"w-[30%]",children:"Cours"}),e.jsx(n,{className:"w-[15%]",children:"Date"}),e.jsx(n,{className:"w-[15%]",children:"Horaire"}),e.jsx(n,{className:"w-[12%]",children:"Statut"}),e.jsx(n,{className:"w-[20%] text-right",children:"Actions"})]})}),e.jsx(l,{children:ne.length>0?ne.map((s=>e.jsxs(i,{children:[e.jsx(c,{className:"font-medium truncate max-w-[200px]",children:s.courseName}),e.jsx(c,{className:"whitespace-nowrap",children:re(s.date)}),e.jsxs(c,{className:"whitespace-nowrap",children:[s.startTime," - ",s.endTime]}),e.jsx(c,{children:e.jsx(w,{variant:"Justifiée"===s.status?"success":"Non justifiée"===s.status?"destructive":"warning",children:"Non justifiée"===s.status?"Non just.":s.status})}),e.jsx(c,{className:"text-right",children:e.jsxs("div",{className:"flex flex-wrap gap-2 justify-end",children:[e.jsx(x,{variant:"outline",size:"sm",onClick:()=>(e=>{d(e),z(!0)})(s),children:"Détails"}),"Non justifiée"===s.status&&e.jsx(x,{variant:"outline",size:"sm",className:"text-green-600 border-green-600 hover:bg-green-50",children:"Justifier"})]})})]},s.id))):e.jsx(i,{children:e.jsx(c,{colSpan:6,className:"text-center py-4",children:"Aucune absence trouvée."})})})]})})}),e.jsxs(k,{className:"flex justify-between border-t",children:[e.jsxs("div",{className:"text-sm text-gray-500",children:["Total: ",ne.length," absence(s)"]}),e.jsx(x,{variant:"outline",children:"Télécharger le récapitulatif"})]})]})})]}),e.jsx(C,{open:S,onOpenChange:z,children:e.jsxs(T,{className:"sm:max-w-md",children:[e.jsxs(_,{children:[e.jsx(E,{children:"Détails de l'absence"}),e.jsx($,{children:"Informations détaillées sur l'absence sélectionnée"})]}),o&&e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:"Cours"}),e.jsx("p",{className:"mt-1 text-sm",children:o.courseName})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:"Date"}),e.jsx("p",{className:"mt-1 text-sm",children:ae(o.date)})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:"Horaire"}),e.jsxs("p",{className:"mt-1 text-sm",children:[o.startTime," - ",o.endTime]})]}),e.jsx("div",{}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:"Statut"}),e.jsx("p",{className:"mt-1 text-sm",children:e.jsx("span",{className:"px-2 py-1 text-xs font-semibold rounded-full "+("Justifiée"===o.status?"bg-green-100 text-green-800":"Non justifiée"===o.status?"bg-red-100 text-red-800":"bg-amber-100 text-amber-800"),children:o.status})})]})]}),o.justification&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:"Justification"}),e.jsx("p",{className:"mt-1 text-sm",children:o.justification})]}),o.documentPath&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-500",children:"Document justificatif"}),e.jsx("div",{className:"mt-1",children:e.jsx(x,{variant:"outline",size:"sm",className:"text-blue-600",children:"Télécharger le document"})})]})]}),e.jsxs(J,{children:[e.jsx(x,{variant:"outline",onClick:()=>z(!1),children:"Fermer"}),o&&"Non justifiée"===o.status&&e.jsx(x,{className:"bg-green-600 hover:bg-green-700",children:"Justifier cette absence"})]})]})})]})})};export{ne as default};
