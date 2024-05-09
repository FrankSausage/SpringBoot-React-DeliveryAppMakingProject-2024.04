package com.team3.DeliveryProject.dto.response.review;

import com.team3.DeliveryProject.dto.response.menu.MenuUpdateInnerOptionsResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewUpdateInnerReviewsResponseDto {
    private Long reviewId;
    private Long menuId;
    private int rating;
    private String content;
    private String reviewPictureName;
}
