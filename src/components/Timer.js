import React from "react";

const Timer = ({ timeLeft, totalTime, position }) => {
  const percentage = timeLeft / totalTime;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage);
  // Interpolate from green (when time is full) to red (when time is up)
  const r = Math.round(255 * (1 - percentage));
  const g = Math.round(255 * percentage);
  const color = `rgb(${r}, ${g}, 0)`;

  const timerStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    ...(position === "left" ? { left: "-80px" } : { right: "-80px" }),
  };

  return (
    <div className="timer" style={timerStyle}>
      <svg width="70" height="70">
        <circle
          cx="35"
          cy="35"
          r={radius}
          fill="none"
          stroke="#555"
          strokeWidth="5"
        />
        <circle
          cx="35"
          cy="35"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 35 35)"
          style={{
            transition: "stroke-dashoffset 50ms linear, stroke 50ms linear",
          }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="bold"
        >
          {Math.ceil(timeLeft / 1000)}
        </text>
      </svg>
    </div>
  );
};

export default Timer;
