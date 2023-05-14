const API_LINK = 'https://api.api-ninjas.com/v1/randomword';
const apikey = '1Wbgx+NedcqN7hnk7E3qlA==XHydK9SbJWj2Tti5';

const randomWord = document.querySelector('.word');
const letterButtons = document.querySelectorAll('.letter-btn');
const generateBtn = document.querySelector('.generate-btn');
const header = document.querySelector('.header');
const triesLeft = document.querySelector('.tries');

let wrongGuesses = 7;
let targetWord = '';



// generate the random word
async function callAPI() {
    const response = await fetch(API_LINK, {
        headers: {
            'X-API-KEY': apikey
        },
        contentType: 'application/json',
    })
    const data = await response.json();
    return data;   
};


// display the generated word as underscores
function displayWordAsUnderscores( {word} ) {
    const underscores = '_ '.repeat(word.length).trim();
    randomWord.textContent = underscores;  
    console.log(randomWord);
};


// grab the letter that was clicked
letterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const clickedLetter = button.innerText;
        handleClickedLetter(clickedLetter);
    });
});



// pass the clicked letter into this function and replace underscore with letter
function handleClickedLetter(letter) {
    const displayedWord = randomWord.textContent;
    const displayedWordArr = displayedWord.split(' ');
    
    let updatedWordArr =[];
    let foundMatch = false;

    for (let i = 0; i < targetWord.length; i++) {
        if (targetWord[i] === letter) {
            updatedWordArr[i] = letter;
            foundMatch = true;
        } else if (displayedWordArr !== '_') {
            updatedWordArr[i] = displayedWordArr[i];  
        } else {
            updatedWordArr[i] = '_';
            
        }
    }
   
    if (!foundMatch) {  // If no match is found, decrement wrongGuesses
        wrongGuesses--;
        triesLeft.textContent = wrongGuesses;
    }
    
    const updatedWord = updatedWordArr.join(' ');
    randomWord.textContent = updatedWord;

    // check if user lost
    if (wrongGuesses < 1) {
        header.textContent ='Game Over'
        triesLeft.textContent = 'gg, press generate word button to restart.';
    }

    // check if user won
    if (updatedWord.indexOf('_') === -1) {
        header.textContent = 'You Won!'
        letterButtons.disable = true;
    }
};


// generate a random word and assign it to a variable
generateBtn.addEventListener('click', async () => {
    const data = await callAPI();

    letterButtons.disable = false;
    header.textContent = 'Guess the word!'
    wrongGuesses = 7;
    triesLeft.textContent = wrongGuesses;
    targetWord = data.word.toUpperCase();
    console.log(targetWord)

    displayWordAsUnderscores(data);
});
