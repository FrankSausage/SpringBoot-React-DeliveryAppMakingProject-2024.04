import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useReview(email) {
  const queryClient = useQueryClient();

  const getMyReviewList = useQuery({
    queryKey: ['reviewList', {email: email}],
    queryFn: () => {return axios.get(`/dp/user/review/list`, {params: {email: email}})},
    enabled: !!email
  })

  const postReviewRegister = useMutation({
    mutationFn: (reviewData) => {axios.post(`/dp/user/review/register`, reviewData)},
    onSuccess: () => {queryClient.invalidateQueries(['reviewList'], {email: email})},
    onError: e => {alert('내 리뷰 작성에 실패하였습니다.'); console.error(e)}
  })

  return { getMyReviewList, postReviewRegister }
}

export function useStoreReviewList(storeId) {
  const queryClient = useQueryClient();

  const getStoreReviewList = useQuery({
    queryKey: ['reviewList', {storeId: storeId}],
    queryFn: () => {return axios.get(`/dp/user/review/list`, { params: { storeId: storeId }})},
    enabled: !!storeId
  })

  const postOwnerReview = useMutation({
    mutationFn: reviewData => {axios.post(`/dp/store/review/reply`, reviewData)},
    onSuccess: () => {queryClient.invalidateQueries(['reviewList'], { storeId: storeId })},
    onError: e => {alert('사장님 댓글 작성에 실패하였습니다.'); console.error(e)}
  })

  return { getStoreReviewList, postOwnerReview };
}