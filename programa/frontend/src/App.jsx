import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu.jsx";
import { GameScreen } from "./components/GameScreen.jsx";
import { ResultsScreen } from "./ResultsScreen.jsx";

function App() {
  const [gameStage, setGameStage] = useState("not_started");
  const [names, setNames] = useState([]);
 
  const handleStartButton = () => {
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    setNames([name1, name2]);
    setGameStage("started");
  };

  const handleGameEnd = () => {
    setGameStage("finished");
  }

  return (
    <>
      {(gameStage === "not_started") && <Menu handleStartButton={handleStartButton} />}
      {(gameStage === "started") && <GameScreen names={names} handleGameEnd={handleGameEnd} />}
      {(gameStage === "finished") && <ResultsScreen />}
    </>
  );
}

export default App;
