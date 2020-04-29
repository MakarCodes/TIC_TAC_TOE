const singlePlayerBtn = document.querySelector('#singleplayer');
const multiPlayerBtn = document.querySelector('#multiplayer');
let singlePlayer = true;
let gameOption = 'singleplayer';

multiPlayerBtn.addEventListener('click', e => {
  singlePlayer = false;
  document.querySelector('.computer-mode').style.display = 'none';
  document.querySelector('.name-multiplayer').style.display = 'block';
})

singlePlayerBtn.addEventListener('click', e => {
  singlePlayer = true;
  document.querySelector('.computer-mode').style.display = 'block';
  document.querySelector('.name-multiplayer').style.display = 'none';
})

const alerts = (() => {
    const alertMessageOne = document.getElementById('message-alert-one');
    const alertMessageTwo = document.getElementById('message-alert-two');
    
    const playerDataValidation = () => {
        if(gameOption !== '' && difficulty !== '' && playerOneName.value !== ''){
            return true;
        } else if (gameOption === 'singleplayer' && difficulty === '' && playerOneName.value !== ''){
            alertCreating('alert-row-one', 'Please choose one from the below mentioned options of the game!', alertMessageOne);
            alertRemoving('alert-row-one');
        } else if (gameOption === 'singleplayer' && difficulty === '' && playerOneName.value === '') {
            alertCreating('alert-row-one', 'Please choose one from the below mentioned options of the game!', alertMessageOne);
            alertCreating('alert-row-two', 'Please insert your name(s)!', alertMessageTwo);
            alertRemoving('alert-row-one');
            alertRemoving('alert-row-two');
        } else if(gameOption === 'multiplayer' && playerOneName.value === '' || playerTwoName.value === '' ){
            alertCreating('alert-row-two', 'Please insert your name(s)!', alertMessageTwo);
            alertRemoving('alert-row-two');
        } else if(gameOption === 'multiplayer' && playerOneName.value !== '' && playerTwoName.value !== '' ){
            return true;
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
    console.log('hej')
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

