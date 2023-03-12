import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Paper, Typography } from "@mui/material";

import ResetPasswordComponent from "../../components/auth/ResetPassword";
import Logo from "../../asserts/Logo";

// const Brand = styled(Logo)`
//   fill: ${(props) => props.theme.palette.primary.main};
//   width: 64px;
//   height: 64px;
//   margin-bottom: 32px;
// `;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function ResetPassword() {
  return (
    <React.Fragment>
      {/* <Brand /> */}
      <Logo size="18rem" mb="2rem" />
      <Wrapper>
        <Helmet title="Reset Password" />

        <Typography
          sx={{ mb: 2 }}
          component="h1"
          variant="h2"
          align="left"
          gutterBottom
        >
          Reset Password
        </Typography>
        <Typography
          sx={{ fontSize: "1rem" }}
          component="h2"
          variant="body1"
          align="left"
        >
          Enter your email to reset your password
        </Typography>

        <ResetPasswordComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default ResetPassword;
