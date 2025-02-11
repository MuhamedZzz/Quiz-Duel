import React, { useState } from "react";

const PlayerNameInput = ({ label, currentName, onApply }) => {
  const [inputName, setInputName] = useState(currentName);
  const [feedback, setFeedback] = useState("");

  const handleApply = () => {
    onApply(inputName);
    setFeedback("Name updated!");
    setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <div className="player-name-input-container">
      {/* Conditionally style the label: blue for Player 2, red for Player 1 */}
      <h2 style={{ color: label === "Player 2" ? "#4ecdc4" : "#ff6b6b" }}>
        {label}
      </h2>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        className="player-name-input"
      />
      <button onClick={handleApply} className="apply-name-btn">
        Apply
      </button>
      {feedback && <div className="name-feedback">{feedback}</div>}
    </div>
  );
};

export default PlayerNameInput;
