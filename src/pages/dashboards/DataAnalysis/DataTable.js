import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";

import { green, red } from "@mui/material/colors";
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
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;
const TitleHeader = styled(CardHeader)`
  color: ${(props) => props.theme.palette.secondary.main};
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

const DoughnutChart = ({ theme, condition, title }) => {
  return (
    <Card mb={6}>
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
              <TableCell>Journal Names</TableCell>
              <TableCell>Years</TableCell>
              <TableCell>No. of Papers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Social
              </TableCell>
              <TableCell>260</TableCell>
              <TableCell>
                <GreenText>+35%</GreenText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Search Engines
              </TableCell>
              <TableCell>125</TableCell>
              <TableCell>
                <RedText>-12%</RedText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Direct
              </TableCell>
              <TableCell>54</TableCell>
              <TableCell>
                <GreenText>+46%</GreenText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Other
              </TableCell>
              <TableCell>146</TableCell>
              <TableCell>
                <GreenText>+24%</GreenText>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default withTheme(DoughnutChart);
