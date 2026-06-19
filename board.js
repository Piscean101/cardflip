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
export var [numberHold,countHold,expHold] = [0,0,0];
export var cluesUsed = 0;
export var winStatus = false;

export function updateCardPanel() {
    cardPanel.length ? cardPanelBody.innerHTML = cardPanel.shift().innerHTML : null;
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
function addStat(stat) {
    localStorage.getItem(stat) ? localStorage.setItem(stat,Number(localStorage.getItem(stat))+1) : localStorage.setItem(stat,1);
};
export function handleClues(init=false) {

    var cards = document.querySelectorAll(".card");

    cards.forEach((e) => {

        if (e.innerHTML == cardPanelBody.innerHTML) {

            e.classList.add('clueGlow');

        }

    });

    clueCount--;
    cluesUsed++;
    addStat("cluesused");
    clueCountBody.innerHTML = Number(clueCountBody.innerHTML - 1);

    if (!clueCount) { cluePanelBody.classList.add('hidden')};

};
export function nextLevel(next=true,exp=expHold) {

    var wins = Number(localStorage.getItem("wins"));
    var currentStreak = Number(localStorage.getItem("streak"));
    var longestStreak = Number(localStorage.getItem("record"));
    var exp = Number(localStorage.getItem("exp"));

    localStorage.setItem("loss",Number(localStorage.getItem("loss"))-1);

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

    currentStreak = Number(localStorage.getItem("streak"));
    longestStreak = Number(localStorage.getItem("record"));

    if (currentStreak >= longestStreak) {

        localStorage.setItem("record",currentStreak);

    }

    if (exp) {

        localStorage.setItem("exp", exp + expHold);

    } else {

        localStorage.setItem("exp", expHold);

    }

    winStatus = false;

    expHold = 0;

    if (next) { 

        location.reload();

    } else {

        window.location = "../";

    }

};
export function handleGameLose() {
    localStorage.setItem("streak",0);
}
export function statusMessage(type='win') {

    var decision = false;

    switch(type) {

        case 'win':
            setTimeout(() => {
                calcExp(numberHold,countHold);
                winStatus = true;
                difficulty == 'lottery' ? alert(`LOTTERY RESULTS: Congratulations! You won ${expHold} XP!`) : decision = confirm(`Level Complete!\nYou earned ${expHold} XP\nReady for the next one?`);
                difficulty == 'lottery' ? nextLevel(false) : decision ? nextLevel() : nextLevel(false);
            },350);
            break;
        case 'timeout':
            handleGameLose();
            difficulty == 'lottery' ? alert(`Times\'s Up! Lottery Over!`) : decision = confirm('Time\'s Up! Game Over.\n\nWant to try again?');
            !decision || difficulty == 'lottery' ? window.location = "../" : location.reload();
            break;
        case 'flips':
            handleGameLose();
            if (difficulty == 'lottery') {
                alert(`LOTTERY RESULTS: Lottery Over! You did not win`);
            } else { 
                alert('You are out of actions! Better luck next time.');
            }
            window.location = "../";
            break;
        default:
            break;
           
    }
};
export function checkGameStatus(type='clock') {

    if (type == 'win' && cardPanel.length == 0) { 

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
export function calcExp(number,count) {

    var result = 0;
    var range = pickRandom([1,2,3,4,5]);
    var secondsLeft = Number(secondBody.innerHTML);
    var minutesLeft = Number(minuteBody.innerHTML);
    var flipsLeft = Number(flipCount.innerHTML);
    
    result += Math.floor(secondsLeft/7);
    result += minutesLeft*7;
    result += flipsLeft;
    result += range;
    result += number;
    result += count;

    if (cluesUsed == 0) {

        addStat("noclue");
    
    }

    while (cluesUsed) {

        result -= Math.floor(result*10/100);
        cluesUsed--;
    
    }

    switch (difficulty) {
        case 'easy':
            result*=0.6;
            break;
        case 'medium':
            result*=0.85;
            break;
        case 'hard':
            result*=2;
            break;
        case 'exhibition':
            result*=3.5;
            break;
        case 'allbutone':
            result*=1.75;
            break;
        case 'lottery':
            result*=13;
            break;
        default:
            break;
    }

    result = Math.floor(result);

    expHold = result;

}



/**  */



export function startGame(level=difficulty,number=10,count=6,attempts=25,clues=1,time=90) {

    var exp = 0;
    
    switch(level) {

        case 'easy':
            number = pickRandom([7,8,9]);
            count = number - pickRandom([2,3]);
            attempts = pickRandom([20,25]);
            number >= 9 ? clues = 2 : clues = 1;
            time = pickRandom([75,75,80,90,100]);
            break;
        case 'medium':
            number = pickRandom([8,9,10,11,12]);
            count = number - pickRandom([1,2,3]);
            attempts = pickRandom([18,20,22,25]);
            number >= 11 ? clues = 2 : clues = 1;
            count >= 9 ? count-- : null;
            time = pickRandom([50,60,75,80,90]);
            break;
        case 'hard':
            number = pickRandom([13,13,14,14,14,15,15]);
            count = number - pickRandom([4,5,6]);
            count >= 9 ? count-- : count+=2;
            attempts = pickRandom([23,24,25,26,27]);
            number >= 15 ? clues = 2 : number >= 14 ? clues = 1 : clues = 0;
            time = pickRandom([50,55,60,60,75]);
            break;
        case 'exhibition':
            number = pickRandom([24,25,26,27,28]);
            count = number - pickRandom([7,8,9,10]);
            clues = Math.floor((count/2)-pickRandom([4,5,6]));
            clues >= 5 ? clues -= 2 : null;
            count >= 20 ? count-=8 : count >= 15 ? count-= 4 : null;
            attempts = pickRandom([40,45,50,55]);
            time = pickRandom([140,150,150,150,180,180]);
            break;
        case 'allbutone':
            number = 8;
            count = number;
            clues = 0;
            attempts = 10;
            time = pickRandom([60]);
            break;
        case 'lottery':
            number = 12;
            count = 2;
            clues = 0;
            attempts = pickRandom([3]);
            time = 15;
            break;
        default: 
            break;

    }

    if (number > 50) { number = 50 };
    if (count > number) { while (count >= number-1) { count-- } };
    count >= 8 ? attempts += 5 : count >= 6 ? attempts += 2 : null;
    
    clueCount = clues;
    clueCountBody.innerHTML = clues;
    countDenom.innerHTML = count-1;
    flipCount.innerHTML = attempts;
    clockPanelBody.classList.add('flicker');
    cardPanelBody.classList.remove('hidden');
    numberHold = number; 
    countHold = count;
    addStat("loss");
    
    deployCards(number,count);
    displayCards();
    updateCardPanel();
    startClock(time);
    if (!clues) { cluePanelBody.classList.add('hidden')};

};