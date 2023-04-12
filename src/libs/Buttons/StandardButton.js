import { Button } from "@mui/material";
import React from "react";

const StandardButton = ({
  bgcolor,
  hoverColor,
  text,
  px,
  py,
  mx,
  my,
  mt,
  ml,
  w,
  h,
  color,
  fontWeight,
  fontSize,
  varient,
  borderRadius,
  mr,
  sx,
  onClick,
  colorHover,
  disabled,
}) => {
  return (
    <Button
      variant={varient}
      sx={{
        mx: mx,
        my: my,
        px: px,
        py: py,
        mt: mt,
        mr: mr,
        ml: ml,
        width: w,
        height: h,
        bgcolor: bgcolor,
        color: color,
        borderRadius: borderRadius ?? 1,
        fontSize: fontSize ?? ".8rem",
        fontWeight: fontWeight,
        textTransform: "capitalize",
        ":hover": {
          bgcolor: hoverColor,
          color: colorHover,
        },
        ...sx,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default StandardButton;
