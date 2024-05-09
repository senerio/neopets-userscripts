// ==UserScript==
// @name         Neopets - Training
// @version      2024-05-09
// @description  Skips the main page and redirect to status page; begin training from the status page
// @author       senerio
// @match        *://*.neopets.com/island/training.phtml*
// @match        *://*.neopets.com/pirates/academy.phtml*
// @match        *://*.neopets.com/island/fight_training.phtml*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

if(!location.search.length) {
    location.replace(location.pathname + '?type=status');
}
else if(location.search.includes('status')) {
    const course = ['Level', 'Strength', 'Defence', 'Agility', 'Endurance'];
    const pet = $('.content table tr:nth-child(2n+1) td:only-child b').map((i,v) => v.innerText.split(' ')[0] ).toArray(); 
    $('.content table tr:nth-child(2n) td:first-child b').each((i,v) => {
        const path = location.pathname.split('/').pop();
        $(v).after(` <a href="process_${ location.pathname.split('/').pop() }?type=start&course_type=${ course[i%5] }&pet_name=${ pet[parseInt(i/5)] }">+</a>`);
    })
}
