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

export default function FilterSelectBox() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <CssTextField
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ borderRadius: "0px", height: "2rem" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </CssTextField>
      </FormControl>
    </div>
  );
}
