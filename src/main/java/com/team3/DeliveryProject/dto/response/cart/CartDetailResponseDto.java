package com.team3.DeliveryProject.dto.response.cart;

import java.util.List;
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
public class CartDetailResponseDto {

    private Long storeId;
    private String storeName;
    private List<CartDetailInnerMenusResponseDto> menus;

    public CartDetailResponseDto(Long storeId, String storeName) {
        this.storeId = storeId;
        this.storeName = storeName;
    }
}
