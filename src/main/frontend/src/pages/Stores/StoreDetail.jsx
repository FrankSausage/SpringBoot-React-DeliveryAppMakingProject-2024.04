import React, { Fragment, useState } from 'react';
import Footer from "../../components/Footer";
import { Box, Grid, InputBase, Stack, Tab, Tabs, Typography, } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import StoreInfo from './StoreInfo';
import StoreMenuList from './StoreMenuList';
import SearchHeader from '../../components/SearchHeader';
import { useDibs } from '../Dibs/Hook/useDibs';
import { useStoreDeatilByEmail } from '../../utils/storeInfo';
import { useQueryClient } from '@tanstack/react-query';
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

export default function StoreDetail() {
  const queryClient = useQueryClient();
  const email = localStorage.getItem('email')
  const role = localStorage.getItem('role')
  const { storeId } = useParams()
  const { isLoading, storeDetail } = useStoreDeatilByEmail(email, storeId);
  const { postDibStore } = useDibs();
  const [value, setValue] = useState(1);
  const [popularity, setPopularity] = useState('');
  const [searchOpen, setSearchOpen] = useState(false); // 검색 창의 상태를 추적하는 state
  const navigate = useNavigate();
  console.log(storeDetail)
  const handleChange = (e, newValue) => {
    setValue(newValue);
    setSearchOpen(false); // 다른 탭을 클릭할 때 검색 창 닫기
  };
  
  const handleSearchTabClick = () => {
    setSearchOpen(!searchOpen); // 메뉴 검색 탭을 클릭할 때마다 검색 창 열기/닫기
  };

  const handleDib = (isDibed) => {
    if(isDibed===null) {
      postDibStore.mutate({email: email, storeId: storeId, status: '찜'}, {
        onSuccess: () => {console.log('찜 성공'); queryClient.invalidateQueries(['storeDetail', {storeId: storeId}])},
        onError: e => {alert('찜 등록에 문제가 발생했습니다.'); console.error(e)}
      })
      return;
    }

    if(isDibed==='일반') {
      postDibStore.mutate({email: email, storeId: storeId, status: '찜'}, {
        onSuccess: () => {console.log('찜 성공'); queryClient.invalidateQueries(['storeDetail', {storeId: storeId}])},
        onError: e => {alert('찜 등록에 문제가 발생했습니다.'); console.error(e)}
      })
    } else if (isDibed==='찜') {
      postDibStore.mutate({email: email, storeId: storeId, status: '일반'}, {
        onSuccess: () => {console.log('일반 성공'); queryClient.invalidateQueries(['storeDetail', {storeId: storeId}])},
        onError: e => {alert('찜 등록에 문제가 발생했습니다.'); console.error(e)}
      })
    }
  }

  return (
    <Box sx={{ margin: -1 }}>
      <SearchHeader />
      {isLoading && <Typography>로딩 중...</Typography>}
      {!isLoading && storeDetail && 
      <Fragment>
        <Grid container>
          <Grid item xs={4}/>
          <Grid item xs={2.5}>
            <Typography variant='h4' sx={{textAlign:'end'}}>{storeDetail.name}</Typography>
          </Grid>
          <Grid item sx={{ml:2}} xs> 
            {role!=='점주' && storeDetail.isDibed==='일반' || storeDetail.isDibed===null ? 
              <FavoriteBorderIcon sx={{cursor:'pointer', fontSize:30,}} onClick={() => handleDib(storeDetail.isDibed)} />
              :
              <FavoriteIcon sx={{cursor:'pointer', fontSize:30, color:'red'}} onClick={() => handleDib(storeDetail.isDibed)} />
            } 
          </Grid>
        </Grid>
      <Box sx={{ borderBottom: 1, borderColor: 'black', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
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
        <StoreMenuList storeName={storeDetail.name} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <StoreInfo storeDetail={storeDetail} />
      </CustomTabPanel>
      <Footer />
      </Fragment>
      }
    </Box>
  );
}