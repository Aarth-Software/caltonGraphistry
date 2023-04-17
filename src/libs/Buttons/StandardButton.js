import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";

const CustomButton = styled(Button)`
  height: 30px;
  width: 80px;
  font-weight: 600;
  ${({ theme }) => theme.breakpoints.up("xxl")} {
    height: 36px;
    width: 100px;
    border-radius: 5px;
  }
  ${({ theme }) => theme.breakpoints.only("xl")} {
    height: 30px;
    width: 80px;
    border-radius: 4px;
  }
  ${({ theme }) => theme.breakpoints.only("lg")} {
    height: 28px;
    width: 73px;
    border-radius: 4px;
  }
  ${({ theme }) => theme.breakpoints.only("md")} {
    height: 27px;
    width: 72px;
    border-radius: 3.7px;
  }
  ${({ theme }) => theme.breakpoints.only("sm")} {
    height: 23px;
    width: 40px;
    border-radius: 3.3px;
  }
  ${({ theme }) => theme.breakpoints.only("xs")} {
    height: 30px;
    width: 80px;
    border-radius: 3px;
  }
`;

const StandardButton = ({
  text,
  onClick,
  disabled,
  varient,
  mx,
  my,
  px,
  py,
  mt,
  mr,
  ml,
  bgcolor,
  sx,
  hoverColor,
  colorHover,
  color,
}) => {
  return (
    <CustomButton
      sx={{
        mx: mx,
        my: my,
        px: px,
        py: py,
        mt: mt,
        mr: mr,
        ml: ml,
        color: color,
        bgcolor: bgcolor,
        textTransform: "capitalize",
        ":hover": {
          bgcolor: hoverColor,
          color: colorHover,
        },
        ...sx,
      }}
      disabled={disabled}
      onClick={onClick}
      variant={varient}
    >
      {text}
    </CustomButton>
  );
};

export default StandardButton;
