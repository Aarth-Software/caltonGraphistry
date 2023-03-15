import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import "../../../../../App.css";
const CssTextField = styled(Select)({
  ".MuiSvgIcon-root": {
    color: "#666666",
    // paddingLeft: "1rem",
  },
  ".MuiSelect-standard": {
    color: "#666666",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "gray",
    cursor: "not-allowed",
  },
  "& .MuiSvgIcon-root.Mui-disabled": {
    color: "gray",
  },
});

const AffiliationSelectBox = ({
  value,
  name,
  onselect,
  dropdownDesable,
  options,
}) => {
  const DropDownContainer = styled("div")({
    position: "absolute",
    top: "-.4rem",
    right: ".5rem",
    backgroundColor: "#fffff",
  });
  const getOptions = !options ? ["No options"] : options;

  const dropdownValues = getOptions?.map((e, i) => (
    <MenuItem sx={{ fontSize: ".9rem" }} key={e || i} value={e}>
      {e}
    </MenuItem>
  ));

  return (
    <DropDownContainer>
      <FormControl
        sx={{ minWidth: "6rem", height: "1rem", bgcolor: "white" }}
        disabled={dropdownDesable}
        required={true}
      >
        <CssTextField
          value={value}
          onChange={onselect}
          name={name}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          variant="standard"
          disableUnderline
          sx={{
            height: "1rem",
            borderRadius: 1,
            bgcolor: "#fffff",
            outline: "none",
            padding: "0rem",
            // bgcolor: "green",
            paddingRight: "1.5rem",
            fontSize: ".8rem",
          }}
        >
          <MenuItem value="" sx={{ fontSize: ".9rem" }}>
            Choose *
          </MenuItem>
          {dropdownValues}
        </CssTextField>
      </FormControl>
    </DropDownContainer>
  );
};
export default AffiliationSelectBox;
