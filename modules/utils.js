'use strict';

const prompt = require('prompt-sync')({ sigint: true });

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
  let hasWon = false;
  let symbolsList = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      symbolsList.push(board[j][i]);
    }
  }
  const sliced = sliceIntoChunks(symbolsList, 3);
  sliced.forEach(row => {
    for (const symbol of symbols) {
      const win = row.every(value => value === symbol);
      if (win) hasWon = true;
    }
  });
  return hasWon;
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

const play = function () {
  return prompt('Please enter where to play (x y): ').trim().split(' ');
};

module.exports = {
  checkWinColumns,
  checkWinRows,
  checkWinDiagonal,
  printBoard,
  play,
  symbols,
  board,
};
