//  Pages
const gamePage = document.querySelector('#game-page');
const scorePage = document.querySelector('#score-page');
const splashPage = document.querySelector('#splash-page');
const countdownPage = document.querySelector('#countdown-page');
// Splash Page
const startForm = document.querySelector('#start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');



// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = [];


// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Displays Game Page
function showGamePage() {
  gamePage.hidden = false;
  countdownPage.hidden = true;
}

// Get Random Number up to a certain amount
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}




// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  console.log('correct equations:', correctEquations);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  console.log('wrong equations:', wrongEquations);
  // Loop through for each correct equation, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);


  
  }
  // Loop through for each wrong equation, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    
    const formatChoice = getRandomInt(2);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
  console.log('equation array:',equationsArray);
  equationsToDOM();
}



// Add Equations to DOM
function equationsToDOM() {
  equationsArray.forEach((equation) => {
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Equation Text
    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;
    // Append
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
}



// Displays 3, 2, 1, GO!
function countdownStart() {
  countdown.textContent = '3';
  setTimeout(() => {
    countdown.textContent = '2';
  }, 1000);
  setTimeout(() => {
    countdown.textContent = '1';
  }, 2000);
  setTimeout(() => {
    countdown.textContent = 'GO!';
  }, 3000);
}



// Navigate from Splash Page to CountdownPage to Game Page
function showCountdown() {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart();
  createEquations();
  setTimeout(showGamePage, 4000);
}

// Get the value from selected radio button
function getRadioValue() {
    let radioValue;
    radioInputs.forEach((radioInput) => {
      if (radioInput.checked) {
        radioValue = radioInput.value;
      }
    });
    return radioValue;
  }

  // Form that decides amount of Questions
function selectQuestionAmount(e) {
    e.preventDefault();
    questionAmount = getRadioValue();
    console.log('question amount:', questionAmount);
    // if (questionAmount) {
        showCountdown();
    // }
  }


// Switch selected input styling
startForm.addEventListener('click', () => {
    radioContainers.forEach((radioEl) => {
      // Remove Selected Label Styling
      radioEl.classList.remove('selected-label');
      // Add it back if radio input is checked
      if (radioEl.children[1].checked) {
        radioEl.classList.add('selected-label');
      }
    });
  });

// Event Listeners
startForm.addEventListener('submit', selectQuestionAmount);