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

while (!finished && counterOfTurns < 10) {
  counterOfTurns++;
  printBoard();

  if (!badMove) currentPlayer = changePlayer();

  console.log(`Current player: ${currentPlayer}`);
  let placement = play();

  if (!symbols.includes(board[placement[0]][placement[1]])) {
    board[placement[0]][placement[1]] = currentPlayer;
    badMove = false;
  } else {
    badMove = true;
    continue;
  }

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
