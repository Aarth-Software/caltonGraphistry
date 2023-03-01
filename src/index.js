import "react-app-polyfill/stable";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "chart.js/auto";

import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SnackbarProvider } from "notistack";
// Note: Remove the following line if you want to disable the API mocks.
import "./mocks";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <ThemeProvider>
          <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ReactKeycloakProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
