import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react";

export const useUserByEmail = email => {
    const { isLoading, error, data: user } = useQuery({
        queryKey: ['email', email],
        queryFn: async () => {
            return axios.get(`/dp/user/update`, { params: { email: email }})
            .then(res => res.data)
            .catch(console.error);
        }
    })        
    return { isLoading, error, user };
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
  const formattedPhoneNumber = strippedPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  
  return formattedPhoneNumber;
  };

export function splitAddressFromCurrentUserAddress(currentAddress) {
    const splitAddress = currentAddress.split(',')
    const roadAddress = (splitAddress[0] || '');
    const extraAddress = (splitAddress[1] || '');
    const detailAddress = (splitAddress[2] || '');

    return { roadAddress: roadAddress, extraAddress: extraAddress, detailAddress: detailAddress };
}
