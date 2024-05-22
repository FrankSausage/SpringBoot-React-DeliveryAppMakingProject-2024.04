import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { Fragment, useRef, useState } from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useOrder } from "./Hook/useOrder";
import { useNavigate } from "react-router";
import OrderDetail from "./OrderDetail";

export default function OrderList() {
  const email = localStorage.getItem('email')
  const navigate = useNavigate();
  const { getOrderListByEmail: {isLoading, data: orderData}} = useOrder(email);
  const [ openPortal, setOpenPortal ] = useState(false);
  const [ activeIndex, setActiveIndex ] = useState('');

  const handleClick = index => {
    setOpenPortal(!openPortal);
    setActiveIndex(index)
  }

  return (
    <Box>
      {isLoading && <Typography>로딩 중...</Typography>}
      {!isLoading && orderData && orderData.data.orders &&
        <Fragment>
          <Typography variant="h5">주문 내역</Typography>
          { orderData.data.orders.map((data, idx) => (
            <Fragment key={idx}>
              <Card sx={{mb: 1, border:1, cursor:'pointer'}} >
                  <Typography>가게 이름: {data.storeName}</Typography>
                <CardContent onClick={() => handleClick(idx)}>
                  <Typography>주문 번호: {data.orderId}</Typography>
                  <Typography>메뉴: {data.menuName} {(data.count > 0) ? ('외 ' + data.count + ' 건') : ''}</Typography>
                  <Typography>가격: {data.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                  <Typography>주문일자: {data.orderDate.replace('T', ' ')}</Typography>
                  <Typography>상태: {data.status}</Typography>
                </CardContent>
                {openPortal && activeIndex === idx && <OrderDetail isPortalOpen={{openPortal}} email={email} orderId={data.orderId}/>}
              </Card>
            </Fragment>
            ))
          }
        </Fragment>
      }
    </Box>
  );
}