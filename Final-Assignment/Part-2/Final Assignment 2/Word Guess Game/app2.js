const API_LINK = 'https://api.api-ninjas.com/v1/randomword';
const apikey = '1Wbgx+NedcqN7hnk7E3qlA==XHydK9SbJWj2Tti5';

const randomWord = document.querySelector('.word');
const letterButtons = document.querySelectorAll('.letter-btn');
const generateBtn = document.querySelector('.generate-btn');

let targetWord = '';
let guessedLetters = [];
let remainingAttempts = 7;

async function callAPI() {
  const response = await fetch(API_LINK, {
    headers: {
      'X-API-KEY': apikey,
    },
    contentType: 'application/json',
  });
  const data = await response.json();
  console.log(data);
  return data;
}

function displayWordAsUnderscores() {
  const underscores = '_ '.repeat(targetWord.length);
  randomWord.textContent = underscores;
}

function updateDisplayedWord() {
  const displayedWord = Array.from(targetWord)
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');
  randomWord.textContent = displayedWord;
}

function handleGuess(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);

    if (targetWord.includes(letter)) {
      updateDisplayedWord();

      if (!randomWord.textContent.includes('_')) {
        endGame(true); // All letters guessed, player wins
      }
    } else {
      remainingAttempts--;

      if (remainingAttempts <= 0) {
        endGame(false); // No more attempts, player loses
      }
    }
  }
}

function endGame(isWin) {
  // Disable letter buttons and generate button
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  generateBtn.disabled = true;

  if (isWin) {
    alert('Congratulations! You guessed the word correctly!');
  } else {
    alert(`Game over! The word was "${targetWord}". Refresh Page to try again!`);
  }
}

letterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const letter = button.textContent;
    handleGuess(letter);
  });
});

generateBtn.addEventListener('click', async () => {
  const data = await callAPI();

  targetWord = data.word.toUpperCase();
  guessedLetters = [];
  remainingAttempts = 7;

  displayWordAsUnderscores();
});

