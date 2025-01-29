import React, { useEffect } from "react";
import confetti from "canvas-confetti";

const GameOver = ({ winner, scoreboard, playAgain }) => {
  useEffect(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <div className="game-over-container">
      <div className="game-over-glass">
        <div className="game-over-content">
          <h1 className="game-over-title">🏆 Victory! 🏆</h1>
          <h2 className="winner-text">
            Winner:{" "}
            <span
              className="winner-name"
              style={{ color: winner === "Player 1" ? "#ff6b6b" : "#4ecdc4" }}
            >
              {winner}
            </span>
          </h2>
          <div className="score-card">
            <p className="score-player neon-text">
              Player 1: {scoreboard.player1} Points
            </p>
            <p className="score-player neon-text">
              Player 2: {scoreboard.player2} Points
            </p>
          </div>
          <button onClick={playAgain} className="play-again-btn hover-glow">
            🎮 Play Again 🎮
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
