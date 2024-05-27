import { Box, Button, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useReview } from "../Hook/useReview";
import { useNavigate } from "react-router";

export default function MyReview() { 
  const email = localStorage.getItem('email')
  const navigate = useNavigate()
  const { getMyReviewList: {isLoading, data: reviewData } } = useReview(email);

  return(
    <Box>
      {isLoading && <Typography>로딩 중...</Typography>}
      {!isLoading && !reviewData && 
      <Fragment>
      <Typography>아직 리뷰를 남긴 가게가 없어요!</Typography>
      <Button variant="contained" onClick={() => navigate('/OrderList')}>리뷰 쓰러 가기</Button>
      </Fragment>
      }
      {!isLoading && reviewData &&
        <Fragment>
          <Grid container>
            <Grid item xs />
            <Grid item xs={8}>
              {reviewData.data}  
            </Grid>
            <Grid item xs />
          </Grid>
        </Fragment>
      }
    </Box>
  )
}