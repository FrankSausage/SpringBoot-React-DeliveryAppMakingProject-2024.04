import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getCurrentUser } from "./firebase";

export const useOwnerByEmail = (storeId, email) => {
    const { isLoading, error, data: user } = useQuery({
        queryKey: ['storeId', storeId, 'email', email],
        queryFn: async () => {
            return axios.get(`/dp/store/owner/update`, { params: { storeId: storeId, email: email }})
            .then(res => res.data)
            .catch(console.error);
        }
    })        
    return { isLoading, error, user };
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

