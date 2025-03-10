class History {
  constructor() {
    const historyFile = require("../data/history.json");
    this.gameCount = Object.keys(historyFile).length;
  }
}

class Game {
  constructor(name1, name2) {
    const history = new History();
    this.id = history.gameCount;
    this.result = undefined;
    this.winner = undefined;
    this.player1 = new Player(name1);
    this.player2 = new Player(name2);
    this.currentPlayer = undefined;

    this.unusedWords = [...require("../data/words.json").words];
    this.turn1 = new Turn(1, this.getWord());
    this.turn2 = new Turn(2, this.getWord());
    this.currentTurn = 1;
  }

  getWord() {
    const i = Math.floor(this.unusedWords.length * Math.random());
    const word = this.unusedWords[i];
    this.unusedWords.splice(i, 1);
    return new Word(word);
  }
}

class Turn {
  constructor(number, word) {
    this.number = number;
    this.word = word;
    this.timeStart = undefined;
    this.timeEnd = undefined;
    this.playerWon = undefined;
    this.usedLetters = [];
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.remainingLives = 6;
    this.turn = undefined;
  }
}

class Word {
  constructor(str) {
    this.str = str;
    this.revealedPositions = [];
    this.length = str.length;
  }
}

module.exports = { Game };
