import{j as e}from"./ui-B9MhWaVJ.js";import{r as s}from"./router-D7BdrHDj.js";import{Y as i,$ as a,o as t,p as n,K as r,q as c,r as o,s as l,a0 as d,B as m,t as u}from"./index-BMLMJrKU.js";import{S as j,a as p}from"./switch-B9-AHqaP.js";import{L as x}from"./label-hQz2gHLy.js";import{A as h,a as f,b as g}from"./alert-DoOHGkak.js";import{P as v}from"./ProfileSettingsSkeleton-CgH1urxR.js";import"./react-0RZ2pslC.js";import"./query-DKQ6_O-p.js";import"./charts-DkICKEBk.js";
/**
 * @license lucide-react v0.476.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=i("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]),N=()=>{const[i,N]=s.useState(!0),[b,z]=s.useState(null),[R,w]=s.useState(!1);s.useEffect((()=>{(async()=>{N(!0);try{z({email:{newDocuments:!0,loginAlerts:!0,announcements:!1,courseUpdates:!0},app:{newMessages:!0,eventReminders:!0,systemUpdates:!1},schedule:{daily:!1,weekly:!0,immediate:!0}})}catch(e){u.error("Erreur lors du chargement des paramètres")}finally{N(!1)}})()}),[]);const k=({category:s,setting:i,label:a,description:t})=>e.jsxs("div",{className:"flex items-center justify-between space-y-2",children:[e.jsxs("div",{className:"space-y-0.5",children:[e.jsx(x,{htmlFor:`${s}-${i}`,children:a}),e.jsx("p",{className:"text-sm text-muted-foreground",children:t})]}),e.jsx(p,{id:`${s}-${i}`,checked:b[s][i],onCheckedChange:()=>((e,s)=>{z((i=>({...i,[e]:{...i[e],[s]:!i[e][s]}})))})(s,i)})]});return i?e.jsx("div",{className:"space-y-6 bg-white p-6 rounded-lg shadow",children:e.jsx(v,{type:"notifications"})}):e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(a,{className:"h-6 w-6"}),e.jsx("h1",{className:"text-2xl font-bold",children:"Notifications"})]}),e.jsxs(h,{children:[e.jsx(a,{className:"h-4 w-4"}),e.jsx(f,{children:"Gérez vos notifications"}),e.jsx(g,{children:"Personnalisez la façon dont vous souhaitez être informé des activités importantes."})]}),e.jsxs("div",{className:"grid gap-6",children:[e.jsxs(t,{children:[e.jsxs(n,{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(r,{className:"h-5 w-5"}),e.jsx(c,{children:"Notifications par email"})]}),e.jsx(o,{children:"Gérez les emails que vous recevez de notre part."})]}),e.jsxs(l,{className:"space-y-4",children:[e.jsx(k,{category:"email",setting:"newDocuments",label:"Nouveaux documents",description:"Recevez des notifications pour les nouveaux documents."}),e.jsx(j,{}),e.jsx(k,{category:"email",setting:"loginAlerts",label:"Alertes de connexion",description:"Recevez des notifications pour les alertes de connexion."}),e.jsx(j,{}),e.jsx(k,{category:"email",setting:"announcements",label:"Annonces",description:"Recevez des notifications pour les annonces importantes."}),e.jsx(j,{}),e.jsx(k,{category:"email",setting:"courseUpdates",label:"Mises à jour de cours",description:"Recevez des notifications pour les mises à jour de cours."})]})]}),e.jsxs(t,{children:[e.jsxs(n,{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(y,{className:"h-5 w-5"}),e.jsx(c,{children:"Notifications push"})]}),e.jsx(o,{children:"Configurez les notifications instantanées sur votre appareil."})]}),e.jsxs(l,{className:"space-y-4",children:[e.jsx(k,{category:"app",setting:"newMessages",label:"Nouveaux messages",description:"Recevez des notifications pour les nouveaux messages."}),e.jsx(j,{}),e.jsx(k,{category:"app",setting:"eventReminders",label:"Rappels d'événement",description:"Recevez des notifications pour les rappels d'événement."}),e.jsx(j,{}),e.jsx(k,{category:"app",setting:"systemUpdates",label:"Mises à jour du système",description:"Recevez des notifications pour les mises à jour du système."})]})]}),e.jsxs(t,{children:[e.jsxs(n,{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{className:"h-5 w-5"}),e.jsx(c,{children:"Préférences de planning"})]}),e.jsx(o,{children:"Définissez quand vous souhaitez recevoir les notifications."})]}),e.jsxs(l,{className:"space-y-4",children:[e.jsx(k,{category:"schedule",setting:"daily",label:"Résumé quotidien",description:"Recevez un résumé quotidien de vos notifications."}),e.jsx(j,{}),e.jsx(k,{category:"schedule",setting:"weekly",label:"Résumé hebdomadaire",description:"Recevez un résumé hebdomadaire de vos activités."}),e.jsx(j,{}),e.jsx(k,{category:"schedule",setting:"immediate",label:"Notifications immédiates",description:"Recevez les notifications en temps réel."})]})]})]}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(m,{variant:"outline",onClick:()=>u.success("Paramètres réinitialisés aux valeurs par défaut"),disabled:R,children:"Réinitialiser les paramètres"}),e.jsx(m,{onClick:async()=>{w(!0);try{u.success("Paramètres de notification mis à jour")}catch(e){u.error("Erreur lors de la mise à jour des paramètres")}finally{w(!1)}},disabled:R,children:R?"Enregistrement...":"Enregistrer les modifications"})]})]})};export{N as default};
