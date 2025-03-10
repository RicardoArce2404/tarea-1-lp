import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu.jsx";
import { GameScreen } from "./components/GameScreen.jsx";
import { ResultsScreen } from "./components/ResultsScreen.jsx";

async function fetchData(path) {
  const response = await fetch(`http://localhost:3000/${path}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
}

function App() {
  const [gameStage, setGameStage] = useState("not_started");
  const [names, setNames] = useState([]);

  const handleStartButton = () => {
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    setNames([name1, name2]);
    setGameStage("started");
  };

  const handleGameEnd = async () => {
    await fetchData("end");
    setGameStage("finished");
    console.log("end")
  }

  const handleRestart = () => {
    setGameStage("not_started");
  }

  return (
    <>
      {(gameStage === "not_started") && <Menu handleStartButton={handleStartButton} />}
      {(gameStage === "started") && <GameScreen names={names} handleGameEnd={handleGameEnd} />}
      {(gameStage === "finished") && <ResultsScreen handleRestart={handleRestart} />}
    </>
  );
}

export default App;
