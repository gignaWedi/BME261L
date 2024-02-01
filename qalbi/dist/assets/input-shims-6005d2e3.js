import{K as _,d as C,e as M,a as N,f as O,g as k,h as F,j as H,k as U}from"./index-49d5432f.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const b=new WeakMap,g=(e,s,t,o=0,i=!1)=>{b.has(e)!==t&&(t?$(e,s,o,i):q(e,s))},Y=e=>e===e.getRootNode().activeElement,$=(e,s,t,o=!1)=>{const i=s.parentNode,a=s.cloneNode(!1);a.classList.add("cloned-input"),a.tabIndex=-1,o&&(a.disabled=!0),i.appendChild(a),b.set(e,a);const r=e.ownerDocument.dir==="rtl"?9999:-9999;e.style.pointerEvents="none",s.style.transform="translate3d(".concat(r,"px,").concat(t,"px,0) scale(0)")},q=(e,s)=>{const t=b.get(e);t&&(b.delete(e),t.remove()),e.style.pointerEvents="",s.style.transform=""},x=50,G=(e,s,t)=>{if(!t||!s)return()=>{};const o=r=>{Y(s)&&g(e,s,r)},i=()=>g(e,s,!1),a=()=>o(!0),d=()=>o(!1);return C(t,"ionScrollStart",a),C(t,"ionScrollEnd",d),s.addEventListener("blur",i),()=>{M(t,"ionScrollStart",a),M(t,"ionScrollEnd",d),s.removeEventListener("blur",i)}},I="input, textarea, [no-blur], [contenteditable]",W=()=>{let e=!0,s=!1;const t=document,o=()=>{s=!0},i=()=>{e=!0},a=d=>{if(s){s=!1;return}const r=t.activeElement;if(!r||r.matches(I))return;const c=d.target;c!==r&&(c.matches(I)||c.closest(I)||(e=!1,setTimeout(()=>{e||r.blur()},50)))};return C(t,"ionScrollStart",o),t.addEventListener("focusin",i,!0),t.addEventListener("touchend",a,!1),()=>{M(t,"ionScrollStart",o,!0),t.removeEventListener("focusin",i,!0),t.removeEventListener("touchend",a,!1)}},j=.3,z=(e,s,t)=>{var o;const i=(o=e.closest("ion-item,[ion-item]"))!==null&&o!==void 0?o:e;return V(i.getBoundingClientRect(),s.getBoundingClientRect(),t,e.ownerDocument.defaultView.innerHeight)},V=(e,s,t,o)=>{const i=e.top,a=e.bottom,d=s.top,r=Math.min(s.bottom,o-t),c=d+15,f=r-x-a,u=c-i,S=Math.round(f<0?-f:u>0?-u:0),L=Math.min(S,i-d),D=Math.abs(L)/j,n=Math.min(400,Math.max(150,D));return{scrollAmount:L,scrollDuration:n,scrollPadding:t,inputSafeY:-(i-c)+4}},p="$ionPaddingTimer",P=(e,s,t)=>{const o=e[p];o&&clearTimeout(o),s>0?e.style.setProperty("--keyboard-offset","".concat(s,"px")):e[p]=setTimeout(()=>{e.style.setProperty("--keyboard-offset","0px"),t&&t()},120)},R=(e,s,t)=>{const o=()=>{s&&P(s,0,t)};e.addEventListener("focusout",o,{once:!0})};let w=0;const B="data-ionic-skip-scroll-assist",J=(e,s,t,o,i,a,d,r=!1)=>{const c=a&&(d===void 0||d.mode===k.None),l=async()=>{if(s.hasAttribute(B)){s.removeAttribute(B);return}Q(e,s,t,o,i,c,r)};return e.addEventListener("focusin",l,!0),()=>{e.removeEventListener("focusin",l,!0)}},T=e=>{document.activeElement!==e&&(e.setAttribute(B,"true"),e.focus())},Q=async(e,s,t,o,i,a,d=!1)=>{if(!t&&!o)return;const r=z(e,t||o,i);if(t&&Math.abs(r.scrollAmount)<4){T(s),a&&t!==null&&(P(t,w),R(s,t,()=>w=0));return}if(g(e,s,!0,r.inputSafeY,d),T(s),F(()=>e.click()),a&&t&&(w=r.scrollPadding,P(t,w)),typeof window<"u"){let c;const l=async()=>{c!==void 0&&clearTimeout(c),window.removeEventListener("ionKeyboardDidShow",f),window.removeEventListener("ionKeyboardDidShow",l),t&&await U(t,0,r.scrollAmount,r.scrollDuration),g(e,s,!1,r.inputSafeY),T(s),a&&R(s,t,()=>w=0)},f=()=>{window.removeEventListener("ionKeyboardDidShow",f),window.addEventListener("ionKeyboardDidShow",l)};if(t){const u=await H(t),S=u.scrollHeight-u.clientHeight;if(r.scrollAmount>S-u.scrollTop){s.type==="password"?(r.scrollAmount+=x,window.addEventListener("ionKeyboardDidShow",f)):window.addEventListener("ionKeyboardDidShow",l),c=setTimeout(l,1e3);return}}l()}},X=!0,ee=async(e,s)=>{const t=document,o=s==="ios",i=s==="android",a=e.getNumber("keyboardHeight",290),d=e.getBoolean("scrollAssist",!0),r=e.getBoolean("hideCaretOnScroll",o),c=e.getBoolean("inputBlurring",o),l=e.getBoolean("scrollPadding",!0),f=Array.from(t.querySelectorAll("ion-input, ion-textarea")),u=new WeakMap,S=new WeakMap,L=await _.getResizeMode(),A=async n=>{await new Promise(h=>N(n,h));const v=n.shadowRoot||n,m=v.querySelector("input")||v.querySelector("textarea"),y=O(n),K=y?null:n.closest("ion-footer");if(!m)return;if(y&&r&&!u.has(n)){const h=G(n,m,y);u.set(n,h)}if(!(m.type==="date"||m.type==="datetime-local")&&(y||K)&&d&&!S.has(n)){const h=J(n,m,y,K,a,l,L,i);S.set(n,h)}},D=n=>{if(r){const v=u.get(n);v&&v(),u.delete(n)}if(d){const v=S.get(n);v&&v(),S.delete(n)}};c&&X&&W();for(const n of f)A(n);t.addEventListener("ionInputDidLoad",n=>{A(n.detail)}),t.addEventListener("ionInputDidUnload",n=>{D(n.detail)})};export{ee as startInputShims};
