import React from "react";

const ArrowDownSvg = ({ nodePostionState, solidState }) => {
  return (
    <div
      id="don"
      style={{
        width: "6rem",
        height: "1.8rem",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        top: nodePostionState ? "4.44rem" : "2.66rem",
        zIndex: !solidState ? "100" : "0",
      }}
    >
      <svg
        style={{
          position: "absolute",
          height: "5.5rem",
          width: "100%",
          //   fill: "yellow",
          zIndex: "0",
        }}
      >
        <circle
          cx="50%"
          cy="50%"
          r=".7rem"
          fill={!solidState ? "white" : "#666666"}
          stroke="#666666"
          strokeWidth=".1rem"
        />
        {!nodePostionState && (
          <>
            <line
              x1="50%"
              y1="63%"
              x2="50%"
              y2="74%"
              stroke="#666666"
              strokeWidth=".13rem"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                viewBox="0 0 10 10"
                refX="4"
                refY="5"
                markerWidth=".45rem"
                markerHeight=".45rem"
                orient="auto-start-reverse"
              >
                <polygon points="0,0 10,5 0,10" fill="#666666" />
              </marker>
            </defs>
          </>
        )}
      </svg>
    </div>
  );
};

export default ArrowDownSvg;
