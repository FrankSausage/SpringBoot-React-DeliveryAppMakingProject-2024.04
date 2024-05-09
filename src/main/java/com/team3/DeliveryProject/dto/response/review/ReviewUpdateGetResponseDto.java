package com.team3.DeliveryProject.dto.response.review;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewUpdateGetResponseDto {
    private List<ReviewUpdateInnerReviewsResponseDto> reviews;
}
