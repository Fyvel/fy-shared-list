import React from "react";
import './App.scss';
import SharedList from "./containers/SharedList";

export default function App() {
    return (
        <div className="App">
            {<SharedList />}
        </div>
    )
}