import React, { useState } from "react";

const CategorySelector = ({ categories, selectedCategory, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-dropdown-container">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="selected-category">{selectedCategory}</span>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>

      {isOpen && (
        <div className="dropdown-options">
          {categories.map((category) => (
            <div
              key={category}
              className={`option ${
                category === selectedCategory ? "active" : ""
              }`}
              onClick={() => {
                onSelect(category);
                setIsOpen(false);
              }}
            >
              {category}
              {category === selectedCategory && (
                <span className="checkmark">✔</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
