'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const curScore0 = document.getElementById('current--0');
const curScore1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currScore,
  activePlayer,
  playing,
  scores = [0, 0];

const handleNewGame = () => {
  dice.classList.add('hidden');
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  curScore1.textContent = 0;
  currScore = 0;
  activePlayer = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  playing = true;
};

handleNewGame();

const handleToggle = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  console.log(activePlayer);
};

btnRoll.addEventListener('click', () => {
  if (playing) {
    const randomDice = Math.floor(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      handleToggle();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      handleToggle();
    }
  }
});

btnNew.addEventListener('click', handleNewGame);
