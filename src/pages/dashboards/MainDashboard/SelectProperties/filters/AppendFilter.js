import { withTheme } from "@emotion/react";
import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../../../../../libs/Buttons/StandardButton";
import useStateContextHook from "../../../../../libs/StateProvider/useStateContextHook";
import { useSelector } from "react-redux";

const AppendFilter = ({ theme, appendFilterElement, getApplyFilters }) => {
  const { nodeState } = useStateContextHook();
  const { filterArray } = useSelector((state) => state.filters);
  const { fromYear, toYear } = nodeState;
  const disableButton =
    filterArray.some((eg) => eg.autoCompleteValue) ||
    fromYear.some((eg) => eg) ||
    toYear.some((eg) => eg);
  return (
    <>
      <Box
        sx={{
          //   bgcolor: "gray",
          height: "2rem",
          position: "relative",
          bottom: 0,
          // width: "calc(100% - 1.3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "3rem",
          marginBottom: "1rem",
        }}
      >
        <Box
          onClick={appendFilterElement}
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 600,
            fontSize: "1rem",
            ml: "3.3rem",
            cursor: "pointer",
          }}
        >
          + Add
        </Box>
        <StandardButton
          text="Apply"
          varient="contained"
          px={5.8}
          mt={0.8}
          mr={1.5}
          py={1.4}
          fontSize="1rem"
          fontWeight={600}
          bgcolor={theme.palette.secondary.main}
          disabled={!disableButton || !!nodeState?.nodeA?.disableDropDown}
          onClick={getApplyFilters}
        />
      </Box>
    </>
  );
};

export default withTheme(AppendFilter);
