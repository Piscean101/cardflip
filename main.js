import { checkMatch, startGame, deck, cardPanel, updateCardPanel, checkGameStatus, flipCount, countNumer, handleClues, expHold, cluesUsed } from "./board.js";
import { handleReloadWL, handleStats } from "./user.js";
document.addEventListener('DOMContentLoaded', () => {
    
    const playBtn = document.getElementById('playBtn');
    const container = document.getElementById('homeBtnContainer');
    const home = document.getElementById('home');
    const nameHolder = document.getElementById('changeName');
    const levelSelectDisplay = document.querySelector('.levelSelectHeader');

    function pressPlay() {

        container.classList.add('hidden','active');
        levelSelectDisplay.classList.remove('hidden');
        home.classList.remove('hidden');
        var lottery = Math.floor(Math.random()*13);
        console.log(lottery)

        document.querySelectorAll('.levelSelectBtn').forEach((btn) => {

            if (!btn.classList.contains('hiddenLevel')) {
                
                btn.classList.remove('hidden');
                btn.classList.add('active');

            }

            if (Number(localStorage.getItem("exp")) >= 500) {

                var ABO = document.getElementById("playallbutone");

                ABO.classList.remove('noshow');
                ABO.classList.add('active');

            }

            if (Number(localStorage.getItem("wins")) >= 10) {

                var EX = document.getElementById("playexhibition");

                EX.classList.remove('noshow');
                EX.classList.add('active');

            }

            if (lottery >= 11) {

                var LOT = document.getElementById("playlottery") 

                LOT.classList.remove('noshow');
                LOT.classList.add('active');

            }
 
        });

    };

    if (localStorage.getItem('redir')) {

        pressPlay();
        localStorage.removeItem('redir');

    };

    if (location.href.split('/').pop().slice(0,7) == 'profile') { 
            
        handleStats();
        
    }
    
    document.addEventListener('click', (e) => {

        if (e.target.id == 'playBtn') { pressPlay() };

        if (e.target.id == 'startBtn') { startGame() };

        if (e.target.id == 'cluePanel') { handleClues() };

        // if (e.target.id == 'statsBtn') { window.location = "./user/profile.html"};

        if  (e.target.id == 'backHome') {

            // if (document.querySelector('.startBtn')) { localStorage.setItem('redir','true') }
            window.location = "../";

        };

        if (e.target.id == 'resetWL') {

            handleReloadWL();

        }

        if (e.target.id == 'changeName') {

            const decision = confirm('Would you like to change your username?');

            if (decision) {

                const name = prompt('Enter your new name').slice(0,21);

                name ? null : name = localStorage.getItem('username');

                localStorage.setItem('username',name);

                nameHolder.innerHTML = name;

            }

        };

        if (e.target.id == 'home') { location.reload() }; 

        if (e.target.classList.contains('clueBodyText')) { handleClues() };

        if (e.target.classList.contains('levelSelectBtn')) {
            
            var level = e.target.id;
            window.location = `./levels/${level}.html`;
        
        };

        if (e.target.classList.contains('redir')) {

            localStorage.setItem('redir','true');

        }

        if (e.target.classList.contains('facedown')) {
            
            e.target.classList.remove('facedown');
            flipCount.innerHTML = Number(flipCount.innerHTML) - 1;
            var winStatus = checkGameStatus('win');
            
            if (checkMatch(e.target)) {
                
                countNumer.innerHTML = Number(countNumer.innerHTML) + 1;
                e.target.classList.add('correct');
                updateCardPanel();
                checkGameStatus('win');
                
                setTimeout(() => {  e.target.classList.add('found') },1500);
                
            } else {
                
                setTimeout(() => { e.target.classList.add('facedown') },1500);

            }

            winStatus ? null : checkGameStatus('flips');

        }

    });

});
// startGame();