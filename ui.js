const singlePlayerBtn = document.querySelector('#singleplayer');
const multiPlayerBtn = document.querySelector('#multiplayer');
let singlePlayer = true;

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
    // validation of input fields 
    
    const playerDataValidation = () => {
         if(gameOption !== '' && playerOneName.value !== '') {
            return true;
        } else if (gameOption === '' && playerOneName.value === '') {
            alertCreating('alert-row-one', 'Please choose one from the below mentioned options of the game!', alertMessageOne);
            alertCreating('alert-row-two', 'Please insert your name(s)!', alertMessageTwo);
            alertRemoving('alert-row-one');
            alertRemoving('alert-row-two');
        } else if (playerOneName.value === '') {
            alertCreating('alert-row-two', 'Please insert your name(s)!', alertMessageTwo);
            alertRemoving('alert-row-two');
        } else if(gameOption === '') {
            alertCreating('alert-row-one', 'Please choose one from the below mentioned options of the game!', alertMessageOne);
            alertRemoving('alert-row-one');
        } else if(playerTwoName.value === ''){
            alertCreating('alert-row-two', 'Please insert your name(s)!', alertMessageTwo);
            alertRemoving('alert-row-two');
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
    const a = 5;
    
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
        optionButtonsToggling,
    }

})();

buttonsFunctions.optionButtonsToggling(buttonsFunctions.optionButtons, 'clicked');
buttonsFunctions.optionButtonsToggling(buttonsFunctions.optionButtonsMode, 'clicked-mode');



function tooltipHandler (cell) {
    const tip = document.createElement('div');
    tip.classList.add('outer-container');
    tip.innerHTML = `
    <span class="tootlip">This spot is taken!</span>
    `;
    cell.appendChild(tip);
    setTimeout(() => cell.removeChild(tip),800);
 }