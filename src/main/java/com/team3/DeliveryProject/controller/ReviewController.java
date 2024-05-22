package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.review.ReviewAddRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDeleteRequestDto;
import com.team3.DeliveryProject.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
}
