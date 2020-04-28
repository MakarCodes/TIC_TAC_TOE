const computerSmartMove = (() => {
    const computerMoveHard = (circleTurn) => {
        bestMove();
        if (gameFunctions.checkWin()) {
            gameFunctions.endGame(false);
        } else if (gameFunctions.checkIfIsDraw()) {
            gameFunctions.endGame(true);
        } else {
            gameFunctions.swapTurns();
        }
    }
    
    const bestMove = () => {
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
    
    
    const minimax = (board, depth, isMaximizing) => {
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
    
    
    const isDraw = () => {
        return board.every(cell => {
            return cell === 'X' || cell === 'O'
        });
    }
    
    const checkingWinningForMiniMax = () => {
        let result = null;
        if(
            board[0] === 'X' && board[1] === 'X' && board[2] === 'X' ||
            board[3] === 'X' && board[4] === 'X' && board[5] === 'X' ||
            board[6] === 'X' && board[7] === 'X' && board[8] === 'X' ||
            board[0] === 'X' && board[3] === 'X' && board[6] === 'X' ||
            board[1] === 'X' && board[4] === 'X' && board[7] === 'X' ||
            board[2] === 'X' && board[5] === 'X' && board[8] === 'X' ||
            board[0] === 'X' && board[4] === 'X' && board[8] === 'X' ||
            board[2] === 'X' && board[4] === 'X' && board[6] === 'X' 
            ) {
                result = 10;
                
            } else if (
            board[0] === 'O' && board[1] === 'O' && board[2] === 'O' ||
            board[3] === 'O' && board[4] === 'O' && board[5] === 'O' ||
            board[6] === 'O' && board[7] === 'O' && board[8] === 'O' ||
            board[0] === 'O' && board[3] === 'O' && board[6] === 'O' ||
            board[1] === 'O' && board[4] === 'O' && board[7] === 'O' ||
            board[2] === 'O' && board[5] === 'O' && board[8] === 'O' ||
            board[0] === 'O' && board[4] === 'O' && board[8] === 'O' ||
            board[2] === 'O' && board[4] === 'O' && board[6] === 'O' 
            ) {
                result = -10;
            } else if (isDraw()) {
                result = 0;
            }
            return result;
    }

    return{
        computerMoveHard
    }
})()
