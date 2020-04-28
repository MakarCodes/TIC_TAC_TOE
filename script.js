const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let gameOption = '';
let board;
let circleTurn; 
const gameBoard = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningComunicate = document.querySelector('.winning-message');
const playerChoiceContainer = document.querySelector('.player-choice');
const playerOneName = document.querySelector('#name1');
const playerTwoName = document.querySelector('#name2');
const cellElements = Array.from(document.querySelectorAll('.cell'));


function startGame() {
     circleTurn = false;
     board = [
        '', '', '',
        '', '', '',
        '', '', ''
        ];
     cellElements.forEach(cell => {
            cell.addEventListener('click', handleClick)
     });
     gameFunctions.setBoardHoverClass();
 }

 function handleClick(e) {
    const cell = e.target;
    if(cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)){
        // cell.removeEventListener('click', handleClick);
        tooltipHandler(cell);
    } else {
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // circleTurn is undefined, so it returns false
        gameFunctions.getTheIndexOfAnArray(currentClass);
        gameFunctions.placeMark(cell, currentClass);
        
    if (gameFunctions.checkWin()) {
        gameFunctions.endGame(false);
    } else if (gameFunctions.checkIfIsDraw()) {
        gameFunctions.endGame(true);
    } else {
        gameFunctions.swapTurns();
        gameFunctions.optionGameFlow(gameOption);
    }
    }
    
}

 const gameFunctions = (() => {

    const swapTurns = () => {
        circleTurn = !circleTurn
    }
    
    const placeMark = (cell, currentClass) => {
        
        if(!cell.classList.contains(CIRCLE_CLASS)) {
            cell.classList.add(currentClass)
        }
    }
    
    const getTheIndexOfAnArray = (currentClass) => {
        let index_X = cellElements.findIndex( cell => {
            return cell === event.target
        })
        board[index_X] = currentClass == X_CLASS ? 'X' : 'O';
    }

    const checkWin = () => {
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
        let winnerIsExisting;
        winningCombos.forEach(combo => {
            if(board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
                winnerIsExisting = true;
            } 
        });
        return winnerIsExisting === true ? true : false;
    }

    const checkIfIsDraw = () => {
        return cellElements.every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
        })
    }

    const resetGame = () => {
        winningComunicate.classList.remove('show');
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
        });
        buttonsFunctions.optionButtons.forEach(button => button.classList.remove('clicked'));
        startGame();  
    }

    const endGame = (draw) => {
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

    const optionGameFlow = (gameOption) => {
        if(gameOption === 'player-vs-computer-easy') {
            playerTwoName.value = 'AI player';
            setTimeout(() => computerRandomMove.computerMove(circleTurn),200);
        } else if (gameOption === 'player-vs-computer-hard') {
            playerTwoName.value = 'AI player';
            setTimeout(() => computerSmartMove.computerMoveHard(circleTurn),200);
        } else if (gameOption === 'multiplayer') {
            setBoardHoverClass();
        }
    }

    const setBoardHoverClass = () => {
        gameBoard.classList.remove(X_CLASS);
        gameBoard.classList.remove(CIRCLE_CLASS);
        if (circleTurn) {
            gameBoard.classList.add(CIRCLE_CLASS)
        } else {
            gameBoard.classList.add(X_CLASS)
        }
    }
    return{
        swapTurns,
        placeMark,
        getTheIndexOfAnArray,
        optionGameFlow,
        checkWin,
        checkIfIsDraw,
        resetGame,
        endGame,
        setBoardHoverClass
    }
 })()


const computerRandomMove = (() => {

    const computerMove = (circleTurn) => {
        computerRandomMove(getIndexOfFreeSpots());
        if (gameFunctions.checkWin()) {
            gameFunctions.endGame(false);
        } else if (gameFunctions.checkIfIsDraw()) {
            gameFunctions.endGame(true);
        } else {
            gameFunctions.swapTurns();
        }
    }
    
    const getIndexOfFreeSpots = () => {
        let indexOfFreeSpots = [];
        board.forEach((cell,index) => {
           if(cell == '') {
               indexOfFreeSpots.push(index);
           }
       })
       return indexOfFreeSpots;
    }
    
    const computerRandomMove = (arrayWithFreeSpotIndex) =>{
        let randomIndex = arrayWithFreeSpotIndex[Math.floor(Math.random() * arrayWithFreeSpotIndex.length)];
        cellElements[randomIndex].classList.add(CIRCLE_CLASS);
        board[randomIndex] = 'O';
    }

    return { computerMove }
})()


const restartButton = document.getElementById('restartButton');
const newGameButton = document.getElementById('newGameButton');
const startGameButton = document.getElementById('start-game');
// eventListeners
restartButton.addEventListener('click', gameFunctions.resetGame);
newGameButton.addEventListener('click', () => {
    document.querySelector('.game-board-container').style.display = 'none';
    playerChoiceContainer.classList.remove('active-game');
    gameFunctions.resetGame();
    playerOneName.value = '';
    playerTwoName.value = '';
    gameOption = '';
})


startGameButton.addEventListener('click', () => {
    if(alerts.playerDataValidation()) {
        document.querySelector('.game-board-container').style.display = 'flex';
        playerChoiceContainer.classList.add('active-game');
        startGame();
    }
});

