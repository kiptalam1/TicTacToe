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

    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const getCurrentPlayer = () => currentPlayer;

    return {
        startGame,
        getCurrentPlayer,
        
    }
})();

let board = Gameboard.getBoard();
let player = Player('Adams', 'O');

