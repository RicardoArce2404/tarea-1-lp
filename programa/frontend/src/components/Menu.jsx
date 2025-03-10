export function Menu({ handleStartButton, handleHistoryButton }) {
  return (
    <div className="menu">
      <div className="menu-player-names">
        <input type="text" id="name1" placeholder="Jugador 1"/>
        <input type="text" id="name2" placeholder="Jugador 2"/>
      </div>
      <div className="menu-options">
        <button type="button" onClick={handleStartButton}>
          Iniciar Juego
        </button>
        <button type="button" onClick={handleHistoryButton} >Ver historial de resultados</button>
      </div>
    </div>
  );
}
