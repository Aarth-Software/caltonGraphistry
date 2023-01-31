import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { memo } from "react";
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
  const { name } = props;
  // console.log("donnnn");
  return (
    <GraphistryContainer sx={graphContainerStyle}>
      <Frame
        className="iframe-container"
        id="myIframe"
        src={`https://hub.graphistry.com/graph/graph.html?dataset=${"Miserables"}`}
        title="GraphistryIframe"
        sx={{ borderRadius: 1.5 }}
      />
    </GraphistryContainer>
  );
});

export default GraphistryGraph;
