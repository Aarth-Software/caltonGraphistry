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
import { deleteRecord, updateRecord } from "../../../services/service";
import { useSnackbar } from "notistack";
import SavePopPanel from "../MainDashboard/SavedGraphs/SavePopPanel";
import PopModal from "../../../libs/Modal/PopModal";
import AuthLayout from "../../../layouts/Auth";
import { useDispatch } from "react-redux";
import {
  editRecordName,
  fetchSavedQuaries,
  removeRecord,
} from "../../../redux/slices/querySlice";
import { useKeycloak } from "@react-keycloak/web";
import { fetchKeywords } from "../../../redux/slices/dashboardSlice";

const Card = styled(MuiCard)(spacing);

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const TitleHeader = styled(CardHeader)`
  color: ${(props) => props.theme.palette.secondary.main};
`;
const SearchInputContainer = styled("div")`
  width: 100%;
  height: 2.5rem;
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
    font-style: italic;
    padding-left: 0.6rem;
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
    const { keycloak } = useKeycloak();
    const [anchorMenu, setAnchorMenu] = React.useState(null);
    const [activeBg, setActiveBg] = React.useState("");
    const [editPannel, setEditPannel] = React.useState(false);
    const [editedValue, setEditedValue] = React.useState("");
    const [searchDate, setSearchDate] = React.useState("");
    const filteredRecords = data.filter((rcds) => {
      if (!searchDate) {
        return true; // no search date set, return all records
      }
      const date = new Date(rcds.save_time);
      const recordDate = date.toLocaleDateString("en-CA");
      const searchDateString = new Date(searchDate).toLocaleDateString("en-CA");
      return recordDate <= searchDateString;
    });
    const { pageElements, page, pages, prevClick, nextClick, setPage } =
      usePagination(filteredRecords, 6);
    function handleSearch(event) {
      setSearchDate(event.target.value);
    }
    function handleKeyPress(event) {
      const keyCode = event.keyCode || event.which;
      const keyValue = String.fromCharCode(keyCode);

      // Allow only numeric digits and "/"
      const regex = /[0-9/]/;
      if (!regex.test(keyValue)) {
        event.preventDefault();
      }
      setPage(1);
    }
    const updateRecords = () => {
      setEditPannel(true);
      setEditedValue(data[activeBg].query_name);
    };
    const deleteRecords = async () => {
      try {
        await deleteRecord({
          uuid: data[activeBg].uuid,
        });
        setAnchorMenu(false);
        setActiveBg(null);
        enqueueSnackbar(
          `Query with title with ${data[activeBg].query_name} successfully deleted`,
          {
            variant: "success",
            autoHideDuration: 2000,
            style: { width: 600, left: "calc(50% - 300px)" },
          }
        );
        dispatch(fetchKeywords(keycloak));
        dispatch(removeRecord({ activeBg }));
      } catch (err) {
        setAnchorMenu(false);
        setActiveBg(null);
        enqueueSnackbar(`Delete action unsuccessfull`, {
          variant: "error",
          autoHideDuration: 2000,
          style: { width: 300, left: "calc(50% - 150px)" },
        });
      }
    };
    const getEditSave = async () => {
      try {
        await updateRecord({
          uuid: data[activeBg].uuid,
          query_name: editedValue,
        });
        setAnchorMenu(false);
        setActiveBg(null);
        enqueueSnackbar(`Query name successfully updated`, {
          variant: "success",
          autoHideDuration: 2000,
          style: { width: 400, left: "calc(50% - 200px)" },
        });
        dispatch(editRecordName({ activeBg, editedValue }));
        setEditPannel(false);
      } catch (err) {
        console.log(err);
        setAnchorMenu(false);
        setActiveBg(null);
        enqueueSnackbar(`Update action unsuccessfull`, {
          variant: "error",
          autoHideDuration: 2000,
          style: { width: 300, left: "calc(50% - 150px)" },
        });
      }
    };

    const closeWithCrossICon = () => {
      setEditPannel(false);
    };
    const closeEditPannel = () => {
      setEditPannel(false);
    };

    return (
      <Card mb={6} sx={{ position: "relative", pb: 14 }}>
        <TitleHeader sx={{ fontSize: "2rem" }} title={title} />
        {condition && (
          <SearchInputContainer>
            <SearchInput
              value={searchDate}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              placeholder="Search Date(yy/mm/dd or dd/mm/yy)"
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
                        {e[accessKeys[0]]}
                      </TableCell>
                      <TableCell>{e[accessKeys[1]]}</TableCell>
                      <TableCell>{e[accessKeys[2]]}</TableCell>
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
                              anchorMenu={anchorMenu}
                              setAnchorMenu={setAnchorMenu}
                              setActiveBg={setActiveBg}
                              index={i}
                              text1={"Update"}
                              text2={"Delete"}
                              ele={e}
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
