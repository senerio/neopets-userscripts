// ==UserScript==
// @name         Neopets - Obelisk
// @version      2024-03-06
// @description  Handle getting stuck after joining an Obelisk faction
// @author       senerio
// @match        *://*.neopets.com/prehistoric/battleground/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

const obeliskScript = document.querySelector('#pageDesc + style + script');
const newObeliskScript = obeliskScript.innerHTML.replace('_gaq.push(["_trackEvent", "battleground", "joined-faction", faction]);', '')
obeliskScript.remove();
document.body.appendChild(Object.assign(document.createElement("script"), { innerHTML: newObeliskScript }));
