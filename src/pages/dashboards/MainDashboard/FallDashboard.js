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
  graphContainerStyle,
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
import { GenerateDataSet, postQuery } from "../../../services/service";
import { useFetch } from "../../../utils/useFetch";
import { red } from "@mui/material/colors";
import FiltersComponent from "./SelectProperties/filters/Filters";
import { useKeycloak } from "@react-keycloak/web";
import Loader from "../../../components/Loader";
import {
  refreshState,
  retriveSavedGraphValues,
} from "../../../libs/HigherOrderFunctions";
const LoaderContainer = styled(Box)({
  width: "100%",
  height: "100%",
});
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
    node_1: {
      value: ["Construct (Ind. Var.)"],
    },
    node_2: {
      "Construct (Ind. Var.)": [
        "Construct (Mediator)",
        "Construct (Moderator)",
      ],
    },
    node_3: {
      "Construct (Mediator)": ["Construct (Dep. Var.)"],
      "Construct (Moderator)": ["Construct (Dep. Var.)"],
    },
    selection_type: "3node",
  });
  const [values, setValues] = React.useState({ data: [], loading: null });
  const [nodeState, setNodeState] = React.useState({
    nodeA: { value: "", inputValue: "", disableInput: true },
    nodeB: { value: "", inputValue: "", disableInput: true },
    nodeC: { value: "", inputValue: "", disableInput: true },
  });
  const [savedDataSet, setSaveDataSet] = React.useState({
    status: false,
    data: null,
  });
  const { keycloak, initialized } = useKeycloak();

  const baseURL = process.env.REACT_APP_BASE_URL;
  const [loading, data, error] = useFetch(`getDropdownValues`, false);
  const [recordsLoading, records, recordsError, refetch] = useFetch(
    `userQueries/${keycloak.idTokenParsed.sub}`
  );

  const getPatternChange = (e) => {
    setNodeState(getAccessPatternVariables(e.code));
    refreshState(setNodeState);
    setPattern(e);
    const specificObject = data?.data?.find(
      (d) => d.selection_type === e.selection_type
    );
    console.log(specificObject);
    setdropDownOptions(specificObject);
  };

  const getId = async (obj, errorCatch) => {
    if (errorCatch.some((eg) => eg)) {
      return;
    }
    setValues({ ...values, loading: true });
    try {
      const response = await GenerateDataSet(obj);
      if (response.data === "No records found") {
        setValues({ data: response.data, loading: false });
        setSaveDataSet({ status: false, data: null });
      } else {
        setValues({ data: response.data[0], loading: false });
        enqueueSnackbar("Generate graph successfull", {
          variant: "success",
          autoHideDuration: 2000,
          style: { width: 300, left: "calc(50% - 150px)" },
        });
        setSaveDataSet({ status: false, data: null });
      }
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      enqueueSnackbar("Generate graph unsuccessfull", {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      setSaveDataSet({ status: false, data: null });
    }
  };
  const generateGraph = async () => {
    // let inputValuError, valueError;
    let errorCatch = [];
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
        errorCatch.push(cloneObject[x].error);
      } else if (cloneObject[x].disableInput === undefined) {
        if (cloneObject[x].value === "") {
          // cloneObject[x].message = "select value mandatory";
          // valueError = true;
        }
        cloneObject[x].error = !cloneObject[x].value;
        errorCatch.push(cloneObject[x].error);
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
    setSelectParams(valueObj);
    setNodeState(cloneObject);
    getId(valueObj, errorCatch);
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
    setAnchorMenu(false);
  };
  const savedGraphOnClick = () => {
    setOpen(true);
    setAnchorMenu(false);
  };
  const getSave = async () => {
    console.log(selectParams);
    if (!values?.data || !Object.keys(selectParams).length) {
      seOpenSavePanel(false);
      setSaveName(false);
      enqueueSnackbar("Please generate Graph", {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      return;
    }
    const [changeKeys] = [selectParams].map((eg) => {
      return {
        user_id: keycloak.idTokenParsed.sub,
        node1: eg.nodeA,
        node2: eg.nodeB,
        node3: eg.nodeC,
        keyword1: eg.keywordA,
        keyword2: eg.keywordB,
        keyword3: eg.keywordC,
        query_name: saveName,
        dataset: values.data,
        selection_type: `${Object.keys(nodeState).length}node`,
        selection_code: pattern.code,
      };
    });

    if (saveName.split("").length < 2) {
      enqueueSnackbar("fill mandatory fields", {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      return;
    }

    try {
      const response = await postQuery(changeKeys);
      console.log(response);
      seOpenSavePanel(false);
      setSaveName(false);
      enqueueSnackbar(response.data.message, {
        variant: "success",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  const retriveGraph = (e) => {
    setNodeState(getAccessPatternVariables(e.selection_code));
    retriveSavedGraphValues(e, setNodeState);
    const fixPattern = btnArray.findIndex((eg) => eg.code === e.selection_code);
    setPattern(btnArray[fixPattern]);
    setActivePattern(
      activePattern.map((ek, i) => (i === fixPattern ? !ek : false))
    );
    const specificObject = data?.data?.find(
      (d) => d.selection_type === e.selection_type
    );
    setdropDownOptions(specificObject);
    setSaveDataSet({ status: true, data: e.dataset });
    setAnchorMenu(null);
    setOpen(false);
  };
  const closeWithCrossICon = () => {
    seOpenSavePanel(false);
  };
  const closePannel = () => {
    seOpenSavePanel(false);
  };
  console.log(nodeState);

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
              <FiltersComponent icon={filterInActive} />
            </Box>

            {loading && (
              <Box sx={{ ...selectPropContainerStyle, ...flexCenter }}>
                <Loader />
              </Box>
            )}
            <Box sx={selectPropContainerStyle}>
              {!loading && (
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
                ...flexCenter,
              }}
            >
              <MoreOptions
                saveOnClick={saveOnClick}
                savedGraphOnClick={savedGraphOnClick}
                anchorMenu={anchorMenu}
                setAnchorMenu={setAnchorMenu}
                text1={"Save"}
                text2={"Saved Graphs"}
              />
            </div>

            <RunButton onClick={generateGraph} />
          </Box>
        </Box>
        {values.loading && (
          <LoaderContainer sx={graphContainerStyle}>
            <Loader />
          </LoaderContainer>
        )}
        {!values.loading &&
          values.data !== "No records found" &&
          !!values.data.length &&
          !savedDataSet.status && (
            <GraphistryGraph name="graph" dataSet={values.data} />
          )}
        {!!savedDataSet.status && !values.loading && (
          <GraphistryGraph name="graph" dataSet={savedDataSet.data} />
        )}
        {!values.loading &&
          !savedDataSet.status &&
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
        child={
          <SavePopPanel
            getSave={getSave}
            setSaveName={setSaveName}
            closeWithCrossICon={closeWithCrossICon}
            headTitle="Save"
            close={closePannel}
          />
        }
        classProp={{ ...popModalContainer, ...popSaveModalContainer }}
      />
      <PopModal
        openModal={open}
        setModalOpen={setOpen}
        child={
          <SavedGraphsPop
            record={records}
            Btn={
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
            click={retriveGraph}
          />
        }
        classProp={popModalContainer}
      />
    </>
  );
};

export default FallDashboard;
