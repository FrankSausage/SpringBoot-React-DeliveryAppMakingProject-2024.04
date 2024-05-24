import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDibs } from "../Hook/useDibs";

export default function Dibs() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email')
  const { getDibsListByEmail: {isLoading, data: dibsData} } = useDibs(email);

  const handleNav = storeId => {
    navigate(`/StoreDetail/${storeId}`)
  }
  return(
    <Box>
      {isLoading && <Typography>로딩 중...</Typography>}
      {!isLoading && !dibsData.data && <Typography variant="h4">아직 찜한 가게가 없어요!</Typography>}
      {!isLoading && dibsData.data && 
      <Grid container>
        <Grid item xs/>
        <Grid item xs={8}>
          {dibsData.data.dibsList.map((data, idx) => (
          <Card key={idx} onClick={() => handleNav(data.storeId)} sx={{cursor:'pointer', p:2}}>
            <CardMedia component={'img'} image={data.storePictureName} alt="가게 이미지" />
            <Typography>가게 명: {data.storeName}</Typography>
            <CardContent>
              <Typography>별 점: {data.rating}</Typography>
              <Typography>리뷰 수: {data.reviewCount}</Typography>
            </CardContent>
          </Card> 
          ))
          }
        </Grid>
        <Grid item xs/>
      </Grid>
      }
    </Box>
  );
}