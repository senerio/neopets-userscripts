// ==UserScript==
// @name         Neopets - Compact Quest Log
// @version      2024-02-16
// @description  Removes extra spaces and other elements from the quest log
// @author       senerio
// @match        *://*.neopets.com/questlog/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

$('.questlog-header').css({'display': 'none'})
$('.questlog-info').css({'display': 'none'})

const interval = setInterval(() => {
  if (document.querySelector('#QuestLogStreakBonus')) {
    clearInterval(interval);
    $('#QuestLogStreakRewards').removeClass('ql-hidden')
    $('#QuestLogStreakBonus').css({'margin-left': '40px'})
    $('#QuestLogBonusRewards').css({'padding-bottom': '20px'})
    $('.ql-bonus-img').css({'width': '40px', 'height': '40px', 'margin-right': '0.5em'})
    $('.ql-bonus-img img').css({'width': '100%'})
    $('.ql-dots').css({'display': 'none'})
    $('.ql-bonus-reward').css({'flex-direction': 'row'})
    $('.ql-bonus-label').css({'display': 'none'})
    $('.ql-progress-bar').css({'display': 'none'})
    $('#QuestLogDailyAlert').css({'position': 'absolute', 'top': '0', 'bottom': '0', 'right': 'unset', 'width': '45px', 'padding-top': '0.75em', 'border-radius': '10px'})
    $('#QuestLogWeeklyAlert').css({'position': 'absolute', 'top': '0', 'bottom': '0', 'right': 'unset', 'width': '45px', 'padding-top': '0.75em', 'border-radius': '10px'})

    $('.questlog-quest').css({'height': 'auto'})
    $('.ql-skip').css({'display': 'none'})
    $('.ql-tasks').css({'display': 'none'})
    $('.ql-reward img').css({'width': '50px', 'height': '50px'})
    $('.ql-reward').css({'gap': '0', 'padding': '0'})
    $('.ql-quest-buttons').css({'width': 'auto', 'margin': '0', 'display': 'inline-block', 'float': 'right'})
    $('.ql-quest-description').css({'display': 'inline-block'})
    $('.ql-hidden').css({'height': '3em !important'})
    $('.ql-quest-details .ql-task-num').each(function(e) { $(this).parent().parent().parent().find('.ql-quest-title').append(" - " + $(this).text()) })
    $('.ql-progress').css({'margin-top': '0'})
  }
}, 1000)