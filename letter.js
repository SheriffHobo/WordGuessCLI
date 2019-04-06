// Letter constructor
function Letter(alpha) {
    this.alpha = alpha;
    this.guessed = false;
    // Displays an underscore, letter, or blank if the word has a blank
    this.displayLetter = function() {
        if (this.alpha === " ") {
            return " ";
        }
        else if(!this.guessed) {
            return "_".green;
        }
        else {
            return this.alpha;
        }
    }
    // 'check' changes the boolean value of the user guess if it's correct
    this.check = function(userGuess) {
        if (userGuess === this.alpha) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;