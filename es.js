var uhtmlHandlers=function(t){"use strict";const{isArray:e}=Array,r=({dataset:t})=>e=>{for(const r in e){const n=e[r];null==n?delete t[r]:t[r]=n}};return t.aria=t=>e=>{for(const r in e){const n="role"===r?r:`aria-${r}`,o=e[r];null==o?t.removeAttribute(n):t.setAttribute(n,o)}},t.attribute=(t,e)=>{let r,n=!0;const o=document.createAttributeNS(null,e);return e=>{r!==e&&(r=e,null==r?n||(t.removeAttributeNode(o),n=!0):(o.value=e,n&&(t.setAttributeNodeNS(o),n=!1)))}},t.boolean=(t,e,r)=>n=>{r!==!!n&&((r=!!n)?t.setAttribute(e,""):t.removeAttribute(e))},t.data=r,t.event=(t,r)=>{let n,o=r.slice(2);return!(r in t)&&r.toLowerCase()in t&&(o=o.toLowerCase()),r=>{const u=e(r)?r:[r,!1];n!==u[0]&&(n&&t.removeEventListener(o,n,u[1]),(n=u[0])&&t.addEventListener(o,n,u[1]))}},t.ref=t=>e=>{"function"==typeof e?e(t):e.current=t},t.setter=(t,e)=>"dataset"===e?r(t):r=>{t[e]=r},t.text=t=>{let e;return r=>{e!=r&&(e=r,t.textContent=null==r?"":r)}},t}({});
