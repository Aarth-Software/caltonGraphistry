import { Box, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { withTheme } from "@emotion/react";

const SvgButtons = styled("img")({
  color: "darkslategray",
  // padding: ".5rem",
  // borderRadius: 4,
});
const SelectButtons = React.memo((props) => {
  const { theme, btnArray, activePattern, setActivePattern, getPatternChange } =
    props;
  const xsMatches = useMediaQuery(theme.breakpoints.up("xs"));
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const xlMatches = useMediaQuery(theme.breakpoints.up("xl"));
  const xxlMatches = useMediaQuery(theme.breakpoints.up("xxl"));

  const buttonWidth = xxlMatches
    ? ["3rem", 2.4]
    : xlMatches
    ? ["3rem", 1.8]
    : lgMatches
    ? ["3rem", 1.7]
    : mdMatches
    ? ["2.9rem", 1.5]
    : smMatches
    ? ["2.8rem", 1.5]
    : xsMatches
    ? ["2.8rem", 1.5]
    : ["2rem", 1.5];

  console.log(buttonWidth);

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
        rowGap: buttonWidth[1],
        pt: -2,
      }}
    >
      {btnArray.map((e, i) => (
        <SvgButtons
          key={i}
          sx={{
            gridRow: e.grow,
            width: buttonWidth[0],
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

export default withTheme(SelectButtons);
