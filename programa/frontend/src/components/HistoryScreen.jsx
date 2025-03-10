import { useState, useEffect } from "react";

export function HistoryScreen({handleReturnHome}) {
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/get-history");
      const data = await response.json();
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div>
      History Screen here
      <button type="button" onClick={handleReturnHome}>Volver al inicio</button>
    </div>
  )
}
