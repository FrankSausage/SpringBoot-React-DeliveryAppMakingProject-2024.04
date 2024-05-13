import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useStore(storeId) {
  const email = localStorage.getItem('email')

  const getStoreDetailByStoreId = useQuery({
    queryKey: ['storeDetail'],
    queryFn: () => {return axios.get(`/dp/store/detail`, {params : {email : email, storeId : storeId}})},
    enabled: !!storeId
  })

  const postMenuRegister = useMutation({
    mutationFn: menuData => axios.post(`/dp/store/menu/register`, menuData),
    onSuccess: () => {alert('메뉴 등록에 성공하였습니다.')},
    onError: () => {alert('메뉴 등록에 실패하였습니다!')}
  })

  const postStoreRegister = useMutation({
    mutationFn: storeData => axios.post(`/dp/store/owner/register`, storeData),
    onSuccess: () => {alert('가게 등록에 성공하였습니다.')},
    onError: () => {alert('가게 등록에 실패하였습니다!')},
  })

  return { getStoreDetailByStoreId, postMenuRegister, postStoreRegister }
}