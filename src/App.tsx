import React from "react";
import styles from './App.module.scss';
import { BrowserRouter } from "react-router-dom";
import Routes from "./router/routes";
import { AuthContextProvider } from "./authentication";
import { cyan, purple } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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

                    <div className={styles.App}>
                        <Routes />
                    </div>
                </AuthContextProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}