// ==UserScript==
// @name         Neopets - Neoboards external links
// @version      2024-02-17
// @description  Adds anchor tags to external site links without them
// @author       senerio
// @match        *://*.neopets.com/neoboards/topic.phtml?topic=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

function attachLink(regex, e) {
    const newHtml = $(e).html().replace(regex, '<a href="https://$1">$1</a>')
    $(e).html(newHtml);
}

$('.boardPostMessage:contains("openneo.net")').each(function(e) { attachLink(/(impress(-2020)?\.openneo\.net\/[\w\/\-_?=&~]*)/g, this) })
