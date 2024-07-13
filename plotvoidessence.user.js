// ==UserScript==
// @name         Neopets - Plot: Void Essence Helper
// @version      2024-07-08
// @description  Assists in collecting void essence by hiding the map image for easier clicking
// @author       senerio
// @match        *://*.neopets.com/altador/index.phtml
// @match        *://*.neopets.com/medieval/brightvale.phtml
// @match        *://*.neopets.com/medieval/index_evil.phtml
// @match        *://*.neopets.com/faerieland/faeriecity.phtml
// @match        *://*.neopets.com/faerieland/index.phtml
// @match        *://*.neopets.com/halloween/index.phtml
// @match        *://*.neopets.com/worlds/index_kikolake.phtml
// @match        *://*.neopets.com/pirates/index.phtml
// @match        *://*.neopets.com/moon/index.phtml
// @match        *://*.neopets.com/tropical/index.phtml
// @match        *://*.neopets.com/water/index.phtml
// @match        *://*.neopets.com/medieval/index_farm.phtml
// @match        *://*.neopets.com/medieval/index.phtml
// @match        *://*.neopets.com/medieval/index_castle.phtml
// @match        *://*.neopets.com/magma/caves.phtml
// @match        *://*.neopets.com/magma/index.phtml
// @match        *://*.neopets.com/island/index.phtml
// @match        *://*.neopets.com/objects.phtml
// @match        *://*.neopets.com/market_bazaar.phtml
// @match        *://*.neopets.com/market_map.phtml
// @match        *://*.neopets.com/market_plaza.phtml
// @match        *://*.neopets.com/halloween/neovia.phtml
// @match        *://*.neopets.com/desert/qasala.phtml
// @match        *://*.neopets.com/worlds/index_roo.phtml
// @match        *://*.neopets.com/desert/sakhmet.phtml
// @match        *://*.neopets.com/shenkuu/index.phtml
// @match        *://*.neopets.com/winter/index.phtml
// @match        *://*.neopets.com/winter/icecaves.phtml
// @match        *://*.neopets.com/winter/terrormountain.phtml
// @match        *://*.neopets.com/halloween/index_fair.phtml
// @match        *://*.neopets.com/worlds/index_geraptiku.phtml
// @match        *://*.neopets.com/desert/index.phtml
// @match        *://*.neopets.com/water/index_ruins.phtml
// @match        *://*.neopets.com/prehistoric/index.phtml
// @match        *://*.neopets.com/prehistoric/plateau.phtml
// @match        *://*.neopets.com/space/hangar.phtml
// @match        *://*.neopets.com/space/recreation.phtml
// @match        *://*.neopets.com/space/index.phtml
// @match        *://*.neopets.com/pirates/warfwharf.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        GM_addStyle
// ==/UserScript==

/* // add count to page title
const waitExist = setInterval(function() {
    const voidEssenceCount = $('.tvw-essence').length;
    if (voidEssenceCount) {
        document.title = `(${voidEssenceCount}) `.concat(document.title);
        clearInterval(waitExist);
    }
 }, 1000);
 */

// hide map to show only essences
GM_addStyle(`#canvas { display: none!important; }`)