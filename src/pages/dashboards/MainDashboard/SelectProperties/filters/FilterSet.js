import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FilterSelectBox from "./FilterSelectBox";
import CloseIcon from "@mui/icons-material/Close";
import useStateContextHook from "../../../../../libs/StateProvider/useStateContextHook";

const FilterSet = ({ filterArray, setFilterArray }) => {
  const { nodeState, setNodeState } = useStateContextHook();
  const { fromYear, toYear, publicationFilter } = nodeState;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNodeState({ ...nodeState, [name]: value });
  };
  console.log(nodeState);
  return (
    <>
      <Typography
        varient="p"
        sx={{
          position: "absolute",
          color: "#259DF8",
          fontSize: ".9rem",
          fontWeight: "bolder",
        }}
      >
        Filters
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 2rem)",
          // bgcolor: "red",
          position: "relative",
          top: "2rem",
          display: "block",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            // background: "yellow",
            width: "100%",
            // height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            py: 0.4,
          }}
        >
          <FilterSelectBox
            name="fromYear"
            value={fromYear}
            handleChange={handleChange}
          />
          <FilterSelectBox
            name="toYear"
            value={toYear}
            handleChange={handleChange}
          />
          <FilterSelectBox
            name="publicationFilter"
            value={publicationFilter}
            handleChange={handleChange}
          />
        </Box>
        {/* {filterArray.map((eg, i) => (
          <Box
            style={{
              // background: "yellow",
              width: "100%",
              // height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              py: 0.4,
            }}
            key={i}
          >
            <CloseIcon
              onClick={() => {
                if (filterArray.length !== 1) {
                  setFilterArray(filterArray.filter((el, i) => el !== eg));
                }
              }}
              sx={{ px: 0, width: "3rem", color: "gray" }}
            />
            <FilterSelectBox />
            <FilterSelectBox />
            <input
              style={{
                width: "99%",
                height: "2rem",
                borderRadius: "0px",
                border: ".02rem solid gray",
                outline: "none",
                marginLeft: ".5rem",
              }}
              // placeholder="keyword*"
              type="text"
            />
          </Box>
        ))} */}
      </Box>
    </>
  );
};

export default FilterSet;
