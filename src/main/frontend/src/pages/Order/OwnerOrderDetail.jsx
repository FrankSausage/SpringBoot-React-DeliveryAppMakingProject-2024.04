import React, { Fragment, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useOrderStatusAndDetail } from "./Hook/useOrderOwner";

export default function OwnerOrderDetail({ isPortalOpen, email, orderId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [ show, setShow ] = useState(false)
  const { getOrderStatus:{isLoading: isStatusLoading, data: orderStatus }, 
          getOwnerOrderDetail: {isLoading, data: orderDetail}} = useOrderStatusAndDetail(email, orderId)

  useEffect(() =>{
    setShow(isPortalOpen.openPortal)
    if(!show) {
      queryClient.invalidateQueries(['ownerOrderList'])
    }
  }, [isPortalOpen.openPortal])
  console.log(email)
  console.log(orderStatus)
  return(
    <Fragment>
      {show ? 
        <Box>
          {isLoading && <Typography>로딩 중...</Typography>}
          {!isLoading && !isStatusLoading && orderDetail && orderStatus &&
            <Stack>
              어쩌구
            </Stack>
          }
        </Box>
        : null
      }
    </Fragment>
  )
}