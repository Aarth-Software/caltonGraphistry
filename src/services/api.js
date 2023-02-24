import axios from "axios";
export const api = axios.create({
  baseURL: "http://3.99.53.148/app2/",
  // timeout: 1000,
  // headers: {
  //   Accept: "application/vnd.GitHub.v3+json",
  // },
});
