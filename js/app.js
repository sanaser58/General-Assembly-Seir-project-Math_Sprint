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
let thirdNumber = 0;
let fourthNumber = 0;
let fifthNumber = 0;
let sixthNumber = 0;
let seventhNumber = 0;
let eighthNumber = 0;
let equationObject = {};
const wrongFormat = [];


// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

// Scroll
let valueY = 0;

// Reset Game
function playAgain() {
  gamePage.addEventListener('click', startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  playerGuessArray = [];
  valueY = 0;
  playAgainBtn.hidden = true;
}

// Show Score Page
function showScorePage() {
  // Show Play Again button after 1 second delay
  setTimeout(() => {
    playAgainBtn.hidden = false;
  }, 1000);
  gamePage.hidden = true;
  scorePage.hidden = false;
}

// Format & Display Time in DOM
function scoresToDOM() {
  finalTimeDisplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);
  baseTimeEl.textContent = `Base Time: ${baseTime}s`;
  penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;
  showScorePage()
  // Scroll to Top, go to Score Page
  itemContainer.scrollTo({ top: 0, behavior: 'instant' });
  showScorePage();
}


// Stop Timer, Process Results, go to Score Page
function checkTime() {
  console.log(timePlayed);
  if (playerGuessArray.length == questionAmount) {
    // console.log('player guess arry:',playerGuessArray);
    clearInterval(timer);
    // Check for wrong guess, add penaltyTime
    equationsArray.forEach((equation, index) => {
      if (equation.evaluated === playerGuessArray[index]) {
//         // Correct Guess, No Penalty
      } else {
//         // Incorrect Guess, Add Penalty
        penaltyTime += 0.5;
      }
    });
    finalTime = timePlayed + penaltyTime;
    console.log('time:', timePlayed, 'penalty:', penaltyTime, 'final:', finalTime);
    scoresToDOM();
  }
 }

// Add a tenth of a second to timePlayed
function addTime() {
  timePlayed += 0.1;
  checkTime();
}

// Start timer when game page is clicked
function startTimer() {
  // Reset times
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
    // call the function with in our start timer
  timer = setInterval(addTime, 100);
  // remove the event listener that is triggering this function, so that this function can be triggered once. 
  gamePage.removeEventListener('click', startTimer);
}

// Scroll, Store user selection in playerGuessArray
function select(guessedTrue) {
  // console.log('player guess arry:',playerGuessArray);
  // Scroll 80 more pixels
  valueY += 80;
  itemContainer.scroll(0, valueY);
  // Add player guess to array
  return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false');
}


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
    thirdNumber = getRandomInt(9);
    fourthNumber = getRandomInt(9);
    fifthNumber = getRandomInt(9);
    sixthNumber = getRandomInt(9);
    seventhNumber = getRandomInt(9);
    eighthNumber = getRandomInt(9);


    const equationValue = firstNumber + secondNumber;
    const equationValueB = thirdNumber - fourthNumber;
    const equationValueC = fifthNumber * sixthNumber;
    const equationValueD = seventhNumber / eighthNumber;
    
    const equation = `${firstNumber} + ${secondNumber} = ${equationValue}`;
    const equationB = `${firstNumber} - ${secondNumber} = ${equationValueB}`;
    const equationC = `${firstNumber} * ${secondNumber} = ${equationValueC}`;
    const equationD = `${firstNumber} / ${secondNumber} = ${equationValueD}`;

    equationObject = { value: equation,value2: equationB,value3: equationC,value4: equationD, evaluated: 'true' };
    equationsArray.push(equationObject);
  
  }

  // Loop through for each wrong equation, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    thirdNumber = getRandomInt(9);
    fourthNumber = getRandomInt(9);
    fifthNumber = getRandomInt(9);
    sixthNumber = getRandomInt(9);
    seventhNumber = getRandomInt(9);
    eighthNumber = getRandomInt(9);


   
    const equationValue = firstNumber + secondNumber;
    wrongFormat[0] = `${firstNumber} + ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} + ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} + ${secondNumber} = ${equationValue}`;


    const equationValueB = thirdNumber - fourthNumber;
    wrongFormat[3] = `${thirdNumber} - ${fourthNumber + 1} = ${equationValueB}`;
    wrongFormat[4] = `${thirdNumber} - ${fourthNumber} = ${equationValueB}`;
    wrongFormat[5] = `${thirdNumber + 1} - ${fourthNumber} = ${equationValueB}`;



    const equationValueC = fifthNumber * sixthNumber;
    wrongFormat[6] = `${fifthNumber} * ${sixthNumber + 1} = ${equationValueC}`;
    wrongFormat[7] = `${fifthNumber} * ${sixthNumber} = ${equationValueC - 1}`;
    wrongFormat[8] = `${fifthNumber + 1} * ${sixthNumber} = ${equationValueC}`;


    const equationValueD = seventhNumber / eighthNumber;
    wrongFormat[0] = `${seventhNumber} / ${eighthNumber + 1} = ${equationValueD}`;
    wrongFormat[1] = `${seventhNumber} / ${eighthNumber} = ${equationValueD - 1}`;
    wrongFormat[2] = `${seventhNumber + 1} / ${eighthNumber} = ${equationValueD}`;
      
    const formatChoice = getRandomInt(9);
    const formatChoiceB = getRandomInt(9);
    const formatChoiceC = getRandomInt(9);
    const formatChoiceD = getRandomInt(9);


    const equation = wrongFormat[formatChoice];
    const equationB = wrongFormat[formatChoiceB];
    const equationC = wrongFormat[formatChoiceC];
    const equationD = wrongFormat[formatChoiceD];



    equationObject = { value: equation,value2: equationB,value3: equationC,value4: equationD, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
  // console.log('equation array:',equationsArray);
  // equationsToDOM();
}



// Add Equations to DOM
function equationsToDOM() {

  // for (let i =0; i < equationsArray.length; i++){
  //   let randomEquation = Math.floor(Math.random() * equationsArray.length)
  //   console.log(equationsArray[randomEquation]) 
  // }

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


// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDOM();

  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
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
  populateGamePage();
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
    if (questionAmount) {
        showCountdown();
    }
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
gamePage.addEventListener('click', startTimer);
startForm.addEventListener('submit', selectQuestionAmount);