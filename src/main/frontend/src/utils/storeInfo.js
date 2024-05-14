import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useOwnerByEmail = (email, storeId) => {
    const { isLoading, error, data: store } = useQuery({
        queryKey: ['storeId', storeId, 'email', email],
        queryFn: async () => {
            return axios.get(`/dp/store/owner/update`, { params: { email: email, storeId: storeId }})
            .then(res => res.data)
            .catch(console.error);
        }
    })        
    return { isLoading, error, store };
}

export const useStoreListByEmail = email => {
  const { isLoading, error, data: storeData } = useQuery({
    queryKey: ['ownerStore', email ],
    queryFn: async () => {
        return axios.get(`/dp/store/list`, { params : { email : email }})
          .then(res => res.data)
          .catch(console.error);
    }
  })
  return { isLoading, error, storeData };
}

export const useStoreDeatilByEmail = (email ,storeId) => {
  const { isLoading, error, data: StoreDetailOwner } = useQuery({
    queryKey: ['storeDetail', email ,'detailStore', storeId ],
    queryFn: async () => {
        return axios.get(`/dp/store/detail`, { params: { email: email , storeId : storeId}})
          .then(res => res.data)
          .catch(console.error);
    }
  })
  return { isLoading, error, StoreDetailOwner };
}

export const useMenuListByStoreId = storeId => {

  const { isLoading, error, data: menuData } = useQuery({
    queryKey: ['storeMenuList', storeId ],
    queryFn: async () => {
        return axios.get(`/dp/store/menu/list`, { params: { storeId: storeId }})
          .then(res => res.data)
          .catch(console.error);
    }
  })
  return { isLoading, error, menuData };
}

export const useMenuUpByEmail = ( email, menuId) => {
  const { isLoading, error, data: menu } = useQuery({
      queryKey: ['menuList'],
      queryFn: async () => {
          return axios.get(`/dp/store/menu/update`, { params: { email: email, menuId: menuId }})
          .then(res => res.data)
          .catch(console.error);
      }
  })        
  return { isLoading, error, menu };
}



