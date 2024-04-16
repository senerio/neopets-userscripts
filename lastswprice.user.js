// ==UserScript==
// @name         Neopets - Last SW Price
// @version      2024-04-15--2
// @description  Indicates your last SW/SSW search price on various pages
// @author       senerio
// @match        *://*.neopets.com/shops/wizard.phtml*
// @match        *://*.neopets.com/inventory.phtml
// @match        *://*.neopets.com/objects.phtml?*obj_type=*
// @match        *://*.neopets.com/browseshop.phtml?*owner=*
// @match        *://*.neopets.com/safetydeposit.phtml*
// @match        *://*.neopets.com/quickstock.phtml*
// @match        *://*.neopets.com/island/tradingpost.phtml*
// @match        *://*.neopets.com/auctions.phtml*
// @match        *://*.neopets.com/market.phtml*type=your*
// @match        *://*.neopets.com/market_your.phtml*
// @match        *://*.neopets.com/genie.phtml*
// @match        *://*.neopets.com/faerieland/darkfaerie.phtml*
// @match        *://*.neopets.com/medieval/earthfaerie.phtml*
// @match        *://*.neopets.com/winter/snowfaerie*.phtml*
// @match        *://*.neopets.com/island/kitchen*.phtml*
// @match        *://*.neopets.com/halloween/witchtower*.phtml*
// @match        *://*.neopets.com/halloween/esophagor*.phtml*
// @match        *://*.neopets.com/winter/igloo2.phtml*
// @match        *://*.neopets.com/donations.phtml*
// @match        *://*.neopets.com/halloween/garage.phtml*
// @match        *://*.neopets.com/thriftshoppe/index.phtml*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

// local storage

const priceStorage = {
    'key': 'np_lastsw',
    'get': function(name) {
        const items = JSON.parse(localStorage?.getItem(this.key)) || {};
        return name ? items[name] : items;
    },
    'set': function(name, price) {
        const items = priceStorage.get();
        items[name] = price;
        localStorage?.setItem(this.key, JSON.stringify(items));
    }
}

// pages

function markItems(page) {
    const intl = new Intl.NumberFormat();

    let itemNameObject;
    if(typeof(page.itemNameObject) == 'string') {
        itemNameObject = $(page.itemNameObject);
    }
    else {
        itemNameObject = page.itemNameObject;
    }

    itemNameObject.each(function() {
        const itemName = $(this);
        const price = priceStorage.get( itemName.text().split('(')[0].trim() );
        if(price) {
            const priceHTML = `<p style="font-size: x-small; color: #5088d1; margin: auto; white-space: nowrap;" class="np_price">SW: ${intl.format(price)} NP</p>`
            if(page.write) {
                page.write(itemName).append(priceHTML);
            }
            else {
                itemName.parent().append(priceHTML);
            }
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
        pageMatcher: /type=shop|donations/,
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
        itemNameObject: $('.content form>table').eq(1).find('tr:not(:first-child):not(:last-child) td:nth-child(2) > b')
    },
    {
        name: 'quick stock',
        pageMatcher: /quickstock/,
        itemNameObject: $('form[name=quickstock] tr:not(:nth-last-child(2)) td:first-child:not([colspan])'),
        write: (e) => { return e.parent().find('td:nth-of-type(2)'); }
    },
    {
        name: 'trading post',
        pageMatcher: /tradingpost/,
        itemNameObject: $('img[src*="/items/"]').parent(),
        write: (e) => { return e.parent().find('td:nth-of-type(2)'); }
    },
    {
        name: 'auctions',
        pageMatcher: /auctions|genie/,
        itemNameObject: $('.content a[href*=auction_id]:not(:has(img))'),
        write: (e) => { return e.parent().parent().find('td:nth-last-of-type(2)'); }
    },
    {
        name: 'shop stock',
        pageMatcher: /market/,
        itemNameObject: $('form table').eq(0).find('tbody > tr').slice(1, -1 - 2*$('#pin_field').length).find('td:first-child b'),
        write: (e) => { return e.eq(0).parent().parent().find('td:nth-of-type(5)'); }
    },
    {
        name: 'ingredients',
        pageMatcher: /snowfaerie|kitchen|witchtower|esophagor/,
        itemNameObject: $('.ingredient-grid p b')
    },
    {
        name: 'illusen',
        pageMatcher: /earthfaerie/,
        itemNameObject: $('#earth-container div+p b')
    },
    {
        name: 'jhudora',
        pageMatcher: /darkfaerie/,
        itemNameObject: $('#dark-container div+p b')
    },
    {
        name: 'igloo',
        pageMatcher: /igloo/,
        itemNameObject: $('form[name=items_for_sale] td b')
    },
    {
        name: 'attic',
        pageMatcher: /garage/,
        itemNameObject: $('#items li b')
    },
    {
        name: 'secondhand',
        pageMatcher: /thriftshoppe/,
        itemNameObject: $('.content table td a div:nth-child(2)')
    }
]

//////////////////////////////////////////////////////

const loc = window.location.href;

// Save SW price
if(loc.match(/shops\/wizard.phtml/) || $('#ssw-tabs').length) {
    $(document).on('ajaxSuccess', function(event, xhr, settings, data) {
        let itemName, itemPrice;

        // SW
        if(settings.url.includes('/np-templates/ajax/wizard.php')) {
            itemName = $('.wizard-results-text h3').text();
            itemPrice = $('.wizard-results-grid li > a').eq(0).attr('href')?.match(/(?<=buy_cost_neopoints=)\d+/)[0];
        }
        // SSW
        else if(settings.url.includes('/shops/ssw/ssw_query.php')) {
            itemName = data.req.item_name; // $('#search_for').text().match(/matching '(.*)'/)[1];
            itemPrice = data.data.prices[0]; // $('#ssw-tabs .plink').eq(0).attr('href')?.match(/(?<=buy_cost_neopoints=)\d+/)[0]
        }

        if (itemPrice) priceStorage.set(itemName, itemPrice);
    })
}

// Display last SW price
if(localStorage.hasOwnProperty(priceStorage.key)) {
    const page = pages.find((i) => {
        return loc.match(i.pageMatcher)
    });
    if( ['inventory'].includes(page?.name) ) { // for pages that fetch items with ajax call
        $(document).on('ajaxSuccess', function(event, xhr, settings, data) {
            if(settings.url.includes('/np-templates/ajax/inventory.php')) {
                markItems(page);
            }
        });
    }
    else if(page) {
        markItems(page);
    }
}
