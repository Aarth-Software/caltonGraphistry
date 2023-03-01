import { Box } from "@mui/system";
import React from "react";
import AppendFilter from "./AppendFilter";
import FilterSet from "./FilterSet";

const FiltersComponent = (props) => {
  const { icon } = props;
  const [openFilter, setOpenFilter] = React.useState(false);
  const [filterArray, setFilterArray] = React.useState([0, 1, 2]);
  const appendFilterPattern = () => {
    setFilterArray([...filterArray, filterArray[filterArray.length - 1] + 1]);
  };

  return (
    <>
      <Box>
        <Box
          onClick={() => setOpenFilter((p) => !p)}
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            mt: 0.6,
            boxShadow: openFilter ? "0px .6px 3px rgba(0, 0, 0, 0.06)" : "",
            bgcolor: openFilter ? "white" : "white",
            pt: 0.3,
            pb: 2,
            px: 2,
          }}
        >
          <img src={icon} alt={"filter"} />
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
              boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)",
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
      </Box>
    </>
  );
};

export default FiltersComponent;
