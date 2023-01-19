import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import React from "react";
import StandardButton from "../../../../../libs/Buttons/StandardButton";

const StandardAffiliationBar = ({ sx }) => {
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
      <StandardButton
        bgcolor="#FFFFFF"
        text="affiliations"
        px={3}
        py={1}
        color="#e86a6a"
        sx={{ border: ".05rem solid #e86a6a" }}
        fontSize=".7rem"
        fontWeight={600}
        borderRadius={1}
      />
    </Box>
  );
};

export default StandardAffiliationBar;
