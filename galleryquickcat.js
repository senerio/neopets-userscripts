// ==UserScript==
// @name         Neopets - Gallery quickcat
// @version      2024-02-11
// @description  For easier management of uncategorized gallery items
// @author       senerio
// @match        *://*.neopets.com/gallery/quickcat.phtml?set_to_cat=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

function hideCategorized() {
    const rows = $('form[name=quickcat_form] table tr[bgcolor] td:last-child:not(:contains("0"))')
    const isHidden = rows.eq(0).parent().prop('style').display == 'none'
    rows.each((i,e) => {
        $(e).parent().attr('style', `display: ${isHidden ? 'table-row' : 'none'};`)
    })
}
function selectUncategorized() {
    const rows = $('form[name=quickcat_form] table tr[bgcolor] td:last-child:contains("0")')
    const isChecked = rows.eq(0).parent().find('input').prop('checked')
    rows.each((i,e) => {
        $(e).parent().find('input').prop('checked', !isChecked)
    })
}

const format = '<a href="##" style="display: inline-block; margin: 0 0 1em 1em;"> &#x25B6; text</a>'
$('form[name=quickcat_form]').before($(format.replace('text', 'hide all categorized')).click(hideCategorized))
$('form[name=quickcat_form]').before($(format.replace('text', 'check all uncategorized')).click(selectUncategorized))
