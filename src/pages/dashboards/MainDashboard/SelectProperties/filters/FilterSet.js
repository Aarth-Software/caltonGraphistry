import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FilterSelectBox from "./FilterSelectBox";
import CloseIcon from "@mui/icons-material/Close";
import useStateContextHook from "../../../../../libs/StateProvider/useStateContextHook";
import { useDispatch } from "react-redux";
import {
  sendToHelperContainer,
  setFilters,
} from "../../../../../redux/slices/querySlice";
import { useSelector } from "react-redux";
import AutoInputField from "../../../../../libs/InputComponents/AutoInputField";
import {
  addFilterSet,
  applyFilters,
  getSelectAutoInput,
  selectBoxHandleChange,
  setFilterArray,
} from "../../../../../redux/slices/filterSlice";
import styled from "@emotion/styled";

const YearsBox = styled(Box)`
  height: 2rem;
  width: 11.7em;
  border: 0.1rem solid rgb(203, 203, 203);
  border-radius: 0.2rem;
  padding-left: 0.5rem;
  font-size: 0.9rem;
  align-items: center;
  display: flex;
  color: black;
`;

const FilterSet = () => {
  const { helperFilterContainer, queryFilters, initialYearOptions } =
    useSelector((state) => state.query);
  const { filterArray } = useSelector((state) => state.filters);
  // console.log(filterArray);
  const dispatch = useDispatch();
  const { nodeState, setNodeState } = useStateContextHook();
  const { fromYear, toYear, nodeA } = nodeState;
  const reqiredSelctions = Object.keys(queryFilters).filter(
    (el) => !["fromYear", "toYear"].includes(el)
  );
  const yearHandleHange = (e) => {
    const { name, value } = e.target;
    if (!value) {
      return;
    }
    if (name === "fromYear") {
      const index = queryFilters.fromYear.indexOf(value);
      let toYearOptions = [];
      if (index !== queryFilters.fromYear.length - 1) {
        toYearOptions = initialYearOptions.endYear.filter((eg) => eg > value);
      }
      setNodeState((prev) => ({ ...prev, [name]: [value], toYear: "" }));
      dispatch(
        setFilters({
          ...queryFilters,
          toYear: toYearOptions,
        })
      );
    } else {
      setNodeState((prev) => ({ ...prev, [name]: [value] }));
    }
  };

  const removeFilterSet = async (id) => {
    if (filterArray.length !== 1) {
      const updatedSets = filterArray.filter((el, i) => el !== id);
      dispatch(setFilterArray(updatedSets));
      dispatch(applyFilters(updatedSets, nodeState, setNodeState));
    }
  };

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
            value={""}
            handleChange={yearHandleHange}
            disabled={true}
            options={queryFilters?.fromYear}
            showLabel={true}
            placeholder={"Years"}
            marginRight={true}
          />
          {/* <YearsBox>Years</YearsBox> */}

          <FilterSelectBox
            name="fromYear"
            value={fromYear}
            handleChange={yearHandleHange}
            disabled={!!nodeA?.disableDropDown}
            options={queryFilters?.fromYear}
            placeholder={"From year"}
            showLabel={true}
          />
          <FilterSelectBox
            name="toYear"
            value={toYear}
            handleChange={yearHandleHange}
            disabled={!!nodeA?.disableDropDown}
            options={queryFilters?.toYear}
            placeholder={"To year"}
            showLabel={true}
          />
          {/* <FilterSelectBox
            name="publicationFilter"
            value={publicationFilter}
            handleChange={handleChange}
          /> */}
        </Box>
        {filterArray.map((eg, index) => (
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              py: 0.4,
              px: 1,
              // background: "red",
            }}
            key={index}
          >
            <CloseIcon
              onClick={() =>
                !!nodeState?.nodeA?.disableDropDown ? null : removeFilterSet(eg)
              }
              sx={{
                px: 0,
                width: "3rem",
                color: "gray",
                cursor: !!nodeState?.nodeA?.disableDropDown
                  ? "not-allowed"
                  : "pointer",
              }}
            />
            <FilterSelectBox
              name={eg.name}
              value={eg.value}
              options={eg.options}
              handleChange={(event) =>
                dispatch(
                  selectBoxHandleChange(
                    event,
                    eg.name,
                    index,
                    filterArray,
                    reqiredSelctions
                  )
                )
              }
              helperFilterContainer={helperFilterContainer}
              disabled={!!nodeA?.disableDropDown}
            />
            <AutoInputField
              selectedValue={eg.autoCompleteValue}
              options={queryFilters[eg.value]}
              getSelect={(e) =>
                dispatch(getSelectAutoInput(e, eg.name, filterArray))
              }
              disabled={!!nodeA?.disableDropDown}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default FilterSet;

/* <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            py: 0.4,
          }}
        >
          <FilterSelectBox
            name="affiliationFilter"
            value={affiliationFilter}
            handleChange={handleChange}
            disabled={!!nodeA?.disableDropDown}
          />
          <FilterSelectBox
            name="publisherFilter"
            value={publisherFilter}
            handleChange={handleChange}
            disabled={!!nodeA?.disableDropDown}
          />
          <FilterSelectBox
            name="publicationFilter"
            value={publicationFilter}
            handleChange={handleChange}
            disabled={!!nodeA?.disableDropDown}
          />
        </Box> */
