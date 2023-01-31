import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";
import StandardButton from "../../../../../libs/Buttons/StandardButton";
import {
  actualInputStyles,
  inputAndSelectPlaceContainer,
} from "../../../../../libs/JSS/Jss";
import AffiliationSelectBox from "./AffiliationSelectBox";
const AffiliateInput = styled("input")(actualInputStyles);

const AffiliationDropDown = styled(StandardButton)`
  border: 0.005rem solid ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.secondary.main};
`;

const StandardAffiliationBar = ({
  onselect,
  sx,
  nodeProp,
  name,
  change,
  unUsed,
}) => {
  const { value, inputValue, disableInput, disableDropDown, error } = nodeProp;
  // console.log(disableInput);

  return (
    <Box
      sx={{
        ...inputAndSelectPlaceContainer,
        ...sx,
        border: error ? ".00005rem solid red" : ".005rem solid #DBDCDF",
      }}
    >
      <AffiliationSelectBox
        value={!value ? "" : value}
        name={name}
        onselect={onselect}
        dropdownDesable={!!disableDropDown}
      />
      <input
        placeholder={!!unUsed || !!disableInput ? "Disable" : "Keyword *"}
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
        }`}
      />
    </Box>
  );
};

export default StandardAffiliationBar;
