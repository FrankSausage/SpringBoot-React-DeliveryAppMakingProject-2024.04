import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useStore() {
  const queryClient = useQueryClient();

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

  const postChangeMenuStatus = useMutation({
    mutationFn: (menuStatus) => axios.post(`/dp/store/menu/status`, menuStatus),
    onSuccess: () => {queryClient.invalidateQueries(['storeMenuList'])},
    onError: e => { console.error(e) },
  })

  return { postMenuRegister, postStoreRegister, postChangeMenuStatus }
}