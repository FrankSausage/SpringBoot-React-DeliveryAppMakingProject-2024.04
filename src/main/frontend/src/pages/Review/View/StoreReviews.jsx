import { Box, Button, Card, CardContent, Grid, Rating, TextField, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import {  useStoreReviewList } from "../Hook/useReview";
import { useLocation, useNavigate, useParams } from "react-router";
import OwnerReviewRegister from "../OwnerReviewRegister";
import BackDrop from "../../../components/BackDrop";

export default function StoreReviews() { 
  const location = useLocation();
  const { storeId } =  useParams();
  const { storeId: ownerStoreId} = location.state;
  const [ openPortal, setOpenPortal ] = useState(false);
  const [ activeIndex, setActiveIndex ] = useState(0); 
  const { getStoreReviewList: {isLoading, data: storeReviewData }, deleteOwnerReview } = useStoreReviewList(ownerStoreId ? ownerStoreId : storeId);
  console.log(storeReviewData);
  
  const handleClick = (idx) => {
    setOpenPortal(!openPortal);
    setActiveIndex(idx);
  }

  const handleDelete = ceoReviewId => {
    deleteOwnerReview.mutate(ceoReviewId, {
      onSuccess: () => {alert('삭제에 성공했습니다.')},
    })
  }

  return(
    <Box>
      {isLoading && <BackDrop isLoading={isLoading} />}
      {!isLoading && storeReviewData && storeReviewData.data.reviewList.length===0 &&
      <Box sx={{height:500}}>
        <Typography variant="h2" sx={{textAlign:'center'}}>아직 유저 리뷰가 없어요!</Typography>
      </Box>
      }
      {!isLoading && storeReviewData &&
        <Fragment>
          <Grid container>
            <Grid item xs />
            <Grid item xs={8}>
              {storeReviewData.data.reviewList.map((data, idx) => (
                <Card key={idx} sx={{my: 2, p:2, border:1}}>
                  <Typography>유저 명: {data.userName}</Typography>
                  <Typography>레벨: {data.userGrade}</Typography>
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
                    { openPortal ?
                      (!data.ceoReviewContent && <Button onClick={() => handleClick(idx)} variant="contained">접기</Button>)
                      :
                      (!data.ceoReviewContent ? 
                        <Button onClick={() => handleClick(idx)} variant="contained">댓글 달기</Button> 
                        : 
                        <Button onClick={() => handleDelete(data.ceoReviewId)} color="error" variant="contained">댓글 삭제</Button>
                      )
                    }
                  {!data.ceoReviewContent && openPortal && activeIndex === idx && <OwnerReviewRegister isPortalOpen={{openPortal}} reviewId={data.reviewId}/>}
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