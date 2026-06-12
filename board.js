export function startGame(number=48,clues=0) {

    var options = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    var colors = ['Red','Blue','Green','White','Black'];
    var deck = new Array();
    var board = document.getElementById("board");

    function pickRandom(options) {
        return options[Math.floor(Math.random()*options.length)]
    }

    function createCard(number=pickRandom(options),color=pickRandom(colors)) {
        
        var newCard = document.createElement("div");
        newCard.classList.add('card');
        newCard.innerHTML = `${number}<br>${color}`;
        return newCard;

    }

    function checkCopies(target) {
        let result = false;
        deck.forEach((e) => {
        e.innerHTML == target.innerHTML ? result = true : null ;
        })
        return result;
    }

    function addToDeck(card) {

        if (!checkCopies(card)) {
            deck.push(card);
            return card;
        } else {
            return card;
        }

    }

    function deployCards() {
        
        while (number > 0) {
            var cardBody = addToDeck(createCard());
            board.appendChild(cardBody);
            number--;
        }
        
    }
    
    deployCards();

};