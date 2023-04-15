import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";
import { graphContainerStyle } from "../../../../libs/JSS/Jss";

const Frame = styled("iframe")({
  height: "100%",
  width: "100%",
  borderRadius: ".3rem",
  outline: "none",
  border: "none",
});
const GraphistryContainer = styled(Box)({
  width: "100%",
  height: "100%",
});
const GraphistryGraph = React.memo((props) => {
  const { dataSet, selectNodeType } = props;
  const object = {
    "1node": `https://hub.graphistry.com/graph/graph.html?dataset=${dataSet}&splashAfter=false&strongGravity=true&play=0&edgeOpacity=0`,
    "2node": `https://hub.graphistry.com/graph/graph.html?dataset=${dataSet}&splashAfter=false&strongGravity=true&play=500`,
    "3anode": `https://hub.graphistry.com/graph/graph.html?dataset=${dataSet}&splashAfter=false&strongGravity=true&play=500&pruneOrphans=true`,
    "3bnode": `https://hub.graphistry.com/graph/graph.html?dataset=${dataSet}&splashAfter=false&strongGravity=true&play=500&pruneOrphans=true`,
    undefined: `https://hub.graphistry.com/graph/graph.html?dataset=${dataSet}&splashAfter=false&strongGravity=true&play=500`,
  };
  return (
    <GraphistryContainer sx={graphContainerStyle}>
      <Frame
        className="iframe-container"
        id="myIframe"
        src={object[`${selectNodeType}`]}
        title="GraphistryIframe"
        sx={{ borderRadius: 1.5 }}
      />
    </GraphistryContainer>
  );
});

export default GraphistryGraph;
