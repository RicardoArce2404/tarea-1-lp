import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isGameStarted, setGameStarted] = useState(false);
  const handleStartButton = () => {
    setGameStarted(true);
  };
  return (
    <>
      {!isGameStarted && <Menu handleStartButton={handleStartButton} />}
      {isGameStarted && <GameScreen />}
    </>
  );
}

function Menu({ handleStartButton }) {
  return (
    <div className="menu">
      <button type="button" onClick={handleStartButton}>
        Iniciar Juego
      </button>
      <button type="button">Ver historial de resultados</button>
    </div>
  );
}

function GameScreen() {
  const [word, setWord] = useState("");
  const [appearances, setAppearances] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/start?n1=Yass&n2=Cris", {
        method: "POST",
      });
      const data = await response.json();
      setWord(data.startingWord);
    };
    getData();
  }, []);

  const checkLetter = async () => {
    const text = document.getElementById("letter").value;
    if (text.length !== 1) {
      return;
    }
    const response = await fetch(
      `http://localhost:3000/check-letter?letter=${text}`,
      {
        method: "POST",
      },
    );
    const data = await response.json();
    setAppearances(appearances + data.appearances);
  }

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
      <div className="word">{...letters}</div>
      <div className="controls">
        <input type="text" name="letter" id="letter" placeholder="-" />
        <button type="button" onClick={checkLetter}>Probar</button>
      </div>
    </div>
  );
}

export default App;
