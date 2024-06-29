// ==UserScript==
// @name         Neopets - Neoboards links
// @version      2024-06-02
// @description  Adds clickable link to unanchored site URLs
// @author       senerio
// @match        *://*.neopets.com/neoboards/topic.phtml?topic=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

function attachLink(regex, e) {
    const url = $(e).text().match(regex);
    const urlEncoded = $('<textarea/>').text(url).html();
    const newHtml = $(e).html().replace(urlEncoded, `<a href="https://${url}">${urlEncoded}</a>`);
    $(e).html(newHtml);
}

$('.boardPostMessage:contains("openneo.net")').each(function(e) { attachLink(/(impress(-2020)?\.openneo\.net\/[\w\/\-_?=&;~\.]*)/g, this) })
$('.boardPostMessage:contains("neopets.com")').each(function(e) { attachLink(/((www\.)?neopets\.com\/[\w\/\-_?=&;~\.]*)/g, this) })
