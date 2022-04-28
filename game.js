'use strict';

const {
  checkWinColumns,
  checkWinRows,
  checkWinDiagonal,
  printBoard,
  symbols,
  board,
} = require('./modules/utils.js');

const changePlayer = () => {
  counterOfTurns % 2 === 0
    ? (currentSymbol = symbols[0])
    : (currentSymbol = symbols[1]);
  return currentSymbol;
};

const prompt = require('prompt-sync')({ sigint: true });

let Finish = false;
let counterOfTurns = 0;
let currentSymbol = 'X';

while (!Finish && counterOfTurns < 8) {
  printBoard();
  const currentPlayer = changePlayer();
  console.log(`Current player: ${currentPlayer}`);
  let placement = prompt('Please enter where to play: <x><y>: ')
    .trim()
    .split(' ');
  try {
    if (!symbols.includes(board[placement[0]][placement[1]]))
      board[placement[0]][placement[1]] = currentPlayer;
  } catch (error) {
    console.log(error);
  }

  if (checkWinColumns() || checkWinDiagonal() || checkWinRows()) {
    printBoard();
    console.log(`\nPlayer with ${currentPlayer} wins !`);
    break;
  }
  counterOfTurns++;
}
