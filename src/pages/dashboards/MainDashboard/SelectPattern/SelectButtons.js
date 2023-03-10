import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const SelectButtons = React.memo((props) => {
  const { btnArray, activePattern, setActivePattern, getPatternChange } = props;
  const SvgButtons = styled("img")({
    color: "darkslategray",
    // padding: 2,
    // borderRadius: 4,
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
        rowGap: 2,
        pt: -2,
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
});

export default SelectButtons;
