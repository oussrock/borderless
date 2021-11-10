import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/system";
import App from "./pages/App/App";
import { AuthProvider } from "./providers/Auth";
import { ApiErrorProvider } from "./providers/ApiErrorProvider";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme/theme";
import "./assets/i18n/i18n.ts";
import "./globals.css";
import "./fonts.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <ApiErrorProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </ApiErrorProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
