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
import {
  Controls,
  moreOptionStyle,
  patternContainerStyle,
  popModalContainer,
  popSaveModalContainer,
  selectPropContainerStyle,
} from "../../../libs/JSS/Jss";
import PopModal from "../../../libs/Modal/PopModal";
import GraphistryGraph from "../MainDashboard/Graphistry/GraphistryGraph";
import { getAccessPatternVariables } from "../../../libs/Switches/SelectionSwitches";
import SavedGraphsPop from "./SavedGraphs/SavedGraphsPop";
import StandardButton from "../../../libs/Buttons/StandardButton";
import SavePopPanel from "./SavedGraphs/SavePopPanel";

const Card = styled(Box)``;
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
      code: "sN",
    },
    {
      btn: singleNodeB,
      grow: 2,
      active: aSingleNodeB,
      nodeA: true,
      nodeB: false,
      nodeC: true,
      unUsedC: true,
      code: "doubleNrD",
    },
    {
      btn: singleNodeC,
      grow: 2,
      active: aSingleNodeC,
      nodeA: true,
      nodeB: false,
      nodeC: true,
      code: "doubleN",
    },
    {
      btn: singleNodeD,
      grow: 2,
      active: aSingleNodeD,
      nodeA: true,
      nodeB: false,
      nodeC: true,
      unUsedA: true,
      code: "doubleNlD",
    },
    {
      btn: doubleNodeA,
      grow: 3,
      active: aDoubleNodeA,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      series: true,
      unUsedB: true,
      code: "tripleNcD",
    },
    {
      btn: doubleNodeB,
      grow: 3,
      active: aDoubleNodeB,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      series: true,
      unUsedC: true,
      code: "tripleNrD",
    },
    {
      btn: doubleNodeC,
      grow: 3,
      active: aDoubleNodeC,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      series: true,
      unUsedA: true,
      code: "tripleNlD",
    },
    {
      btn: doubleNodeD,
      grow: 3,
      active: aDoubleNodeD,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      series: true,
      unUsedA: true,
      unUsedC: true,
      code: "tripleNcA",
    },
    {
      btn: tripleNodeA,
      grow: 4,
      active: aTripleNodeD,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      unUsedA: true,
      unUsedC: true,
      code: "triplePerNcA",
    },
    {
      btn: tripleNodeB,
      grow: 4,
      active: aTripleNodeC,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      unUsedA: true,
      code: "triplePerNlD",
    },
    {
      btn: tripleNodeC,
      grow: 4,
      active: aTripleNodeB,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      unUsedC: true,
      code: "triplePerNrD",
    },
    {
      btn: tripleNodeD,
      grow: 4,
      active: aTripleNodeA,
      nodeA: true,
      nodeB: true,
      nodeC: true,
      unUsedB: true,
      code: "triplePerNcD",
    },
  ];

  const [activePattern, setActivePattern] = React.useState(
    new Array(btnArray.length).fill(false)
  );
  const [open, setOpen] = React.useState(false);
  const [openSavePanel, seOpenSavePanel] = React.useState(false);
  const [nodeState, setNodeState] = React.useState({
    nodeA: { value: "", inputValue: "", disableInput: true },
    nodeB: { value: "", inputValue: "", disableInput: true },
    nodeC: { value: "", inputValue: "", disableInput: true },
  });
  // const illustrationCardStyle = (props) => css`
  //   background: ${rgba(props.theme.palette.primary.main, 0.125)};
  //   color: ${props.theme.palette.primary.main};
  // `;
  const getPatternChange = (e) => {
    setNodeState(getAccessPatternVariables(e.code));
    setPattern(e);
    // setNodeState(getAccessPatternVariables(e.code));
  };
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const executeQuery = (query) => {
    setStatus(false);
    console.log(query);
    fetch(`http://localhost:3000/runQuery?cypherQuery=${query}`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result[0]);
        setData(result[0]);
        setStatus(true);
        console.log(result);
      })
      .catch((err) => {
        setStatus(false);
      });
  };
  const run = () => {
    executeQuery("MATCH (c1)-[r]-(c2) RETURN c1,r,c2 LIMIT 10");
  };
  const generateGraph = () => {
    const cloneObject = { ...nodeState };
    console.log(cloneObject);
    for (let x in cloneObject) {
      if (
        !cloneObject[x].inputValue &&
        cloneObject[x].disableInput !== undefined
      ) {
        cloneObject[x].error = true;
      } else {
        cloneObject[x].error = false;
      }
    }
    setNodeState(cloneObject);
  };
  return (
    <>
      <Stack sx={{ width: "100%", height: "100%" }}>
        <Box sx={Controls}>
          <SelectPatternContainer
            btnArray={btnArray}
            activePattern={activePattern}
            setActivePattern={setActivePattern}
            getPatternChange={getPatternChange}
          />
          <Card sx={{ ...patternContainerStyle }}>
            <Typography
              varient="p"
              sx={{ mt: 1, position: "absolute", color: "#259DF8" }}
            >
              2. Select relationship
            </Typography>
            <div style={moreOptionStyle}>
              <MoreOptions
                seOpenSavePanel={seOpenSavePanel}
                setOpen={setOpen}
              />
            </div>
            <Box sx={selectPropContainerStyle}>
              <SelectPropertiesContainer
                pattern={pattern}
                nodeState={nodeState}
                setNodeState={setNodeState}
              />
              <RunButton onClick={generateGraph} />
            </Box>
          </Card>
        </Box>
        {/* {status === false && <div className="lodingContainer">loading...</div>}
        {status === null && <div className="lodingContainer">Insert query</div>} */}
        <GraphistryGraph name="graph" set={data} />
      </Stack>
      <PopModal
        openModal={openSavePanel}
        setModalOpen={seOpenSavePanel}
        child={<SavePopPanel />}
        classProp={{ ...popModalContainer, ...popSaveModalContainer }}
      />
      <PopModal
        openModal={open}
        setModalOpen={setOpen}
        child={
          <SavedGraphsPop
            btn={
              <StandardButton
                text="Graph"
                varient="contained"
                px={8}
                mt={0.8}
                mr={0.4}
                fontSize=".7rem"
                fontWeight={600}
              />
            }
          />
        }
        classProp={popModalContainer}
      />
    </>
  );
};

export default FallDashboard;
