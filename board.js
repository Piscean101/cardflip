export var board = document.getElementById("board");
export var startBtn = document.getElementById("startBtn");
export var cardPanel = new Array();
export var cardPanelBody = document.getElementById('cardPanel');
export var cluePanelBody = document.getElementById("cluePanel");
export var colors = ['Red','Blue','Green','White','Black'];
export var deck = new Array();
export var clueCount = 0;
export var clueCountBody = document.getElementById("clueCount");
export var difficulty = window.location.href.split('/').pop().slice(4).slice(0,-5);
export var options = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
export var minuteBody = document.getElementById("minutes");
export var secondBody = document.getElementById("seconds");
export var clockPanelBody = document.getElementById("clockPanel");
export var countNumer = document.getElementById("countNumer");
export var countDenom = document.getElementById("countDenom");
export var flipCount = document.getElementById("flipCount");
export var winStatus = false;

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
export function handleClues(init=false) {
    var cards = document.querySelectorAll(".card");
    cards.forEach((e) => {
        if (e.innerHTML == cardPanelBody.innerHTML) {
            e.classList.add('clueGlow')
        }
    });
    clueCount--;
    clueCountBody.innerHTML = Number(clueCountBody.innerHTML - 1);
    if (!clueCount) { cluePanelBody.classList.add('hidden')};
};
export function nextLevel(next=true) {

    var wins = Number(localStorage.getItem("wins"));
    // var losses = Number(localStorage.getItem("loss"));
    var currentStreak = Number(localStorage.getItem("streak"));
    var longestStreak = Number(localStorage.getItem("record"));

    longestStreak ? null : localStorage.setItem("record",1);

    if (wins) {

        localStorage.setItem("wins",wins + 1);

    } else {

        localStorage.setItem("wins",1);

    }

    if (currentStreak) {

        localStorage.setItem("streak", currentStreak + 1);

    } else {

        localStorage.setItem("streak", 1);

    }

    if (currentStreak > longestStreak) {

        localStorage.setItem("record",currentStreak);

    } 

    winStatus = false;

    if (next) { 
        location.reload();
    } else {
        window.location = "../";
    }

};
export function statusMessage(type='win') {
    var decision = true;
    switch(type) {
        case 'win':
            setTimeout(() => { 
                decision = confirm('Level Complete!\n\nReady for the next one?');
                decision ? nextLevel() : nextLevel(false);
            },750);
            break;
        case 'timeout':
            localStorage.setItem("streak",0);
            localStorage.getItem("loss") ? localStorage.setItem("loss",Number(localStorage.getItem("loss")) + 1) : localStorage.setItem("loss",1);
            decision = confirm('Time\'s Up! Game Over.\n\nWant to try again?');
            decision ? location.reload() : window.location = "../";
            break;
        case 'flips':
            localStorage.setItem("streak",0);
            localStorage.getItem("loss") ? localStorage.setItem("loss",Number(localStorage.getItem("loss")) + 1) : localStorage.setItem("loss",1);
            alert('You are out of actions! Better luck next time.');
            setTimeout(() => { location.reload() }, 500);
            break;
        default:
            break;
    }
};
export function checkGameStatus(type='clock') {

    if (type == 'win' && cardPanel.length == 0) { 

        winStatus = true;
        statusMessage('win');

    };

    if (type == 'clock' && Number(minuteBody.innerHTML == 0) && Number(secondBody.innerHTML == 0) && !winStatus) {

        statusMessage('timeout');

    };

    if (type == 'flips' && Number(flipCount.innerHTML < 1)) {

        statusMessage('flips');

    };

    return winStatus;

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

        if (Number(minuteBody.innerHTML <= 0)) {

            Number(secondBody.innerHTML <= 10) ? clockPanelBody.classList.add('timeUp') :
            Number(secondBody.innerHTML <= 30) ? clockPanelBody.classList.add('warningTime') : null;

        } 

        checkGameStatus();

    }

    var countDown = setInterval(() => { countdownClock() },1000);

};



/**  */



export function startGame(level=difficulty,number=10,count=6,attempts=25,clues=1,time=90) {
    
    switch(level) {
        case 'easy':
            number = pickRandom([7,8,9]);
            count = number - pickRandom([2,3]);
            attempts = pickRandom([20,25]);
            number >= 9 ? clues = 2 : clues = 1;
            time = pickRandom([75,75,80,90,100]);
            break;
        case 'medium':
            number = pickRandom([9,10,11,12,13]);
            count = number - pickRandom([2,3,4]);
            attempts = pickRandom([18,20,22,25]);
            number >= 12 ? clues = 2 : clues = 1;
            time = pickRandom([50,60,75,80,90]);
            break;
        case 'hard':
            number = pickRandom([13,14,15,16,17]);
            count = number - pickRandom([6,7,8]);
            count >= 7 ? count-- : count++;
            attempts = pickRandom([22,24,25,26,28,30]);
            number >= 16 ? clues = 2 : number >= 14 ? clues = 1 : clues = 0;
            time = pickRandom([45,50,50,60,60,75]);
            break;
        case 'exhibition':
            number = pickRandom([27,28,29,30,31]);
            count = number - pickRandom([7,8,9,10]);
            clues = Math.floor((count/2)-pickRandom([5,6,7]));
            clues >= 5 ? clues -= 2 : null;
            count >= 30 ? count-=15 : count >= 20 ? count-= 8 : null;
            attempts = pickRandom([30,35,40,45]);
            time = pickRandom([120,150,150,150,180,180]);
            break;
        default: 
            break;
    }

    if (number > 50) { number = 50 };
    if (count > number) { 
        while (count >= number-1) { count-- }
    };
    count >= 8 ? attempts += 5 : count >= 6 ? attempts += 2 : null;
    
    clueCount = clues;
    clueCountBody.innerHTML = clues;
    countDenom.innerHTML = count-1;
    flipCount.innerHTML = attempts;
    clockPanelBody.classList.add('flicker');
    cardPanelBody.classList.remove('hidden');
    
    deployCards(number,count);
    displayCards();
    updateCardPanel();
    startClock(time);
    if (!clues) { cluePanelBody.classList.add('hidden')};

};