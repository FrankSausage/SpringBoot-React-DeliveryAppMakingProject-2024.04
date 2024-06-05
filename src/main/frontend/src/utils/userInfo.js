
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useUserByEmail = email => {
    const { isLoading, error, data: user } = useQuery({
      queryKey: ['email', email],
      queryFn: async () => {
        return axios.get(`/dp/user/update`, { params: { email: email }})
        .then(res => res.data)
        .catch(console.error);
      }
    });     
    return { isLoading, error, user };
}
export const useOwnerStoreListByEmail = () => {
  const email = localStorage.getItem('email')

  const {isLoading, error, data: storeData } = useQuery({
    queryKey: ['ownerStoreList', email],
    queryFn: async () => {
      return axios.get(`/dp/store/list`, {params: {email : email}})
      .then(res => res.data)
    }
  })

  return { isLoading, error, storeData }
}

export const useAddressListByEmail = email => {
  const { isLoading, error, data: address } = useQuery({
    queryKey: ['addressEmail', email],
    queryFn: async () => {
      return axios.get(`/dp/address/getList`, { params: { email: email }})
        .then(res => res.data)
        .catch(console.error);
    }
  });
  return { isLoading, error, address };
}
