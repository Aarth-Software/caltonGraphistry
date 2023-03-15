import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";

import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
} from "@mui/material";
import { Box, spacing } from "@mui/system";
import usePagination from "../../../hooks/usePagenation";
import {
  flexCenter,
  popModalContainer,
  popSaveModalContainer,
} from "../../../libs/JSS/Jss";
import StandardButton from "../../../libs/Buttons/StandardButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreOptions from "../MainDashboard/SelectProperties/MoreOptions";
import { useSnackbar } from "notistack";
import SavePopPanel from "../MainDashboard/SavedGraphs/SavePopPanel";
import PopModal from "../../../libs/Modal/PopModal";
import AuthLayout from "../../../layouts/Auth";
import { useDispatch } from "react-redux";
import {
  getDeleteRecords,
  getEditRecord,
  setActivePatternWhenRetrive,
  setEditedValue,
  setEditPannel,
  setOpen,
  setSearchRecordByName,
  setShowStoreOptions,
} from "../../../redux/slices/serviceSlice";
import { useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import {
  setDefaultGraph,
  setDropdownData,
} from "../../../redux/slices/querySlice";
import {
  btnArray,
  getAccessPatternVariables,
} from "../../../libs/Switches/SelectionSwitches";
import { retriveSavedGraphValues } from "../../../libs/HigherOrderFunctions";

const Card = styled(MuiCard)(spacing);

const TableRow = styled(MuiTableRow)`
  height: 46px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const TitleHeader = styled(CardHeader)`
  color: ${(props) => props.theme.palette.secondary.main};
  font-size: 5rem;
`;
const SearchInputContainer = styled("div")`
  width: 100%;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const SearchInput = styled("input")`
  width: calc(100% - 2.2rem);
  height: 100%;
  outline: none;
  border: 0.005rem solid #e0e0e0;
  border-radius: 0.3rem;
  paddingleft: 1rem;
  background: ${(props) => props.theme.palette.background.paper};

  ::placeholder {
    color: #999;
    // font-style: italic;
    padding-left: 0.6rem;
    font-size: 1rem;
  }
`;

const ManagedSavedGraphs = React.memo(
  ({
    theme,
    condition,
    btn,
    title,
    colFirstTitle,
    colSecondTitle,
    colThirdTitle,
    data,
    accessKeys,
    hideControls,
  }) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { activeBg, editPannel, editedValue, searchName } = useSelector(
      (state) => state.service
    );
    const { user } = useAuth();
    const filteredRecords = data.filter((rcds) => {
      if (!searchName) {
        return true; // no search date set, return all records
      }
      return rcds.query_name.toLowerCase().includes(searchName.toLowerCase());
    });
    const { pageElements, page, pages, prevClick, nextClick, setPage } =
      usePagination(filteredRecords, 6);
    function handleSearch(event) {
      dispatch(setSearchRecordByName(event.target.value));
      setPage(1);
    }

    const updateRecords = () => {
      dispatch(setEditPannel(true));
      dispatch(setEditedValue(data[activeBg].query_name));
    };
    const deleteRecords = () => {
      dispatch(getDeleteRecords(user?.id, activeBg, data, enqueueSnackbar));
    };
    const getEditSave = () => {
      dispatch(getEditRecord(activeBg, data, editedValue, enqueueSnackbar));
    };

    const retriveGraph = (e) => {
      // dispatch(setDefaultGraph(false));
      // setNodeState(getAccessPatternVariables(e.selection_code));
      // retriveSavedGraphValues(e, setNodeState);
      // const fixPattern = btnArray.findIndex(
      //   (eg) => eg.code === e.selection_code
      // );
      // setPattern(btnArray[fixPattern]);
      // dispatch(setActivePatternWhenRetrive(fixPattern));
      // const specificObject = setDropdownData?.data?.find(
      //   (d) => d.selection_type === e.selection_type
      // );
      // setdropDownOptions(specificObject);
      // setSaveDataSet({ status: true, data: e.dataset });
      // dispatch(setShowStoreOptions(null));
      // dispatch(setOpen(false));
    };

    const closeWithCrossICon = () => {
      dispatch(setEditPannel(false));
    };
    const closeEditPannel = () => {
      dispatch(setEditPannel(false));
    };

    return (
      <Card mb={6} sx={{ position: "relative", pb: 14 }}>
        <TitleHeader sx={{ fontSize: "2rem" }} title={title} />
        {condition && (
          <SearchInputContainer>
            <SearchInput
              value={searchName}
              onChange={handleSearch}
              placeholder="Search by title"
              type="text"
              style={{
                color: theme.palette.text.primary,
                paddingLeft: ".7rem",
              }}
            />
          </SearchInputContainer>
        )}

        <CardContent>
          {pageElements.length === 0 && (
            <AuthLayout>
              <h4>There are no records saved</h4>
            </AuthLayout>
          )}
          {pageElements.length !== 0 && (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">{colFirstTitle}</TableCell>
                    <TableCell align="left">{colSecondTitle}</TableCell>
                    <TableCell align="left">{colThirdTitle}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageElements.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {e.query_name}
                      </TableCell>
                      <TableCell>{e.selected_query}</TableCell>
                      <TableCell>{e.save_time}</TableCell>
                      <TableCell align="right">
                        {!btn ? (
                          <div
                            style={{
                              color: activeBg !== i ? "black" : "#e57373",
                            }}
                          >
                            <MoreOptions
                              saveOnClick={updateRecords}
                              savedGraphOnClick={deleteRecords}
                              index={i}
                              hideControls={hideControls}
                            />
                          </div>
                        ) : (
                          btn
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            ...flexCenter,
            position: "absolute",
            bottom: 20,
          }}
        >
          <StandardButton
            text={<KeyboardArrowLeftIcon />}
            varient="contained"
            mt={0.8}
            mr={0.4}
            fontSize=".7rem"
            fontWeight={600}
            onClick={prevClick}
            disabled={page === 1}
            color={theme.palette.text.primary}
            bgcolor={theme.palette.background.paper}
            hoverColor={theme.palette.background.paper}
          />
          <span>
            {page} / {pages}
          </span>
          <StandardButton
            text={<KeyboardArrowRightIcon />}
            varient="contained"
            mt={0.8}
            mr={0.4}
            fontSize=".7rem"
            fontWeight={600}
            onClick={nextClick}
            disabled={page === pages}
            color={theme.palette.text.primary}
            bgcolor={theme.palette.background.paper}
            hoverColor={theme.palette.background.paper}
          />
        </Box>
        <PopModal
          openModal={editPannel}
          setModalOpen={setEditPannel}
          child={
            <SavePopPanel
              getSave={getEditSave}
              inputValue={editedValue}
              setSaveName={setEditedValue}
              closeWithCrossICon={closeWithCrossICon}
              headTitle="Rename"
              close={closeEditPannel}
            />
          }
          classProp={{ ...popModalContainer, ...popSaveModalContainer }}
        />
      </Card>
    );
  }
);

export default withTheme(ManagedSavedGraphs);
