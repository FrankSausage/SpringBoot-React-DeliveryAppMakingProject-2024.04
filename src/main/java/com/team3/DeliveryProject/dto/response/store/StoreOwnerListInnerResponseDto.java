package com.team3.DeliveryProject.dto.response.store;

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
public class StoreOwnerListInnerResponseDto {
    private Long storeId;
    private String name;
    private String storePictureName;
    private Double rating;
    private int dibsCount;
    private int reviewCount;
}
