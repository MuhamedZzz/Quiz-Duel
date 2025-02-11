import React from "react";
import CategorySelector from "./CategorySelector";
import PlayerNameInput from "./PlayerNameInput";

const Menu = ({
  startGame,
  categories,
  selectedCategory,
  onCategoryChange,
  player1Name,
  player2Name,
  onPlayer1NameChange,
  onPlayer2NameChange,
}) => {
  return (
    <div className="menu-container">
      <div className="menu-wrapper">
        <PlayerNameInput
          label="Player 1"
          currentName={player1Name}
          onApply={onPlayer1NameChange}
        />

        <div className="glass-card main-menu">
          <h1 className="neon-title">
            Welcome to <span className="gradient-text">Quiz Duel</span>
          </h1>

          <div className="menu-options">
            <div className="category-selector-wrapper">
              <label className="category-label neon-text">
                Select Category:
              </label>
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={onCategoryChange}
              />
            </div>

            <button onClick={startGame} className="gradient-btn hover-glow">
              Start Game
            </button>
          </div>

          <div className="glass-card instruction-card">
            <h2 className="neon-subtitle">How to Play</h2>
            <div className="instruction-text">
              <p>Compete head-to-head in this exciting trivia game!</p>
              <p>
                <span className="player-tag player1">Player 1:</span> Press{" "}
                <span className="key-style">A</span> to buzz in
              </p>
              <p>
                <span className="player-tag player2">Player 2:</span> Press{" "}
                <span className="key-style">L</span> to buzz in
              </p>
              <p>
                Answer with <span className="key-style">1 - 4</span> keys
              </p>
              <p>
                ✅ Correct Answer: Gain +1 point ❌ Incorrect Answer: Lose -1
                point
              </p>

              <p className="highlight-text">First to 5 points wins! 🏆</p>
            </div>
          </div>
        </div>

        <PlayerNameInput
          label="Player 2"
          currentName={player2Name}
          onApply={onPlayer2NameChange}
        />
      </div>
    </div>
  );
};

export default Menu;
