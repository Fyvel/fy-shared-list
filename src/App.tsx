import React from "react";
import styles from './App.module.scss';
import { BrowserRouter } from "react-router-dom";
import Routes from "./router/routes";
import { AuthContextProvider } from "./authentication";
import { cyan, purple } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Navigation from "./containers/Navigation";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: cyan,
        secondary: purple,
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