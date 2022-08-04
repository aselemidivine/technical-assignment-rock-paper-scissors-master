import "core-js/stable";
import "regenerator-runtime/runtime";

import logger from './logger';
import '../css/index.scss';
import '../css/modalResults.css';


logger('it works well!');


// Grabing the DOM elements
const choices = document.querySelectorAll('.choice'); // this puts all the classes of choices in a node list. i.e like an array
const score = document.getElementById('score');
const result = document.getElementById('results');
const restart = document.getElementById('restart');
const modalResults = document.querySelector('.result-content');
const startGame = document.querySelector('.start-btn');
// const simulateGame = document.querySelector('.simulate-btn');


const scoreboard = {
        player: 0,
        computer: 0
}

// Play game function
function play(e) { // this will be attached to an event listener
    restart.style.display = 'inline-block';  // this shows the restart button when the game begins
    startGame.style.display = 'none';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    displayWinner(winner, computerChoice);
}



// Get Computer's choice
function getComputerChoice () {
    const rand = Math.random();
    if(rand < 0.34) {
        return 'rock';
    } else if(rand <= 0.67) {
        return 'paper'
    } else {
        return'scissors';
    }
}

// Get game winner 
function getWinner(p, c) { // we basically have to use some bunch of IF statements to play this game
    if(p === c) {
        return 'draw';
    } else if(p === 'rock') {
        if(c === 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if(p === 'paper') {
        if(c === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if(p === 'scissors') {
        if(c === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}

// This function is going to show the winner by logging out the result

function displayWinner(winner, computerChoice) {
    if(winner === 'player') { // We want to increment the player score
        scoreboard.player++;
        // Show results
        result.innerHTML = `
        <h1 class="text-win"> You Win!</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice}</strong></p>
        `;

    } else if(winner === 'computer') { // We want to increment the computer score
            scoreboard.computer++;
            // Show results
            result.innerHTML = `
            <h1 class="text-lose"> You Lose!</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice}</strong></p>
            `;
    } else {
            result.innerHTML = `
            <h1> It ended up as a draw!</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice}</strong></p>
            `;
         }

        //  Show score
        score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Computer: ${scoreboard.computer}</p>
        `;

        modalResults.style.display = 'block';
}

// Restart game functionality
function restartGame() {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
    `;
    restart.style.display = 'none';
}

// Clear modal results 
function clearModalResult(e) {
    if(e.target === modalResults) {
        modalResults.style.display = 'none';
    }
}

// Event Listeners
choices.forEach(choice => choice.addEventListener('click', play));
startGame.addEventListener('click', play);
// simulateGame.addEventListener('click', simulateGamePlay);
window.addEventListener('click', clearModalResult);
restart.addEventListener('click', restartGame);


