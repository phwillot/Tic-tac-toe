'use strict';

const {
  checkWinColumns,
  checkWinRows,
  checkWinDiagonal,
  printBoard,
  play,
  symbols,
  board,
} = require('./modules/utils.js');

let finished = false;
let badMove = false;
let counterOfTurns = 0;
let currentSymbol = 'X';
let currentPlayer;

const changePlayer = () => {
  counterOfTurns % 2 === 0
    ? (currentSymbol = symbols[0])
    : (currentSymbol = symbols[1]);
  return currentSymbol;
};

const checkPosition = position => {
  if (position.length != 2) return false;
  else if (isNaN(position[0]) || isNaN(position[1])) return false;
  else if (position[0] > 2 || position[1] > 2) return false;
  else return true;
};

while (!finished && counterOfTurns < 10) {
  if (!badMove) {
    counterOfTurns++;
    currentPlayer = changePlayer();
    printBoard();
  }

  if (counterOfTurns === 1) currentPlayer === 'X';

  console.log(`Current player: ${currentPlayer}`);
  let placement = play();
  if (!checkPosition(placement)) {
    badMove = true;
    console.log('Please enter a valid position');
    continue;
  } else if (!symbols.includes(board[placement[0]][placement[1]])) {
    board[placement[0]][placement[1]] = currentPlayer;
    badMove = false;
  } else badMove = true;

  finished = checkWinColumns() || checkWinDiagonal() || checkWinRows();
  if (finished) {
    printBoard();
    console.log(`Player with ${currentPlayer} wins !`);
    finished = true;
  } else if (counterOfTurns === 9 && !finished) {
    printBoard();
    console.log(`It's a draw!`);
  }
}
