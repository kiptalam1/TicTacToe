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

let board = Gameboard.getBoard();
let player = Player('Adams', 'O');

