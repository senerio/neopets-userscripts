// ==UserScript==
// @name         Neopets - Remember last zap
// @version      2024-04-15
// @description  Remember last choice; auto redirect to zap selection page
// @author       senerio
// @match        *://*.neopets.com/petpetlab.phtml
// @match        *://*.neopets.com/lab2.phtml
// @match        *://*.neopets.com/lab.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

function load() {
    const savedName = localStorage?.getItem('np_'+loc);
    document.querySelector(`.content form :not([aria-hidden=true])>*>input[value=${savedName}]`)?.click();
    document.querySelectorAll('.content form :not([aria-hidden=true]) input[type=radio][name=chosen]')
    .forEach(e => e.addEventListener('click', (event) => {
        localStorage?.setItem('np_'+loc, event.target.value);
    }));
}

const loc = location.pathname.split(/\/|\./).at(-2);

if(loc=='lab') {
    location.replace('lab2.phtml');
}
else if(loc=='petpetlab') {
    load();
}
else if(loc=='lab2') {
    const observer = new MutationObserver(() => {
        load();
        observer.disconnect();
    });
    observer.observe(document.querySelector('#bxlist'), {childList: true});
}
