import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useStoreSearch = (query, sort) => {
    const email = localStorage.getItem('email');

    const getStoreListByCategory = useQuery({
        queryKey: ['storeList', query, sort],
        queryFn: () => {return axios.get(`/dp/store/list/search`, {params : {email : email, query: query, sort: sort}})},
        enabled: !!query
    })


    return { getStoreListByCategory }
}