export var board = document.getElementById("board");
export var startBtn = document.getElementById("startBtn");
export var cardPanel = new Array();
export var cardPanelBody = document.getElementById('cardPanel');
export var colors = ['Red','Blue','Green','White','Black'];
export var deck = new Array();
export var difficulty = window.location.href.split('/').pop().slice(4).slice(0,-5);
export var options = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
export var minuteBody = document.getElementById("minutes");
export var secondBody = document.getElementById("seconds");
export var countNumer = document.getElementById("countNumer");
export var countDenom = document.getElementById("countDenom");
export var flipCount = document.getElementById("flipCount");

export function updateCardPanel() {
    cardPanelBody.innerHTML = cardPanel.shift().innerHTML;
};
export function pickRandom(options) {
    return options[Math.floor(Math.random()*options.length)]
};
export function checkMatch(target) {
    return target.innerHTML == cardPanelBody.innerHTML;
};
export function createCard(number=pickRandom(options),color=pickRandom(colors)) {
    
    var newCard = document.createElement("div");
    newCard.classList.add('card','facedown','hidden');
    newCard.innerHTML = `${number}<br>${color}`;
    
    return newCard;
    
};
export function checkDeckCopies(target) {
    
    let result = false;
    
    deck.forEach((e) => {
    e.innerHTML == target.innerHTML ? result = true : null ;
    });

    return result;

};
export function checkPanelCopies(target) {

    let result = false;

    cardPanel.forEach((e) => {
        e.innerHTML == target.innerHTML ? result = true : null ;
    });

    return result;

};
export function addToDeck(card) {

        if (checkDeckCopies(card) == false) {

            deck.push(card);

            return card;

        } else {

            return false;

        }

};
export function addToPanel(card) {

    if (checkPanelCopies(card) == false) {

        cardPanel.push(card);

        return card;

    } else {

        return false;

    }

};
export function deployCards(number,count) {
    
    while (number > 0) {
        
        var cardBody = addToDeck(createCard());
        
        if (cardBody) {

            board.appendChild(cardBody);
            number--;

        }
        
    }
    
    while (count > 0) {
        
        var cardBody = addToPanel(pickRandom(deck));

        if (cardBody) { count-- }
        
    }
    
};
export function displayCards() {

    var hiddenCards = document.querySelectorAll('.hidden');
    startBtn.classList.add('hidden','active');
    hiddenCards.forEach((e) => { e.classList.remove('hidden')});

};
export function nextLevel() {

    var wins = Number(localStorage.getItem("wins"));

    if (wins) {

        localStorage.setItem("wins",wins + 1);

    } else {

        localStorage.setItem("wins",1);

    }

    console.log(localStorage.getItem("wins"));

    setTimeout(() => { location.reload(); },1500);

};
export function statusMessage(type='win') {
    switch(type) {
        case 'win':
            setTimeout(() => { alert('Level Complete! Nice Job!')},1000);
            break;
        case 'timeout':
            alert('Time\'s Up! Game Over.');
            break;
        case 'flips':
            alert('You are out of actions! Game Over.');
            setTimeout(() => { location.reload() }, 500);
            break;
        default:
            break;
    }
};
export function checkGameStatus(type='clock') {

    var status = false;

    if (type == 'win' && cardPanel.length == 0) { 

        status = true;
        statusMessage('win');
        nextLevel();

    };

    if (type == 'clock' && Number(minuteBody.innerHTML == 0) && Number(secondBody.innerHTML == 0)) {

        statusMessage('timeout');
        window.location = '../..';

    };

    if (type == 'flips' && Number(flipCount.innerHTML < 1)) {

        statusMessage('flips');

    };

    return status;

};
export function startClock(time) {

    const minutes = Math.floor(time/60);
    const seconds = time - (minutes*60);
    minuteBody.innerHTML = minutes;
    secondBody.innerHTML = seconds;

    function countdownClock() {

        if (Number(secondBody.innerHTML) > 0) {

            secondBody.innerHTML = Number(secondBody.innerHTML - 1)
        
        } else {

            minuteBody.innerHTML = Number(minuteBody.innerHTML - 1);
            
            secondBody.innerHTML = 59;
        }

        checkGameStatus();

    }

    var countDown = setInterval(() => { countdownClock() },1000);

};



/**  */



export function startGame(difficulty='easy',number=10,count=6,attempts=25,clues=1,time=90) {
    
    if (number > 50) { return alert('ERROR: Board size exceeding limit: 50') };

    if (count > number) { return alert('ERROR: The Board size (1st arg) must be greater than the Panel size (2nd arg)')};

    countDenom.innerHTML = count-1;
    flipCount.innerHTML = attempts;
    
    deployCards(number,count);
    displayCards();
    updateCardPanel();
    startClock(time);

};