const fs = require("node:fs");

class History {
  constructor() {
    this.historyData = JSON.parse(fs.readFileSync("data/history.json", "utf8"));
    this.gameCount = Object.keys(this.historyData).length;
  }

  registerGame(player1, player2, result, winner) {
    const gameData = {
      player1: player1,
      player2: player2,
      result: result,
      winner: winner
    };
    this.historyData.push(gameData);
    fs.writeFileSync("data/history.json", JSON.stringify(this.historyData));
    this.historyData = JSON.parse(fs.readFileSync("data/history.json", "utf8"));
  }
}

class Game {
  constructor(id, name1, name2) {
    this.id = id;
    this.result = undefined;
    this.winner = undefined;
    this.player1 = new Player(name1);
    this.player2 = new Player(name2);
    this.currentPlayer = undefined;

    this.unusedWords = JSON.parse(fs.readFileSync("data/words.json", "utf8")).words;
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

module.exports = { Game, History };
