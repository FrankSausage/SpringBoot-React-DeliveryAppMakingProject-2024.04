import React, { useState } from 'react';
import SearchHeader from "../../../components/SearchHeader"
import Footer from "../../../components/Footer"
import PropTypes from 'prop-types';
import { Tab, Tabs, Box, Typography, Stack, Grid, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';
import StoreList from '../StoreList';


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
  const [value, setValue] = useState(category ? category : 0);
  const [ searchText, setSearchText ] = useState ('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ margin: -1 }}>
      <SearchHeader />
      <Box sx={{ borderBottom: 1, borderColor: 'black'/*'divider'*/,  display: 'flex', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="전체" {...a11yProps(0)} />
          <Tab label="한식" {...a11yProps(1)}/>
          <Tab label="중식" {...a11yProps(2)} />
          <Tab label="일식" {...a11yProps(3)} />
          <Tab label="양식" {...a11yProps(4)} />
          <Tab label="패스트" {...a11yProps(5)} />
          <Tab label="치킨" {...a11yProps(6)} />
          <Tab label="분식" {...a11yProps(7)} />
          <Tab label="디저트" {...a11yProps(8)} />
        </Tabs>
      </Box>
      <Grid container justifyContent="center" alignItems="center" mt={2}>
        <Grid item xs={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <SearchIcon sx={{ m: 1 }} />
            <InputBase
              placeholder="검색"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setSearchText(e.target.value)}
              value={searchText}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>
      <CustomTabPanel value={value} index={0}>
        <StoreList category={'전체'} searchText={searchText}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>        
        <StoreList category={'한식'} searchText={searchText}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <StoreList category={'중식'} searchText={searchText}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <StoreList category={'일식'} searchText={searchText}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <StoreList category={'양식'} searchText={searchText}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <StoreList category={'패스트'} searchText={searchText}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <StoreList category={'치킨'} searchText={searchText}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <StoreList category={'분식'} searchText={searchText}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        <StoreList category={'디저트'} searchText={searchText}/>
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

