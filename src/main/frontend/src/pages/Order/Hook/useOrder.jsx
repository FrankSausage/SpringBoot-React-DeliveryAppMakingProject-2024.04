import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useOrder() {

  const postOrderRegist = useMutation({
    mutationFn: orderData => {
      axios.post(`/dp/order/register`, orderData)
    },
    onSuccess: () => {alert('주문내역이 성공적으로 전송 되었습니다.')},
    onError: () => {alert('주문내역이 전송에 실패 하였습니다.')}
  })

  return { postOrderRegist }
}