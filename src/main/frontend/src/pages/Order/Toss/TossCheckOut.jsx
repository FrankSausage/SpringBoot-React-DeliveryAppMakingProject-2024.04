import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

export default function TossChackOut(props) {
  const { handleOpen, tossClose, storeId, userEmail, point, totalPrice} = props;
  const paymentWidgetRef = useRef(null);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(process.env.REACT_APP_WIDGET_CLIENT_KEY, process.env.REACT_APP_CUSTOMER_KEY);
      paymentWidgetRef.current = paymentWidget;
      paymentWidget.renderPaymentMethods('#payment-widget', totalPrice);
      console.log('TossPayment Loaded.')
    })()
  }, [])

  const handleClick = async () => {
    const paymentWidget = paymentWidgetRef.current
    
    try {
      await paymentWidget.requestPayment({
        orderId: 'oid-' + storeId + point + totalPrice,
        orderName: '테스트 티셔츠 외 2건',
        customerName: userEmail,
        customerEmail: userEmail,
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      })
    } catch(e) {
      console.log(e);
    }
  }

  return(
    <Dialog 
    open={handleOpen} 
    keepMounted
    sx={{ '& .MuiDialog-paper': { borderRadius: 2,} }}
    >
      <Box>
        <Typography variant="h5" sx={{textAlign:'center', fontWeight: 'bold', mt: 4, mb: 5}}>결제</Typography>
        <CloseIcon sx={CloseBoxStyle} onClick={tossClose} />
        <Box id='payment-widget' sx={{border:1, width:500, height:500}} />
        <Button variant="contained" sx={{ marginTop: 3 }} onClick={() => handleClick()}>결제하기</Button>
      </Box>
    </Dialog>
  );
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