import React from "react";
import { Box, Typography } from "@mui/material";
import {
  flexSpaceBetween,
  patternContainerStyles,
} from "../../../../libs/JSS/Jss";
import SelectButtons from "./SelectButtons";
import TooltipComp from "../../../../libs/Tooltip/Tooltip";
import info from "../../../../asserts/info.svg";

// const Card = styled(Box)``;
const SelectPatternContainer = React.memo((props) => {
  const { btnArray, activePattern, setActivePattern, getPatternChange } = props;

  return (
    <Box sx={patternContainerStyles}>
      <div style={{ width: "100%", ...flexSpaceBetween }}>
        <Typography
          varient="p"
          sx={{
            mt: 1,
            color: "#259DF8",
            fontSize: ".9rem",
            fontWeight: "bolder",
          }}
        >
          1. Select relationship
        </Typography>
        <TooltipComp
          className="no-padding-icon-button"
          size="1rem"
          icon={info}
          message={"this is selected pattern info"}
        />
      </div>
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
