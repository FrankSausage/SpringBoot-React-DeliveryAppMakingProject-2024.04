import * as React from 'react';
import { Box, Grid, createTheme, } from '@mui/material';
import { getCurrentUser } from '../../utils/firebase';
import { useOwnerByEmail } from '../../utils/storeInfo';

// const defaultTheme = createTheme();

export default function StoreInfo(data) {
  // const {email} = getCurrentUser();
  // const { isLoading, error, user} = useOwnerByEmail(email);

  return (
    // <ThemeProvider theme={defaultTheme}>
    // {isLoading && <Typography>Loading...</Typography>}
    // {error && <Typography>에러 발생!</Typography>}
    // {user && (
    //   user.data.map => (

    //   )
    // )}
    <Box sx={{ margin: 1 }}>
        가게·원산지 정보
        <Grid container>
          <Grid item xs/>
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '100%', sm: '70%' }, height: '300px', marginX: 'auto', marginBottom: '10px' }}>
                <div>
                  <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                </div>
              </Box>
              
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '100%', sm: '70%' }, height: '350px', marginX: 'auto', marginBottom: '10px' }}>
                  <ul style={{ position: 'absolute', top: '50%', left: '15%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>가게 이름</li>
                    <li style={{ listStyleType: 'none' }}>가게 주소</li>
                    <li style={{ listStyleType: 'none' }}>전화번호</li>
                    <li style={{ listStyleType: 'none' }}>카테고리</li>
                    <li style={{ listStyleType: 'none' }}>최소 주문 금액</li>
                    <li style={{ listStyleType: 'none' }}>배달팁</li>
                    <li style={{ listStyleType: 'none' }}>최소 배달 예상 시간</li>
                    <li style={{ listStyleType: 'none' }}>최대 배달 예상 시간</li>
                    <li style={{ listStyleType: 'none' }}>운영 시간</li>
                    <li style={{ listStyleType: 'none' }}>휴무일</li>
                    <li style={{ listStyleType: 'none' }}>배달지역</li>
                  </ul>       
              </Box>
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '100%', sm: '70%' }, height: '300px', marginX: 'auto', marginBottom: '10px' }}>
                  <ul style={{ position: 'absolute', top: '50%', left: '15%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>가게 소개</li>
                  </ul>
              </Box>
              </Grid>
            </Grid>
          <Grid item xs />
        </Grid>
    </Box>
  // </ThemeProvider>
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

