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
  checkError,
  mergeObjects,
  refreshState,
  retriveSavedGraphValues,
} from "../../../libs/HigherOrderFunctions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchDefaultGraph,
  fetchDropdownValues,
  fetchSavedQuaries,
  setDefaultGraph,
  setFetchOnce,
} from "../../../redux/slices/querySlice";
import {
  // setAnchorMenu,
  setOpen,
  setOpenSavePannel,
  setSaveName,
  setShowStoreOptions,
} from "../../../redux/slices/serviceSlice";
import SavePopOptions from "./Save/SavePopOptions";
const LoaderContainer = styled(Box)({
  width: "100%",
  height: "100%",
});
const Card = styled(Box)``;
const FallDashboard = () => {
  const dispatch = useDispatch();
  const {
    fetchOnce,
    defaultGraphStatus,
    dropdownData,
    dropdownLoading,
    defaultGraphLoading,
    defaultDataset,
    savedRecords,
    saveRecordsLoading,
    recordsFetchError,
  } = useSelector((state) => state.query);
  const { enqueueSnackbar } = useSnackbar();
  const { openSavePanel, open, showStoreOptions, saveName } = useSelector(
    (state) => state.service
  );
  const [pattern, setPattern] = React.useState({
    nodeA: true,
    nodeB: true,
    nodeC: true,
  });
  const [activePattern, setActivePattern] = React.useState(
    new Array(btnArray.length).fill(false)
  );
  const [selectParams, setSelectParams] = React.useState({});
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
  React.useEffect(() => {
    if (fetchOnce) {
      dispatch(fetchDropdownValues());
      dispatch(fetchDefaultGraph());
      dispatch(fetchSavedQuaries(keycloak));
    }
    dispatch(setFetchOnce(false));
  }, []);
  const getPatternChange = (e) => {
    setNodeState(getAccessPatternVariables(e.code));
    refreshState(setNodeState);
    setPattern(e);
    const specificObject = dropdownData?.data?.find(
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
    let errorCatch = [];
    const cloneObject = { ...nodeState };
    checkError(cloneObject, errorCatch);
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
    dispatch(setDefaultGraph(false));
  };
  const saveOnClick = () => {
    dispatch(setOpenSavePannel(true));
    dispatch(setShowStoreOptions(false));
  };
  const savedGraphOnClick = () => {
    dispatch(setOpen(true));
    dispatch(setShowStoreOptions(false));
  };
  const getSave = async () => {
    if (!values?.data || !Object.keys(selectParams).length) {
      dispatch(setOpenSavePannel(false));
      dispatch(setSaveName(false));
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
      dispatch(setOpenSavePannel(false));
      dispatch(setSaveName(false));
      enqueueSnackbar(response.data.message, {
        variant: "success",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      dispatch(fetchSavedQuaries(keycloak));
    } catch (err) {
      enqueueSnackbar("Save graph unsuccessfull", {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      console.log(err);
    }
  };
  const retriveGraph = (e) => {
    dispatch(setDefaultGraph(false));
    setNodeState(getAccessPatternVariables(e.selection_code));
    retriveSavedGraphValues(e, setNodeState);
    const fixPattern = btnArray.findIndex((eg) => eg.code === e.selection_code);
    setPattern(btnArray[fixPattern]);
    setActivePattern(
      activePattern.map((ek, i) => (i === fixPattern ? !ek : false))
    );
    const specificObject = dropdownData?.data?.find(
      (d) => d.selection_type === e.selection_type
    );
    setdropDownOptions(specificObject);
    setSaveDataSet({ status: true, data: e.dataset });
    dispatch(setShowStoreOptions(null));
    dispatch(setOpen(false));
  };
  const closeWithCrossICon = () => {
    dispatch(setOpenSavePannel(false));
  };
  const closePannel = () => {
    dispatch(setOpenSavePannel(false));
    dispatch(setShowStoreOptions(null));
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

            {dropdownLoading && (
              <Box sx={{ ...selectPropContainerStyle, ...flexCenter }}>
                <Loader />
              </Box>
            )}
            <Box sx={selectPropContainerStyle}>
              {!dropdownLoading && (
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
                  showStoreOptions === null
                    ? ""
                    : "0px .6px 3px rgba(0, 0, 0, 0.06)",
                color: showStoreOptions === null ? "black" : "#e57373",
                ...flexCenter,
              }}
            >
              <SavePopOptions
                saveOnClick={saveOnClick}
                savedGraphOnClick={savedGraphOnClick}
              />
            </div>

            <RunButton onClick={generateGraph} />
          </Box>
        </Box>
        {/* /========================== */}
        {(values?.loading || defaultGraphLoading) && (
          <LoaderContainer sx={graphContainerStyle}>
            <Loader />
          </LoaderContainer>
        )}
        {!defaultGraphLoading && defaultGraphStatus && (
          <GraphistryGraph name="graph" dataSet={defaultDataset} />
        )}
        {!values?.loading &&
          values?.data !== "No records found" &&
          !!values?.data?.length &&
          !savedDataSet?.status && (
            <GraphistryGraph name="graph" dataSet={values.data} />
          )}
        {!!savedDataSet?.status && !values?.loading && (
          <GraphistryGraph name="graph" dataSet={savedDataSet?.data} />
        )}
        {!values?.loading &&
          !savedDataSet?.status &&
          (!values?.data || values?.data === "No records found") && (
            <Box sx={{ height: "100%", width: "100%", ...flexCenter }}>
              there is not data available with this{" "}
              <span style={{ color: red[400], padding: "0rem  .2rem" }}>
                {" "}
                matching
              </span>
            </Box>
          )}
        {/* =============================== */}
      </Stack>
      <PopModal
        openModal={openSavePanel}
        setModalOpen={setOpenSavePannel}
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
        setAnchorMenu={setShowStoreOptions}
        child={
          <SavedGraphsPop
            record={savedRecords}
            // setAnchorMenu={setAnchorMenu}
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
            recordStatus={[saveRecordsLoading, recordsFetchError]}
          />
        }
        classProp={popModalContainer}
      />
    </>
  );
};

export default FallDashboard;
