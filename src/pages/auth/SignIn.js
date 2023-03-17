import React from "react";
import styled from "@emotion/styled";
// import { Helmet } from "react-helmet-async";

import { Paper, Typography } from "@mui/material";
import SignInComponent from "../../components/auth/SignIn";
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
  zoom: 0.8;
`;

// const BigAvatar = styled(Avatar)`
//   width: 92px;
//   height: 92px;
//   text-align: center;
//   margin: 0 auto ${(props) => props.theme.spacing(5)};
// `;

function SignIn() {
  return (
    <>
      {/* <Brand /> */}
      {/* <Logo size="18rem" mb="2rem" /> */}
      {/* <Helmet title="Sign In" /> */}
      {/* <BigAvatar alt="Lucy" src="/static/img/avatars/avatar-1.jpg" /> */}
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
