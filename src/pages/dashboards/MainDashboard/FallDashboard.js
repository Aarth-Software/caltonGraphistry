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
  saveAndGraphBtnContainer,
  selectPropContainerStyle,
} from "../../../libs/JSS/Jss";
import PopModal from "../../../libs/Modal/PopModal";
import { getAccessPatternVariables } from "../../../libs/Switches/SelectionSwitches";
import SavedGraphsPop from "./SavedGraphs/SavedGraphsPop";
import StandardButton from "../../../libs/Buttons/StandardButton";
import SavePopPanel from "./SavedGraphs/SavePopPanel";
import dropdownData from "../../../data/DropdownData.json";
import { useSnackbar } from "notistack";

const Card = styled(Box)``;
const FallDashboard = () => {
  // console.log(dropdownData);
  const { enqueueSnackbar } = useSnackbar();
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
      selection_type: "1node",
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
      selection_type: "2node",
    },
    {
      btn: singleNodeC,
      grow: 2,
      active: aSingleNodeC,
      nodeA: true,
      nodeB: false,
      nodeC: true,
      code: "doubleN",
      selection_type: "2node",
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
      selection_type: "2node",
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
      selection_type: "3node",
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
      selection_type: "3node",
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
      selection_type: "3node",
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
      selection_type: "3node",
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
      selection_type: "3node",
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
      selection_type: "3node",
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
      selection_type: "3node",
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
      selection_type: "3node",
    },
  ];

  const [activePattern, setActivePattern] = React.useState(
    new Array(btnArray.length).fill(false)
  );
  const [open, setOpen] = React.useState(false);
  const [openSavePanel, seOpenSavePanel] = React.useState(false);
  const [selectParams, setSelectParams] = React.useState({});
  const [saveName, setSaveName] = React.useState("");
  const [dropdownOptions, setdropDownOptions] = React.useState({
    id: 1,
    node_1: { value: ["don", "con", "ban"] },
    node_2: {},
    node_3: {},
    selection_type: "1node",
  });
  const [record, setRecord] = React.useState([
    { title: "custom", query: "nodeA+nodeC", date: "12/6/20" },
    { title: "Darci", query: "nodeB", date: "31/6/20" },
    { title: "Brooke", query: "nodeC", date: "16/7/20" },
    { title: "Jack", query: "nodeB+nodeC", date: "21/08/21" },
    { title: "Great", query: "nodeA+nodeC", date: "12/6/20" },
    { title: "Jin", query: "nodeB", date: "31/6/20" },
    { title: "Lisa", query: "nodeC", date: "16/7/20" },
    { title: "Jennie", query: "nodeB+nodeC", date: "21/08/21" },
  ]);
  const [nodeState, setNodeState] = React.useState({
    nodeA: { value: "", inputValue: "", disableInput: true },
    nodeB: { value: "", inputValue: "", disableInput: true },
    nodeC: { value: "", inputValue: "", disableInput: true },
  });

  const getPatternChange = (e) => {
    setNodeState(getAccessPatternVariables(e.code));
    setPattern(e);
    const specificObject = dropdownData.data.find(
      (d) => d.selection_type === e.selection_type
    );
    setdropDownOptions(specificObject);
  };
  const generateGraph = () => {
    const cloneObject = { ...nodeState };
    for (let x in cloneObject) {
      cloneObject[x].error =
        (!cloneObject[x].inputValue || !cloneObject[x].value) &&
        cloneObject[x].disableInput !== undefined;
    }
    const mergeObjects = (obj) =>
      ["nodeA", "nodeB", "nodeC"].reduce((result, key) => {
        result[key] = obj[key]?.value || null;
        result[key.replace("node", "keyword")] = obj[key]?.inputValue || null;
        return result;
      }, {});
    const valueObj = mergeObjects(cloneObject);
    setSelectParams(valueObj);
    setNodeState(cloneObject);
    console.log(cloneObject);
    for (let d in cloneObject) {
      if (cloneObject[d].error === true) {
        return enqueueSnackbar("please fill mandatory(*) fields", {
          variant: "error",
          autoHideDuration: 2000,
          style: { width: 300, left: "calc(50% - 150px)" },
        });
      }
    }
  };
  const saveOnClick = () => {
    seOpenSavePanel(true);
  };
  const savedGraphOnClick = () => {
    setOpen(true);
  };
  const getSave = () => {
    var query = "";
    const date = new Date()
      .toLocaleDateString("default", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(",", "");
    for (let x in selectParams) {
      query += selectParams[x] + "/";
    }
    if (record.every((e, i) => e.title !== saveName)) {
      console.log("submitted");
      setRecord([...record, { title: saveName, query: query, date: date }]);
    }
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

            <Box sx={selectPropContainerStyle}>
              <SelectPropertiesContainer
                pattern={pattern}
                nodeState={nodeState}
                setNodeState={setNodeState}
                dropdownOptions={dropdownOptions}
              />
            </Box>
          </Card>
          <Box sx={saveAndGraphBtnContainer}>
            <Typography varient="p" sx={{ mt: 1, color: "#259DF8" }}>
              3. Graph & Save
            </Typography>
            <div style={moreOptionStyle}>
              <MoreOptions
                saveOnClick={saveOnClick}
                savedGraphOnClick={savedGraphOnClick}
              />
            </div>

            <RunButton onClick={generateGraph} />
          </Box>
        </Box>
        {/* <GraphistryGraph name="graph" set={data} /> */}
      </Stack>
      <PopModal
        openModal={openSavePanel}
        setModalOpen={seOpenSavePanel}
        child={<SavePopPanel getSave={getSave} setSaveName={setSaveName} />}
        classProp={{ ...popModalContainer, ...popSaveModalContainer }}
      />
      <PopModal
        openModal={open}
        setModalOpen={setOpen}
        child={
          <SavedGraphsPop
            record={record}
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
