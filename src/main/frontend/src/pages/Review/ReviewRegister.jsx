import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Slide, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useReview } from "./Hook/useReview";
import { uploadImageToCloudinary } from "../../utils/uploader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReviewRegister({ orderId, status, email }) {
  const [ open, setOpen ] = useState(false)
  const [ reviewText, setReviewText ] = useState('');
  const [ rating, setRating ] = useState(0);
  const [ reviewImage, setReviewImage ] = useState('');
  const { postReviewRegister } = useReview()
  const [ isImageUploading, setIsImageUploading ] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setReviewText('');
    setRating(0);
    setReviewImage('');
    setOpen(false);
  }

  const handleChange = e => {
    if(reviewText.length > 100){
      if(e.nativeEvent.inputType==='deleteContentBackward'){
        setReviewText(e.target.value);
      }
      return;
    } else {
      setReviewText(e.target.value);
    }
  }

  const handleSubmit = () => {
    if(isImageUploading) {
      return;
    }

    if(!rating) {
      alert('별 점을 입력 해 주세요.')
      return;
    } else if(!reviewText){
      alert('리뷰를 작성 해 주세요.')
      return;
    } else if(reviewText && reviewText.length <= 10) {
      alert('리뷰는 최소 10자 이상 작성하셔야 합니다.')
      return;
    }
    postReviewRegister.mutate({
      email: email,
      orderId: orderId,
      rating: rating,
      content: reviewText,
      reviewPictureName: reviewImage
    }, {
      onSuccess: () => {
        alert('리뷰를 성공적으로 등록하였습니다.'); 
        handleClose();
      },
      onError: e => {alert('리뷰 등록에 실패하였습니다.'); console.error(e);}
    })

  }

  const handleFileUpload = (e) => {
    if(e.target.files) {
      setIsImageUploading(true);
      uploadImageToCloudinary(e.target.files[0])
        .then(url => setReviewImage(url))
        .then(() => setIsImageUploading(false))
        .catch(console.error);
    }
  }

  return(
    <Fragment>
      {status==='조리중' ?
      <Button variant="outlined" onClick={handleOpen} fullWidth>리뷰 쓰기</Button>
      :
      null
      }
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle>리뷰 작성</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mb:2}}>별점: <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} required/> </DialogContentText>
          <TextField type="text" sx={{width:400, }} minRows={4} maxRows={4} multiline onChange={e=> handleChange(e)}
            value={reviewText} placeholder="ex) 친절하고 맛있어요. (100자 제한)" required />
        </DialogContent>
            {reviewImage && <img src={reviewImage} width={100} height={100} style={{margin: 30}}/>}
            <input accept='.png, .jpeg, .jpg' id='upload-photo' type="file" style={{display: 'none'}} onChange={handleFileUpload}/>
            {isImageUploading ? 
            <Button variant="contained" disabled>이미지 등록</Button>
            :
            <Button variant="contained" onClick={() => document.getElementById('upload-photo').click()}>이미지 등록</Button>
            }
        <DialogActions sx={{justifyContent:'center'}}>
          {isImageUploading ? 
            <Button variant="contained" disabled>리뷰 등록</Button> 
            :
            <Button variant="outlined" onClick={handleSubmit}>리뷰 등록</Button> 
          }
          <Button variant="outlined" color="error" onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}