import { Box, } from "@mui/material";
import { useEffect } from "react";
import { useOrder } from "../Hook/useOrder";
import { useNavigate } from "react-router";

export function Success() {
  const navigate = useNavigate()
  const tossTemp = sessionStorage.getItem('tossTemp') ? JSON.parse(sessionStorage.getItem('tossTemp')) : '';
  const { postOrderRegist } = useOrder();
  
  useEffect(() => {
    if(tossTemp){
      postOrderRegist.mutate({
        storeId: tossTemp.storeId,
        userEmail: tossTemp.userEmail,
        deliveryUserEmail: tossTemp.deliveryUserEmail,
        paymentMethod: tossTemp.paymentMethod,
        point: tossTemp.point,
        totalPrice: (tossTemp.point > 0) ? ((tossTemp.totalPrice - tossTemp.point) <= 0 ? 0 : (tossTemp.totalPrice - tossTemp.point)) : tossTemp.totalPrice,
        request: tossTemp.request,
        address: tossTemp.address,
        menus: tossTemp.menus
      }, {
        onSuccess: () => {
          localStorage.removeItem('cartItems');
          sessionStorage.removeItem('tossTemp');
          alert('결제가 성공적으로 진행 되었습니다.');
          navigate('/');
        },
        onError: e => {console.log(e)},
      })
    } else {
      alert('잘못된 접근입니다.');
      navigate('/')
    }
  }, [])

  return (
    <Box>
    </Box>
  );
}