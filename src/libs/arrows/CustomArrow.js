import { withTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import React from "react";
import "../arrows/CustomArrow.css";

const CustomArrow = ({ theme, pattern, nodeC }) => {
  const xsMatches = useMediaQuery(theme.breakpoints.up("xs"));
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const xlMatches = useMediaQuery(theme.breakpoints.up("xl"));
  const xxlMatches = useMediaQuery(theme.breakpoints.up("xxl"));

  const refX = xxlMatches
    ? 13.6 //80
    : xlMatches
    ? 13.5 //100
    : lgMatches
    ? 13.5
    : mdMatches
    ? 14
    : smMatches
    ? 14.5
    : xsMatches
    ? 0
    : ["900px", "auto", "12rem"];
  return (
    <>
      <div style={{ width: "100%", height: "2rem", position: "relative" }}>
        <svg
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            height: "100%",
          }}
        >
          {nodeC ? (
            <line
              x1="0"
              x2="99.5%"
              y1="50%"
              y2="50%"
              strokeWidth=".14rem"
              stroke="#666666"
              markerStart="url(#start-circle)"
              markerEnd="url(#arrow)"
            />
          ) : (
            <line
              x1="0"
              x2="1"
              y1="50%"
              y2="50%"
              strokeWidth=".14rem"
              stroke="#666666"
              markerStart="url(#start-circle)"
            />
          )}
          <defs>
            <marker
              id="start-circle"
              markerWidth="5em"
              markerHeight="4em"
              refX=".02em"
              refY="10"
              orient="auto"
            >
              <circle
                cx="5.6"
                cy="10"
                r=".33em"
                fill={pattern.unUsedA ? "white" : "#666666"}
                stroke="#666666"
                strokeWidth=".04em"
              />
            </marker>
            {nodeC && (
              <marker
                id="arrow"
                markerWidth="4em"
                markerHeight="5em"
                refX={refX}
                refY="10"
                orient="auto"
              >
                <polygon
                  points="0 0, 5 2.5, 0 5"
                  fill="#666666"
                  transform="translate(0,7.5)"
                />
                <circle
                  cx="9.8"
                  cy="10"
                  r=".33em"
                  fill={pattern.unUsedC ? "white" : "#666666"}
                  stroke="#666666"
                  strokeWidth=".04em"
                />
              </marker>
            )}
          </defs>
        </svg>
      </div>
    </>
  );
};

export default withTheme(CustomArrow);
