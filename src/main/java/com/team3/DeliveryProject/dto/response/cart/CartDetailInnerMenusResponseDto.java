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
public class CartDetailInnerMenusResponseDto {

    private String menuName;
    private int menuPrice;
    private int quantity;
    private int sequence;
    private String menuPictureName;
    private List<CartDetailInnerMenuOptionsResponseDto> menuOptions;
}
