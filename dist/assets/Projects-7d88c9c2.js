import{d as D,j as _,s as E,v as F,x as I,y as T,c as v,a as e,n as N,t as x,r as L,m as O,o as d,_ as M,u as q,e as A,i as W,w as Y,z as n,q as G,l as B,F as $,A as H,k as J,B as K,C as Q,D as X,p as Z,b as ee}from"./index-9568a5fd.js";import{s as u,E as te}from"./ErrorBox-44ae0394.js";const se=["onClick"],ae=D({__name:"Dialogue",props:{title:String,content:String,theme:String,opened:Boolean},setup(a){const p=a,o=_(!1),t=_(!1),c=E(p,"opened"),h=()=>o.value=!o.value,r=()=>t.value=!1;return F(c,()=>{t.value=!t.value}),(w,P)=>I((d(),v("div",{class:"backdrop",onClick:O(r,["self"])},[e("div",{class:N({modal:!0,cpb:a.theme==="corporate-bullshit"})},[e("i",{class:N(["fa-solid",o.value?"fa-circle-xmark":"fa-xmark",o.value?"fa-1.5x":""]),onMouseover:h,onMouseout:h,onClick:r},null,34),e("h1",null,x(a.title),1),e("p",null,x(a.content),1),L(w.$slots,"default",{},void 0,!0)],2)],8,se)),[[T,t.value]])}});const oe=M(ae,[["__scopeId","data-v-706792ef"]]),g=a=>(Z("data-v-45affd62"),a=a(),ee(),a),ne=g(()=>e("p",{style:{"font-size":"3rem"}},"Project Name: ",-1)),re=g(()=>e("br",null,null,-1)),le=g(()=>e("br",null,null,-1)),ce={class:"user"},ie={class:"userblock"},ue=["src"],de=g(()=>e("h1",{class:"big"},"Projects",-1)),_e=g(()=>e("i",{class:"fa-solid fa-add"},null,-1)),pe={class:"project-panel"},he={key:0,class:"blank"},fe=["onClick"],me=D({__name:"Projects",props:{language:String},setup(a){let p=_(!1),o=_({}),t=null,c=_("");const h=q(),r=A();let w=u.auth.getUser().then(s=>{s.error&&(console.clear(),r.push("/sign-up"))});!h.hash&&!w?(console.log(w),r.push("/sign-up")):(h.hash.slice(1).split("&")[0].split("=")[1],(async()=>{const{data:{user:s}}=await u.auth.getUser();o.value=s})());const P=()=>{p.value=!p.value},U=async()=>{let{error:s}=await u.auth.signOut();if(s)return t="You are stuck here. No changing.",t;r.push("/")},V=async s=>{P();const i=[{uid:o.value.id,status:"owner"}],{data:b,error:f}=await u.from("Teams").insert([{team_members:i}]).select();if(f)return t="Please wait until we have a stable connection to the database.",f;const k=b[0].id,{data:j,error:m}=await u.from("Projects").insert([{name:s,type:"slide",content:{metadata:{width:"1920px",height:"1080px"},data:[[{id:"1",tag:"h1",inner_text:"hello"}]]},team_id:k}]).select();if(m)return t="Please wait until we have a stable connection to the database.",m;r.push(`/project/${j[0].id}`)},z=async s=>{r.push(`/project/${s.id}`)};let y=_({data:{},error:null});return(async()=>y.value=await u.from("Projects").select("name,id"))(),(s,i)=>{var b,f,k,j,m,C,S;return d(),v($,null,[W(oe,{title:"New Project",opened:n(p)},{default:Y(()=>[ne,I(e("input",{type:"text",placeholder:"Untitled Project","onUpdate:modelValue":i[0]||(i[0]=l=>Q(c)?c.value=l:c=l)},null,512),[[K,n(c)]]),re,le,e("button",{class:"new bouncy",onClick:i[1]||(i[1]=l=>V(n(c)??"Untitled Project"))},"New Project!")]),_:1},8,["opened"]),e("div",ce,[e("div",ie,[e("img",{class:"profile",src:((f=(b=n(o))==null?void 0:b.user_metadata)==null?void 0:f.avatar_url)??"no",referrerpolicy:"no-referrer"},null,8,ue),e("h1",null,x(((j=(k=n(o))==null?void 0:k.user_metadata)==null?void 0:j.name)??"Loading..."),1)]),e("button",{class:"sign-out",onClick:U},"Sign Out")]),e("div",{class:"projects"},[de,e("button",{onClick:P,class:"bouncy"},[_e,G(" New Project")])]),e("div",pe,[(m=n(y))!=null&&m.data[0]?B("",!0):(d(),v("p",he,"No Projects Found... Maybe create a new one?")),(d(!0),v($,null,H((C=n(y))==null?void 0:C.data,(l,R)=>(d(),v("div",{class:"project bouncy",style:X(`--anim-order: ${R}`),onClick:ve=>z(l)},[e("p",null,x((l==null?void 0:l.name)??"What the fuck is in ur config?"),1)],12,fe))),256))]),n(t)?(d(),J(te,{key:0,msg:(S=n(y))==null?void 0:S.error},null,8,["msg"])):B("",!0)],64)}}});const ye=M(me,[["__scopeId","data-v-45affd62"]]);export{ye as default};
