const { Game } = require('./src/entities.js');

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
let game = undefined;

app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Test</h1>');
  return;
})

app.post('/start', (req, res) => {
  const { name1, name2 } = req.query;
  game = new Game(name1, name2);  // Set up game logic.
  const sp = Math.round(Math.random());  // Choose the starting player. 0: P1, 1: P2.P2.
  const word = game.round1.word.str;
  res.status(200).json({
    startingPlayer: sp,
    startingWord: word
  });
  return;
})

app.post('/check-letter', (req, res) => {
  const { letter } = req.query;
  if (game === undefined) {
    res.status(400).send('Please start the game first.')
    return;
  }

  const round = (game.currentRound === 1) ? game.round1 : game.round2;
  if (round.usedLetters.includes(letter)) {
    console.log('Something wrong in /check-letter. The letter already appeared before.');
    res.status(400).json({});
    return;
  }
  round.usedLetters.push(letter);

  const str = round.word.str;
  const appearances = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === letter) {
      appearances.push(i);
      round.word.revealedPositions.push(i);
    }
  }

  if (round.word.length === round.word.revealedPositions.length) {
    game.currentRound = 2;
    res.status(200).json({ appearances: appearances, finish: true });
    return;
  }
  res.status(200).json({ appearances: appearances });
  return;
})

app.listen(port, () => {
  console.log('App ready');
})
