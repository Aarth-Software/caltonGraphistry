import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";

import React from "react";
import StandardButton from "../../../libs/Buttons/StandardButton";
import GraphistryGraph from "./Graphistry/GraphistryGraph";

import SaveButtonsContainer from "./SaveBtnsContainer/SaveButtonsContainer";
import SelectButtons from "./SelectPattern/SelectButtons";
import SelectPropertiesContainer from "./SelectProperties/SelectPropertiesContainer";

import { rgba } from "polished";
import { css } from "@emotion/react";
const FallDashboard = () => {
  const illustrationCardStyle = (props) => css`
    background: ${rgba(props.theme.palette.primary.main, 0.125)};
    color: ${props.theme.palette.primary.main};
  `;
  const Card = styled(Box)``;
  const RunGraphButton = styled(StandardButton)`
    background: ${(props) => props.theme.palette.secondary.main};
  `;

  const Controls = {
    width: "100%",
    height: "9rem",
    // background: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  };
  const GraphistryContainer = styled(Box)({
    width: "100%",
    height: "100%",
    // background: "yellow",
  });
  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      <Box sx={Controls}>
        <Card
          sx={{
            flexGrow: 0,
            bgcolor: "#FFFFFF",
            height: "7.4rem",
            width: "14rem",
            borderRadius: 1.5,
            px: 2,
            boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Typography varient="p" sx={{ mt: 1, color: "#259DF8" }}>
            1. Select relationship
          </Typography>
          <SelectButtons />
        </Card>
        <Card
          sx={{
            flexGrow: 1,
            bgcolor: "#FFFFFF",
            height: "7.4rem",
            mx: 5,
            borderRadius: 1.5,
            px: 2,
            boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Typography
            varient="p"
            sx={{ mt: 1, position: "absolute", color: "#259DF8" }}
          >
            2. Select relationship
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "7.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "7.2rem",
                display: "flex",
                alignItems: "center",
                flexGraw: 1,
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <SelectPropertiesContainer />
            </Box>
            <Box
              sx={{
                width: "auto",
                height: "7.2rem",
                display: "flex",
                alignItems: "flex-end",
                flexGraw: 1,
                justifyContent: "center",
                flexDirection: "row",
                py: 2,
              }}
            >
              <RunGraphButton
                text="Graph"
                // bgcolor="#e86a6a"
                // hoverColor="#e86a6a"
                // color="#FFFFFF"
                varient="contained"
                px={6}
                mt={0.8}
                fontSize=".7rem"
                fontWeight={600}
              />
            </Box>
          </Box>
        </Card>
        <SaveButtonsContainer />
      </Box>
      <GraphistryContainer
        sx={{
          mt: 5,
          bgcolor: "#FFFFFF",
          boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)",
          borderRadius: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GraphistryGraph />
      </GraphistryContainer>
    </Stack>
  );
};

export default FallDashboard;
