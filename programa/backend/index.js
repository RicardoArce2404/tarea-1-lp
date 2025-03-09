const { Game } = require("./src/entities.js");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
let game = undefined;

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Test</h1>");
  return;
});

app.post("/start", (req, res) => {
  const { name1, name2 } = req.query;
  game = new Game(name1, name2); // Set up game logic.
  const sp = Math.round(Math.random()); // Choose the starting player. 0: P1, 1: P2.P2.
  game.currentPlayer = sp;
  const word = game.turn1.word.str;
  res.status(200).json({
    startingPlayer: sp,
    startingWord: word,
  });
  return;
});

app.post("/check-letter", (req, res) => {
  const { letter } = req.query;
  if (game === undefined) {
    res.status(400).send("Please start the game first.");
    return;
  }

  const turn = game.currentTurn === 1 ? game.turn1 : game.turn2;
  const player = game.currentPlayer === 0 ? game.player1 : game.player2;
  if (turn.usedLetters.includes(letter)) {
    console.log(
      "Something wrong in /check-letter. The letter already appeared before.",
    );
    res.status(400).json({});
    return;
  }
  turn.usedLetters.push(letter);

  const str = turn.word.str;
  const appearances = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === letter) {
      appearances.push(i);
      turn.word.revealedPositions.push(i);
    }
  }
  if (appearances.length === 0) {
    player.remainingLives -= 1;
  }

  if (turn.word.length === turn.word.revealedPositions.length) {
    game.currentTurn = 2;
    res.status(200).json({ appearances: appearances, completed: true });
    return;
  }
  res
    .status(200)
    .json({ appearances: appearances, remainingLives: player.remainingLives });
  return;
});

app.post("/change-turn", (req, res) => {
  game.currentTurn = 2;
  const nextPlayer = game.currentPlayer === 0 ? 1 : 0;
  res.status(200).json({ player: nextPlayer, word: game.turn2.word.str });
  return;
});

app.listen(port, () => {
  console.log("App ready");
});
