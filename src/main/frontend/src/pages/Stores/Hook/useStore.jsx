import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useStore = (query) => {
    const email = localStorage.getItem('email');

    const getStoreListByCategory = useQuery({
        queryKey: ['storeList'],
        queryFn: () => {return axios.get(`/dp/store/list/search`, {params : {email : email, query: query, sort: 'rating'}})}
    })

    return { getStoreListByCategory }
}