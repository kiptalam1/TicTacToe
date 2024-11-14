// game board object
const Gameboard  = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => [...board];
    
    const placeMarker = (index, mark) => {
        if (board[index] === "" && index >= 0 && index < 9) {
            board[index] = mark;
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        for (let i=0; i<board.length; i++) {
            board[i] = '';
        }
    }

    return {
        getBoard,
        placeMarker,
        resetBoard
    };
})();


// player object
function Player(name, symbol) {
    return {
        name, 
        symbol
    };
}


// game object
const GameController = (() => {
    let currentPlayer;
    let player1;
    let player2;
    let gameOver = false;

    const startGame = (p1Name, p2Name) => {
        player1 = Player(p1Name, "X");
        player2 = Player(p2Name, "O");
        currentPlayer = player1;
        gameOver = false;
        Gameboard.resetBoard();
    };

    const playTurn = (index) => {
        if (gameOver) return "Game Over";
        // check if player can place marker
        if (Gameboard.placeMarker(index, currentPlayer.symbol)) {
            if (checkWinner(currentPlayer.symbol)) {
                gameOver = true;
                return `${currentPlayer.name} wins`;
            }

            if (isBoardFull()) {
                gameOver = true;
                return "It's a draw!";
            }

            switchPlayer();
            return `${currentPlayer.name}'s turn`;
        } else {
            return `Invalid move! Try again.`;
        };
    }

    const isBoardFull = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const getCurrentPlayer = () => currentPlayer;

    const checkWinner = (symbol) => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ]

        return winningCombos.some(combo => 
            combo.every(index => Gameboard.getBoard()[index] === symbol)
        );
    };

    return {
        startGame,
        getCurrentPlayer,
        playTurn
    }
})();

// object to control the dom
const DisplayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-button');

    // cells eventListeners
    cells.forEach(cell => {
        cell.addEventListener('click', (event) => {
        if (GameController.gameOver) return; // Prevent further clicks if the game is over
    
        const index = event.target.getAttribute('data-index');
        const result = GameController.playTurn(index);
    
        if (result === `Invalid move! Try again.`) return; // Ignore invalid moves
    
        updateBoard(); // Update the board after a valid move
        statusDisplay.textContent = result;

        if (result.includes("wins")) {
            statusDisplay.classList.remove('draw', 'game-over');
            statusDisplay.classList.add('win');
        } else if (result.includes("draw")) {
            statusDisplay.classList.remove('game-over', 'win');
            statusDisplay.classList.add('draw');
        } else {
            statusDisplay.classList.remove('game-over', 'win', 'draw');
        }
    
        if (result.includes("wins") || result.includes("draw")) {
            gameOver = true;
        }
        });
    });

    // update the visual display of the board
    const updateBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, i) => {
            cell.textContent = board[i];
        });
    }

 // Restart button functionality
restartButton.addEventListener('click', () => {
    GameController.startGame("Player 1", "Player 2");
    updateBoard();
    statusDisplay.textContent = "Player 1's turn";

    // Enable cells again for the next game
    cells.forEach(cell => {
        cell.style.pointerEvents = 'auto';  // Re-enable clicking
        cell.textContent = '';  // Clear the cell content
    });
});


    return {
        updateBoard
    }
})();

window.onload = () => {
    GameController.startGame("Player 1", "Player 2"); // Start the game with default player names
    DisplayController.updateBoard(); // Ensure the board is displayed correctly
    document.getElementById('game-status').textContent = "Player 1's turn"; // Set the initial turn status
};