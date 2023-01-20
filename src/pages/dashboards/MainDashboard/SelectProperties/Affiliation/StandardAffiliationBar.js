import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import React from "react";
import StandardButton from "../../../../../libs/Buttons/StandardButton";
import AffiliationSelectBox from "./AffiliationSelectBox";

const StandardAffiliationBar = ({ sx }) => {
  const AffiliationDropDown = styled(StandardButton)`
    border: 0.005rem solid ${(props) => props.theme.palette.secondary.main};
    color: ${(props) => props.theme.palette.secondary.main};
  `;
  const AffiliateInput = styled("input")({
    height: "1.6rem",
    width: "auto",
    background: "#F8F9FA",
    border: "none",
    outline: "none",
    "&::placeholder": {
      fontSize: ".7rem",
    },
  });
  return (
    <Box
      sx={{
        border: ".005rem solid #E2E8F0",
        borderRadius: 1,
        bgcolor: "#F8F9FA",
        px: 1,
        py: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...sx,
      }}
    >
      <AffiliateInput placeholder="Keyword" />
      <AffiliationSelectBox />
      {/* <AffiliationDropDown
        bgcolor="#FFFFFF"
        text="affiliations"
        varient="outlined"
        px={3}
        py={1}
        // color="#e86a6a"
        // sx={{ border: ".05rem solid #e86a6a" }}
        fontSize=".7rem"
        fontWeight={600}
        borderRadius={1}
      /> */}
    </Box>
  );
};

export default StandardAffiliationBar;
