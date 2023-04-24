import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FilterSelectBox from "./FilterSelectBox";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import useStateContextHook from "../../../../../libs/StateProvider/useStateContextHook";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../../../redux/slices/querySlice";
import { useSelector } from "react-redux";
import AutoInputField from "../../../../../libs/InputComponents/AutoInputField";
import {
  applyFilters,
  getSelectAutoInput,
  selectBoxHandleChange,
  setFilterArray,
} from "../../../../../redux/slices/filterSlice";

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
    if (name === "fromYear") {
      const index = queryFilters.fromYear.indexOf(value);
      let toYearOptions = [];
      if (index !== queryFilters.fromYear.length - 1) {
        toYearOptions = initialYearOptions.endYear.filter((eg) => eg >= value);
      }
      setNodeState((prev) => ({
        ...prev,
        [name]: value === "" ? [] : [value],
        toYear: [],
      }));
      dispatch(
        setFilters({
          ...queryFilters,
          toYear: toYearOptions,
        })
      );
    } else {
      setNodeState((prev) => ({
        ...prev,
        [name]: value === "" ? [] : [value.toString()],
      }));
    }
  };

  const removeFilterSet = async (id) => {
    const updatedSets = filterArray.filter((el, i) => el !== id);
    dispatch(setFilterArray(updatedSets));
    dispatch(applyFilters(updatedSets, nodeState, setNodeState));
  };

  const resetSelectYear = () => {
    setNodeState((prev) => ({ ...prev, fromYear: [], toYear: [] }));
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
          // bgcolor: "green",
          position: "relative",
          top: "2rem",
          display: "block",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            // background: "yellow",
            width: "calc(100%)",
            // height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            py: 0.4,
            position: "relative",
            // left: "3rem",
          }}
        >
          <RestartAltIcon
            onClick={resetSelectYear}
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
            width={true}
          />
          <FilterSelectBox
            name="toYear"
            value={toYear}
            handleChange={yearHandleHange}
            disabled={!!nodeA?.disableDropDown}
            options={queryFilters?.toYear}
            placeholder={"To year"}
            showLabel={true}
            width={true}
          />
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
