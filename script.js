let score = 0;
let scoreDisplay = document.querySelector('span');
let holes = document.querySelectorAll('.hole');
let playBtn = document.getElementById('playBtn');
let pauseBtn = document.getElementById('pauseBtn');
let moles = document.querySelectorAll('.showMole');
let audio = document.getElementById('myAudio')
let whack = document.getElementById("whack")
let interval;
let timeDisplay = document.getElementById('timer');
let timer;
let timeLeft = 60;
let activeMoleIndex = null;

// function playMusic() {
//     audio.play();
//     audio.currentTime = 1
// }

// function stopMusic() {
//     audio.currentTime = 0;
//     audio.stop();
// }

function getRandomMole() {
    return Math.floor(Math.random() * moles.length);
}

function showRandomMole() {
    moles.forEach(m => {
        m.classList.add('hideMole');
        m.classList.remove('showMole');
    });

    activeMoleIndex = getRandomMole();
    moles[activeMoleIndex].classList.remove('hideMole');
    moles[activeMoleIndex].classList.add('showMole');
}

function startGame() {
    timeDisplay.textContent = timeLeft;
    scoreDisplay.textContent = score;

    document.querySelector('.show1').classList.add('hidden1');
    document.querySelector('.show2').classList.add('hidden2');
    document.querySelector('.show3').classList.add('hidden3');
    document.querySelector('.show4').classList.add('hidden4');

    showRandomMole();

    interval = setInterval(() => {
        showRandomMole();
    }, 1000);

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            stopGame();
            audio.pause();

            atStart();
        }
    }, 1000);
}

function stopGame() {
    clearInterval(interval);
    clearInterval(timer);
    moles.forEach(m => m.classList.add('hideMole'));
}

playBtn.addEventListener('click', () => {
    stopGame();
    startGame();
    audio.currentTime = 1;
    audio.play();
});

function atStart() {
    moles.forEach(m => {
        m.classList.add('showMole');
        m.classList.remove('hideMole');
    });

    document.querySelector('.show1').classList.remove('hidden1');
    document.querySelector('.show2').classList.remove('hidden2');
    document.querySelector('.show3').classList.remove('hidden3');
    document.querySelector('.show4').classList.remove('hidden4');

    document.querySelector('.show1').classList.add('show1');
    document.querySelector('.show2').classList.add('show2');
    document.querySelector('.show3').classList.add('show3');
    document.querySelector('.show4').classList.add('show4');
}

pauseBtn.addEventListener('click', () => {
    stopGame();
    audio.pause();
    audio.currentTime = 0

    atStart();
});

moles.forEach((mole, index) => {
    mole.addEventListener('click', () => {
        if (index === activeMoleIndex && !mole.classList.contains('hideMole')) {
            score++;
            scoreDisplay.textContent = score;
            whack.currentTime = 0;
            whack.play();
            mole.classList.add('hideMole');
            mole.classList.remove('showMole');
            activeMoleIndex = null;
        }
    });
});
