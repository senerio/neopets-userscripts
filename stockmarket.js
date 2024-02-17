// ==UserScript==
// @name         Neopets - Stock Market autofill
// @version      2024-02-17
// @description  Picks any stock at the cheapest price
// @author       senerio
// @match        *://*.neopets.com/stockmarket.phtml?type=buy
// @match        *://*.neopets.com/stockmarket.phtml?*type=list*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

if(window.location.search.includes('buy')) {
    $('input[name=amount_shares]').val('1000');
    $('input[name=ticker_symbol]').val(localStorage?.getItem('np_ticker'));
}

if(window.location.search.includes('list')) {
    const price = $('.perkbar').length ? 10 : 15;
    const ticker = $(`.content table tr td:nth-child(6):contains(${price})`).eq(-1).parent().find('td:nth-child(2)').text() || 'none';
    $('.content table').before(`<p style="text-align:center;">${ticker} selected</p>`);
    localStorage?.setItem('np_ticker', ticker);
}

// document.querySelectorAll('.content table tr').forEach(i => { if(i.children[5].innerText == targetPrice) { ticker.push(i.children[1].innerText.match('.{4}')[0]) } });
