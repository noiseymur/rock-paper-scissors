let header = document.querySelector('.header');
let scissors = document.querySelector('.scissors');
let paper = document.querySelector('.paper');
let rock = document.querySelector('.rock');
let choiceTexts = document.querySelector('.game-area').querySelectorAll('p');
let houseChoice = document.querySelector('.house-choice');
let winningStatus = document.querySelector('.winning-status');
let replayBtn = document.querySelector('.replay');
let timesWon = document.querySelector('.times-won');
let timesLost = document.querySelector('.times-lost');
let clearScoreBtn = document.querySelector('.clear');

let userSelected = 'none';
let houseSelected = 'none';
let selectedMove;

let wonCount = 0;
let lostCount = 0;

if(localStorage.getItem('scores')){
    wonCount = JSON.parse(localStorage.getItem('scores')).won;
    lostCount = JSON.parse(localStorage.getItem('scores')).lost;
    timesWon.innerText = wonCount;
    timesLost.innerText = lostCount;
}

rock.addEventListener('click',(e)=>{
    userSelected = 'rock';
    rock.classList.add('selected-bw');
    paper.classList.add('left-fw');
    scissors.classList.add('left-fw');
    selectedMove = e.target;
    gameOn();
});

paper.addEventListener('click',(e)=>{
    userSelected = 'paper';
    rock.classList.add('left-bw');
    paper.classList.add('selected-bw');
    scissors.classList.add('left-fw');
    selectedMove = e.target;
    gameOn();
});

scissors.addEventListener('click',(e)=>{
    userSelected = 'scissors';
    rock.classList.add('left-bw');
    paper.classList.add('left-bw');
    scissors.classList.add('selected-bw');
    selectedMove = e.target;
    gameOn();
});

function gameOn () {
    makeHouseChoice();
    styleHouseChoice(houseSelected);
    choicesAppear();
    houseChoiceAppear();
    showResults();
}

function choicesAppear () {
    setTimeout(() => {
        choiceTexts.forEach(text=>{
            if(!text.classList.contains('winning-status'))
                text.classList.add('show');
            }
        );}, 1200);
}

function makeHouseChoice () {
    let choice = Math.floor(Math.random()*3);
    console.log(choice);
    switch (choice) {
        case 0:
            houseSelected = 'rock';
            break;
        case 1:
            houseSelected = 'paper';
            break;
        case 2:
            houseSelected = 'scissors';
            break;
        default:
            houseSelected = 'none';
            break;
    }

}

function styleHouseChoice(choice) {
    let props = {
        color: 'red',
        imgPath: './img/icon-rock.svg'
    }
    if(choice==='rock'){
        null;
    }
    else if(choice==='paper'){
        props.color = 'blue';
        props.imgPath = './img/icon-paper.svg'
    }
    else {
        props.color = 'rgb(0, 255, 98)',
        props.imgPath = './img/icon-scissors.svg'
    }

    houseChoice.style.backgroundColor = props.color;
    houseChoice.querySelector('img').src = props.imgPath;
}

function houseChoiceAppear () {
    setTimeout(() => {
        houseChoice.classList.add('show');
    }, 2500);
}

function showResults () {
    let result = "You Won"
    if(userSelected===houseSelected){
        result = "It's a Draw";
    }
    else if((userSelected==='rock'&&houseSelected==='paper')||(userSelected==='paper'&&houseSelected==='scissors')
    ||(userSelected==='scissors'&&houseSelected==='rock')){
        result = "The House Won";
        lostCount += 1;
    }
    else{
        wonCount += 1;
    }

    let newScores = {
        won: wonCount,
        lost: lostCount
    }

    localStorage.clear();
    localStorage.setItem('scores',JSON.stringify(newScores));

    winningStatus.innerText = result;

    setTimeout(() => {
        winningStatus.classList.add('show');
        timesWon.innerText = wonCount;
        timesLost.innerText = lostCount;
        setTimeout(() => {
            replayBtn.classList.add('show');
        }, 1500);

        if(result==="You Won"){
            selectedMove.classList.add('outer-glow');
        }
        else if(result==="The House Won"){
            houseChoice.classList.add('outer-glow');
        }
        
    }, 3000);
}

replayBtn.addEventListener('click',(e)=>{
    e.target.classList.remove('show');
    winningStatus.classList.remove('show');
    houseChoice.classList.remove('show','outer-glow');
    choiceTexts.forEach(text=>text.classList.remove('show'));
    setTimeout(() => {
        rock.classList = 'rock';
        paper.classList = 'paper';
        scissors.classList = 'scissors';
    }, 500);
});

clearScoreBtn.addEventListener('click',()=>{
    wonCount = 0;
    lostCount = 0;
    timesLost.innerText = lostCount;
    timesWon.innerText = wonCount;
    localStorage.clear();
})