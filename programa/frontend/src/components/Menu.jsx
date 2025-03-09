export function Menu({ handleStartButton }) {
  return (
    <div className="menu">
      <input type="text" id="name1" placeholder="Jugador 1"/>
      <input type="text" id="name2" placeholder="Jugador 2"/>
      <button type="button" onClick={handleStartButton}>
        Iniciar Juego
      </button>
      <button type="button">Ver historial de resultados</button>
    </div>
  );
}
