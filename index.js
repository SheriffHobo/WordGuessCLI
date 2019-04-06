var Word = require("./word.js");
var inquirer = require('inquirer');
var colors = require('colors');

wordList = ["ODERUS URUNGUS", "BALSAC THE JAWS OF DEATH", "BONESNAPPER THE CAVE TROLL", "SLEAZY P MARTINI", "PUSTULUS MAXIMUS", "TECHNO DESTRUCTO", "SLYMENSTRA HYMEN", "BLOTHAR THE BERZERKER"];
var select = 0;
var targetWord = "";
var gameWord = "";
var counter = 0;

// Picks a word from the array and uses word.js to display. 'targetWord' is used to compare words
function startGame() {
    if (wordList.length < 2) {
        wordList = ["ODERUS URUNGUS", "BALSAC THE JAWS OF DEATH", "BONESNAPPER THE CAVE TROLL", "SLEAZY P MARTINI", "PUSTULUS MAXIMUS", "TECHNO DESTRUCTO", "SLYMENSTRA HYMEN", "BLOTHAR THE BERZERKER"];
    }
    select = Math.floor(Math.random() * wordList.length);
    targetWord = wordList[select];
    gameWord = new Word(targetWord);
    gameWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\nHuman filth! You've got 8 chances to guess this GWAR character.\n".green)
    promptUser();
}

//Prompts user for their guess and restarts the game if they run out of questions.
function promptUser() {
    if (counter < 8) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter. ".green
            }
        ]).then(function (data) {
            checkAnswer(data);
        });
    }
    else {
        console.log("\nYou're out of guesses slave!\n".green);
        console.log(targetWord.green);
        targetWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

// Checks if users letter is in the correct format and compares it to the target word.
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
            console.log("\nNope, wrong letter!\n".green);
            counter++;
            console.log(((8 - counter) + " guesses remaining").green);
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\nEnter one letter at a time.\n".green);
        promptUser();
    }
}

//If the guessed letter is correct, it will be displayed. If they guess the word, the game resets and restarts.
function rightGuess() {
    console.log("\nYou guessed correctly.\n".green);
    if (targetWord.replace(/ /g, "") == (gameWord.showWord()).replace(/ /g, "")) {
        console.log(gameWord.showWord().green);
        console.log('\nWell done maggot!!!\n'.green);
        targetWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
}

startGame();