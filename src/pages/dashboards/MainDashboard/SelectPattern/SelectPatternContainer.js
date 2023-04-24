import React from "react";
import { Box, Typography } from "@mui/material";
import {
  flexSpaceBetween,
  patternContainerStyles,
} from "../../../../libs/JSS/Jss";
import SelectButtons from "./SelectButtons";
import TooltipComp from "../../../../libs/Tooltip/Tooltip";
import { useSelector } from "react-redux";
import { getInfoContent } from "../../../../libs/Switches/SelectionSwitches";
import { Stack } from "@mui/system";
import styled from "@emotion/styled";

const TootipRow = styled(Stack)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const TootipColumn = styled(Stack)`
  display: flex;
  align-items: center;
  justify-content: center;
  flkex-direction: column;
`;
const SelectPatternContainer = React.memo((props) => {
  const { btnArray, activePattern, setActivePattern } = props;
  const { pattern } = useSelector((s) => s.query);
  return (
    <Box sx={{ ...patternContainerStyles }}>
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
          message={
            <>
              <TootipColumn>
                <TootipRow>
                  {getInfoContent(
                    pattern.selection_type || undefined
                  ).icons.map((eg, i) => (
                    <img
                      key={i}
                      style={{ width: "3rem" }}
                      src={eg}
                      alt="icon"
                    />
                  ))}
                </TootipRow>
                <p>
                  {getInfoContent(pattern.selection_type || undefined).info}
                </p>
              </TootipColumn>
            </>
          }
          top=".5rem"
        />
      </div>
      <SelectButtons
        btnArray={btnArray}
        activePattern={activePattern}
        setActivePattern={setActivePattern}
      />
    </Box>
  );
});

export default SelectPatternContainer;
