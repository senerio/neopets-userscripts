// ==UserScript==
// @name         Neopets - Mark Books Read
// @version      2024-03-25
// @description  Mark books read in: inventory, neopian shops, user shops, sdb, quick stock, trading post, auctions
// @author       senerio
// @match        *://*.neopets.com/books_read.phtml?pet_name=*
// @match        *://*.neopets.com/moon/books_read.phtml?pet_name=*
// @match        *://*.neopets.com/inventory.phtml
// @match        *://*.neopets.com/objects.phtml?*obj_type=*
// @match        *://*.neopets.com/browseshop.phtml?*owner=*
// @match        *://*.neopets.com/safetydeposit.phtml*
// @match        *://*.neopets.com/quickstock.phtml*
// @match        *://*.neopets.com/island/tradingpost.phtml*
// @match        *://*.neopets.com/auctions.phtml*
// @match        *://*.neopets.com/genie.phtml*
// @connect      itemdb.com.br
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

//////////////////////////////////////////////////////
// INSTRUCTIONS
// 1. Set reader name
const petName = '';
// 2. Visit pet's books read pages
//    - https://www.neopets.com/books_read.phtml?pet_name=
//    - https://www.neopets.com/moon/books_read.phtml?pet_name=
// 3. If you want to clear the saved data, click the reset button, top right of the books read pages
//////////////////////////////////////////////////////

// functions for books read pages ////////////////////

function itemdbGetItemName(array) { // SMH BOOKTASTIC BOOKS PAGE WHY NO BOOK NAME / SMH QUICK STOCK WHY NO ITEM IMG
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'https://itemdb.com.br/api/v1/items/many',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
                image_id: array
            }),
            onload: function (res) {
                if (res.status === 200) {
                    const itemData = [];
                    Object.entries(JSON.parse(res.responseText)).forEach(([k,v]) => { itemData.push(v.name); });
                    resolve(itemData);
                    return console.log('[itemdb] Fetched item data');
                }
                else {
                    const msg = '[itemdb] Failed to fetch item data';
                    return console.error(msg, res);
                }
            },
            onerror: function (err) {
                reject(err);
            }
        });
    });
}

const booksReadStorage = {
    'key': 'np_booksread',
    'get': function() {
        return JSON.parse(localStorage?.getItem(this.key)) || {};
    },
    'set': function(arr) { // [ {books, key, append} ]
        const books = booksReadStorage.get();
        arr.forEach(i => {
            if(!i.append) { books[i.key] = []; }
            (books[i.key] ??= []).push(...i.books);
        })
        localStorage?.setItem(this.key, JSON.stringify(books));
    },
    'all': function() {
        const books = this.get();
        return [...books.neopian, ...books.booktastic];
    }
}

const booksReadPage = {
    'type': window.location.pathname.includes('moon') ? 'booktastic' : 'neopian',
    'updateBookCount': () => {
        const books = booksReadStorage.get();
        $('#np_booksread_count').text(`(${books.neopian?.length || 0} Neopian, ${books.booktastic?.length || 0} Booktastic)`);
    },
    'deleteData': function() {
        const arr = [{
            books: [],
            key: this.type,
            append: false
        }];
        if(this.type == 'booktastic') {
            arr.push({ ...arr[0], key: arr[0].key.concat('Img') });
        }
        booksReadStorage.set(arr);
        this.updateBookCount();
    },
    'storeBooksOnPage': async function() {
        const booksStored = booksReadStorage.get();
        const bookRows = $(".content table tr:not(:first-child)")
        if (bookRows.length == booksStored[this.type]?.length) { return; }
        // proceed if needs updating
        let booksOnPage = [];
        const arr = []
        if(this.type == 'neopian') {
            bookRows.find('td:last-child').each((i,e) => {
                booksOnPage.push( $(e).text().split(':').at(0) );
            })
            booksReadStorage.set([{
                books: booksOnPage,
                key: 'neopian',
                append: false
            }]);
        }
        else if(this.type == 'booktastic') {
            bookRows.find('img').each((i,e) => {
                booksOnPage.push( $(e).attr('src').match(/.*\/(.*)\..*/).at(-1) );
            })
            const newBooks = booksOnPage.filter((i)=>{ return !booksStored.booktasticImg?.includes(i) });
            booksReadStorage.set([
                {
                    books: booksOnPage,
                    key: 'booktasticImg',
                    append: false
                },
                {
                    books: await itemdbGetItemName(newBooks),
                    key: 'booktastic',
                    append: true
                }
            ]);
        }
        this.updateBookCount();
    },
    'displayInitialize': function() {
        // delete data button (only for specific page)
        $('.content').prepend(
            $('<span id="np_booksread_clear" style="font-size: xx-large; color: #c2301d; font-weight: bold; cursor: pointer; line-height: 0.5em; float: right;">⟲</span>')
            .click(this.deleteData.bind(this))
        );
        // counter
        $('.content > b:first-of-type').after(` <span id="np_booksread_count"></span>`);
        this.updateBookCount();
    }
}

// functions for pages with books to mark as read ////

function markBooks(elementsWithItemName, table = false) {
    elementsWithItemName.each(function() {
        const itemName = $(this);
        const isRead = booksReadStorage.all().includes( itemName.text().split('(')[0].trim() )
        if(isRead) {
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
if(loc.match(/books_read/) && loc.includes(petName)) {
    booksReadPage.displayInitialize();
    booksReadPage.storeBooksOnPage();
}
else if(!loc.match(/books_read/) && localStorage.hasOwnProperty(booksReadStorage.key)) {
    const page = pages.find((i) => {
        return loc.match(i.pageMatcher)
    });
    if( ['inventory'].includes(page.name) ) { // for pages that fetch items with ajax call
       $(document).on('ajaxSuccess', () => {
           markBooks($(page.itemNameObject));
       });
    }
    else {
        markBooks(page.itemNameObject);
    }
}
