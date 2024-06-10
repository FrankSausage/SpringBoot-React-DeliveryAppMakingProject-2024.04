import * as React from 'react';
import { Box, Grid, createTheme, ThemeProvider, Typography } from '@mui/material';

const defaultTheme = createTheme();

export default function StoreInfo({storeDetail}) {

  const renderContentWithLineBreaks = (content) => { 
    return content.split('\n').map((line, index) => ( <span key={index}>{line}<br /></span>));};  //가게 소개 줄, 문단 바꾸기 적용//

  return (
    <ThemeProvider theme={defaultTheme}>
      {storeDetail && (
        <Box sx={{ m: 1 }}>
          {/* 가게·원산지 정보 */}
          <Grid container>
            <Grid item xs />
            <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center', }}>
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
                <Box
                  className="storeIntro"
                  sx={{
                    ...boxStyle,
                    position: 'relative',
                    width: { xs: '100%', sm: '70%' },
                    height: '380px',
                    marginX: 'auto',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                  }}
                >
                  {/* <div style={{ position: 'absolute', top: '52%', left: '25%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0, fontSize: '16px'}}> */}
                  <div style={{ padding: 0, fontSize: '16px'}}>
                    <h2 style={{ marginBottom: '15px', color: '#333', fontSize: '22px' }}>가게 정보</h2>
                    <ul style={{ padding: '0', margin: '0', textAlign: 'left' }}>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>가게 이름: {storeDetail.name}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>주소: {storeDetail.address}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>전화번호: {storeDetail.phone}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>카테고리: {storeDetail.category}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>최소 주문 금액: {storeDetail.minDeliveryPrice}원</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>배달팁: {storeDetail.deliveryTip}원</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>배달 예상 시간: {storeDetail.minDeliveryTime}분 ~ {storeDetail.maxDeliveryTime}분</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>운영 시간: {storeDetail.operationHours}</li>
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>휴무일: {storeDetail.closedDays}</li>
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
                    overflow: 'hidden',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                  }}
                >
                  {/* <div style={{ position: 'absolute', top: '30%', left: '34%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0, fontSize: '16px' }}> */}
                  <div style={{ padding: 0,  fontSize: '16px'}}>
                    <h2 style={{ marginBottom: '15px', color: '#333', fontSize: '22px' }}>가게 소개</h2>
                    <ul style={{ padding: '0', margin: '0', textAlign: 'left' }}>
                      {/* <li style={{ listStyleType: 'none', marginBottom: '10px' }}>{storeDetail.content}</li> */}
                      <li style={{ listStyleType: 'none', marginBottom: '10px' }}>{renderContentWithLineBreaks(storeDetail.content)}</li>
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
