package com.team3.DeliveryProject.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CeoReviews {
    private int reviewId;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

}
