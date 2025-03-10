import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu.jsx";
import { GameScreen } from "./components/GameScreen.jsx";
import { ResultsScreen } from "./components/ResultsScreen.jsx";
import { HistoryScreen } from "./components/HistoryScreen.jsx";

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

  const handleReturnHome = () => {
    setGameStage("not_started");
  }

  const handleHistoryButton = () => {
    setGameStage("history");
  };

  return (
    <>
      {(gameStage === "not_started") && <Menu handleStartButton={handleStartButton} handleHistoryButton={handleHistoryButton} />}
      {(gameStage === "started") && <GameScreen names={names} handleGameEnd={handleGameEnd} />}
      {(gameStage === "finished") && <ResultsScreen handleReturnHome={handleReturnHome} />}
      {(gameStage === "history") && <HistoryScreen handleReturnHome={handleReturnHome} />}
    </>
  );
}

export default App;
