export const INIT = `try{var s=JSON.parse(localStorage.getItem("appearance")||"{}"),e=document.documentElement,
m={layout:"layout",sidebarVariant:"sidebar-variant",sidebarMode:"sidebar-mode",contentLayout:"content-layout",radius:"radius",font:"font",density:"density"};
for(var k in m)if(typeof s[k]==="string")e.setAttribute("data-"+m[k],s[k]);
if(/^#[0-9a-f]{6}$/i.test(s.primary)){var h=s.primary,l=(parseInt(h.slice(1,3),16)*299+parseInt(h.slice(3,5),16)*587+parseInt(h.slice(5,7),16)*114)/1000;
e.style.setProperty("--brand",h);e.style.setProperty("--primary-foreground",l>150?"#000":"#fff")}
if(typeof s.contentWidth==="string")e.style.setProperty("--content-max-width",s.contentWidth==="full"?"100%":s.contentWidth)}catch(x){}`