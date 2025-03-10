import { useState, useEffect } from "react";

async function fetchData(path) {
  const response = await fetch(`http://localhost:3000/${path}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
}

export function ResultsScreen({handleReturnHome}) {
  const [winText, setWinText] = useState("Los jugadores empataron");
  const [timeData, setTimeData] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const data = await fetchData("get-winner");
      if (data.winner === "") {
        setWinText("Empate");
      } else {
        setWinText(`Ganador: ${data.winner}`);
      }
      setTimeData([data.player1, data.timeP1, data.player2, data.timeP2]);
    };
    setData();
  }, []);

  return (
    <div>
      <h1>Resultados</h1>
      <div>{winText}</div>
      <div>Tiempo jugado por {timeData[0]}: {timeData[1]} segundos.</div>
      <div>Tiempo jugado por {timeData[2]}: {timeData[3]} segundos.</div>
      <div>Cantidad de partidas jugadas: 2.</div>
      <button type="button" onClick={handleReturnHome}>Volver a jugar</button>
    </div>
  )
}
