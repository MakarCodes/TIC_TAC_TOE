const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];
const cellElements = Array.from(document.querySelectorAll('.cell'));
const gameBoard = document.getElementById('board');
let board;
let circleTurn; 
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningComunicate = document.querySelector('.winning-message')

startGame();

function startGame()
 {
     circleTurn = false;
     board = [
        '', '', '',
        '', '', '',
        '', '', ''
        ];

     cellElements.forEach(cell => {
         cell.addEventListener('click', handleClick, { once: true})
     })
     setBoardHoverClass();
 }

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // circleTurn is undefined, so it returns false
    //get the index of the array
    getTheIndexOfAnArray(currentClass);
    // put mark on the screen and in the array
    placeMark(cell, currentClass)
    // check fro win
    if (checkWin() == 'X') {
        winningMessageTextElement.innerText = 'X wins!'
        winningComunicate.classList.add('show');
    } else if (checkWin() == 'O') {
        winningMessageTextElement.innerText = 'O wins!'
        winningComunicate.classList.add('show');
    } 
    // check for draw
    // switch turns
    swapTurns();
    setBoardHoverClass();
}

function checkWin() {
    let winner = '';
    winningCombos.forEach(combo => {
        if(board[combo[0]] === 'X' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]] && board[combo[0]] === board[combo[2]]) {
            winner = 'X'
        } else if (board[combo[0]] === 'O' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]] && board[combo[0]] === board[combo[2]]) {
            winner = 'O'
    }})
    return winner;
}

function setBoardHoverClass() {
    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        gameBoard.classList.add(CIRCLE_CLASS)
    } else {
        gameBoard.classList.add(X_CLASS)
    }
}

function swapTurns() {
    circleTurn = !circleTurn
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function getTheIndexOfAnArray(currentClass) {
    let index_X = cellElements.findIndex( cell => {
        return cell === event.target
    })
    board[index_X] = currentClass == X_CLASS ? 'X' : 'O';
    console.log(board);
}


