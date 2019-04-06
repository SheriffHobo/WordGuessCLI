// Requires 'letter.js'
var Letter = require("./letter.js");

// Word constructor
function Word(wordArray) {
    this.wordArray = wordArray;
    this.testWord = [];
    this.makeWord = function() {
        for (var i=0; i<wordArray.length; i++) {
            var let = new Letter(wordArray[i]);
            this.testWord.push(let);
        }
    }
    this.showWord = function() {
        var wordDisplay = [];
        for (var i = 0; i < this.testWord.length; i++) {
            wordDisplay.push(this.testWord[i].displayLetter());
        }
        return wordDisplay.join(" ");
    }
    this.checkGuess = function(letterGuess) {
        for (var i = 0; i < this.testWord.length; i++) {
            this.testWord[i].check(letterGuess);
        }
    }
}

module.exports = Word;