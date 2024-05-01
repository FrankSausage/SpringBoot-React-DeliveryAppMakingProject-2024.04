import React, { useState } from 'react';
import SearchHeader from "../components/SearchHeader"
import Footer from "../components/Footer"
import PropTypes from 'prop-types';
import { Tab, Tabs, Box, Typography, Stack, Grid, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';


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


export default function Store() {
  const { state: category } = useLocation();
  const [value, setValue] = useState(category);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ margin: -1 }}>
      <SearchHeader />
      <Box sx={{ borderBottom: 1, borderColor: 'black'/*'divider'*/,  display: 'flex', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="전체" component={Link} to="/Store" {...a11yProps(0)} />
          <Tab label="한식" component={Link} to="/Store/HanSick" {...a11yProps(1)} autoFocus/>
          <Tab label="중식" component={Link} to="/Store/Chinesefood" {...a11yProps(2)} />
          <Tab label="일식" component={Link} to="/Store/Japanese" {...a11yProps(3)} />
          <Tab label="양식" component={Link} to="/Store/WesternStyle" {...a11yProps(4)} />
          <Tab label="패스트" component={Link} to="/Store/FastFood" {...a11yProps(5)} />
          <Tab label="치킨"  component={Link} to="/Store/Chicken"{...a11yProps(6)} />
          <Tab label="분식" component={Link} to="/Store/SnackBar" {...a11yProps(7)} />
          <Tab label="디저트" component={Link} to="/Store/Dessert" {...a11yProps(8)} />
        </Tabs>
      </Box>
      <Grid container justifyContent="center" alignItems="center" mt={2}>
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
      </Grid>
      <CustomTabPanel value={value} index={0}>
        Item 전체
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
          <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>
                <Box sx={{...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto'}}>
                <div>
                  <img src={''} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  <ul style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>가게 주소</li>
                    <li style={{ listStyleType: 'none' }}>찜순</li>
                    <li style={{ listStyleType: 'none' }}>최소 주문 금액</li>
                    <li style={{ listStyleType: 'none' }}>평점순</li>
                    <li style={{ listStyleType: 'none' }}>리뷰순</li>
                  </ul>
                </div> 
                </Box>
                <Box sx={{...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto'}}>
                <div>
                  <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  <ul style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>찜순</li>
                    <li style={{ listStyleType: 'none' }}>최소 주문 금액</li>
                    <li style={{ listStyleType: 'none' }}>평점순</li>
                    <li style={{ listStyleType: 'none' }}>리뷰순</li>
                  </ul>
                </div> 
                </Box>
              </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item 한식
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item 중식
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item 일식
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item 양식
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Item 패스트
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Item 치킨
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        Item 분식
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        Item 디저트
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
              <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}></Box>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </CustomTabPanel>
      <Footer />
    </Box>
  );
}

let boxStyle = {
  width: 200,
  height: 200,
  border: 1,
  borderColor: 'rgb(217, 217, 217)',
  m: 2
}
let gridStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  p: 2
}

