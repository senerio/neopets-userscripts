// ==UserScript==
// @name         Neopets - Mark Stamps Collected
// @version      2024-07-12
// @description  Mark stamps collected in various pages
// @author       senerio
// @match        *://*.neopets.com/stamps.phtml?*type=*
// @match        *://*.neopets.com/inventory.phtml
// @match        *://*.neopets.com/objects.phtml?*obj_type=*
// @match        *://*.neopets.com/browseshop.phtml?*owner=*
// @match        *://*.neopets.com/safetydeposit.phtml*
// @match        *://*.neopets.com/quickstock.phtml*
// @match        *://*.neopets.com/island/tradingpost.phtml*
// @match        *://*.neopets.com/auctions.phtml*
// @match        *://*.neopets.com/genie.phtml*
// @run-at       document-end
// ==/UserScript==

//////////////////////////////////////////////////////
// INSTRUCTIONS
// 1. Visit all album pages: https://www.neopets.com/stamps.phtml?type=progress
// 2. If you want to clear the saved data, click the reset button, top right of the album pages
//////////////////////////////////////////////////////

const itemStorage = {
    'key': 'np_stampscollected',
    'get': function() {
        return JSON.parse(localStorage?.getItem(this.key)) || [];
    },
    'add': function(arr) {
        const collection = itemStorage.get().concat(arr);
        localStorage?.setItem(this.key, JSON.stringify(collection));
    },
    'clear': function() {
        localStorage?.removeItem(this.key);
    }
}

const collectionPage = {
    'updateTotalDisplay': () => {
        $('#np_total').text(`(Total: ${itemStorage.get().length})`);
    },
    'deleteData': function() {
        itemStorage.clear();
        this.updateTotalDisplay();
    },
    'storeItemsPresent': function() {
        const itemsStored = itemStorage.get();
        const itemsPresent = $('.content table img[alt]:not([alt="No Stamp"])').toArray().map(e => e.title);
        const itemsNew = itemsPresent.filter(i => !itemsStored.includes(i));
        if(itemsNew.length) {
            itemStorage.add(itemsNew);
            collectionPage.updateTotalDisplay();
        }
    },
    'displayInitialize': function() {
        // delete data button
        $('.content').prepend(
            $('<span id="np_clear" style="font-size: xx-large; color: #c2301d; font-weight: bold; cursor: pointer; line-height: 0.5em; float: right;">⟲</span>')
            .click(this.deleteData.bind(this))
        );
        // counter
        $('.content b:contains("Neopian Post Office")').after(` <span id="np_total"></span>`);
        this.updateTotalDisplay();
    }
}

// functions for pages with items to mark as obtained ////

function markItems(elementsWithItemName, table = false) {
    elementsWithItemName.each(function() {
        const itemName = $(this);
        const isObtained = itemStorage.get().includes( itemName.text().split('(')[0].trim() )
        console.log(isObtained)
        if(isObtained) {
            itemName.css('text-decoration', 'line-through');
            itemName.parent().css('opacity', '50%');
            if(table) itemName.parent().parent().find('img').eq(0).css('opacity', '50%');
        }
    });
}

const pages = [
    {
        name: 'inventory',
        pageMatcher: /inventory/,
        itemNameObject: '.item-name'
    },
    {
        name: 'neopian shop',
        pageMatcher: /type=shop/,
        itemNameObject: $('.item-name')
    },
    {
        name: 'user shop',
        pageMatcher: /browseshop/,
        itemNameObject: $('a[href*=buy_item] + br + b')
    },
    {
        name: 'sdb',
        pageMatcher: /safetydeposit/,
        itemNameObject: $('.content form>table').eq(1).find('tr:not(:first-child):not(:last-child) td:nth-child(2) > b'),
        table: true
    },
    {
        name: 'quick stock',
        pageMatcher: /quickstock/,
        itemNameObject: $('form[name=quickstock] tr:not(:nth-last-child(2)) td:first-child:not([colspan])'),
        table: true
    },
    {
        name: 'trading post',
        pageMatcher: /tradingpost/,
        itemNameObject: $('img[src*="/items/"]').parent()
    },
    {
        name: 'auctions',
        pageMatcher: /auctions|genie/,
        itemNameObject: $('.content a[href*=auction_id]:not(:has(img))'),
        table: true
    }
]

//////////////////////////////////////////////////////

const loc = window.location.href;
if(loc.includes('stamps')) {
    collectionPage.displayInitialize();
    if(loc.includes('type=album') && !loc.includes('page_id=0')) {
        collectionPage.storeItemsPresent();
    }
}
else if(!loc.match('stamps') && localStorage.hasOwnProperty(itemStorage.key)) {
    const page = pages.find((i) => loc.match(i.pageMatcher));
    if( !['inventory'].includes(page.name) ) {
       // for pages that fetch items with ajax call
       $(document).on('ajaxSuccess', () => {
           markItems($(page.itemNameObject));
       });
    }
    else {
        markItems(page.itemNameObject);
    }
}
