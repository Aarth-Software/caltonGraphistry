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
      <img src={litDigBigLogo} style={{ width: "50rem" }} alt="logo" />
      <Box>
        <StandardButton
          text="Contact us"
          px={4}
          py={1.5}
          varient="outlined"
          mr={5}
          color={theme.palette.secondary.main}
          onClick={() => navigate("/contact")}
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
