import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../../../../../libs/Buttons/StandardButton";

const AppendFilter = ({ appendFilterElement }) => {
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
          marginTop: "2.4rem",
        }}
      >
        <StandardButton
          onClick={appendFilterElement}
          text="+ Add"
          fontSize="1rem"
          fontWeight={600}
          px={6}
        />
        <StandardButton
          text="Apply"
          varient="contained"
          px={6}
          mt={0.8}
          mr={0.4}
          fontSize=".7rem"
          fontWeight={600}
        />
      </Box>
    </>
  );
};

export default AppendFilter;
