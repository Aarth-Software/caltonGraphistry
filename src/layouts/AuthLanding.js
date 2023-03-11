import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../libs/Buttons/StandardButton";
import { litDigBigLogo } from "../asserts/index";
import { Navigate, useNavigate } from "react-router-dom";
import { withTheme } from "@emotion/react";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
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
      <Box>
        <StandardButton
          text="Sign up"
          px={4}
          py={1.5}
          varient="outlined"
          mr={5}
          color={theme.palette.secondary.main}
          onClick={() => navigate("sign-up")}
        />
        <StandardButton
          text="Sign in"
          px={7}
          py={1.7}
          varient="standard"
          // bgcolor={theme.palette.secondary.main}
          mx={3}
          onClick={navigateToLogin}
          color={"white"}
          bgcolor={theme.palette.secondary.main}
          colorHover="black"
        />
      </Box>
    </>
  );
};

export default withTheme(AuthLanding);
