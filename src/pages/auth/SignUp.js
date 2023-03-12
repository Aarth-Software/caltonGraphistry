import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";

import SignUpComponent from "../../components/auth/SignUp";
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

function SignUp() {
  return (
    <React.Fragment>
      {/* <Brand /> */}
      <Logo size="18rem" mb="2rem" />
      <Wrapper>
        <Helmet title="Sign Up" />

        <Typography
          sx={{ mb: 2 }}
          component="h1"
          variant="h2"
          align="left"
          gutterBottom
        >
          Sign up
        </Typography>
        <Typography
          sx={{ fontSize: "1rem" }}
          component="h2"
          variant="body1"
          align="left"
        >
          Start creating the best possible user experience for you customers
        </Typography>

        <SignUpComponent />
        <Button
          sx={{ mt: 1 }}
          component={Link}
          to="/auth/sign-in"
          fullWidth
          color="primary"
        >
          Alredy have an account sign in
        </Button>
      </Wrapper>
    </React.Fragment>
  );
}

export default SignUp;
