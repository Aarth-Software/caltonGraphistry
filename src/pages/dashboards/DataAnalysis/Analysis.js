/* eslint-disable no-unused-vars */
import { Grid } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Loader";
import Page500 from "../../auth/Page500";
import AuthLayout from "../../../layouts/Auth";

import DoughnutChart from "../Default/DoughnutChart";
import Stats from "../Default/Stats";
import DataTable from "./DataTable";
import ManageSavedGarphs from "./ManageSavedGarphs";
import {
  fetchDashboardInfo,
  fetchKeywords,
  setDashboardFetchOnce,
} from "../../../redux/slices/dashboardSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchSavedQuaries } from "../../../redux/slices/querySlice";
import KeywordsTable from "./KeywordsTable";
import useAuth from "../../../hooks/useAuth";
import { withTheme } from "@emotion/react";

const Analysis = ({ theme }) => {
  const dispatch = useDispatch();
  const {
    dashboardFetchOnce,
    keywords,
    keywordsLoading,
    dashboardInfo,
    dashboardInfoLoading,
  } = useSelector((state) => state.dashboard);
  const { user } = useAuth();
  const { savedRecords } = useSelector((state) => state.query);
  const [apiRecords, setApiRecords] = React.useState([]);
  const [recoredsLoading, setRecordsLoading] = React.useState(false);

  React.useEffect(() => {
    if (dashboardFetchOnce) {
      dispatch(fetchKeywords(user?.id));
      dispatch(fetchDashboardInfo());
      dispatch(fetchSavedQuaries(user?.id));
    }
    dispatch(setDashboardFetchOnce(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(dashboardInfo);

  const conditionalData =
    dashboardInfo?.query1?.length > 0 ? dashboardInfo.query1[0] : {};

  if (dashboardInfoLoading) {
    return (
      <AuthLayout>
        <Loader />
      </AuthLayout>
    );
  }
  if (recoredsLoading === null) {
    return (
      <AuthLayout>
        <Page500 />
      </AuthLayout>
    );
  }
  return (
    <>
      {!dashboardInfoLoading && dashboardInfo.length !== 0 && (
        <>
          {/* <Helmet title="Dashboard" /> */}

          <Grid container spacing={6}>
            <Grid item xs={12} lg={5}>
              <Grid container spacing={5}>
                {Object.entries(conditionalData).map((el, i) => (
                  <Grid key={i} item xs={12} sm={12} md={6}>
                    <Stats
                      title={el[0]}
                      amount={!el[1] ? "No data" : el[1]}
                      chip="Yearly"
                      percentagetext="+27%"
                      percentagecolor={green[500]}
                      // color={theme.palette.secondary.main}
                      color={"#4d96d0"}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                  <DataTable
                    data={dashboardInfo?.query2}
                    title="Journal Details"
                    condition={false}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <DoughnutChart
                    graphData={dashboardInfo?.query3}
                    title="Construct Statistics"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
              <ManageSavedGarphs
                colFirstTitle="Graph Title"
                colSecondTitle="Query Parameters"
                colThirdTitle="Date & Time"
                title="Manage Saved Graphs"
                condition={true}
                data={savedRecords}
                setApiRecords={setApiRecords}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <KeywordsTable
                title="Keyword History"
                colFirstTitle="Keywords"
                colSecondTitle="As"
                colThirdTitle="Date & Time"
                condition={true}
                data={keywords}
                setApiRecords={null}
                hideControls={true}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default withTheme(Analysis);
