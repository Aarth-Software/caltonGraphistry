import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Doughnut } from "react-chartjs-2";
import { MoreVertical } from "react-feather";

import { orange, green, red, grey } from "@mui/material/colors";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import Stats from "./Stats";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 18rem;
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

// const TableRow = styled(MuiTableRow)`
//   height: 42px;
// `;

// const TableCell = styled(MuiTableCell)`
//   padding-top: 0;
//   padding-bottom: 0;
// `;

// const GreenText = styled.span`
//   color: ${() => green[400]};
//   font-weight: ${(props) => props.theme.typography.fontWeightMedium};
// `;

// const RedText = styled.span`
//   color: ${() => red[400]};
//   font-weight: ${(props) => props.theme.typography.fontWeightMedium};
// `;
const TitleHeader = styled(CardHeader)`
  color: ${(props) => props.theme.palette.secondary.main};
`;

const DoughnutChart = ({ theme, title, graphData }) => {
  console.log(graphData);
  const data = {
    labels: graphData?.map((eg) => eg.role),
    datasets: [
      {
        data: graphData?.map((eg) => eg.count),
        backgroundColor: [
          theme.palette.secondary.main,
          red[500],
          orange[500],
          theme.palette.grey[200],
        ],
        borderWidth: 10,
        borderColor: theme.palette.background.paper,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  };

  return (
    <Card mb={6}>
      <TitleHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title={title}
        // sx={{ bgcolor: "red" }}
      />

      <CardContent sx={{ display: "flex" }}>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={4} sm={5} md={5} lg={5}>
            <ChartWrapper>
              <DoughnutInner>
                <Typography variant="h4">+27%</Typography>
                <Typography variant="caption">more visitors</Typography>
              </DoughnutInner>
              <Doughnut data={data} options={options} />
            </ChartWrapper>
          </Grid>
          <Grid item xs={8} sm={7} md={7} lg={7}>
            <Grid container spacing={3}>
              {graphData.map((el, i) => (
                <Grid key={i} item xs={6} sm={6} md={6}>
                  <Stats
                    title={el.role}
                    amount={el.count}
                    chip="Yearly"
                    percentagetext={el.percentage.toFixed(2)}
                    percentagecolor={green[500]}
                    sx={{ border: "1px solid " + grey[300] }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {graphData?.map((eg, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {eg.role}
                </TableCell>
                <TableCell>{eg.count}</TableCell>
                <TableCell>{eg.percentage.toFixed(2)} %</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </CardContent>
    </Card>
  );
};

export default withTheme(DoughnutChart);
