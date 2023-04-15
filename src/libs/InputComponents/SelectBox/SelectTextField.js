import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectTextField = ({
  type,
  name,
  label,
  value,
  error,
  onBlur,
  getValue,
  setFieldValue,
}) => {
  const option = [
    "Faculty",
    "Student",
    "Researcher",
    "Practitioner",
    "Management",
    "Administration",
  ];
  return (
    <FormControl sx={{ m: 0, mt: 2, mr: 2, p: 0 }} fullWidth>
      <InputLabel error={error}>{label}</InputLabel>
      <Select
        sx={{ height: "55px", pl: 2 }}
        value={value}
        name={name}
        error={error}
        label={label}
        onChange={(e) => {
          console.log(e.target.value);
          setFieldValue(name, e.target.value); // set the formik value when an option is selected
          getValue(e);
        }}
        onBlur={onBlur}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {option.map((eg, i) => (
          <MenuItem value={eg} key={i}>
            {eg}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectTextField;
