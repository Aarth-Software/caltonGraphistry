import { api } from "./api";
export const getDataSet = (body) =>
  api.get("buildQuery?node1=Construct", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      mode: "no-cors",
    },
  });

export const postDataSet = (req) =>
  api.get(
    `buildQuery/?node1=${req.nodeA}&node2=${req.nodeB}&node3=${req.nodeC}`
  );

export const getDropdowns = () => api.get("getDropdownValues");

export const dashBoardData = () => api.get("dashboardQuery");
