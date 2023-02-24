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
}) => {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const [activeBg, setActiveBg] = React.useState("");
  const { pageElements, page, pages, prevClick, nextClick } = usePagination(
    data,
    7
  );
  const saveOnClick = () => {};
  const savedGraphOnClick = () => {};
  console.log(activeBg);

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
                  {e.title}
                </TableCell>
                <TableCell>{e.query}</TableCell>
                <TableCell>{e.date}</TableCell>
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
                        saveOnClick={saveOnClick}
                        savedGraphOnClick={savedGraphOnClick}
                        anchorMenu={anchorMenu}
                        setAnchorMenu={setAnchorMenu}
                        setActiveBg={setActiveBg}
                        index={i}
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
    </Card>
  );
};

export default withTheme(ManagedSavedGraphs);
