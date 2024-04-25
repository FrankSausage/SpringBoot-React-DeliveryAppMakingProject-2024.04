import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getAuth } from "firebase/auth"

export const useUserByEmail = email => {
    const auth = getAuth();
    const { isLoading, error, data: user } = useQuery({
        queryKey: ['email', email],
        queryFn: async () => {
            return await axios
                .get(`/dp/user/update/`, email)
                .then(res => console.log(res.data))
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

