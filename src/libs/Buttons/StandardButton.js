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
  color,
  fontWeight,
  fontSize,
  varient,
  borderRadius,
  mr,
  sx,
  onClick,
  colorHover,
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
    >
      {text}
    </Button>
  );
};

export default StandardButton;
