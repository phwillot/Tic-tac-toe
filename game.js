// Tic-tac-toe game

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

board[0][2] = board[1][1] = board[2][0] = 'X';

printBoard();
