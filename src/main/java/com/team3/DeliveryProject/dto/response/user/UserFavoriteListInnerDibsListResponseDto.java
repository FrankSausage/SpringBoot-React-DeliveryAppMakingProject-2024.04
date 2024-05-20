package com.team3.DeliveryProject.dto.response.user;

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
public class UserFavoriteListInnerDibsListResponseDto {
    private Long storeId;
    private String storeName;
    private String storePictureName;
    private int reviewCount;
    private Double rating;
}
