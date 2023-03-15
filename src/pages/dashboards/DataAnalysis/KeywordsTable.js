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
import { flexCenter } from "../../../libs/JSS/Jss";
import StandardButton from "../../../libs/Buttons/StandardButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreOptions from "../MainDashboard/SelectProperties/MoreOptions";
import AuthLayout from "../../../layouts/Auth";
import { useDispatch } from "react-redux";

import { setSearchRecordByKeyword } from "../../../redux/slices/serviceSlice";
import { useSelector } from "react-redux";

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

const KeywordsTable = React.memo(
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
    const dispatch = useDispatch();
    const { activeBg, searchKeyword } = useSelector((state) => state.service);
    const filteredRecords = data.filter((rcds) => {
      if (!searchKeyword) {
        return true; // no search date set, return all records
      }
      return rcds.keyword.toLowerCase().includes(searchKeyword.toLowerCase());
    });
    const { pageElements, page, pages, prevClick, nextClick, setPage } =
      usePagination(filteredRecords, 6);
    function handleSearch(event) {
      dispatch(setSearchRecordByKeyword(event.target.value));
      setPage(1);
    }

    return (
      <Card mb={6} sx={{ position: "relative", pb: 14 }}>
        <TitleHeader sx={{ fontSize: "2rem" }} title={title} />
        {condition && (
          <SearchInputContainer>
            <SearchInput
              value={searchKeyword}
              onChange={handleSearch}
              placeholder="Search by keyword"
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
                        {e.keyword}
                      </TableCell>
                      <TableCell>{e.node}</TableCell>
                      <TableCell>{e.save_time}</TableCell>
                      <TableCell align="right">
                        {!btn ? (
                          <div
                            style={{
                              color: activeBg !== i ? "black" : "#e57373",
                            }}
                          >
                            <MoreOptions
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
      </Card>
    );
  }
);

export default withTheme(KeywordsTable);
