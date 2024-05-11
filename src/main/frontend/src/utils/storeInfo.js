import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getCurrentUser } from "./firebase";

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
  console.log(storeData)
  return { isLoading, error, storeData };
}

export function useStore (email) {
  console.log(email)
  const getStoreList = useQuery({
    queryKey: ['ownerList'],
    queryFn: () => {return axios.get(`/dp/store/list`, {params : { 'email' : email }})}
  })

  return { getStoreList }
}

export function useStoreInfoByEmail (email, storeId) {
  console.log(email)
  const getStoreInfoData = useQuery({
    queryKey: ['storeInfo'],
    queryFn: () => {return axios.get(`/dp/store/list`, {params : { 'email' : email , 'storeId' : storeId }})}
  })

  return { getStoreInfoData }
}

export const useStoreDeatilByEmail = (email ,storeId) => {
  const { isLoading, error, data: StoreDetailOwner } = useQuery({
    queryKey: ['storeDetail', email ,'DetailStore', storeId ],
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
    queryKey: ['StoreMenu', storeId ],
    queryFn: async () => {
        return axios.get(`/dp/store/menu/list`, { params: { storeId: storeId }})
          .then(res => res.data)
          .catch(console.error);
    }
  })
  return { isLoading, error, menuData };
}

export const useMenuByEmail =  email => {
  const { isLoading, error, data: storeData } = useQuery({
    queryKey: ['menuId', email ],
    queryFn: async () => {
        return axios.get(`/dp/store/menu/register`, { params: {email: email }})
          .then(res => res.data)
          .catch(console.error);
    }
  })
  return { isLoading, error, storeData };
}

export const useMenuUpByEmail = ( email, menuId) => {
  const { isLoading, error, data: menu } = useQuery({
      queryKey: ['email', email, 'menuId', menuId],
      queryFn: async () => {
          return axios.get(`/dp/store/menu/update`, { params: { email: email, menuId: menuId }})
          .then(res => res.data)
          .catch(console.error);
      }
  })        
  return { isLoading, error, menu };
}

export async function extractDataFromFormData(formData) {
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return await data;
  }

export const formatPhoneNumber = (phoneNumberValue) => {
  const strippedPhoneNumber = phoneNumberValue.replace(/\D/g, '');
  //  핸드폰 입력 formatting (e.g., XXX-XXXX-XXXX)
  const formattedPhoneNumber = strippedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  
  return formattedPhoneNumber;
  };

export function splitAddressFromCurrentUserAddress(currentAddress) {
    const splitAddress = currentAddress.toString().split(',');
    const roadAddress = (splitAddress[0] || '');
    const extraAddress = (splitAddress[1] || '');
    const detailAddress = (splitAddress[2] || '');

    return { roadAddress: roadAddress, extraAddress: extraAddress, detailAddress: detailAddress };
}

