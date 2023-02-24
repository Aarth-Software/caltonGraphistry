import { Box } from "@mui/system";
import React from "react";
import FilterSet from "./FilterSet";

const FiltersComponent = (props) => {
  const { icon } = props;
  // const [openFilter, setOpenFilter] = React.useState(false);

  return (
    <>
      <Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            mt: 0.6,
            boxShadow: false ? "0px .6px 3px rgba(0, 0, 0, 0.06)" : "",
            bgcolor: false ? "white" : "white",
            pt: 0.3,
            pb: 2,
            px: 2,
          }}
        >
          <img
            // onClick={() => setOpenFilter((p) => !p)}
            src={icon}
            alt={"filter"}
          />
        </Box>
        {false && (
          <Box
            sx={{
              position: "absolute",
              height: "15rem",
              width: "25rem",
              bgcolor: "white",
              right: "-2rem",
              top: "2.3rem",
              boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)",
              p: 2,
            }}
          >
            <FilterSet />
          </Box>
        )}
      </Box>
    </>
  );
};

export default FiltersComponent;
