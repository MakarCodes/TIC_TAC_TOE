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
const winningComunicate = document.querySelector('.winning-message');
const restartButton = document.getElementById('restartButton');
const newGameButton = document.getElementById('newGameButton');
const startGameButton = document.getElementById('start-game');
const playerChoiceContainer = document.querySelector('.player-choice');
const optionButtons = document.querySelectorAll('.option-button');
const playerOneName = document.querySelector('#name1');
const playerTwoName = document.querySelector('#name2');
let gameOption = '';

const alertMessageOne = document.getElementById('message-alert-one');
const alertMessageTwo = document.getElementById('message-alert-two');

// eventListeners
restartButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', () => {
    playerChoiceContainer.classList.remove('active-game');
    resetGame();
    playerOneName.value = '';
    playerTwoName.value = '';
    gameOption = '';
})

optionButtons.forEach(button => {
    button.addEventListener('click', e => {
        optionButtons.forEach(button => button.classList.remove('clicked'));
        e.target.classList.add('clicked');
        gameOption = e.target.id;
    })
})

startGameButton.addEventListener('click', () => {
    if(playerDataValidation()) {
        playerChoiceContainer.classList.add('active-game');
        startGame();
    }
});


// general functions

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
    // put mark on the screen 
    placeMark(cell, currentClass)
    
    if (checkWin()) {
        endGame(false);
    } else if (checkIfIsDraw()) {
        endGame(true);
    } else {
        swapTurns();
        optionGameFlow(gameOption);
        setBoardHoverClass();
    }
}

function optionGameFlow(gameOption) {
    if(gameOption === 'player-vs-computer-easy') {
        computerMove(circleTurn);
    } else if (gameOption === 'player-vs-computer-hard') {
        computerMoveHard(circleTurn);
    }
}



// functions for COMPUTER MOVE - UNBEATABLE!!!
function computerMoveHard(circleTurn) {
    bestMove();
    if (checkWin()) {
        endGame(false);
    } else if (checkIfIsDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function bestMove() {
    let bestScore = 1000;
    let indexWhereToMove;
    board.forEach((cell, index) => {
        if(cell === '') {
            board[index] = 'O';
            let score = minimax(board, 0, true);
            console.log(score)
            board[index] = '';
            if (score < bestScore) { 
                bestScore = score;
                indexWhereToMove = index;
            }
        }
    });
    board[indexWhereToMove] = 'O';
    cellElements[indexWhereToMove].classList.add(CIRCLE_CLASS);
}


function minimax(board, depth, isMaximizing) {

    let result = checkingWinningForMiniMax();
    if(result !== null) {
        return result;
    } 
    
    if (isMaximizing) {
        let bestScore = -1000;
        board.forEach((cell, index) => {
            if(cell === '') {
                board[index] = 'X';
                let score = minimax(board, depth + 1, false);
                board[index] = '';
                bestScore = Math.max(score, bestScore);
            }
        });
        return bestScore;
    } else {
        let bestScore = 1000;
        board.forEach((cell, index) => {
            if(cell === '') {
                board[index] = 'O';
                let score = minimax(board, depth + 1, true);
                board[index] = '';
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
}


function checkingWinningForMiniMax() {
    let result = null;

    winningCombos.forEach(combo => {
    if(board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]  && board[combo[2]] === 'X') {
        result = 10;
    } 
    else if (board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]] && board[combo[2]] === 'O') {
        result = -10;
    } else if (isDraw()) {
        result = 0;
    }
    });
    return result;
}

function isDraw() {
    return board.every(cell => {
        return cell === 'X' || cell === 'O'
    });
}

// function checkingWinningForMiniMax() {
//     let result = null;
//     if(
//         board[0] === 'X' && board[1] === 'X' && board[2] === 'X' ||
//         board[3] === 'X' && board[4] === 'X' && board[5] === 'X' ||
//         board[6] === 'X' && board[7] === 'X' && board[8] === 'X' ||
//         board[0] === 'X' && board[3] === 'X' && board[6] === 'X' ||
//         board[1] === 'X' && board[4] === 'X' && board[7] === 'X' ||
//         board[2] === 'X' && board[5] === 'X' && board[8] === 'X' ||
//         board[0] === 'X' && board[4] === 'X' && board[8] === 'X' ||
//         board[2] === 'X' && board[4] === 'X' && board[6] === 'X' 
//         ) {
//             result = 10;
            
//         } else if (
//         board[0] === 'O' && board[1] === 'O' && board[2] === 'O' ||
//         board[3] === 'O' && board[4] === 'O' && board[5] === 'O' ||
//         board[6] === 'O' && board[7] === 'O' && board[8] === 'O' ||
//         board[0] === 'O' && board[3] === 'O' && board[6] === 'O' ||
//         board[1] === 'O' && board[4] === 'O' && board[7] === 'O' ||
//         board[2] === 'O' && board[5] === 'O' && board[8] === 'O' ||
//         board[0] === 'O' && board[4] === 'O' && board[8] === 'O' ||
//         board[2] === 'O' && board[4] === 'O' && board[6] === 'O' 
//         ) {
//             result = -10;
//         } else if (isDraw()) {
//             result = 0;
//         }
//         return result;
// }



// functions for COMPUTER RANDOM MOVE

function computerMove(circleTurn) {
    computerRandomMove(getIndexOfFreeSpots());
    if (checkWin()) {
        endGame(false);
    } else if (checkIfIsDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function getIndexOfFreeSpots() {
    let indexOfFreeSpots = [];
    board.forEach((cell,index) => {
       if(cell == '') {
           indexOfFreeSpots.push(index);
       }
   })
   return indexOfFreeSpots;
}

function computerRandomMove(arrayWithFreeSpotIndex){
    let randomIndex = arrayWithFreeSpotIndex[Math.floor(Math.random() * arrayWithFreeSpotIndex.length)];
    cellElements[randomIndex].classList.add(CIRCLE_CLASS);
    board[randomIndex] = 'O';
}


// functions for game flow

function resetGame() {
     winningComunicate.classList.remove('show');
     cellElements.forEach(cell => {
         cell.classList.remove(X_CLASS);
         cell.classList.remove(CIRCLE_CLASS);
     });
     optionButtons.forEach(button => button.classList.remove('clicked'));
     startGame();  
}

function checkIfIsDraw() {
    //checking if every element of an array fullfill the callback condition and returns boolean true or false
    return cellElements.every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'DRAW!'
    } else {
        let score_X = 0;
        let score_O = 0;
        cellElements.forEach(cell => {
            if(cell.classList.contains(X_CLASS)){
                score_X++;
            } else if (cell.classList.contains(CIRCLE_CLASS)){
                score_O++;
            }
        })

        winningMessageTextElement.innerText = score_X > score_O ? `X is the winner! - ${playerOneName.value}` : `O is the winner! - ${playerTwoName.value}`;
    }
    winningComunicate.classList.add('show');
}

function checkWin() {
    let winnerIsExisting;
    winningCombos.forEach(combo => {
        if(board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            winnerIsExisting = true;
        } 
    });
    return winnerIsExisting === true ? true : false;
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
}

// validation of input fields 

function playerDataValidation() {
    if(gameOption !== '' && playerOneName.value !== '') {
        return true
    } else if (gameOption === '' && playerOneName.value === '') {
        alertCreatingOne();
        alertCreatingTwo();
        setTimeout(() => document.querySelector('.alert-row-one').remove(),2000);
        setTimeout(() => document.querySelector('.alert-row-two').remove(),2000);
    } else if (playerOneName.value === '') {
        alertCreatingTwo();
        setTimeout(() => document.querySelector('.alert-row-two').remove(), 2000);
    } else if(gameOption === '') {
        alertCreatingOne();
        setTimeout(() => document.querySelector('.alert-row-one').remove(), 2000);
    }
}

function alertCreatingOne() {
    if(document.querySelector('.alert-row-one') === null){
        const div = document.createElement('div');
        div.className = 'alert-row-one';
        div.innerHTML = `
        <p>Please choose one from the below mentioned options of the game!</p>
        `
        alertMessageOne.appendChild(div);
    }
}

function alertCreatingTwo() {
    if(document.querySelector('.alert-row-two') === null){
        const div = document.createElement('div');
        div.className = 'alert-row-two';
        div.innerHTML = `
        <p>Please insert your name(s)!</p>
        `
        alertMessageTwo.appendChild(div);
    }
}