import React, { Fragment, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useOrderDetail } from "./Hook/useOrderOwner";

export default function OwnerOrderDetail({ isPortalOpen, email, orderId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [ show, setShow ] = useState(false)
  const { getOwnerOrderDetail: {isLoading, data: orderDetail}} = useOrderDetail(email, orderId)

  useEffect(() =>{
    setShow(isPortalOpen.openPortal)
    if(!show) {
      queryClient.invalidateQueries(['ownerOrderList'])
    }
  }, [isPortalOpen.openPortal])
  return(
    <Fragment>
      {show ? 
        <Box>
          {isLoading && <Typography>로딩 중...</Typography>}
          {!isLoading && orderDetail && 
            <Stack>
              <Typography>주문 지역: {orderDetail.data.address.replace(',', ' ')}</Typography>
              <Typography>주문 일: {orderDetail.data.orderDate.replace('T', ' ')}</Typography>
              {orderDetail.data.menus.map((menu,idx)=>(
              <Box sx={{ml:1}}>
                <li key={idx}>
                  {menu.menuName} {menu.quantity}개
                  {menu.menuOptions.map((option,optionIdx) => 
                    (option.menuOptionName!==null && option.menuOptionPrice &&
                      <ul key={optionIdx}>
                        {option.menuOptionName} {option.menuOptionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                      </ul>
                    )
                  )}
                  <ul>{menu.menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</ul>
                </li>
              </Box>
              ))}
              <Typography>결제 방식: {orderDetail.data.paymentMethod}</Typography>
              <Typography>{orderDetail.data.requests ? '요청 사항: ' + orderDetail.data.requests : '요청 사항 없음'}</Typography>
            </Stack>
          }
        </Box>
        : null
      }
    </Fragment>
  )
}