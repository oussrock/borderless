import React, { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


function Header() {
  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "XGrid", col2: "is Awesome" },
    { id: 3, col1: "Material-UI", col2: "is Amazing" },
    { id: 4, col1: "Hello", col2: "World" },
    { id: 5, col1: "XGrid", col2: "is Awesome" },
    { id: 6, col1: "Material-UI", col2: "is Amazing" }
  ];
  
  const columns = [
    { field: "id", hide: true },
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 }
  ];
  const status_codes = ['CLR', 'DNL', 'RFI', 'RFS', 'WTG'];
  const status_colors = {
    'CLR': 'green',
    'DNL': 'red',
    'RFI': 'orange',
    'RFS': 'orange',
    'WTG': 'yellow',
}
  return (
    <>
   <AppBar sx={{ bgcolor: "white" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            &#60;/&#62;BORDERLESS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
           
              color="inherit"
            >
          
            </IconButton>
         
          </Box>

    
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {status_codes.map((status) => (
              <Button
                key={status}
         
                sx={{ fontSize: 12, my: 2, color: 'black', display: 'flex' }}
              >
                {status + " - 100"}
              </Button>
            ))}
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
    </>
  );
}

export default Header;