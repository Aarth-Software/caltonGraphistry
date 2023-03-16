import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../../../../libs/Buttons/StandardButton";
const RunGraphButton = styled(StandardButton)`
  bgcolor: ${(props) => props.theme.palette.secondary.main};
`;
const RunButton = ({ theme, onClick }) => {
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
      <StandardButton
        text="Graph"
        varient="contained"
        px={"2em"}
        mt={0.8}
        mr={0.4}
        py=".35em"
        borderRadius={".3rem"}
        fontSize={"1rem"}
        fontWeight={600}
        onClick={onClick}
        bgcolor={theme.palette.secondary.main}
      />
    </Box>
  );
};

export default withTheme(RunButton);
