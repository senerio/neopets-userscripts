// ==UserScript==
// @name         Neopets - Mark NeoDeck Cards Owned
// @version      2026-04-14
// @description  Mark NeoDeck cards owned in: inventory, neopian shops, user shops, sdb, quick stock, trading post, auctions
// @author       senerio
// @match        *://*.neopets.com/games/neodeck/index.phtml?*show=cards
// @match        *://*.neopets.com/inventory.phtml
// @match        *://*.neopets.com/objects.phtml?*obj_type=*
// @match        *://*.neopets.com/browseshop.phtml?*owner=*
// @match        *://*.neopets.com/safetydeposit.phtml*
// @match        *://*.neopets.com/quickstock.phtml*
// @match        *://*.neopets.com/island/tradingpost.phtml*
// @match        *://*.neopets.com/auctions.phtml*
// @match        *://*.neopets.com/genie.phtml*
// @match        *://*.neopets.com/generalstore.phtml*
// @match        *://items.jellyneo.net/search/*
// @connect      itemdb.com.br
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

//////////////////////////////////////////////////////
// INSTRUCTIONS
// 1. Visit your NeoDeck "My Cards" page whenever you'd like to update
//    - https://www.neopets.com/games/neodeck/index.phtml?show=cards
// 2. If you want to clear the saved data, click the reset button, top right of the cards page
//////////////////////////////////////////////////////

// functions ////////////////////
const itemsStorage = {
    'key': 'np_neodeck',
    'get': function() {
        return JSON.parse(localStorage?.getItem(this.key)) || {};
    },
    'set': function(arr) {
        localStorage?.setItem(this.key, JSON.stringify(arr));
    },
    'all': function() {
        const items = this.get();
        return items;
    }
}

const itemsPage = {
    'updateItemCount': () => {
        const items = itemsStorage.get();
        $('#np_items_count').text(`(${items.length || 0})`);
    },
    'deleteData': function() {
        itemsStorage.set([]);
        this.updateItemCount();
    },
    'storeItemsOnPage': async function() {
        const itemsOnPage = $(".content table tr tr:first-child b").map( (_,e) => $(e).text().trim() ).get();
        itemsStorage.set(itemsOnPage);
        this.updateItemCount();
    },
    'displayInitialize': function() {
        // delete data button (only for specific page)
        $('.content').prepend(
            $('<span id="np_items_clear" style="font-size: xx-large; color: #c2301d; font-weight: bold; cursor: pointer; line-height: 0.5em; float: right;">⟲</span>')
            .click(this.deleteData.bind(this))
        );
        // counter
        $('.content > b:first-of-type').after(` <span id="np_items_count"></span>`);
        this.updateItemCount();
    }
}

// functions for pages with items to mark ////

function markItems(elementsWithItemName, table = false) {
    elementsWithItemName.each(function() {
        const itemName = $(this);
        const isStored = itemsStorage.all().includes( itemName.text().split('(')[0].trim() )
        if(isStored) {
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
        itemNameObject: '.item-name-text'
    },
    {
        name: 'auctions',
        pageMatcher: /auctions|genie/,
        itemNameObject: $('.content a[href*=auction_id]:not(:has(img))'),
        table: true
    },
    {
        name: 'general store',
        pageMatcher: /generalstore/,
        itemNameObject: $(".contentModule:has(td.contentModuleHeader:contains('Books')) .contentModuleContent .item-title"),
        table: true
    },
    {
        name: 'Jellyneo Search',
        pageMatcher: /jellyneo.*search/,
        itemNameObject: '.jnflex-grid p a.no-link-icon:nth-of-type(2)',
        table: false
    }
]

//////////////////////////////////////////////////////

const loc = window.location;
if (loc.href.match(/neodeck.*show=cards/) && (
    !new URLSearchParams(loc.search).has("owner") ||
    new URLSearchParams(loc.search).get("owner") == $('.user a').eq(0).text()
  )) {
    itemsPage.displayInitialize();
    itemsPage.storeItemsOnPage();
}
else if(!loc.href.match(/neodeck.*show=cards/) && localStorage.hasOwnProperty(itemsStorage.key)) {
    console.log('1');
    const page = pages.find((i) => {
        return loc.href.match(i.pageMatcher)
    });
    if( ['inventory', 'trading post'].includes(page.name) ) { // for pages that fetch items with xhr
        new MutationObserver(() => { markItems($(page.itemNameObject)); })
            .observe(document.body, { childList: true, subtree: true });
    }
    else {
        markItems(page.itemNameObject);
    }
}
