import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useOrderList } from "./Hook/useOrder";
import OrderDetail from "./OrderDetail";
import ReviewRegister from "../Review/ReviewRegister";
import BackDrop from "../../components/BackDrop";

export default function OrderList() {
  const email = localStorage.getItem('email');
  const [ openPortal, setOpenPortal ] = useState(false);
  const [ activeIndex, setActiveIndex ] = useState('');
  const { getOrderListByEmail: {isLoading, data: orderData}} = useOrderList(email, openPortal);
  
  const handleClick = index => {
    setOpenPortal(!openPortal);
    setActiveIndex(index);
  }

  return (
    <Box>
      {isLoading && <BackDrop isLoading={isLoading} />}
      {!isLoading && !orderData && <Typography>아직 주문한 내역이 없어요!</Typography>}
      {!isLoading && orderData && orderData.data.orders &&
        <Fragment>
          <Typography variant="h5" sx={{ textAlign: 'center', mb:3 }}>주문 내역</Typography>
          {orderData.data.orders.map((data, idx) => (
            <Fragment key={idx}>
              <Card sx={{mb: 2, border: 1, boxShadow: 3, cursor: 'pointer'}}>
                <CardContent onClick={() => handleClick(idx)}>
                  <Typography variant="h6" component="div" sx={{display: 'flex', alignItems: 'center'}}>
                    <ListAltIcon sx={{mr: 1}} /> {data.storeName}
                  </Typography>
                  <Typography variant="body1">주문일자: {data.orderDate.replace('T', ' ')}</Typography>
                  <Typography variant="body1">주문 번호: {data.orderId}</Typography>
                  <Typography variant="body1">메뉴: {data.menuName} {(data.count > 0) && (`외 ${data.count} 건`)}</Typography>
                  <Typography variant="body1">가격: {data.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                  <Typography variant="body1" sx={{color: data.status === '완료' ? 'green' : 'blue'}}>상태: {data.status}</Typography>
                </CardContent>
                {!data.reviewed ? 
                  <ReviewRegister orderId={data.orderId} status={data.status} email={email} />
                  :
                  null
                }
                {openPortal && activeIndex === idx && <OrderDetail isPortalOpen={{openPortal}} email={email} orderId={data.orderId}/>}
              </Card>
            </Fragment>
          ))}
        </Fragment>
      }
    </Box>
  );
}
