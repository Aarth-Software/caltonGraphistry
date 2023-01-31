import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import "../../../../../App.css";
const CssTextField = styled(Select)({
  ".MuiSvgIcon-root": {
    color: "#e86a6a",
  },
  ".MuiSelect-standard": {
    color: "#e86a6a",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "gray",
    cursor: "not-allowed",
  },
  "& .MuiSvgIcon-root.Mui-disabled": {
    color: "gray",
  },
});

const AffiliationSelectBox = ({ value, name, onselect, dropdownDesable }) => {
  const DropDownContainer = styled("div")({
    position: "absolute",
    top: "-.4rem",
    right: ".5rem",
    backgroundColor: "#fffff",
  });

  return (
    <DropDownContainer>
      <FormControl
        sx={{ minWidth: 100, height: "1rem", bgcolor: "white" }}
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
          }}
        >
          <MenuItem value="">Choose *</MenuItem>
          <MenuItem value={"Ten"}>Ten</MenuItem>
          <MenuItem value={"Twenty"}>Twenty</MenuItem>
          <MenuItem value={"Thirty"}>Thirty</MenuItem>
        </CssTextField>
      </FormControl>
    </DropDownContainer>
  );
};
export default AffiliationSelectBox;
