const { Game, History } = require("./src/entities.js");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
let game = undefined;
const history = new History();
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Test</h1>");
  return;
});

app.post("/start", (req, res) => {
  const { name1, name2 } = req.query;
  game = new Game(history.gameCount, name1, name2); // Set up game logic.
  const sp = Math.round(Math.random()); // Choose the starting player. 0: P1, 1: P2.P2.
  game.currentPlayer = sp;

  if (sp === 0) {
    game.player1.turn = 1;
    game.player2.turn = 2;
  } else {
    game.player2.turn = 1;
    game.player1.turn = 2;
  }

  const word = game.turn1.word.str;
  res.status(200).json({
    startingPlayer: sp,
    startingWord: word,
  });
  game.turn1.timeStart = Date.now();
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
  game.turn1.timeEnd = Date.now();
  game.currentTurn = 2;
  game.currentPlayer = (game.currentPlayer === 0) ? 1 : 0;
  res.status(200).json({ player: game.currentPlayer, word: game.turn2.word.str });
  game.turn2.timeStart = Date.now();
  return;
});

app.post("/end", (req, res) => {
  game.turn2.timeEnd = Date.now();

  let winner = "";
  const p1 = game.player1;
  const p2 = game.player2;
  const turnP1 = (p1.turn === 1) ? game.turn1 : game.turn2;
  const turnP2 = (p2.turn === 1) ? game.turn1 : game.turn2;
  const p1Finished = (turnP1.word.length === turnP1.word.revealedPositions.length);
  const p2Finished = (turnP2.word.length === turnP2.word.revealedPositions.length);

  if (p1Finished) {
    if (p2Finished) {
      const timeP1 = turnP1.timeEnd - turnP1.timeStart;
      const timeP2 = turnP2.timeEnd - turnP2.timeStart;
      if (timeP1 < timeP2) {
        winner = p1.name;
      } else if (timeP1 > timeP2) {
        winner = p2.name;
      } else {
        console.log("same turn time. check get-winner");
        console.log(timeP1, timeP2);
      }
    } else {
      winner = p1.name;
    }
  } else {
    if (p2Finished) {
      winner = p2.name;
    }
  }

  if (winner === "") {
    game.result = "Empate";
  } else {
    game.result = "Ganador único'"
  }
  game.winner = winner;

  history.registerGame(game.player1.name, game.player2.name, game.result, game.winner);
  res.status(200).send({});
});

app.post("/get-winner", (req, res) => {
  res.status(200).json({winner: game.winner});
});

app.get("/get-history", (req, res) => {
  res.status(200).json(history.historyData);
});

app.listen(port, () => {
  console.log("App ready");
});
