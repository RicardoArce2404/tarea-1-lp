import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu.jsx";
import { GameScreen } from "./components/GameScreen.jsx";

function App() {
  const [isGameStarted, setGameStarted] = useState(false);
  const [names, setNames] = useState([]);
  const handleStartButton = () => {
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    setNames([name1, name2]);
    setGameStarted(true);
  };
  return (
    <>
      {!isGameStarted && <Menu handleStartButton={handleStartButton} />}
      {isGameStarted && <GameScreen names={names} />}
    </>
  );
}

export default App;
