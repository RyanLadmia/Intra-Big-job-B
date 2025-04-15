import{j as e}from"./ui-B9MhWaVJ.js";import{r as t,L as i}from"./router-D7BdrHDj.js";import{d as s,m as a}from"./index-BMLMJrKU.js";import"./react-0RZ2pslC.js";import"./query-DKQ6_O-p.js";import"./charts-DkICKEBk.js";const o=()=>{const{colorMode:o,toggleColorMode:r,currentTheme:n}=s();t.useEffect((()=>(document.querySelectorAll(".star").forEach((e=>{e.style.animationDelay=5*Math.random()+"s"})),()=>{})),[]);return e.jsxs("div",{className:`min-h-screen ${n.bg} text-white relative overflow-hidden`,children:[e.jsx("div",{className:"star-container absolute inset-0 overflow-hidden",children:[...Array(50)].map(((t,i)=>e.jsx("div",{className:"star absolute rounded-full bg-white animate-twinkle",style:{top:100*Math.random()+"%",left:100*Math.random()+"%",width:3*Math.random()+1+"px",height:3*Math.random()+1+"px",opacity:.8*Math.random()+.2,animationDuration:3*Math.random()+2+"s"}},i)))}),e.jsxs("header",{className:"container mx-auto pt-8 pb-12 px-4 text-center relative z-10",children:[e.jsx(a.h1,{className:"text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.8},children:"Toutes Nos Formations"}),e.jsx(a.p,{className:"text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto",initial:{opacity:0},animate:{opacity:1},transition:{duration:.8,delay:.2},children:"Explorez notre catalogue complet de formations pour trouver celle qui correspond à vos aspirations professionnelles"})]}),e.jsx("section",{className:"container mx-auto px-4 py-12 relative z-10",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:[{id:"web",title:"Développement Web",description:"Maîtrisez HTML, CSS, JavaScript et les frameworks modernes pour créer des sites web et applications web interactifs et responsifs.",image:"/assets/images/course-web.jpg",color:"from-blue-500 to-cyan-400",modules:["HTML/CSS","JavaScript","React","Node.js","PHP/MySQL"],duration:"9 mois"},{id:"cybersecurity",title:"Cybersécurité",description:"Apprenez à protéger les systèmes informatiques contre les menaces et vulnérabilités avec des techniques avancées de sécurité.",image:"/assets/images/course-security.jpg",color:"from-green-500 to-emerald-400",modules:["Sécurité réseau","Cryptographie","Ethical Hacking","Forensics","Sécurité Cloud"],duration:"10 mois"},{id:"ai",title:"Intelligence Artificielle",description:"Découvrez le machine learning, le deep learning et leurs applications pratiques dans divers domaines industriels.",image:"/assets/images/course-ai.jpg",color:"from-purple-500 to-pink-500",modules:["Machine Learning","Deep Learning","NLP","Computer Vision","Éthique de l'IA"],duration:"12 mois"},{id:"data-science",title:"Science des Données",description:"Analysez et visualisez des données complexes pour en extraire des insights précieux et prendre des décisions basées sur les données.",image:"/assets/images/course-data.jpg",color:"from-indigo-500 to-blue-600",modules:["Python pour Data Science","Statistiques","Visualisation","Big Data","Business Intelligence"],duration:"10 mois"},{id:"mobile",title:"Développement Mobile",description:"Créez des applications mobiles pour iOS et Android avec des frameworks natifs et cross-platform comme React Native et Flutter.",image:"/assets/images/course-mobile.jpg",color:"from-pink-500 to-red-500",modules:["iOS (Swift)","Android (Kotlin)","React Native","Flutter","UX/UI Mobile"],duration:"8 mois"},{id:"game",title:"Développement de Jeux",description:"Concevez et créez des jeux vidéo captivants en utilisant des moteurs de jeu professionnels comme Unity et Unreal Engine.",image:"/assets/images/course-game.jpg",color:"from-yellow-500 to-orange-500",modules:["Game Design","Unity","Unreal Engine","3D Modeling","Game Physics"],duration:"11 mois"}].map(((t,s)=>e.jsxs(a.div,{className:"bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl",initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1*s},whileHover:{y:-10,transition:{duration:.3}},children:[e.jsx("div",{className:"h-48 bg-cover bg-center",style:{backgroundImage:`url(${t.image})`},children:e.jsx("div",{className:`h-full w-full bg-gradient-to-tr ${t.color} opacity-80`})}),e.jsxs("div",{className:"p-6",children:[e.jsx("h3",{className:"text-2xl font-bold mb-2",children:t.title}),e.jsx("p",{className:"text-gray-300 mb-4",children:t.description}),e.jsx("div",{className:"mb-4",children:e.jsxs("span",{className:"text-sm font-semibold text-blue-300",children:["Durée: ",t.duration]})}),e.jsx("div",{className:"flex flex-wrap gap-2 mb-6",children:t.modules.map(((t,i)=>e.jsx("span",{className:"px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200",children:t},i)))}),e.jsx(i,{to:`/formations/${t.id}`,className:"inline-block w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-center transition-colors",children:"Découvrir la formation"})]})]},t.id)))})}),e.jsx("section",{className:"container mx-auto px-4 py-16 text-center relative z-10",children:e.jsxs(a.div,{className:"bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 shadow-2xl",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5},children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold mb-4",children:"Prêt à commencer votre voyage éducatif?"}),e.jsx("p",{className:"text-xl text-blue-200 mb-8 max-w-2xl mx-auto",children:"Rejoignez notre communauté d'apprenants et transformez votre carrière avec nos formations de pointe."}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[e.jsx(i,{to:"/register",className:"py-3 px-8 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium text-lg transition-colors",children:"S'inscrire maintenant"}),e.jsx(i,{to:"/login",className:"py-3 px-8 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-lg transition-colors",children:"Se connecter"})]})]})}),e.jsx("footer",{className:"container mx-auto px-4 py-8 text-center text-gray-400 relative z-10",children:e.jsx("p",{children:"© 2025 Tech Odyssey Academy. Tous droits réservés."})})]})};export{o as default};
