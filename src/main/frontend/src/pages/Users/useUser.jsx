import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (email) => {

    const getUserByEmail = useQuery({
        queryKey: ['email'],
        queryFn: () => { return axios.get(`/dp/user/update`, {params : {email : email}}) },
    })
    
    return { getUserByEmail };
}