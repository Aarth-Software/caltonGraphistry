import React from "react";
import "../arrows/CustomArrow.css";

const CustomArrow = () => {
  const LineRef = React.useRef(null);
  const [lineWidth, setLineWidth] = React.useState(0);
  const [x2, setX2] = React.useState(0);

  React.useEffect(() => {
    setLineWidth(LineRef.current.offsetWidth);

    function handleResize() {
      setLineWidth(LineRef.current.offsetWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    const newX2 =
      lineWidth -
      parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.7;
    setX2(newX2);
    console.log(newX2);
  }, [lineWidth]);

  return (
    <>
      <div
        ref={LineRef}
        style={{ width: "100%", height: "2rem", position: "relative" }}
      >
        <svg
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            height: "100%",
          }}
        >
          <line
            x1="0"
            x2={`${x2}`}
            y1="50%"
            y2="50%"
            strokeWidth=".14rem"
            stroke="#666666"
            markerEnd="url(#arrow)"
          />
          <path
            d="M0 50% Lcalc(100% - 1.7rem) 50%"
            stroke="#666666"
            strokeWidth=".14rem"
            markerEnd="url(#arrow)"
          />
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="3.4"
              refY="2.5"
              orient="auto"
            >
              <polygon points="0 0, 5 2.5, 0 5" fill="#666666" />
            </marker>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default CustomArrow;
