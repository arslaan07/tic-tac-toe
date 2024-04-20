document.addEventListener("DOMContentLoaded", function() {
const board = document.querySelector('.board');
let winner = null;
let currentPlayer = 'X';
const cells = Array.from({length : 9}).fill(null);

function checkWinner() {
    const winningConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    function showWinningCells(a, b, c) {
        const winningCellIndexes = [a, b, c];
    
        // Loop through each cell index in the winning combination
        for (let index of winningCellIndexes) {
            // Get the cell element corresponding to the index
            const cellElement = document.querySelector(`.cell:nth-child(${index+1})`);
    
            // Add a CSS class to highlight the cell
            cellElement.classList.add('winning-cell');
        }
    }
    for(let condition of winningConditions) {
        const [a, b, c] = condition;
        if(cells[a] && cells[a] == cells[b] && cells[a] == cells[c]) {
            showWinningCells(a,b,c);
            return cells[a];
        }
    }
    return null;

}

function handleCellClick(index) {
    if(winner || cells[index]) return;
    cells[index] = currentPlayer;
    render();

    winner = checkWinner();

    if(winner) {
        const winSound = document.getElementById('winSound');
        winSound.play();
        setTimeout(()=> {
            
            alert(`player ${winner} wins!`);
            resetGame();
        },100);
    }
    else if(!cells.includes(null)) {
        setTimeout(()=> {
            alert(`it's a draw!`);
        },100);
    }
    else {
        currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    }
}

function render() {
    board.innerHTML = '';
    cells.forEach((value, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = value || '';
      cell.addEventListener('click', () => handleCellClick(index));
      board.appendChild(cell);
    });
  }

  function resetGame() {
    cells.fill(null);
    currentPlayer = 'X';
    winner = null;
    render();
  }
  render();
})