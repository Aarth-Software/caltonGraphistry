/* eslint-disable no-unused-vars */
import { Grid } from "@mui/material";
import { green } from "@mui/material/colors";
import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Loader";
import AuthLanding from "../../../layouts/AuthLanding";
import { getKeywords, getUserRecords } from "../../../services/service";
import { useFetch } from "../../../utils/useFetch";

import Page500 from "../../auth/Page500";
import AuthLayout from "../../../layouts/Auth";

import DoughnutChart from "../Default/DoughnutChart";
import Stats from "../Default/Stats";
import DataTable from "./DataTable";
import ManageSavedGarphs from "./ManageSavedGarphs";

const Analysis = () => {
  const [apiRecords, setApiRecords] = React.useState([]);
  const [recoredsLoading, setRecordsLoading] = React.useState(false);
  const [keywords, setKeywords] = React.useState([]);
  const [keywordLoading, setKeywordLoading] = React.useState(false);
  const [loading, records] = useFetch(`dashboardQuery`, true);
  const { keycloak, initialized } = useKeycloak();
  console.log(records);
  React.useEffect(() => {
    (async () => {
      try {
        setRecordsLoading(true);
        const response = await getUserRecords({
          userId: keycloak.idTokenParsed.sub,
        });
        setApiRecords(response.data);
        setRecordsLoading(false);
      } catch (err) {
        setRecordsLoading(null);
        console.log(err);
      }
    })();
    (async () => {
      try {
        setKeywordLoading(true);
        const response = await getKeywords({
          userId: keycloak.idTokenParsed.sub,
        });
        console.log(response.data);
        setKeywords(response.data);
        setKeywordLoading(false);
      } catch (err) {
        setKeywordLoading(null);
        console.log(err);
      }
    })();
  }, [keycloak.idTokenParsed.sub]);

  const conditionalData = records?.query1?.length > 0 ? records.query1[0] : {};

  if (loading) {
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
  if (
    (!recoredsLoading && apiRecords.length === 0) ||
    (!keywordLoading && keywords.length === 0)
  ) {
    return (
      <AuthLayout>
        <h5 style={{ textAlign: "center" }}>
          No records associated with this user
        </h5>
      </AuthLayout>
    );
  }

  return (
    <React.Fragment>
      <Helmet title="Analytics Dashboard" />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          {/* <Grid container spacing={6}>
            <Grid item xs={12} lg={12}> */}

          <Grid container spacing={5}>
            {Object.entries(conditionalData).map((el, i) => (
              <Grid key={i} item xs={12} sm={12} md={6}>
                <Stats
                  title={el[0]}
                  amount={el[1]}
                  chip="Yearly"
                  percentagetext="+27%"
                  percentagecolor={green[500]}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
              <DataTable
                data={records?.query2}
                title="Journal Details"
                condition={false}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DoughnutChart
                graphData={records?.query3}
                title="Construct Statistics"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* {!recoredsLoading && apiRecords.length === 0 && <h3>no records found</h3>} */}

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          {/* <WorldMap /> */}
          <ManageSavedGarphs
            colFirstTitle="Graph Title"
            colSecondTitle="Query Parameters"
            colThirdTitle="Date & Time"
            title="Manage Saved Graphs"
            condition={true}
            data={apiRecords}
            setApiRecords={setApiRecords}
            accessKeys={["query_name", "selected_query", "save_time"]}
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
            data={keywords}
            setApiRecords={setKeywords}
            accessKeys={["keyword", "node", "save_time"]}
            hideControls={true}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Analysis;
