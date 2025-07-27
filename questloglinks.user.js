// ==UserScript==
// @name         Neopets - Quest Log Links
// @version      2025-07-27
// @description  Adds quick links to quests
// @author       senerio
// @match        *://*.neopets.com/questlog/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

function waitForElement(condition = 'exist', selector, callback, { root = document.body } = {}) {
    let element = document.querySelector(selector);
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
        waitForElement('change', '#QuestLogQuests', replaceQuestDescriptions);
    }
    return response;
};

function replaceQuestDescriptions() {

    const createLink = (url, text = 'Link') => {
        return Object.assign(document.createElement('a'), {
            href: url,
            target: '_blank',
            innerHTML: `&#x25E6; ${text} `
        });
    }

    const descriptionLinks = {
        "Customise": [
            { url: "https://www.neopets.com/customise/" }
        ],
        "Play any Game or Classic Game in the Games Room": [
            { url: "https://www.neopets.com/games/game.phtml?game_id=805&size=small&quality=low&play=true" }
        ],
        "Wheel of Mediocrity": [
            { url: "https://www.neopets.com/prehistoric/mediocrity.phtml" }
        ],
        "Wheel of Excitement": [
            { url: "https://www.neopets.com/faerieland/wheel.phtml" }
        ],
        "Wheel of Knowledge": [
            { url: "https://www.neopets.com/medieval/knowledge.phtml" }
        ],
        "Wheel of Misfortune": [
            { url: "https://www.neopets.com/halloween/wheel/index.phtml" }
        ],
        "Groom": [
            { url: "https://www.neopets.com/safetydeposit.phtml?obj_name=&category=10" }
        ],
        "Feed": [
            { url: "https://www.neopets.com/safetydeposit.phtml?offset=0&obj_name=&category=18" }
        ],
        "Purchase item(s) from any Neopian Shop": [
            { url: "https://www.neopets.com/faerieland/springs.phtml", text: "Springs" },
            { url: "https://www.neopets.com/generalstore.phtml", text: "General Store" },
            { url: "https://www.neopets.com/objects.phtml?type=shop&obj_type=7", text: "Magical Bookshop" },
            { url: "https://www.neopets.com/objects.phtml?type=shop&obj_type=38", text: "Faerieland Bookshop" },
            { url: "https://www.neopets.com/objects.phtml?type=shop&obj_type=51", text: "Sutek's Scrolls" },
            { url: "https://www.neopets.com/objects.phtml?type=shop&obj_type=70", text: "Booktastic Books" },
            { url: "https://www.neopets.com/objects.phtml?type=shop&obj_type=77", text: "Brightvale Books" },
            { url: "https://www.neopets.com/objects.phtml?type=shop&obj_type=92", text: "Words of Antiquity" },
            { url: "https://www.neopets.com/objects.phtml?type=shop&obj_type=106", text: "Neovian Printing Press" },
            { url: "https://www.neopets.com/objects.phtml?type=shop&obj_type=114", text: "Moltaran Books" }
        ]
    };

    document.querySelectorAll('.ql-quest-description').forEach(desc => {
        let descText = desc.textContent;
        desc.textContent = '';
        for (const [key, links] of Object.entries(descriptionLinks)) {
            if (descText.includes(key)) {
                links.forEach(link => {
                    desc.appendChild(createLink(link.url, link.text));
                });
            }
        }
    });

}
