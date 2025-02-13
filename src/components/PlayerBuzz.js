import React from "react";
import Timer from "./Timer";

const PlayerBuzz = ({ onBuzzIn, buzzedInPlayer, timeLeft, totalTime }) => {
  return (
    <div className="buzz-container">
      <div className="player-buzz-wrapper" style={{ position: "relative" }}>
        <button
          className={`glass-btn player1-buzz ${
            buzzedInPlayer === 1 ? "active-glow" : ""
          }`}
          onClick={() => onBuzzIn(1)}
          disabled={buzzedInPlayer !== null}
        >
          🎮 Player 1 (A Key)
        </button>
        {buzzedInPlayer === 1 && (
          <Timer timeLeft={timeLeft} totalTime={totalTime} position="left" />
        )}
      </div>
      <div className="player-buzz-wrapper" style={{ position: "relative" }}>
        <button
          className={`glass-btn player2-buzz ${
            buzzedInPlayer === 2 ? "active-glow" : ""
          }`}
          onClick={() => onBuzzIn(2)}
          disabled={buzzedInPlayer !== null}
        >
          🎮 Player 2 (L Key)
        </button>
        {buzzedInPlayer === 2 && (
          <Timer timeLeft={timeLeft} totalTime={totalTime} position="right" />
        )}
      </div>
    </div>
  );
};

export default PlayerBuzz;
