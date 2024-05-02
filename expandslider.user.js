// ==UserScript==
// @name         Neopets - Expand Slider
// @version      2024-05-02
// @description  Remove scrolling, view all results at once
// @author       senerio
// @match        *://*.neopets.com/freebies/*
// @match        *://*.neopets.com/lab2.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
#bxlist {
  width: auto !important;
  transform: none !important;
}
.bx-viewport {
  overflow: auto !important;
  height: auto !important;
}
.bx-clone, .bx-controls {
  display: none;
}
br:has(+input) {
  line-height: 0.25em;
}
`);