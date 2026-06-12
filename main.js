import { checkMatch, startGame, deck, cardPanel, updateCardPanel } from "./board.js";
document.addEventListener('DOMContentLoaded', () => {
    
    const playBtn = document.getElementById('playBtn');
    const levelSelectDisplay = document.querySelector('.levelSelectDisplay');

    function pressPlay() {
        levelSelectDisplay.classList.remove('hidden');

        playBtn.classList.add('hidden','active');

        document.querySelectorAll('.levelSelectBtn').forEach((btn) => {
            btn.classList.remove('hidden');
            btn.classList.add('active');
        })
    };

    if (localStorage.getItem('redir')) {
        pressPlay();
        localStorage.removeItem('redir');
    };
    
    document.addEventListener('click', (e) => {
        if (e.target.id == 'playBtn') {
            pressPlay();
        };

        if (e.target.id == 'startBtn') {
            startGame();
        }

        if  (e.target.id == 'backHome') {
            localStorage.setItem('redir','true');
            window.location = "../";
        };

        if (e.target.classList.contains('levelSelectBtn')) {
            var level = e.target.id;
            window.location = `./levels/${level}.html`;
        };

        if (e.target.classList.contains('facedown')) {
            // var disableClick = document.querySelectorAll('facedown');
            // disableClick.forEach((e) => { e.target.classList.add('noclick')});
            e.target.classList.remove('facedown');
            if (checkMatch(e.target)) {
                e.target.classList.add('correct');
                setTimeout(() => { 
                    e.target.classList.add('found');
                    cardPanel.shift();
                    updateCardPanel();
                    // disableClick.forEach((e) => e.target.classList.remove('noclick'))
                },1500)
            } else {
                setTimeout(() => {
                    e.target.classList.add('facedown');
                },1000);
            }
        }

    });

});
// startGame();