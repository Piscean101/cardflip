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

    var perTest = (Number(winStats.innerHTML) / Number(totalGames.innerHTML) * 100).toFixed(1);

    typeof(perTest) == 'Number' ? percentWin.innerHTML = perTest : percentWin.innerHTML = '-';

    var N = Number(percentWin.innerHTML.replace("%",""));

    N >= 90 ? percentWin.style.color = '#009DFF' :
    N >= 80 ? percentWin.style.color = '#00e84d' :
    N >= 70 ? percentWin.style.color = 'green' :
    N >= 50 ? percentWin.style.color = '#008080' :
    N >= 40 ? percentWin.style.color = '#BE800B' :
    N >= 30 ? percentWin.style.color = '#AE2029' : null;

}

export function handleReloadWL() {

    const decision = confirm(`Are you sure you want to reset your Win / Loss history?\nYour streaks won't be affected`);

    if (decision) {
        localStorage.setItem("wins",0);
        localStorage.setItem("loss",0);
        location.reload();
    }
     
}