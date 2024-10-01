// ==UserScript==
// @name         Neopets - Helper for JN SDB Price Checker
// @version      2024-10-01
// @description  Copy and paste once instead of 100+ times for Jellyneo's SDB price checker tool
// @author       senerio
// @match        *://*.neopets.com/safetydeposit.phtml*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

// local storage
const sdbStorage = {
    'key': 'np_sdb',
    'get': function() {
        const items = JSON.parse(localStorage?.getItem(this.key)) || [];
        return items;
    },
    'push': function(newItems) {
        const items = sdbStorage.get();
        localStorage?.setItem(this.key, JSON.stringify([...new Set([...items, ...newItems])]));
    },
    'delete': function() {
        localStorage?.removeItem(this.key);
    }
}

// save items on page
const ids = [];
$('.remove_safety_deposit').each((i,v) => {
    const id = $(v).attr('name').match(/back_to_inv\[(.*)\]/)[1];
    ids.push(id);
})
sdbStorage.push(ids);

// controls
const listHtml = sdbStorage.get().map(v => `<input name="back_to_inv[${v}]">`).join('\n')
$('.content').append(`
    <textarea style="float:right; width:50%; height: 50px; margin: 0 1em 2em 1em;"><html>free safety deposit box!\n${listHtml}\n</html></textarea>
    <a href="https://items.jellyneo.net/tools/sdb-price-checker/">🡲 https://items.jellyneo.net/tools/sdb-price-checker/</a>
    <br>`).append( $('<a href="#">🡲 clear SDB list?</a>').click(() => { sdbStorage.delete() }) )

// move to next page
//$('.content .pointer:contains("»")').eq(0).click()
