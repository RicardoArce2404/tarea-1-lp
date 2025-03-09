import { useState, useEffect } from "react";

async function fetchData(path) {
  const response = await fetch(`http://localhost:3000/${path}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
}

export function GameScreen({ names }) {
  const [word, setWord] = useState("");
  const [appearances, setAppearances] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [playerNum, setPlayerNum] = useState(0);
  const [turn, setTurn] = useState(0);
  const [remainingLives, setRemainingLives] = useState(6);

  useEffect(() => {
    const setData = async () => {
      if (turn === 0) {
        const data = await fetchData(`start?n1=${names[0]}&n2=${names[1]}`);
        setWord(data.startingWord);
        setPlayerNum(data.startingPlayer);
      } else {
        const data = await fetchData("change-turn");
        setWord(data.word);
        setAppearances([]);
        setUsedLetters([]);
        setPlayerNum(data.player);
        setRemainingLives(6);
      }
    };
    setData();
  }, [names, turn]);

  const checkLetter = async () => {
    const text = document.getElementById("letter").value;
    if (text.length !== 1 || usedLetters.includes(text)) {
      return;
    }
    const data = await fetchData(`check-letter?letter=${text}`);
    usedLetters.push(text);
    setAppearances(appearances + data.appearances);
    setRemainingLives(data.remainingLives);
    if (data.completed) {
      console.log("win");
      await new Promise((r) => setTimeout(r, 2000));
      setTurn(1);
    }
  };

  const letters = [];
  for (let i = 0; i < word.length; i++) {
    if (appearances.includes(i)) {
      letters.push(<div className="letter">{word[i]}</div>);
    } else {
      letters.push(<div className="letter">-</div>);
    }
  }

  return (
    <div className="game-screen">
      <div className="player-name">
        <h1>Es el turno de: {names[playerNum]}</h1>
      </div>
      <div className="word">{...letters}</div>
      <div className="controls">
        <input type="text" name="letter" id="letter" placeholder="-" />
        <button type="button" onClick={checkLetter}>
          Probar
        </button>
      </div>
      <div>Vidas restantes: {remainingLives}</div>
    </div>
  );
}
