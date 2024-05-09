package com.team3.DeliveryProject.dto.request.review;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewAddRequestDto {
    private Long storeId;
    private Long userId;
    private Long menuId;
    private int rating;
    private String content;
    private String reviewPictureName;
}
