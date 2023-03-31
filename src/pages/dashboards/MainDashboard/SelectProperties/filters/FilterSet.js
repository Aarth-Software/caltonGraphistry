import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FilterSelectBox from "./FilterSelectBox";
import CloseIcon from "@mui/icons-material/Close";
import useStateContextHook from "../../../../../libs/StateProvider/useStateContextHook";
import { useDispatch } from "react-redux";
import { sendToHelperContainer } from "../../../../../redux/slices/querySlice";
import { useSelector } from "react-redux";
import AutoInputField from "../../../../../libs/InputComponents/AutoInputField";

const FilterSet = ({ filterArray, setFilterArray }) => {
  const { helperFilterContainer, queryFilters } = useSelector(
    (state) => state.query
  );
  const dispatch = useDispatch();
  const { nodeState, setNodeState } = useStateContextHook();
  const { fromYear, toYear, nodeA } = nodeState;
  const reqiredSelctions = Object.keys(queryFilters).filter(
    (el) => !["fromYear", "toYear"].includes(el)
  );
  const handleOptionChange = (idx) => {
    setFilterArray((prev) => {
      const don = prev.map((eg) => eg.value);
      return prev.map((set, i) =>
        i > idx
          ? {
              ...set,
              options: reqiredSelctions.filter((ed) => !don.includes(ed)),
            }
          : set
      );
    });
  };
  const handleChange = (event, setName, idx) => {
    const { value } = event.target;
    setFilterArray((prev) =>
      prev.map((set) => (set.name === setName ? { ...set, value: value } : set))
    );

    setFilterArray((prev) => {
      return prev.map((set, i) =>
        i > idx
          ? {
              ...set,
              value: "",
              autoCompleteValue: "",
            }
          : set
      );
    });
    handleOptionChange(idx);
  };

  const yearHandleHange = (e) => {
    const { name, value } = e.target;
    setNodeState((prev) => ({ ...prev, [name]: value }));
  };
  const addSet = (selectedOption) => {
    if (Object.keys(queryFilters).length - 2 === filterArray.length) {
      return;
    }
    console.log(selectedOption);
    const setName = `set${filterArray.length + 1}`;
    setFilterArray((prev) => [
      ...prev,
      {
        name: setName,
        value: "",
        options: reqiredSelctions.filter(
          (ed) => !prev.map((eg) => eg.value).includes(ed)
        ),
        autoCompleteValue: "",
      },
    ]);
  };
  const getSelect = (e, name) => {
    const { innerText } = e.target;
    setFilterArray((prev) =>
      prev.map((set) =>
        set.name === name ? { ...set, autoCompleteValue: innerText } : set
      )
    );
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
            value={fromYear}
            handleChange={yearHandleHange}
            disabled={!!nodeA?.disableDropDown}
            options={queryFilters?.fromYear}
          />
          <FilterSelectBox
            name="toYear"
            value={toYear}
            handleChange={yearHandleHange}
            disabled={!!nodeA?.disableDropDown}
            options={queryFilters?.toYear}
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
            }}
            key={index}
          >
            <CloseIcon
              onClick={() => {
                if (filterArray.length !== 1) {
                  setFilterArray(filterArray.filter((el, i) => el !== eg));
                }
              }}
              sx={{ px: 0, width: "3rem", color: "gray" }}
            />
            <FilterSelectBox
              name={eg.name}
              value={eg.value}
              options={eg.options}
              handleChange={(event) => handleChange(event, eg.name, index)}
              helperFilterContainer={helperFilterContainer}
            />
            {/* <input
              style={{
                width: "99%",
                height: "2rem",
                borderRadius: "0px",
                border: ".02rem solid gray",
                outline: "none",
                marginLeft: ".5rem",
              }}
              type="text"
            /> */}
            <AutoInputField
              selectedValue={eg.autoCompleteValue}
              options={queryFilters[eg.value]}
              getSelect={(e) => getSelect(e, eg.name)}
            />
          </Box>
        ))}
        <Button onClick={addSet}>AddBaby</Button>
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
