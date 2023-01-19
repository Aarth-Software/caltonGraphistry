import styled from "@emotion/styled";
import React from "react";

const GraphistryGraph = () => {
  const Frame = styled("iframe")({
    height: "100%",
    width: "100%",
    borderRadius: ".3rem",
    outline: "none",
    border: "none",
  });
  return (
    <>
      <Frame
        className="iframe-container"
        id="myIframe"
        src={`https://hub.graphistry.com/graph/graph.html?dataset=${"Miserables"}`}
        title="GraphistryIframe"
        sx={{ borderRadius: 1.5 }}
      />
    </>
  );
};

export default GraphistryGraph;
