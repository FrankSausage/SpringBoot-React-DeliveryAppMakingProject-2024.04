import React, { useState } from 'react';
import SearchHeader from "../../../components/SearchHeader";
import Footer from "../../../components/Footer";
import PropTypes from 'prop-types';
import { Tab, Tabs, Box, Typography, Grid, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StoreList from '../StoreList';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [value, setValue] = useState(category ? category : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#f8f8f8', m: -1}}>
      <SearchHeader />
      {/* <Box sx={{ height: 'auto', minHeight: '100vh', backgroundImage: 'url(/img/s01.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}> */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', bgcolor: '#fff' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto" sx={{ maxWidth: '100vw' }}>
            <Tab label="전체" {...a11yProps(0)} />
            <Tab label="한식" {...a11yProps(1)} />
            <Tab label="중식" {...a11yProps(2)} />
            <Tab label="일식" {...a11yProps(3)} />
            <Tab label="양식" {...a11yProps(4)} />
            <Tab label="패스트" {...a11yProps(5)} />
            <Tab label="치킨" {...a11yProps(6)} />
            <Tab label="분식" {...a11yProps(7)} />
            <Tab label="디저트" {...a11yProps(8)} />
          </Tabs>
        </Box>
      <Paper elevation={3} sx={{minHeight: '100vh', maxHeight: 'auto', backgroundImage: 'url(/img/sl0.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', p: 2, overflowY: 'auto' }}>
        <Grid container justifyContent="center" alignItems="center" mb={2}>
          <Grid item xs={10} md={6} lg={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center', border: 1, borderColor: 'divider', borderRadius: 3, p: 1, bgcolor: '#fff', boxShadow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 5 }}>
                <SearchIcon sx={{ color: 'grey.500' }} />
                <InputBase
                  placeholder="가게 / 메뉴 이름 입력"
                  inputProps={{ 'aria-label': 'search' }}
                  onClick={() => navigate('/StoreSearch')}
                  fullWidth
                  sx={{ ml: 1 }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      <Box sx={{ mt: 3 }}>
        <CustomTabPanel value={value} index={0}>
          <StoreList category={'전체'} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <StoreList category={'한식'} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <StoreList category={'중식'} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <StoreList category={'일식'} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <StoreList category={'양식'} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <StoreList category={'패스트'} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <StoreList category={'치킨'} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <StoreList category={'분식'} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={8}>
          <StoreList category={'디저트'} />
        </CustomTabPanel>
      </Box>
      <Footer />
      </Paper>
    </Box>
  );
}
