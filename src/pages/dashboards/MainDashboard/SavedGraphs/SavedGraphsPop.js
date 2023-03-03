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

const SavedGraphsPop = ({ theme, Btn, record, click }) => {
  const { pageElements, page, pages, prevClick, nextClick } = usePagination(
    record,
    6
  );
  console.log();
  return (
    <Card mb={6}>
      <TitleHeader sx={{ fontSize: "2rem" }} title="Saved Graphs" />
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
        {/* <PagenationControls elements={record} page={page} setPage={setPage} /> */}
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
    </Card>
  );
};

export default withTheme(SavedGraphsPop);
