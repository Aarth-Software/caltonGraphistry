import { Box } from "@mui/system";
import React from "react";
import AppendFilter from "./AppendFilter";
import FilterSet from "./FilterSet";
import { MdOutlineFilterList } from "react-icons/md";

const FiltersComponent = (props) => {
  const { icon } = props;
  const [openFilter, setOpenFilter] = React.useState(false);
  const [filterArray, setFilterArray] = React.useState([0, 1, 2]);
  const appendFilterPattern = () => {
    setFilterArray([...filterArray, filterArray[filterArray.length - 1] + 1]);
  };

  return (
    <>
      <Box
        onClick={() => setOpenFilter((p) => !p)}
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
        }}
      >
        {/* <img style={{ width: "2rem" }} src={icon} alt={"filter"} /> */}
        <MdOutlineFilterList
          size="1.7rem"
          color={openFilter ? "#e57373" : "black"}
        />
      </Box>
      {openFilter && (
        <Box
          sx={{
            position: "absolute",

            height: "auto",
            width: "45rem",
            bgcolor: "white",
            right: "-2rem",
            top: "2.3rem",
            boxShadow:
              "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
            p: 2,
          }}
        >
          <FilterSet
            filterArray={filterArray}
            setFilterArray={setFilterArray}
          />
          <AppendFilter appendFilterElement={appendFilterPattern} />
        </Box>
      )}
    </>
  );
};

export default FiltersComponent;
