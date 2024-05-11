import React, { useState } from 'react';
import Footer from "../../components/Footer";
import { Stack, Box, Grid, InputBase, Button, Tab, Tabs, Typography, FormControlLabel, Checkbox } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import Ownerheader from '../../components/OwnerHeader';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import StoreInfo from './StoreInfo';
import StoreMenuList from './StoreMenuList';

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

export default function StoreDetail(data) {
  const { storeId, menuId } = useParams();
  const { state: category } = useLocation();
  const [value, setValue] = useState(category ? category : 1);
  const [ popularity, setPopularity ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false); // 검색 창의 상태를 추적하는 state
  const navigate = useNavigate();

  const handleChange = (e, newValue) => {
    setValue(newValue);
    setSearchOpen(false); // 다른 탭을 클릭할 때 검색 창 닫기
  };

  const handleSearchTabClick = () => {
    setSearchOpen(!searchOpen); // 메뉴 검색 탭을 클릭할 때마다 검색 창 열기/닫기
  };

  return (
    <Box sx={{ margin: -1 }}>
      <Ownerheader />
      <Box sx={{ borderBottom: 1, borderColor: 'black', display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
            <Tab label="메뉴 검색" onClick={handleSearchTabClick} autoFocus sx={{
              borderBottom: searchOpen ? '1px solid black' : 'none',
              marginRight: 2,
            }} />
            <Grid item xs={searchOpen ? 6 : 0} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: searchOpen ? '1px solid black' : 'none',
                  borderRadius: 1,
                  transition: 'width 0.3s ease-in-out', // 애니메이션 효과 추가
                  width: searchOpen ? 'auto' : 0, // 검색창이 열릴 때만 너비 적용
                  overflow: 'hidden', // 컨텐츠가 넘치면 숨김
                }}
              >
                <SearchIcon sx={{ m: 1 }} />
                <InputBase
                  placeholder="검색"
                  inputProps={{ 'aria-label': 'search' }}
                  fullWidth
                  autoFocus={searchOpen} // 검색창이 열릴 때 자동 포커스
                />
              </Box>
            </Grid>
          </Box>
          <Tab label="메뉴" {...a11yProps(1)} sx={{ marginLeft: 2, marginRight: 2 }} />
          <Tab label="가게·원산지 정보" {...a11yProps(2)} autoFocus sx={{ marginLeft: 2, marginRight: 2 }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={1}>
        <StoreMenuList menuNumber={'123'} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <StoreInfo />
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