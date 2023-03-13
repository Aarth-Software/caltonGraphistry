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
  Typography,
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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setContainerSize,
  setRetriveGraphSearch,
} from "../../../../redux/slices/serviceSlice";
import { remToPx } from "../../../../libs/HigherOrderFunctions";

const Card = styled(MuiCard)(spacing);

const TableRow = styled(MuiTableRow)`
  height: 46px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TitleHeader = styled(CardHeader)`
  color: ${(props) => props.theme.palette.secondary.main};
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
  font-size: 0.9rem;

  ::placeholder {
    color: #999;
    // font-style: italic;
    padding-left: 0.6rem;
    font-size: 0.9rem;
  }
`;

const ScrollBox = styled(CardContent)`
  height: calc(100% - 3.5rem - 0.5rem - 8rem);
  py: 2;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const SavedGraphsPop = ({
  theme,
  Btn,
  record,
  click,
  recordStatus,
  containerRef,
}) => {
  const dispatch = useDispatch();
  const { retriveGraphSearch, containerSize } = useSelector(
    (state) => state.service
  );
  const [message, setMessage] = React.useState("there are no records saved");
  console.log(record);
  const filteredRecords = record.filter((rcds) => {
    if (!retriveGraphSearch) {
      return true; // no search date set, return all records
    }
    return rcds.query_name
      .toLowerCase()
      .includes(retriveGraphSearch.toLowerCase());
  });
  const { pageElements, page, pages, prevClick, nextClick, setPage } =
    usePagination(filteredRecords, 6, containerSize, 55);
  function handleSearch(event) {
    dispatch(setRetriveGraphSearch(event.target.value));
    setPage(1);
  }
  React.useEffect(() => {
    dispatch(setContainerSize(containerRef.current?.clientHeight));
    // console.log(containerRef.current?.clientHeight);
  }, [containerRef, dispatch]);

  return (
    <>
      <TitleHeader sx={{ fontSize: "2rem" }} title="Saved Graphs" />
      <SearchInputContainer>
        <SearchInput
          value={retriveGraphSearch}
          onChange={handleSearch}
          placeholder="Search by title"
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
          <ScrollBox ref={containerRef}>
            <Table sx={{ padding: 0 }}>
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
          </ScrollBox>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              ...flexCenter,
              position: "relative",
              top: "1rem",
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
              bgcolor={"transparent"}
              hoverColor={"transparent"}
            />
            <span style={{ fontSize: ".9rem" }}>
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
              bgcolor={"transparent"}
              hoverColor={"transparent"}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default withTheme(SavedGraphsPop);
