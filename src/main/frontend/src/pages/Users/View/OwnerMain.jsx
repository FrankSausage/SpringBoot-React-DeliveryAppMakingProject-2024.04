import React from 'react';
import { Box, Grid, InputBase, Button, Typography } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import SearchHeader from '../../../components/SearchHeader';
import { useOwnerStoreListByEmail } from '../../../utils/userInfo';

export default function OwnerMain() {
  const { isLoading, error, storeData } = useOwnerStoreListByEmail();

  return (
    <Box sx={{ margin: 0, paddingBottom: '100px' }}>
      <SearchHeader />
      <Grid container justifyContent="center" alignItems="center" mt={2}>
        <Grid item xs={10} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 10, p: 1 }}>
            <SearchIcon sx={{ m: 1 }} />
            <InputBase
              placeholder="검색"
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>
      {isLoading && <Typography>로딩 중...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {!isLoading && storeData?.storeList?.length === 0 && (
        <Typography variant='h4' sx={{ textAlign: 'center', p: 5 }}>가게가 아직 없어요!</Typography>
      )}
      {!isLoading && storeData && (
        storeData.storeList.map((data, idx) => (
          <Grid container key={data.storeId} justifyContent="center" alignItems="center" mt={2}>
            <Grid item xs={12} sm={10} md={8}>
              <Box sx={{ ...boxStyle, width: { xs: '100%', sm: '70%' }, margin: 'auto' }}>
                <Link to={`/StoreDetail/${data.storeId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={'/img/01.jpg'} style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} alt="메뉴 이미지" />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6">{data.name}</Typography>
                      <Typography variant="body2" color="textSecondary">별점: {data.rateing}</Typography>
                      <Typography variant="body2" color="textSecondary">리뷰: {data.reviewCount}</Typography>
                      <Typography variant="body2" color="textSecondary">조회수: {data.dibsCount}</Typography>
                    </Box>
                  </Box>
                </Link>
                <Link to={`/StoreUpdate/${data.storeId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button variant="outlined" sx={{ position: 'absolute', bottom: '10px', right: '10px' }}>가게 수정하기</Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        ))
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Button
          type="submit" 
          variant="contained"
          sx={{ width: '200px', height: '50px', fontSize: '1.2rem', backgroundColor: '#dcdcdc'  }}>
          <Link to='/StoreRegister' style={{ textDecoration: 'none', color: 'black' }}>가게 추가하기</Link>
        </Button>
      </Box>
    </Box>
  );
}

const boxStyle = {
  border: '1px solid rgb(217, 217, 217)',
  borderRadius: '10px',
  p: 2,
  mb: 2,
  position: 'relative',
  backgroundColor: 'white',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  ':hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
  }
};

const gridStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  p: 2
};
