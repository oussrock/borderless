import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Modal from "@mui/material/Modal";
import './Header.scss';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  fontFamily: 'monospace',
  fontSize: 233,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgb(230,230,230)','&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.20),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  fontSize: 10,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const bookings = require('./bookings.json');

function Header() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {

    setOpen(false);

  };
  const handleOpen = () => setOpen(true);
  const handleRequest = () => {

    setOpen(false);

  }

  const rows = bookings.map( (record) => {
    const tp = record["iata:booking:transportMovement"]
    const arrival   = "iata:transportMovement:arrivalLocation"
    const departure = "iata:transportMovement:departureLocation"
    const code = "iata:location:code"
    return {
      id: record["iata:booking:waybillNumber"]["iata:waybill:waybillNumber"],
      col1: record["iata:customsInfo:customsClearanceStatus"],
      col2: tp["iata:bookingSegment:preferredTransportId"],
      col3: tp["iata:movementTimes:movementTimestamp"],
      col4: tp[departure][code] + "→" + tp[arrival][code]
    }
  });
   // { id: 6, col1: "Material-UI", col2: "is Amazing",col3:'8:30',col4:'bcd' }
   // console.log(rows)
   const style = {

    position: "absolute" as "absolute",

    top: "50%",

    left: "50%",

    transform: "translate(-50%, -50%)",

    width: 800,

    bgcolor: "background.paper",

    border: "2px solid #000",

    boxShadow: 24,

    borderRadius: '25px',

   

    px: 4,

    paddingRight: '2.7rem',

    pb: 3

  };
  
    const columns = [
      { field: "id", headerName: "AWB #", width: 200, 
      renderCell: params => {
        return (
          <p>
            <div className="table__cell--pilot">
              <a style={{ cursor: "pointer" }} onClick={handleOpen}>
                014-65464206
              </a>
            </div>
            <Modal open={open} onClose={handleClose} BackdropProps={{style: {  opacity: 0.5}}}>
              <Box sx={{ ...style, width: 800 }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                  <div style={{ marginLeft: '15.7rem' }}> <h2 >AirwayBill Details</h2></div>
                  <div style={{ marginBottom: '4rem', marginRight: '-2.3rem' }}>  <CloseIcon className="close-icon" onClick={handleClose} ></CloseIcon></div>
                </div>

                <div style={{ display: "flex", flexDirection: "column",justifyContent: 'space-between' }}>
                  <div style={{ display: "flex", flexDirection: "row",justifyContent: 'space-between' }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontWeight: '600' }}>Origin:</div>
                      <div style={{ paddingLeft: "0.5rem" }}>YYC</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row"  }}>
                      <div style={{ fontWeight: '600' }} >AWB#:</div>
                      <div style={{ paddingLeft: "0.5rem" }}>014-65464206</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between'  }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontWeight: '600' }}>Destination:</div>
                      <div style={{ paddingLeft: "0.5rem" }}>Toronto</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", paddingLeft: "10rem" }}>
                      <div style={{ fontWeight: '600' }} >Custom Status:</div>
                      <div style={{ paddingLeft: "0.5rem" }}>Cleared</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ fontWeight: '600' }}>Weight:</div>
                    <div style={{ paddingLeft: "0.5rem" }}>700kg</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ fontWeight: '600' }}>Goods Description:</div>
                    <div style={{ paddingLeft: "0.5rem" }}>Furniture</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ fontWeight: '600' }}>Flight#:</div>
                    <div style={{ paddingLeft: "0.5rem" }}>787</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ fontWeight: '600' }}>Flight Departure:</div>
                    <div style={{ paddingLeft: "0.5rem" }}>YYZ</div>
                  </div>
                 
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ fontWeight: '600' }}>Consigner:</div>
                    <div style={{ paddingLeft: "0.5rem" ,height:'5rem',width:'10rem', overflow:'scroll',overflowWrap:'break-word'}}>YshdjshdjshdkhsakjhdajhsdajhdjashdjakhdjahkjsahjshadjahdjhsjdshjdhsjdhsjdjshdjYZ</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ fontWeight: '600' }}>Shipper Detail:</div>
                    <div style={{ paddingLeft: "0.5rem",height:'5rem',width:'10rem', overflow:'scroll',overflowWrap:'break-word'}}>YYZ</div>
                  </div>
                  

       
                 
                
                  <div>

                  </div>
                  <div style={{ display: "flex", flexDirection: "row",justifyContent:'center' }}>
                  <div>
                    <Button variant="contained" onClick={handleRequest} endIcon={<SendIcon />}>
                      Request Status
                    </Button>
                  </div>
                  <div style={{marginLeft:'2rem'}} >
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                  </div>
                </div>
                </div>
               
              </Box>
            </Modal>
          </p>
        );
      }

    
    },
      { field: "col1", headerName: "Customs Status", width: 220,
      renderCell: (record) => {
        const status = record.row.col1
        const color = status_colors[status]
        console.log(color)
        var cell = <Button sx={{"&.MuiButtonBase-root:hover": {
          background: status_colors[status]
        }, backgroundColor: status_colors[status], fontFamily: 'monospace'}}  variant="contained">{status}</Button>
        return (cell)

    }
    
    
    },
      { field: "col2", headerName: "Flight #", width: 150 },
      { field: "col3", headerName: "Departure Time", width: 320 },
      { field: "col4", headerName: "O & D", width: 135 }
    ];
  
    const a = 1
  const status_codes = ['CLR', 'DNL', 'RFI', 'RFS', 'WTG'];
  const status_colors = {
    'CLR': alpha('rgb(48,192,58)', a),
    'DNL': alpha('rgb(240,20,40)', a),
    'RFI': alpha('rgb(255,165,0)', a),
    'RFS': alpha('rgb(255,165,0)', a),
    'WTG': alpha('rgb(7,98,235)', a),
}
  return (
    <>
   <AppBar sx={{ bgcolor: "white" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h3"
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

    
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
           
          </Box>

          <Button variant="outlined" sx={{p: 1, backgroundColor: 'rgb(240,240,240)', color: 'black', border: 'none' }}>
            Create Booking
          </Button>

    

          <Search sx={{fontSize: 10}}>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="AWB Search" 
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          
        </Toolbar>
      </Container>
    </AppBar>
    
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {status_codes.map((status) => (
              <Button
                key={status}
                variant="outlined"

                sx={{ backgroundColor: status_colors[status], fontSize: 15, my: 2, color: 'white', display: 'flex',  marginLeft: 2, marginRight: 2, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}
              >
              {status + " - 100"}  
              </Button>
            ))}
          </Box>


          <div style={{ backgroundColor: "white", height: "100%", padding: "2rem 10rem 0rem 10rem" }} >
  <div style={{ height: 440, width: "100%" }}>
    <DataGrid sx={{marginTop: 0}} rows={rows} columns={columns} />
  </div>
</div>

    </>
  );
}

export default Header;