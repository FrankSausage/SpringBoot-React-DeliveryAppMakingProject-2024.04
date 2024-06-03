import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useOrder } from "./Hook/useOrder";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import BackDrop from "../../components/BackDrop";

export default function OrderDetail({ isPortalOpen, email, orderId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { deleteOrderByOrderId, getOrderDetailByOrderId: { isLoading, data: orderDetailData } } = useOrder(email, orderId);

  useEffect(() => {
    setShow(isPortalOpen.openPortal)
    if (!show) {
      queryClient.invalidateQueries(['userOrderDetail'])
    }
  }, [isPortalOpen.openPortal])

  const handleDelete = () => {
    deleteOrderByOrderId.mutate(orderId, {
      onSuccess: () => { navigate('/') }
    })
  }

  return (
    <Fragment>
      {show ? 
        <Box sx={{ border: 1, borderRadius: 2, padding: 3, maxWidth: 600, margin: 'auto', backgroundColor: '#f9f9f9', boxShadow: 3 }}>
          {isLoading && <BackDrop isLoading={isLoading} />}
          {!isLoading && orderDetailData &&
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>상세 주문 내역서</Typography>
            <Typography>주소: {orderDetailData.data.address}</Typography>
            <Typography>배달료: {orderDetailData.data.deliveryTip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
            <Typography>결제 방식: {orderDetailData.data.paymentMethod}</Typography>
            {orderDetailData.data.menus && orderDetailData.data.menus.map((menuData, menuIdx) => (
              <Card key={menuIdx} sx={{ border: 1, borderRadius: 2, marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{menuData.menuName}</Typography>
                  <Typography>가격: {menuData.menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                  <Typography>수량: {menuData.quantity}개</Typography>
                  {menuData.menuOptions && menuData.menuOptions.map((optionData, optionIdx) => (
                    <Stack key={optionIdx} direction="row" justifyContent="space-between">
                      <Typography>{optionData.menuOptionName}</Typography>
                      {optionData.menuOptionPrice !== 0 &&
                      <Typography>+{optionData.menuOptionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                      }
                    </Stack>
                  ))}
                </CardContent>
              </Card>
            ))}
            <Button variant="contained" color="error" sx={{ width: '100%' }} onClick={handleDelete}>주문내역 삭제</Button>
          </Stack>
          }
        </Box>
        : 
        null
      }
    </Fragment>
  );
}
