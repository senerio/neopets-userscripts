// ==UserScript==
// @name         Neopets - Compact Quest Log
// @version      2025-07-27
// @description  Removes extra spaces and other elements from the quest log
// @author       senerio
// @match        *://*.neopets.com/questlog/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

function waitForElement(condition = 'exist', selector, callback, { root = document.body } = {}) {
    let element = document.querySelector(selector);
    // If element exists before we started waiting
    if (element && condition == 'exist') {
        callback(element);
        return () => {};
    }

    const observer = new MutationObserver((mutations, obs) => {
        callback(element);
        obs.disconnect();
        if (condition === 'change') {
            const elementObserver = new MutationObserver((mutations) => {
                callback(element);
                elementObserver.disconnect();
            });
            elementObserver.observe(element, { childList: true, subtree: true, attributes: true });
        }
    });

    observer.observe(root, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
}

const originalFetch = window.fetch;
window.fetch = async (url, options = {}) => {
    const response = await originalFetch(url, options);
    if (response.url.includes('retrieveQuests') && response.ok) {
        waitForElement('change', '#QuestLogQuests', compact);
    }
    return response;
};

function compact() {
    $('.questlog-header').css({'display': 'none'});
    $('.questlog-info').css({'display': 'none'});

    // Top
    $('#QuestLogStreakRewards').removeClass('ql-hidden');
    $('.ql-bonus-label').css({'display': 'none'});
    $('.ql-desc').css({'display': 'none'});
    $('.questlog-top').css({'gap':'unset'})
    $('.ql-dots').css({'display': 'none'});
    $('.ql-bonus-img').css({'width': '40px', 'height': '40px', 'flex-shrink': '0', 'margin-right': '0.5em'}); $('.ql-bonus-img img').css({'width': '100%'});
    $('.ql-bonus-reward').css({'flex-direction': 'row'});
    $('.ql-progress').css({'display': 'none'}); // also affects below
    $('#QuestLogReroll').css({'position': 'unset', 'margin': '0 10px'});
    $('.missed-day-button').css({'padding-top': '0', 'padding-bottom': '0'});
    $('.ql-bonus-check').css({'top': '0', 'width': '100%'});

    // Rewards
    $('.questlog-quests, .questlog-body').css({'gap': '0.2em'});
    $('.ql-reward-img img, .ql-reward-np').css({'width': '40px', 'height': '40px', 'margin-top': '2px'});
    $('.ql-reward').css({'gap': '0', 'padding': '0 1em'})

    // Details
    $('.ql-quest-details').css({'display': 'flex', 'flex-wrap': 'wrap-reverse', 'justify-content': 'space-between', 'align-items': 'start'});
    $('.ql-quest-details > div').css({'padding': '0 0.5em'});
    $('.ql-quest-top').css({'display': 'none'});
    $('.ql-quest-description').css({'display': 'none'}); // comment this out if you have quick links here
    $('.ql-quest-description').css({'width': '100%'});
    $('.ql-tasks').css({'flex': '4 4 70%', 'margin': 'unset'});
    $('.ql-quest-buttons').css({'flex': '1 1 20%', 'margin-top': '0', 'display': 'flex', 'justify-content': 'center'});
    $('.ql-claim').css({'margin': '0', 'align-self': 'center'});
}
