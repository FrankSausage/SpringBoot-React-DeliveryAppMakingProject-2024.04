import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useStoreSearch = (query) => {
    const email = localStorage.getItem('email');

    const getStoreListByCategory = useQuery({
        queryKey: ['storeList'],
        queryFn: () => {return axios.get(`/dp/store/list/search`, {params : {email : email, query: query, sort: 'rating'}})}
    })

    const getAllStoreList = useQuery({
        queryKey: ['storeListAll'],
        queryFn: () => {return axios.get(`/dp/store/list`, {params : {email: email}})},
        enabled: !query
    })

    return { getStoreListByCategory, getAllStoreList }
}