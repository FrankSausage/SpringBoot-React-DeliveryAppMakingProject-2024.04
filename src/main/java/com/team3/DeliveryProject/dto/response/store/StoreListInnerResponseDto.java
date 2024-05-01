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
public class StoreListInnerResponseDto {
    private Long storeId;
    private String name;
    private int type;
    private String category;
    private String address;
    private String storePictureName;
    private String phone;
    private String content;
    private int minDeliveryPrice;
    private int deliveryTip;
    private int minDeliveryTime;
    private int maxDeliveryTime;
    private Double rating;
    private int dibsCount;
    private int reviewCount;
    private String operationHours;
    private String closedDays;
    private String deliveryAddress;

}
