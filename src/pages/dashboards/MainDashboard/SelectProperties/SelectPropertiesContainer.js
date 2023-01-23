import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
// import { Box } from "@mui/system";
import React from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { flexCenter, flexItemCenterStart } from "../../../../libs/JSS/Jss";
import StandardAffiliationBar from "./Affiliation/StandardAffiliationBar";
import { rgba } from "polished";
import { css } from "@emotion/react";

const illustrationCardStyle = (props) => css`
  ${props.theme.palette.mode !== "dark" &&
  `
    background: ${rgba(props.theme.palette.primary.main, 0.125)};
    color: ${props.theme.palette.primary.main};
  `}
`;
const Card = styled(Box)`
  ${illustrationCardStyle}
`;
const Line = styled("span")({
  flexGrow: 1,
  height: ".1rem",
  background: "#DBDCDF",
  ...flexCenter,
  justifyContent: "flex-end",
  postion: "relative",
});

const SelectPropertiesContainer = ({ pattern }) => {
  const [nodeState, setNodeState] = React.useState({
    nodeA: { disabled: false, value: "" },
    nodeB: { disabled: false, value: "" },
    nodeC: { disabled: false, value: "" },
  });
  const [inputValues, setInputValues] = React.useState({
    inputA: "",
    inputB: "",
    inputC: "",
  });
  const inputChange = (e) => {
    let { name, value } = e.target;
    console.log(name);
    console.log(value);
    setInputValues({ ...inputValues, [name]: value });
  };
  console.log(inputValues);

  const { nodeA, nodeB, nodeC } = pattern;

  const rowNodePattern = pattern?.series
    ? {
        top: "1.7rem",
      }
    : {
        "&::before": {
          content: '""',
          height: "2.5rem",
          width: ".1rem",
          bgcolor: "#DBDCDF",
          top: "100%",
          left: "50%",
          position: "absolute",
        },
      };
  const selectDropDownValue = (e) => {
    const { name, value } = e.target;
    if (!!value)
      setNodeState({
        ...nodeState,
        [name]: { ...nodeState[name], disabled: false, value: value },
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "7.2rem",
        display: "flex",
        alignItems: "center",
        flexGraw: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 1 / 2,
          ...flexCenter,
        }}
      >
        {nodeB && (
          <StandardAffiliationBar
            inputValue={inputValues.inputB}
            onselect={selectDropDownValue}
            nodeProp={nodeState.nodeB}
            name="inputB"
            sx={{
              position: "relative",
              "&::after": {
                content: '""',
                height: "1.5rem",
                width: "1.5rem",
                bgcolor: "#DBDCDF",
                top: "102%",
                left: `calc(50% - .7rem)`,
                position: "absolute",
                borderRadius: "50%",
              },
              ...rowNodePattern,
            }}
            change={inputChange}
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
            inputValue={inputValues.inputA}
            onselect={selectDropDownValue}
            nodeProp={nodeState.nodeA}
            name="inputA"
            sx={{
              "&::after": {
                content: '""',
                height: "1.5rem",
                width: "1.5rem",
                bgcolor: "#DBDCDF",
                top: `calc(50% - .75rem)`,
                left: `100%`,
                position: "absolute",
                borderRadius: "50%",
              },
            }}
            change={inputChange}
          />
        )}
        {nodeC && (
          <>
            <Line>
              <ArrowForwardIcon
                sx={{
                  fontSize: "medium",
                  bgcolor: "#FFFFFF",
                  p: 0,
                  color: "#e5eaf1",
                }}
              />
            </Line>
            <StandardAffiliationBar
              inputValue={inputValues.inputC}
              onselect={selectDropDownValue}
              nodeProp={nodeState.nodeC}
              name="inputC"
              sx={{
                "&::after": {
                  content: '""',
                  height: "1.49rem",
                  width: "1.49rem",
                  bgcolor: "#ffffff",
                  top: `calc(50% - .75rem)`,
                  right: `100.5%`,
                  position: "absolute",
                  borderRadius: "50%",
                  border: ".05rem solid #DBDCDF",
                },
              }}
              change={inputChange}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default SelectPropertiesContainer;
