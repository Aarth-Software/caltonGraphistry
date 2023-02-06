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
  const data = [
    { title: "custom", query: "nodeA+nodeC", date: "12/6/20" },
    { title: "Darci", query: "nodeB", date: "31/6/20" },
    { title: "Brooke", query: "nodeC", date: "16/7/20" },
    { title: "jack", query: "nodeB+nodeC", date: "21/08/21" },
    { title: "custom", query: "nodeA+nodeC", date: "12/6/20" },
    { title: "Darci", query: "nodeB", date: "31/6/20" },
    { title: "Brooke", query: "nodeC", date: "16/7/20" },
    { title: "jack", query: "nodeB+nodeC", date: "21/08/21" },
  ];
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
                title="Journals"
                amount="2324"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Papers"
                amount="4325"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Hypotheses"
                amount="1341"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Prepositions"
                amount="6564"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Constructs"
                amount="64235"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Authors"
                amount="123"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Affiliations"
                amount="7658"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Stats
                title="Publishers"
                amount="4576"
                chip="Yearly"
                percentagetext="+27%"
                percentagecolor={green[500]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
              <DataTable title="Journal Details" condition={false} />
            </Grid>
            <Grid item xs={12} md={12}>
              <DoughnutChart title="Construct Statistics" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          {/* <WorldMap /> */}
          <ManageSavedGarphs
            colFirstTitle="Graph Title"
            colSecondTitle="Query Parameters"
            colThirdTitle="Date & Time"
            title="Manage Saved Graphs"
            condition={true}
            data={data}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          {/* <LanguagesTable /> */}
          <ManageSavedGarphs
            title="Keyword History"
            colFirstTitle="Keywords"
            colSecondTitle="As"
            colThirdTitle="Date & Time"
            condition={true}
            data={data}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Analysis;
