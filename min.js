var uhtmlHandlers=function(t){"use strict";var n=Array.isArray,e=function(t){var n=t.dataset;return function(t){for(var e in t){var r=t[e];null==r?delete n[e]:n[e]=r}}};return t.aria=function(t){return function(n){for(var e in n){var r="role"===e?e:"aria-".concat(e),u=n[e];null==u?t.removeAttribute(r):t.setAttribute(r,u)}}},t.attribute=function(t,n){var e,r=!0,u=document.createAttributeNS(null,n);return function(n){e!==n&&(null==(e=n)?r||(t.removeAttributeNode(u),r=!0):(u.value=n,r&&(t.setAttributeNodeNS(u),r=!1)))}},t.boolean=function(t,n,e){return function(r){e!==!!r&&((e=!!r)?t.setAttribute(n,""):t.removeAttribute(n))}},t.data=e,t.event=function(t,e){var r,u=e.slice(2);return!(e in t)&&e.toLowerCase()in t&&(u=u.toLowerCase()),function(e){var i=n(e)?e:[e,!1];r!==i[0]&&(r&&t.removeEventListener(u,r,i[1]),(r=i[0])&&t.addEventListener(u,r,i[1]))}},t.ref=function(t){var n;return function(e){n!==e&&(n=e,"function"==typeof e?e(t):e.current=t)}},t.setter=function(t,n){return"dataset"===n?e(t):function(e){t[n]=e}},t.text=function(t){var n;return function(e){n!=e&&(n=e,t.textContent=null==e?"":e)}},t}({});