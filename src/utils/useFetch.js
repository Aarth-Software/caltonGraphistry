import React, { useCallback } from "react";

export const useFetch = (url, parse) => {
  const [loading, setLoading] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);
  const getFetch = useCallback(() => {
    console.log("loaded");
    setLoading(true);
    fetch(url, {
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
  }, [url, parse]);
  React.useEffect(() => {
    getFetch();
  }, [getFetch]);
  return [loading, data, error];
};
