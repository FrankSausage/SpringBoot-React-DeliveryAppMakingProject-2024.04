package com.team3.DeliveryProject.dto.request.cart;

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
public class CartAddInnerMenusRequestDto {
    private int sequence;
    private int quantity;
    private Long menuId;
    private List<CartAddInnerMenuOptionsRequestDto> menuOptions;
}
