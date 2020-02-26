import React from "react";
import styles from './App.module.scss';
import { BrowserRouter } from "react-router-dom";
import Routes from "./router/routes";
import { AuthContextProvider } from "./authentication";

export default function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <div className={styles.App}>
                    <Routes />
                </div>
            </AuthContextProvider>
        </BrowserRouter>
    )
}