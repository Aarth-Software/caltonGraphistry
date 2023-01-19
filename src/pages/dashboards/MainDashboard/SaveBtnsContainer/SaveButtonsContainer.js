import { Box } from "@mui/material";
import React from "react";
import StandardButton from "../../../../libs/Buttons/StandardButton";
import { flexSpaceAround } from "../../../../libs/JSS/Jss";

const SaveButtonsContainer = () => {
  return (
    <Box
      sx={{
        flexGrow: 0,
        bgcolor: "#FFFFFF",
        height: "7.5rem",
        width: "8rem",
        borderRadius: 1.5,
        boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)",
        ...flexSpaceAround,
        flexDirection: "column",
      }}
    >
      <StandardButton
        text="Saved graphs"
        bgcolor="#FFFFFF"
        hoverColor="#FFFFFF"
        color="#e86a6a"
        mt={2}
        fontWeight={600}
        sx={{ textDecoration: "underline" }}
        fontSize=".7rem"
      />
      <StandardButton
        text="Save"
        bgcolor="#e86a6a"
        hoverColor="#e86a6a"
        color="#FFFFFF"
        varient="contained"
        px={6}
        mt={0}
        fontSize=".7rem"
        fontWeight={600}
      />
    </Box>
  );
};

export default SaveButtonsContainer;
