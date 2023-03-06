import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../libs/Buttons/StandardButton";
import { litDigBigLogo } from "../asserts/index";
import { Navigate, useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { withTheme } from "@emotion/react";
import Loader from "../components/Loader";
const AuthLanding = ({ theme }) => {
  const { keycloak, initialized } = useKeycloak();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  console.log(initialized);

  React.useEffect(() => {
    if (initialized) {
      setLoading(false);
    }
  }, [initialized]);

  const navigateToLogin = async () => {
    await keycloak.login();
    console.log(keycloak.idToken);
  };

  if (loading) {
    return <Loader />;
  }

  if (keycloak.authenticated) {
    return <Navigate to={"/generateQuery"} />;
  }
  return (
    <>
      <img src={litDigBigLogo} alt="logo" />
      <Box>
        <StandardButton
          text="Contact us"
          px={2}
          py={2}
          varient="outlined"
          mr={5}
          color={theme.palette.text.primary}
          onClick={() => navigate("/contact")}
        />
        <StandardButton
          text="Sign in"
          px={2}
          py={2}
          varient="standard"
          // bgcolor={"#F96167"}
          mx={3}
          onClick={navigateToLogin}
          color={theme.palette.text.primary}
          bgcolor={theme.palette.secondary.main}
        />
      </Box>
    </>
  );
};

export default withTheme(AuthLanding);
