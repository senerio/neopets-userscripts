// ==UserScript==
// @name         Neopets - Wishing Well autofill
// @version      2024-02-12
// @description  Autofill donation amount and item name
// @author       senerio
// @match        *://*.neopets.com/wishing.phtml*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

$('input[name=donation]').val('21');
$('input[name=wish]').val('Neopets 24th Birthday Goodie Bag');
