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
const startGameButton = document.getElementById('start-game');
const playerChoiceContainer = document.querySelector('.player-choice');
const optionButtons = document.querySelectorAll('.option-button');

// eventListeners
restartButton.addEventListener('click', resetGame);
startGameButton.addEventListener('click', e => {
    playerChoiceContainer.classList.add('active-game');
})

optionButtons.forEach(button => {
    button.addEventListener('click', e => {
        optionButtons.forEach(button => button.classList.remove('clicked'));
        e.target.classList.add('clicked');
    })
})

// functions
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
    // put mark on the screen 
    placeMark(cell, currentClass)
    
    if (checkWin()) {
        endGame(false);
    } else if (checkIfIsDraw()) {
        endGame(true);
    } else {
        swapTurns();
        computerMove(circleTurn);
        setBoardHoverClass();
    }
}

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

  //check witch spot is free - return number of free spots
  function getIndexOfFreeSpots() {
    let indexOfFreeSpots = [];
    board.forEach((cell,index) => {
       if(cell == '') {
           indexOfFreeSpots.push(index);
       }
   })
   return indexOfFreeSpots;
}
//generate random move on free spot - in relatio to number of free spots
function computerRandomMove(arrayWithFreeSpotIndex){
    let randomIndex = arrayWithFreeSpotIndex[Math.floor(Math.random() * arrayWithFreeSpotIndex.length)];
    cellElements[randomIndex].classList.add(CIRCLE_CLASS);
    board[randomIndex] = 'O';
    console.log(board);
}

function resetGame() {
     winningComunicate.classList.remove('show');
     cellElements.forEach(cell => {
         cell.classList.remove(X_CLASS);
         cell.classList.remove(CIRCLE_CLASS);
        //  cell.removeEventListener('click', handleClick)
     });
     playerChoiceContainer.classList.remove('active-game');
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

        // if(score_X > score_O) {
        //     winningMessageTextElement.innerText = 'X is the winner!'
        // } else {
        //     winningMessageTextElement.innerText = 'O is the winner!'
        // }

        winningMessageTextElement.innerText = score_X > score_O ? 'X is the winner!' : 'O is the winner!';
        
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
    console.log(board);
}

