import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import SearchHeader from "../components/SearchHeader"
import Footer from "../components/Footer"
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}



export default function Home() {
  return(
      <Box>
        <SearchHeader />
        <Grid container>
            <Grid item xs={12} sx={{border: 1}}>
              <Stack sx={{maxHeight: 200}}>
                <Box 
                sx={
                    {
                    width: '100%', 
                    height: 200, 
                    backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    }}>
                </Box>
              </Stack>
            </Grid>              
        </Grid>
        <Grid container>
          <Grid item xs/>
          <Grid container sx={{border: 1, borderColor:'red', justifyContent:'center', alignItems:'center'}}>
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} 
              sx={gridStyle}>                 
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
              </Grid>
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} 
              sx={gridStyle}>                 
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
              </Grid>
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} 
              sx={gridStyle}>                 
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
              </Grid>
            </Grid>
          <Grid item xs />
        </Grid>
       <Footer />
      </Box>
  );
}

let boxStyle = {
width: 200, 
height: 200, 
border:1, 
borderColor: 'black', 
m:1
}
let gridStyle ={
justifyContent:'center',
alignItems:'center',
p:2
}