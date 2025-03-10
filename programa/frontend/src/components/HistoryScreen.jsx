import { useState, useEffect } from "react";

export function HistoryScreen({ handleReturnHome }) {
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/get-history");
      const data = await response.json();

      const body = document.getElementById("history-body");
      for (let i = 0; i < data.length; i++) {
        const p1 = data[i].player1;
        const p2 = data[i].player2;
        const result = data[i].result;
        const winner = (result === "Empate") ? "N/A" : data[i].winner;

        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");

        cell1.textContent = p1;
        cell2.textContent = p2;
        cell3.textContent = result;
        cell4.textContent = winner;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        body.appendChild(row);
      }

      console.log(data);
    };
    getData();
  }, []);

  return (
    <div>
      <table className="table history-table">
        <thead>
          <tr>
            <th>Jugador 1</th>
            <th>Jugador 2</th>
            <th>Resultado</th>
            <th>Ganador</th>
          </tr>
        </thead>
        <tbody id="history-body">
        </tbody>
      </table>
      <button type="button" onClick={handleReturnHome}>
        Volver al inicio
      </button>
    </div>
  );
}
