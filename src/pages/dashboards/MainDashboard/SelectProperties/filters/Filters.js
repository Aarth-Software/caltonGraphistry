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
import styled from "@emotion/styled";
import { Badge } from "@mui/material";

const FiltersComponent = (props) => {
  const { fetchFiltersOnce, filterLoading, queryFilters } = useSelector(
    (state) => state.query
  );
  const { filterOptions, openFilter } = useSelector((s) => s.filters);
  const { setNodeState, nodeState } = useStateContextHook();
  const { filterArray } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (fetchFiltersOnce) {
      dispatch(getFilterOptions());
      dispatch(setFetchFiltersOnce(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(nodeState);

  const getBadgeCount = () => {
    const count = filterArray.filter((eg) => eg.value).length;
    return count;
  };

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

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: "2rem",
      top: ".5rem",
      border: `.05rem solid ${theme.palette.background.main}`,
      padding: "0 .1rem",
      minWidth: "1.5rem",
      height: "1.5rem",
      borderRadius: "50%",
      background: `${theme.palette.background.main}`,
    },
  }));

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
        <StyledBadge
          invisible={openFilter}
          badgeContent={getBadgeCount()}
          color="secondary"
        >
          <MdOutlineFilterList
            size="1.9rem"
            color={openFilter ? "#f16067" : "black"}
          />
        </StyledBadge>
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
