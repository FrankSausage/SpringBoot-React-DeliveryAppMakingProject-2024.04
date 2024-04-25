import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getAuth } from "firebase/auth"

export const useUserByEmail = email => {
    const auth = getAuth();
    const { isLoading, error, data: user } = useQuery({
        queryKey: ['email', email],
        queryFn: async () => {
            return axios
                    .get(`/dp/user/update/`)
        }
    })

    return user;
}

