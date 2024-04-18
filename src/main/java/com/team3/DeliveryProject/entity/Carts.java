package com.team3.DeliveryProject.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Carts {
    private int cartId;
    private int userId;
    private int storeId;
    private int menuId;
    private int menuOptionId;
    private int orderId;
    private int quantity;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;
}
