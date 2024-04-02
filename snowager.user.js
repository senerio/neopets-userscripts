// ==UserScript==
// @name         Neopets - Snowager stats and quick links
// @version      2024-03-31
// @description  Records Snowager attempts and blasts; adds quick links on the Snowager page
// @author       senerio
// @match        *://*.neopets.com/winter/snowager.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

function message(b, a) {
    $('#np_snowager').text(`${b} blasts of ${a} attempts`);
}

let [blasts, attempts] = localStorage?.getItem('np_snowager')?.split('/').map(i => parseInt(i)) || [0, 0];
$('.snowager_content').append(`<br><p id="np_snowager" style="margin-top: 1em;"></p>`);
message(blasts, attempts);

$(document).on('ajaxSuccess', function(event, xhr, settings, data) {
    if( !data.includes('Come back later.') ) {
        blasts += data.includes('snow_blast');
        localStorage.setItem('np_snowager', [blasts, ++attempts].join('/'));
        message(blasts, attempts);
    }
})

// Allows reset/deletion of saved counts when user adds "#reset" to the url
window.addEventListener('hashchange', () => {
    if(location.hash == '#reset') {
        localStorage.removeItem('np_snowager');
        message(0,0);
    }
})

// Adds quick links on the page. If not needed, comment out / remove everything below
const links = [
    ['Check Avatars', '/settings/neoboards/'],
    ['Go to Healing Springs', '/faerieland/springs.phtml'],
    ['Refresh', 'snowager.phtml']
]
$('.snowager_content').append('<p style="font-size: small;">' + links.map(i => `<a href="${ i[1] }">${ i[0] }</a>` ).join(' ▪ ') + '</p>');
$('.snowager_content').append('<p style="font-size: small;">Windows: 6-7 am, 2-3 pm, 10-11 pm NST</p>');
