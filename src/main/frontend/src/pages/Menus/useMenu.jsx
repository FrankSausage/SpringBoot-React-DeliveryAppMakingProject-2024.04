import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useMenu(menuId, email) {
  const queryClient = useQueryClient();
  
  const getMenuDetailByMenuId = useQuery({
    queryKey: ['menuDetailInfo', menuId],
    queryFn: () => { return axios.get(`/dp/store/menu/update`, {params: {menuId : menuId, email: email}})}
  });

  const postMenuOption = useMutation({
    mutationFn: (menuOption) => { axios.post(`/dp/store/menuoption/register`, 
    menuOption)},
    onSuccess: () => {
      queryClient.invalidateQueries(['menuList'])
      alert('메뉴 옵션 등록이 완료되었습니다.')},
    onError: () => {alert('메뉴 옵션 등록에 실패하였습니다!')},
  })

  const deleteMenuOption = useMutation({
    mutationFn: (menuOptionId, email) => { axios.post(`/dp/store/menuoption/delete`, 
    {menuOptionId: menuOptionId, email: email})},
    onSuccess: () => {
      queryClient.refetchQueries(['menuList'])
      alert('메뉴 옵션 삭제에 성공하였습니다.')},
    onError: () => {alert('메뉴 옵션 삭제에 실패하였습니다!')}
  })

  const updateMenuOption = useMutation({
    mutationFn: (menuOption) => { axios.post(`/dp/store/menuoption/update`, 
    menuOption)},
    onSuccess: () => {
      queryClient.refetchQueries(['menuList'])
      alert('메뉴 옵션 수정에 성공하였습니다.')},
    onError: () => {alert('메뉴 옵션 수정에 실패하였습니다!')}
  })

  return { getMenuDetailByMenuId, postMenuOption, deleteMenuOption, updateMenuOption }
}