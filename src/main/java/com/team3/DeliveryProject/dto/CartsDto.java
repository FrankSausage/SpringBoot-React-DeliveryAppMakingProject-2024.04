package com.team3.DeliveryProject.dto;

import com.team3.DeliveryProject.entity.Carts;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartsDto {
    private Long cartId;
    private Long userId;
    private Long storeId;
    private Long menuId;
    private Long menuOptionId;
    private Long orderId;
    private int quantity;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static CartsDto toDTO(Carts entity) {
        return CartsDto.builder()
                .cartId(entity.getCartId())
                .userId(entity.getUserId())
                .storeId(entity.getStoreId())
                .menuId(entity.getMenuId())
                .menuOptionId(entity.getMenuOptionId())
                .orderId(entity.getOrderId())
                .quantity(entity.getQuantity())
                .createdDate(entity.getCreatedDate())
                .modifiedDate(entity.getModifiedDate())
                .status(entity.getStatus())
                .build();
    }
}
