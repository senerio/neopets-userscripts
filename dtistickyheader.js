// ==UserScript==
// @name         Neopets - DTI closet sticky header
// @description  On a user's DTI closet, keep the section header visible while scrolling.
// @version      2024-01-15
// @author       senerio
// @match        https://impress.openneo.net/user/*/closet
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`.closet-list header {
  position: sticky !important;
  top: 0;
  z-index: 1;
  background-color: rgba(255,255,255,0.75);
}`);
