import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useUserByEmail = email => {
    const { isLoading, error, data: user } = useQuery({
        queryKey: ['email', email],
        queryFn: async () => {
            return await axios.get(`/dp/user/update`, { params: { email: email }})
            .then(res => res.data)
            .catch(console.error);
        }
    })
    return {isLoading, error, user};
}

export async function extractDataFromFormData(formData) {
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return await data;
  }

