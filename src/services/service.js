import { api } from "./api";

export const GenerateDataSet = (body) => {
  const { nodeA, keywordA, nodeB, keywordB, nodeC, keywordC } = body;
  return api.get(
    `buildQuery?node1=${nodeA}&keyword1=${keywordA}&node2=${nodeB}&keyword2=${keywordB}&node3=${nodeC}&keyword3=${keywordC}`
  );
};

export const getDropdowns = () => api.get("getDropdownValues");

export const dashBoardData = () => api.get("dashboardQuery");

//  save record
export const postQuery = (body) => api.post("saveQuery", body);

// get Saved recoreds associated with login user ID
export const getUserRecords = (params) =>
  api.get(`userQueries/${params.userId}`);

// delete Record using Recored ID
export const deleteRecord = (body) => api.post("deleteSavedQuery", body);

// update Record using Record ID and new name parameter
export const updateRecord = (body) => api.post("updateSavedQuery", body);

export const getKeywords = (params) =>
  api.get(`/userKeywords/${params.userId}`);
