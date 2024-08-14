// ==UserScript==
// @name         Neopets - Wishing Well autofill
// @version      2024-08-11
// @description  Autofill donation amount and item name; no autofill if 7 wishes are done
// @author       senerio, Monfo
// @match        *://*.neopets.com/wishing.phtml*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

// Change the "item" variable to whichever item you'd like to wish for
const item = 'Snowager Stamp';

if ((!window.location.search && document.querySelector('.content').children[8].children.length === 1) || (window.location.search && document.querySelector('.content').children.length === 13)) {
    $('input[name=donation]').val('21');
    $('input[name=wish]').val(item);
};
