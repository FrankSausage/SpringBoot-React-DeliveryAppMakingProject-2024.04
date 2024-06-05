import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useOrderOwner } from "./Hook/useOrderOwner";
import OwnerOrderDetail from "./OwnerOrderDetail";
import BackDrop from "../../components/BackDrop";

export default function OwnerOrderList() {
  const location = useLocation();
  const email = localStorage.getItem('email');
  const { storeId, storeName } = location.state;
  const { getOwnerOrderListByEmail: { isLoading, data: orderData }, updateOrderStatus } = useOrderOwner(email, storeId);
  const [openPortal, setOpenPortal] = useState(false);
  const [activeIndex, setActiveIndex] = useState('');

  const handleClick = index => {
    setOpenPortal(!openPortal);
    setActiveIndex(index);
  }

  const handleUpdateStatus = orderId => {
    if (window.confirm('주문을 접수 받으시겠습니까?')) {
      updateOrderStatus.mutate({ orderId: orderId, status: '조리중' }, {
        onSuccess: () => {console.log("Order updated: ", orderData)},
        onError: e => {console.error("mutation error: ", e)}, })
    } else {
      return;
    }
  }


  return (
    <Box sx={{ padding: 3, backgroundColor: '#f0f2f5' }}>
      {isLoading && <BackDrop isLoading={isLoading} />}
      {!isLoading && orderData &&
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ textAlign: 'center', my: 3, fontWeight: 'bold', color: '#3f51b5' }}>주문 내역</Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <Typography variant="h5" sx={{ textAlign: 'center', my: 2, color: '#3f51b5' }}>{storeName}</Typography>
            {orderData.data.orders.map((menu, idx) => (
              <Card key={idx} sx={{
                my: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2), 0 12px 40px rgba(0,0,0,0.2)',
                }
              }} variant="outlined">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>주문 번호: {menu.orderId}</Typography>
                <CardContent onClick={() => handleClick(menu.orderId)} sx={{ cursor: 'pointer' }}>
                  <Typography variant="body1" sx={{ color: '#555555' }}>메뉴 명: {menu.menuName} {(menu.count !== 0) ? '외 ' + menu.count + '개' : ''}</Typography>
                  <Typography variant="body1" sx={{ color: '#555555' }}>최종 금액: {menu.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                  <Typography variant="body1" sx={{ color: (menu.status === '완료' ? 'green' : 'blue') }}>주문 상태: {menu.status}</Typography>
                </CardContent>
                <CardActions>
                  {menu.status === '접수대기' ?
                    <Button variant="contained" sx={{
                      backgroundColor: '#ff9800',
                      color: '#ffffff',
                      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                      '&:hover': {
                        backgroundColor: '#ff5722',
                      }
                    }} onClick={() => handleUpdateStatus(menu.orderId)}>주문 접수하기</Button>
                    :
                    <Button variant="contained" disabled sx={{
                      backgroundColor: '#cccccc',
                      color: '#ffffff',
                      boxShadow: '0 3px 5px 2px rgba(204, 204, 204, .3)',
                    }}>주문 접수하기</Button>
                  }
                </CardActions>
                {openPortal && activeIndex === menu.orderId && <OwnerOrderDetail isPortalOpen={{ openPortal }} email={email} orderId={menu.orderId} />}
              </Card>
            ))}
          </Grid>
        </Grid>
      }
    </Box>
  );
}
