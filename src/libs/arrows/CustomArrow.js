import React from "react";
import "../arrows/CustomArrow.css";
const CustomArrow = () => {
  return (
    <>
      <div style={{ width: "100%", height: "2rem", position: "relative" }}>
        <svg
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          width="100%"
          height="100%"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="4"
              refY="2.5"
              orient="auto"
            >
              <polygon points="0 0, 5 2.5, 0 5" fill="#666666" />
            </marker>
          </defs>
          <line
            x1="0"
            y1="50%"
            x2="calc(100% - 1.7rem)"
            y2="50%"
            strokeWidth=".14rem"
            stroke="#666666"
            markerEnd="url(#arrow)"
          />
        </svg>
      </div>
    </>
  );
};

export default CustomArrow;
