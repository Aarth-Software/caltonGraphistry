import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../libs/Buttons/StandardButton";
import { litDigBigLogo } from "../asserts/index";
import { useNavigate } from "react-router-dom";
import { withTheme } from "@emotion/react";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { Paper } from "@mui/material";
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
      navigate("/generateQuery");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <img src={litDigBigLogo} style={{ width: "50rem" }} alt="logo" />
      <Wrapper>
        <Box>
          <StandardButton
            text="Sign up"
            px={5}
            py={1.3}
            varient="outlined"
            mr={5}
            color={theme.palette.secondary.main}
            onClick={() => navigate("sign-up")}
            fontSize={11}
            fontWeight={600}
          />
          <StandardButton
            text="Sign in"
            px={6}
            py={1.3}
            varient="standard"
            // bgcolor={theme.palette.secondary.main}
            mx={3}
            onClick={navigateToLogin}
            color={"white"}
            bgcolor={theme.palette.secondary.main}
            colorHover="black"
            fontSize={11}
            fontWeight={600}
          />
        </Box>
      </Wrapper>
    </>
  );
};

export default withTheme(AuthLanding);
