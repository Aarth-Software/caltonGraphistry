/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import styled from "@emotion/styled";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

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
// import { useKeycloak } from "@react-keycloak/web";
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
  getDataSetId,
  getGenerateGraph,
  getRetriveSavedDataSet,
  save,
  setDefaultGraph,
  setdropDownOptions,
  setFetchOnce,
  setPattern,
  setSaveDataSet,
  setSelectParams,
  setValues,
} from "../../../redux/slices/querySlice";
import {
  setActivePattern,
  setActivePatternWhenRetrive,
  // setAnchorMenu,
  setOpen,
  setOpenSavePannel,
  setSaveName,
  setShowStoreOptions,
} from "../../../redux/slices/serviceSlice";
import SavePopOptions from "./Save/SavePopOptions";
import useAuth from "../../../hooks/useAuth";
import { fetchKeywords } from "../../../redux/slices/dashboardSlice";
import useStateContextHook from "../../../libs/StateProvider/useStateContextHook";
import { withTheme } from "@emotion/react";
const LoaderContainer = styled(Box)({
  width: "100%",
  height: "100%",
});
const Card = styled(Box)``;
const FallDashboard = ({ theme }) => {
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
    savedDataSet,
    pattern,
    values,
    selectParams,
  } = useSelector((state) => state.query);
  const { enqueueSnackbar } = useSnackbar();
  const { openSavePanel, open, showStoreOptions, saveName, activePattern } =
    useSelector((state) => state.service);
  const { user } = useAuth();
  const { nodeState, setNodeState } = useStateContextHook();
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (fetchOnce) {
      dispatch(setActivePattern(new Array(btnArray.length).fill(false)));
      dispatch(fetchDropdownValues());
      dispatch(fetchDefaultGraph());
      dispatch(fetchSavedQuaries(user?.id));
    }
    dispatch(setFetchOnce(false));
  }, []);

  const getId = async (obj, errorCatch) => {
    if (errorCatch.some((eg) => eg)) {
      return;
    }
    dispatch(setValues({ ...values, loading: true }));
    try {
      const response = await GenerateDataSet(obj);
      if (response.data === "No records found") {
        dispatch(setValues({ data: response.data, loading: false }));
        dispatch(setSaveDataSet({ status: false, data: null }));
      } else {
        dispatch(setValues({ data: response.data[0], loading: false }));
        enqueueSnackbar("Generate graph successfull", {
          variant: "success",
          autoHideDuration: 2000,
          style: { width: 300, left: "calc(50% - 150px)" },
        });
        dispatch(setSaveDataSet({ status: false, data: null }));
      }
    } catch (err) {
      dispatch(setValues({ ...values, loading: false }));
      enqueueSnackbar("Generate graph unsuccessfull", {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      dispatch(setSaveDataSet({ status: false, data: null }));
    }
  };
  const generateGraph = () => {
    let errorCatch = [];
    const cloneObject = { ...nodeState };
    checkError(cloneObject, errorCatch);
    const valueObj = mergeObjects(cloneObject);
    dispatch(setSelectParams(valueObj));
    setNodeState(cloneObject);
    getId(valueObj, errorCatch);
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
    // dispatch(
    //   getGenerateGraph(nodeState, setNodeState, enqueueSnackbar, values)
    // );
  };
  const saveOnClick = () => {
    dispatch(setOpenSavePannel(true));
    dispatch(setShowStoreOptions(false));
  };
  const savedGraphOnClick = () => {
    dispatch(setOpen(true));
    dispatch(setShowStoreOptions(null));
  };
  const saveRecordFunction = async () => {
    dispatch(
      save(
        selectParams,
        values,
        enqueueSnackbar,
        user,
        saveName,
        nodeState,
        pattern
      )
    );
  };
  const retriveGraph = (e) => {
    dispatch(getRetriveSavedDataSet(e, setNodeState));
  };
  const closeWithCrossICon = () => {
    dispatch(setOpenSavePannel(false));
    dispatch(setShowStoreOptions(null));
  };
  const closePannel = () => {
    dispatch(setOpenSavePannel(false));
    dispatch(setShowStoreOptions(null));
  };
  const xsMatches = useMediaQuery(theme.breakpoints.up("xs"));
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const xlMatches = useMediaQuery(theme.breakpoints.up("xl"));
  const xxlMatches = useMediaQuery(theme.breakpoints.up("xxl"));

  const ModalDimention = xxlMatches
    ? ["1200px", "auto", "12rem"] //80
    : xlMatches
    ? ["1000px", "auto", "140px"] //100
    : lgMatches
    ? ["900px", "auto", "130px"]
    : mdMatches
    ? ["850px", "450px", "110px"]
    : smMatches
    ? ["600px", "100px", "100px"]
    : xsMatches
    ? ["500px", "30px", "200px"]
    : ["900px", "auto", "12rem"];

  return (
    <>
      <Stack sx={{ width: "100%", height: "100%" }}>
        <Box sx={Controls}>
          <SelectPatternContainer
            btnArray={btnArray}
            activePattern={activePattern}
            setActivePattern={setActivePattern}
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
              2. Build query
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
                // icon={info}
                message={"this is selected drop info"}
                top="0rem"
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
                  nodeState={nodeState}
                  setNodeState={setNodeState}
                />
              )}
            </Box>
          </Card>
          <Box sx={{ ...saveAndGraphBtnContainer, width: ModalDimention[2] }}>
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
                    : "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
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
        setAnchorMenu={setShowStoreOptions}
        child={
          <SavePopPanel
            getSave={saveRecordFunction}
            setSaveName={setSaveName}
            closeWithCrossICon={closeWithCrossICon}
            headTitle="Save"
            close={closePannel}
          />
        }
        classProp={{
          ...popSaveModalContainer,
          // p: "1rem",
        }}
      />
      <PopModal
        openModal={open}
        setModalOpen={setOpen}
        setAnchorMenu={setShowStoreOptions}
        child={
          <SavedGraphsPop
            record={savedRecords}
            // setAnchorMenu={setAnchorMenu}
            containerRef={containerRef}
            Btn={
              <StandardButton
                text="Graph"
                varient="contained"
                px={7}
                mt={0.8}
                mr={0.4}
                fontSize={12}
                fontWeight={600}
                bgcolor={theme.palette.secondary.main}
              />
            }
            click={retriveGraph}
            recordStatus={[saveRecordsLoading, recordsFetchError]}
          />
        }
        classProp={{
          ...popModalContainer,
          width: ModalDimention[0],
          height: ModalDimention[1],
        }}
      />
    </>
  );
};

export default withTheme(FallDashboard);
