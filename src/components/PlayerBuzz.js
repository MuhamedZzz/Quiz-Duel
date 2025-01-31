import React from "react";

const PlayerBuzz = ({ onBuzzIn, buzzedInPlayer }) => {
  return (
    <div className="buzz-container">
      <button
        className={`glass-btn player1-buzz ${
          buzzedInPlayer === 1 ? "active-glow" : ""
        }`}
        onClick={() => onBuzzIn(1)}
        disabled={buzzedInPlayer !== null}
      >
        🎮 Player 1 (A Key)
      </button>
      <button
        className={`glass-btn player2-buzz ${
          buzzedInPlayer === 2 ? "active-glow" : ""
        }`}
        onClick={() => onBuzzIn(2)}
        disabled={buzzedInPlayer !== null}
      >
        🎮 Player 2 (L Key)
      </button>
    </div>
  );
};

export default PlayerBuzz;
