package com.team3.DeliveryProject.dto.request.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewCeoAddRequestDto {
    private Long reviewId;
    private String content;
}
