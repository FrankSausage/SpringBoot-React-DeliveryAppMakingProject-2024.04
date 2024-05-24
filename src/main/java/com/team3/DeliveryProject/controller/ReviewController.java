package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.review.ReviewAddRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewCeoAddRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewListOwnerRequestDto;
import com.team3.DeliveryProject.dto.request.review.ReviewListUserRequestDto;
import com.team3.DeliveryProject.dto.response.review.ReviewListUserResponseDto;
import com.team3.DeliveryProject.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/user/review/register")
    public ResponseEntity<?> addReview(@RequestBody ReviewAddRequestDto requestDto) {
        return ResponseEntity.ok().body(reviewService.addReview(requestDto).getBody());
    }
    @PostMapping("/user/review/delete")
    public ResponseEntity<?> deleteReview(@RequestBody ReviewDeleteRequestDto requestDto){
        return ResponseEntity.ok().body(reviewService.deleteReview(requestDto).getBody());
    }
    @PostMapping("/store/review/reply")
    public ResponseEntity<?> addCeoReivew(@RequestBody ReviewCeoAddRequestDto requestDto){
        return ResponseEntity.ok().body(reviewService.addCeoReview(requestDto).getBody());
    }
    @GetMapping("/user/review/list")
    public ResponseEntity<?> listReview(@ModelAttribute ReviewListUserRequestDto requestDto){
        return ResponseEntity.ok().body(reviewService.listUserReview(requestDto));
    }
    @GetMapping("/store/review/list")
    public ResponseEntity<?> listOwnerReview(@ModelAttribute ReviewListOwnerRequestDto requestDto){
        return ResponseEntity.ok().body(reviewService.listOwnerReview(requestDto));
    }
}
