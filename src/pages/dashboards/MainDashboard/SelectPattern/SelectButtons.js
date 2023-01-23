import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const SelectButtons = ({
  btnArray,
  activePattern,
  setActivePattern,
  getPatternChange,
}) => {
  const SvgButtons = styled("img")({
    color: "darkslategray",
    padding: 4,
    borderRadius: 4,
  });

  const patternClick = (pos, e) => {
    const getUpdatePattern = activePattern.map((d, i) =>
      i === pos ? !d : false
    );
    getPatternChange(e);
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
      {btnArray.map((e, i) => (
        <SvgButtons
          key={i}
          sx={{
            gridRow: e.grow,
            width: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          src={activePattern[i] ? e.active : e.btn}
          alt="btn"
          onClick={() => patternClick(i, e)}
        />
      ))}
    </Box>
  );
};

export default SelectButtons;
