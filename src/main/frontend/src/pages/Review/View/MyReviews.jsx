import { Box, Button, Card, CardContent, Dialog, Grid, Rating, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { Fragment } from "react";
import { useReview } from "../Hook/useReview";
import { useNavigate } from "react-router";
import BackDrop from "../../../components/BackDrop";

export default function MyReviews(props) { 
  const email = localStorage.getItem('email')
  const navigate = useNavigate()
  const {handleOpen, reviewClose} = props;
  const { getMyReviewList: {isLoading, data: reviewData }, deleteMyReview } = useReview(email, handleOpen);

  const handleDelete = reviewId => {
    deleteMyReview.mutate(reviewId, {
      onSuccess: () => {alert('리뷰 삭제에 성공했습니다.')},
    })
  }
  return(
    <Dialog
    open={handleOpen}
    keepMounted
    >
    <Box>
      {isLoading && <BackDrop isLoading={isLoading} />}
      {!isLoading && reviewData && reviewData.data.reviewList.length===0 &&
        <Card sx={{m: 'auto',border:1, width: '50%', height: 400, alignContent:'center'}}>
          <CloseIcon sx={CloseBoxStyle} onClick={() => reviewClose()} />
          <CardContent sx={{textAlign:'center'}}>
            <Typography >아직 리뷰를 남긴 가게가 없어요!</Typography>
          </CardContent>
        </Card>
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
                  <Button onClick={() => handleDelete(data.reviewId)} color="error" variant="contained">리뷰 삭제</Button>
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
    </Dialog>
  )
}

let CloseBoxStyle = {
  color:"black",
  border:1,
  cursor:'pointer',
  position:"absolute",
  borderWidth:2,
  borderRadius:"20%",
  top: 0,
  right: 0,
  m:1,
  "&:hover": {
    color: 'crimson',
  }
}