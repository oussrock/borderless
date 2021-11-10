import React from "react";
import "./App.css";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box
          sx={{
            fontFamily: "Icomoon"
          }}
        >
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
        </Box>
      </header>
    </div>
  );
}

export default App;
