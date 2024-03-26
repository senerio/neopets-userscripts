// ==UserScript==
// @name         Neopets - rightclick-able Quest Log button
// @version      2024-02-15
// @description  Adds an anchor for links that cannot be middle/right clicked
// @author       senerio
// @match        *://*.neopets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

$('.nav-quest-icon__2020').append('<a href="/questlog/" style="position: absolute; inset: 0;"></a>')
