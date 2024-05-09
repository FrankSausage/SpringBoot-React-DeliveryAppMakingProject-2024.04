package com.team3.DeliveryProject.dto.response.menu;

import com.team3.DeliveryProject.entity.Menu;
import com.team3.DeliveryProject.entity.MenuOption;
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
public class MenuDetailInnerOptionsResponseDto {
    private Long menuOptionId;
    private String options;
    private int price;

    public MenuDetailInnerOptionsResponseDto(MenuOption menuOption) {
        this.menuOptionId = menuOption.getMenuOptionId();
        this.options = menuOption.getOptions();
        this.price = menuOption.getPrice();
    }
}
