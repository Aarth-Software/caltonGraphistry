import { useContext } from "react";

// import { AuthContext } from "../contexts/JWTContext";
import { AuthContext } from "../contexts/FirebaseAuthContext";
// import { AuthContext } from "../contexts/Auth0Context";
// import { AuthContext } from "../contexts/CognitoContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  console.log(context);
  if (!context)
    throw new Error("AuthContext must be placed within AuthProvider");

  return context;
};

export default useAuth;
