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
  console.log(nodeState);
  return (
    <>
      <Box
        sx={{
          //   bgcolor: "gray",
          height: "2rem",
          position: "relative",
          bottom: 0,
          width: "calc(100% - 1.3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "3rem",
          marginBottom: "1rem",
        }}
      >
        <StandardButton
          onClick={appendFilterElement}
          text="+ Add"
          fontSize="1rem"
          fontWeight={600}
          px={5}
          color={theme.palette.secondary.main}
          varient="outlined"
          py={1.1}
          ml={3}
          disabled={!!nodeState?.nodeA?.disableDropDown}
        />
        {/* <StandardButton
          text="cancel"
          varient="outlined"
          px={4}
          mt={0.8}
          mr={2}
          py={".28em"}
          fontSize="1rem"
          fontWeight={600}
          bgcolor={theme.palette.secondary.main}
          onClick={() => setOpenFilter(false)}
        /> */}
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
          disabled={
            !!nodeState?.nodeA?.disableDropDown ||
            filterArray.some((eg, i) => !eg.value || !eg.autoCompleteValue) ||
            !fromYear.length ||
            !toYear.length
          }
          onClick={getApplyFilters}
        />
      </Box>
    </>
  );
};

export default withTheme(AppendFilter);
