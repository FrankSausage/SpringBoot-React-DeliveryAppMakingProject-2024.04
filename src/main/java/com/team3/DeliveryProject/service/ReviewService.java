package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.review.ReviewAddRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewDeleteRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;

public interface ReviewService {

    public ResponseEntity<Response> addReview(ReviewAddRequestDto requestDto);

    public ResponseEntity<Response> deleteReview(ReviewDeleteRequestDto requestDto);
}
