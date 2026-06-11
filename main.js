document.addEventListener('DOMContentLoaded', () => {
    
    const playBtn = document.getElementById('playBtn');
    
    document.addEventListener('click', (e) => {
        if (e.target.id == 'playBtn') {
        const levelSelectDisplay = document.querySelector('.levelSelectDisplay');
        levelSelectDisplay.classList.remove('hidden');
        e.target.classList.add('hidden','active');
        document.querySelectorAll('.levelSelectBtn').forEach((btn) => {
            btn.classList.remove('hidden');
            btn.classList.add('active');
        });
    };

    });

});
