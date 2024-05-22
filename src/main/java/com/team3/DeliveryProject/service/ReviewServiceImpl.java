package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ErrorCode.REVIEW_NOT_EXIST;
import static com.team3.DeliveryProject.responseCode.ErrorCode.USERNAME_IS_ALREADY_EXIST;
import static com.team3.DeliveryProject.responseCode.ResponseCode.CEO_REVIEW_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.REVIEW_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.REVIEW_DELETE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.review.ReviewAddRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewCeoAddRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewDeleteRequestDto;
import com.team3.DeliveryProject.entity.CeoReviews;
import com.team3.DeliveryProject.entity.Reviews;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.CeoReviewsRepository;
import com.team3.DeliveryProject.repository.ReviewsRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService{

    private final UsersRepository usersRepository;
    private final ReviewsRepository reviewsRepository;
    private final CeoReviewsRepository ceoReviewsRepository;

    @Override
    public ResponseEntity<Response> addReview(ReviewAddRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
        Reviews reviews = new Reviews(users.getUserId(), requestDto.getOrderId(), requestDto.getRating(),
            requestDto.getContent(), requestDto.getReviewPictureName(), LocalDateTime.now());
        reviewsRepository.save(reviews);
        return Response.toResponseEntity(REVIEW_ADD_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> deleteReview(ReviewDeleteRequestDto requestDto) {
        if(ceoReviewsRepository.findAllByReviewId(requestDto.getReviewId()).isPresent()){
            List<CeoReviews> ceoReviewsList = ceoReviewsRepository.findAllByReviewId(requestDto.getReviewId()).get();
            for(CeoReviews ceoReviews : ceoReviewsList){
                ceoReviewsRepository.delete(ceoReviews);
            }
        }
        if (!reviewsRepository.findById(requestDto.getReviewId()).isPresent()) {
            return Response.toResponseEntity(REVIEW_NOT_EXIST);
        }else{
            reviewsRepository.deleteById(requestDto.getReviewId());
            return Response.toResponseEntity(REVIEW_DELETE_SUCCESS);
        }
    }

    @Override
    public ResponseEntity<Response> addCeoRivew(ReviewCeoAddRequestDto requestDto) {
        if(!reviewsRepository.findById(requestDto.getReviewId()).isPresent()){
            return Response.toResponseEntity(REVIEW_NOT_EXIST);
        }
        CeoReviews ceoReviews = new CeoReviews(requestDto.getReviewId(), requestDto.getContent(), LocalDateTime.now());
        ceoReviewsRepository.save(ceoReviews);
        return Response.toResponseEntity(CEO_REVIEW_ADD_SUCCESS);
    }
}
