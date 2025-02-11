import React from "react";

const Scoreboard = ({
  player1Score,
  player2Score,
  flash1,
  flash2,
  player1Name,
  player2Name,
}) => {
  return (
    <div className="glass-card scoreboard-container">
      <div className={`score-player ${flash1 ? "score-flash-" + flash1 : ""}`}>
        <h3 className="player-tag player1">{player1Name}</h3>
        <p className="score-display neon-score">{player1Score}</p>
      </div>
      <div className="score-divider">⚔️</div>
      <div className={`score-player ${flash2 ? "score-flash-" + flash2 : ""}`}>
        <h3 className="player-tag player2">{player2Name}</h3>
        <p className="score-display neon-score">{player2Score}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
