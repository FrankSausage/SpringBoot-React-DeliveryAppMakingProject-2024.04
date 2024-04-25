import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getAuth } from "firebase/auth"

export const useUserByEmail = email => {
    const auth = getAuth();
    const { isLoading, error, data: user } = useQuery({
        queryKey: ['email', email],
        queryFn: async () => {
            return axios.get(`/dp/user/update`, { params: { email: email }})
            .then(res =>
                res.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
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

