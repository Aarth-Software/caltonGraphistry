import { Box, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { withTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { setActivePatternWhenRetrive } from "../../../../redux/slices/serviceSlice";
import { useDispatch } from "react-redux";
import useStateContextHook from "../../../../libs/StateProvider/useStateContextHook";
import { getPatternChange } from "../../../../redux/slices/querySlice";
import { setFilterArray } from "../../../../redux/slices/filterSlice";

const SvgButtons = styled("img")({
  color: "darkslategray",
  // padding: ".5rem",
  // borderRadius: 4,
  cursor: "pointer",
});
const SelectButtons = React.memo((props) => {
  const dispatch = useDispatch();
  const { setNodeState } = useStateContextHook();
  const { activePattern } = useSelector((state) => state.service);
  const { filterInitialState } = useSelector((state) => state.filters);
  const { theme, btnArray } = props;
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

  const patternClick = (pos, e) => {
    // console.log(e);
    dispatch(getPatternChange(e, setNodeState));
    dispatch(setActivePatternWhenRetrive(pos));
    dispatch(setFilterArray(filterInitialState));
  };

  // console.log(filterInitialState);
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
