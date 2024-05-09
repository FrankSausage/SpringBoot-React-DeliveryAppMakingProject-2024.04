package com.team3.DeliveryProject.dto.request.review;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewUpdatePostRequestDto {
    private Long reviewId;
    private Long menuId;
    private int rating;
    private String content;
    private String reviewPictureName;
}
