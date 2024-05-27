import { Box, Button, Card, CardContent, Portal, Stack, TextField, Typography } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useStoreReviewList } from "./Hook/useReview";

export default function OwnerReviewRegister({ isPortalOpen, reviewId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [ownerReviewText, setOwnerReviewText] = useState('');
  const { postOwnerReview } = useStoreReviewList();
  useEffect(() =>{
    setShow(isPortalOpen.openPortal)
    if(!show) {
      setOwnerReviewText('');
    }
  }, [isPortalOpen.openPortal])

  const handleChange = e => {
    if(ownerReviewText.length > 300){
      if(e.nativeEvent.inputType==='deleteContentBackward') {
        setOwnerReviewText(e.target.value);
      }
      return;
    } else {
      setOwnerReviewText(e.target.value);
    }
  }

  const handleSubmit = () => {
  if (!ownerReviewText) {
    alert('댓글을 입력 해 주세요.');
    return;
  } else if(ownerReviewText.length < 10) {
    alert('댓글은 최소 10자 이상 입력해야 합니다.');
    return;
  }
  postOwnerReview.mutate({
    reviewId: reviewId,
    content: ownerReviewText,
  },
  {
    onSuccess: () => {alert('댓글 작성에 성공 하였습니다.');},
    onError: e => {alert('댓글 작성에 실패 하였습니다.'); console.error(e);}
  })
  }
  
  return (
    <Fragment>
      {show ? 
        <Box sx={{border: 1, width: 400}}>
          <Stack>
          <TextField type="text" sx={{width:400, mb:1}} minRows={4} maxRows={4} multiline onChange={e=> handleChange(e)}
            value={ownerReviewText} placeholder="댓글 내용을 입력하세요... (최소 10자)" required autoFocus />
          </Stack>
          <Button variant="contained" onClick={() => handleSubmit()} fullWidth>작성</Button>
        </Box>
        : 
        null
      }
    </Fragment>
  );
}