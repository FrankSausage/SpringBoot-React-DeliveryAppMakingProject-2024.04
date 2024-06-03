import { Box, Button, Card, CardContent, Dialog, Paper, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useOrderList } from "./Hook/useOrder";
import OrderDetail from "./OrderDetail";
import ReviewRegister from "../Review/ReviewRegister";
import BackDrop from "../../components/BackDrop";
import { useNavigate } from "react-router";

export default function OrderList(props) {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const { handleOpen, orderClose } = props;
  const [openPortal, setOpenPortal] = useState(false);
  const [activeIndex, setActiveIndex] = useState('');
  const { getOrderListByEmail: { isLoading, data: orderData } } = useOrderList(email, handleOpen);

  const handleClick = index => {
    setOpenPortal(!openPortal);
    setActiveIndex(index);
  }

  const handleNav = storeId => {
    navigate(`/StoreDetail/${storeId}`);
  }

  return (
    <Dialog
      open={handleOpen}
      keepMounted
      onClose={() => orderClose()}
      PaperProps={{
        style: {
          borderRadius: 20,
          backgroundColor: '#f7f7f7',
          padding: '20px',
          maxWidth: '600px',
          width: '100%',
          ...paperStyle
        }
      }}
    >
      <Box sx={{ padding: 2 }}>
        {isLoading && <BackDrop isLoading={isLoading} />}
        {!isLoading && !orderData && <Typography variant="h5">아직 주문한 내역이 없어요!</Typography>}
        {!isLoading && orderData && orderData.data.orders &&
          <Fragment>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>주문 내역</Typography>
            <CloseIcon sx={CloseBoxStyle} onClick={() => orderClose()} />
            {orderData.data.orders.map((data, idx) => (
              <Fragment key={idx}>
                <Card sx={CardStyle}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography onClick={() => handleNav(data.storeId)} variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1, "&:hover": { color: 'coral' } }}>
                      <ListAltIcon sx={{ mr: 1, color: '#1976d2' }} /> {data.storeName}
                    </Typography>
                    <Typography variant="body1">주문일자: {data.orderDate.replace('T', ' ')}</Typography>
                    <Typography variant="body1">주문 번호: {data.orderId}</Typography>
                    <Typography variant="body1">메뉴: {data.menuName} {(data.count > 0) && (`외 ${data.count} 건`)}</Typography>
                    <Typography variant="body1">가격: {data.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                    <Typography variant="body1" sx={{ color: data.status === '완료' ? 'green' : 'blue' }}>상태: {data.status}</Typography>
                  </CardContent>
                  {!data.reviewed ?
                    <ReviewRegister sx={{ mb: 3 }} orderId={data.orderId} status={data.status} email={email} />
                    :
                    null
                  }
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 3 }}>
                    <Button variant="outlined" onClick={() => handleClick(idx)}>
                      {openPortal && activeIndex === idx ? '상세 주문 내역 닫기' : '상세 주문 내역 보기'}
                    </Button>
                  </Box>
                  {openPortal && activeIndex === idx && <OrderDetail isPortalOpen={{ openPortal }} email={email} orderId={data.orderId} />}
                </Card>
              </Fragment>
            ))}
          </Fragment>
        }
      </Box>
    </Dialog>
  );
}

const CloseBoxStyle = {
  color: "black",
  border: 1,
  cursor: 'pointer',
  position: "absolute",
  borderWidth: 2,
  borderRadius: "20%",
  top: 0,
  right: 0,
  m: 1,
  "&:hover": {
    color: 'crimson',
  }
}

const CardStyle = {
  mb: 2,
  border: 1,
  boxShadow: 3,
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  "&:hover": {
    transform: 'scale(1.02)',
    boxShadow: 5,
  },
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: '16px',
}

const paperStyle = {
  height: '90vh',
  backgroundImage: 'url(/img/sl0.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundBlendMode: 'lighten',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  p: 3,
  overflowY: 'auto'
};