const singlePlayerBtn = document.querySelector('#singleplayer');
const multiPlayerBtn = document.querySelector('#multiplayer');
let gameOption = '';

multiPlayerBtn.addEventListener('click', e => {
  document.querySelector('.computer-mode').style.display = 'none';
  document.querySelector('.name-multiplayer').style.display = 'block';
  playerOneName.value = '';
  playerTwoName.value = '';
})

singlePlayerBtn.addEventListener('click', e => {
  document.querySelector('.computer-mode').style.display = 'block';
  document.querySelector('.name-multiplayer').style.display = 'none';
  playerOneName.value = '';
  playerTwoName.value = '';
})

const alerts = (() => {
    const alertMessageZero = document.getElementById('message-alert-zero');
    const alertMessageOne = document.getElementById('message-alert-one');
    const alertMessageTwo = document.getElementById('message-alert-two');
    
    const playerDataValidation = () => {
        if(gameOption !== '' && difficulty !== '' && playerOneName.value !== ''){
            return true;
        } else if(gameOption === 'multiplayer' && playerOneName.value !== '' && playerTwoName.value !== '' ){
            return true;
        } else {
            if (gameOption === '') {
                alertCreating('alert-row-zero', 'Please select game mode!', alertMessageZero);
                alertRemoving('alert-row-zero');
            }
            if (gameOption === 'singleplayer' && difficulty === '') {
                alertCreating('alert-row-one', 'Please choose one from the below mentioned options of the game!', alertMessageOne);
                alertRemoving('alert-row-one');
            }
            if (playerOneName.value === '') {
                alertCreating('alert-row-two', 'Please insert your name(s)!', alertMessageTwo);
                alertRemoving('alert-row-two');
            }
        }

    }
    
    const alertRemoving = (className) => {
        setTimeout(() => document.querySelector(`.${className}`).remove(),2000);
    }
    
    const alertCreating = (className, text, alertMessage) => {
        if(alertMessage.innerHTML === ''){
            const div = document.createElement('div');
            div.className = `${className}`;
            div.innerHTML = `
            <p>${text}</p>
            `
            alertMessage.appendChild(div);
        }
    }

    return { playerDataValidation }

})();

const buttonsFunctions = (() => {
    const optionButtons = document.querySelectorAll('.option-button');
    const optionButtonsMode = document.querySelectorAll('.option-button-mode');
    
    const optionButtonsToggling =  (buttons, className) => {
       buttons.forEach(button => {
           button.addEventListener('click', e => {
               buttons.forEach(button => button.classList.remove(`${className}`));
               e.target.classList.add(`${className}`);
               gameOption = e.target.id;
           })
       })
    }

    return {
        optionButtons,
        optionButtonsMode,
        optionButtonsToggling
    }

})();
buttonsFunctions.optionButtonsToggling(buttonsFunctions.optionButtons, 'clicked');
buttonsFunctions.optionButtonsToggling(buttonsFunctions.optionButtonsMode, 'clicked-mode');


let difficulty = '';
const buttonDifficulty = () => {
    document.querySelector('.buttons').addEventListener('click', e => {
        if(e.target.tagName === 'BUTTON'){
            difficulty = e.target.id;
        }
    })
    return difficulty;
}
difficulty = buttonDifficulty();



function tooltipHandler (cell) {
    const tip = document.createElement('div');
    tip.classList.add('outer-container');
    tip.innerHTML = `
    <span class="tootlip">This spot is taken!</span>
    `;
    cell.appendChild(tip);
    setTimeout(() => cell.removeChild(tip),800);
 }

