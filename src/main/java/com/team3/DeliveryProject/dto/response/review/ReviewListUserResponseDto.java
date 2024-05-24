package com.team3.DeliveryProject.dto.response.review;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewListUserResponseDto {
    private List<ReviewListUserInnerReviewListResponseDto> reviewList;
}
