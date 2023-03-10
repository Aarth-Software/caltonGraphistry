import styled from "@emotion/styled";
import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../../../../libs/Buttons/StandardButton";
const RunGraphButton = styled(StandardButton)`
  background: ${(props) => props.theme.palette.secondary.main};
`;
const RunButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        width: "auto",
        height: "5.7rem",
        display: "flex",
        alignItems: "flex-end",
        flexGraw: 1,
        justifyContent: "center",
        flexDirection: "row",
        py: 2,
        // bgcolor: "red",
      }}
    >
      <RunGraphButton
        text="Graph"
        varient="contained"
        px={8}
        mt={0.8}
        mr={0.4}
        // fontSize=".7rem"
        fontWeight={600}
        onClick={onClick}
      />
    </Box>
  );
};

export default RunButton;
