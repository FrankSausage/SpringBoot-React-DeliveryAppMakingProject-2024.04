import { Box, Button, Card, CardContent, Grid, Paper, Rating, TextField, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useStoreReviewList } from "../Hook/useReview";
import { useLocation, useNavigate, useParams } from "react-router";
import OwnerReviewRegister from "../OwnerReviewRegister";
import BackDrop from "../../../components/BackDrop";
import SearchHeader from "../../../components/SearchHeader";
import { useQueryClient } from "@tanstack/react-query";

export default function StoreReviews() { 
  const location = useLocation();
  const role = localStorage.getItem('role');
  const { storeId } = useParams();
  const { storeId: ownerStoreId } = location.state ? location.state : '';
  const [openPortal, setOpenPortal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); 
  const queryClient = useQueryClient();
  const { getStoreReviewList: { isLoading, data: storeReviewData }, deleteOwnerReview } = useStoreReviewList(ownerStoreId ? ownerStoreId : storeId);

  const handleClick = (idx) => {
    setOpenPortal(!openPortal);
    setActiveIndex(idx);
  }

  const handleDelete = ceoReviewId => {
    deleteOwnerReview.mutate(ceoReviewId, {
      onSuccess: () => { alert('삭제에 성공했습니다.') },
    })
  }

  return (
    <Box>
      {/* {role === '점주' && <SearchHeader />} */}
      {/* <Paper elevation={3} sx={{ height: 'auto', backgroundImage: 'url(/img/Okitchen.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', p: 2 }}> */}
        {isLoading && <BackDrop isLoading={isLoading} />}
        {!isLoading && storeReviewData && storeReviewData.data.reviewList.length === 0 &&
          <Box sx={{ height: 500 }}>
            <Typography variant="h2" sx={{ textAlign: 'center' }}>아직 리뷰가 없어요!</Typography>
          </Box>
        }
        {!isLoading && storeReviewData && queryClient &&
          <Fragment>
            <Grid container >
              <Grid item xs />
              <Grid item xs={8}>
                {storeReviewData.data.reviewList.map((data, idx) => (
                  <Card key={idx} sx={{ my: 2, p: 2, border: 1 }}>
                    <Typography>유저 명: {data.userName}</Typography>
                    <Typography>레벨: {data.userGrade}</Typography>
                    <Typography>작성 일: {data.createdDate.replace('T', ' ')}</Typography>
                    <CardContent>
                      <Typography><Rating value={data.rating} readOnly /></Typography>
                      {data.reviewPictureName && <img src={data.reviewPictureName} width={100} height={100} style={{ margin: 30 }} />}
                      <TextField value={data.content} sx={{ width: 500 }} maxRows={4} minRows={4}
                        multiline InputProps={{ readOnly: true, }} />
                    </CardContent>
                    {data.ceoReviewContent &&
                      <Box>
                        <Typography>작성 일: {data.ceoReviewCreatedDate.replace('T', ' ')}</Typography>
                        <TextField value={data.ceoReviewContent} sx={{ width: 500 }} maxRows={4} minRows={4}
                          multiline InputProps={{ readOnly: true, }} />
                      </Box>
                    }
                    {role === '점주' &&
                      <Fragment>
                        {openPortal ?
                          (!data.ceoReviewContent && <Button onClick={() => handleClick(idx)} variant="contained">접기</Button>)
                          :
                          (!data.ceoReviewContent ?
                            <Button onClick={() => handleClick(idx)} variant="contained">댓글 달기</Button>
                            :
                            <Button onClick={() => handleDelete(data.ceoReviewId)} color="error" variant="contained">댓글 삭제</Button>
                          )
                        }
                        {!data.ceoReviewContent && openPortal && activeIndex === idx && <OwnerReviewRegister isPortalOpen={{ openPortal }} reviewId={data.reviewId} />}
                      </Fragment>
                    }
                  </Card>
                ))}
              </Grid>
              <Grid item xs />
            </Grid>
          </Fragment>
        }
      {/* </Paper> */}
    </Box>
  )
}
