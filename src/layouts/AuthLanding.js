import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../libs/Buttons/StandardButton";
import { litDigBigLogo } from "../asserts/index";
import { Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
const AuthLanding = () => {
  const { keycloak, initialized } = useKeycloak();
  const [loading, setLoading] = React.useState(true);

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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
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
          color="black"
          onClick={() => keycloak.logout()}
        />
        <StandardButton
          text="Sign in"
          px={2}
          py={2}
          varient="standard"
          bgcolor={"#F96167"}
          mx={3}
          onClick={navigateToLogin}
        />
      </Box>
    </>
  );
};

export default AuthLanding;
