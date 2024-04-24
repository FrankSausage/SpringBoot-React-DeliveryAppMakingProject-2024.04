import * as React from 'react';
import SearchHeader from "../components/SearchHeader"
import Footer from "../components/Footer"
import PropTypes from 'prop-types';
import { Tab, Tabs, Box, Typography, Stack, Grid, } from '@mui/material';


export default function Stores() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
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
          <Grid container></Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="전체" {...a11yProps(0)} />
          <Tab label="한식" {...a11yProps(1)} />
          <Tab label="중식" {...a11yProps(2)} />
          <Tab label="일식" {...a11yProps(3)} />
          <Tab label="양식" {...a11yProps(4)} />
          <Tab label="fast" {...a11yProps(5)} />
          <Tab label="치킨" {...a11yProps(6)} />
          <Tab label="분식" {...a11yProps(7)} />
          <Tab label="디저트" {...a11yProps(8)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item 전체
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item 한식
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item 중식
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item 일식
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item 양식
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Item fast
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Item 치킨
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        Item 분식
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        Item 디저트
      </CustomTabPanel>
    </Box>
  );
}

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

