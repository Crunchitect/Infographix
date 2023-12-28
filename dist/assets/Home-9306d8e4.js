import{_ as we,o as Te,c as Ie,a as x,n as me,t as F,r as Ze,p as Ce,b as Pe,d as Je,u as Qe,e as Ke,f as Ye,g as Ge,h as Xe,i as $,w as U}from"./index-9568a5fd.js";const er="/assets/autocomplete-268b99d6.mp4",rr={name:"Card",props:["heading","icon","rev"]};const nr=e=>(Ce("data-v-f83736a7"),e=e(),Pe(),e),tr={class:"icon"},ar=nr(()=>x("div",{class:"padding"},null,-1));function ir(e,r,n,i,t,o){return Te(),Ie("div",{class:me(["block",n.rev?"rev":""])},[x("div",tr,[x("i",{class:me(["fa-solid","fa-2x","fa-"+n.icon])},null,2)]),ar,x("div",null,[x("h2",null,F(n.heading),1),x("p",null,[Ze(e.$slots,"default",{},void 0,!0)])])],2)}const W=we(rr,[["render",ir],["__scopeId","data-v-f83736a7"]]);var ke={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},te={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},or=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],Z={CSS:{},springs:{}};function k(e,r,n){return Math.min(Math.max(e,r),n)}function N(e,r){return e.indexOf(r)>-1}function ee(e,r){return e.apply(null,r)}var f={arr:function(e){return Array.isArray(e)},obj:function(e){return N(Object.prototype.toString.call(e),"Object")},pth:function(e){return f.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||f.svg(e)},str:function(e){return typeof e=="string"},fnc:function(e){return typeof e=="function"},und:function(e){return typeof e>"u"},nil:function(e){return f.und(e)||e===null},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return f.hex(e)||f.rgb(e)||f.hsl(e)},key:function(e){return!ke.hasOwnProperty(e)&&!te.hasOwnProperty(e)&&e!=="targets"&&e!=="keyframes"}};function Se(e){var r=/\(([^)]+)\)/.exec(e);return r?r[1].split(",").map(function(n){return parseFloat(n)}):[]}function Le(e,r){var n=Se(e),i=k(f.und(n[0])?1:n[0],.1,100),t=k(f.und(n[1])?100:n[1],.1,100),o=k(f.und(n[2])?10:n[2],.1,100),u=k(f.und(n[3])?0:n[3],.1,100),s=Math.sqrt(t/i),a=o/(2*Math.sqrt(t*i)),l=a<1?s*Math.sqrt(1-a*a):0,c=1,d=a<1?(a*s+-u)/l:-u+s;function p(m){var v=r?r*m/1e3:m;return a<1?v=Math.exp(-v*a*s)*(c*Math.cos(l*v)+d*Math.sin(l*v)):v=(c+d*v)*Math.exp(-v*s),m===0||m===1?m:1-v}function T(){var m=Z.springs[e];if(m)return m;for(var v=1/6,_=0,M=0;;)if(_+=v,p(_)===1){if(M++,M>=16)break}else M=0;var g=_*v*1e3;return Z.springs[e]=g,g}return r?p:T}function ur(e){return e===void 0&&(e=10),function(r){return Math.ceil(k(r,1e-6,1)*e)*(1/e)}}var sr=function(){var e=11,r=1/(e-1);function n(c,d){return 1-3*d+3*c}function i(c,d){return 3*d-6*c}function t(c){return 3*c}function o(c,d,p){return((n(d,p)*c+i(d,p))*c+t(d))*c}function u(c,d,p){return 3*n(d,p)*c*c+2*i(d,p)*c+t(d)}function s(c,d,p,T,m){var v,_,M=0;do _=d+(p-d)/2,v=o(_,T,m)-c,v>0?p=_:d=_;while(Math.abs(v)>1e-7&&++M<10);return _}function a(c,d,p,T){for(var m=0;m<4;++m){var v=u(d,p,T);if(v===0)return d;var _=o(d,p,T)-c;d-=_/v}return d}function l(c,d,p,T){if(!(0<=c&&c<=1&&0<=p&&p<=1))return;var m=new Float32Array(e);if(c!==d||p!==T)for(var v=0;v<e;++v)m[v]=o(v*r,c,p);function _(M){for(var g=0,h=1,I=e-1;h!==I&&m[h]<=M;++h)g+=r;--h;var D=(M-m[h])/(m[h+1]-m[h]),b=g+D*r,E=u(b,c,p);return E>=.001?a(M,b,c,p):E===0?b:s(M,g,g+r,c,p)}return function(M){return c===d&&p===T||M===0||M===1?M:o(_(M),d,T)}}return l}(),De=function(){var e={linear:function(){return function(i){return i}}},r={Sine:function(){return function(i){return 1-Math.cos(i*Math.PI/2)}},Expo:function(){return function(i){return i?Math.pow(2,10*i-10):0}},Circ:function(){return function(i){return 1-Math.sqrt(1-i*i)}},Back:function(){return function(i){return i*i*(3*i-2)}},Bounce:function(){return function(i){for(var t,o=4;i<((t=Math.pow(2,--o))-1)/11;);return 1/Math.pow(4,3-o)-7.5625*Math.pow((t*3-2)/22-i,2)}},Elastic:function(i,t){i===void 0&&(i=1),t===void 0&&(t=.5);var o=k(i,1,10),u=k(t,.1,2);return function(s){return s===0||s===1?s:-o*Math.pow(2,10*(s-1))*Math.sin((s-1-u/(Math.PI*2)*Math.asin(1/o))*(Math.PI*2)/u)}}},n=["Quad","Cubic","Quart","Quint"];return n.forEach(function(i,t){r[i]=function(){return function(o){return Math.pow(o,t+2)}}}),Object.keys(r).forEach(function(i){var t=r[i];e["easeIn"+i]=t,e["easeOut"+i]=function(o,u){return function(s){return 1-t(o,u)(1-s)}},e["easeInOut"+i]=function(o,u){return function(s){return s<.5?t(o,u)(s*2)/2:1-t(o,u)(s*-2+2)/2}},e["easeOutIn"+i]=function(o,u){return function(s){return s<.5?(1-t(o,u)(1-s*2))/2:(t(o,u)(s*2-1)+1)/2}}}),e}();function ae(e,r){if(f.fnc(e))return e;var n=e.split("(")[0],i=De[n],t=Se(e);switch(n){case"spring":return Le(e,r);case"cubicBezier":return ee(sr,t);case"steps":return ee(ur,t);default:return ee(i,t)}}function Ee(e){try{var r=document.querySelectorAll(e);return r}catch{return}}function J(e,r){for(var n=e.length,i=arguments.length>=2?arguments[1]:void 0,t=[],o=0;o<n;o++)if(o in e){var u=e[o];r.call(i,u,o,e)&&t.push(u)}return t}function Q(e){return e.reduce(function(r,n){return r.concat(f.arr(n)?Q(n):n)},[])}function ye(e){return f.arr(e)?e:(f.str(e)&&(e=Ee(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function ie(e,r){return e.some(function(n){return n===r})}function oe(e){var r={};for(var n in e)r[n]=e[n];return r}function re(e,r){var n=oe(e);for(var i in e)n[i]=r.hasOwnProperty(i)?r[i]:e[i];return n}function K(e,r){var n=oe(e);for(var i in r)n[i]=f.und(e[i])?r[i]:e[i];return n}function cr(e){var r=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);return r?"rgba("+r[1]+",1)":e}function fr(e){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,n=e.replace(r,function(s,a,l,c){return a+a+l+l+c+c}),i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n),t=parseInt(i[1],16),o=parseInt(i[2],16),u=parseInt(i[3],16);return"rgba("+t+","+o+","+u+",1)"}function lr(e){var r=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),n=parseInt(r[1],10)/360,i=parseInt(r[2],10)/100,t=parseInt(r[3],10)/100,o=r[4]||1;function u(p,T,m){return m<0&&(m+=1),m>1&&(m-=1),m<1/6?p+(T-p)*6*m:m<1/2?T:m<2/3?p+(T-p)*(2/3-m)*6:p}var s,a,l;if(i==0)s=a=l=t;else{var c=t<.5?t*(1+i):t+i-t*i,d=2*t-c;s=u(d,c,n+1/3),a=u(d,c,n),l=u(d,c,n-1/3)}return"rgba("+s*255+","+a*255+","+l*255+","+o+")"}function dr(e){if(f.rgb(e))return cr(e);if(f.hex(e))return fr(e);if(f.hsl(e))return lr(e)}function L(e){var r=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(r)return r[1]}function vr(e){if(N(e,"translate")||e==="perspective")return"px";if(N(e,"rotate")||N(e,"skew"))return"deg"}function ne(e,r){return f.fnc(e)?e(r.target,r.id,r.total):e}function S(e,r){return e.getAttribute(r)}function ue(e,r,n){var i=L(r);if(ie([n,"deg","rad","turn"],i))return r;var t=Z.CSS[r+n];if(!f.und(t))return t;var o=100,u=document.createElement(e.tagName),s=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;s.appendChild(u),u.style.position="absolute",u.style.width=o+n;var a=o/u.offsetWidth;s.removeChild(u);var l=a*parseFloat(r);return Z.CSS[r+n]=l,l}function Be(e,r,n){if(r in e.style){var i=r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),t=e.style[r]||getComputedStyle(e).getPropertyValue(i)||"0";return n?ue(e,t,n):t}}function se(e,r){if(f.dom(e)&&!f.inp(e)&&(!f.nil(S(e,r))||f.svg(e)&&e[r]))return"attribute";if(f.dom(e)&&ie(or,r))return"transform";if(f.dom(e)&&r!=="transform"&&Be(e,r))return"css";if(e[r]!=null)return"object"}function Oe(e){if(f.dom(e)){for(var r=e.style.transform||"",n=/(\w+)\(([^)]*)\)/g,i=new Map,t;t=n.exec(r);)i.set(t[1],t[2]);return i}}function hr(e,r,n,i){var t=N(r,"scale")?1:0+vr(r),o=Oe(e).get(r)||t;return n&&(n.transforms.list.set(r,o),n.transforms.last=r),i?ue(e,o,i):o}function ce(e,r,n,i){switch(se(e,r)){case"transform":return hr(e,r,i,n);case"css":return Be(e,r,n);case"attribute":return S(e,r);default:return e[r]||0}}function fe(e,r){var n=/^(\*=|\+=|-=)/.exec(e);if(!n)return e;var i=L(e)||0,t=parseFloat(r),o=parseFloat(e.replace(n[0],""));switch(n[0][0]){case"+":return t+o+i;case"-":return t-o+i;case"*":return t*o+i}}function Ae(e,r){if(f.col(e))return dr(e);if(/\s/g.test(e))return e;var n=L(e),i=n?e.substr(0,e.length-n.length):e;return r?i+r:i}function le(e,r){return Math.sqrt(Math.pow(r.x-e.x,2)+Math.pow(r.y-e.y,2))}function gr(e){return Math.PI*2*S(e,"r")}function pr(e){return S(e,"width")*2+S(e,"height")*2}function mr(e){return le({x:S(e,"x1"),y:S(e,"y1")},{x:S(e,"x2"),y:S(e,"y2")})}function Fe(e){for(var r=e.points,n=0,i,t=0;t<r.numberOfItems;t++){var o=r.getItem(t);t>0&&(n+=le(i,o)),i=o}return n}function yr(e){var r=e.points;return Fe(e)+le(r.getItem(r.numberOfItems-1),r.getItem(0))}function Ve(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return gr(e);case"rect":return pr(e);case"line":return mr(e);case"polyline":return Fe(e);case"polygon":return yr(e)}}function xr(e){var r=Ve(e);return e.setAttribute("stroke-dasharray",r),r}function _r(e){for(var r=e.parentNode;f.svg(r)&&f.svg(r.parentNode);)r=r.parentNode;return r}function He(e,r){var n=r||{},i=n.el||_r(e),t=i.getBoundingClientRect(),o=S(i,"viewBox"),u=t.width,s=t.height,a=n.viewBox||(o?o.split(" "):[0,0,u,s]);return{el:i,viewBox:a,x:a[0]/1,y:a[1]/1,w:u,h:s,vW:a[2],vH:a[3]}}function br(e,r){var n=f.str(e)?Ee(e)[0]:e,i=r||100;return function(t){return{property:t,el:n,svg:He(n),totalLength:Ve(n)*(i/100)}}}function Mr(e,r,n){function i(c){c===void 0&&(c=0);var d=r+c>=1?r+c:0;return e.el.getPointAtLength(d)}var t=He(e.el,e.svg),o=i(),u=i(-1),s=i(1),a=n?1:t.w/t.vW,l=n?1:t.h/t.vH;switch(e.property){case"x":return(o.x-t.x)*a;case"y":return(o.y-t.y)*l;case"angle":return Math.atan2(s.y-u.y,s.x-u.x)*180/Math.PI}}function xe(e,r){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,i=Ae(f.pth(e)?e.totalLength:e,r)+"";return{original:i,numbers:i.match(n)?i.match(n).map(Number):[0],strings:f.str(e)||r?i.split(n):[]}}function de(e){var r=e?Q(f.arr(e)?e.map(ye):ye(e)):[];return J(r,function(n,i,t){return t.indexOf(n)===i})}function je(e){var r=de(e);return r.map(function(n,i){return{target:n,id:i,total:r.length,transforms:{list:Oe(n)}}})}function wr(e,r){var n=oe(r);if(/^spring/.test(n.easing)&&(n.duration=Le(n.easing)),f.arr(e)){var i=e.length,t=i===2&&!f.obj(e[0]);t?e={value:e}:f.fnc(r.duration)||(n.duration=r.duration/i)}var o=f.arr(e)?e:[e];return o.map(function(u,s){var a=f.obj(u)&&!f.pth(u)?u:{value:u};return f.und(a.delay)&&(a.delay=s?0:r.delay),f.und(a.endDelay)&&(a.endDelay=s===o.length-1?r.endDelay:0),a}).map(function(u){return K(u,n)})}function Tr(e){for(var r=J(Q(e.map(function(o){return Object.keys(o)})),function(o){return f.key(o)}).reduce(function(o,u){return o.indexOf(u)<0&&o.push(u),o},[]),n={},i=function(o){var u=r[o];n[u]=e.map(function(s){var a={};for(var l in s)f.key(l)?l==u&&(a.value=s[l]):a[l]=s[l];return a})},t=0;t<r.length;t++)i(t);return n}function Ir(e,r){var n=[],i=r.keyframes;i&&(r=K(Tr(i),r));for(var t in r)f.key(t)&&n.push({name:t,tweens:wr(r[t],e)});return n}function Cr(e,r){var n={};for(var i in e){var t=ne(e[i],r);f.arr(t)&&(t=t.map(function(o){return ne(o,r)}),t.length===1&&(t=t[0])),n[i]=t}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}function Pr(e,r){var n;return e.tweens.map(function(i){var t=Cr(i,r),o=t.value,u=f.arr(o)?o[1]:o,s=L(u),a=ce(r.target,e.name,s,r),l=n?n.to.original:a,c=f.arr(o)?o[0]:l,d=L(c)||L(a),p=s||d;return f.und(u)&&(u=l),t.from=xe(c,p),t.to=xe(fe(u,c),p),t.start=n?n.end:0,t.end=t.start+t.delay+t.duration+t.endDelay,t.easing=ae(t.easing,t.duration),t.isPath=f.pth(o),t.isPathTargetInsideSVG=t.isPath&&f.svg(r.target),t.isColor=f.col(t.from.original),t.isColor&&(t.round=1),n=t,t})}var ze={css:function(e,r,n){return e.style[r]=n},attribute:function(e,r,n){return e.setAttribute(r,n)},object:function(e,r,n){return e[r]=n},transform:function(e,r,n,i,t){if(i.list.set(r,n),r===i.last||t){var o="";i.list.forEach(function(u,s){o+=s+"("+u+") "}),e.style.transform=o}}};function Re(e,r){var n=je(e);n.forEach(function(i){for(var t in r){var o=ne(r[t],i),u=i.target,s=L(o),a=ce(u,t,s,i),l=s||L(a),c=fe(Ae(o,l),a),d=se(u,t);ze[d](u,t,c,i.transforms,!0)}})}function kr(e,r){var n=se(e.target,r.name);if(n){var i=Pr(r,e),t=i[i.length-1];return{type:n,property:r.name,animatable:e,tweens:i,duration:t.end,delay:i[0].delay,endDelay:t.endDelay}}}function Sr(e,r){return J(Q(e.map(function(n){return r.map(function(i){return kr(n,i)})})),function(n){return!f.und(n)})}function $e(e,r){var n=e.length,i=function(o){return o.timelineOffset?o.timelineOffset:0},t={};return t.duration=n?Math.max.apply(Math,e.map(function(o){return i(o)+o.duration})):r.duration,t.delay=n?Math.min.apply(Math,e.map(function(o){return i(o)+o.delay})):r.delay,t.endDelay=n?t.duration-Math.max.apply(Math,e.map(function(o){return i(o)+o.duration-o.endDelay})):r.endDelay,t}var _e=0;function Lr(e){var r=re(ke,e),n=re(te,e),i=Ir(n,e),t=je(e.targets),o=Sr(t,i),u=$e(o,n),s=_e;return _e++,K(r,{id:s,children:[],animatables:t,animations:o,duration:u.duration,delay:u.delay,endDelay:u.endDelay})}var P=[],Ue=function(){var e;function r(){!e&&(!be()||!y.suspendWhenDocumentHidden)&&P.length>0&&(e=requestAnimationFrame(n))}function n(t){for(var o=P.length,u=0;u<o;){var s=P[u];s.paused?(P.splice(u,1),o--):(s.tick(t),u++)}e=u>0?requestAnimationFrame(n):void 0}function i(){y.suspendWhenDocumentHidden&&(be()?e=cancelAnimationFrame(e):(P.forEach(function(t){return t._onDocumentVisibility()}),Ue()))}return typeof document<"u"&&document.addEventListener("visibilitychange",i),r}();function be(){return!!document&&document.hidden}function y(e){e===void 0&&(e={});var r=0,n=0,i=0,t,o=0,u=null;function s(g){var h=window.Promise&&new Promise(function(I){return u=I});return g.finished=h,h}var a=Lr(e);s(a);function l(){var g=a.direction;g!=="alternate"&&(a.direction=g!=="normal"?"normal":"reverse"),a.reversed=!a.reversed,t.forEach(function(h){return h.reversed=a.reversed})}function c(g){return a.reversed?a.duration-g:g}function d(){r=0,n=c(a.currentTime)*(1/y.speed)}function p(g,h){h&&h.seek(g-h.timelineOffset)}function T(g){if(a.reversePlayback)for(var I=o;I--;)p(g,t[I]);else for(var h=0;h<o;h++)p(g,t[h])}function m(g){for(var h=0,I=a.animations,D=I.length;h<D;){var b=I[h],E=b.animatable,H=b.tweens,B=H.length-1,w=H[B];B&&(w=J(H,function(qe){return g<qe.end})[0]||w);for(var O=k(g-w.start-w.delay,0,w.duration)/w.duration,q=isNaN(O)?1:w.easing(O),C=w.to.strings,Y=w.round,G=[],Ne=w.to.numbers.length,A=void 0,j=0;j<Ne;j++){var z=void 0,ve=w.to.numbers[j],he=w.from.numbers[j]||0;w.isPath?z=Mr(w.value,q*ve,w.isPathTargetInsideSVG):z=he+q*(ve-he),Y&&(w.isColor&&j>2||(z=Math.round(z*Y)/Y)),G.push(z)}var ge=C.length;if(!ge)A=G[0];else{A=C[0];for(var R=0;R<ge;R++){C[R];var pe=C[R+1],X=G[R];isNaN(X)||(pe?A+=X+pe:A+=X+" ")}}ze[b.type](E.target,b.property,A,E.transforms),b.currentValue=A,h++}}function v(g){a[g]&&!a.passThrough&&a[g](a)}function _(){a.remaining&&a.remaining!==!0&&a.remaining--}function M(g){var h=a.duration,I=a.delay,D=h-a.endDelay,b=c(g);a.progress=k(b/h*100,0,100),a.reversePlayback=b<a.currentTime,t&&T(b),!a.began&&a.currentTime>0&&(a.began=!0,v("begin")),!a.loopBegan&&a.currentTime>0&&(a.loopBegan=!0,v("loopBegin")),b<=I&&a.currentTime!==0&&m(0),(b>=D&&a.currentTime!==h||!h)&&m(h),b>I&&b<D?(a.changeBegan||(a.changeBegan=!0,a.changeCompleted=!1,v("changeBegin")),v("change"),m(b)):a.changeBegan&&(a.changeCompleted=!0,a.changeBegan=!1,v("changeComplete")),a.currentTime=k(b,0,h),a.began&&v("update"),g>=h&&(n=0,_(),a.remaining?(r=i,v("loopComplete"),a.loopBegan=!1,a.direction==="alternate"&&l()):(a.paused=!0,a.completed||(a.completed=!0,v("loopComplete"),v("complete"),!a.passThrough&&"Promise"in window&&(u(),s(a)))))}return a.reset=function(){var g=a.direction;a.passThrough=!1,a.currentTime=0,a.progress=0,a.paused=!0,a.began=!1,a.loopBegan=!1,a.changeBegan=!1,a.completed=!1,a.changeCompleted=!1,a.reversePlayback=!1,a.reversed=g==="reverse",a.remaining=a.loop,t=a.children,o=t.length;for(var h=o;h--;)a.children[h].reset();(a.reversed&&a.loop!==!0||g==="alternate"&&a.loop===1)&&a.remaining++,m(a.reversed?a.duration:0)},a._onDocumentVisibility=d,a.set=function(g,h){return Re(g,h),a},a.tick=function(g){i=g,r||(r=i),M((i+(n-r))*y.speed)},a.seek=function(g){M(c(g))},a.pause=function(){a.paused=!0,d()},a.play=function(){a.paused&&(a.completed&&a.reset(),a.paused=!1,P.push(a),d(),Ue())},a.reverse=function(){l(),a.completed=!a.reversed,d()},a.restart=function(){a.reset(),a.play()},a.remove=function(g){var h=de(g);We(h,a)},a.reset(),a.autoplay&&a.play(),a}function Me(e,r){for(var n=r.length;n--;)ie(e,r[n].animatable.target)&&r.splice(n,1)}function We(e,r){var n=r.animations,i=r.children;Me(e,n);for(var t=i.length;t--;){var o=i[t],u=o.animations;Me(e,u),!u.length&&!o.children.length&&i.splice(t,1)}!n.length&&!i.length&&r.pause()}function Dr(e){for(var r=de(e),n=P.length;n--;){var i=P[n];We(r,i)}}function Er(e,r){r===void 0&&(r={});var n=r.direction||"normal",i=r.easing?ae(r.easing):null,t=r.grid,o=r.axis,u=r.from||0,s=u==="first",a=u==="center",l=u==="last",c=f.arr(e),d=parseFloat(c?e[0]:e),p=c?parseFloat(e[1]):0,T=L(c?e[1]:e)||0,m=r.start||0+(c?d:0),v=[],_=0;return function(M,g,h){if(s&&(u=0),a&&(u=(h-1)/2),l&&(u=h-1),!v.length){for(var I=0;I<h;I++){if(!t)v.push(Math.abs(u-I));else{var D=a?(t[0]-1)/2:u%t[0],b=a?(t[1]-1)/2:Math.floor(u/t[0]),E=I%t[0],H=Math.floor(I/t[0]),B=D-E,w=b-H,O=Math.sqrt(B*B+w*w);o==="x"&&(O=-B),o==="y"&&(O=-w),v.push(O)}_=Math.max.apply(Math,v)}i&&(v=v.map(function(C){return i(C/_)*_})),n==="reverse"&&(v=v.map(function(C){return o?C<0?C*-1:-C:Math.abs(_-C)}))}var q=c?(p-d)/_:d;return m+q*(Math.round(v[g]*100)/100)+T}}function Br(e){e===void 0&&(e={});var r=y(e);return r.duration=0,r.add=function(n,i){var t=P.indexOf(r),o=r.children;t>-1&&P.splice(t,1);function u(p){p.passThrough=!0}for(var s=0;s<o.length;s++)u(o[s]);var a=K(n,re(te,e));a.targets=a.targets||e.targets;var l=r.duration;a.autoplay=!1,a.direction=r.direction,a.timelineOffset=f.und(i)?l:fe(i,l),u(r),r.seek(a.timelineOffset);var c=y(a);u(c),o.push(c);var d=$e(o,e);return r.delay=d.delay,r.endDelay=d.endDelay,r.duration=d.duration,r.seek(0),r.reset(),r.autoplay&&r.play(),r},r}y.version="3.2.1";y.speed=1;y.suspendWhenDocumentHidden=!0;y.running=P;y.remove=Dr;y.get=ce;y.set=Re;y.convertPx=ue;y.path=br;y.setDashoffset=xr;y.stagger=Er;y.timeline=Br;y.easing=ae;y.penner=De;y.random=function(e,r){return Math.floor(Math.random()*(r-e+1))+e};const V=e=>(Ce("data-v-55c2ea9f"),e=e(),Pe(),e),Or={class:"main"},Ar=V(()=>x("div",{class:"padding"},null,-1)),Fr=["innerHTML"],Vr=V(()=>x("div",{class:"center"},null,-1)),Hr=V(()=>x("div",{class:"padding"},null,-1)),jr={class:"row"},zr={class:"col"},Rr=["innerHTML"],$r=["innerHTML"],Ur=V(()=>x("video",{muted:"",autoplay:"",loop:"",src:er,class:"auto"},null,-1)),Wr=V(()=>x("div",{class:"padding"},null,-1)),Nr=V(()=>x("div",{class:"padding"},null,-1)),qr=Je({__name:"Home",props:{language:String},setup(e){const r=Qe(),n=Ke();r.hash&&n.push(`/projects${r.hash}`);const i=e,t=Ye({en:{header:'Make your <span class="fancy-text">dream</span> media <span class="fancy-text">fast</span>.',rep:'<span class="fancy-text">Avoid</span> repetitive patterns',resp:"Change every detail and look with reactive elements!",users:"Share everything with a single link!",ux:"Make videos without worrying what an MP4 is!",ai:"Just type a thought out to reality!",imexport:"Export to Powerpoint, OBJ, Image file and more!",resphead:"Fast & Responsive",usershead:"Built for collabs",uxhead:"User-Freindly",aihead:"Build Fast with AI",imexporthead:"Easy Import/Export"},th:{header:'สร้างสื่อ <span class="fancy-text">ในฝัน</span> ด้วย <span class="fancy-text">AI</span>.',rep:'ข้ามการทำสิ่ง<span class="fancy-text">ซ้ำ</span>',resp:"ทำได้อย่างรวดเร็ว",users:"แชร์ให้ทุกคนด้วยลิงก์เดียว",ux:"สร้างวิดีโอโดยไม่ต้องรู้เรื่องไฟล์",ai:"พิมพ์ความฝันคุณออกมาเป็นความจริง",imexport:"ส่งออกเป็น Powerpoint, OBJ, Image file และอีกมากมาย!",resphead:"รวดเร็ว",usershead:"สร้างเพื่อความสามัคคี",uxhead:"ง่ายต่อการใช้",aihead:"สร้างสื่อเร็วโดย AI",imexporthead:"นำเข้า/ส่งออกอย่างง่าย"}}),o=Ge(()=>t[i.language]);return Xe(()=>{let u=document.querySelector(".center"),s=[...Array(20).keys()].sort(()=>.5-Math.random());for(let a=0;a<18;a++){let l=document.createElement("div");l.classList.add("box"),l.style.minWidth="clamp(250px, 10vw, 310px)",l.style.height="clamp(125px, 10vw, 150px)",l.style.opacity="0",l.style.borderRadius="10px 10px",l.style.transform="rotateX(180deg)",l.style.backgroundColor="#222",l.style.border="1px solid white",l.innerHTML=s[a].toString(),console.log(fetch(`/video/${s[a]}`)),u==null||u.appendChild(l)}y({targets:".box",translateX:(a,l,c)=>`${(l-c/2)*-150}px`,translateY:(a,l,c)=>-(l*(Math.random()*50)%600),delay:y.stagger(100),scale:()=>2+Math.random()/4,rotateX:0,opacity:1})}),(u,s)=>(Te(),Ie("div",Or,[Ar,x("h1",{class:"big",innerHTML:o.value.header},null,8,Fr),Vr,Hr,x("div",jr,[x("div",zr,[x("h1",{innerHTML:o.value.rep,style:{"font-size":"4rem"}},null,8,Rr),x("p",{innerHTML:o.value.ux,style:{"font-size":"2rem"}},null,8,$r)]),Ur]),Wr,Nr,$(W,{heading:o.value.resphead,icon:"bolt"},{default:U(()=>[x("p",null,F(o.value.resp),1)]),_:1},8,["heading"]),$(W,{heading:o.value.usershead,icon:"users"},{default:U(()=>[x("p",null,F(o.value.users),1)]),_:1},8,["heading"]),$(W,{heading:o.value.uxhead,icon:"user-plus"},{default:U(()=>[x("p",null,F(o.value.ux),1)]),_:1},8,["heading"]),$(W,{heading:o.value.aihead,icon:"magic-wand-sparkles",rev:"true"},{default:U(()=>[x("p",null,F(o.value.ai),1)]),_:1},8,["heading"]),$(W,{heading:o.value.imexporthead,icon:"arrow-up-from-bracket",rev:"true"},{default:U(()=>[x("p",null,F(o.value.imexport),1)]),_:1},8,["heading"])]))}});const Jr=we(qr,[["__scopeId","data-v-55c2ea9f"]]);export{Jr as default};
