import * as React from 'react';
import { Box, Grid, createTheme, ThemeProvider, Typography } from '@mui/material';
import { useStoreDeatilByEmail } from '../../utils/storeInfo';
import { useParams } from 'react-router';

const defaultTheme = createTheme();

export default function StoreInfo() {
  const email = localStorage.getItem('email');
  const { storeId } = useParams();
  const { isLoading, error, StoreDetailOwner } = useStoreDeatilByEmail(email, storeId);

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {StoreDetailOwner && (
        <Box sx={{ margin: 1 }}>
          가게·원산지 정보
          <Grid container>
            <Grid item xs />
            <Grid
              container
              sx={{
                position: 'relative',
                border: 1,
                borderColor: 'rgba(255, 0, 0, 0)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
                <Box
                  className="storeIntro"
                  sx={{
                    ...boxStyle,
                    position: 'relative',
                    width: { xs: '100%', sm: '70%' },
                    height: '350px',
                    marginX: 'auto',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                  }}
                >
                  <div>
                    <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </Box>
                <Box
                  className="storeIntro"
                  sx={{
                    ...boxStyle,
                    position: 'relative',
                    width: { xs: '100%', sm: '70%' },
                    height: '350px',
                    marginX: 'auto',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                  }}
                >
                  <div style={{ position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <h2 style={{ marginBottom: '15px', color: '#333' }}>가게 정보</h2>
                    <ul style={{ padding: '0', margin: '0', textAlign: 'left' }}>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>가게 이름: {StoreDetailOwner.name}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>주소: {StoreDetailOwner.address}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>전화번호: {StoreDetailOwner.phone}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>카테고리: {StoreDetailOwner.category}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>최소 주문 금액: {StoreDetailOwner.minDeliveryPrice}원</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>배달팁: {StoreDetailOwner.deliveryTip}원</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>배달 예상 시간: {StoreDetailOwner.minDeliveryTime}분 ~ {StoreDetailOwner.maxDeliveryTime}분</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>운영 시간: {StoreDetailOwner.operationHours}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>휴무일: {StoreDetailOwner.closedDays}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>배달지역: {StoreDetailOwner.deliveryAddress}</li>
                    </ul>
                  </div>
                </Box>
                <Box
                  className="originIntro"
                  sx={{
                    ...boxStyle,
                    position: 'relative',
                    width: { xs: '100%', sm: '70%' },
                    height: '300px',
                    marginX: 'auto',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                  }}
                >
                  <div style={{ position: 'absolute', top: '50%', left: '15%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <h2 style={{ marginBottom: '15px', color: '#333' }}>가게 소개</h2>
                    <ul style={{ padding: '0', margin: '0', textAlign: 'left' }}>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>가게 소개: {StoreDetailOwner.conetnet}</li>
                    </ul>
                  </div>
                </Box>

                <Box
                  className="originIntro"
                  sx={{
                    ...boxStyle,
                    position: 'relative',
                    width: { xs: '100%', sm: '70%' },
                    height: '300px',
                    marginX: 'auto',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                  }}
                >
                  <div style={{ position: 'absolute', top: '50%', left: '15%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <h2 style={{ marginBottom: '15px', color: '#333' }}>원산지 정보</h2>
                    <ul style={{ padding: '0', margin: '0', textAlign: 'left' }}>
                      {/* 원산지 정보에 대한 세부 정보 추가 */}
                    </ul>
                  </div>
                </Box>

              </Grid>
            </Grid>
            <Grid item xs />
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}

let boxStyle = {
  width: 200,
  height: 200,
  border: 1,
  borderColor: 'rgb(217, 217, 217)',
  m: 2,
};
let gridStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  p: 2,
};
