export function handleStats() {
    var nameHolder = document.getElementById('changeName');
    var winStats = document.getElementById('statWinVal');
    var loseStats = document.getElementById('statLoseVal');
    var percentWin = document.getElementById('statPerVal');
    var currentStreak = document.getElementById('statCurrVal');
    var longestStreak = document.getElementById('statStreakVal');
    var totalGames = document.getElementById('statTotalGames');
    
    localStorage.getItem('username') ? nameHolder.innerHTML = localStorage.getItem('username') : null;
    localStorage.getItem('wins') ? winStats.innerHTML = localStorage.getItem('wins') : null;
    localStorage.getItem('loss') ? loseStats.innerHTML = localStorage.getItem('loss') : null;
    localStorage.getItem('streak') ? currentStreak.innerHTML = localStorage.getItem('streak') : null;
    localStorage.getItem('record') ? longestStreak.innerHTML = localStorage.getItem('record') : null;
    document.getElementById('statTotalGames').innerHTML = Number(winStats.innerHTML) + Number(loseStats.innerHTML);

    var perTest = `${(Number(winStats.innerHTML) / Number(totalGames.innerHTML) * 100).toFixed(1)}%`;

    typeof(perTest) == 'Number' ? percentWin.innerHTML = perTest : percentWin.innerHTML = '-';

}