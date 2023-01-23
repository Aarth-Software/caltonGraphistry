import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";

import React from "react";
import SelectPropertiesContainer from "./SelectProperties/SelectPropertiesContainer";
import MoreOptions from "./SelectProperties/MoreOptions";
import {
  singleNodeA,
  singleNodeB,
  singleNodeC,
  singleNodeD,
  doubleNodeA,
  doubleNodeB,
  doubleNodeC,
  doubleNodeD,
  tripleNodeA,
  tripleNodeB,
  tripleNodeC,
  tripleNodeD,
  aSingleNodeA,
  aSingleNodeB,
  aSingleNodeC,
  aSingleNodeD,
  aDoubleNodeA,
  aDoubleNodeB,
  aDoubleNodeC,
  aDoubleNodeD,
  aTripleNodeA,
  aTripleNodeB,
  aTripleNodeC,
  aTripleNodeD,
} from "../../../asserts/index";
import SelectPatternContainer from "./SelectPattern/SelectPatternContainer";
import RunButton from "./SelectProperties/RunButton";

const FallDashboard = () => {
  const [pattern, setPattern] = React.useState({
    nodeA: true,
    nodeB: true,
    nodeC: true,
  });
  const btnArray = [
    {
      btn: singleNodeA,
      grow: 2,
      active: aSingleNodeA,
      nodeA: true,
      nodeB: false,
      nodeC: false,
    },
    {
      btn: singleNodeB,
      grow: 2,
      active: aSingleNodeB,
      nodeA: true,
      nodeB: false,
      nodeC: true,
    },
    {
      btn: singleNodeC,
      grow: 2,
      active: aSingleNodeC,
      nodeA: true,
      nodeB: false,
      nodeC: true,
    },
    {
      btn: singleNodeD,
      grow: 2,
      active: aSingleNodeD,
      nodeA: true,
      nodeB: false,
      nodeC: true,
    },
    {
      btn: doubleNodeA,
      grow: 3,
      active: aDoubleNodeA,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      series: true,
    },
    {
      btn: doubleNodeB,
      grow: 3,
      active: aDoubleNodeB,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      series: true,
    },
    {
      btn: doubleNodeC,
      grow: 3,
      active: aDoubleNodeC,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      series: true,
    },
    {
      btn: doubleNodeD,
      grow: 3,
      active: aDoubleNodeD,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      series: true,
    },
    {
      btn: tripleNodeA,
      grow: 4,
      active: aTripleNodeD,
      nodeA: true,
      nodeB: true,
      nodeC: true,
    },
    {
      btn: tripleNodeB,
      grow: 4,
      active: aTripleNodeC,
      nodeA: true,
      nodeB: true,
      nodeC: true,
    },
    {
      btn: tripleNodeC,
      grow: 4,
      active: aTripleNodeB,
      nodeA: true,
      nodeB: true,
      nodeC: true,
    },
    {
      btn: tripleNodeD,
      grow: 4,
      active: aTripleNodeA,
      nodeA: true,
      nodeB: true,
      nodeC: true,
    },
  ];

  const [activePattern, setActivePattern] = React.useState(
    new Array(btnArray.length).fill(false)
  );
  const inputRef = React.useRef();
  // const illustrationCardStyle = (props) => css`
  //   background: ${rgba(props.theme.palette.primary.main, 0.125)};
  //   color: ${props.theme.palette.primary.main};
  // `;
  const Card = styled(Box)``;
  const Controls = {
    width: "100%",
    height: "9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  };
  const getPatternChange = (e) => {
    setPattern(e);
  };

  const GraphistryContainer = styled(Box)({
    width: "100%",
    height: "100%",
  });

  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      <Box sx={Controls}>
        <SelectPatternContainer
          btnArray={btnArray}
          activePattern={activePattern}
          setActivePattern={setActivePattern}
          getPatternChange={getPatternChange}
        />
        <Card
          sx={{
            flexGrow: 1,
            bgcolor: "#FFFFFF",
            height: "7.4rem",
            ml: 5,
            borderRadius: 1.5,
            px: 2,
            boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)",
            position: "relative",
          }}
        >
          <Typography
            varient="p"
            sx={{ mt: 1, position: "absolute", color: "#259DF8" }}
          >
            2. Select relationship
          </Typography>
          <div
            style={{
              position: "absolute",
              color: "black",
              top: "-.2rem",
              right: "-0.5rem",
            }}
          >
            <MoreOptions />
          </div>
          <Box
            sx={{
              width: "100%",
              height: "7.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <SelectPropertiesContainer
              pattern={pattern}
              // inputValues={inputValues}
              // change={inputChange}
            />

            <RunButton />
          </Box>
        </Card>
      </Box>
      <GraphistryContainer
        sx={{
          mt: 5,
          bgcolor: "#FFFFFF",
          border: ".05rem solid #DBDCDF",
          borderRadius: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <GraphistryGraph /> */}
      </GraphistryContainer>
    </Stack>
  );
};

export default FallDashboard;
