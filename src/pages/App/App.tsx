import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import Header from "../../components/Header/Header";
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Paper>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </Paper>
      </header> */}
      <Header></Header>
      
    </div>
  );
}

export default App;
