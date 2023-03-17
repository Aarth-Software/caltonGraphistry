import { withTheme } from "@emotion/react";
import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../../../../../libs/Buttons/StandardButton";

const AppendFilter = ({ theme, appendFilterElement }) => {
  return (
    <>
      <Box
        sx={{
          //   bgcolor: "gray",
          height: "2rem",
          position: "relative",
          bottom: 0,
          width: "calc(100% - 1.3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "3rem",
          marginBottom: "1rem",
        }}
      >
        <StandardButton
          onClick={appendFilterElement}
          text="+ Add"
          fontSize=".8rem"
          fontWeight={600}
          px={6}
          color={theme.palette.secondary.main}
        />
        <StandardButton
          text="Apply"
          varient="contained"
          px={6}
          mt={0.8}
          mr={0.4}
          fontSize=".7rem"
          fontWeight={600}
          bgcolor={theme.palette.secondary.main}
        />
      </Box>
    </>
  );
};

export default withTheme(AppendFilter);
