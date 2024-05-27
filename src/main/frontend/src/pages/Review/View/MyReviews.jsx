import { Box, Button, Card, CardContent, Grid, Rating, TextField, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useReview } from "../Hook/useReview";
import { useNavigate } from "react-router";

export default function MyReviews() { 
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
              {reviewData.data.reviewList.map((data, idx) => (
                <Card key={idx} sx={{mb:2, p:1, border:1}}>
                  <Typography>가게 명: {data.storeName}</Typography>
                  <Typography>작성 일: {data.createdDate.replace('T',' ')}</Typography>
                  <CardContent>
                    <Typography>별점 : <Rating value={data.rating} readOnly /></Typography>
                    {data.reviewPictureName && <img src={data.reviewPictureName} width={100} height={100} style={{margin: 30}}/>}
                    <TextField value={data.content} sx={{width:500}} maxRows={4} minRows={4} 
                          multiline InputProps={{ readOnly:true,}}/>
                  </CardContent>
                    {data.ceoReviewContent &&
                      <Box>
                        <Typography>작성 일: {data.ceoReviewCreatedDate.replace('T', ' ')}</Typography>
                        <TextField value={data.ceoReviewContent} sx={{width:500}} maxRows={4} minRows={4} 
                          multiline InputProps={{ readOnly:true,}}/>
                      </Box>
                    }
                </Card>
              ))}
            </Grid>
            <Grid item xs />
          </Grid>
        </Fragment>
      }
    </Box>
  )
}