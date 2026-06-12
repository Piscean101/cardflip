export var board = document.getElementById("board");
export var startBtn = document.getElementById("startBtn");
export var cardPanel = new Array();
export var cardPanelBody = document.getElementById('cardPanel');
export var colors = ['Red','Blue','Green','White','Black'];
export var deck = new Array();
export var options = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
export var minuteBody = document.getElementById("minutes");
export var secondBody = document.getElementById("seconds");

export function updateCardPanel() {
    console.log(cardPanel);
    cardPanelBody.innerHTML = cardPanel[0].innerHTML;
}
export function checkMatch(target) {
    return target.innerHTML == cardPanelBody.innerHTML;
}
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
    }

    setInterval(() => {
        countdownClock();
    },1000);
}
export function displayCards() {
    var hiddenCards = document.querySelectorAll('.hidden');
    startBtn.classList.add('hidden','active');
    hiddenCards.forEach((e) => { e.classList.remove('hidden')});
}



/**  */



export function startGame(number=6,count=5,clues=1,time=90) {

    if (number > 50) { return alert('Board size exceeding limit: 50') }

    function pickRandom(options) {
        return options[Math.floor(Math.random()*options.length)]
    }

    function createCard(number=pickRandom(options),color=pickRandom(colors)) {
        
        var newCard = document.createElement("div");
        newCard.classList.add('card','facedown','hidden');
        newCard.innerHTML = `${number}<br>${color}`;

        return newCard;

    }

    function checkCopies(target) {

        let result = false;

        deck.forEach((e) => {
        e.innerHTML == target.innerHTML ? result = true : null ;
        });

        return result;

    }

    function addToDeck(card) {

        if (checkCopies(card) == false) {

            deck.push(card);
            return card;

        } else {

            return false;

        }

    }

    function deployCards() {
        
        while (number > 0) {

            var cardBody = addToDeck(createCard());

            if (cardBody) {
                board.appendChild(cardBody);
                number--;
            }

        }

        while (count > 0) {

            cardPanel.push(pickRandom(deck));
            count--;

        }

        
    }
    
    deployCards();
    displayCards();
    updateCardPanel();
    // startClock(time);

};