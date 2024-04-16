// ==UserScript==
// @name         Neopets - Shop Wizard clear button, etc.
// @version      2024-04-17
// @description  Add button to clear and focus on shop wizard search fields; open super shop wizard with search string upon loading shop wizard page; resubmit form
// @author       senerio
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @match        *://*.neopets.com/*
// @grant        GM_addStyle
// ==/UserScript==

// Add clear button to SW/SSW search fields
['#ssw_tabs_pane #searchstr', '#searchstr', '#shopwizard'].forEach(selector => {
    const position = (selector == '#ssw_tabs_pane #searchstr') ? 'font-size: 25px; top: -30px; left: 340px;' : 'font-size: 35px; top: -12px; left: -35px;' ;
    const style = 'width: 0; height: 0; overflow-x: visible; position: relative; cursor: pointer; color: #1c4070; '.concat(position);
    const element = $(selector);
    if(!element.length) { return; }
    element.after(`<div class="swreset" style="${style}">⟲</div>`);
    element.next()[0].addEventListener('click', function() {
        document.querySelector(selector).value = '';
        document.querySelector(selector).focus();
    })
})

// Upon loading SW page, automatically open SSW and copy search string
const sswButton = $('.navsub-ssw-icon__2020');
if( document.URL.includes('/shops/wizard.phtml') && sswButton.length ) {
    $('#ssw__2020').css('display', 'block');
    $('#searchstr').val($('#shopwizard').val());
}

// Make resubmit form on SW visible to change item name/price without clicking on new search
if(document.URL.includes('/shops/wizard.phtml')) {
    GM_addStyle('#wresultform input[type=text] { border: 1px solid #3b79d6; padding: 0 0.5em; border-radius: 0.5em; box-sizing: border-box; font-family: "MuseoSansRounded500", "Arial", sans-serif; } input[name=rs_type] {width: 200px; }input[name=rs_min_price], input[name=rs_max_price] { width: 100px; }');
    $(document).on('ajaxSuccess', function(event, xhr, settings, data) {
        if(settings.url.includes('/np-templates/ajax/wizard.php')) {
            $('#resubmitWizard').parent().prepend($('#resubmitWizard'));
            ['rs_type', 'rs_min_price', 'rs_max_price'].forEach(i => {
                $(`input[name=${i}]`).attr('type', 'text')
            });
        }
    });
}
