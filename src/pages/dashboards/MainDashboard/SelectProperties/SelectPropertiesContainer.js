import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  firstInputComStyle,
  firstInputLineStyles,
  flexCenter,
  flexItemCenterStart,
  horizentalLineStyles,
  inputBoxConStyle,
  lineArrowStyles,
  secondInputComStyle,
  thirdInputComStyles,
  unUsedNodeStyleProp,
  nodeCCircleStyleProp,
  nodeACircleStyleProp,
  nodeBCircleStyleProp,
} from "../../../../libs/JSS/Jss";
import StandardAffiliationBar from "./Affiliation/StandardAffiliationBar";
// import { rgba } from "polished";
// import { css } from "@emotion/react";

// const illustrationCardStyle = (props) => css`
//   ${props.theme.palette.mode !== "dark" &&
//   `
//     background: ${rgba(props.theme.palette.primary.main, 0.125)};
//     color: ${props.theme.palette.primary.main};
//   `}
// `;
// const Card = styled(Box)`
//   ${illustrationCardStyle}
// `;
const Line = styled("span")(horizentalLineStyles);

const SelectPropertiesContainer = React.memo((props) => {
  const { pattern, nodeState, setNodeState } = props;
  const { nodeA, nodeB, nodeC } = pattern;
  const rowNodePattern = pattern?.series
    ? { top: "1.7rem" }
    : firstInputLineStyles;
  const selectDropDownValue = (e) => {
    const { name, value } = e.target;
    if (!!nodeState[name].pointer && !!value) {
      setNodeState({
        ...nodeState,
        [name]: { ...nodeState[name], value: value, disableInput: false },
        [nodeState[name].pointer]: {
          ...nodeState[nodeState[name].pointer],
          value: "",
          inputValue: "",
          disableDropDown: false,
          disableInput: true,
        },
      });
    } else if (!!value) {
      const { disableInput } = nodeState[name];
      if (disableInput !== undefined) {
        setNodeState({
          ...nodeState,
          [name]: { ...nodeState[name], value: value, disableInput: false },
        });
      } else {
        setNodeState({
          ...nodeState,
          [name]: { ...nodeState[name], value: value },
        });
      }
    }
  };
  const inputChange = (e) => {
    let { name, value } = e.target;
    setNodeState({
      ...nodeState,
      [name]: { ...nodeState[name], inputValue: value },
    });
  };
  const nodeAComStyles = !pattern?.unUsedA
    ? secondInputComStyle
    : { "&::after": { ...nodeACircleStyleProp, ...unUsedNodeStyleProp } };
  const nodeBComStyles = !pattern?.unUsedB
    ? firstInputComStyle
    : { "&::after": { ...nodeBCircleStyleProp, ...unUsedNodeStyleProp } };
  const nodeCComStyles = !pattern?.unUsedC
    ? thirdInputComStyles
    : { "&::after": { ...nodeCCircleStyleProp, ...unUsedNodeStyleProp } };
  console.log(["nodeC", nodeCComStyles]);
  return (
    <Box sx={inputBoxConStyle}>
      <Box
        sx={{
          width: "100%",
          height: 1 / 2,
          ...flexCenter,
        }}
      >
        {nodeB && (
          <StandardAffiliationBar
            onselect={selectDropDownValue}
            nodeProp={nodeState?.nodeB}
            name="nodeB"
            sx={{ ...nodeBComStyles, ...rowNodePattern }}
            change={inputChange}
            unUsed={pattern?.unUsedB}
          />
        )}
      </Box>
      <Box
        sx={{
          width: "85%",
          height: 1 / 2,
          ...flexItemCenterStart,
          px: 1,
        }}
      >
        {nodeA && (
          <StandardAffiliationBar
            onselect={selectDropDownValue}
            nodeProp={nodeState?.nodeA}
            name="nodeA"
            sx={nodeAComStyles}
            change={inputChange}
            unUsed={pattern?.unUsedA}
          />
        )}
        {nodeC && (
          <>
            <Line>
              <ArrowForwardIcon sx={lineArrowStyles} />
            </Line>
            <StandardAffiliationBar
              onselect={selectDropDownValue}
              nodeProp={nodeState?.nodeC}
              name="nodeC"
              sx={nodeCComStyles}
              change={inputChange}
              unUsed={pattern?.unUsedC}
            />
          </>
        )}
      </Box>
    </Box>
  );
});

export default SelectPropertiesContainer;
