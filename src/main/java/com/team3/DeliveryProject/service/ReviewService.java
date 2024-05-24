package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.review.ReviewAddRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewCeoAddRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewListUserRequestDto;
import com.team3.DeliveryProject.dto.response.review.ReviewListUserResponseDto;
import org.springframework.http.ResponseEntity;

public interface ReviewService {

    public ResponseEntity<Response> addReview(ReviewAddRequestDto requestDto);

    public ResponseEntity<Response> deleteReview(ReviewDeleteRequestDto requestDto);

    public ResponseEntity<Response> addCeoReview(ReviewCeoAddRequestDto requestDto);

    public ReviewListUserResponseDto listUserReview(ReviewListUserRequestDto requestDto);
}
