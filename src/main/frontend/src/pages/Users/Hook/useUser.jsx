import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = () => {
    const email = localStorage.getItem('email')

    const getUserByEmail = useQuery({
        queryKey: ['email'],
        queryFn: () => { return axios.get(`/dp/user/update`, {params : {email : email}}) },
    })
    

    const postUserSignUp = useMutation({
        mutationFn: (userData) => axios.post(`/dp/user/signup`, userData),
        onSuccess: () => {alert('회원가입이 완료되었습니다.')},
        onError: () => {alert('회원가입에 실패하였습니다.')}
    })

    return { getUserByEmail, postUserSignUp };
}