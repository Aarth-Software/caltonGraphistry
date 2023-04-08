import { Box } from "@mui/system";
import React from "react";
import AppendFilter from "./AppendFilter";
import FilterSet from "./FilterSet";
import { MdOutlineFilterList } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  getFilterOptions,
  setFetchFiltersOnce,
} from "../../../../../redux/slices/querySlice";
import { useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import useStateContextHook from "../../../../../libs/StateProvider/useStateContextHook";
import {
  addFilterSet,
  applyFilters,
  setOpenFilter,
} from "../../../../../redux/slices/filterSlice";

const FiltersComponent = (props) => {
  const { fetchFiltersOnce, filterLoading, queryFilters } = useSelector(
    (state) => state.query
  );
  const { filterOptions, openFilter } = useSelector((s) => s.filters);
  const { setNodeState, nodeState } = useStateContextHook();
  const { filterArray } = useSelector((state) => state.filters);
  // const [filterArray, setFilterArray] = React.useState([
  //   {
  //     name: "setOne",
  //     value: "",
  //     options: ["affiliationFilter", "publicationFilter", "publisherFilter"],
  //     autoCompleteValue: "",
  //   },
  // ]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (fetchFiltersOnce) {
      dispatch(getFilterOptions());
      dispatch(setFetchFiltersOnce(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appendFilterPattern = () => {
    dispatch(addFilterSet(queryFilters, filterArray, filterOptions));
  };
  const getApplyFilters = () => {
    dispatch(applyFilters(filterArray, nodeState, setNodeState));
    dispatch(setOpenFilter(false));
  };

  const filterHandle = () => {
    dispatch(setOpenFilter(!openFilter));
  };

  return (
    <>
      <Box
        onClick={filterHandle}
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          mt: 0.6,
          boxShadow: openFilter
            ? "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem"
            : "",
          bgcolor: openFilter ? "white" : "white",
          pt: 0.3,
          pb: 2,
          px: 2,
          position: "relative",
        }}
      >
        <MdOutlineFilterList
          size="1.9rem"
          color={openFilter ? "#f16067" : "black"}
        />
      </Box>
      {openFilter && (
        <Box
          sx={{
            position: "absolute",

            height: "auto",
            width: "38rem",
            bgcolor: "white",
            right: "-2rem",
            top: "2.3rem",
            boxShadow:
              "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
            p: 2,
            zIndex: "1500 !important",
          }}
        >
          {!filterLoading && (
            <>
              <FilterSet />
              <AppendFilter
                appendFilterElement={appendFilterPattern}
                getApplyFilters={getApplyFilters}
              />
            </>
          )}
          {filterLoading && <Loader />}
        </Box>
      )}
    </>
  );
};

export default FiltersComponent;
