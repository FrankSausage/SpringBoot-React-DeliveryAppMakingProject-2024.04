import React, {useState} from 'react';
import Footer from "../components/Footer";
import { Stack, Box, Grid, InputBase, Button, Tab, Tabs, Typography } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import Ownerheader from '../components/OwnerHeader';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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

export default function StoreList() {
  const { state: category } = useLocation();
  const [value, setValue] = useState(category);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <Box sx={{ margin: -1 }}>
      <Ownerheader />
      <Box sx={{ borderBottom: 1, borderColor: 'black'/*'divider'*/,  display: 'flex', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="메뉴 검색" component={Link} to="/StoreList" {...a11yProps(0)} autoFocus></Tab>
          <Tab label="메뉴" component={Link} to="/StoreList" {...a11yProps(1)} />
          <Tab label="가게 정보·원산지" component={Link} to="/StoreList" {...a11yProps(2)} autoFocus/>
        </Tabs>
      </Box>
      
      {/* <Grid container justifyContent="center" alignItems="center" mt={2}>
        <Grid item xs={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <SearchIcon sx={{ m: 1 }} />
            <InputBase
              placeholder="검색"
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid> */}
      <Grid container>
        <Grid item xs/>
        <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>
              
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '100%', sm: '70%' }, height: '150px', marginX: 'auto'}}>
                <div>
                  <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  <ul style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>음식 이름</li> 
                  </ul>
                </div>         
              </Box>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                style={{textDecoration: 'none', color: 'white'}} 
                sx={{ mt: 3, mb: 10, width: '200px', height: '50px', fontSize: '1.2rem' }}>
                가게 추가하기
              </Button>
            </div>
        </Grid>
        <Grid item xs />
      </Grid>
      <Footer/>
    </Box>
  );
}

let boxStyle = {
  width: 200, 
  height: 200, 
  border:1, 
  borderColor: 'rgb(217, 217, 217)', 
  m:2
}
let gridStyle ={
  justifyContent:'center',
  alignItems:'center',
  p:2
}