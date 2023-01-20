import { Grid, Table, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React from "react";
import { Helmet } from "react-helmet-async";
import LanguagesTable from "../Analytics/LanguagesTable";
import WorldMap from "../Analytics/WorldMap";
import Actions from "../Default/Actions";
import BarChart from "../Default/BarChart";
import DoughnutChart from "../Default/DoughnutChart";
import Stats from "../Default/Stats";
import DataTable from "./DataTable";
import ManageSavedGarphs from "./ManageSavedGarphs";

const Analysis = () => {
  return (
    <React.Fragment>
      <Helmet title="Analytics Dashboard" />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          {/* <Grid container spacing={6}>
            <Grid item xs={12} lg={12}> */}
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            {/* </Grid>
            </Grid> */}

            {/* <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Bounce"
                amount="12.364"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
              <DataTable condition={false} />
            </Grid>
            <Grid item xs={12} md={12}>
              <DoughnutChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          {/* <WorldMap /> */}
          <ManageSavedGarphs condition={true} />
        </Grid>
        <Grid item xs={12} lg={6}>
          {/* <LanguagesTable /> */}
          <ManageSavedGarphs condition={true} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Analysis;
