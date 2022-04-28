'use strict';
const symbols = ['X', 'O'];
const board = new Array(3).fill(0).map(() => new Array(3).fill('-'));

const printBoard = function () {
  let i = 0;
  console.log('  0 1 2');
  board.forEach(row => {
    console.log(i.toString(), row.join(' '));
    i++;
  });
};

const checkWinRows = function () {
  let hasWon = false;
  board.forEach(row => {
    symbols.forEach(symbol => {
      const win = row.every(value => value === symbol);
      if (win) hasWon = true;
    });
  });
  return hasWon;
};

const checkWinColumns = function () {
  let symbolsList = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      symbolsList.push(board[j][i]);
    }
  }
  const sliced = sliceIntoChunks(symbolsList, 3);
  sliced.forEach(row => {
    const win = row.every(symbol => symbol === 'X' || symbol === 'O');
    console.log(row); // TO DO Check why it doesnt win
    if (win) return true;
  });
};

const checkWinDiagonal = function () {
  let hasWon = false;
  const symbolsDiag = [];
  const symbolsAntiDiag = [];
  symbolsDiag.push(board[0][0], board[1][1], board[2][2]);
  symbolsAntiDiag.push(board[0][2], board[1][1], board[2][0]);

  symbols.forEach(symbol => {
    if (
      symbolsDiag.every(value => value === symbol) ||
      symbolsAntiDiag.every(value => value === symbol)
    )
      hasWon = true;
  });
  return hasWon;
};

const sliceIntoChunks = function (arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

module.exports = {
  checkWinColumns,
  checkWinRows,
  checkWinDiagonal,
  printBoard,
  symbols,
  board,
};
