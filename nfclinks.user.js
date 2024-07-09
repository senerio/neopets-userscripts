// ==UserScript==
// @name         Neopets - NeoFood.Club Quick Links
// @version      2024-06-27
// @description  Add bank and fc links to NFC pages. Also hides other edit buttons.
// @author       senerio
// @match        https://neofood.club/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

setTimeout(function() {
  const style = 'padding-left: 2em; color: #fbb900; font-size: smaller; font-weight: bolder;'
  const nodeNew = Object.assign(document.createElement('div'), {innerHTML: `
<a style="${style}" target="_blank" href="https://www.neopets.com/pirates/foodclub.phtml?type=bet">CHECK MAX BET</a>
<a style="${style}" target="_blank" href="https://www.neopets.com/bank.phtml">BANK</a>
<a style="${style}" target="_blank" href="https://www.neopets.com/pirates/foodclub.phtml?type=collect">COLLECT</a>
<a style="${style}" target="_blank" href="https://www.neopets.com/pirates/foodclub.phtml?type=current_bets">CURRENT BETS</a>
`});
  const nodeRef = document.getElementsByTagName('header')[0].nextSibling.children[0];
  nodeRef.children[0].remove();
  nodeRef.append(nodeNew);
}, 500);