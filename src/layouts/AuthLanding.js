import { Box, Stack } from "@mui/system";
import React from "react";
// import Button from "../libs/Buttons/Button";
import { litDigBigLogo } from "../asserts/index";
import { useNavigate } from "react-router-dom";
import { withTheme } from "@emotion/react";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { Button, Paper } from "@mui/material";
import styled from "@emotion/styled";

const Wrapper = styled(Paper)`
  zoom: 1;
  background: #f7f9fc;
`;
const AuthLanding = ({ theme }) => {
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, isInitialized } = useAuth();

  React.useEffect(() => {
    if (isInitialized) {
      setLoading(false);
    }
  }, [isInitialized]);

  const navigateToLogin = async () => {
    navigate("sign-in");
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/query");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <img src={litDigBigLogo} style={{ width: "50rem" }} alt="logo" />
      <Wrapper>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"center"}
          spacing={5}
        >
          <Button
            text="Contact us"
            // px={2.6}
            // py={1.3}
            variant="outlined"
            mr={5}
            // color={theme.palette.secondary.main}
            onClick={() => navigate("/contact-us")}
            fontWeight={600}
            // w={"9em"}
            // h="3em"
            sx={{ width: "90px", height: "28px", fontSize: "10px" }}
          >
            Contact us
          </Button>
          <Button
            text="Sign in"
            // px={6}
            // py={1.4}
            variant="standard"
            // bgcolor={theme.palette.secondary.main}
            // mx={3}
            onClick={navigateToLogin}
            color={"white"}
            // bgcolor={theme.palette.secondary.main}
            colorHover="black"
            fontWeight={600}
            sx={{
              width: "90px",
              height: "28px",
              fontSize: "10px",
              bgcolor: theme.palette.secondary.main,
              color: "white",
              "&:hover": {
                bgcolor: theme.palette.secondary.main,
              },
            }}
          >
            Sign in
          </Button>
        </Stack>
      </Wrapper>
    </>
  );
};

export default withTheme(AuthLanding);
