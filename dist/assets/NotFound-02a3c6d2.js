import{_ as s,o,c as a,a as n,t as c,n as i}from"./index-8bb71fcc.js";const l={name:"NotFound",data(){return{val:"404",callback:!0}},mounted(){this.doThingy()},beforeUnmount(){this.callback=!1},methods:{pass(){},async doThingy(){console.log("!!!"),this.val="[NOT FOUND]",await new Promise(e=>setTimeout(e,150)),this.val="404",this.callback&&setTimeout(this.doThingy,Math.random()*5e3)}}};const _={class:"big"};function r(e,d,u,h,t,m){return o(),a("div",_,[n("div",{class:i(["glitch",t.val==="404"?"tb":"ts"])},c(t.val),3)])}const v=s(l,[["render",r],["__scopeId","data-v-88486ce6"]]);export{v as default};