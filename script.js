const grids = document.querySelectorAll('.grid');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
  [0, 1, 2],   // Horizontal top
  [3, 4, 5],   // Horizontal middle
  [6, 7, 8],   // Horizontal bottom
  [0, 3, 6],   // Vertical left
  [1, 4, 7],   // Vertical middle
  [2, 5, 8],   // Vertical right
  [0, 4, 8],   // Diagonal from top-left to bottom-right
  [2, 4, 6]    // Diagonal from top-right to bottom-left
];

grids.forEach(grid => grid.addEventListener('click', gridClicked));
resetBtn.addEventListener('click', resetGame);

function gridClicked() {
  const gridIndex = this.getAttribute('data-index');

  if (gameBoard[gridIndex] !== '' || !gameActive) return;

  gameBoard[gridIndex] = currentPlayer;
  this.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      roundWon = true;
      highlightWinninggrids([a, b, c], i);
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (!gameBoard.includes('')) {
    statusText.textContent = 'It\'s a Draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function highlightWinninggrids(winninggrids, conditionIndex) {
  const classMap = [
    'horizontal',    // [0, 1, 2]
    'horizontal',    // [3, 4, 5]
    'horizontal',    // [6, 7, 8]
    'vertical',      // [0, 3, 6]
    'vertical',      // [1, 4, 7]
    'vertical',      // [2, 5, 8]
    'diagonal-left', // [0, 4, 8]
    'diagonal-right' // [2, 4, 6]
  ];
  
  const winClass = classMap[conditionIndex];
  
  winninggrids.forEach(index => {
    grids[index].classList.add('win', winClass);
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  grids.forEach(grid => {
    grid.textContent = '';
    grid.classList.remove('win', 'horizontal', 'vertical', 'diagonal-left', 'diagonal-right');
  });
}
