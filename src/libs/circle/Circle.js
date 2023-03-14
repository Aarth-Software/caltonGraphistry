import React from "react";

const Circle = () => {
  return (
    <div>
      <svg
        style={{
          position: "relative",
          height: "5.5rem",
          width: "20%",
          zIndex: "0",
        }}
      >
        <circle
          cx="50%"
          cy="50%"
          r=".7rem"
          fill={true ? "white" : "#666666"}
          stroke="#666666"
          stroke-width=".1rem"
        />
      </svg>
    </div>
  );
};

export default Circle;
