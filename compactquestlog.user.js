// ==UserScript==
// @name         Neopets - Compact Quest Log
// @version      2025-07-27-2
// @description  Removes extra spaces and other elements from the quest log
// @author       senerio
// @match        *://*.neopets.com/questlog/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

const css = `
  /* Hide elements */
  .questlog-header,
  .questlog-info,
  .ql-bonus-label,
  .ql-desc,
  .ql-dots,
  .ql-progress,
  .ql-quest-top {
    display: none !important;
  }

  /* Top */
  #QuestLogStreakRewards.ql-hidden {
    display: block !important;
  }

  .questlog-top {
    gap: unset;
  }

  /* Bonus images and rewards */
  .ql-bonus-img {
    width: 40px !important;
    height: 40px !important;
    flex-shrink: 0 !important;
    margin-right: 0.5em !important;
  }

  .ql-bonus-img img {
    width: 100% !important;
  }

  .ql-bonus-reward {
    flex-direction: row !important;
  }

  #QuestLogReroll {
    position: unset !important;
    margin: 0 10px !important;
  }

  .missed-day-button {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .ql-bonus-check {
    top: 0 !important;
    width: 100% !important;
  }

  /* Rewards */
  .questlog-quests,
  .questlog-body {
    gap: 0.2em !important;
  }

  .ql-reward-img img,
  .ql-reward-np {
    width: 40px !important;
    height: 40px !important;
    margin-top: 2px !important;
  }

  .ql-reward {
    gap: 0 !important;
    padding: 0 1em !important;
  }

  /* Details */
  .ql-quest-details {
    display: flex !important;
    flex-wrap: wrap-reverse !important;
    justify-content: space-between !important;
    align-items: start !important;
  }

  .ql-quest-details > div {
    padding: 0 0.5em !important;
  }

  .ql-quest-description {
    width: 100% !important;
  }

  .ql-tasks {
    flex: 4 4 70% !important;
    margin: unset !important;
  }

  .ql-quest-buttons {
    flex: 1 1 20% !important;
    margin-top: 0 !important;
    display: flex !important;
    justify-content: center !important;
  }

  .ql-claim {
    margin: 0 !important;
    align-self: center !important;
  }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
