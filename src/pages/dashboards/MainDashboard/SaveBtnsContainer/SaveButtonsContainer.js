import { Box } from "@mui/material";
import React from "react";
import StandardButton from "../../../../libs/Buttons/StandardButton";
import { flexSpaceAround } from "../../../../libs/JSS/Jss";
import { rgba } from "polished";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
const SaveButtonsContainer = () => {
  const illustrationCardStyle = (props) => css`
    background: ${rgba(props.theme.palette.primary.main, 0.125)};
    color: ${props.theme.palette.primary.main};
  `;
  const Card = styled(Box)``;
  const Save = styled(StandardButton)`
    background-color: ${(props) => props.theme.palette.secondary.main};
  `;
  const SavedGraphBtn = styled(StandardButton)`
    background-color: ${(props) => props.theme.palette.secondary.main};
  `;
  return (
    <Card
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
      <SavedGraphBtn
        text="Saved graphs"
        bgcolor="none"
        hoverColor="none"
        // color="#e86a6a"
        mt={2}
        fontWeight={600}
        sx={{ textDecoration: "underline" }}
        fontSize=".7rem"
      />
      <Save
        text="Save"
        // bgcolor="#e86a6a"
        // hoverColor="#e86a6a"
        color="#FFFFFF"
        varient="contained"
        px={6}
        mt={0}
        fontSize=".7rem"
        fontWeight={600}
      />
    </Card>
  );
};

export default SaveButtonsContainer;
