import { api } from "./api";

export const GenerateDataSet = (body) => {
  const {
    nodeA,
    keywordA,
    nodeB,
    keywordB,
    nodeC,
    keywordC,
    fromYear,
    toYear,
    publicationFilter,
    publisherFilter,
    affiliationFilter,
    userId,
  } = body;
  const params = {
    node1: nodeA,
    keyword1: keywordA,
    node2: nodeB,
    keyword2: keywordB,
    node3: nodeC,
    keyword3: keywordC,
    fromYear: fromYear,
    toYear: toYear,
    publicationFilter,
    publisherFilter,
    affiliationFilter,
    userId,
  };
  return api.post(`buildQuery`, params);
};

export const getDropdowns = () => api.get("getDropdownValues");

export const dashBoardData = () => api.get("dashboardQuery");
export const getDefaultDataSet = () => api.get("defaultGraph");

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
export const postContact = (body) => api.post("saveContact", body);

// filters requests
export const getFilters = () => api.get("getFilterLov");
