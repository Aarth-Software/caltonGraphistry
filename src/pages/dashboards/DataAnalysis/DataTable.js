import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";

// import { red } from "@mui/material/colors";
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
  height: 46px;
`;
const TitleHeader = styled(CardHeader)`
  color: ${(props) => props.theme.palette.secondary.main};
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

// const GreenText = styled.span`
//   color: ${() => green[400]};
//   font-weight: ${(props) => props.theme.typography.fontWeightMedium};
// `;

// const RedText = styled.span`
//   color: ${() => red[400]};
//   font-weight: ${(props) => props.theme.typography.fontWeightMedium};
// `;

const DoughnutChart = ({ theme, condition, title, data }) => {
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
            {data?.map((eg, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {eg.JournalName}
                </TableCell>
                <TableCell>{eg.Years}</TableCell>
                <TableCell>{eg.NumOfPapers}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default withTheme(DoughnutChart);
