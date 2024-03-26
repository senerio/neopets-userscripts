// ==UserScript==
// @name         Neopets - Lunar Temple
// @version      2024-01-15
// @description  Highlights the correct answer for Shenkuu Lunar Temple
// @author       senerio
// @match        *://*.neopets.com/shenkuu/lunar/?show=puzzle
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

const choices = document.querySelectorAll('.content form td');
if(!!choices.length) {
    let phase = Math.round( document.querySelector('.content div script+script').innerHTML.match(/angleKreludor=(\d+)/)[1] / 22.5 );
    if ( [16, 8, 9,10,11,12,13,14,15].includes(phase)) { phase -= 8; }
    else if ([0, 1, 2, 3, 4, 5, 6, 7].includes(phase)) { phase += 8; }
    choices[phase].setAttribute('style', 'background-color: rgb(255, 203, 0);');
}

// Manual console copy-paste version
// let phase = Math.round( document.querySelector('.content div script+script').innerHTML.match(/angleKreludor=(\d+)/)[1] / 22.5 ); if ([16, 8, 9,10,11,12,13,14,15].includes(phase)) { phase -= 8; } else if ([0, 1, 2, 3, 4, 5, 6, 7].includes(phase)) { phase += 8; } document.querySelector(`.content form input[name=phase_choice][value="${phase}"]`).parentElement.setAttribute('style', 'background-color: rgb(255, 203, 0);');
