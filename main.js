import { startGame } from "./board.js";
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

        if  (e.target.id == 'backHome') {
            localStorage.setItem('redir','true');
            window.location = "../";
        };

        if (e.target.classList.contains('levelSelectBtn')) {
            var level = e.target.id;
            window.location = `./levels/${level}.html`;
        };

    });

});
startGame();