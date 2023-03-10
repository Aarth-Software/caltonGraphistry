import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";

import { MoreVertical } from "react-feather";

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
import usePagination from "../../../../hooks/usePagenation";
import { flexCenter } from "../../../../libs/JSS/Jss";
import StandardButton from "../../../../libs/Buttons/StandardButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Loader from "../../../../components/Loader";
import AuthLayout from "../../../../layouts/Auth";
import Page500 from "../../../auth/Page500";

const Card = styled(MuiCard)(spacing);

const TableRow = styled(MuiTableRow)`
  height: 46px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
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
  width: 96%;
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

const SavedGraphsPop = ({ theme, Btn, record, click, recordStatus }) => {
  const [searchDate, setSearchDate] = React.useState("");
  const [message, setMessage] = React.useState("there are no records saved");
  console.log(record);
  const filteredRecords = record.filter((rcds) => {
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
    if (pageElements.length === 0) {
      setMessage("there are no records with this date");
    }
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

  return (
    <Card mb={6}>
      <TitleHeader sx={{ fontSize: "2rem" }} title="Saved Graphs" />
      <SearchInputContainer>
        <SearchInput
          value={searchDate}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          placeholder="Search Date(yy/mm/dd or dd/mm/yy)"
          style={{ color: theme.palette.text.primary, paddingLeft: ".7rem" }}
          type="text"
        />
      </SearchInputContainer>
      {pageElements.length === 0 && !recordStatus[0] && (
        <h5
          style={{
            textAlign: "center",
          }}
        >
          {message}
        </h5>
      )}
      {recordStatus[0] && <Loader />}
      {recordStatus[1] && (
        <AuthLayout>
          <Page500 />
        </AuthLayout>
      )}
      {pageElements.length !== 0 && !recordStatus[0] && (
        <>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Query</TableCell>
                  <TableCell align="left">Date</TableCell>
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
                      {!Btn ? (
                        <MoreVertical />
                      ) : (
                        React.cloneElement(Btn, { onClick: () => click(e) })
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
              bottom: 10,
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
              // px={8}
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
        </>
      )}
    </Card>
  );
};

export default withTheme(SavedGraphsPop);
