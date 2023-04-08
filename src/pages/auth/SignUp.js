import React from "react";
import styled from "@emotion/styled";
// import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";

import SignUpComponent from "../../components/auth/SignUp";
import Logo from "../../asserts/Logo";
import { withTheme } from "@emotion/react";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";

// const Brand = styled(Logo)`
//   fill: ${(props) => props.theme.palette.primary.main};
//   width: 64px;
//   height: 64px;
//   margin-bottom: 32px;
// `;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};
  width: 700px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
  zoom: 0.8;
`;

function SignUp({ theme }) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [inviteToken, setInviteToken] = React.useState(null);
  const [activeLink, setActiveLink] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { isAuthenticated, isInitialized, checkInvitationDoc } = useAuth();
  React.useEffect(() => {
    if (isInitialized) {
      setLoading(false);
    }
  }, [isInitialized]);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/query");
    }
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    const token = queryParams.get("token");
    if (!email && !token) {
      navigate("/auth");
    }
    setInviteToken(token);
    setEmail(email);
    if (email && token) {
      checkInvitationDoc(setActiveLink, token);
    }
  }, [inviteToken, checkInvitationDoc, navigate]);

  if (activeLink === null) {
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!activeLink && email && inviteToken) {
    return <h1>link has expired</h1>;
  }
  return (
    <React.Fragment>
      <Wrapper>
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
          sx={{ fontSize: 14.2 }}
          component="p"
          variant="body1"
          align="left"
        >
          Start creating the best possible user experience for you customers
        </Typography>

        <SignUpComponent
          email={email}
          inviteToken={inviteToken}
          activeLink={activeLink}
        />
        {/* <Button
          sx={{
            mt: 1,
            fontSize: 14.2,
            color: theme.palette.secondary.main,
            fontWeight: 600,
          }}
          component={Link}
          to="/auth/sign-in"
          fullWidth
        >
          Alredy have an account sign in
        </Button> */}
      </Wrapper>
    </React.Fragment>
  );
}

export default withTheme(SignUp);
