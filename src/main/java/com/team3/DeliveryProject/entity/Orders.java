package com.team3.DeliveryProject.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Orders {
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
