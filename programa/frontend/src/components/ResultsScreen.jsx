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
  useEffect(() => {
    const setData = async () => {
      const data = await fetchData("get-winner");
      if (data.winner === "") {
        setWinText("Empate");
      } else {
        setWinText(`Ganador: ${data.winner}`);
      }
    };
    setData();
  }, []);

  return (
    <div>
      <h1>Resultados</h1>
      <div>{winText}</div>
      <button type="button" onClick={handleReturnHome}>Volver a jugar</button>
    </div>
  )
}
