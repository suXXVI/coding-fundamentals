const rootElem = document.querySelector(':root');
const gameElem = document.querySelector('#game');
const dinoElem = document.querySelector('.dino');
const scoreElem = document.querySelector('.score');
const groundElem = document.querySelector('.ground');
const cactusElem = document.querySelector('.cactus')


let gameSpeed = 4000;
let jumpSpeed = (gameSpeed / 10) * 2;
let maxJump = 250;
let speedScale = 1;

let gameStarted = false;
let gameOver = false;
let score = 1;

let jumping = false;
// let selfPlay = false;



function handleJump(e) {
    if (e.code !== 'Space') return;
    const audio = document.querySelector('.jump-audio');
    audio.play();
    jumping = true;
    dinoElem.classList.add('jump');    
    dinoElem.addEventListener('animationend', () => {
        jumping = false;
        dinoElem.classList.remove('jump');
    })
}

function shouldJump() {
    let cactusXpos = cactusElem.getBoundingClientRect().x;
    let minGap = 250;

    if (cactusXpos <=0 || jumping) return false;
    if (cactusXpos < minGap) {
        return true
    } else {
        return false
    }
}

function startGame() {
    gameStarted = true;
    gameElem.classList.add('game-started');
    document.addEventListener('keydown', handleJump);
    window.requestAnimationFrame(updateGame)
}

function gameEnd() {
    gameOver = true;
    const audio = document.querySelector('.die-audio');
    audio.play();
    gameElem.classList.add('game-over');
    document.removeEventListener('keydown', handleJump);
}

function setCustomProp(elem, prop, value) {
    elem.style.setProperty(prop, value)
}

// as long as the game is running this function is active
function updateGame() {
    setCustomProp(rootElem, '--game-speed', gameSpeed)
    setCustomProp(rootElem, '--jump-speed', jumpSpeed)
    setCustomProp(rootElem, '--max-jump', maxJump)
    setCustomProp(rootElem, '--speed-scale', speedScale)
    // if (selfPlay) {
    //     if (shouldJump()) {
    //         handleJump({ code: 'Space' })
    //     }
    // }
    // update the score
    updateScore()
    // randomize cactus
    updateCactus()
    // check if gameover & add collision
    if (checkGameOver()) {
        gameEnd();
        return;
    }
    window.requestAnimationFrame(updateGame)
}

function checkGameOver() {
    if (gameOver) return true;
    let dinoRect = dinoElem.getBoundingClientRect();
    let cactusRect = cactusElem.getBoundingClientRect();

    if (isCollision(dinoRect, cactusRect)) {
        return true;
    } else {
        return false
    }
}

function isCollision(dinoRect, cactusRect) {  
    // AABB - Axis-aligned bounding box  
    return (
            dinoRect.x < cactusRect.x + cactusRect.width &&
            dinoRect.x + dinoRect.width > cactusRect.x &&
            dinoRect.y < cactusRect.y + cactusRect.height &&
             dinoRect.y + dinoRect.height > cactusRect.y
     );
}

let scoreInterval = 50;
let currentScoreInterval = 0;
function updateScore() {
    currentScoreInterval += 1;
    if (currentScoreInterval % scoreInterval === 0) {
        score += 1;
    } else {
        return;
    }
    
    if (score % 100 === 0) {
        const audio = document.querySelector('.point-audio');
        audio.play();
        gameSpeed -= speedScale;
        jumpSpeed = (gameSpeed / 10) * 2;
    }

    const currentScoreElem = document.querySelector('.current-score');
    currentScoreElem.textContent = score.toString().padStart(5, '0')
}

function updateCactus() {
    const cactusXpos = cactusElem.getBoundingClientRect().x;
    const isOffScreen = cactusXpos > window.innerWidth;
    if(isOffScreen === false) return;

    const cacti = ['cactus-small-1', 'cactus-small-2', 'cactus-small-3'];
    const randomNum = Math.floor(Math.random() * cacti.length);
    const cactus = cacti[randomNum];
    cactusElem.classList.remove(   
        'cactus-small-1', 
        'cactus-small-2', 
        'cactus-small-3'
    )
    cactusElem.classList.add(cactus);
}

function fitScreen() {
    let width = window.innerWidth;
    let height = window.innerHeight / 2;
    gameElem.style.width = width + 'px';
    gameElem.style.height = height + 'px';
}

window.onload = () => {
    fitScreen()
    window.addEventListener('resize', fitScreen)
    // let selfPlayElem = document.querySelector('#selfplay')
    // selfPlayElem.addEventListener('change', () => {
    //     selfPlay = selfPlayElem.checked
    // })
    document.addEventListener('keydown', startGame, { once: true });
}