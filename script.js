'use strict';

// Selectarea elementelor
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); //mai rapid
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnnhold = document.querySelector('.btn--hold');
const current0Player = document.querySelector('.player--0');
const current1Player = document.querySelector('.player--1');

let scores, currentScore, playing, activePlayer;
//Conditiile de start

const initializare = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  current0Player.classList.add('player--active');
  current1Player.classList.remove('player--active');
  current0Player.classList.remove('player--winner');
  current1Player.classList.remove('player--winner');
};
initializare();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  current0Player.classList.toggle('player--active');
  current1Player.classList.toggle('player--active');
};
//Invartirea zarului
btnroll.addEventListener('click', function () {
  if (playing) {
    //1.Generez un nr random
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Afisez zarul
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    //3.verifica daca zarul este 1 : daca da ,ii se termina tura
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //A nimerit 1,schimba jucatorul
    else {
      switchPlayer();
    }
  }
});

btnnhold.addEventListener('click', function () {
  if (playing) {
    //1.Pune scorul in banca
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.verifica daca scorul este 100 ? castiga:continua jocul
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceElement.classList.add('hidden');
      //finish game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    //3. schimba jucatorul
    else switchPlayer();
  }
});

btnnew.addEventListener('click', initializare());
//Varianta slaba
// diceElement.classList.add('hidden');
// for (let i = 0; i <= 1; i++) {
//   scores[i] = 0;
// }
// activePlayer = 0;
// current0Player.classList.add('player--active');
// current1Player.classList.remove('player--active');
// let playing = true;
// document.getElementById(`score--${activePlayer}`).textContent =
//   scores[activePlayer];
