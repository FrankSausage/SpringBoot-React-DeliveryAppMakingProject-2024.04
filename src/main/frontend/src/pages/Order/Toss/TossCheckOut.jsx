import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

export default function TossCheckOut(props) {
  const { handleOpen, tossClose, storeId, userEmail, point, totalPrice } = props;
  const paymentWidgetRef = useRef(null);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(process.env.REACT_APP_WIDGET_CLIENT_KEY, process.env.REACT_APP_CUSTOMER_KEY);
      paymentWidgetRef.current = paymentWidget;
      paymentWidget.renderPaymentMethods('#payment-widget', totalPrice);
      console.log('TossPayment Loaded.')
    })()
  }, [totalPrice])

  const handleClick = async () => {
    const paymentWidget = paymentWidgetRef.current;
    
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

  return (
    <Dialog
      open={handleOpen} 
      keepMounted
      sx={{ '& .MuiDialog-paper': { borderRadius: 2, padding: 1, maxWidth: 600, width: '100%' } }}
    >
      <Box sx={{ position: 'relative', padding: 2 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb:2, fontWeight: 'bold' }}>결제 방식 선택</Typography>
        <CloseIcon sx={CloseBoxStyle} onClick={tossClose} />
        <Box id='payment-widget' sx={PaymentWidgetStyle}>
        </Box>
        {/* <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>{totalPrice}원</Typography>s */}
        <Button 
          variant="contained" 
          onClick={() => handleClick()} 
          sx={ButtonStyle}
        >
          결제하기
        </Button>
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

let PaymentWidgetStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: 8,
  width: '100%',
  height: 500,
  padding: 2,
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

let ButtonStyle = {
  marginTop: 3,
  backgroundColor: '#1976d2',
  fontSize: 18,
  fontWeight: 'bold',
  padding: '10px 20px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  '&:hover': {
    backgroundColor: '#1565c0',
  }
}
