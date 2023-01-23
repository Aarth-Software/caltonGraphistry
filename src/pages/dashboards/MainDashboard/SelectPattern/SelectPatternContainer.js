import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";
import SelectButtons from "./SelectButtons";
const Card = styled(Box)``;
const SelectPatternContainer = ({
  btnArray,
  activePattern,
  setActivePattern,
  getPatternChange,
}) => {
  return (
    <>
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
        <SelectButtons
          btnArray={btnArray}
          activePattern={activePattern}
          setActivePattern={setActivePattern}
          getPatternChange={getPatternChange}
        />
      </Card>
    </>
  );
};

export default SelectPatternContainer;
