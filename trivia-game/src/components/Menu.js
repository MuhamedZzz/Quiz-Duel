import React from "react";

const Menu = ({ startGame }) => {
  return (
    <div className="menu-container">
      <div className="glass-card main-menu">
        <h1 className="neon-title">
          Welcome to <span className="gradient-text">Quiz Duel</span>
        </h1>
        <button onClick={startGame} className="gradient-btn hover-glow">
          Start Game
        </button>
        <div className="glass-card instruction-card">
          <h2 className="neon-subtitle">How to Play</h2>
          <div className="instruction-text">
            <p>Compete head-to-head in this exciting trivia game!</p>
            <p>
              <span className="player-tag player1">Player 1:</span> Press
              <span className="key-style">A</span> to buzz in
            </p>
            <p>
              <span className="player-tag player2">Player 2:</span> Press
              <span className="key-style">L</span> to buzz in
            </p>
            <p>
              Answer with <span className="key-style">1 - 4</span> keys
            </p>
            <p className="highlight-text">First to 10 points wins! 🏆</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
