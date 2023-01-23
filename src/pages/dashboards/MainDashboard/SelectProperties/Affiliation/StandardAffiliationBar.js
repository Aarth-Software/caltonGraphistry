import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import StandardButton from "../../../../../libs/Buttons/StandardButton";
import AffiliationSelectBox from "./AffiliationSelectBox";
const AffiliateInput = styled("input")({
  height: "1.6rem",
  width: "15rem",
  border: "none",
  outline: "none",
  paddingLeft: ".7rem",
  "&::placeholder": {
    fontSize: ".7rem",
  },
  "&:disabled": {
    background: "white",
    cursor: "not-allowed",
  },
});
const AffiliationDropDown = styled(StandardButton)`
  border: 0.005rem solid ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.secondary.main};
`;

const StandardAffiliationBar = ({
  inputValue,
  onselect,
  sx,
  nodeProp,
  name,
  change,
}) => {
  const { disabled, value } = nodeProp;

  return (
    <Box
      sx={{
        border: ".005rem solid #DBDCDF",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: "2.2rem",
        ...sx,
      }}
    >
      <AffiliationSelectBox value={value} onselect={onselect} />
      <AffiliateInput
        placeholder="Keyword"
        value={inputValue}
        onChange={change}
        name={name}
        variant="standard"
        sx={{ input: { color: "red" } }}
        disabled={disabled}
      />
    </Box>
  );
};

export default StandardAffiliationBar;
