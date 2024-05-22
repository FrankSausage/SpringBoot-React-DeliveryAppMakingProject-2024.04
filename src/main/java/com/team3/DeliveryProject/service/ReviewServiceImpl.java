package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ResponseCode.REVIEW_ADD_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.review.ReviewAddRequestDto;
import com.team3.DeliveryProject.entity.Reviews;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.ReviewsRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService{

    private final UsersRepository usersRepository;
    private final ReviewsRepository reviewsRepository;

    @Override
    public ResponseEntity<Response> addReview(ReviewAddRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
        Reviews reviews = new Reviews(users.getUserId(), requestDto.getOrderId(), requestDto.getRating(),
            requestDto.getContent(), requestDto.getReviewPictureName(), LocalDateTime.now());
        reviewsRepository.save(reviews);
        return Response.toResponseEntity(REVIEW_ADD_SUCCESS);
    }
}
