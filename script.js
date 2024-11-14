
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
        board = ['', '', '', '', '', '', '', '', ''];
    }

    return {
        getBoard,
        placeMarker,
        resetBoard
    };
})();

function Player(name, symbol) {
    return {
        name, 
        symbol
    };
}



let board = Gameboard.getBoard();
let player = Player('Adams', 'O');

