import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Doughnut } from "react-chartjs-2";
import { MoreVertical } from "react-feather";

import { orange, green, red } from "@mui/material/colors";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
} from "@mui/material";
import { Box, spacing } from "@mui/system";
import usePagination from "../../../hooks/usePagenation";
import { flexCenter } from "../../../libs/JSS/Jss";
import StandardButton from "../../../libs/Buttons/StandardButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
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
  const { pageElements, page, pages, prevClick, nextClick } = usePagination(
    data,
    7
  );

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
                  {!btn ? <MoreVertical /> : btn}
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
