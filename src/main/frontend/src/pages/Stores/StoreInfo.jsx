import * as React from 'react';
import { Box, Grid, createTheme, ThemeProvider, Typography } from '@mui/material';
import { getCurrentUser } from '../../utils/firebase';
import { useStoreDeatilByEmail } from '../../utils/storeInfo';
import { useLocation, useParams } from 'react-router';

const defaultTheme = createTheme();

export default function StoreInfo() {
  const { email } = getCurrentUser();
  const location = useLocation();
  const { storeId } = useParams();
  const { isLoading, error, StoreDetailOwner } = useStoreDeatilByEmail(email, storeId);

  console.log(storeId);
  console.log(StoreDetailOwner);

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
                  sx={{
                    ...boxStyle,
                    position: 'relative',
                    width: { xs: '100%', sm: '70%' },
                    height: '300px',
                    marginX: 'auto',
                    marginBottom: '10px',
                  }}
                >
                  <div>
                    <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </Box>

                <Box
                  sx={{
                    ...boxStyle,
                    position: 'relative',
                    width: { xs: '100%', sm: '70%' },
                    height: '350px',
                    marginX: 'auto',
                    marginBottom: '10px',
                    overflow: 'hidden', 
                  }}
                >
                  <div style={{ position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <ul >
                      <li style={{ listStyleType: 'none' }}>가게 이름: {StoreDetailOwner.name}</li>
                      <li style={{ listStyleType: 'none' }}>주소: {StoreDetailOwner.address}</li>
                      <li style={{ listStyleType: 'none' }}>전화번호: {StoreDetailOwner.phone}</li>
                      <li style={{ listStyleType: 'none' }}>카테고리: {StoreDetailOwner.category}</li>
                      <li style={{ listStyleType: 'none' }}>최소 주문 금액: {StoreDetailOwner.minDeliveryPrice}원</li>
                      <li style={{ listStyleType: 'none' }}>배달팁: {StoreDetailOwner.deliveryTip}원</li>
                      <li style={{ listStyleType: 'none' }}>배달 예상 시간: {StoreDetailOwner.minDeliveryTime}분 ~ {StoreDetailOwner.maxDeliveryTime}분</li>
                      <li style={{ listStyleType: 'none' }}>운영 시간: {StoreDetailOwner.operationHours}</li>
                      <li style={{ listStyleType: 'none' }}>휴무일: {StoreDetailOwner.closedDays}</li>
                      <li style={{ listStyleType: 'none' }}>배달지역: </li>
                    </ul>
                  </div>
                </Box>

                <Box
                  sx={{
                    ...boxStyle,
                    position: 'relative',
                    width: { xs: '100%', sm: '70%' },
                    height: '300px',
                    marginX: 'auto',
                    marginBottom: '10px',
                  }}
                >
                  <ul style={{ position: 'absolute', top: '50%', left: '15%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>가게 소개: {StoreDetailOwner.content}</li>
                  </ul>
                </Box>

                <Box
                  sx={{
                    ...boxStyle,
                    position: 'relative',
                    width: { xs: '100%', sm: '70%' },
                    height: '300px',
                    marginX: 'auto',
                    marginBottom: '10px',
                  }}
                >
                  <ul style={{ position: 'absolute', top: '50%', left: '15%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>원산지 정보</li>
                  </ul>
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
