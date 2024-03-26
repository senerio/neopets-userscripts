// ==UserScript==
// @name         Neopets - Inventory Divider
// @version      2024-03-25
// @description  Separate auctioned/trading items in your inventory
// @author       senerio
// @match        *://*.neopets.com/inventory.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

function separateActiveItems() {
    const activeItems = $( ['auctioned', 'trading'].map(i => { return `.item-subname:contains("${i}"):visible` }).join(',') );
    const itemGrid = $('.item-grid:visible');
    if(activeItems.length && (itemGrid.children().length - activeItems.length)) {
        itemGrid.after('<hr style="color: #e6e4dd; border-style: solid;"><div class="itemgrid7__2020 item-grid activeItemsContainer"></div>');
        activeItems.each((i,e) => { $(e).parent().appendTo($('.activeItemsContainer:visible')) });
    }
}

$(document).on('ajaxSuccess', () => {
    separateActiveItems();
});