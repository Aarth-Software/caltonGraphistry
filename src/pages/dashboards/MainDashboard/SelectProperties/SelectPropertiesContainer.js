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
import { selectDropDownValues } from "../../../../libs/HigherOrderFunctions";
import { GrFormNext } from "react-icons/gr";
import CustomArrow from "../../../../libs/arrows/CustomArrow";
import ArrowDown from "../../../../libs/arrows/ArrowDown";
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
    selectDropDownValues(e, nodeState, setNodeState, enqueueSnackbar);
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
              sx={{
                ...nodeBComStyles,
                ...(pattern?.series && { top: "1.4rem" }),
              }}
              change={inputChange}
              unUsed={pattern?.unUsedB}
              options={
                dropdownOptions.selection_type === "3node" &&
                dropdownOptions?.node_2[nodeState?.nodeA?.value]
              }
            />
            {pattern?.series ?? <ArrowDown />}
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
            {/* <ArrowForwardIcon sx={lineArrowStyles} /> */}
            {/* <Line>
              <GrFormNext style={{ color: "red" }} size={"1.2rem"} />
            </Line> */}
            <CustomArrow />
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
