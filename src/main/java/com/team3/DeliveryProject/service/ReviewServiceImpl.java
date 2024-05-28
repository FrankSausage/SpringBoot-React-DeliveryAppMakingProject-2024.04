package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ErrorCode.REVIEW_NOT_EXIST;
import static com.team3.DeliveryProject.responseCode.ResponseCode.CEO_REVIEW_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.CEO_REVIEW_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.REVIEW_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.REVIEW_DELETE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.review.ReviewAddRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewCeoAddRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewCeoDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewListOwnerRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewListUserRequestDto;
import com.team3.DeliveryProject.dto.response.review.ReviewListOwnerInnerReviewListResponseDto;
import com.team3.DeliveryProject.dto.response.review.ReviewListOwnerResponseDto;
import com.team3.DeliveryProject.dto.response.review.ReviewListUserInnerReviewListResponseDto;
import com.team3.DeliveryProject.dto.response.review.ReviewListUserResponseDto;
import com.team3.DeliveryProject.entity.CeoReviews;
import com.team3.DeliveryProject.entity.OrderMenu;
import com.team3.DeliveryProject.entity.Orders;
import com.team3.DeliveryProject.entity.Reviews;
import com.team3.DeliveryProject.entity.Stores;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.CeoReviewsRepository;
import com.team3.DeliveryProject.repository.MenuOptionRepository;
import com.team3.DeliveryProject.repository.MenuRepository;
import com.team3.DeliveryProject.repository.OrderMenuRepository;
import com.team3.DeliveryProject.repository.OrdersRepository;
import com.team3.DeliveryProject.repository.ReviewsRepository;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService{

    private final UsersRepository usersRepository;
    private final ReviewsRepository reviewsRepository;
    private final CeoReviewsRepository ceoReviewsRepository;
    private final OrdersRepository ordersRepository;
    private final OrderMenuRepository orderMenuRepository;
    private final MenuOptionRepository menuOptionRepository;
    private final MenuRepository menuRepository;
    private final StoresRepository storesRepository;

    @Override
    public ResponseEntity<Response> addReview(ReviewAddRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
        Reviews reviews = new Reviews(users.getUserId(), requestDto.getOrderId(), requestDto.getRating(),
            requestDto.getContent(), requestDto.getReviewPictureName(), LocalDateTime.now());
        reviewsRepository.save(reviews);

        //리뷰수 증가
        Orders orders = ordersRepository.findById(requestDto.getOrderId()).orElseThrow(()->new RuntimeException("Orders not found"));
        Stores stores = storesRepository.findById(orders.getStoreId()).orElseThrow(()->new RuntimeException("Stores not found"));
        stores.setReviewCount(stores.getReviewCount()+1);
        storesRepository.save(stores);
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
            // 리뷰수 감소
            Reviews reviews = reviewsRepository.findById(requestDto.getReviewId()).orElseThrow(()->new RuntimeException("Reviews not found"));
            Orders orders = ordersRepository.findById(reviews.getOrderId()).orElseThrow(()->new RuntimeException("Orders not found"));
            Stores stores = storesRepository.findById(orders.getStoreId()).orElseThrow(()->new RuntimeException("Stores not found"));
            stores.setReviewCount(stores.getReviewCount()-1);
            return Response.toResponseEntity(REVIEW_DELETE_SUCCESS);
        }
    }

    @Override
    public ResponseEntity<Response> addCeoReview(ReviewCeoAddRequestDto requestDto) {
        if(!reviewsRepository.findById(requestDto.getReviewId()).isPresent()){
            return Response.toResponseEntity(REVIEW_NOT_EXIST);
        }
        CeoReviews ceoReviews = new CeoReviews(requestDto.getReviewId(), requestDto.getContent(), LocalDateTime.now());
        ceoReviewsRepository.save(ceoReviews);
        return Response.toResponseEntity(CEO_REVIEW_ADD_SUCCESS);
    }

    @Override
    public ReviewListUserResponseDto listUserReview(ReviewListUserRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()-> new RuntimeException("User not found"));
        List<Reviews> reviewsList = reviewsRepository.findAllByUserId(users.getUserId());
        reviewsList.sort((r1, r2) -> r2.getCreatedDate().compareTo(r1.getCreatedDate()));

        List<ReviewListUserInnerReviewListResponseDto> innerReviewListResponseDtos = new ArrayList<>();
        for(Reviews reviews : reviewsList){
            Optional<CeoReviews> ceoReviews = ceoReviewsRepository.findByReviewId(reviews.getReviewId());
            Long orderId = reviews.getOrderId();
            Orders orders = ordersRepository.findById(orderId).orElseThrow(()-> new RuntimeException("Orders not found"));
            Stores stores = storesRepository.findById(orders.getStoreId()).orElseThrow(()-> new RuntimeException("Stores not found"));

            if(ceoReviews.isPresent()){
                ReviewListUserInnerReviewListResponseDto innerReviewListResponseDto = ReviewListUserInnerReviewListResponseDto.builder()
                    .reviewId(reviews.getReviewId())
                    .storeName(stores.getName())
                    .storeId(stores.getStoreId())
                    .content(reviews.getContent())
                    .rating(reviews.getRating())
                    .storeType(stores.getType())
                    .createdDate(reviews.getCreatedDate())
                    .reviewPictureName(reviews.getReviewPictureName())
                    .ceoReviewContent(ceoReviews.get().getContent())
                    .ceoReviewCreatedDate(ceoReviews.get().getCreatedDate())
                    .build();
                innerReviewListResponseDtos.add(innerReviewListResponseDto);
            }else{
                ReviewListUserInnerReviewListResponseDto innerReviewListResponseDto = ReviewListUserInnerReviewListResponseDto.builder()
                    .reviewId(reviews.getReviewId())
                    .storeName(stores.getName())
                    .storeId(stores.getStoreId())
                    .content(reviews.getContent())
                    .rating(reviews.getRating())
                    .storeType(stores.getType())
                    .createdDate(reviews.getCreatedDate())
                    .reviewPictureName(reviews.getReviewPictureName())
                    .build();
                innerReviewListResponseDtos.add(innerReviewListResponseDto);
            }
        }
        ReviewListUserResponseDto responseDto = ReviewListUserResponseDto.builder()
            .reviewList(innerReviewListResponseDtos)
            .build();
        return responseDto;
    }

    @Override
    public ReviewListOwnerResponseDto listOwnerReview(ReviewListOwnerRequestDto requestDto) {
        Stores stores = storesRepository.findById(requestDto.getStoreId()).orElseThrow(()->new RuntimeException("Stores not found"));
        List<Orders> ordersList = ordersRepository.findAllByStoreId(stores.getStoreId());
        List<Reviews> reviewsList = new ArrayList<>();
        List<ReviewListOwnerInnerReviewListResponseDto> innerReviewListResponseDtos = new ArrayList<>();

        for(Orders orders : ordersList){
            Optional<Reviews> reviews = reviewsRepository.findByOrderId(orders.getOrderId());
            if(reviews.isPresent()){
                reviewsList.add(reviews.get());
            }
        }

        for(Reviews reviews : reviewsList){
            Users users = usersRepository.findUsersByUserId(reviews.getUserId()).orElseThrow(()->new RuntimeException("Users not found"));
            Optional<CeoReviews> ceoReviews = ceoReviewsRepository.findByReviewId(reviews.getReviewId());
            String ceoContent = null;
            LocalDateTime ceoCreatedDate = null;
            Long ceoRiviewId = 0L;
            if(ceoReviews.isPresent()){
                ceoContent = ceoReviews.get().getContent();
                ceoCreatedDate = ceoReviews.get().getCreatedDate();
                ceoRiviewId = ceoReviews.get().getCeoReviewId();
            }
            ReviewListOwnerInnerReviewListResponseDto innerReviewListResponseDto = ReviewListOwnerInnerReviewListResponseDto.builder()
                .reviewId(reviews.getReviewId())
                .content(reviews.getContent())
                .rating(reviews.getRating())
                .userName(users.getName())
                .userGrade(users.getGrade())
                .storeType(stores.getType())
                .createdDate(reviews.getCreatedDate())
                .reviewPictureName(reviews.getReviewPictureName())
                .ceoReviewContent(ceoContent)
                .ceoReviewCreatedDate(ceoCreatedDate)
                .ceoReviewId(ceoRiviewId)
                .build();
            innerReviewListResponseDtos.add(innerReviewListResponseDto);
        }
        ReviewListOwnerResponseDto responseDto = ReviewListOwnerResponseDto.builder()
            .reviewList(innerReviewListResponseDtos)
            .build();

        return responseDto;
    }

    @Override
    public ResponseEntity<Response> deleteCeoReview(ReviewCeoDeleteRequestDto requestDto) {
        CeoReviews ceoReviews = ceoReviewsRepository.findById(requestDto.getCeoReviewId())
            .orElseThrow(()-> new RuntimeException("CeoReviews not found"));
        ceoReviewsRepository.delete(ceoReviews);
        return Response.toResponseEntity(CEO_REVIEW_DELETE_SUCCESS);
    }
}
