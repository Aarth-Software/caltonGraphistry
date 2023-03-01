import Keycloak from "keycloak-js";
const keycloakURL = process.env.REACT_APP_KEYCLOAK_BASE_URL;
const keycloakREALM = process.env.REACT_APP_KEYCLOAK_REALM;
const keycloakCLIENTID = process.env.REACT_APP_KEYCLOAK_CLIENTID;

const keycloak = new Keycloak({
  url: keycloakURL,
  realm: keycloakREALM,
  clientId: keycloakCLIENTID,
});
export default keycloak;
