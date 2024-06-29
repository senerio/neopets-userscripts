// ==UserScript==
// @name         Neopets - Brain Tree Helper
// @version      2024-05-21
// @description  Saves Brain Tree answers from The Esophagor. Adds link back to Brain Tree.
// @author       senerio
// @match        *://*.neopets.com/halloween/braintree.phtml
// @match        *://*.neopets.com/halloween/esophagor.phtml*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

if(location.pathname.includes('braintree')) {
    if(document.querySelector('.brain-form')) {
        // autofill saved answer
        const answer = localStorage.getItem('np_braintree')?.split(',') || ['', ''];
        $('#answer_1').val(answer[0]);
        $('#answer_2').val(answer[1]);
    }
    else {
        // clear on new quest
        $(document).on('ajaxSuccess', function(event, xhr, settings, data) {
            if(settings.data == "type=accept") {
                localStorage.removeItem('np_braintree');
            }
        })
    }
    $('#braintree_container').after('<p>Go to <a href="esophagor.phtml">The Esophagor</a></p>');
}
else if(location.pathname.includes('esophagor')) {
    $(document).on('ajaxSuccess', () => {
        const answer = document.querySelector('.quest_dialogue__2021 b u');
        if(answer) {
            // save answer
            localStorage.setItem('np_braintree', [ localStorage.getItem('np_braintree') , answer.innerText ].filter(Boolean).join(',') );
            // link to brain tree
            const brainTreeText = $('#esophagor-container p:contains("Brain Tree")')[0];
            brainTreeText.innerHTML = brainTreeText.innerHTML.replace('Brain Tree', '<a href="braintree.phtml">Brain Tree</a>');
        }
    })
}
