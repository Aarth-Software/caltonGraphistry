import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import btnSvg from "../../../../asserts/latestPattern.svg";
import activeBtnSvg from "../../../../asserts/pattern.svg";

const SelectButtons = () => {
  const btnArray = [
    { btn: btnSvg, grow: 2 },
    { btn: btnSvg, grow: 2 },
    { btn: btnSvg, grow: 2 },
    { btn: btnSvg, grow: 2 },
    { btn: btnSvg, grow: 3 },
    { btn: btnSvg, grow: 3 },
    { btn: btnSvg, grow: 3 },
    { btn: btnSvg, grow: 3 },
    { btn: btnSvg, grow: 4 },
    { btn: btnSvg, grow: 4 },
    { btn: btnSvg, grow: 4 },
    { btn: btnSvg, grow: 4 },
  ];
  const [activePattern, setActivePattern] = React.useState(
    new Array(btnArray.length).fill(false)
  );
  const SvgButtons = styled("img")({
    color: "darkslategray",
    padding: 4,
    borderRadius: 4,
  });

  const patternClick = (pos, e) => {
    const getUpdatePattern = activePattern.map((e, i) =>
      i === pos ? !e : false
    );
    setActivePattern(getUpdatePattern);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridAutoColumns: "3rem",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 0.9,
        rowGap: 0.5,
        pt: 0.5,
      }}
    >
      {btnArray.map(({ btn, grow }, i) => (
        <SvgButtons
          key={i}
          sx={{
            gridRow: grow,
            width: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          src={activePattern[i] ? activeBtnSvg : btnSvg}
          alt="btn"
          onClick={() => patternClick(i, btn)}
        />
      ))}
    </Box>
  );
};

export default SelectButtons;
