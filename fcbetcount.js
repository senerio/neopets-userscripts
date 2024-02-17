// ==UserScript==
// @name         Neopets - Food Club bet count
// @version      2024-01-24
// @description  Quickly confirm that 10 bets have been made
// @author       senerio
// @match        *://*.neopets.com/pirates/foodclub.phtml?type=current_bets
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

const count = $('.content table tr[bgcolor=white]').length - 1;
$('.content table tr[bgcolor=darkred] b').text(`Current Bets (${count})`);
