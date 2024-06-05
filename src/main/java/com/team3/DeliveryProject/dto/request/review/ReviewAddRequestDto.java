package com.team3.DeliveryProject.dto.request.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewAddRequestDto {
    private String email;
    private Long orderId;
    private int rating;
    private String content;
    private String reviewPictureName;
}
