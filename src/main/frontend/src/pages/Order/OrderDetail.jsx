import { Box, Button, Card, CardContent, Portal, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useOrder } from "./Hook/useOrder";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function OrderDetail({ isPortalOpen, email, orderId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { deleteOrderByOrderId , getOrderDetailByOrderId: {isLoading, error, data: orderDetailData} } = useOrder(email , orderId);

  useEffect(() =>{
    setShow(isPortalOpen.openPortal)
    if(!show) {
      queryClient.invalidateQueries(['userOrderDetail'])
    }
  }, [isPortalOpen.openPortal])

  const handleDelete = () => {
    deleteOrderByOrderId.mutate(orderId, {
      onSuccess: () => {navigate('/')}
    })
  }
  return (
    <Fragment>
      {show ? 
        <Box sx={{border: 1}}>
        {isLoading && <Typography>로딩 중...</Typography>}
        {!isLoading && orderDetailData &&
        <Stack>
          <Typography>주소 : {orderDetailData.data.address}</Typography>
          <Typography>배달료 : {orderDetailData.data.deliveryTip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
          <Typography>결제 방식 : {orderDetailData.data.paymentMethod}</Typography>
          {orderDetailData.data.menus && orderDetailData.data.menus.map((menuData, menuIdx) => (
            <Card key={menuIdx} sx={{ border: 1 }}> 
                <Typography>추가 구성: {menuData.menuName} {menuData.menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 {menuData.quantity}개</Typography>
              <CardContent>
                {menuData.menuOptions && menuData.menuOptions.map((optionData, optionIdx) => (
                  <Stack key={optionIdx}>
                    {optionData.menuOptionPrice!==0 &&
                    <Typography>{optionData.menuOptionName} +{optionData.menuOptionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                    }
                  </Stack>
                ))}
              </CardContent>
            </Card>
          ))}
          <Button color="error" sx={{border:1, my: 1, width: 500}} onClick={() => handleDelete()}>주문내역 삭제</Button>
        </Stack>
        }
        </Box>
        : 
        null
      }
    </Fragment>
  );
}