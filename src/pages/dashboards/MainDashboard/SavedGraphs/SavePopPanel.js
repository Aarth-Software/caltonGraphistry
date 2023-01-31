import styled from "@emotion/styled";
import { Card, TextField, Typography } from "@mui/material";
import React from "react";
import StandardButton from "../../../../libs/Buttons/StandardButton";
import CloseIcon from "@mui/icons-material/Close";
const SavePopContainer = styled("div")({
  background: "white",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexDirection: "column",
  color: "black",
});
const FlexItems = styled("div")({
  height: "3rem",
  width: "100%",
  //   background: "red",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  //   marginTop: "1rem",
});
const Items = styled("div")({
  height: "3rem",
  width: "96%",
  //   background: "green",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: ".8rem",
  margin: "auto auto",
});
const BtnFlex = styled("div")({
  height: "3rem",
  width: "100%",
  //   background: "green",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  //   marginTop: ".7rem",
});

const SavePopPanel = () => {
  return (
    <SavePopContainer>
      <FlexItems>
        <Typography
          varient="h3"
          sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Save
        </Typography>
        <CloseIcon sx={{ fontSize: "2rem" }} />
      </FlexItems>
      <Items>
        <TextField
          label="Size"
          id="standard-size-large"
          size="large"
          variant="standard"
          fullWidth
        />
      </Items>
      <BtnFlex>
        <StandardButton
          text="Cancel"
          varient="outlined"
          px={8}
          mt={0.8}
          mr={0.4}
          fontSize=".7rem"
          fontWeight={600}
        />
        <StandardButton
          text="Save"
          varient="contained"
          px={8}
          mt={0.8}
          mr={0.4}
          fontSize=".7rem"
          fontWeight={600}
        />
      </BtnFlex>
    </SavePopContainer>
  );
};

export default SavePopPanel;
