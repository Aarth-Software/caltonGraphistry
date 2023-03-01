/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";

import React from "react";
import SelectPropertiesContainer from "./SelectProperties/SelectPropertiesContainer";
import MoreOptions from "./SelectProperties/MoreOptions";

import filterInActive from "../../../asserts/filterInActive.svg";
import SelectPatternContainer from "./SelectPattern/SelectPatternContainer";
import RunButton from "./SelectProperties/RunButton";
import {
  Controls,
  flexCenter,
  moreOptionStyle,
  patternContainerStyle,
  popModalContainer,
  popSaveModalContainer,
  saveAndGraphBtnContainer,
  selectPropContainerStyle,
} from "../../../libs/JSS/Jss";
import PopModal from "../../../libs/Modal/PopModal";
import {
  btnArray,
  getAccessPatternVariables,
} from "../../../libs/Switches/SelectionSwitches";
import SavedGraphsPop from "./SavedGraphs/SavedGraphsPop";
import StandardButton from "../../../libs/Buttons/StandardButton";
import SavePopPanel from "./SavedGraphs/SavePopPanel";
import { useSnackbar } from "notistack";
import GraphistryGraph from "../MainDashboard/Graphistry/GraphistryGraph";
import TooltipComp from "../../../libs/Tooltip/Tooltip";
import info from "../../../asserts/info.svg";
import { getDropdowns } from "../../../services/service";
import { useFetch } from "../../../utils/useFetch";
import { red } from "@mui/material/colors";
import FiltersComponent from "./SelectProperties/filters/Filters";
import { useKeycloak } from "@react-keycloak/web";

const Card = styled(Box)``;
const FallDashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [pattern, setPattern] = React.useState({
    nodeA: true,
    nodeB: true,
    nodeC: true,
  });
  const [activePattern, setActivePattern] = React.useState(
    new Array(btnArray.length).fill(false)
  );
  const [open, setOpen] = React.useState(false);
  const [openSavePanel, seOpenSavePanel] = React.useState(false);
  const [selectParams, setSelectParams] = React.useState({});
  const [saveName, setSaveName] = React.useState("");
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const [dropdownOptions, setdropDownOptions] = React.useState({
    id: 1,
    node_1: { value: ["don", "con", "ban"] },
    node_2: {},
    node_3: {},
    selection_type: "1node",
  });
  const [values, setValues] = React.useState({ data: [], loading: null });
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
  const { keycloak, initialized } = useKeycloak();

  const baseURL = process.env.REACT_APP_BASE_URL;
  const [loading, data, error] = useFetch(
    `${baseURL}/getDropdownValues`,
    false
  );
  console.log([loading, data, error]);

  const getPatternChange = (e) => {
    setNodeState(getAccessPatternVariables(e.code));
    setPattern(e);
    const specificObject = data.data.find(
      (d) => d.selection_type === e.selection_type
    );
    setdropDownOptions(specificObject);
  };

  const getId = (obj) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const { nodeA, nodeB, nodeC, keywordA, keywordB, keywordC } = obj;
    console.log(nodeA, nodeB, keywordA);
    setValues({ ...values, loading: true });
    fetch(
      `${baseURL}/buildQuery?node1=${nodeA}&keyword1=${keywordA}&node2=${nodeB}&keyword2=${keywordB}&node3=${nodeC}&keyword3=${keywordC}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result === "No records found") {
          setValues({ data: result, loading: false });
        } else {
          setValues({ data: result[0], loading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        setValues({ ...values, loading: false });
      });
  };
  const generateGraph = async () => {
    // let inputValuError, valueError;
    const cloneObject = { ...nodeState };
    for (let x in cloneObject) {
      if (cloneObject[x].disableInput !== undefined) {
        if (cloneObject[x].inputValue === "" && cloneObject[x].value === "") {
          // cloneObject[x].message = "input and select values are mandatory";
          // valueError = true;
          // inputValuError = true;
        } else if (cloneObject[x].inputValue === "") {
          // cloneObject[x].message = "input value mandatory";
        }
        cloneObject[x].error =
          !cloneObject[x].inputValue || !cloneObject[x].value;
      } else if (cloneObject[x].disableInput === undefined) {
        if (cloneObject[x].value === "") {
          // cloneObject[x].message = "select value mandatory";
          // valueError = true;
        }
        cloneObject[x].error = !cloneObject[x].value;
      }
    }

    const mergeObjects = (obj) => {
      const dropDownSelectedValues = ["nodeA", "nodeB", "nodeC"].reduce(
        (result, key) => {
          result[key] = obj[key]?.value || null;
          result[key.replace("node", "keyword")] = obj[key]?.inputValue || null;
          return result;
        },
        {}
      );
      if (Object.keys(obj).length === 2) {
        console.log("second");
        const getproperMap = [dropDownSelectedValues].map((el, i) => {
          const data = {
            ...el,
            nodeB: el.nodeC,
            nodeC: el.nodeB,
            keywordB: el.keywordC,
            keywordC: el.keywordB,
          };
          return data;
        });
        return getproperMap[0];
      }
      return dropDownSelectedValues;
    };

    const valueObj = mergeObjects(cloneObject);
    console.log(valueObj);
    setSelectParams(valueObj);
    setNodeState(cloneObject);
    getId(valueObj);
    console.log(valueObj);
    for (let d in cloneObject) {
      if (cloneObject[d].error) {
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

  React.useEffect(() => {
    enqueueSnackbar("authentication successfull", {
      variant: "success",
      autoHideDuration: 2000,
      style: { width: 300, left: "calc(50% - 150px)" },
    });
  }, [keycloak?.idTokenParsed?.sub]);
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
              sx={{
                mt: 1,
                position: "absolute",
                color: "#259DF8",
                fontSize: ".9rem",
                fontWeight: "bolder",
              }}
            >
              2. Select relationship
            </Typography>
            <Box
              sx={{
                mt: 1,
                position: "absolute",
                color: "#259DF8",
                right: ".5rem",
                zIndex: 2,
              }}
            >
              <TooltipComp
                className="no-padding-icon-button"
                size="1rem"
                icon={info}
                message={"this is selected drop info"}
              />
            </Box>
            <Box
              sx={{
                mt: 1,
                position: "absolute",
                color: "#259DF8",
                right: "2.5rem",
                zIndex: 2,
              }}
            >
              {/* <TooltipComp
                className="no-padding-icon-button"
                size="1rem"
                icon={filterInActive}
                message={"this is selected drop info"}
              /> */}
              <FiltersComponent icon={filterInActive} />
            </Box>

            <Box sx={selectPropContainerStyle}>
              {data?.data?.length && (
                <SelectPropertiesContainer
                  pattern={pattern}
                  nodeState={nodeState}
                  setNodeState={setNodeState}
                  dropdownOptions={dropdownOptions}
                />
              )}
            </Box>
          </Card>
          <Box sx={saveAndGraphBtnContainer}>
            <Typography
              varient="p"
              sx={{
                mt: 1,
                color: "#259DF8",
                fontSize: ".9rem",
                fontWeight: "bolder",
              }}
            >
              3. Graph & Save
            </Typography>
            <div
              style={{
                ...moreOptionStyle,
                boxShadow:
                  anchorMenu === null ? "" : "0px .6px 3px rgba(0, 0, 0, 0.06)",
                color: anchorMenu === null ? "black" : "#e57373",
              }}
            >
              <MoreOptions
                saveOnClick={saveOnClick}
                savedGraphOnClick={savedGraphOnClick}
                anchorMenu={anchorMenu}
                setAnchorMenu={setAnchorMenu}
              />
            </div>

            <RunButton onClick={generateGraph} />
          </Box>
        </Box>
        {!values.loading &&
          values.data !== "No records found" &&
          values.data && <GraphistryGraph name="graph" dataSet={values.data} />}
        {!values.loading &&
          (!values.data || values.data === "No records found") && (
            <Box sx={{ height: "100%", width: "100%", ...flexCenter }}>
              there is not data available with this{" "}
              <span style={{ color: red[400], padding: "0rem  .2rem" }}>
                {" "}
                matching
              </span>
            </Box>
          )}
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
