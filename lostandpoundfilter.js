// ==UserScript==
// @name         Neopets - Lost and Pound filter
// @version      2024-01-28
// @description  Filter pets
// @author       senerio
// @match        https://lost.quiggle.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        GM_addStyle
// ==/UserScript==

// name filters:
// \d - with numbers
// ^[A-Z] - starts with caps
// ^.+[A-Z] - no caps in the middle
// _ - with underscores

const included = {
    name: '',
    gender: 'f',
    species: [],
    colors: []
}
const excluded = {
    name: /\d|_|^.+[A-Z]/,
    gender: '',
    species: [],
    colors: []
}

// For browsing on mobile
GM_addStyle("body { font-size: xx-large; } #petlist { width: 100%;} ");

function removeIf(element, action, property, value) {
    if(property=='name') {
        if(
            (action=='exclude' && value.match(excluded[property])) ||
            (action=='include' && !value.match(included[property]))
        ) {
            element.remove();
        }
    }
    else if(
        ( action=='exclude' && excluded[property].includes(value) ) ||
        ( action=='include' && included[property].length > 0 && !included[property].includes(value) )
    ) {
        element.remove();
    }
}
document.querySelectorAll('div.pet').forEach(e => {
    let name, temp, color, species;

    const gender = e.classList[1];
    removeIf(e, 'exclude', 'gender', gender);
    removeIf(e, 'include', 'gender', gender);

    if(e.querySelector('.petname')) {
        [name, temp, color, species] = e.querySelector('.petname a').innerText.split(' ');
        removeIf(e, 'exclude', 'colors', color);
        removeIf(e, 'include', 'colors', color);
        removeIf(e, 'exclude', 'species', species);
        removeIf(e, 'include', 'species', species);

        removeIf(e, 'exclude', 'name', name);
        removeIf(e, 'include', 'name', name);
    }
});
