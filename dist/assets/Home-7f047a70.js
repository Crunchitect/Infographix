import{_ as u,o as _,c as h,a as e,n as r,t as o,r as f,p,b as g,d as v,u as b,e as w,f as i,w as c,F as y}from"./index-a37b310b.js";const H="/assets/showcase-e64beddf.mp4",$="/assets/autocomplete-268b99d6.mp4",C={name:"Card",props:["heading","icon","rev"]};const I=s=>(p("data-v-f83736a7"),s=s(),g(),s),L={class:"icon"},M=I(()=>e("div",{class:"padding"},null,-1));function S(s,n,d,a,m,G){return _(),h("div",{class:r(["block",d.rev?"rev":""])},[e("div",L,[e("i",{class:r(["fa-solid","fa-2x","fa-"+d.icon])},null,2)]),M,e("div",null,[e("h2",null,o(d.heading),1),e("p",null,[f(s.$slots,"default",{},void 0,!0)])])],2)}const t=u(C,[["render",S],["__scopeId","data-v-f83736a7"]]),l=s=>(p("data-v-e6cc5b0c"),s=s(),g(),s),T=l(()=>e("div",{class:"padding"},null,-1)),k=["innerHTML"],j=l(()=>e("div",{class:"center"},[e("video",{muted:"",autoplay:"",loop:"",src:H})],-1)),z=l(()=>e("div",{class:"padding"},null,-1)),B={class:"row"},F={class:"col"},N=["innerHTML"],R=["innerHTML"],V=l(()=>e("video",{muted:"",autoplay:"",loop:"",src:$,class:"auto"},null,-1)),D=l(()=>e("div",{class:"padding"},null,-1)),E=l(()=>e("div",{class:"padding"},null,-1)),q={name:"Home",components:{Card:t},props:["language"],data(){return{lang:{}}},mounted(){fetch("assets/langs/home.json").then(s=>s.json()).then(s=>this.lang=s[this.language])},watch:{language(s){console.log(s),fetch("assets/langs/home.json").then(n=>n.json()).then(n=>this.lang=n[s])}}},A=v({...q,setup(s){const n=b(),d=w();return n.hash&&d.push(`/google-auth${n.hash}`),(a,m)=>(_(),h(y,null,[T,e("h1",{class:"big",innerHTML:a.lang.header},null,8,k),j,z,e("div",B,[e("div",F,[e("h1",{innerHTML:a.lang.rep,style:{"font-size":"4rem"}},null,8,N),e("p",{innerHTML:a.lang.ux,style:{"font-size":"2rem"}},null,8,R)]),V]),D,E,i(t,{heading:a.lang.resphead,icon:"bolt"},{default:c(()=>[e("p",null,o(a.lang.resp),1)]),_:1},8,["heading"]),i(t,{heading:a.lang.usershead,icon:"users"},{default:c(()=>[e("p",null,o(a.lang.users),1)]),_:1},8,["heading"]),i(t,{heading:a.lang.uxhead,icon:"user-plus"},{default:c(()=>[e("p",null,o(a.lang.ux),1)]),_:1},8,["heading"]),i(t,{heading:a.lang.aihead,icon:"magic-wand-sparkles",rev:"true"},{default:c(()=>[e("p",null,o(a.lang.ai),1)]),_:1},8,["heading"]),i(t,{heading:a.lang.imexporthead,icon:"arrow-up-from-bracket",rev:"true"},{default:c(()=>[e("p",null,o(a.lang.imexport),1)]),_:1},8,["heading"])],64))}});const K=u(A,[["__scopeId","data-v-e6cc5b0c"]]);export{K as default};
