import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useOrderOwner(email, storeId) {
  const queryClient = useQueryClient();

  const getOwnerOrderListByEmail = useQuery({
    queryKey: ['orderList'],
    queryFn: () => {return axios.get(`/dp/order/owner/list`, {params: {storeId: storeId, email: email}})},
    enabled: !!email && !!storeId
  })

  // status = '접수대기', '조리중', '배달중', '완료', '삭제'
  const updateOrderStatus = useMutation({
    mutationFn: status => {axios.post(`/dp/order/modify`, status)},
    onSuccess: () => {
      alert('주문이 접수 되었습니다.')
      queryClient.refetchQueries('orderList')
    },
    onError: e => {console.error('에러 발생!: ', e)}
  })

  return { getOwnerOrderListByEmail, updateOrderStatus }
}

export const useOrderDetail = (email, orderId) => {
  
  const getOwnerOrderDetail = useQuery({
    queryKey: ['ownerOrderDetail', orderId],
    queryFn: () => {return axios.get(`/dp/order/owner/detail`, {params: {email: email, orderId: orderId}})}
  })
  
  return { getOwnerOrderDetail }
}