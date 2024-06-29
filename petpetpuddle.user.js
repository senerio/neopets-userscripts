// ==UserScript==
// @name         Neopets - Petpet Puddle
// @version      2024-05-15
// @description  Fix page display with many petpets
// @author       senerio
// @match        *://*.neopets.com/pool/puddle.phtml
// @match        *://*.neopets.com/petpetlab.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

$('.content table').wrap('<div style="overflow-x: auto; width: 790px; margin: auto;"></div>');
