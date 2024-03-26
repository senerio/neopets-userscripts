// ==UserScript==
// @name         Neopets - NeoFood.Club quick links
// @version      2024-01-21
// @description  Add bank and fc links to NFC pages. Also hides other edit buttons.
// @author       senerio
// @match        https://neofood.club/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

const style = 'padding: 0.5em 1em; background-color: rgb(26, 32, 44); color: rgb(232, 232, 234); border-radius: 0.5em; text-transform: uppercase; font-size: smaller; font-weight: bolder;'
const nodeNew = Object.assign(document.createElement('div'), {innerHTML: `
  <a style="${style}" target="_blank" href="https://www.neopets.com/pirates/foodclub.phtml?type=bet">Check max bet</a>
  <a style="${style}" target="_blank" href="https://www.neopets.com/bank.phtml">Bank</a>
  <a style="${style}" target="_blank" href="https://www.neopets.com/pirates/foodclub.phtml?type=collect">Collect</a>
  <a style="${style}" target="_blank" href="https://www.neopets.com/pirates/foodclub.phtml?type=current_bets">Current bets</a>
`});
const nodeRef = document.getElementsByTagName('header')[0].nextSibling.children[0].children[0].children[0];
nodeRef.appendChild(nodeNew);
nodeRef.children[1].style = 'display: none';
nodeRef.children[0].children[0].style = 'display: none';
