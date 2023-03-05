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
  Typography,
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

const ManagedSavedGraphs = ({
  theme,
  condition,
  btn,
  title,
  colFirstTitle,
  colSecondTitle,
  colThirdTitle,
  data,
  setApiRecords,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const [activeBg, setActiveBg] = React.useState("");
  const [editPannel, setEditPannel] = React.useState(false);
  const [editedValue, setEditedValue] = React.useState("");
  const { pageElements, page, pages, prevClick, nextClick } = usePagination(
    data,
    7
  );
  const updateRecords = (ele) => {
    console.log(data[ele].query_name);
    setEditPannel(true);
    setEditedValue(data[ele].query_name);
  };
  const deleteRecords = async (ele) => {
    try {
      console.log(ele);
      await deleteRecord({
        uuid: data[ele].uuid,
      });
      setAnchorMenu(false);
      setActiveBg(null);
      enqueueSnackbar(
        `Query with title with ${data[ele].query_name} successfully deleted`,
        {
          variant: "success",
          autoHideDuration: 2000,
          style: { width: 600, left: "calc(50% - 300px)" },
        }
      );
      setApiRecords(data.filter((_, i) => i !== ele));
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
      setApiRecords(
        data.map((eg, i) =>
          i === activeBg ? { ...eg, query_name: editedValue } : eg
        )
      );
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
        <div
          style={{
            width: "100%",
            height: "2.5rem",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <input
            style={{
              width: "96%",
              height: "100%",
              outline: "none",
              border: ".005rem solid #E0E0E0",
              borderRadius: ".3rem",
              paddingLeft: "1rem",
            }}
            placeholder="Search"
            type="text"
          />
        </div>
      )}

      <CardContent>
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
                  {/* {!btn ? <MoreVertical /> : btn} */}
                  {!btn ? (
                    <div
                      style={{
                        // width: "4rem",
                        // boxShadow:
                        //   activeBg !== i
                        //     ? ""
                        //     : "0px .6px 3px rgba(0, 0, 0, 0.06)",
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
                        activeBg={activeBg}
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
          // px={8}
          mt={0.8}
          mr={0.4}
          fontSize=".7rem"
          fontWeight={600}
          onClick={prevClick}
          disabled={page === 1}
          color="black"
          bgcolor="white"
          hoverColor="white"
        />
        <span>
          {page} / {pages}
        </span>
        <StandardButton
          text={<KeyboardArrowRightIcon />}
          varient="contained"
          // px={8}
          mt={0.8}
          mr={0.4}
          fontSize=".7rem"
          fontWeight={600}
          onClick={nextClick}
          disabled={page === pages}
          color="black"
          bgcolor="white"
          hoverColor="white"
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
};

export default withTheme(ManagedSavedGraphs);
