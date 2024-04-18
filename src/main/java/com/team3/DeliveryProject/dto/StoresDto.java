package com.team3.DeliveryProject.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoresDto {
    private int storeId;
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
    private double rating;
    private int dibsCount;
    private int reviewCount;
    private String operationHours;
    private String closedDays;
    private String deliveryAddress;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;
}
