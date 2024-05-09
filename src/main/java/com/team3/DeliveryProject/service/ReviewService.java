package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.menu.*;
import com.team3.DeliveryProject.dto.request.review.*;
import com.team3.DeliveryProject.dto.response.review.ReviewDetailResponseDto;
import com.team3.DeliveryProject.dto.response.review.ReviewListGetResponseDto;
import com.team3.DeliveryProject.dto.response.review.ReviewUpdateGetResponseDto;
import org.springframework.http.ResponseEntity;

public interface ReviewService {

    public ResponseEntity<Response> addReview(ReviewAddRequestDto requestDto);
    public ResponseEntity<Response> updateReview(ReviewUpdatePostRequestDto requestDto);
    public ReviewUpdateGetResponseDto updateGetReview(ReviewUpdateGetRequestDto requestDto);
    public ResponseEntity<Response> deleteReview(ReviewDeleteRequestDto requestDto);
    public ReviewListGetResponseDto getReviewList(ReviewListGetRequestDto requestDto);
    public ReviewDetailResponseDto getReviewDetail(ReviewDetailRequestDto requestDto);

}
