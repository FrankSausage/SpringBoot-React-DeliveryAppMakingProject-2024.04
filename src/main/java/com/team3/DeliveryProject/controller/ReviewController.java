package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.menu.*;
import com.team3.DeliveryProject.dto.request.review.*;
import com.team3.DeliveryProject.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/store")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/review/register")
    public ResponseEntity<?> addReview(@RequestBody ReviewAddRequestDto requestDto) {
        return ResponseEntity.ok().body(reviewService.addReview(requestDto).getBody());
    }
    @GetMapping("/review/update")
    public ResponseEntity<?> updateGetReview(@ModelAttribute ReviewUpdateGetRequestDto requestDto) {
        return ResponseEntity.ok().body(reviewService.updateGetReview(requestDto));
    }
    @PostMapping("/review/update")
    public ResponseEntity<?> updateReview(@RequestBody ReviewUpdatePostRequestDto requestDto) {
        return ResponseEntity.ok().body(reviewService.updateReview(requestDto).getBody());
    }
    @PostMapping("/review/delete")
    public ResponseEntity<?> deleteReview(@RequestBody ReviewDeleteRequestDto requestDto) {
        return ResponseEntity.ok().body(reviewService.deleteReview(requestDto).getBody());
    }

    @PostMapping("/review/reply")

    @GetMapping("/review/list")
    public ResponseEntity<?> getReviewList(@ModelAttribute ReviewListGetRequestDto requestDto) {
        return ResponseEntity.ok().body(reviewService.getReviewList(requestDto));
    }
    @GetMapping("/review/detail")
    public ResponseEntity<?> getReviewDetail(@ModelAttribute ReviewDetailRequestDto requestDto) {
        return ResponseEntity.ok().body(reviewService.getReviewDetail(requestDto));
    }
}
