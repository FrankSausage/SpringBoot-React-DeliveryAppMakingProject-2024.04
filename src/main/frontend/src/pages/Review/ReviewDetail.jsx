import React, { useState, useEffect, Fragment } from 'react';
import { Box, Grid, Button, } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// const defaultTheme = createTheme();

export default function ReviewDetail() {

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const handleDelete = () => {
  //   axios.post(`/dp/store//review/delete`, { reviewid : reviewid })
  //       .then(() => {
  //           handleClose();
  //           alert('리뷰가 삭제되었습니다');
  //           navigate('/');
  //       })
  //       .catch(console.error)
  // }

  

  return (
    // <ThemeProvider theme={defaultTheme}>
    // {isLoading && <Typography>Loading...</Typography>}
    // {error && <Typography>에러 발생!</Typography>}
    // {user && (
    //   user.data.map => (

    //   )
    // )}
    <Box sx={{ margin: 1 }}>
        리뷰
        <Grid container>
          <Grid item xs/>
            <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
                <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>
                  <Box sx={{...boxStyle, position: 'relative', width: { xs: '100%', sm: '70%' }, height: '600px', marginX: 'auto', marginBottom: '10px' }}>
                    <div>
                        <ul style={{ position: 'absolute', top: '15%', left: '7%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                          <li style={{ listStyleType: 'none', marginBottom: '10px' }}>가게 이름</li>
                          <li style={{ listStyleType: 'none', marginBottom: '10px' }}>평점</li>
                          <li style={{ listStyleType: 'none', marginBottom: '10px' }}>작성 날짜</li>
                          <li style={{ listStyleType: 'none', marginBottom: '10px' }}>메뉴</li>
                        </ul>
                        <ul>
                          <li style={{ listStyleType: 'none', marginTop: '10px', marginBottom: '10px' }}>
                              <img src={'/img/01.jpg'} style={{ width: '20%', height: '40%', position: 'absolute', top: '27%', left: 0 }} />
                          </li>
                        </ul>
                        <ul style={{ position: 'absolute', top: '70%', left: '5%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                          <li style={{ listStyleType: 'none', marginBottom: '10px' }}>리뷰</li>  
                        </ul>
                    </div>
                  </Box>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontSize: '1.1rem' }}>
                  리뷰 수정
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontSize: '1.1rem', marginLeft: '100px' }}>
                  리뷰 삭제
                </Button>
            </Grid>
        <Grid item xs />
        </Grid>
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

