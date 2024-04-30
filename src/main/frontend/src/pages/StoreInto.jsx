import * as React from 'react';
import Footer from "../components/Footer"
import PropTypes from 'prop-types';
import { Tab, Tabs, Box, Typography, Stack, Grid, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'


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


export default function Store() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <Box sx={{ margin: -1 }}>

<Grid container>
          <Grid item xs/>
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto'}}>
                <div>
                  <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  <ul style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>가게 주소</li>
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
      
      <Grid container></Grid>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',  display: 'flex', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="정보" {...a11yProps(0)} />
          <Tab label="메뉴" {...a11yProps(1)} />
          <Tab label="리뷰" {...a11yProps(2)} />
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
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item 메뉴
        <Grid container>
        <Grid item xs/>
        <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto'}}></Box>
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto'}}></Box>
            </Grid>
          </Grid>
        <Grid item xs />
      </Grid>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item 리뷰
        <Grid container>
        <Grid item xs/>
        <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto'}}></Box>
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto'}}></Box>
            </Grid>
          </Grid>
        <Grid item xs />
      </Grid>
      </CustomTabPanel>
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

