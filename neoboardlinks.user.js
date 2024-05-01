// ==UserScript==
// @name         Neopets - Neoboards Links
// @version      2024-05-01
// @description  Adds clickable link to unanchored to site URLs
// @author       senerio
// @match        *://*.neopets.com/neoboards/topic.phtml?topic=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

function attachLink(regex, e) {
    const newHtml = $(e).html().replace(regex, '<a href="https://$1">$1</a>')
    $(e).html(newHtml);
}

$('.boardPostMessage:contains("openneo.net")').each(function(e) { attachLink(/(impress(-2020)?\.openneo\.net\/[\w\/\-_?=&~\.]*)/g, this) })
$('.boardPostMessage:contains("neopets.com")').each(function(e) { attachLink(/((www\.)?neopets\.com\/[\w\/\-_?=&~\.]*)/g, this) })
