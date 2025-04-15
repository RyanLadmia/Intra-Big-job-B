import{j as t}from"./ui-B9MhWaVJ.js";import{r as a}from"./router-D7BdrHDj.js";const e=({colorMode:e="navy",animationMode:n="cosmic"})=>{const o=a.useRef(null);return a.useEffect((()=>{if("cosmic"!==n)return;const t=o.current;if(!t)return;const a=t.getContext("2d");t.width=window.innerWidth,t.height=window.innerHeight;const r="navy"===e?{nebula1:"#0a3c6e",nebula2:"#001a38",nebula3:"#002147",nebula4:"#003366",star:"#e6f0ff",dust:"#0a3c6e"}:{nebula1:"#4B0082",nebula2:"#2D0922",nebula3:"#190033",nebula4:"#330033",star:"#ffffff",dust:"#4B0082"},i=[];for(let e=0;e<200;e++)i.push({x:Math.random()*t.width,y:Math.random()*t.height,radius:1.5*Math.random(),opacity:Math.random(),speed:.05*Math.random()});const d=[],s=[];for(let e=0;e<5;e++)s.push({x:Math.random()*t.width,y:Math.random()*t.height,radius:100+200*Math.random(),color:[r.nebula1,r.nebula2,r.nebula3,r.nebula4][Math.floor(4*Math.random())],opacity:.05+.1*Math.random()});const h=[];for(let e=0;e<100;e++)h.push({x:Math.random()*t.width,y:Math.random()*t.height,radius:1*Math.random(),color:r.dust,opacity:.1+.2*Math.random(),speed:.2*Math.random()});let l;const c=()=>{a.clearRect(0,0,t.width,t.height),s.forEach((t=>{a.beginPath();const e=a.createRadialGradient(t.x,t.y,0,t.x,t.y,t.radius);e.addColorStop(0,`${t.color}${Math.round(255*t.opacity).toString(16).padStart(2,"0")}`),e.addColorStop(1,"transparent"),a.fillStyle=e,a.arc(t.x,t.y,t.radius,0,2*Math.PI),a.fill()})),i.forEach((e=>{e.y-=e.speed,e.y<0&&(e.y=t.height,e.x=Math.random()*t.width),a.beginPath(),a.arc(e.x,e.y,e.radius,0,2*Math.PI),a.fillStyle=`${r.star}${Math.round(255*e.opacity).toString(16).padStart(2,"0")}`,a.fill()})),d.length<3&&Math.random()<.01&&d.push({x:Math.random()*t.width,y:0,length:80+70*Math.random(),speed:5+7*Math.random(),angle:Math.PI/4+Math.random()*Math.PI/4});for(let e=d.length-1;e>=0;e--){const n=d[e];a.beginPath(),a.moveTo(n.x,n.y);const o=n.x+Math.cos(n.angle)*n.length,i=n.y+Math.sin(n.angle)*n.length;a.lineTo(o,i);const s=a.createLinearGradient(n.x,n.y,o,i);s.addColorStop(0,`${r.star}ff`),s.addColorStop(1,"transparent"),a.strokeStyle=s,a.lineWidth=2,a.stroke(),n.x+=Math.cos(n.angle)*n.speed,n.y+=Math.sin(n.angle)*n.speed,(n.x>t.width||n.y>t.height)&&d.splice(e,1)}h.forEach((e=>{e.y+=e.speed,e.y>t.height&&(e.y=0,e.x=Math.random()*t.width),a.beginPath(),a.arc(e.x,e.y,e.radius,0,2*Math.PI),a.fillStyle=`${e.color}${Math.round(255*e.opacity).toString(16).padStart(2,"0")}`,a.fill()})),l=window.requestAnimationFrame(c)};c();const u=()=>{t.width=window.innerWidth,t.height=window.innerHeight};return window.addEventListener("resize",u),()=>{window.removeEventListener("resize",u),window.cancelAnimationFrame(l)}}),[e,n]),t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"absolute inset-0 "+("navy"===e?"bg-[#002147]":"bg-black")}),t.jsx("div",{className:"absolute inset-0 bg-[url('/images/stars-bg.png')] opacity-40"}),t.jsx("canvas",{ref:o,className:`absolute inset-0 ${"cosmic"===n?"opacity-100":"opacity-0"} transition-opacity duration-1000`}),t.jsx("div",{className:"absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full blur-3xl "+("navy"===e?"bg-blue-900/20":"bg-purple-900/20")}),t.jsx("div",{className:"absolute bottom-0 right-1/4 w-1/2 h-1/3 rounded-full blur-3xl "+("navy"===e?"bg-blue-900/10":"bg-purple-900/10")})]})};export{e as C};
