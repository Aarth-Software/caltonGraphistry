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
import { useSnackbar } from "notistack";
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
  const { pattern, nodeState, setNodeState, dropdownOptions } = props;
  const { enqueueSnackbar } = useSnackbar();
  // console.log(dropdownOptions);
  const { nodeA, nodeB, nodeC } = pattern;
  const rowNodePattern = pattern?.series
    ? { top: "1.7rem" }
    : firstInputLineStyles;

  const selectDropDownValue = (e) => {
    const { name, value } = e.target;
    console.log([name, value]);
    console.log(nodeState);
    if (value === "No options") {
      return enqueueSnackbar("Please select the previous node", {
        variant: "warning",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
    }

    if (!!nodeState[name].pointer) {
      let nextUnUsed =
        nodeState[nodeState[name].pointer].disableInput === undefined &&
        nodeState[nodeState[name].pointer].inputValue === undefined;
      console.log(nextUnUsed);
      if (!nextUnUsed && nodeState[name].disableInput === undefined) {
        setNodeState({
          ...nodeState,
          [name]: { ...nodeState[name], value: value },
          [nodeState[name].pointer]: {
            ...nodeState[nodeState[name].pointer],
            value: "",
            error: false,
            disableDropDown: false,
            message: "",
          },
        });
      } else if (nextUnUsed) {
        setNodeState({
          ...nodeState,
          [name]: { ...nodeState[name], value: value, disableInput: false },
          [nodeState[name].pointer]: {
            ...nodeState[nodeState[name].pointer],
            value: "",
            error: false,
            disableDropDown: false,
            message: "",
          },
        });
      } else if (!nextUnUsed) {
        setNodeState({
          ...nodeState,
          [name]: { ...nodeState[name], value: value, disableInput: false },
          [nodeState[name].pointer]: {
            ...nodeState[nodeState[name].pointer],
            value: "",
            disableInput: true,
            error: false,
            inputValue: "",
            disableDropDown: false,
            message: "",
          },
        });
      }
    }
    let Pointer = !!nodeState[name].pointer;
    if (!Pointer) {
      let unUsed =
        nodeState[name].disableInput === undefined &&
        nodeState[name].inputValue === undefined;
      if (unUsed) {
        console.log("unSolidNode");
        setNodeState({
          ...nodeState,
          [name]: { ...nodeState[name], value: value, message: "" },
        });
      } else if (!unUsed) {
        console.log("solidNode");
        setNodeState({
          ...nodeState,
          [name]: {
            ...nodeState[name],
            value: value,
            disableInput: false,
            message: "",
          },
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

  return (
    <Box sx={inputBoxConStyle}>
      <Box
        sx={{
          width: "100%",
          height: 1 / 2,
          ...flexCenter,
          position: "relative",
        }}
      >
        {nodeB && (
          <>
            <StandardAffiliationBar
              onselect={selectDropDownValue}
              nodeProp={nodeState?.nodeB}
              name="nodeB"
              sx={{ ...nodeBComStyles, ...rowNodePattern }}
              change={inputChange}
              unUsed={pattern?.unUsedB}
              options={
                dropdownOptions.selection_type === "3node" &&
                dropdownOptions?.node_2[nodeState?.nodeA?.value]
              }
            />
            {/* <ArrowDownwardIcon sx={downArrowStyle} /> */}
          </>
        )}
      </Box>
      <Box
        sx={{
          width: "95%",
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
            options={dropdownOptions?.node_1.value}
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
              options={
                dropdownOptions?.selection_type === "2node"
                  ? dropdownOptions?.node_2[nodeState?.nodeA?.value]
                  : dropdownOptions?.selection_type === "3node" &&
                    dropdownOptions?.node_3[nodeState?.nodeB?.value]
              }
            />
          </>
        )}
      </Box>
    </Box>
  );
});

export default SelectPropertiesContainer;
