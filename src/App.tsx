import React from "react";
import styles from './App.module.scss';
import { BrowserRouter } from "react-router-dom";
import Routes from "./router/routes";
import { AuthContextProvider } from "./authentication";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Navigation from "./containers/Navigation";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#8a25b1',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          main: '#e78200',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      },
})

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AuthContextProvider>
                    <div className={styles.Routes}>
                        <Routes />
                    </div>
                    <div className={styles.Menu}>
                        <Navigation />
                    </div>
                </AuthContextProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}