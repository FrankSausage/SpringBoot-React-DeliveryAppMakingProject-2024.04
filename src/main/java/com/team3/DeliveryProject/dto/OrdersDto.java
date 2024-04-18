package com.team3.DeliveryProject.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrdersDto {
    private int orderId;
    private int storeId;
    private int userId;
    private String paymentMethod;
    private int totalPrice;
    private String requests;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;
}
