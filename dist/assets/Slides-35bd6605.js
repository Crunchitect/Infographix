import{d as p,j as s,c as m,a as t,n as u,t as o,q as S,F as x,o as v,p as w,b as y,_ as r,u as b,e as I,h as M,i as h}from"./index-aadf34d5.js";import{s as V}from"./supabase-6147ff89.js";const $=e=>(w("data-v-546300c3"),e=e(),y(),e),j=$(()=>t("i",{class:"fa-solid fa-chevron-up fa-xs"},null,-1)),k=[j],B=p({__name:"Metadata",props:{name:String,width:String,height:String,language:String},setup(e){const a=s(!0),c=()=>{a.value=!a.value};return(l,d)=>(v(),m(x,null,[t("div",{class:u(["metadata",a.value?"op":"cl"])},[t("div",{class:u(["content",a.value?"op":"cl"])},[t("h1",null,o(e.name),1),t("p",null,[t("strong",null,o(e.language=="en"?"Size":"ขนาด")+":",1),S(" "+o(e.width)+" x "+o(e.height),1)])],2)],2),t("div",{class:u(["chevron",a.value?"op":"cl"]),onClick:c},k,2)],64))}});const C=r(B,[["__scopeId","data-v-546300c3"]]),N={};function q(e,a){return null}const z=r(N,[["render",q]]),F={class:"main"},R={class:"bottom"},D=p({__name:"Slides",props:{language:String},setup(e){const a=b(),c=I(),l=s("Loading..."),d=s("0"),_=s("0"),f=s({});return M(async()=>{const{data:i,error:g}=await V.from("Projects").select("*").eq("id",a.params.id);if(g&&c.push("/404"),!i)return;const n=i[0];console.log(n),l.value=n.name,d.value=n.content.metadata.width,_.value=n.content.metadata.height,f.value=n.content.data}),(i,g)=>(v(),m("div",F,[h(C,{name:l.value,width:d.value,height:_.value,language:e.language},null,8,["name","width","height","language"]),t("div",R,[h(z)])]))}});const P=r(D,[["__scopeId","data-v-5fc296bd"]]);export{P as default};
