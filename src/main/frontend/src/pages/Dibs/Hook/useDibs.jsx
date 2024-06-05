import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export function useDibs(email, isOpen) {
  const queryClient = useQueryClient();

  const getDibsListByEmail = useQuery({
    queryKey: ['userDibs', email],
    queryFn: () => {return axios.get(`/dp/user/favorite/list`, {params: {email: email}})},
    staleTime: 1000 * 60 * 10,
    enabled: !!email && isOpen
  })

  const postDibStore = useMutation({
    mutationFn: dibData => {axios.post(`/dp/user/favorite`, dibData)},
    onSuccess: () => {queryClient.invalidateQueries('userDibs')},
    onError: e => {console.error(e)},
  })

  return { getDibsListByEmail, postDibStore }
}