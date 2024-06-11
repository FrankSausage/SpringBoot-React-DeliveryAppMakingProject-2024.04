import React, { useState } from 'react';
import { Box, Grid, Button, Typography, Stack, Paper, Rating } from '@mui/material/';
import { Link, useParams } from 'react-router-dom';
import SearchHeader from '../../../components/SearchHeader';
import { getCurrentUser } from '../../../utils/firebase';
import { useOwnerStoreListByEmail } from '../../../utils/userInfo';
import { useStore } from '../../Stores/Hook/useStore';
import Footer from '../../../components/Footer';
import BackDrop from '../../../components/BackDrop';

export default function OwnerMain() {
  const role = localStorage.getItem('role');
  const { storeId } = useParams();
  const [isOpened, setIsOpened] = useState([]);
  const { isLoading, error, storeData } = useOwnerStoreListByEmail();
  const { postChangeStoreIsOpened } = useStore();

  const handleCheckboxChange = async (index) => {
    const newIsOpened = [...isOpened];
    newIsOpened[index] = !newIsOpened[index];
    setIsOpened(newIsOpened);
    localStorage.setItem(`isOpened_${storeId}`, JSON.stringify(newIsOpened));
    try {
      const { email } = getCurrentUser();

      postChangeStoreIsOpened.mutate({
        storeId: storeId,
        email: email,
        isOpened: newIsOpened[index] ? '오픈' : '휴업'
      })
    } catch (error) {
      console.error('에러 발생:', error);
    }
    setTimeout(() => {
      alert("상태가 업데이트되었습니다!");
    }, 500);
  };

  return (
    <Box sx={{ margin: -1 }}>
      <SearchHeader />
      <Paper elevation={3} sx={{ minHeight: 'auto',maxHeight: 'auto', backgroundImage: 'url(/img/011.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', p: 2 }}>
        {isLoading && <BackDrop isLoading={isLoading} />}
        {error && <Typography>에러 발생!</Typography>}
        {!isLoading && storeData?.storeList?.length === 0 && (
          <Typography variant='h4' sx={{ textAlign: 'center', p: 5 }}>가게가 아직 없어요!</Typography>
        )}
        {!isLoading && storeData && (
          storeData.storeList.map((data) => (
            <Grid container key={data.storeId} justifyContent="center" alignItems="center" mt={2}>
              <Grid item xs={12} sm={10} md={8}>
                <Box sx={{ border: '1px solid rgb(217, 217, 217)', borderRadius: '10px', p: 2, mb: 2, position: 'relative', backgroundColor: 'white', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out', ':hover': { transform: 'scale(1.02)', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)' } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to={`/StoreDetail/${data.storeId}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={data.storePictureName.split(',')[0]} style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} alt="가게 이미지" />
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{data.name}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}><Rating name="read-only" value={data.rating} readOnly /></Typography>
                          <Typography variant="body2" color="textSecondary">리뷰: {data.reviewCount}</Typography>
                          <Typography variant="body2" color="textSecondary">조회수: {data.dibsCount}</Typography>
                        </Box>
                      </Box>
                    </Link>
                    {role === '점주' &&
                      <Stack spacing={2} direction="column" sx={{ ml: 2 }}>
                        <Link to={`/StoreUpdate/${data.storeId}`} style={{ textDecoration: 'none' }}>
                          <Button variant="outlined">가게 수정하기</Button>
                        </Link>
                        <Link to={`/OwnerOrderList`} state={{ storeId: data.storeId, storeName: data.name }} style={{ textDecoration: 'none' }}>
                          <Button variant="outlined">가게 주문확인</Button>
                        </Link>
                        <Link to={`/StoreReviews`} state={{ storeId: data.storeId }} style={{ textDecoration: 'none' }}>
                          <Button variant="outlined">가게 리뷰</Button>
                        </Link>
                      </Stack>
                    }
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ))
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '200px', height: '50px', fontSize: '1.2rem', backgroundColor: '#a9a9a9', color: 'white', ':hover': { backgroundColor: '#0056b3' } }}>
            <Link to='/StoreRegister' style={{ textDecoration: 'none', color: 'inherit' }}>가게 추가하기</Link>
          </Button>
        </Box>
        <Footer sx={{ marginTop: 7 }} />
      </Paper>
    </Box>
  );
}
