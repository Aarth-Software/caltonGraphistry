import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
// import { Box } from "@mui/system";
import React from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { flexCenter, flexItemCenterStart } from "../../../../libs/JSS/Jss";
import StandardAffiliationBar from "./Affiliation/StandardAffiliationBar";

const SelectPropertiesContainer = () => {
  const Line = styled("span")({
    flexGrow: 1,
    height: ".1rem",
    background: "#E2E8F0",
    width: "auto",
    postion: "relative",
    ...flexCenter,
    justifyContent: "flex-end",
  });
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 1 / 2,
          ...flexCenter,
          // bgcolor: "blue",
        }}
      >
        <StandardAffiliationBar
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              height: "2.5rem",
              width: ".1rem",
              bgcolor: "#E2E8F0",
              top: "100%",
              left: "50%",
              position: "absolute",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: "95%",
          height: 1 / 2,
          // bgcolor: "red",
          ...flexItemCenterStart,
          px: 1,
        }}
      >
        <StandardAffiliationBar />
        <Line>
          <ArrowForwardIcon
            sx={{
              fontSize: "medium",
              bgcolor: "#FFFFFF",
              p: 0,
              color: "#e5eaf1",
            }}
          />
        </Line>
        <StandardAffiliationBar />
      </Box>
    </>
  );
};

export default SelectPropertiesContainer;
