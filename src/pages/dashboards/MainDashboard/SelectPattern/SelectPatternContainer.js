import React from "react";
import { Box, Typography } from "@mui/material";
import { patternContainerStyles } from "../../../../libs/JSS/Jss";
import SelectButtons from "./SelectButtons";
// const Card = styled(Box)``;
const SelectPatternContainer = React.memo((props) => {
  const { btnArray, activePattern, setActivePattern, getPatternChange } = props;
  console.log("pattern");
  return (
    <Box sx={patternContainerStyles}>
      <Typography
        varient="p"
        sx={{ mt: 1, color: "#259DF8", fontSize: ".9rem" }}
      >
        1. Select relationship
      </Typography>
      <SelectButtons
        btnArray={btnArray}
        activePattern={activePattern}
        setActivePattern={setActivePattern}
        getPatternChange={getPatternChange}
      />
    </Box>
  );
});

export default SelectPatternContainer;
