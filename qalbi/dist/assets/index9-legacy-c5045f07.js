System.register(["./index-legacy-609e1cb8.js"],(function(e,t){"use strict";var n,o;return{setters:[e=>{n=e.n,o=e.p}],execute:function(){e("startTapClick",(e=>{let l,u,v,f=10*-d,p=0;const m=e.getBoolean("animated",!0)&&e.getBoolean("rippleEffect",!0),L=new WeakMap,h=e=>{f=n(e),g(e)},w=()=>{v&&clearTimeout(v),v=void 0,l&&(R(!1),l=void 0)},E=e=>{l||T(t(e),e)},g=e=>{T(void 0,e)},T=(e,t)=>{if(e&&e===l)return;v&&clearTimeout(v),v=void 0;const{x:n,y:i}=o(t);if(l){if(L.has(l))throw new Error("internal error");l.classList.contains(a)||y(l,n,i),R(!0)}if(e){const t=L.get(e);t&&(clearTimeout(t),L.delete(e)),e.classList.remove(a);const o=()=>{y(e,n,i),v=void 0};s(e)?o():v=setTimeout(o,r)}l=e},y=(e,t,n)=>{if(p=Date.now(),e.classList.add(a),!m)return;const o=i(e);null!==o&&(b(),u=o.addRipple(t,n))},b=()=>{void 0!==u&&(u.then((e=>e())),u=void 0)},R=e=>{b();const t=l;if(!t)return;const n=c-Date.now()+p;if(e&&n>0&&!s(t)){const e=setTimeout((()=>{t.classList.remove(a),L.delete(t)}),c);L.set(t,e)}else t.classList.remove(a)},S=document;S.addEventListener("ionGestureCaptured",w),S.addEventListener("touchstart",(e=>{f=n(e),E(e)}),!0),S.addEventListener("touchcancel",h,!0),S.addEventListener("touchend",h,!0),S.addEventListener("pointercancel",w,!0),S.addEventListener("mousedown",(e=>{if(2===e.button)return;const t=n(e)-d;f<t&&E(e)}),!0),S.addEventListener("mouseup",(e=>{const t=n(e)-d;f<t&&g(e)}),!0)}));
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
const t=e=>{if(void 0===e.composedPath)return e.target.closest(".ion-activatable");{const t=e.composedPath();for(let e=0;e<t.length-2;e++){const n=t[e];if(!(n instanceof ShadowRoot)&&n.classList.contains("ion-activatable"))return n}}},s=e=>e.classList.contains("ion-activatable-instant"),i=e=>{if(e.shadowRoot){const t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")},a="ion-activated",r=100,c=150,d=2500}}}));
