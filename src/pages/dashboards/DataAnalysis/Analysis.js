import { Grid } from "@mui/material";
import { green } from "@mui/material/colors";
import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Loader";
import { dashBoardData, getUserRecords } from "../../../services/service";
import { useFetch } from "../../../utils/useFetch";

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
  const [apiRecords, setApiRecords] = React.useState([]);
  const [recoredsLoading, setRecordsLoading] = React.useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;
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
        console.log(response.data);
        setApiRecords(response.data);
        setRecordsLoading(false);
      } catch (err) {
        setRecordsLoading(null);
        console.log(err);
      }
    })();
  }, [keycloak.idTokenParsed.sub]);

  const conditionalData = records?.query1?.length > 0 ? records.query1[0] : {};

  if (loading && initialized) {
    return <Loader color={"red"} />;
  }
  if (recoredsLoading === null) {
    return <h6>got error</h6>;
  }
  if (!recoredsLoading && apiRecords.length === 0) {
    <h5 style={{ textAlign: "center" }}>no records found with this user</h5>;
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
            data={apiRecords}
            setApiRecords={setApiRecords}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Analysis;
