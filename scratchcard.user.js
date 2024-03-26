// ==UserScript==
// @name         Neopets - Scratchcards
// @version      2024-02-18
// @description  Adds link back to kiosk, auto selects card from the dropdown
// @author       senerio
// @match        *://*.neopets.com/winter/kiosk*.phtml*
// @match        *://*.neopets.com/halloween/scratch*.phtml*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

const path = window.location.pathname;
if(path.includes('2')) {
    $('.content form input').before(`<p><a href="${path.replace('2','')}">Scratch again</a></p>`);
}
else {
    $('select[name=card_id] option').eq(1).prop('selected', true);
}
