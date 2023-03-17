import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { rgba } from "polished";

import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { addCommas } from "../../../libs/HigherOrderFunctions";

const illustrationCardStyle = (props) => css`
  ${props.illustration &&
  props.theme.palette.mode !== "dark" &&
  `
    background: ${rgba(props.theme.palette.primary.main, 0.125)};
    color: ${props.theme.palette.primary.main};
  `}
`;

const Card = styled(MuiCard)`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing(6)};

  ${illustrationCardStyle}
`;

const Typography = styled(MuiTypography)(spacing);

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;
const HeaderTitle = styled(Typography)`
  // color: ${(props) => props.theme.palette.secondary.main};
`;

const Stats = ({ title, amount, illustration, sx, color }) => {
  const commaAmount = addCommas(amount);
  return (
    <Card illustration={illustration} sx={{ pt: 0, pl: 0, ...sx }}>
      <CardContent>
        <HeaderTitle sx={{ color: color }} variant="h6" mb={4}>
          {title}
        </HeaderTitle>
        <Typography variant="h3" mb={3} sx={{ pb: 0 }}>
          <Box fontWeight="fontWeightRegular">
            {isNaN(amount) ? (
              <Typography
                sx={{ fontSize: 10 }}
                component="p"
                variant="body1"
                align="left"
              >
                No Data
              </Typography>
            ) : (
              commaAmount
            )}
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Stats;
