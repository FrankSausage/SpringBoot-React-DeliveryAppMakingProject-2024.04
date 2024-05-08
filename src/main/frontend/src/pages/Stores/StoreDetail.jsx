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
  const { storeId } = useParams();
  const { state: category } = useLocation();
  const [value, setValue] = useState(category ? category : 1);
  const [ popularity, setPopularity ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false); // 검색 창의 상태를 추적하는 state
  const navigate = useNavigate();

  console.log(storeId)
  const handleChange = (e, newValue) => {
    setValue(newValue);
    setSearchOpen(false); // 다른 탭을 클릭할 때 검색 창 닫기
  };


  const handleLinkClick = () => {
    navigate('/MenuUpdate');
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
          <Tab label="가게 정보·원산지" {...a11yProps(2)} autoFocus sx={{ marginLeft: 2, marginRight: 2 }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={1}>
        <StoreMenuList menuNumber={'123'} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <StoreInfo />
      </CustomTabPanel>
      <Grid container>
        <Grid item xs />
        <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
          <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
            <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '100%', sm: '70%' }, height: '150px', marginX: 'auto' }}>
              <div onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                음식 정보 수정
                <div>
                  <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  <ul style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>음식 이름</li>
                    <li style={{ listStyleType: 'none' }}>가격</li>
                  </ul>
                  <Grid container spacing={3} >
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <FormControlLabel
                        control={<Checkbox checked={popularity === 0} onChange={() => setPopularity(0)} color="primary" />}
                        label="인기도"
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Box>
          </Grid>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              style={{ textDecoration: 'none', color: 'white' }}
              sx={{ mt: 3, mb: 10, width: '200px', height: '50px', fontSize: '1.2rem' }}>
              <Link Link to={`/MenuRegister/`} state={data.storeId} style={{ textDecoration: 'none', color: 'white' }}>메뉴 추가하기</Link>
            </Button>
          </div>
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
  border: 1,
  borderColor: 'rgb(217, 217, 217)',
  m: 2
}
let gridStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  p: 2
}