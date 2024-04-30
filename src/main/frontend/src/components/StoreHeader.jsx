import * as React from 'react';
import SearchHeader from "../components/SearchHeader"
import Footer from "../components/Footer"
import PropTypes from 'prop-types';
import { Tab, Tabs, Box, Typography, Stack, Grid, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';


function StoreHeader(props) {
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

StoreHeader.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
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
      <Box sx={{ borderBottom: 1, borderColor: 'black'/*'divider'*/,  display: 'flex', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="전체" {...a11yProps(0)} />
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