import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Doughnut } from "react-chartjs-2";
import { MoreVertical } from "react-feather";

import { green, grey } from "@mui/material/colors";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box, spacing } from "@mui/system";
import Stats from "./Stats";
import { addCommas } from "../../../libs/HigherOrderFunctions";

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
  const [activeSegment, setActiveSegment] = React.useState(null);

  // console.log(graphData);
  const data = {
    labels: graphData?.map((eg) => eg.role.replace("Variable", " Variable")),
    datasets: [
      {
        data: graphData?.map((eg) => eg.count),
        backgroundColor: ["#f16067", "#f8e276", "#4d96d0", "#77c47b"],
        borderWidth: 10,
        borderColor: theme.palette.background.paper,
      },
    ],
  };

  const handleHover = (event, segments) => {
    if (segments.length > 0) {
      const segment = segments[0].index;
      setActiveSegment(segment);
    } else {
      setActiveSegment(null);
    }
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
      },
    },
    cutout: "70%",
    onHover: handleHover,
  };
  const colors = ["#f16067", "#f8e276", "#4d96d0", "#77c47b"];
  // red yellow blue green
  return (
    <Card mb={6}>
      <TitleHeader
        // action={
        //   <IconButton aria-label="settings" size="large">
        //     <MoreVertical />
        //   </IconButton>
        // }
        title={title}
        // sx={{ bgcolor: "red" }}
      />

      <CardContent sx={{ display: "flex" }}>
        <Grid container spacing={0} justify="center" alignItems="center">
          {graphData.length === 0 && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h2"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                No data available
              </Typography>
            </Box>
          )}
          {graphData.length !== 0 && (
            <>
              <Grid item xs={4} sm={5} md={5} lg={5}>
                <ChartWrapper>
                  <DoughnutInner>
                    <Typography variant="h4">
                      {activeSegment !== null
                        ? graphData[activeSegment]?.percentage.toFixed(2) + "%"
                        : addCommas(graphData[0]?.total)}
                    </Typography>
                    <Typography variant="caption">
                      {activeSegment !== null
                        ? graphData[activeSegment].role.replace(
                            "Variable",
                            " Variable"
                          )
                        : "Total"}
                    </Typography>
                  </DoughnutInner>
                  <Doughnut data={data} options={options} />
                </ChartWrapper>
              </Grid>
              <Grid item xs={8} sm={7} md={7} lg={7}>
                <Grid container spacing={3}>
                  {graphData.map((el, i) => (
                    <Grid key={i} item xs={6} sm={6} md={6}>
                      <Stats
                        title={el.role.replace("Variable", " Variable")}
                        amount={el.count}
                        chip="Yearly"
                        percentagetext={el.percentage.toFixed(2)}
                        percentagecolor={green[500]}
                        sx={{ border: "1px solid " + grey[300] }}
                        color={colors[i]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withTheme(DoughnutChart);
