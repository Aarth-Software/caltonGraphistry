import React, { useCallback } from "react";

const baseURL = process.env.REACT_APP_BASE_URL;
export const useFetch = (endPoint, parse) => {
  const [loading, setLoading] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);
  const getFetch = useCallback(() => {
    console.log("loaded");
    setLoading(true);
    fetch(`${baseURL}/${endPoint}`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (parse) {
          setData(JSON.parse(result));
        } else {
          setData(result);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  }, [endPoint, parse]);
  React.useEffect(() => {
    getFetch();
  }, [getFetch]);
  return [loading, data, error];
};
