import React from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { CacheProvider } from "@emotion/react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./i18n";
import createTheme from "./theme";
import routes from "./routes";

import useTheme from "./hooks/useTheme";
import { store } from "./redux/store";
import createEmotionCache from "./utils/createEmotionCache";

import { AuthProvider } from "./contexts/JWTContext";
import { useMediaQuery } from "@mui/material";
import AuthLayout from "./layouts/Auth";
// import { AuthProvider } from "./contexts/FirebaseAuthContext";
// import { AuthProvider } from "./contexts/Auth0Context";
// import { AuthProvider } from "./contexts/CognitoContext";

const clientSideEmotionCache = createEmotionCache();

function App({ emotionCache = clientSideEmotionCache }) {
  const appContent = useRoutes(routes);

  const isMobile = useMediaQuery(
    "(max-width: 500px) and (orientation: portrait)"
  );

  const content = isMobile ? (
    // Render information screen for mobile

    <AuthLayout>
      <div style={{ textAlign: "center" }}>
        <h3>Please use this application on landscope screens</h3>
        <p>This is the content to show on landscope screens.</p>
      </div>
    </AuthLayout>
  ) : (
    // Render your normal routes for desktop
    appContent
  );

  const { theme } = useTheme();

  // const xsMatches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CacheProvider value={emotionCache}>
      <HelmetProvider>
        <Helmet defaultTitle="LitDig" />
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiThemeProvider theme={createTheme(theme)}>
              <AuthProvider>{content}</AuthProvider>
            </MuiThemeProvider>
          </LocalizationProvider>
        </Provider>
      </HelmetProvider>
    </CacheProvider>
  );
}

export default App;
