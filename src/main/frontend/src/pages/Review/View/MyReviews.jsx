import { Box, Button, Card, CardContent, Dialog, Grid, Rating, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { Fragment } from "react";
import { useReview } from "../Hook/useReview";
import { useNavigate } from "react-router";
import BackDrop from "../../../components/BackDrop";

export default function MyReviews(props) { 
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const { handleOpen, reviewClose } = props;
  const { getMyReviewList: { isLoading, data: reviewData }, deleteMyReview } = useReview(email, handleOpen);

  const handleDelete = reviewId => {
    deleteMyReview.mutate(reviewId, {
      onSuccess: () => {alert('리뷰 삭제에 성공했습니다.')},
    });
  }

  return(
    <Dialog
      open={handleOpen}
      onClose={reviewClose}
      maxWidth="md"
      fullWidth
      sx={{ '& .MuiDialog-paper': { borderRadius: 2, ...paperStyle } }}
    >
      <Box sx={{ p: 3 }}>
        {isLoading && <BackDrop isLoading={isLoading} />}
        {!isLoading && reviewData && reviewData.data.reviewList.length === 0 &&
          <Card sx={{ m: 'auto', border: 1, width: '50%', height: 400, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
            <CardContent>
              <Typography>아직 리뷰를 남긴 가게가 없어요!</Typography>
            </CardContent>
          </Card>
        }
        {!isLoading && reviewData &&
          <Fragment>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={10} md={8}>
                <CloseIcon sx={CloseBoxStyle} onClick={reviewClose} />
                {reviewData.data.reviewList.map((data, idx) => (
                  <Card key={idx} sx={{...CardStyle, mb: 2, p: 2, border: 1, position: 'relative', textAlign: 'center', boxShadow: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
                    <Typography variant="h6" gutterBottom>가게 명: {data.storeName}</Typography>
                    <Typography variant="body2" color="textSecondary">작성 일: {data.createdDate.replace('T',' ')}</Typography>
                    <CardContent>
                      <Typography>별점 : <Rating value={data.rating} readOnly /></Typography>
                      {data.reviewPictureName && <img src={data.reviewPictureName} width={100} height={100} style={{ margin: 30 }} alt="review" />}
                      <TextField value={data.content} sx={{ width: '100%' }} maxRows={4} minRows={4} multiline InputProps={{ readOnly: true }} />
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Button onClick={() => handleDelete(data.reviewId)} color="error" variant="contained">리뷰 삭제</Button>
                    </Box>
                    {data.ceoReviewContent &&
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">사장님 댓글 작성 일: {data.ceoReviewCreatedDate.replace('T', ' ')}</Typography>
                        <TextField value={data.ceoReviewContent} sx={{ width: '100%' }} maxRows={4} minRows={4} multiline InputProps={{ readOnly: true }} />
                      </Box>
                    }
                  </Card>
                ))}
              </Grid>
            </Grid>
          </Fragment>
        }
      </Box>
    </Dialog>
  )
}

let CloseBoxStyle = {
  color: "black",
  cursor: 'pointer',
  position: "absolute",
  top: 16,
  right: 16,
  "&:hover": {
    color: 'crimson',
  }
}

const paperStyle = {
  height: '90vh',
  backgroundImage: 'url(/img/s01.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundBlendMode: 'lighten',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  p: 3,
  overflowY: 'auto'
};


const CardStyle = {
  backgroundImage: 'url(/img/ba.jpg)',
  backgroundSize: 'cover',
  backgroundColor: 'rgba(255, 255, 255, 1)',
};

