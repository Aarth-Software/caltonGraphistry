import { Box } from "@mui/material";
import React from "react";

import { inputAndSelectPlaceContainer } from "../../../../../libs/JSS/Jss";
import AffiliationSelectBox from "./AffiliationSelectBox";

const StandardAffiliationBar = ({
  onselect,
  sx,
  nodeProp,
  name,
  change,
  unUsed,
  options,
}) => {
  const { value, inputValue, disableInput, disableDropDown, error } = nodeProp;
  // console.log(disableInput);

  return (
    <Box
      sx={{
        ...inputAndSelectPlaceContainer,
        ...sx,
        border:
          error && !unUsed ? ".00005rem solid red" : ".005rem solid #DBDCDF",
      }}
    >
      <AffiliationSelectBox
        value={!value ? "" : value}
        name={name}
        onselect={onselect}
        dropdownDesable={!!disableDropDown}
        options={options}
      />
      <input
        placeholder={
          unUsed || disableInput
            ? "Disable"
            : error && !unUsed
            ? "fill * fileds"
            : "keyword"
        }
        value={!inputValue ? "" : inputValue}
        onChange={change}
        name={name}
        variant="standard"
        sx={{
          input: { color: "red" },
        }}
        disabled={!!unUsed || !!disableInput}
        required={!!unUsed || !!disableInput ? false : true}
        className={`disabledInputClass ${
          (!!unUsed || !!disableInput) && "activeInput"
        } ${error && !unUsed && "changePlaceHolderColor"}`}
      />
    </Box>
  );
};

export default StandardAffiliationBar;
