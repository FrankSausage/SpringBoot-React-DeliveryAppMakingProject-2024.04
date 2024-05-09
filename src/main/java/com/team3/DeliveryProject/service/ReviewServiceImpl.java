package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.review.*;
import com.team3.DeliveryProject.dto.response.review.ReviewDetailResponseDto;
import com.team3.DeliveryProject.dto.response.review.ReviewListGetResponseDto;
import com.team3.DeliveryProject.dto.response.review.ReviewUpdateGetResponseDto;
import com.team3.DeliveryProject.dto.response.review.ReviewUpdateInnerReviewsResponseDto;
import com.team3.DeliveryProject.entity.Reviews;
import com.team3.DeliveryProject.repository.ReviewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.team3.DeliveryProject.responseCode.ResponseCode.*;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewsRepository reviewsRepository;
    @Override
    public ResponseEntity<Response> addReview(ReviewAddRequestDto requestDto) {
        Reviews reviews = new Reviews(requestDto.getStoreId(), requestDto.getUserId(), requestDto.getMenuId(),
                requestDto.getRating(), requestDto.getContent(), requestDto.getReviewPictureName(),
                LocalDateTime.now(), LocalDateTime.now(), "일반" );
        reviewsRepository.save(reviews);
        return  Response.toResponseEntity(REVIEW_ADD_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> updateReview(ReviewUpdatePostRequestDto requestDto) {
        Reviews reviews = reviewsRepository.findById(requestDto.getReviewId()).orElseThrow(()->new RuntimeException("Review not found"));
        reviews.setRating(requestDto.getRating());
        reviews.setContent(requestDto.getContent());
        reviews.setReviewPictureName(requestDto.getReviewPictureName());
        reviewsRepository.save(reviews);
        return Response.toResponseEntity(REVIEW_UPDATE_SUCCESS);
    }

    @Override
    public ReviewUpdateGetResponseDto updateGetReview(ReviewUpdateGetRequestDto requestDto) {
        Reviews reviews = reviewsRepository.findById(requestDto.getReviewId()).orElseThrow(()->new RuntimeException("Review not found"));
        List<ReviewUpdateInnerReviewsResponseDto> reviewsResponseDtos = new ArrayList<>();
        ReviewUpdateInnerReviewsResponseDto reviewsResponseDto = ReviewUpdateInnerReviewsResponseDto.builder()
                .reviewId(reviews.getReviewId())
                .rating((reviews.getRating()))
                .content(reviews.getContent())
                .reviewPictureName(reviews.getReviewPictureName())
                .build();
        reviewsResponseDtos.add(reviewsResponseDto);
        ReviewUpdateGetResponseDto responseDto = ReviewUpdateGetResponseDto.builder()
                .reviews(reviewsResponseDtos)
                .build();
        return responseDto;
    }

    @Override
    public ResponseEntity<Response> deleteReview(ReviewDeleteRequestDto requestDto) {
        Reviews reviews = reviewsRepository.findById(requestDto.getReviewId()).orElseThrow(()->new RuntimeException("Review not found"));
        reviews.setStatus("삭제");
        reviewsRepository.save(reviews);
        return Response.toResponseEntity(REVIEW_DELETE_SUCCESS);
    }

    @Override
    public ReviewListGetResponseDto getReviewList(ReviewListGetRequestDto requestDto) {
        return null;
    }

    @Override
    public ReviewDetailResponseDto getReviewDetail(ReviewDetailRequestDto requestDto) {
        return null;
    }
}


