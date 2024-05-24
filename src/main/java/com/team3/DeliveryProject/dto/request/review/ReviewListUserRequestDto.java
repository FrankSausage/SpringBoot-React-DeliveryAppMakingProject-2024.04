package com.team3.DeliveryProject.dto.request.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewListUserRequestDto {
    private String email;
}
