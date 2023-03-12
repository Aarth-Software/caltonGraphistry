import React from "react";
import litdigLogo from "../asserts/litDigBigLogo.svg";
const Logo = (props) => {
  const { size, mb } = props;
  return (
    <img
      src={litdigLogo}
      style={{ width: size, marginBottom: mb }}
      alt="brand"
    />
  );
};

export default Logo;
