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
  const { value, inputValue, disableInput, disableDropDown } = nodeProp;
  // console.log(disableInput);
  return (
    <Box sx={{ ...inputAndSelectPlaceContainer, ...sx }}>
      <AffiliationSelectBox
        value={!value ? "" : value}
        name={name}
        onselect={onselect}
        dropdownDesable={!!unUsed || !!disableDropDown}
      />
      <AffiliateInput
        placeholder="Keyword"
        value={!inputValue ? "" : inputValue}
        onChange={change}
        name={name}
        variant="standard"
        sx={{ input: { color: "red" } }}
        disabled={!!unUsed || !!disableInput}
      />
    </Box>
  );
};

export default StandardAffiliationBar;
