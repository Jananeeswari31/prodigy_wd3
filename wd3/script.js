document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });

    function handleClick(e) {
        const cellIndex = parseInt(e.target.id.split('-')[1]);
        if (gameState[cellIndex] !== '' || !gameActive) return;

        gameState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            announceWinner(currentPlayer);
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            announceDraw();
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === player;
            });
        });
    }

    function announceWinner(player) {
        alert(`Player ${player} wins!`);
    }

    function announceDraw() {
        alert('It\'s a draw!');
    }
});
