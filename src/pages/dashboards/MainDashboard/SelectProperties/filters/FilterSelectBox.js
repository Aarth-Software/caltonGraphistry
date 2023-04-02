import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";

const CssTextField = styled(Select)({
  ".MuiSvgIcon-root": {
    color: "#666666",
    // paddingLeft: "1rem",
  },
  ".MuiSelect-standard": {
    color: "#666666",
    borderRadius: "0",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "gray",
    cursor: "not-allowed",
  },
  "& .MuiSvgIcon-root.Mui-disabled": {
    color: "gray",
  },
});

export default function FilterSelectBox(props) {
  const {
    name,
    value = "",
    handleChange,
    disabled,
    options,
    helperFilterContainer,
  } = props;
  // console.log(name, value);
  const jsxOptions = options.map((rg, i) => (
    <MenuItem key={i} sx={{ fontSize: ".9rem" }} value={rg}>
      {rg}
    </MenuItem>
  ));

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: "14rem" }}>
        <CssTextField
          value={value}
          name={name}
          onChange={handleChange}
          disabled={disabled}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            borderRadius: ".2rem",
            height: "2rem",
            fontSize: ".9rem",
            // marginTop: ".1rem",
          }}
        >
          <MenuItem sx={{ fontSize: ".9rem" }} value="">
            choose
          </MenuItem>
          {jsxOptions}
        </CssTextField>
      </FormControl>
    </div>
  );
}
