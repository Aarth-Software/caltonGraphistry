import * as React from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { countries } from "./data";
export default function CountrySelect({
  name,
  label,
  value,
  error,
  handleBlur,
  handleChange,
}) {
  const getSelectCountry = (e, newValue) => {
    handleChange(e);
    if (newValue !== null) {
      value.country = newValue.label;
    } else {
      value.country = "";
    }
  };

  return (
    <Autocomplete
      id="country-select-demo"
      // value={value.country}
      options={countries}
      fullWidth
      sx={{
        my: 2,
        mr: 2,
      }}
      autoHighlight
      onChange={getSelectCountry}
      onBlur={handleBlur}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            "& > img": { mr: 2, flexShrink: 0 },
            transform: "scale(0.8)",
          }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}){/* +{option.phone} */}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          error={error}
          name={name}
          value={value.country}
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
