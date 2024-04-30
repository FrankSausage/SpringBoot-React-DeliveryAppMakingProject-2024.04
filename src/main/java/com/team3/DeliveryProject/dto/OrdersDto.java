package com.team3.DeliveryProject.dto;

import com.team3.DeliveryProject.entity.Orders;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrdersDto {
    private Long orderId;
    private Long storeId;
    private Long userId;
    private String paymentMethod;
    private int totalPrice;
    private String requests;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static OrdersDto toDTO(Orders entity) {
        return OrdersDto.builder()
                .orderId(entity.getOrderId())
                .storeId(entity.getStoreId())
                .userId(entity.getUserId())
                .paymentMethod(entity.getPaymentMethod())
                .totalPrice(entity.getTotalPrice())
                .requests(entity.getRequests())
                .createdDate(entity.getCreatedDate())
                .modifiedDate(entity.getModifiedDate())
                .status(entity.getStatus())
                .build();
    }
}
