import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useOrderOwner(email, storeId) {
  
  const getOwnerOrderListByEmail = useQuery({
    queryKey: ['ownerOrderList', storeId],
    queryFn: () => {return axios.get(`/dp/order/owner/list`, {params: {storeId: storeId, email: email}})},
    enabled: !!email && !!storeId
  })

  

  return { getOwnerOrderListByEmail }
}

export const useOrderStatusAndDetail = (email, orderId) => {
  console.log(email)
  console.log(orderId)
  const getOwnerOrderDetail = useQuery({
    queryKey: ['ownerOrderDetail', orderId],
    queryFn: () => {return axios.get(`/dp/order/owner/detail`, {params: {email: email, orderId: orderId}})}
  })
  
  const getOrderStatus = useQuery({
    queryKey: ['orderStatus', orderId],
    queryFn: () => { return axios.get(`/dp/order/status/detail`, {params: {orderId: orderId}})},
  })
  return { getOwnerOrderDetail, getOrderStatus }
}