'use strict';

// Selectors
const tiles = document.querySelectorAll('.tile');
const btnReset = document.getElementById('btn-reset');
const winner = document.getElementById('winner');

// Variables
let counterOfTurns = 0;
const symbols = ['X', 'O'];
let finished = false;

const winPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Functions
const getCurrentPositions = () => {
  const positions = [];
  tiles.forEach(tile => {
    positions.push(tile.innerHTML);
  });
  return positions;
};

const changePlayer = nbOfTurns => (nbOfTurns % 2 === 0 ? 'X' : 'O');

const hasWon = () => {
  const xIndexes = getX().sort();
  const oIndexes = getO().sort();

  for (const positions of winPositions) {
    if (
      checkForThreeIdenticalValues(positions, xIndexes) ||
      checkForThreeIdenticalValues(positions, oIndexes)
    )
      return true;
  }
};

const checkForThreeIdenticalValues = (arr1, arr2) => {
  let count = 0;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) count++;
    }
  }
  return count === 3;
};

const getX = () => {
  const positions = getCurrentPositions();
  const xIndexes = [];
  positions.forEach((position, index) => {
    if (position === 'X') xIndexes.push(index);
  });
  return xIndexes;
};

const getO = () => {
  const positions = getCurrentPositions();
  const oIndexes = [];
  positions.forEach((position, index) => {
    if (position === 'O') oIndexes.push(index);
  });
  return oIndexes;
};

// Event Listeners
btnReset.addEventListener('click', () => {
  tiles.forEach(tile => {
    tile.innerHTML = '';
  });
  counterOfTurns = 0;
  finished = false;
  winner.innerHTML = 'Waiting for a winner...';
});

tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    if (!finished) {
      if (!tile.innerHTML) {
        tile.innerHTML = changePlayer(counterOfTurns);
        counterOfTurns++;
      }
      if (hasWon()) {
        counterOfTurns++;
        winner.innerHTML = `Player with ${changePlayer(
          counterOfTurns
        )} wins !!!`;
        finished = true;
        return;
      } else if (counterOfTurns === 9) {
        winner.innerHTML = `It's a draw ! Play again !`;
      }
    }
  });
});
