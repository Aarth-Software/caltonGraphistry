import { Box, Typography } from "@mui/material";
import React from "react";
import SelectButtons from "./SelectButtons";

const SelectPatternContainer = () => {
  return (
    <>
      <Box
        sx={{
          height: "8rem",
          width: "15rem",
          bgcolor: "#FFFFFF",
          borderRadius: "15px",
          boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02);",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            height: 1 / 8,
            mt: 0.5,
            px: 2,
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontWeight: 600,
              color: "#259DF8",
              fontSize: ".8rem",
            }}
          >
            1. Select relationship
          </Typography>
        </Box>
        <SelectButtons />
      </Box>
    </>
  );
};

export default SelectPatternContainer;
