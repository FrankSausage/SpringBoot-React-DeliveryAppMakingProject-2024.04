import { Box, Card, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDibs } from "../Hook/useDibs";
import SearchHeader from "../../../components/SearchHeader";

export default function Dibs() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const { getDibsListByEmail: { isLoading, data: dibsData } } = useDibs(email);

  const handleNav = storeId => {
    navigate(`/StoreDetail/${storeId}`);
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <Box>
      <SearchHeader />
      <Paper elevation={3} sx={{height: '100vh', backgroundImage: 'url(/img/sl0.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', p: 2, overflowY: 'auto' }}>
      <Typography variant="body1" onClick={handleBack} sx={{ cursor: 'pointer', textAlign: 'left', float: 'left' }}>
        뒤로가기
      </Typography>
      {isLoading && <Typography>로딩 중...</Typography>}
      {!isLoading && !dibsData.data && <Typography variant="h4">아직 찜한 가게가 없어요!</Typography>}
      {!isLoading && dibsData.data &&
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', my: 2 }}>
              <Typography variant="h4">내가 찜한 가게</Typography>
            </Box>
          </Grid>
          <Grid container item xs={12} spacing={5} justifyContent="center">
            {dibsData.data.dibsList.map((data, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} lg={4} xl={4}>
                <Card onClick={() => handleNav(data.storeId)} sx={{ cursor: 'pointer', p: 2, mb: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item>
                      <CardMedia component='img' image={data.storePictureName} sx={{ width: 113, height: 113 }} />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6">{data.storeName.length > 6 ? `${data.storeName.slice(0, 6)}...` : data.storeName}</Typography>
                      <CardContent>
                        <Typography>별 점: {data.rating}</Typography>
                        <Typography>리뷰 수: {data.reviewCount}</Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      }
      </Paper>
    </Box>
  );
}
