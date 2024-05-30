import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

export default function TossChackOut() {
  const location = useLocation();
  const { storeId, userEmail, point, totalPrice, } = location.state;
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
    <Box>
      <Typography variant="h2" sx={{textAlign:'center', mb: 5}}>주문서</Typography>
      <Box id='payment-widget' sx={{border:1}} />
      <Button variant="contained" onClick={() => handleClick()}>{totalPrice}원 결제하기</Button>
    </Box>
  );
}