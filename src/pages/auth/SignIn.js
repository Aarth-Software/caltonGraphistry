import React from "react";
import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import SignInComponent from "../../components/auth/SignIn";

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
  zoom: 0.8;
`;

function SignIn() {
  return (
    <>
      <React.Fragment>
        <Wrapper>
          <Typography
            sx={{ mb: 2 }}
            component="h1"
            variant="h2"
            align="left"
            gutterBottom
          >
            Sign in
          </Typography>
          <Typography
            sx={{ fontSize: 14.2 }}
            component="h2"
            variant="body1"
            align="left"
          >
            Sign in to your account to continue
          </Typography>

          <SignInComponent />
        </Wrapper>
      </React.Fragment>
    </>
  );
}

export default SignIn;
