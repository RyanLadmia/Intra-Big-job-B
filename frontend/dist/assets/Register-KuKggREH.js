const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-18AXJEkp.js","assets/ui-B9MhWaVJ.js","assets/router-D7BdrHDj.js","assets/react-0RZ2pslC.js","assets/charts-DkICKEBk.js"])))=>i.map(i=>d[i]);
import{j as e}from"./ui-B9MhWaVJ.js";import{u as a,r as l,R as s,L as t}from"./router-D7BdrHDj.js";import{t as r,b as n,c as i,P as o,d as u,B as d,e as c,C as m,M as b,f as g,D as x,g as h,h as f,i as v,_ as p,m as j}from"./index-Bd05LC-l.js";import{i as N,v as y,a as w,b as C,P as k}from"./phone-input-CRnCpG_6.js";import{f as S}from"./index-DV0JwV4u.js";import{C as L,a as z,b as A,c as M,d as T}from"./command-BHW6ogSE.js";import{C as D}from"./chevrons-up-down-CRQkNwTu.js";import{a as F}from"./api-O7WXtPX6.js";import{L as V}from"./loader-circle-BrSWE4DC.js";import{C as _}from"./checkbox-CoApv7hz.js";import"./label-8eTlumoe.js";import{P as q}from"./RegisterUtils-CNzMSx0C.js";import{E as P,a as B}from"./eye-BQU9fKOB.js";import"./react-0RZ2pslC.js";import"./query-DKQ6_O-p.js";import"./charts-DkICKEBk.js";const E=l.createContext(null),R=l.createContext(null),I=l.createContext(null),G=()=>{const e=l.useContext(E);if(!e)throw new Error("useUserData doit être utilisé à l'intérieur d'un RegisterProvider");return e},O=()=>{const e=l.useContext(I);if(!e)throw new Error("useValidation doit être utilisé à l'intérieur d'un RegisterProvider");return e},H=({children:s})=>{const t=a(),[i,o]=l.useState(""),[u,d]=l.useState(""),[c,m]=l.useState(null),[b,g]=l.useState("france"),[x,h]=l.useState(""),[f,v]=l.useState(""),[p,j]=l.useState(""),[k,L]=l.useState(""),[z,A]=l.useState(""),[M,T]=l.useState(""),[D,F]=l.useState(""),[V,_]=l.useState(""),[q,P]=l.useState(!1),[B,G]=l.useState(!1),[O,H]=l.useState(!1),[K,W]=l.useState(!1),[J,U]=l.useState(!1),[Z,$]=l.useState(!1),[Y,Q]=l.useState(!1),[X,ee]=l.useState({}),[ae,le]=l.useState("step1"),[se,te]=l.useState(!1),[re,ne]=l.useState(!1),ie=l.useCallback((e=>{const a=new Date,l=new Date(a);l.setFullYear(a.getFullYear()-16),e>l?r.error("Vous n'êtes pas éligible à l'inscription. Vous devez avoir au moins 16 ans.",{duration:5e3,position:"top-center"}):m(e)}),[]),oe=l.useCallback((e=>{v(e)}),[]),ue=l.useCallback((e=>{P(e)}),[]),de=l.useCallback((e=>{A(e.address),F(e.city),_(e.postcode)}),[]),ce=l.useCallback((()=>{const e={};if(i?i.length<2&&(e.firstName="Le prénom doit contenir au moins 2 caractères"):e.firstName="Le prénom est requis",u?u.length<2&&(e.lastName="Le nom doit contenir au moins 2 caractères"):e.lastName="Le nom est requis",x?N(x)||(e.email="Format d'email invalide"):e.email="L'email est requis",p){y(p).isValid||(e.password="Le mot de passe ne respecte pas les critères de sécurité")}else e.password="Le mot de passe est requis";ee((a=>({...a,...e}))),H(!0);const a=0===Object.keys(e).length;return G(a),a}),[i,u,x,p]),me=l.useCallback((()=>{const e={};c?w(c)||(e.birthDate="Vous devez avoir au moins 16 ans"):e.birthDate="La date de naissance est requise",b||(e.nationality="La nationalité est requise"),f?C(f)||(e.phone="Format de téléphone invalide"):e.phone="Le numéro de téléphone est requis",ee((a=>({...a,...e}))),U(!0);const a=0===Object.keys(e).length;return W(a),a}),[c,b,f]),be=l.useCallback((async e=>{e.preventDefault(),te(!0);try{const e={firstName:i.trim(),lastName:u.trim(),birthDate:c?S(c,"yyyy-MM-dd"):null,nationality:b,email:x.trim(),phoneNumber:f,password:p,address:{name:z.trim(),complement:M?M.trim():"",city:D.trim(),postalCode:V.trim()}},a=await n.register(e);a&&201===a.status?(ne(!0),r.success("Inscription réussie ! Vous pouvez maintenant vous connecter.",{duration:5e3,position:"top-center"}),setTimeout((()=>{t("/login")}),500)):r.error("Une erreur s'est produite. Veuillez réessayer.",{duration:5e3,position:"top-center"})}catch(a){r.error(a?.response?.data?.message||"Erreur lors de l'inscription. Veuillez réessayer.")}finally{te(!1)}}),[i,u,c,b,x,f,p,z,M,D,V,t]),ge=l.useMemo((()=>({firstName:i,setFirstName:o,lastName:u,setLastName:d,birthDate:c,setBirthDate:m,nationality:b,setNationality:g,email:x,setEmail:h,phone:f,setPhone:v,password:p,setPassword:j,confirmPassword:k,setConfirmPassword:L,handleDateChange:ie,handlePhoneChange:oe})),[i,u,c,b,x,f,p,k,ie,oe]),xe=l.useMemo((()=>({addressName:z,setAddressName:A,addressComplement:M,setAddressComplement:T,city:D,setCity:F,postalCode:V,setPostalCode:_,acceptTerms:q,setAcceptTerms:P,handleAddressSelect:de,handleTermsChange:ue})),[z,M,D,V,q,de,ue]),he=l.useMemo((()=>({step1Valid:B,setStep1Valid:G,step1Attempted:O,setStep1Attempted:H,step2Valid:K,setStep2Valid:W,step2Attempted:J,setStep2Attempted:U,step1Tried:Z,setStep1Tried:$,step2Tried:Y,setStep2Tried:Q,errors:X,setErrors:ee,activeStep:ae,setActiveStep:le,isSubmitting:se,registerSuccess:re,validateStep1:ce,validateStep2:me,handleSubmit:be})),[B,O,K,J,Z,Y,X,ae,se,re,ce,me,be]);return e.jsx(E.Provider,{value:ge,children:e.jsx(R.Provider,{value:xe,children:e.jsx(I.Provider,{value:he,children:s})})})};l.forwardRef((({className:a,type:s="text",label:t,error:r,required:n=!1,...o},u)=>{const[d,c]=l.useState(!1),[m,b]=l.useState(!1);l.useEffect((()=>{b(void 0!==o.value&&""!==o.value)}),[o.value]);const g=d||m;return e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:i("relative border border-gray-300 rounded-md transition-all duration-200",g?"border-[#0062FF]":"",r?"border-red-500":"",a),children:[e.jsxs("label",{htmlFor:o.id,className:i("absolute left-3 transition-all duration-200 pointer-events-none",g?"transform -translate-y-1/2 top-0 text-xs bg-white px-1 z-10":"transform translate-y-0 top-1/2 -translate-y-1/2 text-gray-500",d?"text-[#0062FF]":"text-gray-500",r?"text-red-500":""),children:[t," ",n&&e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{type:s,className:i("block w-full h-11 px-3 pt-5 pb-5 text-base bg-transparent rounded-md appearance-none focus:outline-none","transition-all duration-200"),onFocus:()=>c(!0),onBlur:()=>c(!1),ref:u,...o})]}),r&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:r})]})})).displayName="FloatingInput";const K=[{value:"france",label:"France",flag:"🇫🇷"},{value:"afghanistan",label:"Afghanistan",flag:"🇦🇫"},{value:"albania",label:"Albanie",flag:"🇦🇱"},{value:"algeria",label:"Algérie",flag:"🇩🇿"},{value:"andorra",label:"Andorre",flag:"🇦🇩"},{value:"angola",label:"Angola",flag:"🇦🇴"},{value:"antigua",label:"Antigua-et-Barbuda",flag:"🇦🇬"},{value:"argentina",label:"Argentine",flag:"🇦🇷"},{value:"armenia",label:"Arménie",flag:"🇦🇲"},{value:"australia",label:"Australie",flag:"🇦🇺"},{value:"austria",label:"Autriche",flag:"🇦🇹"},{value:"azerbaijan",label:"Azerbaïdjan",flag:"🇦🇿"},{value:"bahamas",label:"Bahamas",flag:"🇧🇸"},{value:"bahrain",label:"Bahreïn",flag:"🇧🇭"},{value:"bangladesh",label:"Bangladesh",flag:"🇧🇩"},{value:"barbados",label:"Barbade",flag:"🇧🇧"},{value:"belarus",label:"Biélorussie",flag:"🇧🇾"},{value:"belgium",label:"Belgique",flag:"🇧🇪"},{value:"belize",label:"Belize",flag:"🇧🇿"},{value:"benin",label:"Bénin",flag:"🇧🇯"},{value:"bhutan",label:"Bhoutan",flag:"🇧🇹"},{value:"bolivia",label:"Bolivie",flag:"🇧🇴"},{value:"bosnia",label:"Bosnie-Herzégovine",flag:"🇧🇦"},{value:"botswana",label:"Botswana",flag:"🇧🇼"},{value:"brazil",label:"Brésil",flag:"🇧🇷"},{value:"brunei",label:"Brunei",flag:"🇧🇳"},{value:"bulgaria",label:"Bulgarie",flag:"🇧🇬"},{value:"burkina",label:"Burkina Faso",flag:"🇧🇫"},{value:"burundi",label:"Burundi",flag:"🇧🇮"},{value:"cambodia",label:"Cambodge",flag:"🇰🇭"},{value:"cameroon",label:"Cameroun",flag:"🇨🇲"},{value:"canada",label:"Canada",flag:"🇨🇦"},{value:"cape_verde",label:"Cap-Vert",flag:"🇨🇻"},{value:"central_african_republic",label:"République centrafricaine",flag:"🇨🇫"},{value:"chad",label:"Tchad",flag:"🇹🇩"},{value:"chile",label:"Chili",flag:"🇨🇱"},{value:"china",label:"Chine",flag:"🇨🇳"},{value:"colombia",label:"Colombie",flag:"🇨🇴"},{value:"comoros",label:"Comores",flag:"🇰🇲"},{value:"congo",label:"Congo",flag:"🇨🇬"},{value:"costa_rica",label:"Costa Rica",flag:"🇨🇷"},{value:"croatia",label:"Croatie",flag:"🇭🇷"},{value:"cuba",label:"Cuba",flag:"🇨🇺"},{value:"cyprus",label:"Chypre",flag:"🇨🇾"},{value:"czech_republic",label:"République tchèque",flag:"🇨🇿"},{value:"denmark",label:"Danemark",flag:"🇩🇰"},{value:"djibouti",label:"Djibouti",flag:"🇩🇯"},{value:"dominica",label:"Dominique",flag:"🇩🇲"},{value:"dominican_republic",label:"République dominicaine",flag:"🇩🇴"},{value:"east_timor",label:"Timor oriental",flag:"🇹🇱"},{value:"ecuador",label:"Équateur",flag:"🇪🇨"},{value:"egypt",label:"Égypte",flag:"🇪🇬"},{value:"el_salvador",label:"Salvador",flag:"🇸🇻"},{value:"equatorial_guinea",label:"Guinée équatoriale",flag:"🇬🇶"},{value:"eritrea",label:"Érythrée",flag:"🇪🇷"},{value:"estonia",label:"Estonie",flag:"🇪🇪"},{value:"ethiopia",label:"Éthiopie",flag:"🇪🇹"},{value:"fiji",label:"Fidji",flag:"🇫🇯"},{value:"finland",label:"Finlande",flag:"🇫🇮"},{value:"gabon",label:"Gabon",flag:"🇬🇦"},{value:"gambia",label:"Gambie",flag:"🇬🇲"},{value:"georgia",label:"Géorgie",flag:"🇬🇪"},{value:"germany",label:"Allemagne",flag:"🇩🇪"},{value:"ghana",label:"Ghana",flag:"🇬🇭"},{value:"greece",label:"Grèce",flag:"🇬🇷"},{value:"grenada",label:"Grenade",flag:"🇬🇩"},{value:"guatemala",label:"Guatemala",flag:"🇬🇹"},{value:"guinea",label:"Guinée",flag:"🇬🇳"},{value:"guinea_bissau",label:"Guinée-Bissau",flag:"🇬🇼"},{value:"guyana",label:"Guyana",flag:"🇬🇾"},{value:"haiti",label:"Haïti",flag:"🇭🇹"},{value:"honduras",label:"Honduras",flag:"🇭🇳"},{value:"hungary",label:"Hongrie",flag:"🇭🇺"},{value:"iceland",label:"Islande",flag:"🇮🇸"},{value:"india",label:"Inde",flag:"🇮🇳"},{value:"indonesia",label:"Indonésie",flag:"🇮🇩"},{value:"iran",label:"Iran",flag:"🇮🇷"},{value:"iraq",label:"Irak",flag:"🇮🇶"},{value:"ireland",label:"Irlande",flag:"🇮🇪"},{value:"israel",label:"Israël",flag:"🇮🇱"},{value:"italy",label:"Italie",flag:"🇮🇹"},{value:"jamaica",label:"Jamaïque",flag:"🇯🇲"},{value:"japan",label:"Japon",flag:"🇯🇵"},{value:"jordan",label:"Jordanie",flag:"🇯🇴"},{value:"kazakhstan",label:"Kazakhstan",flag:"🇰🇿"},{value:"kenya",label:"Kenya",flag:"🇰🇪"},{value:"kiribati",label:"Kiribati",flag:"🇰🇮"},{value:"north_korea",label:"Corée du Nord",flag:"🇰🇵"},{value:"south_korea",label:"Corée du Sud",flag:"🇰🇷"},{value:"kuwait",label:"Koweït",flag:"🇰🇼"},{value:"kyrgyzstan",label:"Kirghizistan",flag:"🇰🇬"},{value:"laos",label:"Laos",flag:"🇱🇦"},{value:"latvia",label:"Lettonie",flag:"🇱🇻"},{value:"lebanon",label:"Liban",flag:"🇱🇧"},{value:"lesotho",label:"Lesotho",flag:"🇱🇸"},{value:"liberia",label:"Libéria",flag:"🇱🇷"},{value:"libya",label:"Libye",flag:"🇱🇾"},{value:"liechtenstein",label:"Liechtenstein",flag:"🇱🇮"},{value:"lithuania",label:"Lituanie",flag:"🇱🇹"},{value:"luxembourg",label:"Luxembourg",flag:"🇱🇺"},{value:"macedonia",label:"Macédoine du Nord",flag:"🇲🇰"},{value:"madagascar",label:"Madagascar",flag:"🇲🇬"},{value:"malawi",label:"Malawi",flag:"🇲🇼"},{value:"malaysia",label:"Malaisie",flag:"🇲🇾"},{value:"maldives",label:"Maldives",flag:"🇲🇻"},{value:"mali",label:"Mali",flag:"🇲🇱"},{value:"malta",label:"Malte",flag:"🇲🇹"},{value:"marshall_islands",label:"Îles Marshall",flag:"🇲🇭"},{value:"mauritania",label:"Mauritanie",flag:"🇲🇷"},{value:"mauritius",label:"Maurice",flag:"🇲🇺"},{value:"mexico",label:"Mexique",flag:"🇲🇽"},{value:"micronesia",label:"Micronésie",flag:"🇫🇲"},{value:"moldova",label:"Moldavie",flag:"🇲🇩"},{value:"monaco",label:"Monaco",flag:"🇲🇨"},{value:"mongolia",label:"Mongolie",flag:"🇲🇳"},{value:"montenegro",label:"Monténégro",flag:"🇲🇪"},{value:"morocco",label:"Maroc",flag:"🇲🇦"},{value:"mozambique",label:"Mozambique",flag:"🇲🇿"},{value:"myanmar",label:"Myanmar",flag:"🇲🇲"},{value:"namibia",label:"Namibie",flag:"🇳🇦"},{value:"nauru",label:"Nauru",flag:"🇳🇷"},{value:"nepal",label:"Népal",flag:"🇳🇵"},{value:"netherlands",label:"Pays-Bas",flag:"🇳🇱"},{value:"new_zealand",label:"Nouvelle-Zélande",flag:"🇳🇿"},{value:"nicaragua",label:"Nicaragua",flag:"🇳🇮"},{value:"niger",label:"Niger",flag:"🇳🇪"},{value:"nigeria",label:"Nigeria",flag:"🇳🇬"},{value:"norway",label:"Norvège",flag:"🇳🇴"},{value:"oman",label:"Oman",flag:"🇴🇲"},{value:"pakistan",label:"Pakistan",flag:"🇵🇰"},{value:"palau",label:"Palaos",flag:"🇵🇼"},{value:"panama",label:"Panama",flag:"🇵🇦"},{value:"papua_new_guinea",label:"Papouasie-Nouvelle-Guinée",flag:"🇵🇬"},{value:"paraguay",label:"Paraguay",flag:"🇵🇾"},{value:"peru",label:"Pérou",flag:"🇵🇪"},{value:"philippines",label:"Philippines",flag:"🇵🇭"},{value:"poland",label:"Pologne",flag:"🇵🇱"},{value:"portugal",label:"Portugal",flag:"🇵🇹"},{value:"qatar",label:"Qatar",flag:"🇶🇦"},{value:"romania",label:"Roumanie",flag:"🇷🇴"},{value:"russia",label:"Russie",flag:"🇷🇺"},{value:"rwanda",label:"Rwanda",flag:"🇷🇼"},{value:"saint_kitts",label:"Saint-Kitts-et-Nevis",flag:"🇰🇳"},{value:"saint_lucia",label:"Sainte-Lucie",flag:"🇱🇨"},{value:"saint_vincent",label:"Saint-Vincent-et-les-Grenadines",flag:"🇻🇨"},{value:"samoa",label:"Samoa",flag:"🇼🇸"},{value:"san_marino",label:"Saint-Marin",flag:"🇸🇲"},{value:"sao_tome",label:"Sao Tomé-et-Principe",flag:"🇸🇹"},{value:"saudi_arabia",label:"Arabie saoudite",flag:"🇸🇦"},{value:"senegal",label:"Sénégal",flag:"🇸🇳"},{value:"serbia",label:"Serbie",flag:"🇷🇸"},{value:"seychelles",label:"Seychelles",flag:"🇸🇨"},{value:"sierra_leone",label:"Sierra Leone",flag:"🇸🇱"},{value:"singapore",label:"Singapour",flag:"🇸🇬"},{value:"slovakia",label:"Slovaquie",flag:"🇸🇰"},{value:"slovenia",label:"Slovénie",flag:"🇸🇮"},{value:"solomon_islands",label:"Îles Salomon",flag:"🇸🇧"},{value:"somalia",label:"Somalie",flag:"🇸🇴"},{value:"south_africa",label:"Afrique du Sud",flag:"🇿🇦"},{value:"south_sudan",label:"Soudan du Sud",flag:"🇸🇸"},{value:"spain",label:"Espagne",flag:"🇪🇸"},{value:"sri_lanka",label:"Sri Lanka",flag:"🇱🇰"},{value:"sudan",label:"Soudan",flag:"🇸🇩"},{value:"suriname",label:"Suriname",flag:"🇸🇷"},{value:"swaziland",label:"Eswatini",flag:"🇸🇿"},{value:"sweden",label:"Suède",flag:"🇸🇪"},{value:"switzerland",label:"Suisse",flag:"🇨🇭"},{value:"syria",label:"Syrie",flag:"🇸🇾"},{value:"taiwan",label:"Taïwan",flag:"🇹🇼"},{value:"tajikistan",label:"Tadjikistan",flag:"🇹🇯"},{value:"tanzania",label:"Tanzanie",flag:"🇹🇿"},{value:"thailand",label:"Thaïlande",flag:"🇹🇭"},{value:"togo",label:"Togo",flag:"🇹🇬"},{value:"tonga",label:"Tonga",flag:"🇹🇴"},{value:"trinidad",label:"Trinité-et-Tobago",flag:"🇹🇹"},{value:"tunisia",label:"Tunisie",flag:"🇹🇳"},{value:"turkey",label:"Turquie",flag:"🇹🇷"},{value:"turkmenistan",label:"Turkménistan",flag:"🇹🇲"},{value:"tuvalu",label:"Tuvalu",flag:"🇹🇻"},{value:"uganda",label:"Ouganda",flag:"🇺🇬"},{value:"ukraine",label:"Ukraine",flag:"🇺🇦"},{value:"united_arab_emirates",label:"Émirats arabes unis",flag:"🇦🇪"},{value:"united_kingdom",label:"Royaume-Uni",flag:"🇬🇧"},{value:"united_states",label:"États-Unis",flag:"🇺🇸"},{value:"uruguay",label:"Uruguay",flag:"🇺🇾"},{value:"uzbekistan",label:"Ouzbékistan",flag:"🇺🇿"},{value:"vanuatu",label:"Vanuatu",flag:"🇻🇺"},{value:"vatican",label:"Vatican",flag:"🇻🇦"},{value:"venezuela",label:"Venezuela",flag:"🇻🇪"},{value:"vietnam",label:"Viêt Nam",flag:"🇻🇳"},{value:"yemen",label:"Yémen",flag:"🇾🇪"},{value:"zambia",label:"Zambie",flag:"🇿🇲"},{value:"zimbabwe",label:"Zimbabwe",flag:"🇿🇼"}],W=l.memo((({country:a,isSelected:l,onClick:s})=>e.jsxs("div",{className:"country-item px-2 py-1.5 flex items-center justify-between rounded-sm cursor-pointer text-gray-900",onClick:s,children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"mr-2 text-lg",children:a.flag}),e.jsx("span",{children:a.label})]}),e.jsx(m,{className:i("ml-auto h-4 w-4",l?"opacity-100":"opacity-0")})]})));function J({value:a,onChange:s,error:t}){const[r,n]=l.useState(!1),[m,b]=l.useState(""),g=l.useMemo((()=>K.find((e=>e.value===a))),[a]),x=l.useMemo((()=>{if(!m)return K;const e=m.toLowerCase();return K.filter((a=>a.label.toLowerCase().includes(e)||a.value.toLowerCase().includes(e)))}),[m]),h=l.useCallback((e=>{n(e),e||b("")}),[]),f=l.useCallback((e=>{b(e)}),[]),v=l.useCallback((e=>{e.preventDefault(),n(!1)}),[]),p=l.useCallback((e=>()=>{s(e),n(!1),b("")}),[s]);return e.jsxs("div",{className:"relative",children:[e.jsxs(o,{open:r,onOpenChange:h,children:[e.jsx(u,{asChild:!0,children:e.jsxs(d,{variant:"outline",role:"combobox","aria-expanded":r,className:i("w-full h-14 justify-between font-normal",!a&&"text-gray-500",t&&"border-red-500"),children:[g?e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"mr-2 text-lg",children:g.flag}),e.jsx("span",{children:g.label})]}):"Sélectionnez un pays",e.jsx(D,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(c,{className:"w-full p-0 max-h-[300px] overflow-y-auto",style:{width:"var(--radix-popover-trigger-width)"},onOpenAutoFocus:e=>e.preventDefault(),onCloseAutoFocus:e=>e.preventDefault(),onEscapeKeyDown:v,children:e.jsxs(L,{className:"w-full",children:[e.jsx(z,{placeholder:"Rechercher un pays...",className:"h-9",autoFocus:!1,value:m,onValueChange:f}),e.jsxs(A,{className:"max-h-[250px]",children:[0===x.length&&e.jsx(M,{children:"Aucun pays trouvé."}),e.jsx(T,{children:x.map((l=>e.jsx(W,{country:l,isSelected:a===l.value,onClick:p(l.value)},l.value)))})]})]})})]}),t&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:t})]})}W.displayName="CountryItem";const U=l.forwardRef((({className:a,label:s,error:t,required:r=!1,onAddressSelect:n,inputClassName:o,...u},d)=>{const[c,m]=l.useState(!1),[g,x]=l.useState(!1),[h,f]=l.useState(""),[v,p]=l.useState([]),[j,N]=l.useState(!1),[y,w]=l.useState(-1),[C,k]=l.useState(!1),[S,L]=l.useState(""),z=l.useRef(null),A=l.useRef(null);l.useEffect((()=>{const e=e=>{z.current&&!z.current.contains(e.target)&&k(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[]),l.useEffect((()=>{x(void 0!==u.value&&""!==u.value),f(u.value||"")}),[u.value]);const M=l.useCallback((async e=>{if(e.length<3)return p([]),void k(!1);N(!0);try{const a=await F.searchAddress(e);a&&a.length>0?(p(a),k(!0)):(p([]),k(!1))}catch(a){p([]),k(!1)}finally{N(!1)}}),[]);l.useEffect((()=>{const e=setTimeout((()=>{const e=h?.trim(),a=e&&e.length>=3&&!(/^\d+$/.test(e)&&e.length<5)&&!(1===e.split(/\s+/).length&&e.length<4);e&&e.length<3?L("Veuillez saisir au moins 3 caractères"):/^\d+$/.test(e)&&e.length<5?L("Pour un code postal, saisissez les 5 chiffres"):e&&e.length<4?L("Veuillez préciser votre recherche"):L(""),a?M(e):(p([]),k(!1))}),300);return()=>clearTimeout(e)}),[h,M]);const T=l.useCallback((()=>{m(!0),h&&h.length>=3&&v.length>0&&k(!0)}),[h,v.length]),D=l.useCallback((()=>{m(!1),setTimeout((()=>{A.current?.contains(document.activeElement)||k(!1)}),200)}),[]),_=l.useCallback((e=>{const a=e.target.value;f(a),u.onChange&&u.onChange(e)}),[u.onChange]),q=l.useCallback((e=>{const a=e.label;f(a),x(!0),k(!1),w(-1),n&&n({address:a,houseNumber:e.houseNumber,street:e.street,postcode:e.postcode,city:e.city,coordinates:e.coordinates});const l={target:{name:u.name,value:a}};u.onChange&&u.onChange(l)}),[n,u.onChange,u.name]),P=l.useCallback((e=>{C&&("ArrowDown"===e.key?(e.preventDefault(),w((e=>e<v.length-1?e+1:e))):"ArrowUp"===e.key?(e.preventDefault(),w((e=>e>0?e-1:0))):"Enter"===e.key&&y>=0?(e.preventDefault(),q(v[y])):"Escape"===e.key&&(k(!1),w(-1)))}),[C,v,y,q]),B=c||g,E=i("relative border border-gray-300 rounded-md transition-all duration-200",B?"border-[#0062FF]":"",t?"border-red-500":"",a),R=i("absolute left-3 transition-all duration-200 pointer-events-none",B?"transform -translate-y-1/2 top-0 text-xs bg-white px-1 z-10":"transform translate-y-0 top-1/2 -translate-y-1/2 text-gray-500",c?"text-[#0062FF]":"text-gray-500",t?"text-red-500":""),I=i("block w-full h-11 px-3 pt-5 pb-5 text-base bg-transparent rounded-md appearance-none focus:outline-none","transition-all duration-200",o);return e.jsxs("div",{ref:z,className:i("relative",a),children:[e.jsxs("div",{className:E,children:[e.jsxs("label",{htmlFor:u.id,className:R,children:[s," ",r&&e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx("input",{type:"text",className:I,onFocus:T,onBlur:D,onChange:_,onKeyDown:P,value:h,ref:d,autoComplete:"off",...u}),j&&e.jsx("div",{className:"absolute right-3 top-1/2 -translate-y-1/2",children:e.jsx(V,{className:"h-4 w-4 text-gray-400 animate-spin"})})]}),t?e.jsx("p",{className:"text-red-500 text-xs mt-1",children:t}):S?e.jsx("p",{className:"text-gray-500 text-xs mt-1",children:S}):null,C&&v.length>0&&e.jsx("div",{ref:A,className:"absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto fade-in-up",children:e.jsx("ul",{className:"py-1",children:v.map(((a,l)=>e.jsxs("li",{className:i("px-3 py-2 cursor-pointer flex items-start gap-2","hover:bg-gray-100 transition-colors duration-150",y===l?"bg-gray-100":""),onClick:()=>q(a),onMouseEnter:()=>w(l),children:[e.jsx(b,{className:"h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"font-medium text-gray-800",children:a.label}),e.jsx("span",{className:"text-xs text-gray-500",children:a.context})]})]},a.id||l)))})})]})}));U.displayName="AddressAutocomplete";const Z=({goToNextStep:a})=>{const{firstName:s,setFirstName:t,lastName:r,setLastName:n,email:i,setEmail:o,password:u,setPassword:c}=G(),{setStep1Tried:m,setErrors:b}=O(),[g,x]=l.useState({}),[h,f]=l.useState(!1),v=e=>g[e],p=e=>g[e]||null;return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"firstName",className:"block text-sm font-medium text-gray-700 mb-1",children:"Prénom"}),e.jsx("input",{id:"firstName",type:"text",className:"w-full px-4 py-3 rounded-md border "+(v("firstName")?"border-red-500":"border-gray-300"),value:s,onChange:e=>t(e.target.value),placeholder:"Votre prénom"}),v("firstName")&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:p("firstName")})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"lastName",className:"block text-sm font-medium text-gray-700 mb-1",children:"Nom"}),e.jsx("input",{id:"lastName",type:"text",className:"w-full px-4 py-3 rounded-md border "+(v("lastName")?"border-red-500":"border-gray-300"),value:r,onChange:e=>n(e.target.value),placeholder:"Votre nom"}),v("lastName")&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:p("lastName")})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),e.jsx("input",{id:"email",type:"email",className:"w-full px-4 py-3 rounded-md border "+(v("email")?"border-red-500":"border-gray-300"),value:i,onChange:e=>o(e.target.value),placeholder:"email@exemple.com"}),v("email")&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:p("email")})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700 mb-1",children:"Mot de passe"}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{id:"password",type:h?"text":"password",className:"w-full px-4 py-3 pr-10 rounded-md border "+(v("password")?"border-red-500":"border-gray-300"),value:u,onChange:e=>c(e.target.value),placeholder:"Minimum 8 caractères"}),e.jsx(d,{type:"button",variant:"ghost",size:"icon",className:"absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent",onClick:()=>f((e=>!e)),children:h?e.jsx(P,{className:"h-4 w-4 text-gray-400"}):e.jsx(B,{className:"h-4 w-4 text-gray-400"})})]}),v("password")&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:p("password")}),e.jsx(q,{password:u})]}),e.jsx("div",{className:"flex justify-end mt-6",children:e.jsxs(d,{type:"button",className:"h-12 bg-[#528eb2] hover:bg-[#528eb2]/90 text-white px-6",onClick:()=>{(()=>{m(!0),b({});const e={};let a=!0;return s&&""!==s.trim()||(e.firstName="Le prénom est requis",a=!1),r&&""!==r.trim()||(e.lastName="Le nom est requis",a=!1),i&&""!==i.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)||(e.email="Veuillez entrer un email valide",a=!1):(e.email="L'email est requis",a=!1),u&&""!==u.trim()?u.length<8&&(e.password="Le mot de passe doit contenir au moins 8 caractères",a=!1):(e.password="Le mot de passe est requis",a=!1),x(e),a})()&&a()},children:["Continuer",e.jsx("svg",{className:"w-4 h-4 ml-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})})]})})]})},$=l.lazy((()=>p((()=>import("./index-18AXJEkp.js")),__vite__mapDeps([0,1,2,3,4])))),Y=l.memo((()=>e.jsx("div",{className:"flex items-center justify-center p-8",children:e.jsx("div",{className:"w-8 h-8 border-t-2 border-b-2 border-[#0066ff] rounded-full animate-spin"})})));Y.displayName="CalendarFallback";const Q=({goToNextStep:a,goToPrevStep:t})=>{const{birthDate:r,nationality:n,setNationality:i,phone:o,handleDateChange:u,handlePhoneChange:c}=G(),{step2Tried:m}=O(),[b,p]=l.useState(!1),[j,N]=s.useState({}),y=r?new Intl.DateTimeFormat("fr-FR").format(r):null,w=e=>m&&j[e],S=e=>j[e]||null;return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Date de naissance"}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"w-full px-4 py-3 rounded-md border flex items-center cursor-pointer transition-colors hover:border-[#0066ff] "+(w("birthDate")?"border-red-500":"border-gray-300"),onClick:()=>p(!0),children:[y?e.jsx("span",{className:"text-gray-900",children:y}):e.jsx("span",{className:"text-gray-500",children:"JJ/MM/AAAA"}),e.jsx(g,{className:"ml-auto h-5 w-5 text-gray-500"})]}),e.jsx(x,{open:b,onOpenChange:p,children:e.jsxs(h,{className:"p-0 sm:max-w-[425px] bg-white rounded-lg shadow-xl border-none overflow-hidden",children:[e.jsxs("div",{className:"p-4 pb-0",children:[e.jsx(f,{className:"text-xl font-semibold text-center text-gray-900",children:"Sélectionnez votre date de naissance"}),e.jsx(v,{className:"text-sm text-center text-gray-500 mt-1",children:"Vous devez avoir au moins 16 ans pour vous inscrire."})]}),e.jsx("div",{className:"calendar-container w-full p-4",children:e.jsx(l.Suspense,{fallback:e.jsx(Y,{}),children:e.jsx($,{onChange:u,value:r,locale:"fr",maxDate:new Date,minDetail:"decade",defaultView:"century",minDate:new Date(1940,0,1),className:"modern-calendar w-full",formatShortWeekday:(e,a)=>["L","M","M","J","V","S","D"][a.getDay()],navigationLabel:({date:e})=>e.toLocaleString("fr",{month:"long",year:"numeric"}).toLowerCase(),next2Label:e.jsx("span",{className:"text-lg text-[#0066ff]",children:"»"}),prev2Label:e.jsx("span",{className:"text-lg text-[#0066ff]",children:"«"}),nextLabel:e.jsx("span",{className:"text-lg text-[#0066ff]",children:"›"}),prevLabel:e.jsx("span",{className:"text-lg text-[#0066ff]",children:"‹"}),showNeighboringMonth:!1,tileClassName:({date:e,view:a})=>{const l=new Date;return l.setHours(0,0,0,0),"month"===a&&e>l?"calendar-future-date":null}})})}),e.jsx("div",{className:"p-4 flex justify-end",children:e.jsx("button",{className:"calendar-confirm-button",onClick:()=>p(!1),children:"Confirmer"})})]})}),w("birthDate")&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:S("birthDate")})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Nationalité"}),e.jsx(J,{value:n,onChange:i,error:w("nationality")?S("nationality"):null}),w("nationality")&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:S("nationality")})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"phone",className:"block text-sm font-medium text-gray-700 mb-1",children:"Numéro de téléphone"}),e.jsx(k,{id:"phone",value:o,onChange:c,error:w("phone")?S("phone"):null,placeholder:"06 12 34 56 78"}),e.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Format français uniquement (+33). Exemple: 06 12 34 56 78"})]}),e.jsxs("div",{className:"flex space-x-4 mt-8",children:[e.jsxs(d,{type:"button",variant:"outline",className:"flex-1 h-12 bg-white text-[#02284f] border-[#02284f] hover:bg-gray-50 transition-colors",onClick:t,children:[e.jsx("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10 19l-7-7m0 0l7-7m-7 7h18"})}),"Retour"]}),e.jsxs(d,{type:"button",className:"flex-1 h-12 bg-[#528eb2] hover:bg-[#528eb2]/90 text-white transition-colors",onClick:()=>{(()=>{const e={};let a=!0;return r||(e.birthDate="La date de naissance est requise",a=!1),n||(e.nationality="La nationalité est requise",a=!1),o&&""!==o.trim()?C(o)||(e.phone="Veuillez entrer un numéro de téléphone français valide",a=!1):(e.phone="Le numéro de téléphone est requis",a=!1),N(e),a})()&&a()},children:["Continuer",e.jsx("svg",{className:"w-4 h-4 ml-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})})]})]})]})},X=({goToPrevStep:a,onSubmit:t})=>{const{addressName:r,setAddressName:n,addressComplement:i,setAddressComplement:o,city:u,setCity:c,postalCode:m,setPostalCode:b,acceptTerms:g,handleTermsChange:x,handleAddressSelect:h}=(()=>{const e=l.useContext(R);if(!e)throw new Error("useAddress doit être utilisé à l'intérieur d'un RegisterProvider");return e})(),{isSubmitting:f,registerSuccess:v}=O(),[p,j]=s.useState({}),[N,y]=s.useState(!1),w=e=>N&&p[e],C=e=>p[e]||null;return e.jsx("div",{className:"space-y-6",children:e.jsxs("form",{onSubmit:e=>{e.preventDefault(),y(!0);if((()=>{const e={};let a=!0;return r&&""!==r.trim()||(e.addressName="L'adresse est requise",a=!1),u&&""!==u.trim()||(e.city="La ville est requise",a=!1),m&&""!==m.trim()?/^[0-9]{5}$/.test(m.replace(/\s/g,""))||(e.postalCode="Veuillez entrer un code postal valide (5 chiffres)",a=!1):(e.postalCode="Le code postal est requis",a=!1),g||(e.acceptTerms="Vous devez accepter les conditions d'utilisation",a=!1),j(e),a})())try{t(e)}catch(a){j({...p,addressName:"Erreur lors de la validation de l'adresse. Veuillez réessayer."})}},children:[f&&!v&&e.jsx("div",{className:"bg-blue-50 p-4 rounded-md mb-6",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mr-3"}),e.jsx("p",{className:"text-blue-700 font-medium",children:"Inscription en cours, veuillez patienter..."})]})}),v&&e.jsx("div",{className:"bg-green-50 p-4 rounded-md mb-6",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("svg",{className:"w-6 h-6 text-green-500 mr-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})}),e.jsx("p",{className:"text-green-700 font-medium",children:"Inscription réussie ! Redirection vers la page de connexion..."})]})}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"addressName",className:"block text-sm font-medium text-gray-700 mb-1",children:"Adresse postale"}),e.jsx(U,{id:"addressName",value:r,onChange:e=>n(e.target.value),onAddressSelect:e=>{h(e),j({...p,addressName:null,city:null,postalCode:null})},error:w("addressName")?C("addressName"):null,className:"",inputClassName:"w-full px-4 py-3 rounded-md border "+(w("addressName")?"border-red-500":"border-gray-300")})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"addressComplement",className:"block text-sm font-medium text-gray-700 mb-1",children:"Complément d'adresse (optionnel)"}),e.jsx("input",{id:"addressComplement",type:"text",className:"w-full px-4 py-3 rounded-md border border-gray-300",value:i,onChange:e=>o(e.target.value),placeholder:"Appartement, étage, bâtiment..."})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"city",className:"block text-sm font-medium text-gray-700 mb-1",children:"Ville"}),e.jsx("input",{id:"city",type:"text",className:"w-full px-4 py-3 rounded-md border "+(w("city")?"border-red-500":"border-gray-300"),value:u,onChange:e=>c(e.target.value)}),w("city")&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:C("city")})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"postalCode",className:"block text-sm font-medium text-gray-700 mb-1",children:"Code postal"}),e.jsx("input",{id:"postalCode",type:"text",className:"w-full px-4 py-3 rounded-md border "+(w("postalCode")?"border-red-500":"border-gray-300"),value:m,onChange:e=>b(e.target.value)}),w("postalCode")&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:C("postalCode")})]})]}),e.jsxs("div",{className:"flex items-start space-x-2 py-2",children:[e.jsx(_,{id:"terms",checked:g,onCheckedChange:x,className:w("acceptTerms")?"border-red-500":""}),e.jsxs("label",{htmlFor:"terms",className:"text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:["J'accepte les ",e.jsx("a",{href:"/terms",className:"text-[#528eb2] hover:underline",children:"conditions d'utilisation"})]})]}),w("acceptTerms")&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:C("acceptTerms")}),e.jsxs("div",{className:"flex space-x-4 mt-8",children:[e.jsxs(d,{type:"button",variant:"outline",className:"flex-1 h-12 bg-white text-[#02284f] border-[#02284f] hover:bg-gray-50",onClick:a,children:[e.jsx("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10 19l-7-7m0 0l7-7m-7 7h18"})}),"Retour"]}),e.jsx(d,{type:"submit",className:"flex-1 h-12 bg-[#528eb2] hover:bg-[#528eb2]/90 text-white",disabled:f,children:f?e.jsxs("div",{className:"flex items-center justify-center",children:[e.jsx("div",{className:"w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"}),"Inscription en cours..."]}):"Créer mon compte"})]})]})})},ee=l.memo((({children:a})=>e.jsx(j.div,{initial:"initial",animate:"in",exit:"out",variants:{initial:{opacity:0,y:5},in:{opacity:1,y:0},out:{opacity:0,y:-5}},transition:{type:"tween",ease:[.25,.1,.25,1],duration:.3},style:{willChange:"opacity, transform",transform:"translateZ(0)"},children:a})));ee.displayName="FormTransition",l.lazy((()=>p((()=>import("./index-18AXJEkp.js")),__vite__mapDeps([0,1,2,3,4]))));l.memo((()=>e.jsx("div",{className:"flex items-center justify-center p-8",children:e.jsx("div",{className:"w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"})}))).displayName="CalendarFallback";const ae=()=>{const{setErrors:a,setStep1Attempted:s,setStep2Attempted:r}=O(),{handleSubmit:n,isSubmitting:i}=O(),o=l.useRef(1),[u,d]=l.useState(1),c=(u-1)/2*100,m=l.useCallback((()=>{1===u?s(!0):2===u&&r(!0),d((e=>e+1))}),[u,s,r]),b=l.useCallback((()=>{u>1&&d((e=>e-1))}),[u]);l.useEffect((()=>{a({})}),[a]),l.useEffect((()=>{o.current!==u&&(a({}),o.current=u)}),[u,a]);const g=l.useCallback((e=>{e.preventDefault();const a={...e,preventDefault:()=>{e.preventDefault()},validationComplete:!0,target:e.target};n(a)}),[n]);return e.jsxs("div",{className:"w-full bg-white rounded-lg shadow-lg mx-auto overflow-hidden",children:[e.jsxs("div",{className:"bg-[#02284f] text-white p-6",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Créez votre compte"}),e.jsxs("span",{className:"text-sm font-medium",children:["Étape ",u,"/",3]})]}),e.jsxs("div",{className:"mt-6",children:[e.jsxs("div",{className:"flex justify-between items-center mb-1",children:[e.jsx("span",{className:"text-sm font-medium",children:["Informations personnelles","Coordonnées","Adresse"][u-1]}),e.jsxs("span",{className:"text-sm font-medium",children:[c,"%"]})]}),e.jsx("div",{className:"w-full bg-[#1a3c61] rounded-full h-2",children:e.jsx("div",{className:"bg-[#528eb2] h-2 rounded-full transition-all duration-300 ease-in-out",style:{width:`${c}%`}})})]})]}),e.jsx(ee,{children:e.jsxs("div",{className:"p-6",children:[1===u&&e.jsx(Z,{goToNextStep:m}),2===u&&e.jsx(Q,{goToNextStep:m,goToPrevStep:b}),3===u&&e.jsx(X,{goToPrevStep:b,onSubmit:g}),e.jsx("div",{className:"mt-6 text-center",children:e.jsxs("p",{className:"text-sm text-gray-600",children:["Déjà inscrit ? ",e.jsx(t,{to:"/login",className:"text-[#528eb2] font-medium hover:underline",children:"Se connecter"})]})})]})})]})},le=()=>e.jsxs("div",{className:"flex flex-col md:flex-row w-full",children:[e.jsx("div",{className:"md:w-5/12 bg-[#02284f] text-white p-8 flex flex-col justify-center items-center",children:e.jsxs("div",{className:"max-w-md mx-auto text-center",children:[e.jsx("div",{className:"mb-10",children:e.jsxs("svg",{className:"w-32 h-32 mx-auto text-[#528eb2]",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z",fill:"currentColor"}),e.jsx("path",{d:"M5 9H19V9L12 13L5 9Z",fill:"currentColor",fillOpacity:"0.5"})]})}),e.jsx("h1",{className:"mb-6 text-4xl font-extrabold",children:"Rejoignez BigProject"}),e.jsx("p",{className:"mb-8 text-xl text-gray-300",children:"Créez votre compte en quelques étapes et commencez votre voyage éducatif avec nous."}),e.jsxs("div",{className:"space-y-6 text-left",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex-shrink-0 bg-[#528eb2]/20 w-12 h-12 rounded-full flex items-center justify-center mr-4",children:e.jsx("svg",{className:"w-6 h-6 text-[#528eb2]",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-white",children:"Vos données sont sécurisées"}),e.jsx("p",{className:"text-sm text-gray-300",children:"Protection par cryptage avancé"})]})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex-shrink-0 bg-[#528eb2]/20 w-12 h-12 rounded-full flex items-center justify-center mr-4",children:e.jsx("svg",{className:"w-6 h-6 text-[#528eb2]",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 10V3L4 14h7v7l9-11h-7z"})})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-white",children:"Processus rapide"}),e.jsx("p",{className:"text-sm text-gray-300",children:"Inscription en moins de 2 minutes"})]})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex-shrink-0 bg-[#528eb2]/20 w-12 h-12 rounded-full flex items-center justify-center mr-4",children:e.jsx("svg",{className:"w-6 h-6 text-[#528eb2]",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"})})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-white",children:"Accessible partout"}),e.jsx("p",{className:"text-sm text-gray-300",children:"Sur tous vos appareils"})]})]})]})]})}),e.jsx("div",{className:"md:w-7/12 bg-white p-8 flex items-center justify-center",children:e.jsx("div",{className:"w-full max-w-xl",children:e.jsx(H,{children:e.jsx(ae,{})})})})]});export{le as default};
