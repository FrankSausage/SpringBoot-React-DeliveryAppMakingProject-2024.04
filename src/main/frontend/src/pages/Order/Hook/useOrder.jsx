import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useOrder (email, orderId) {
  const queryClinet = useQueryClient();

  const getOrderDetailByOrderId = useQuery({
    queryKey: ['userOrderDetail', orderId],
    queryFn: () => { return axios.get(`/dp/order/detail`, {params: {email: email, orderId: orderId}})},
    enabled: !!orderId
  })
  
  const postOrderRegist = useMutation({
    mutationFn: orderData => {
      axios.post(`/dp/order/register`, orderData)
    },
    onSuccess: res => {console.log('전송성공', res); alert('주문내역이 성공적으로 전송 되었습니다.');},
    onError: () => {alert('주문내역이 전송에 실패 하였습니다.')}
  })

  const deleteOrderByOrderId = useMutation ({
    mutationFn: orderId => {
      axios.post(`/dp/order/delete`, {orderId: orderId})
    },
    onSuccess: () => {
      alert('주문내역 삭제 요청에 성공 하였습니다.'); 
      queryClinet.invalidateQueries(['userOrderList'])
    },
    onError: () => {alert('주문내역 삭제 요청에 실패 하였습니다.')},
  })

  return { postOrderRegist, getOrderDetailByOrderId, deleteOrderByOrderId }
}

export function useOrderList(email, isOpen) {

  const getOrderListByEmail = useQuery({
    queryKey: ['orderList'],
    queryFn: () => { return axios.get(`/dp/order/list`, {params: {email: email}}) },
    refetchInterval: 6000,
    refetchIntervalInBackground: true,
    staleTime: 1000 * 60 * 5,
    enabled: !!email && isOpen,
  })

  return { getOrderListByEmail }
}

export function useTossOrder () {
  
  const postOrderToss = useMutation({
    mutationFn: orderData => {
      axios.post(`/dp/payment/confirm`, orderData)
    },
    onSuccess: () => {alert('결제에 성공하였습니다.')},
    onError: () => {alert('결제에 실패하였습니다.')}
  })

  return { postOrderToss}
}