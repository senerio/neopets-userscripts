// ==UserScript==
// @name         Neopets - Obelisk
// @version      2024-03-25
// @description  Handle getting stuck after picking a faction/boon; displays boon details
// @author       senerio
// @match        *://*.neopets.com/prehistoric/battleground/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

// Stuck fix
const obeliskScript = document.querySelector('#pageDesc + style + script') || document.querySelector('#pageDesc + script');
if(obeliskScript) {
    const newObeliskScript = obeliskScript.innerHTML.replace(/_gaq.push.*;/g, '')
    obeliskScript.remove();
    document.body.appendChild(Object.assign(document.createElement("script"), { innerHTML: newObeliskScript }));
}

// Boon details
const boons = {
    "bankbribery": "bank interest +3%",
    "blackmarket": "highlight exclusive items",
    "booksmarts": "+2-4 INT after reading",
    "cartogriphication": "Faerie Caverns direction",
    "cheaperdozen": "10NP Stock Market minimum",
    "doctorwho": "cures sick neopet in the springs",
    "doppelganger": "chance to reuse one-use BD items",
    "doublebubble": "chance of potion refill",
    "equipall": "+1  weapon slot",
    "fivefinger": "10% neopian shop discount",
    "grrraaaahhhhhh": "BD damage increase by 10%",
    "lolavies": "steal someone's avatar",
    "refreshquest": "one refresh per faerie quest",
    "rightround": "+1 wheel spin",
    "scratchmaster": "+1 scratchcard purchase",
    "strengthmind": "Mind Blast BD ability (based on INT)",
    "millionairefeeling": "TP offer limit up to 2m (useless)",
    "fullpockets": "+NP from premium scratch card",
    "premiumdream": "+1 send score on featured game"
}
$('.perks li div').each((i,e) => {
    const name = e.style['background-image'].match('obelisk/(.*)_')[1];
    $(e).parent().append(`<p class="sf">${boons[name]}</p>`);
})
