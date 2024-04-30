package com.team3.DeliveryProject.dto;

import com.team3.DeliveryProject.entity.Stores;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoresDto {
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
    private double rating;
    private int dibsCount;
    private int reviewCount;
    private String operationHours;
    private String closedDays;
    private String deliveryAddress;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static StoresDto toDTO(Stores entity) {
        return StoresDto.builder()
                .storeId(entity.getStoreId())
                .name(entity.getName())
                .type(entity.getType())
                .category(entity.getCategory())
                .address(entity.getAddress())
                .storePictureName(entity.getStorePictureName())
                .phone(entity.getPhone())
                .content(entity.getContent())
                .minDeliveryPrice(entity.getMinDeliveryPrice())
                .deliveryTip(entity.getDeliveryTip())
                .minDeliveryTime(entity.getMinDeliveryTime())
                .maxDeliveryTime(entity.getMaxDeliveryTime())
                .rating(entity.getRating())
                .dibsCount(entity.getDibsCount())
                .reviewCount(entity.getReviewCount())
                .operationHours(entity.getOperationHours())
                .closedDays(entity.getClosedDays())
                .deliveryAddress(entity.getDeliveryAddress())
                .createdDate(entity.getCreatedDate())
                .modifiedDate(entity.getModifiedDate())
                .status(entity.getStatus())
                .build();
    }
}
